---
layout: post
title: "Target-Mediated Drug Disposition (TMDD) - Nonlinear Pharmacokinetics at Low Concentrations"
categories: Pharmacokinetics
description: "Notes on target-mediated drug disposition, the model equations and their approximations, and what it means for biologics PK"
keywords: "TMDD, Target-Mediated Drug Disposition, Nonlinear Pharmacokinetics, Biologics, Monoclonal Antibodies, Michaelis-Menten, Pharmacokinetics"
date: 2022-10-15
---

## Introduction

Target-mediated drug disposition (TMDD) is a source of nonlinear PK that shows
up mostly with biologics, especially monoclonal antibodies and other targeted
therapeutics. In linear PK, clearance is constant and the elimination rate is
proportional to concentration. With TMDD the pharmacological target itself
contributes a large part of the elimination, particularly at low drug
concentrations.

The practical consequence is dose-dependent PK: clearance changes with dose
and half-life can vary a lot across the therapeutic range. That matters when
choosing doses, especially for biologics with high target affinity and limited
target capacity.

## Mechanism

The drug binds its target (a receptor, enzyme or other binding site) with high
affinity, and that binding adds an elimination pathway on top of the usual
linear routes such as renal elimination and hepatic metabolism.

This pathway is saturable. When drug concentrations are low relative to target
capacity, a large fraction of the drug is bound to and eliminated through the
target. As concentrations rise the binding sites saturate, and elimination
shifts toward the linear, non-target pathways.

## Equations

### Full TMDD model

The full model describes free drug ($C$), free target ($R$) and the
drug-target complex ($RC$):

$$
\frac{dC}{dt} = -k_{on} \cdot C \cdot R + k_{off} \cdot RC - \frac{CL_{lin}}{V_c} \cdot C
$$

$$
\frac{dR}{dt} = k_{syn} - k_{deg} \cdot R - k_{on} \cdot C \cdot R + k_{off} \cdot RC
$$

$$
\frac{dRC}{dt} = k_{on} \cdot C \cdot R - (k_{off} + k_{int}) \cdot RC
$$

where:
- $C$ = free drug concentration
- $R$ = free target concentration  
- $RC$ = drug-target complex concentration
- $k_{on}$ = association rate constant
- $k_{off}$ = dissociation rate constant
- $k_{int}$ = internalization/degradation rate constant for the complex
- $k_{syn}$ = zero-order target synthesis rate
- $k_{deg}$ = first-order target degradation rate constant
- $CL_{lin}$ = linear (non-target-mediated) clearance
- $V_c$ = central volume of distribution

$k_{int}$ only appears in the complex equation. Internalization removes the
complex, so also putting a $-k_{int} \cdot RC$ term in the free-drug equation
would eliminate the same material twice.

At equilibrium the dissociation constant is

$$
K_D = \frac{k_{off}}{k_{on}} = \frac{C \cdot R}{RC}
$$

and at baseline (no drug) the target is at steady state:

$$
R_0 = \frac{k_{syn}}{k_{deg}}
$$

where $R_0$ is the baseline target concentration.

### Rapid binding vs quasi-steady-state

In practice the full model is usually reduced. Two reductions often get mixed
up, and they use different constants.

Rapid binding (quasi-equilibrium, QE) assumes binding equilibrates
instantly, so the complex is governed by the dissociation constant:

$$
RC = \frac{R_{tot} \cdot C}{K_D + C}, \qquad K_D = \frac{k_{off}}{k_{on}}
$$

Quasi-steady-state (QSS) only assumes the complex is at steady state, which
also accounts for loss of complex by internalization:

$$
RC = \frac{R_{tot} \cdot C}{K_{ss} + C}, \qquad K_{ss} = \frac{k_{off} + k_{int}}{k_{on}}
$$

where $R_{tot} = R + RC$ is the total target concentration. The two only match
when internalization is slow compared with dissociation ($k_{int} \ll k_{off}$).
For antibodies against internalizing targets that often isn't true, and using
$K_D$ where $K_{ss}$ belongs biases the binding parameter.

Under QSS the total clearance becomes:

$$
CL_{total} = CL_{lin} + \frac{k_{int} \cdot R_{tot}}{K_{ss} + C}
$$

### Michaelis-Menten approximation

When target binding is fast relative to target turnover, the system can be
approximated with Michaelis-Menten kinetics:

$$
CL(C) = CL_{lin} + \frac{V_{max}}{K_M + C}
$$

where:
- $V_{max} = k_{int} \cdot R_{tot}$ = maximum target-mediated elimination rate
- $K_M \approx K_D$ = Michaelis constant (approximately equal to dissociation constant)

so the total clearance is

