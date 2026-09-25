---
layout: post
title: "Untargeted Metabolomics: From Feature Table to Association List"
categories: Omics
description: "Steps between an untargeted metabolomics export and a list of associations: filtering, normalization, non-detects, batch structure, repeated visits and error control"
keywords: "Untargeted metabolomics, LC-MS, feature table, normalization, missing not at random, batch effects, mixed-effects models, Benjamini-Hochberg, FDR, annotation"
date: 2026-09-14
---

## Introduction

Untargeted metabolomics data usually arrives as a feature table: samples in
rows, mass-spectrometry features in columns, intensities in the cells. It looks
ready for statistics, but most of the choices that decide whether the final
association list means anything are made between that export and the first
model fit, and they often get made without anyone writing them down.

These notes go through those choices in the order they come up. The example I
have in mind is plasma metabolomics from a cohort with repeated visits per
patient, which breaks a few of the usual shortcuts.

## What a feature table is

A few things make a feature table different from the tidy assay data most
statistics courses assume.

A feature is not a metabolite. It is a mass-to-charge ratio at a retention
time, and it could be a metabolite, an adduct of one, an in-source fragment, an
isotopologue or contamination. Annotation maps some features to compounds with
varying confidence, and the confidence level matters: a level-1 identification
matched to an authentic standard and a level-3 putative class assignment don't
support the same claims. Several correlated features are often one compound
showing up more than once.

Intensity is relative. Ionization efficiency differs by orders of magnitude
between compounds, so intensities can be compared across samples within a
feature but not across features. An untargeted run can't tell you that
metabolite A is more abundant than metabolite B. Fold changes within a feature
are fine, and that's what the analysis is for anyway.

Blank cells mean the feature wasn't detected in that sample. It might be
absent, below the limit of detection, or missed by the peak picker. These are
different mechanisms, and how you handle them shapes the result more than which
test you pick.

## Filtering

Two filters come before normalization. For both, report what the choice cost.

Prevalence: drop features detected in fewer than some fraction of samples. A
common default is 50%, or 50% within at least one group. The within-group
version matters when a compound is present in one arm and absent in the other,
because a global prevalence filter throws away exactly that case.

Annotation: keeping only annotated features makes interpretation possible but
discards real signal. Whether that's acceptable depends on whether you want a
mechanism or a classifier.

Every filter should log what it dropped and why, and the counts should go in
the write-up. If a pipeline silently removes 60% of the features, versioning
the code doesn't make it reproducible in any useful sense.

## Normalization and transformation

Total ion current (TIC) normalization divides each sample by its own summed
intensity, which corrects for injection volume and gross sensitivity drift:

$$
\tilde{x}_{ij} = \frac{x_{ij}}{\sum_{k} x_{ik}} \cdot \bar{s}
$$

where $x_{ij}$ is the intensity of feature $j$ in sample $i$ and $\bar{s}$ is
the mean sample sum. The catch is that it assumes total signal is constant. If
one group really has more total metabolite content, TIC normalization removes
that effect. Probabilistic quotient normalization is the usual alternative;
median or quantile scaling are simpler options.

Then log-transform. Intensities are right-skewed over several orders of
magnitude, and the log turns multiplicative effects into additive ones, which
is what a linear model can express:

$$
y_{ij} = \log_2(\tilde{x}_{ij} + c)
$$

The pseudo-count $c$ is only there to handle zeros, and its value decides how
far below the detected range a non-detect ends up. If non-detects are treated
as missing (next section), you don't need $c$ at all, which is another point in
favour of doing that.

## Non-detects: treat as missing, don't impute

The usual approach is to impute non-detects at half the minimum observed
intensity, or by $k$-nearest neighbours, and carry on. Both are fine under
missing-at-random. Metabolomics non-detects are rarely missing at random,
though. They're missing because the value was low, which is
missing-not-at-random by definition.

