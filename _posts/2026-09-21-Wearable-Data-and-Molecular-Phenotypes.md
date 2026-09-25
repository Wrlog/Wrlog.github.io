---
layout: post
title: "Wearable Data and Molecular Phenotypes: Aggregation, Diurnal Structure and Associations"
categories: Wearables
description: "Turning continuous sensor streams into analysable exposures, lining them up with sparse biological sampling, and testing metabolite-wearable associations without inflating the result"
keywords: "Wearables, digital biomarkers, actigraphy, heart rate variability, sleep, circadian, diurnal variation, mixed-effects models, metabolomics, FDR, sampling alignment"
date: 2026-09-21
---

## Introduction

A wrist-worn device gives you a nearly continuous record of physiology over
months, far denser than any biospecimen schedule. The biology (a metabolomics
panel, a biomarker, a drug concentration) is measured a handful of times. A lot
of the work in linking the two is deciding what the continuous stream means
as a variable before any model sees it.

These notes cover three decisions: how to aggregate a stream into an exposure,
how to line that exposure up with a sparse sample, and what within-day
structure does to an association if you ignore it.

## What a wearable measures

Very little coming off a consumer or research-grade wearable is a direct
measurement of what it's named after.

- Steps are an accelerometer signal run through a proprietary step-detection
  algorithm. Two devices disagree with each other, and one device can disagree
  with itself after a firmware update.
- Sleep stages are inferred from movement and heart rate; this isn't
  polysomnography. Total sleep time is estimated reasonably well, but
  stage-level output is much weaker, and I'd treat REM/deep splits as
  device-specific constructs rather than physiology.
- Heart rate variability comes from an optical pulse signal, so strictly it's
  pulse rate variability, and it's sensitive to motion and perfusion. The
  reported metric is often RMSSD over a fixed nocturnal window, which is one
  choice among several and not a standard.
- Resting heart rate is a daily summary from a vendor algorithm whose
  definition of "resting" is undocumented and can change.

So a wearable variable is much safer to compare within a device and firmware
version than across them. Either put device model in the model as a covariate
or restrict the cohort to one device. It also helps to think of these as
digital phenotypes: reproducible constructs with some biological meaning, but
not gold-standard measurements. That's enough for association work but not for
claims about mechanism.

## Missing data

A wearable records nothing when it's off the wrist, and people take it off for
reasons: charging, showering, discomfort, illness, travel, losing interest in
the study. That is missing-not-at-random in the most direct way, because
non-wear is correlated with the states you're studying.

At minimum, set a wear-time rule in advance. A day counts only if wear time is
above some threshold (10 or 16 hours are common; nocturnal metrics need the
night itself covered), and a participant-period counts only if it has enough
valid days. These thresholds matter, so report how many participant-days, and
which participants, each rule removed. If the cohort goes from 60 participants
to 34 by the time you fit the model without anyone saying so, the analysis is
no longer about the cohort in the methods section.

Check whether valid-day counts differ by group. If they do, the missingness is
informative and the complete-case analysis is biased. State the likely
direction of the bias even if you can't correct it.

## From stream to exposure

The model needs one number per sample and the sensor gives thousands. Most of
the analytic freedom is in this aggregation step, so fix it before looking at
outcomes. There are four choices:

1. Window: how much time before (or around) the biological sample counts. The
   preceding night, 24 hours, 7 days. Match it to the biology's timescale; a
   metabolite with a half-life of hours shouldn't be regressed on a 7-day
   activity average.
2. Summary: mean, median, total, time above a threshold, or a variability
   measure like the standard deviation across days. This is the same idea as
   exposure metrics in PK, where $AUC$, $C_{max}$ and time above target are
   three summaries of one curve that answer different questions.
3. Reference: the absolute value, or the deviation from the participant's own
   baseline. The deviation is usually better, because between-person
   differences in resting heart rate are much bigger than the within-person
   changes you care about. That's what person-mean centring gives you:

$$
x_{ij}^{\text{within}} = x_{ij} - \bar{x}_{i\cdot},
\qquad
x_{i}^{\text{between}} = \bar{x}_{i\cdot} - \bar{x}_{\cdot\cdot}
$$

   Putting both terms in separates the within-person effect from the
   between-person one. Using only the raw value estimates a mix of the two and
   reports it as one effect.

