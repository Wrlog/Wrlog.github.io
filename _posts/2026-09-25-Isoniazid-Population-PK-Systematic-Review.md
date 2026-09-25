---
layout: post
title: "Population PK Models of Isoniazid: What Twelve Studies Show"
categories: Pharmacometrics
description: "A plain-language summary of our systematic review of published population pharmacokinetic models of isoniazid in children and adults with tuberculosis"
keywords: "Isoniazid, tuberculosis, population pharmacokinetics, systematic review, NAT2, acetylator status, mixture model, paediatric, covariates"
date: 2026-09-25
---

## Why we did the review

Isoniazid is one of the two main first-line tuberculosis drugs, along with
rifampicin. Its plasma concentrations vary a lot between patients, and low
concentrations of anti-TB drugs have been linked to treatment failure and to
multidrug-resistant TB. Several population PK models of isoniazid had been
published, but nobody had put them side by side. We wanted to compare the
models and see which covariates kept coming up as explaining the variability.

## How we did it

We followed PRISMA and searched PubMed and Scopus for population PK analyses of
isoniazid in volunteers or TB patients from 2011 to 2021. Reviews, methodology
papers, non-compartmental analyses, in vitro and animal work, and studies that
reused a previously published model were excluded. From 107 records, 14 went to
full evaluation and 12 studies (published 2013 to 2021) were included.

Together they covered 1,444 people, from 33 to 466 per study, aged 0 to 72.
Four studies included children, eight were adults only, and one of those was in
healthy volunteers. All gave isoniazid orally.

## What we found

Ten of the twelve models were two-compartment and two were one-compartment. One
of the one-compartment models was built from a single sample taken 3 hours
after the dose, which probably isn't enough data to support a second
compartment. Absorption was handled in different ways: first-order, transit
compartments (mean transit time 0.66 h, range 0.179 to 0.924 h across studies)
or a lag time. Transit compartments describe the physiology of absorption
better than a lag time does.

Mean reported clearance was 20.55 L/h (SD 16.60). Children cleared the drug
more slowly: median 6.5 L/h (range 4.44 to 11.3) against 22.8 L/h (11.4 to 40.5)
in adults. This fits with how NAT2, the enzyme that acetylates isoniazid,
matures. At birth the slow-acetylator phenotype predominates, and the fast
phenotype develops over roughly the first four years of life in children with
the relevant genotypes. Central volume was also smaller in children.

Across the twelve studies, 29 covariates were tested. NAT2 genotype was the
main one, affecting clearance in 11 studies. Creatinine clearance and body mass
index each came up once on clearance, and body weight (two studies), body mass
index and mid-upper arm circumference (one each) on central volume. Most
studies used a mixture model to split patients into acetylator groups.

The NAT2 effect also tracks ethnicity. In a South African study more than 80%
of patients were slow or intermediate acetylators, and in a Tanzanian study 48%
were slow and 48% intermediate. Studies from Singapore and China found mostly
fast and intermediate acetylators, and those two studies reported some of the
highest clearances in the review.

A few gaps showed up. Only one study modelled the main metabolite,
acetylisoniazid, even though acetylation status matters for hepatotoxicity
(slow acetylators are at higher risk). Only one study checked adherence, by
pill count and medication diaries. Every study did basic internal evaluation
such as goodness-of-fit plots and VPCs, five added bootstrap or NPDE, and only
two tested their model on an external dataset.

## What it means

To dose isoniazid well, a patient's NAT2 genotype and age should be taken into
account, and body weight and BMI matter for dose adjustment. Genotyping isn't
routine everywhere, so mixture models are a practical way to estimate
acetylator status when genetic data aren't available. They still need external
validation: one study that did genotype some patients found no significant
difference in Cmax or AUC between slow-intermediate and rapid acetylators.
Larger studies with better sampling would help, and both existing and new
models should be evaluated on external data.

The paper: Tan WR, Sheikh Ghadzi SM, Hyder Ali IA, Harun SN. Systematic review
of population pharmacokinetic models of isoniazid in children and adults with
tuberculosis. *Malaysian Journal of Pharmacy*. 2022;8(2):1-15.
[doi:10.52494/DJIQ7058](https://doi.org/10.52494/DJIQ7058). It's free to read on the journal's site.
