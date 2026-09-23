---
layout: post
title: "Untargeted Metabolomics: From Feature Table to a Defensible Association List"
categories: Omics
description: "What has to happen between an untargeted metabolomics export and a list of associations worth acting on — normalization, non-detects, batch structure, repeated visits and error control"
keywords: "Untargeted metabolomics, LC-MS, feature table, normalization, missing not at random, batch effects, mixed-effects models, Benjamini-Hochberg, FDR, annotation"
date: 2026-09-14
---

## Introduction

An untargeted metabolomics delivery arrives as a feature table: rows of samples,
columns of mass-spectrometry features, intensities in the cells. It looks like a
matrix ready for statistics. It is not. Almost every methodological decision
that determines whether the eventual association list is real happens between
that export and the first model fit, and most of those decisions are made
silently.

These notes are about the decisions worth making explicitly, in the order they
come up. The running example is plasma metabolomics from a cohort with repeated
visits per patient — the structure that makes several of the usual shortcuts
wrong.

## The Feature Table Is Not a Measurement

Three properties separate a feature table from the tidy assay data most
statistical training assumes.

**A feature is not a metabolite.** A feature is a mass-to-charge ratio at a
retention time. It may be a metabolite, an adduct of one, an in-source fragment,
an isotopologue, or contamination. Annotation maps some features to compounds
with varying confidence, and the confidence levels are not decoration: a level-1
identification matched to an authentic standard and a level-3 putative class
assignment do not support the same claims. Correlated features often reflect one
compound appearing several times, not several findings.

**Intensity is relative, not concentration.** Ionization efficiency differs by
orders of magnitude between compounds, so intensities are comparable *across
samples within a feature*, and not across features. Any statement of the form
"metabolite A is more abundant than metabolite B" is unsupported by an
untargeted run. Fold changes within a feature are fine; that is the whole point.

**Zeros are not zeros.** A blank cell means the feature was not detected in that
sample. That may be because it is absent, because it fell below the limit of
detection, or because the peak picker missed it. These are different mechanisms
with different implications, and the choice of how to handle them does more to
shape the result than the choice of test.

## Filtering Before Anything Else

Two filters apply before normalization, and both should be reported with the
cost of the choice rather than asserted.

*Prevalence.* Drop features detected in fewer than some fraction of samples — a
common default is 50%, or 50% within at least one group. The second form matters
when a compound is genuinely present in one arm and absent in another; a global
prevalence filter throws that away precisely when it is interesting.

*Annotation.* Restricting to annotated features makes downstream interpretation
possible and discards real signal. Whether that trade is acceptable depends on
whether the deliverable is a mechanism or a classifier.

The habit worth forming: every filter reports what it dropped and why, and the
counts appear in the write-up. A pipeline that silently removes 60% of the
features is not reproducible in any useful sense, even if the code is versioned.

## Normalization and Transformation

Total ion current normalization divides each sample by its own summed intensity,
correcting for injection volume and gross sensitivity drift:

$$
\tilde{x}_{ij} = \frac{x_{ij}}{\sum_{k} x_{ik}} \cdot \bar{s}
$$

where $x_{ij}$ is the intensity of feature $j$ in sample $i$ and $\bar{s}$ is
the mean sample sum. This carries an assumption that is easy to miss: it treats
total signal as constant biology. If a group genuinely has more total metabolite
content, TIC normalization removes exactly that effect. Probabilistic quotient
normalization is the usual alternative, and median or quantile scaling the
simpler ones.

Log transformation follows, because intensities are right-skewed over several
orders of magnitude and because it converts multiplicative effects into additive
ones, which is what a linear model can express:

$$
y_{ij} = \log_2(\tilde{x}_{ij} + c)
$$

The pseudo-count $c$ exists only to handle zeros, and its value quietly sets how
far below the detected range a non-detect sits. If non-detects are treated as
missing — see below — $c$ is not needed at all, which is one more reason to
prefer that route.

## Non-Detects: Missing, Not Imputed

The common move is to impute non-detects at half the minimum observed intensity,
or by $k$-nearest neighbours, and proceed. Both are defensible under
missing-at-random, and metabolomics non-detects are rarely missing at random:
they are missing *because the value was low*, which is the definition of
missing-not-at-random.

Imputing at a fixed low value creates a spike in the left tail of the
distribution. If one group has more non-detects — which is exactly the case when
a compound differs between groups — that spike lands asymmetrically and
manufactures a difference in the mean. The test then has something to find.

