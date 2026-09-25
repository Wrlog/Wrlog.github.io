---
layout: post
title: "Pharmacokinetic Notes for Special Populations"
categories: Pharmacokinetics
description: "Notes on pharmacokinetics in renal impairment, hepatic impairment, pregnancy and paediatrics, and when dose adjustment is actually warranted"
keywords: "Pharmacokinetic, Clinical, Renal Impairment, Hepatic Impairment, Pregnancy, Pediatrics"
date: 2022-07-04
---

"Special population" means any group whose exposure differs enough from the
studied population that the approved dose may not carry over. Usually a
physiological change alters clearance, volume or protein binding, and the dose
has to follow.

## Renal impairment

Reduced renal function only matters if it matters for this particular drug.
Two things have to be true at once:

1. The drug is substantially cleared by the kidney. A conventional threshold
   is more than about 30% of a dose eliminated unchanged in urine. Below that,
   even complete renal failure changes total clearance very little.
2. Renal function is reduced enough that the resulting exposure change is
   clinically relevant.

A renally cleared drug given to someone with normal kidneys is fine, and
reduced renal function doesn't matter much for a drug the kidney barely
clears. That said, renal impairment isn't only a problem for renally cleared
drugs. Uraemia alters protein binding and can reduce the activity of some
hepatic enzymes and transporters, so a purely hepatically cleared drug can
still show altered exposure.

The choice of marker matters too. Creatinine clearance from Cockcroft-Gault
and eGFR from CKD-EPI aren't interchangeable: the first estimates a clearance
in mL/min, the second a body-surface-normalised rate in mL/min/1.73m². Using
one where a model was built on the other introduces a systematic size-related
bias. In paediatrics it's worse, because creatinine production scales with
muscle mass, which changes quickly with age.

## Hepatic impairment

This is harder than renal, because there's no single number that summarises
hepatic clearance the way creatinine clearance approximates renal function.
Child-Pugh is the usual way to stratify, but it's a composite clinical score
rather than a measure of metabolic capacity, and it only loosely correlates
with the activity of any particular enzyme.

What changes: enzyme expression falls, hepatic blood flow falls, portal
shunting increases bioavailability for high-extraction drugs, and albumin
falls, which raises the unbound fraction. That last one is why total
concentration can be very misleading here. Total drug can look unchanged while
unbound drug, the pharmacologically active part, has gone up a lot.

## Pregnancy

Several changes push in different directions, so the net effect depends on the
drug:

- Plasma volume rises by roughly 40-50%, increasing volume of distribution for
  hydrophilic drugs.
- Glomerular filtration rate rises by roughly 50%, increasing renal clearance.
- Albumin falls, raising unbound fraction.
- Enzyme activity shifts both ways: CYP3A4, CYP2D6 and CYP2C9 activity
  increases, while CYP1A2 and CYP2C19 activity decreases.

So a CYP1A2 substrate and a renally cleared drug move in opposite directions,
and a drug cleared by both routes may hardly change. The effects also differ
between trimesters, so a single "pregnancy dose" may be wrong for part of the
pregnancy.

![PK changes in pregnancy]({{ site.url }}/images/posts/pharmacokinetic/pk-in-pregnancy.png)

## Paediatrics

Children are not small adults. Simple weight-proportional scaling fails for
two separate reasons.

Size is handled by allometric scaling: clearance scales with weight to the
power 0.75, volume to the power 1. That alone explains most of the difference
between a 70 kg adult and a 30 kg child.

Maturation has nothing to do with size. Enzyme systems come online on their
own schedules over the first months to years of life, so a neonate can have a
fraction of the metabolic capacity allometry would predict. CYP3A7 is
expressed in the fetus and replaced by CYP3A4 after birth. UGT activity matures
slowly, which is the mechanism behind the chloramphenicol "grey baby" cases.
Renal function also matures over roughly the first year.

That's why paediatric models usually include both an allometric term and a
maturation function of post-menstrual age, and why scaling an adult dose by
weight alone goes most wrong in the youngest patients.

Organ sizes relative to body weight also change with age:

<img width="404" alt="Relative organ size by age" src="{{ site.url }}/images/posts/pharmacokinetic/relative-organ-size-by-age.png">

So do enzyme expression and metabolic rate:

<img width="517" alt="Enzyme expression and metabolic rate by age" src="{{ site.url }}/images/posts/pharmacokinetic/enzyme-expression-by-age.png">

## Does it change the dose?

For all of these populations the question is which parameter changed, and
whether that change moves exposure enough to matter. A covariate with a
statistically detectable effect on clearance that moves AUC by 10% doesn't
justify a dose change. One that moves it threefold does. Making that call is
the step between a covariate analysis and a dosing recommendation.