$$
CL_{total} = CL_{lin} + CL_{TMDD}(C) = CL_{lin} + \frac{V_{max}}{K_M + C}
$$

## Behavior across the concentration range

When $C \ll K_M$, target-mediated clearance dominates:

$$
CL_{total} \approx CL_{lin} + \frac{V_{max}}{K_M}
$$

Clearance is at its maximum here, so elimination is fast, half-life is short,
clearance relative to dose is high, and the PK is nonlinear and
concentration-dependent.

When $C \gg K_M$, target binding is saturated:

$$
CL_{total} \approx CL_{lin}
$$

and the PK approaches linear behavior: constant clearance, stable half-life,
dose-proportional exposure.

In between ($C \approx K_M$), clearance moves from high (target-mediated) to
low (linear), so clearance and half-life depend on dose and the exposure-dose
relationship is nonlinear.

## Clinical implications

TMDD gives greater than dose-proportional exposure:
- Lower doses → target unsaturated → higher clearance → less exposure per mg
- Higher doses → target saturated → lower clearance → more exposure per mg

Exposure still goes up with dose, just faster than dose. This is the same
direction as saturable metabolism and different from what linear PK predicts,
which matters for dose selection in early-phase trials, dose escalation, and
working out the therapeutic window.

The effective half-life depends on concentration:

$$
t_{1/2} = \frac{0.693 \cdot V}{CL_{total}(C)}
$$

At low concentrations it's short because clearance is high. As concentration
rises and the target saturates, half-life gets longer and approaches the linear
elimination half-life.

For dosing regimens this means loading doses may be needed to saturate the
target, maintenance dosing frequency depends on the target turnover rate
($k_{deg}$), and accumulation won't follow linear PK predictions.

## Examples

Many monoclonal antibodies show TMDD:

- Cetuximab (anti-EGFR): high-affinity binding to EGFR, TMDD at low doses,
  clearance decreases as dose increases.
- Rituximab (anti-CD20): binds CD20 on B-cells, target-mediated elimination
  through B-cell internalization, nonlinear PK at therapeutic doses.
- Bevacizumab (anti-VEGF): binds vascular endothelial growth factor; TMDD
  contributes to dose-dependent clearance.

Other biologics include fusion proteins (e.g. etanercept), receptor
antagonists (e.g. anakinra) and enzyme replacement therapies.

## NONMEM implementation

```
$PK
CL_LIN = THETA(1) * EXP(ETA(1))
V      = THETA(2) * EXP(ETA(2))
VMAX   = THETA(3)
KM     = THETA(4)
S1     = V

$DES
; Concentration has to be formed inside $DES: it changes with every
; integration step, so it cannot be computed once in $PK.
CONC = A(1)/V
DADT(1) = -(CL_LIN/V)*A(1) - VMAX*CONC/(KM + CONC)

$ERROR
IPRED = A(1)/V
Y = IPRED*(1 + ERR(1)) + ERR(2)
```

## Choosing a simplified model

The full model has several parameters that usually can't be identified from
typical clinical data, so simpler versions are common:

1. Rapid binding (quasi-equilibrium, QE): drug, target and complex
   equilibrate instantly, governed by $K_D$. "Rapid binding" and
   "quasi-equilibrium" are two names for the same approximation.
2. Quasi-steady-state (QSS): the complex is at steady state, governed by
   $K_{ss}$. Less restrictive than QE, and the one to use when the complex is
   internalized quickly.
3. Michaelis-Menten: drops the target equations and keeps only saturable
   elimination. It can be identified from routine PK data, but the parameters
   are no longer target binding constants and shouldn't be reported as if they
   were.
4. Constant $R_{tot}$: keeps the binding terms but assumes total target stays
   constant over the observation period. Only reasonable for targets that turn
   over slowly.

Which one to use depends on how rich the sampling is, which parameters are
identifiable, computation time, and whether the model makes biological sense.

## Estimation problems

- $k_{on}$, $k_{off}$, $k_{int}$ and $R_{tot}$ are often poorly identifiable
  from PK data alone.
- You need rich sampling at low concentrations to characterize the
  target-mediated clearance.
- The fits are sensitive to initial estimates.
- Target expression ($R_{tot}$) can vary with disease state, which calls for a
  population approach with covariates.

## Where it gets used

A TMDD model helps with designing loading and maintenance regimens, predicting
exposure at higher doses from low-dose data, accounting for disease-related
changes in target expression in special populations, predicting interactions
that change target expression or turnover, and linking PK to PD through target
engagement.

For biologics and other targeted drugs, the saturable elimination through
target binding makes the dose-exposure relationship quite different from what
linear PK would predict, and the model gives a mechanistic way to describe and
predict that across the dose range.