4. Lag: whether the exposure comes before the sample, after it, or around it.
   Only "before" supports a directional reading, and only weakly.

The risk here is multiplicity that nobody counts. Three windows, four summaries
and two references make 24 versions of the same association, and reporting
whichever one reached significance is the garden of forking paths again.
Pre-specify one primary aggregation. If you run the others, call them a
sensitivity analysis and report where they disagree.

## Diurnal structure

Both sides of the association vary over the day. Many plasma metabolites
(cortisol-associated species, bile acids, amino acids after a meal) have
systematic diurnal variation, and so does every wearable metric. If sample
collection time differs between groups, time of day is a confounder that looks
just like an effect.

The cheap fix is to record the clock time of sampling and adjust for it. Two
harmonic terms handle a daily rhythm without using many degrees of freedom:

$$
f(t) = \beta_c \cos\!\left(\frac{2\pi t}{24}\right) + \beta_s \sin\!\left(\frac{2\pi t}{24}\right)
$$

This is a cosine with amplitude $\sqrt{\beta_c^2 + \beta_s^2}$ and phase
$\arctan(\beta_s / \beta_c)$. It's linear in its parameters, so any mixed model
can estimate it. A second harmonic ($2\pi t / 12$) picks up a bimodal shape,
such as a second peak after a meal.

Describing diurnal variability is also a result in itself, and often a more
reliable one than the cross-sectional association: which analytes have a
detectable within-day rhythm, how large it is, and its phase relative to sleep
offset. That question actually uses the dense side of the data. A
single-timepoint association mostly doesn't.

## The model

With repeated visits per participant, start with a random intercept per
participant:

$$
y_{ij} = \beta_0 + \beta_1 x_{ij}^{\text{within}} + \beta_2 x_{i}^{\text{between}}
+ f(t_{ij}) + \mathbf{z}_{ij}^\top \boldsymbol{\gamma} + u_i + \varepsilon_{ij},
\qquad u_i \sim N(0, \sigma_u^2)
$$

Here $y_{ij}$ is the log-transformed analyte, $x$ is the aggregated wearable
exposure split into within- and between-person parts, $f(t_{ij})$ are the
diurnal terms, and $\mathbf{z}$ holds covariates (age, sex, BMI, device model,
and season if the study runs long enough).

On interpretation: $\beta_1$ is a within-person effect. It describes what
happens to the analyte when this participant's activity or sleep moves away
from their own usual level. That's closer to a causal reading, and stable
between-person traits don't confound it. With a log-transformed analyte,
$\beta_1$ is multiplicative (a unit change in exposure multiplies the analyte
by $e^{\beta_1}$), so report it that way rather than as a raw coefficient on
an arbitrary intensity scale.

## Multiple testing

Thousands of analytes crossed with a few wearable metrics is a lot of tests.
Run Benjamini–Hochberg within each wearable metric, not pooled across metrics
or with unrelated contrasts, so the threshold stays interpretable.

Expect small effects. A within-person association between last night's sleep
duration and a plasma metabolite is a modest multiplicative shift, and a study
powered for a large effect will find nothing. The analytes are also correlated,
often because they sit in the same pathway or are adducts of one compound, so
50 significant features may be far fewer distinct findings. Collapse to
compounds or pathways before counting.

The findings that replicate tend to be the ones that hold across the
sensitivity aggregations, which aren't necessarily the ones with the smallest
$q$-value in the primary analysis.

## Summary

Linking wearables to molecular data is mostly a problem of defining the
measurement. Work out what the device is reporting, set a wear-time rule and
report what it removes, fix one aggregation window and summary before looking
at outcomes, split within- from between-person variation, adjust for time of
day on both sides, and control error within each metric. The sensor stream is
where most of the information is, and a single cross-sectional correlation
wastes most of it; looking at within-day and within-person structure makes
better use of it. The note on
[untargeted metabolomics]({{ site.url }}/2026/09/14/Untargeted-Metabolomics-Feature-Tables/)
covers the other side of the join.
