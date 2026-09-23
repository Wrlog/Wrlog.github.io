---
layout: post
title: "Wearable Data and Molecular Phenotypes: Aggregation, Diurnal Structure and Honest Associations"
categories: Wearables
description: "Turning continuous sensor streams into analysable exposures, aligning them with sparse biological sampling, and testing metabolite-wearable associations without inflating the result"
keywords: "Wearables, digital biomarkers, actigraphy, heart rate variability, sleep, circadian, diurnal variation, mixed-effects models, metabolomics, FDR, sampling alignment"
date: 2026-09-21
---

## Introduction

A wrist-worn device produces something pharmacology is not used to: a nearly
continuous, months-long record of physiology, at a sampling density no
biospecimen will ever match. Against it sits the biology — a metabolomics panel,
a biomarker, a drug concentration — measured a handful of times. Most of the
difficulty in linking the two is not statistical. It is in deciding what the
continuous stream *is*, as a variable, before any model sees it.

These notes cover the three decisions that do the work: how to aggregate a
stream into an exposure, how to align that exposure with a sparse sample, and
what the within-day structure does to an association if it is ignored.

## What a Wearable Actually Measures

Almost nothing coming off a consumer or research-grade wearable is a direct
measurement of the quantity it is named after.

- **Steps** are an accelerometer signal passed through a proprietary
  step-detection algorithm. Two devices disagree, and one device disagrees with
  itself across a firmware update.
- **Sleep stages** are an inference from movement and heart rate, not
  polysomnography. Total sleep time is reasonably well estimated; stage-level
  output is much weaker, and REM/deep splits should be treated as
  device-specific constructs rather than physiology.
- **Heart rate variability** is derived from an optical pulse signal, so it is
  pulse rate variability, sensitive to motion and perfusion. The metric reported
  is often RMSSD over a fixed nocturnal window, which is a choice, not a
  standard.
- **Resting heart rate** is a daily summary computed by a vendor algorithm whose
  definition of "resting" is undocumented and can change.

Two consequences follow. First, a wearable variable is comparable *within a
device and firmware version* far more safely than across them; device model
belongs in the model as a covariate, or the cohort belongs restricted to one
device. Second, the correct framing is that these are digital *phenotypes* —
reproducible, biologically meaningful constructs — not gold-standard
measurements. That framing is enough for association work and not enough for a
claim about mechanism.

## Missingness Is Behaviour, Not Noise

A wearable is missing data when it is off the wrist, and it comes off for
reasons: charging, showering, discomfort, illness, travel, and losing interest
in the study. This is missing-not-at-random in the most direct way — non-wear
correlates with the very states under study.

The minimum discipline is a **wear-time rule declared in advance**: a day counts
only if wear time exceeds some threshold (10 or 16 hours are common; nocturnal
metrics need the night covered specifically), and a participant-period counts
only if some number of valid days are present. Those thresholds are
consequential and should be reported with their cost: how many
participant-days, and which participants, each rule removed. A cohort that
silently thins from 60 participants to 34 by the time of the model is not the
cohort described in the methods.

It is worth checking whether valid-day counts differ by group. If they do, the
missingness is informative and the complete-case analysis is biased in a
direction that should be stated even if it cannot be fixed.

## From Stream to Exposure

A model needs one number per sample, and a sensor gives thousands. The
aggregation is where most of the analytic freedom lives, so it should be fixed
before looking at outcomes.

Four choices define it:

1. **Window.** How much time before (or around) the biological sample
   contributes: the preceding night, 24 hours, 7 days. This should follow the
   biology's timescale. A metabolite with a half-life of hours has no business
   being regressed on a 7-day activity average.
2. **Summary.** Mean, median, total, time above a threshold, or a variability
   measure such as the standard deviation across days. Note the direct analogy
   to exposure metrics in PK: $AUC$, $C_{max}$ and time above target are three
   summaries of the same curve answering different questions, and the same
   reasoning applies here.
3. **Reference.** Absolute value, or deviation from the participant's own
   baseline. The second is usually the stronger construct — between-person
   differences in resting heart rate dwarf the within-person changes of
   interest — and it is what a person-mean-centred term encodes:

$$
x_{ij}^{\text{within}} = x_{ij} - \bar{x}_{i\cdot},
\qquad
x_{i}^{\text{between}} = \bar{x}_{i\cdot} - \bar{x}_{\cdot\cdot}
$$

   Entering both separates the within-person effect from the between-person one.
   Entering only the raw value estimates a blend of the two and calls it one
   effect.