The alternative worth defaulting to is a pair of analyses answering different
questions:

1. **Model detected intensity only**, treating non-detects as missing. This
   asks: among samples where the feature is present, does its abundance differ?
2. **Test presence/absence separately**, as a binomial contrast on detection
   status. This asks: is the feature detected at different rates between groups?

A model of detected intensity cannot see a feature that is simply absent in one
group, and a detection-rate test cannot see a graded difference. Reporting both
avoids attributing one to the other. Where the number of detected samples in a
group is small, the intensity model is not run at all rather than run on four
points.

## Repeated Visits and Batch Structure

With multiple samples per patient, independence fails. A patient-intercept mixed
model is the minimum:

$$
y_{ij} = \beta_0 + \beta_1 \, \mathrm{group}_i + \mathbf{z}_i^\top \boldsymbol{\gamma} + u_{p(i)} + \varepsilon_{ij},
\qquad u_p \sim N(0, \sigma_u^2)
$$

where $u_{p(i)}$ is the random intercept for the patient contributing sample
$i$, and $\mathbf{z}_i$ holds covariates. Fitting ordinary least squares instead
treats repeat visits as independent patients and understates the standard error
on $\beta_1$ — the effect is largest exactly where patients contribute unequal
numbers of visits.

Run order and batch deserve the same treatment. LC-MS sensitivity drifts within
a run and shifts between batches, and if group assignment correlates with run
order — which happens whenever samples are processed as they arrive — the drift
*is* the group effect. Two things help: a run-order-adjusted model as a
sensitivity comparison, and a cross-batch comparability diagnostic that reports
whether pooled QC samples behave consistently and **stops** when they do not. A
diagnostic that cannot fail is not a diagnostic.

Fitting OLS and the run-order-adjusted model alongside the primary mixed model
costs little and shows whether the finding depends on the specification. If the
three disagree, that is the result.

## Error Control Across Thousands of Features

A few thousand features tested at $\alpha = 0.05$ yields a few hundred false
positives before any biology. Benjamini–Hochberg control of the false discovery
rate is the standard choice, ordering the $p$-values
$p_{(1)} \le \dots \le p_{(m)}$ and rejecting up to the largest $k$ with

$$
p_{(k)} \le \frac{k}{m} q
$$

Two practical points. Apply it **within each contrast**, not pooled across every
comparison in the analysis — pooling makes the threshold depend on how many
unrelated questions happen to share a script. And note that FDR control is a
statement about the expected proportion of false rejections in the list, not
about any individual feature: a $q$-value of 0.05 does not mean that feature has
a 5% chance of being wrong.

Dependence between features — the adducts and fragments of one compound — means
the tests are correlated. Benjamini–Hochberg is valid under positive regression
dependence, which is the usual justification, but correlated features still make
the *list* look longer than the number of distinct findings it contains.
Collapsing to compounds before counting discoveries is more honest than
reporting 40 features that are 11 molecules.

## What the Output Should Be

The deliverable that survives review is not a ranked table. It is:

- the counts at every filter, with what was dropped;
- the primary model and its sensitivity comparisons, reported together;
- presence/absence tested separately from intensity;
- $q$-values within contrast, with discoveries collapsed to compounds;
- and an explicit statement of what the design cannot answer.

That last one carries more weight than it appears to. A cohort can be well
powered for the question of whether the metabolome separates one disease from
another and simply unable to speak to whether it predicts treatment response
*before* the first dose — if, say, medication is recorded without start dates,
so only a handful of patients have a plasma sample that provably precedes
treatment. No amount of modelling recovers that. The useful output in that case
is a feasibility assessment that sets the design and sample size a study would
need to answer the question properly, which is a real result even though it
contains no $p$-values.

## Summary

Untargeted metabolomics rewards care in the pre-statistical steps far more than
sophistication in the statistical ones. Filters chosen against their
alternatives, non-detects treated as missing rather than imputed, patient
structure in the model, run order checked rather than assumed away, and error
control applied within contrast will do more for the credibility of an
association list than any change of test. The earlier notes on
[transcriptomics]({{ site.url }}/2022/07/09/Transcription/) and
[chromatin accessibility]({{ site.url }}/2022/07/12/ATACseq/) cover the same
pre-processing discipline for other assays.
