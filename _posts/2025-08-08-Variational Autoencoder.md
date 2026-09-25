---
layout: post
title: "Variational Autoencoder (VAE) for Model-Informed Precision Dosing and Complex Pharmacokinetic Profiles"
categories: [Machine Learning, Pharmacometrics]
description: "Application of Variational Autoencoders for precision dosing and modeling pharmacokinetic profiles that cannot be adequately described by traditional ODE-based models"
keywords: "Variational Autoencoder, VAE, Model-Informed Precision Dosing, MIPD, Deep Learning, Pharmacokinetics, Neural Networks, ODE Alternatives"
date: 2025-08-08
---

## Introduction

These are notes on using variational autoencoders (VAEs) for two things in
pharmacometrics: model-informed precision dosing (MIPD) based on
patient-specific profiles, and describing PK profiles that conventional
ODE-based compartmental models struggle with.

A conventional PK model makes you pick a structure up front. That structure is
what gives the parameters physiological meaning and what lets the model
extrapolate. A VAE relaxes it and gives up interpretability and extrapolation
in exchange for flexibility. Whether that's worth it depends on the problem,
and I've tried to say below where I think it isn't.

## What ODE models do and do not constrain

Compartmental models assume specific functional relationships:

$$
\frac{dC}{dt} = -k \cdot C
$$

or more complex structures:

$$
\frac{dC}{dt} = \frac{Dose \cdot k_a}{V} \cdot e^{-k_a \cdot t} - k_{el} \cdot C
$$

The case for flexible models often gets overstated, so a few things this does
not imply:

- Multi-exponential decay isn't a limitation. A linear compartmental system
  produces sums of exponentials by construction; that's what the compartments
  are.
- Enterohepatic recirculation and target-mediated disposition aren't
  "non-compartmental". Both have well-established ODE formulations, and the
  TMDD system is written out in an earlier post on this site.
- Irregular sampling isn't a problem for ODE models. Nonlinear mixed-effects
  estimation was built for sparse, unbalanced clinical data. If anything it's
  the other way round: a network that outputs a fixed grid of time points is
  what has trouble with irregular sampling.

The actual motivation is narrower. ODE models make you commit to a structure
before fitting, and that commitment is what lets the model extrapolate to
doses and populations it hasn't seen. A flexible model is worth considering
when the structure really is unknown, when the profile shape itself carries
useful information (clustering patients by profile shape, say), or when
there's enough data to learn the structure instead of assuming it. Those
situations exist but they're the exception, and the baseline to beat is a
properly specified population PK model.

## VAE architecture for PK

### Encoder

The encoder maps observed concentration-time data to a latent representation
of patient physiology:

$$
q_\phi(z \mid x) = \mathcal{N}(\mu_\phi(x), \sigma_\phi^2(x))
$$

where:
- $x = \{C_{obs}(t_1), C_{obs}(t_2), ..., C_{obs}(t_n), \text{covariates}\}$ represents observed data
- $z$ is the latent vector encoding patient-specific PK characteristics
- $\mu_\phi(x)$ and $\sigma_\phi(x)$ are neural network outputs parameterizing the latent distribution

The idea is that the latent vector picks up patient-specific clearance,
volume of distribution and absorption characteristics, and inter-individual
variability in PK behavior generally.

### Decoder

The decoder reconstructs concentration-time profiles from the latent
representation:

$$
p_\theta(C(t) \mid z, \text{Dose}) = \mathcal{N}(\mu_\theta(z, \text{Dose}), \sigma_\theta^2)
$$

and $\mu_\theta(z, \text{Dose})$ can represent profiles that don't come from
an ODE:

$$
C_{pred}(t) = \text{Decoder}(z, \text{Dose}, t)
$$

There's a gap between this expression and the code below, though. Writing
$\text{Decoder}(z, \text{Dose}, t)$ suggests a function of continuous time,
but the network in the code outputs a fixed vector of `time_points` values. It
only knows about the grid it was trained on, and it has no idea that
concentration at $t + \Delta t$ is related to concentration at $t$. Neural
ODEs are meant to close that gap (see below).

