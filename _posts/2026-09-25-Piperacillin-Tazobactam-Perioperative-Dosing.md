---
layout: post
title: "Dosing Piperacillin-Tazobactam in Children During Surgery"
categories: Pharmacometrics
description: "A plain-language summary of our population PK study of prophylactic piperacillin-tazobactam in critically ill children undergoing surgery, and the lower doses and continuous infusions it points to"
keywords: "Piperacillin, tazobactam, population pharmacokinetics, pediatric, perioperative, surgical prophylaxis, NONMEM, mrgsolve, continuous infusion, target attainment, creatinine clearance"
date: 2026-09-25
---

## Why we looked at this

Piperacillin-tazobactam (PTZ) is often given to critically ill children as
prophylaxis around surgery, especially abdominal and ear, nose and throat (ENT)
procedures. International guidance for intraoperative dosing in children is
80-100 mg/kg of piperacillin (90-112.5 mg/kg as PTZ) every 2 hours.

That regimen has two problems. One is exposure: an earlier study from our group
found that children who developed piperacillin-associated acute kidney injury
had an average highest trough of 50 mg/L in the first 24 hours, against 10.7
mg/L in those who didn't. The other is practical. Clinicians who give
antibiotics in the operating room told us that redosing every 2 hours is hard
to keep up with.

About 68% of a piperacillin dose is excreted unchanged by the kidneys, and
surgery can change renal function, blood volume and fluid balance. There were
population PK models for critically ill children in general, but none for
children during and after surgery. So we set out to build one and use it to
find doses that reach a sensible target without the very high concentrations
the current regimen gives.

## What we did

The data came from a larger prospective PK study of beta-lactams in the
pediatric intensive care unit at Cincinnati Children's Hospital Medical Center.
We included 34 children who had surgery and were getting PTZ every 2-3 hours:
15 liver transplants, 2 total pancreatectomies with islet autotransplantation,
9 other abdominal surgeries and 8 ENT surgeries. Median age was 7.07 years,
median weight 20 kg and median baseline creatinine clearance (bedside Schwartz)
143 mL/min/1.73 m².

Sampling was opportunistic, so no extra blood was drawn. After a PTZ dose we
requested leftover blood from routine clinical samples and measured total and
free piperacillin by HPLC. That gave intraoperative and postoperative samples
for everyone and preoperative samples for children already in the PICU: 286
total and 285 free concentrations, 1 to 19 per child.

We built separate NONMEM models for total and free piperacillin. The total
model was the primary analysis, and the dosing simulations used the free
model, since the efficacy target is defined on free drug.

## The model

A two-compartment model fit better than one compartment. Weight entered
through allometric scaling, and creatinine clearance was the only other
covariate kept on clearance:

$$
CL\ (\mathrm{L/h}) = 7.1 \times \left(\frac{WT}{70}\right)^{0.75} \times \left(\frac{CrCL}{120}\right)^{0.484}
$$

Central volume was 17.2 L/70 kg, intercompartmental clearance 3.25 L/h/70 kg
and peripheral volume 4.79 L/70 kg. Between-patient variability was 28.7% on
clearance and 41% on central volume, with a 37.1% proportional residual error.
Age and surgery type were tested and didn't stay in.

Treating the preoperative and postoperative periods as separate occasions
improved the fit, but once clearance was normalized for weight and renal
function there were no significant differences between the three periods or
between surgery types. Postoperative clearance did vary a lot between children
(2.26 to 14.96 L/h/70 kg).

Clearance in our patients, 7.1 L/h/70 kg, was lower than the 13.4 and 12.6
L/h/70 kg reported in two earlier studies of critically ill children outside
surgery. Kidney injury after surgical stress could explain some of that, and so
could saturation of clearance at high doses: our patients got around 89 mg/kg
every 2-3 hours, while those studies used 75 mg/kg every 6 hours.

## Simulating doses

We simulated 1,000 virtual patients per regimen in mrgsolve, grouped by
creatinine clearance (five groups, 20-29 up to 130 and above) and weight (four
groups, 10-29 kg up to 70 kg and above). We compared a 30-minute infusion every
2 hours with a 30-minute loading dose followed by a continuous infusion.

Both targets were on free piperacillin and had to hold for the whole surgery:
above 8 mg/L (the CLSI susceptible breakpoint for *Enterococcus* and
*Enterobacterales*) and above 32 mg/L (four times that MIC). A regimen passed
if more than 90% of virtual patients met the target.

The current 100 mg/kg regimen gave peaks and troughs far above either target.
The doses that were enough came out much lower:

| Target | Every 2 hours | Loading dose + continuous infusion |
|---|---|---|
| Free PIP > 8 mg/L | 6-15 mg/kg | 10 mg/kg, then 1.0-2.75 mg/kg/h |
| Free PIP > 32 mg/L | 25-55 mg/kg | 20 mg/kg, then 3.25-9.25 mg/kg/h |

Where a child falls in each range depends on their weight and renal function
group, with smaller children and higher creatinine clearance needing more per
kilogram. The figure plots the every-2-hour recommendations from the paper's
tables next to the guideline range. Even the largest, 55 mg/kg, is well below
80-100 mg/kg.

![Recommended piperacillin doses every 2 hours by creatinine clearance and body weight group, for the 8 mg/L and 32 mg/L targets, compared with the 80-100 mg/kg guideline range]({{ site.url }}/images/posts/pharmacokinetic/pip-q2h-dose-by-crcl.png)

## What it means for dosing

Both approaches reach the targets with much less drug, but I'd lean toward
continuous infusion. For the higher target, every-2-hour dosing still left most
simulated patients with steady-state troughs above 50 mg/L, the level we had
seen in children who developed kidney injury. A continuous infusion keeps
concentrations nearer the target and removes the 2-hour redosing problem.

For the lower target we picked a 10 mg/kg loading dose even though it
overshoots slightly, because it reaches the target in about 12 minutes compared
with 24 for 5 mg/kg. The higher target gives some margin for tissue
penetration, which we didn't measure, though the tissues involved in these
surgeries are well vascularized.

## Limitations

Only seven children (21%) were under 2, so we couldn't model renal maturation
and the recommendations are for children older than 2. Timing of leftover
samples can be imprecise, and we didn't account for that, which may affect the
intercompartmental clearance and peripheral volume. Intercompartmental
clearance was poorly estimated anyway (74% RSE), as you'd expect from sparse
data. With 34 patients the study is small, even if we believe it's the largest
population PK study of prophylactic PTZ in this group, so the regimens need
prospective testing. The model could also support Bayesian dose adjustment
after surgery, which needs its own study.

The paper is open access: Tan WR, Irie K, McIntire C, Torres JL, Jones R,
Gibson A, Mizuno T, Tang Girdwood S. Model-informed dose optimization for
prophylactic piperacillin-tazobactam in perioperative pediatric critically ill
patients. *Antimicrob Agents Chemother*. 2025;69(3):e0122724.
[doi:10.1128/aac.01227-24](https://doi.org/10.1128/aac.01227-24). The general
simulation workflow is in the earlier post on
[Monte Carlo simulation for dose optimization]({{ site.url }}/2023/09/22/Monte-Carlo-Simulation-for-Dose-Optimization/).