Imputing at a fixed low value puts a spike in the left tail of the
distribution. If one group has more non-detects (which is what happens when a
compound differs between groups), the spike lands unevenly and creates a
difference in the mean for the test to find.

What I'd default to instead is two analyses that answer different questions:

1. Model detected intensity only, with non-detects as missing. Among samples
   where the feature is present, does its abundance differ?
2. Test presence/absence separately, as a binomial contrast on detection
   status. Is the feature detected at different rates between groups?

The intensity model can't see a feature that's simply absent in one group, and
the detection-rate test can't see a graded difference, so reporting both keeps
one from being mistaken for the other. If only a handful of samples in a group
have the feature detected, skip the intensity model for that feature instead of
fitting it to four points.

## Repeated visits and batch structure

With several samples per patient the observations aren't independent. A
patient random intercept is the minimum:

$$
y_{ij} = \beta_0 + \beta_1 \, \mathrm{group}_i + \mathbf{z}_i^\top \boldsymbol{\gamma} + u_{p(i)} + \varepsilon_{ij},
\qquad u_p \sim N(0, \sigma_u^2)
$$

where $u_{p(i)}$ is the random intercept for the patient contributing sample
$i$ and $\mathbf{z}_i$ holds covariates. Ordinary least squares treats repeat
visits as independent patients and understates the standard error on
$\beta_1$, and the problem is worst when patients contribute unequal numbers of
visits.

Run order and batch need the same attention. LC-MS sensitivity drifts within a
run and shifts between batches. If group correlates with run order, which
happens whenever samples are run as they come in, the drift becomes the group
effect. Two things help: a run-order-adjusted model as a sensitivity check, and
a cross-batch check on whether pooled QC samples behave consistently that halts
the analysis when they don't.

Fitting OLS and the run-order-adjusted model next to the primary mixed model is
cheap and shows whether a finding depends on the model specification. If the
three disagree, report that.

## Multiple testing

A few thousand features at $\alpha = 0.05$ gives a few hundred false positives
before any biology. The standard fix is Benjamini–Hochberg control of the false
discovery rate: order the $p$-values $p_{(1)} \le \dots \le p_{(m)}$ and reject
up to the largest $k$ with

$$
p_{(k)} \le \frac{k}{m} q
$$

Two practical points. Apply it within each contrast rather than pooling every
comparison in the analysis, otherwise the threshold depends on how many
unrelated questions happen to be in the same script. And FDR control is about
the expected proportion of false rejections in the list. A $q$-value of 0.05
doesn't mean that particular feature has a 5% chance of being wrong.

Adducts and fragments of the same compound make the tests correlated.
Benjamini–Hochberg is valid under positive regression dependence, which is the
usual justification, but correlated features still make the list look longer
than the number of distinct findings. Collapse to compounds before counting
discoveries, so you're not reporting 40 features that are really 11 molecules.

## What to report

Along with the ranked table, I'd want:

- counts at every filter, with what was dropped
- the primary model and its sensitivity comparisons, side by side
- presence/absence tested separately from intensity
- $q$-values within contrast, with discoveries collapsed to compounds
- a statement of what the design can't answer

The last point matters more than it looks. A cohort can have plenty of power to
ask whether the metabolome separates one disease from another and still be
unable to say whether it predicts treatment response before the first dose. For
example, if medication is recorded without start dates, only a handful of
patients may have a plasma sample that provably comes before treatment, and no
modelling fixes that. In that situation the useful output is a feasibility
assessment giving the design and sample size a proper study would need. That
still counts as a result, even without any $p$-values.

## Summary

With untargeted metabolomics, care in the steps before the statistics matters
more than a clever test. Choose filters against their alternatives, treat
non-detects as missing instead of imputing them, put patient structure in the
model, check run order, and control error within each contrast. The earlier
notes on [transcriptomics]({{ site.url }}/2022/07/09/Transcription/) and
[chromatin accessibility]({{ site.url }}/2022/07/12/ATACseq/) cover similar
pre-processing for other assays.