Within that grid, the decoder isn't limited to exponential or polynomial
forms. It can learn arbitrary concentration-time curves, multi-modal shapes,
non-standard absorption and complicated elimination phases.

### Variational inference

The latent vector is sampled with the reparameterization trick:

$$
z = \mu_\phi(x) + \sigma_\phi(x) \odot \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)
$$

which allows gradient-based optimization while keeping the probabilistic
interpretation.

## Application 1: precision dosing

For MIPD the VAE learns individual PK characteristics from sparse
observational data.

Training:
1. Encoder processes observed concentrations: $z_i = \text{Encoder}(C_{obs,i}, \text{covariates}_i)$
2. Each patient's latent vector $z_i$ captures the shape of their PK profile
3. Decoder learns to predict full profiles: $C_{pred,i} = \text{Decoder}(z_i, \text{Dose}_i)$

Dose optimization: given a target exposure (e.g. an AUC target or trough
concentration), the dose for patient $i$ is

$$
\text{Dose}_{optimal,i} = \arg\min_{\text{Dose}} |\text{Target} - \text{Decoder}(z_i, \text{Dose})|
$$

What this offers for MIPD: full profiles inferred from a few observations,
individual variability held in the latent space, dose individualization done
directly in that patient-specific space, and prediction intervals from the
probabilistic framework.

### Implementation example

```python
import torch
import torch.nn as nn

class PKVAE(nn.Module):
    def __init__(self, latent_dim=8, time_points=24):
        super().__init__()
        self.latent_dim = latent_dim      # encode() needs this at call time
        self.time_points = time_points
        # Encoder: concentration-time data -> latent distribution
        self.encoder = nn.Sequential(
            nn.Linear(time_points + 3, 64),  # +3 for covariates
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, latent_dim * 2)  # mean and log-variance
        )
        
        # Decoder: latent + dose -> concentration profile
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim + 1, 32),  # +1 for dose
            nn.ReLU(),
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, time_points)
        )
    
    def encode(self, x):
        h = self.encoder(x)
        mu, logvar = h[:, :self.latent_dim], h[:, self.latent_dim:]
        return mu, logvar
    
    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std
    
    def decode(self, z, dose):
        return self.decoder(torch.cat([z, dose.unsqueeze(1)], dim=1))
    
    def forward(self, x, dose):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        recon = self.decode(z, dose)
        return recon, mu, logvar

def precision_dosing_loss(recon, target, mu, logvar, beta=0.1):
    # Both terms sum over the feature axis and average over the batch. Mixing a
    # mean reconstruction with a summed KL, as is often written, makes beta
    # depend on batch size and on how many time points you happen to have.
    recon_loss = nn.functional.mse_loss(
        recon, target, reduction="none").sum(dim=1).mean()
    kl_loss = (-0.5 * (1 + logvar - mu.pow(2) - logvar.exp()).sum(dim=1)).mean()
    return recon_loss + beta * kl_loss
```

## Application 2: profiles that are hard to write as ODEs

Some PK profiles are awkward for standard ODE models.

Multi-phase elimination with non-standard exponents. The traditional form is
$C(t) = A_1 e^{-\lambda_1 t} + A_2 e^{-\lambda_2 t}$; the VAE version is
$C(t) = \text{Decoder}(z, \text{Dose}, t)$, where the decoder learns the
functional form.

Irregular absorption. Complicated lag times, multiple absorption sites or food
effects give profiles that don't follow a standard $k_a$ model. A decoder can
learn these directly:

$$
C_{abs}(t) = \text{Decoder}_{abs}(z_{abs}, t)
$$

where $z_{abs}$ encodes patient-specific absorption characteristics.

Target-mediated or saturable processes. When TMDD or another saturable process
causes non-exponential decay, the VAE can capture the profile shape without
explicit Michaelis-Menten equations:

$$
C(t) = \text{Decoder}(z, \text{Dose}, t, \text{Target}_{level})
$$

### Objective

The VAE objective trades off reconstruction accuracy against regularization
of the latent space:

$$
\mathcal{L}_{VAE} = \mathbb{E}_{q_\phi(z|x)}[\log p_\theta(C \mid z, \text{Dose})] - \beta \cdot D_{KL}(q_\phi(z \mid x) \parallel p(z))
$$

