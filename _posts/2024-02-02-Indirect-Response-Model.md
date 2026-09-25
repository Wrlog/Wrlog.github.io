---
layout: post
title: "Indirect Response Models: Mechanistic Framework for Delayed Pharmacodynamic Effects"
categories: Pharmacodynamics
description: "Notes on indirect response (IDR) models: the four basic models, their equations, NONMEM code and where they are used"
keywords: "Indirect Response Models, Pharmacodynamics, PK/PD Modeling, Hysteresis, Mechanism-Based Modeling, NONMEM"
date: 2024-02-02
---

## What indirect response models are

Indirect response (IDR) models are pharmacodynamic models for drugs that don't
act directly on the thing being measured. The drug changes the turnover
(synthesis or degradation) of some endogenous substance, and the level of that
substance is what we measure as the effect.

### Direct vs indirect response

In a direct response model, concentration maps straight to effect, $E =
f(C(t))$. Anesthetics are the usual example: higher concentration, deeper
anesthesia.

In an indirect response model the chain is longer: concentration changes
turnover, turnover changes the level of a mediator, and the mediator level is
the measured effect. Warfarin doesn't affect clotting time directly. It
inhibits synthesis of clotting factors, and the factor levels determine
clotting time. Mathematically, the drug acts on $k_{in}$ or $k_{out}$, which
then changes the response $R(t)$.

### Bathtub analogy

Think of the response (a biomarker level, a clotting factor concentration) as
the water level in a bathtub:

- $k_{in}$ (or $R_{syn}$) is the faucet, a constant rate of production or
  synthesis.
- $k_{out}$ is the drain, a constant rate of elimination or degradation.
- At baseline ($R_0$) the faucet and drain balance and the level is stable.

The drug doesn't change the water level directly. It either turns the faucet
up or down (acts on $k_{in}$) or partly blocks or opens the drain (acts on
$k_{out}$). The level then changes slowly, which is where the delay between
concentration and effect comes from.

## The basic equation

The rate of change of the response $R(t)$ is

$$
\frac{dR(t)}{dt} = k_{in}(t) - k_{out}(t) \cdot R(t)
$$

where:
- $R(t)$ is the response variable (e.g., biomarker level, physiological measure)
- $k_{in}(t)$ is the zero-order synthesis rate (may be drug-modulated)
- $k_{out}(t)$ is the first-order elimination rate constant (may be drug-modulated)

At baseline (steady state, no drug), $dR/dt = 0$, so

$$
R_0 = \frac{k_{in}}{k_{out}}
$$

where $R_0$ is the baseline response level.

## The four basic IDR models

### Model I: inhibition of synthesis ($k_{in}$)

The drug inhibits production of the endogenous substance:

$$
\frac{dR(t)}{dt} = k_{in} \cdot \left(1 - \frac{I_{max} \cdot C(t)}{IC_{50} + C(t)}\right) - k_{out} \cdot R(t)
$$

where $I(C) = \frac{I_{max} \cdot C(t)}{IC_{50} + C(t)}$ is the inhibitory
drug effect function, $I_{max}$ is the maximum inhibition (typically 1),
$IC_{50}$ is the concentration giving 50% inhibition, and $C(t)$ is the drug
concentration.

Steady state:

$$
R_{ss} = R_0 \cdot \left(1 - \frac{I_{max} \cdot C_{ss}}{IC_{50} + C_{ss}}\right)
$$

Example: warfarin inhibits synthesis of the vitamin K-dependent clotting
factors (II, VII, IX, X) in the liver, so the anticoagulant effect, measured
as increased INR, is delayed.

### Model II: stimulation of synthesis ($k_{in}$)

The drug increases production:

$$
\frac{dR(t)}{dt} = k_{in} \cdot \left(1 + \frac{S_{max} \cdot C(t)}{SC_{50} + C(t)}\right) - k_{out} \cdot R(t)
$$

where $S(C) = \frac{S_{max} \cdot C(t)}{SC_{50} + C(t)}$ is the stimulatory
effect function, $S_{max}$ is the maximum stimulation factor, and $SC_{50}$ is
the concentration giving 50% of maximum stimulation.

Steady state:

$$
R_{ss} = R_0 \cdot \left(1 + \frac{S_{max} \cdot C_{ss}}{SC_{50} + C_{ss}}\right)
$$

Example: erythropoietin stimulates red blood cell production, and the effect
shows up over days to weeks.

### Model III: inhibition of loss ($k_{out}$)

The drug reduces the elimination rate:

$$
\frac{dR(t)}{dt} = k_{in} - k_{out} \cdot \left(1 - \frac{I_{max} \cdot C(t)}{IC_{50} + C(t)}\right) \cdot R(t)
$$

Steady state:

$$
R_{ss} = \frac{R_0}{1 - \frac{I_{max} \cdot C_{ss}}{IC_{50} + C_{ss}}}
$$

Example: inhibiting loss raises the mediator above baseline, as when a drug
blocks the clearance of an endogenous substance it's meant to sustain.
Corticosteroids don't belong here; their classical description is Model I,
suppression of cortisol synthesis.

