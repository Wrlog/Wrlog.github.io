---
layout: post
title: "Exposure-Response Analysis: Linking Pharmacokinetics to Clinical Outcomes"
categories: Pharmacodynamics
description: "Exposure metrics, E-R model structures and NONMEM code for relating drug exposure to clinical endpoints and choosing doses"
keywords: "Exposure-Response, PK/PD Modeling, Pharmacodynamics, AUC, Trough Concentration, Clinical Endpoints, Dose Optimization"
date: 2023-05-20
---

## Introduction

Exposure-response (E-R) analysis puts numbers on the relationship between drug
exposure metrics and clinical or biomarker endpoints. It's used for choosing
doses, finding exposure targets, and supporting individualized dosing.

A plain concentration-effect plot can show hysteresis. E-R analysis instead
works with summary exposure metrics (area under the concentration-time curve
(AUC), trough concentration ($C_{min}$), peak concentration ($C_{max}$)) and
relates them to outcomes measured over a suitable time window.

## Exposure metrics

AUC is total drug exposure over a dosing interval or treatment period:

$$
AUC_{0-\tau} = \int_0^{\tau} C(t) \, dt
$$

or at steady state:

$$
AUC_{ss} = \frac{Dose}{CL}
$$

where $\tau$ is the dosing interval and $CL$ is clearance.

The trough ($C_{min}$) is the concentration at the end of a dosing interval:

$$
C_{min} = C_{ss,min} = \frac{Dose}{V} \cdot \frac{e^{-k \cdot \tau}}{1 - e^{-k \cdot \tau}}
$$

where $k = CL/V$ is the elimination rate constant.

The peak ($C_{max}$) is the maximum concentration after a dose:

$$
C_{max} = C_{ss,max} = \frac{Dose}{V} \cdot \frac{1}{1 - e^{-k \cdot \tau}}
$$

For antimicrobials, time above the minimum inhibitory concentration
($T_{>MIC}$) is often used:

$$
T_{>MIC} = \int_0^{\tau} \mathbf{1}_{C(t) > MIC} \, dt
$$

## Model structures

### Linear

The simplest assumes a straight line:

$$
E = E_0 + \alpha \cdot Exposure
$$

where:
- $E$ = response endpoint
- $E_0$ = baseline response
- $\alpha$ = slope parameter
- $Exposure$ = AUC, $C_{min}$, or other metric

### Log-linear

Often a better fit when exposure spans orders of magnitude:

$$
E = E_0 + \beta \cdot \ln(Exposure)
$$

or equivalently:

$$
E = E_0 + \beta \cdot \ln\left(\frac{Exposure}{Exposure_{ref}}\right)
$$

where $Exposure_{ref}$ is a reference exposure value.

### Emax

A sigmoidal curve with a saturating response:

$$
E = E_0 + \frac{E_{max} \cdot Exposure^{\gamma}}{EC_{50}^{\gamma} + Exposure^{\gamma}}
$$

where:
- $E_{max}$ = maximum drug effect
- $EC_{50}$ = exposure producing 50% of maximum effect
- $\gamma$ = Hill coefficient (steepness of curve)

### Logistic

For binary or categorical endpoints:

$$
P(Response) = \frac{1}{1 + e^{-(\alpha + \beta \cdot Exposure)}}
$$

or with an Emax structure:

$$
P(Response) = P_0 + \frac{P_{max} - P_0}{1 + \left(\frac{EC_{50}}{Exposure}\right)^{\gamma}}
$$

## Population E-R models

Population E-R models include inter-individual variability:

$$
E_{ij} = f(Exposure_{ij}, \theta_i) + \epsilon_{ij}
$$

where:
- $E_{ij}$ = response for individual $i$ at observation $j$
- $\theta_i$ = individual-specific parameters
- $\epsilon_{ij}$ = residual error

with individual parameters typically modeled as

$$
\theta_i = \theta_{pop} \cdot \exp(\eta_i)
$$

where $\eta_i \sim \mathcal{N}(0, \Omega)$ is the inter-individual variability.

Covariates can enter the E-R parameters too, for example:

$$
EC_{50,i} = EC_{50,pop} \cdot \left(\frac{WT_i}{70}\right)^{\theta_{WT}} \cdot (1 + \theta_{SEX} \cdot SEX_i)
$$

## NONMEM implementation

### Example: Emax Model with AUC

```
$PROBLEM Exposure-Response Analysis
$INPUT ID TIME AUC DV EVID MDV
$DATA data.csv IGNORE=@
$PRED
E0 = THETA(1)
EMAX = THETA(2)
EC50 = THETA(3) * EXP(ETA(1))   ; without this the fit is naive-pooled
GAMMA = THETA(4)

E_PRED = E0 + (EMAX * AUC**GAMMA) / (EC50**GAMMA + AUC**GAMMA)

Y = E_PRED + EPS(1)

$THETA
(50, 100)   ; E0 baseline
(0, 50)     ; EMAX
(0, 1000)   ; EC50
(0, 1, 5)   ; GAMMA Hill coefficient
$OMEGA
0.09        ; between-subject variability on EC50 (see E_PRED above)
$SIGMA
10          ; residual error variance
$ESTIMATION METHOD=1 INTERACTION MAXEVAL=9999
$COVARIANCE
$TABLE ID AUC E_PRED RES
NOPRINT ONEHEADER FILE=er_model.tab
```