The first term is the reconstruction term (fit to the observed data), the
second is the KL divergence pulling toward the prior $p(z) = \mathcal{N}(0, I)$,
and $\beta$ weights the two.

### Comparing fits

$$
\text{Reconstruction error} = \frac{1}{N} \sum_{i=1}^{N} ||C_{obs,i} - C_{pred,i}||^2
$$

This says nothing about how complex a profile is. A model with enough capacity
pushes it toward zero on the training set however simple the underlying
profile. It's only informative on held-out patients, and even then a lower
value has to be weighed against how many parameters it took to get there.

## Neural ODEs

A decoder that outputs a fixed grid throws away the one thing we know for sure
about a concentration-time profile: it's the solution of a differential
equation in time. A neural ODE keeps that structure and only learns the
right-hand side,

$$
\frac{d\mathbf{h}}{dt} = f_\theta(\mathbf{h}, t, z), \qquad C(t) = g(\mathbf{h}(t))
$$

where $f_\theta$ is a neural network and the profile comes from integrating it
with an ordinary solver. That gets back what the plain decoder loses:

- Continuous time. The profile can be evaluated at any $t$, so irregular and
  patient-specific sampling works the same way as in a conventional PK model.
- Dosing events. Integration restarts at each dose, so multiple doses and
  infusions are handled the way they actually happen instead of being baked
  into a fixed output grid.
- Partial mechanism. You can write down the known part of the system and learn
  only the unknown part. This hybrid is where I'd start: a one-compartment
  model with a learned clearance term is much easier to justify, and much more
  identifiable, than a black box over the whole profile.

The downsides: neural ODEs train slowly, suffer from whatever stiffness the
solver has trouble with, and overfit easily on sparse clinical data, so they
shouldn't be the default. But if the reason for dropping ODEs is that the
profile shape is unusual, a neural ODE makes more sense than throwing away the
time structure entirely.

## Combining with conventional pharmacometrics

VAEs can also sit alongside ODE models: to classify which patients need a
complex model and which a simple one, to model the residual deviations from
ODE predictions, or to look for nonlinear covariate relationships in the
latent space.

| Aspect | ODE Models | VAE Models |
|--------|-----------|-----------|
| **Mathematical Form** | Fixed (exponential, polynomial) | Learned (arbitrary) |
| **Profile Flexibility** | Limited to assumed structure | High flexibility |
| **Interpretability** | High (clear parameters) | Moderate (latent space) |
| **Data Requirements** | Moderate | Higher (for training) |
| **Extrapolation** | Good (mechanistic) | Poor outside the training distribution |
| **Unusual profile shapes** | Needs the right structure chosen | Learned from data, given enough of it |

## Possible uses

On the precision dosing side: inferring full profiles from sparse therapeutic
drug monitoring samples, pediatric dosing with complicated age-dependent PK
changes, and organ impairment without assuming the standard clearance
relationships.

On the profile side: biologics with TMDD (saturable elimination without
explicit Michaelis-Menten terms), enterohepatic recirculation (secondary peaks
without adding compartments), and patient-specific absorption patterns learned
from data.

## Validation

For dosing: cross-validate dose prediction accuracy on held-out patients,
compare VAE-predicted doses with clinical outcomes prospectively, and check
that the prediction intervals are calibrated against observed variability.

For profile modeling: visual predictive checks of observed vs VAE-generated
profiles, reconstruction error on independent datasets, and a check that the
learned profiles are consistent with known PK principles.

## Pros and cons

In favor: it can fit profiles that are hard to describe with ODEs, it holds
individual variability in the latent space, it handles limited observations
through the learned population structure, and it can pick up nonlinear
covariate relationships.

Against: it needs a lot of training data, the latent space is harder to
interpret than PK parameters, it extrapolates poorly beyond the training
distribution, and it costs more compute than an ODE model.

## Summary

VAEs give a flexible, patient-specific latent representation that can be used
for dose individualization and for profile shapes that standard compartmental
models handle badly. For most problems a well-specified population PK model is
still the thing to beat, and when the time structure matters a neural ODE or a
hybrid model is usually a better fit than a grid-output decoder.