### Model IV: stimulation of loss ($k_{out}$)

The drug increases the elimination rate:

$$
\frac{dR(t)}{dt} = k_{in} - k_{out} \cdot \left(1 + \frac{S_{max} \cdot C(t)}{SC_{50} + C(t)}\right) \cdot R(t)
$$

Steady state:

$$
R_{ss} = \frac{R_0}{1 + \frac{S_{max} \cdot C_{ss}}{SC_{50} + C_{ss}}}
$$

Example: diuretics increase elimination of fluid and electrolytes, with rapid
onset but sustained effects.

## Time course

After a step change in drug concentration, the time to reach the new steady
state is set by the effective elimination rate constant. For Model I
(inhibition of $k_{in}$):

$$
t_{ss} \approx \frac{4.6}{k_{out}}
$$

where $t_{ss}$ is the time to reach 99% of steady state. The response
half-life is $t_{1/2} = 0.693/k_{out}$, so that's about 6.6 response
half-lives. Five half-lives only gets you to 96.9%. What sets this is the
turnover of the mediator, not the half-life of the drug.

Recovery after stopping the drug is also governed by $k_{out}$:

$$
R(t) = R_0 + (R_{drug} - R_0) \cdot e^{-k_{out} \cdot t}
$$

Because recovery depends on endogenous turnover and not on the drug's PK, the
model can predict washout periods and how the dosing interval affects the
response.

## Hysteresis

All four IDR models produce hysteresis, because peak concentration comes
before peak effect. The direction of the loop depends on whether the response
rises or falls, not on which parameter the drug acts on. The lag happens
because drug concentration changes quickly (set by PK) while the response
changes slowly (set by $k_{out}$).

The width of the loop reflects the delay. The enclosed area is the line
integral around the closed curve in the concentration-response plane,

$$
A = \tfrac{1}{2} \oint \left( C \, dR - R \, dC \right)
$$

but in practice people read the loop qualitatively instead of integrating it.
Its direction tells you whether effect lags concentration. An IDR model
models the turnover that causes the loop, so you don't need to quantify the
loop itself, and in many cases you don't need an effect compartment or transit
compartments either.

## NONMEM implementation

```
$PK
CL   = THETA(1) * EXP(ETA(1))
V    = THETA(2) * EXP(ETA(2))
KOUT = THETA(3) * EXP(ETA(3))
R0   = THETA(4) * EXP(ETA(4))
IMAX = THETA(5)
IC50 = THETA(6)
KIN  = R0 * KOUT        ; baseline constraint, so R0 is estimated directly
S1   = V
A_0(2) = R0         ; start the response at baseline

$DES
; Concentration must be formed here, not in $PK, because it changes at
; every integration step.
CONC = A(1)/V
DADT(1) = -(CL/V)*A(1)
DADT(2) = KIN*(1 - (IMAX*CONC)/(IC50 + CONC)) - KOUT*A(2)

$ERROR
IPRED = A(2)
Y = IPRED*(1 + ERR(1)) + ERR(2)
```

`A(1)` is the drug amount, `A(2)` is the response, `KIN` and `KOUT` are the
turnover parameters, and `IMAX` and `IC50` describe the drug's inhibition.

Two details matter. The response compartment has to be initialized at
baseline (`A_0(2) = R0` in `$PK`); otherwise the model starts from zero and spends the
first part of the profile climbing up to baseline. And writing $k_{in}$ as
$R_0 \cdot k_{out}$ means the baseline is estimated directly, which is better
identified and easier to interpret than estimating $k_{in}$ by itself.

## Why use them over direct response models

The model describes an actual biological process (turnover) instead of just
fitting a curve. $k_{in}$ and $k_{out}$ have physiological meaning, which
helps when extrapolating to other dosing regimens and patient populations. The
delay is accounted for without extra compartments. And onset delays, recovery
times and steady-state relationships can be read straight from the parameters.

## Choosing between the four

Picking one of the four models comes down to knowledge of the drug's
mechanism, looking at concentration-effect plots, statistical comparison by
objective function value (OFV) or information criteria (AIC, BIC), and
goodness of fit, including visual predictive checks (VPC) and
prediction-corrected VPC.

Useful diagnostic plots:
- Concentration-time profiles
- Response-time profiles  
- Concentration-response plots (hysteresis loops)
- Individual fits and residuals

## Where they've been used

- Anticoagulants (warfarin, direct thrombin inhibitors)
- Hormone therapies (erythropoietin, growth hormone)
- Immunosuppressants (corticosteroids, calcineurin inhibitors)
- Cardiovascular drugs (ACE inhibitors, beta-blockers)
- Oncology (biomarker responses to targeted therapies)

## Summary

IDR models describe delayed PD effects through the turnover of an endogenous
mediator. Because the structure follows the biology, they tend to predict
better than empirical direct response models, and they're the standard choice
when there's a lag between exposure and response, especially where biomarker
dynamics drive clinical decisions.