### Example: Logistic Model for Binary Endpoint

```
$PROBLEM Exposure-Response - Binary Endpoint
$INPUT ID AUC DV
$DATA data.csv IGNORE=@
$PRED
ALPHA = THETA(1)
BETA  = THETA(2)

LOGIT  = ALPHA + BETA * LOG(AUC/100) + ETA(1)
P_RESP = 1 / (1 + EXP(-LOGIT))

; A binary endpoint has no residual error term. F_FLAG=1 tells NONMEM that
; Y is a likelihood rather than a prediction, so the model returns the
; probability of whichever outcome was actually observed.
F_FLAG = 1
IF (DV.EQ.1) Y = P_RESP
IF (DV.EQ.0) Y = 1 - P_RESP

$THETA
(-5, -2, 2)  ; ALPHA intercept
(0, 1, 5)    ; BETA slope
$OMEGA
0.1          ; between-subject variability on the logit
$ESTIMATION METHOD=1 LAPLACE -2LL MAXEVAL=9999
$COVARIANCE
$TABLE ID AUC P_RESP
NOPRINT ONEHEADER FILE=logistic_er.tab
```

There's no `$SIGMA` here. With `F_FLAG=1` the model supplies the likelihood
itself, so an additive error on a probability wouldn't mean anything. The
Laplace method is needed because the first-order conditional approximation
doesn't apply to a non-continuous likelihood.

## Finding target exposures

For an efficacy endpoint, the target is the exposure that gives the desired
response:

$$
Exposure_{target} = \arg\min_{Exposure} |E(Exposure) - E_{desired}|
$$

For an Emax model:

$$
Exposure_{target} = EC_{50} \cdot
\left(\frac{E_{desired} - E_0}{E_{max} - (E_{desired} - E_0)}\right)^{1/\gamma}
$$

The baseline appears in both terms. Writing the denominator as
$E_{max} - E_{desired}$ is a common slip and only works when $E_0 = 0$.

For a safety endpoint, the question is the maximum tolerable exposure:

$$
Exposure_{max} = \arg\max_{Exposure} \{Exposure : P(Toxicity) < \alpha\}
$$

where $\alpha$ is the acceptable toxicity probability (e.g. 0.05, 0.10).

The therapeutic window is the range between the two:

$$
\text{Therapeutic Window} = [Exposure_{eff,min}, Exposure_{safety,max}]
$$

## Uses

For dose selection the steps are: find the exposure with the best
efficacy/safety balance, use the PK model to predict the dose that reaches it,
and check that the predicted exposure matches what was observed in clinical
studies.

E-R relationships also support dose adjustment in pediatric patients
(age-dependent exposure differences), renal impairment (reduced clearance),
hepatic impairment (altered metabolism) and drug-drug interactions (predicted
exposure changes). In labeling, E-R analysis is evidence for recommended
regimens, dose adjustment guidelines, therapeutic drug monitoring
recommendations and special population dosing.

## Model evaluation

Goodness of fit:
- Visual: observed vs predicted response, exposure-response scatter plots,
  residual plots
- Statistical: objective function value (OFV), AIC/BIC, precision of
  parameter estimates
- Predictive: visual predictive checks (VPC), prediction intervals,
  cross-validation

Sensitivity analyses worth running: compare AUC vs $C_{min}$ vs $C_{max}$ as
the exposure metric, vary the period over which exposure is calculated, and
check how much the timing of the endpoint measurement matters.

## Other things to consider

For chronic treatment, cumulative exposure may be the relevant metric:

$$
AUC_{cumulative} = \sum_{i=1}^{n} AUC_i
$$

or a time-weighted average:

$$
C_{avg} = \frac{AUC_{0-t}}{t}
$$

When response lags exposure, add a delay:

$$
E(t) = f(Exposure(t - \tau))
$$

where $\tau$ is the delay parameter.

If the concentration-effect plot shows hysteresis, the options are an effect
compartment model, an indirect response model, or summary metrics (AUC,
average concentration) that collapse the hysteresis.

## Where it sits in the workflow

E-R analysis usually comes after the PK model:

1. Develop the population PK model to characterize exposure variability.
2. Use it to predict individual exposures (AUC, $C_{min}$, etc.).
3. Build the E-R model relating predicted exposures to observed responses.
4. Optionally, fit PK and PD jointly.

This is the step that connects the PK characterization to efficacy and safety,
and it's the quantitative basis for picking a dose.