4. **Lag.** Whether the exposure precedes the sample, follows it, or surrounds
   it. Only the first supports a directional reading, and even then weakly.

The trap here is quiet multiplicity: three windows times four summaries times
two references is 24 versions of the same association, and reporting the one
that reached significance is a garden of forking paths with a sensor attached.
Pre-specify one primary aggregation; run the others, if at all, as a stated
sensitivity analysis whose disagreements are reported.

## Diurnal Structure

Both sides of the association vary within the day. Many plasma metabolites —
cortisol-associated species, bile acids, amino acids after a meal — show
systematic diurnal variation, and so does every wearable metric. If sample
collection time is not uniform across groups, time of day is a confounder that
looks exactly like an effect.

The cheap protection is to record sampling clock time and adjust for it. A pair
of harmonic terms handles a daily rhythm without spending many degrees of
freedom:

$$
f(t) = \beta_c \cos\!\left(\frac{2\pi t}{24}\right) + \beta_s \sin\!\left(\frac{2\pi t}{24}\right)
$$

which is a cosine of amplitude $\sqrt{\beta_c^2 + \beta_s^2}$ and phase
$\arctan(\beta_s / \beta_c)$, linear in its parameters and so estimable in any
mixed model. Adding the second harmonic ($2\pi t / 12$) captures a bimodal
shape, such as a meal-driven second peak.

Characterising diurnal variability is also a result in its own right, and often
a more robust one than the cross-sectional association: which analytes have
detectable within-day rhythm, what amplitude, and with what phase relative to
sleep offset. That question uses the dense side of the data properly, whereas a
single-timepoint association mostly does not.

## The Model

With repeated visits per participant, a random intercept per participant is the
baseline specification:

$$
y_{ij} = \beta_0 + \beta_1 x_{ij}^{\text{within}} + \beta_2 x_{i}^{\text{between}}
+ f(t_{ij}) + \mathbf{z}_{ij}^\top \boldsymbol{\gamma} + u_i + \varepsilon_{ij},
\qquad u_i \sim N(0, \sigma_u^2)
$$

where $y_{ij}$ is the log-transformed analyte, $x$ the aggregated wearable
exposure split into within- and between-person parts, $f(t_{ij})$ the diurnal
terms, and $\mathbf{z}$ the covariates — age, sex, BMI, device model, season if
the study runs long enough.

Two notes on interpretation. $\beta_1$ is a within-person effect: it says what
happens to the analyte when *this participant's* activity or sleep departs from
their own usual, which is the closer thing to a causal reading and the one that
is not confounded by stable between-person traits. And with log-transformed
analyte, $\beta_1$ is a multiplicative effect — a unit change in exposure
multiplies the analyte by $e^{\beta_1}$ — which is how it should be reported,
not as a raw coefficient on an arbitrary intensity scale.

## Error Control and What Counts as a Finding

Thousands of analytes crossed with a handful of wearable metrics is a large
testing problem. Benjamini–Hochberg within each wearable metric — not pooled
across all of them, and not pooled with unrelated contrasts — keeps the
threshold interpretable.

Two adjustments to expectations are worth making in advance. Effects are small:
a within-person association between last night's sleep duration and a plasma
metabolite is a modest multiplicative shift, and a study powered for a large
effect will find nothing. And the analytes are correlated with each other,
often because they belong to the same pathway or are adducts of one compound, so
a list of 50 significant features may be a much smaller number of distinct
findings. Collapse to compounds, or to pathways, before counting.

The finding that replicates is usually the one that holds across the sensitivity
aggregations, not the one with the smallest $q$-value in the primary.

## Summary

Linking wearables to molecular data is mostly a measurement-definition problem
wearing a statistics costume. Decide what the device is actually reporting,
declare a wear-time rule and report what it removes, fix one aggregation window
and summary before looking at outcomes, split within- from between-person
variation, adjust for time of day on both sides, and control error within
metric. The dense sensor stream is the part of the dataset with real
information; spending it on a single cross-sectional correlation wastes it,
while characterising the within-day and within-person structure uses it for what
it is. The companion note on
[untargeted metabolomics]({{ site.url }}/2026/09/14/Untargeted-Metabolomics-Feature-Tables/)
covers the other side of the join.
