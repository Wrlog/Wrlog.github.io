---
layout: post
title: "【Pharmacokinetic】Pharmacokinetic Notes for Special Populations"
categories: Pharmacokinetic
description: "Notes on pharmacokinetics in renal impairment, hepatic impairment, pregnancy and paediatrics, and when dose adjustment is actually warranted"
keywords: "Pharmacokinetic, Clinical, Renal Impairment, Hepatic Impairment, Pregnancy, Pediatrics"
date: 2022-07-04
---

"Special population" is a label for any group whose exposure differs enough
from the studied population that the approved dose may not transfer. The
common thread is that a physiological change alters clearance, volume or
protein binding, and the dose has to follow.

## Renal impairment

The question is not whether renal function is reduced, but whether it matters
for *this* drug. Two conditions have to hold together:

1. **The drug is substantially cleared renally.** A conventional threshold is
   that more than about 30% of a dose is eliminated unchanged in urine —
   below that, even complete renal failure moves total clearance very little.
2. **Renal function is meaningfully reduced**, and low enough that the
   resulting exposure change is clinically relevant.

A drug meeting only the first is unaffected in a patient with normal kidneys; a
drug meeting only the second does not care. Note also that renal impairment is
not confined to renally cleared drugs: uraemia alters protein binding and can
reduce the activity of some hepatic enzymes and transporters, so a purely
hepatically cleared drug can still show altered exposure.

Which marker to use matters. Creatinine clearance estimated by Cockcroft-Gault
is not interchangeable with eGFR from CKD-EPI: the first estimates a clearance
in mL/min, the second a body-surface-normalised rate in mL/min/1.73m². Using
one where a model was built on the other introduces a systematic size-related
bias, and in paediatrics it is compounded because creatinine production scales
with muscle mass, which changes rapidly with age.

## Hepatic impairment

Harder than renal, because there is no single number that summarises hepatic
clearance the way creatinine clearance approximates renal function. Child-Pugh
is the usual stratifier, but it is a composite clinical score, not a measure of
metabolic capacity, and it correlates only loosely with the activity of any
particular enzyme.

What changes: enzyme expression falls, hepatic blood flow falls, portal
shunting increases bioavailability for high-extraction drugs, and albumin
falls — which raises the unbound fraction. That last effect is why total
concentration can mislead badly here: total drug may look unchanged while
unbound drug, the pharmacologically active part, has risen substantially.

## Pregnancy

Several changes act in different directions, so the net effect is genuinely
drug-specific:

- Plasma volume rises by roughly 40-50%, increasing volume of distribution for
  hydrophilic drugs.
- Glomerular filtration rate rises by roughly 50%, increasing renal clearance.
- Albumin falls, raising unbound fraction.
- Enzyme activity shifts in both directions: CYP3A4, CYP2D6 and CYP2C9 activity
  increases, while CYP1A2 and CYP2C19 activity decreases.

So a CYP1A2 substrate and a renally cleared drug move opposite ways, and a drug
cleared by both routes may barely move at all. The effects also change across
trimesters, which means a single "pregnancy dose" may be wrong for part of the
pregnancy.

![PK changes in pregnancy]({{ site.url }}/images/posts/pharmacokinetic/pk-in-pregnancy.png)

## Paediatrics

Children are not small adults, and the failure of simple weight-proportional
scaling has two distinct causes that are worth separating.

**Size.** Handled by allometric scaling: clearance scales with weight to the
power 0.75, volume to the power 1. This alone explains most of the difference
between a 70 kg adult and a 30 kg child.

**Maturation.** Not explained by size at all. Enzyme systems come online on
their own schedules over the first months to years of life, so a neonate can
have a fraction of the metabolic capacity that allometry alone would predict.
CYP3A7 is expressed fetally and is replaced by CYP3A4 postnatally; UGT activity
matures slowly, which is the mechanism behind the chloramphenicol "grey baby"
cases. Renal function likewise matures over roughly the first year.

This is why paediatric models typically carry both an allometric term and a
maturation function of post-menstrual age, and why extrapolating an adult dose
by weight alone fails hardest in exactly the youngest patients.

Organ sizes relative to body weight also change with age:

<img width="404" alt="Relative organ size by age" src="https://user-images.githubusercontent.com/69442517/200745422-b798a7fe-de95-4d56-877c-15d0789d2b37.png">

As does enzyme expression and metabolic rate:

<img width="517" alt="Enzyme expression and metabolic rate by age" src="https://user-images.githubusercontent.com/69442517/200745707-63df9d23-a03a-45c8-beec-dc2df9f42082.png">

## The practical point

In each of these populations the useful question is the same: which parameter
actually changed, and does the change move exposure far enough to matter? A
covariate with a statistically detectable effect on clearance that moves AUC by
10% does not justify a dose change; one that moves it threefold does. That
judgement is what separates a covariate analysis from a dosing recommendation.
