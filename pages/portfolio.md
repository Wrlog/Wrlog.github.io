---
layout: portfolio
title: Portfolio
description: Showcase of my projects, research work, and professional achievements
keywords: Portfolio, Projects, Research, Work
comments: false
menu: Portfolio
permalink: /portfolio/
---

# Portfolio

Welcome to my portfolio! Here you'll find a collection of my projects, research work, and professional achievements.

## Featured Research Projects

### Research Project 1: PK/PD Modeling and Machine Learning Integration for Infliximab in Pediatric Crohn's Disease
*Cincinnati Children's Hospital Medical Center | Aug 2022 - Present*

**Description**: 
This project focuses on developing mechanistic Population PK/PD models for Infliximab (a monoclonal antibody biologic) in pediatric patients with Crohn's disease. The research integrates traditional pharmacometric modeling with advanced machine learning and deep learning approaches to enhance predictive performance and optimize dosing regimens.

**Objectives**: 
- Develop and validate population PK/PD models for Infliximab in pediatric patients
- Identify key covariates affecting drug exposure and response
- Optimize dosing regimens for pediatric patients using model-informed approaches
- Enhance disease response prediction using machine learning and deep learning algorithms
- Develop exposure-response relationships to guide clinical decision-making

**Methodology**: 
- **Population PK/PD Modeling**: Developed mechanistic population PK/PD models using NONMEM, incorporating patient-specific covariates (body size, disease status, immunogenicity)
- **Indirect Response Models**: Implemented indirect response (IDR) models to characterize the delayed pharmacodynamic effects of Infliximab on disease biomarkers and clinical endpoints
- **Exposure-Response Analysis**: Established quantitative relationships between drug exposure metrics (AUC, trough concentrations) and clinical endpoints (disease activity scores, biomarker responses)
- **Machine Learning Integration**: 
  - Implemented XGBoost (gradient boosting) and Random Forest (bagging) algorithms to predict disease response
  - Compared PK/PD enriched dataset performance with common ML models to evaluate the added value of pharmacometric features
- **Software/Tools**: NONMEM, R, mrgsolve, Python (scikit-learn, PyTorch)

**Key Findings**:
- Identified critical covariates affecting infliximab pharmacokinetics and pharmacodynamics in pediatric patients
- Established exposure-response relationships that inform optimal dosing strategies
- Demonstrated improved predictive performance through ML/DL model integration
- Contributed to personalized dosing recommendations for pediatric patients

**Publications/Presentations**: 
- **Conference Presentation**: "PK/PD Modeling of Infliximab in Children with Crohn's Disease" - IATDMCT 2025 (Top 10 Abstract nomination)
- **Award**: Top 10 Abstract nomination, IATDMCT Congress (2025)


---

### Research Project 2: Model-Informed Dose Optimization for Prophylactic Piperacillin-Tazobactam in Perioperative Pediatric Critically Ill Patients
*Cincinnati Children's Hospital Medical Center | Aug 2022 - Present*

**Description**: 
This research project focuses on optimizing prophylactic dosing regimens for piperacillin-tazobactam (a beta-lactam/beta-lactamase inhibitor combination antibiotic) in pediatric critically ill patients undergoing perioperative care. The study addresses the critical need for appropriate antibiotic prophylaxis dosing in pediatric populations, where dosing strategies are often extrapolated from adult data without proper validation.

**Objectives**: 
- Develop population PK models for piperacillin-tazobactam in pediatric critically ill patients
- Identify key covariates affecting drug exposure (body size, renal function, critical illness)
- Optimize prophylactic dosing regimens to achieve target exposure thresholds
- Evaluate the impact of body size and renal function on dosing requirements
- Provide evidence-based dosing recommendations for clinical practice

**Methodology**: 
- **Population PK Modeling**: Developed population PK models using NONMEM to characterize piperacillin pharmacokinetics in pediatric patients
- **Covariate Analysis**: Evaluated the impact of body size (weight, BSA), renal function (creatinine clearance), and critical illness status on drug clearance and volume of distribution
- **Model-Informed Simulations**: Conducted Monte Carlo simulations to evaluate different dosing regimens and determine optimal dosing strategies
- **Target Attainment Analysis**: Assessed the probability of target attainment (PTA) for prophylactic efficacy endpoints
- **Tool Development (R-Shiny)**: Built an interactive dashboard so clinical teams could vary weight, renal function and regimen and read the resulting concentration-time profile and target attainment directly
- **Software/Tools**: NONMEM, Pirana, R, R-Shiny, mrgsolve

**Key Findings**:
- Identified body size and renal function as critical covariates affecting piperacillin pharmacokinetics
- Demonstrated that standard dosing regimens may be suboptimal for certain pediatric patient populations
- Developed optimized dosing regimens that account for patient-specific factors
- Provided evidence-based recommendations for prophylactic dosing in perioperative pediatric care
- Contributed to improved antibiotic stewardship and patient outcomes

**Publications/Presentations**: 
- **Peer-Reviewed Publication**: Tan WR, Irie K, et al. "Model-informed dose optimization for prophylactic piperacillin-tazobactam in perioperative pediatric critically ill patients." *Antimicrobial Agents and Chemotherapy* (2025). [DOI: 10.1128/aac.01227-24](https://journals.asm.org/doi/full/10.1128/aac.01227-24)
- **Conference Presentation**: "Model-Informed Simulations to Determine Optimal Piperacillin/Tazobactam Dosing Regimens in Pediatric Perioperative Care: Effect of Body Size and Renal Function" - ACOP 2024 (Poster)
- **Conference Presentation**: "Model-informed Dose Optimization for Prophylactic Piperacillin-Tazobactam in Perioperative Pediatric Critically Ill Patients" - ASCPT 2024 (Poster)

**Links**:
- [Publication Link](https://journals.asm.org/doi/full/10.1128/aac.01227-24)

---

## Software & Code

Public repositories at [github.com/Wrlog](https://github.com/Wrlog).

### [dosing-simulator](https://github.com/Wrlog/dosing-simulator)

An interactive R-Shiny application that simulates intravenous dosing regimens
for a simulated population, built on a generic two-compartment model with
first-order elimination, allometric scaling on weight, a power function on renal
function, and log-normal between-subject (optionally between-occasion)
variability on clearance and central volume. The user sets the weight and renal
function ranges, the dose, infusion duration and simulation length, and two
concentration targets; the app returns concentration-time profiles with 50% and
90% prediction intervals, target attainment, time above the lower target over
the final dosing interval, and trough statistics. It carries no patient data and
is for research and teaching, not clinical decision-making.

*R, Shiny*

### [metabolomics-dashboard-demo](https://github.com/Wrlog/metabolomics-dashboard-demo)

A reproducible reporting pattern for omics analysis: simulate a study, run a
curation and association pipeline over it, and render the whole result as one
self-contained HTML file that opens offline with no server and no notebook.
Curation counts, QC drift, PCA, and a volcano plot with effect estimates per
outcome. All data is synthetic and generated from a seed, with the planted
associations listed in an appendix so the output can be checked against ground
truth. [View the example dashboard](https://wrlog.github.io/metabolomics-dashboard-demo/).

*Python, numpy, pandas, scipy, matplotlib*

### [ml-portfolio](https://github.com/Wrlog/ml-portfolio)

Four self-contained machine learning projects — fraud detection, demand
forecasting, semantic similarity and an implicit-feedback recommender — each
covering the full path from data preparation through model evaluation.

*Python*

---

## Publications

### Peer-Reviewed Publications

- **Tan WR**, Irie K, McIntire C, Luna Torres J, Jones R, Gibson A, Mizuno T, Tang Girdwood S. "Model-informed dose optimization for prophylactic piperacillin-tazobactam in perioperative pediatric critically ill patients." *Antimicrobial Agents and Chemotherapy.* 2025;69(3):e01227-24. [doi:10.1128/aac.01227-24](https://doi.org/10.1128/aac.01227-24)

- Morales Junior R, Mizuno T, **Tan WR**, Irie K, Tang Girdwood S. "From PICU to NICU: extrapolating meropenem exposure from pediatric to neonatal intensive care patients." *The Journal of Clinical Pharmacology.* 2026;66(1):e70097. [doi:10.1002/jcph.70097](https://doi.org/10.1002/jcph.70097)

- Yang Z, **Tan WR**, Li Q, et al. "Population pharmacokinetic study of the effect of polymorphisms in the ABCB1 and CES1 genes on the pharmacokinetics of dabigatran." *Frontiers in Pharmacology.* 2024;15:1454612. [doi:10.3389/fphar.2024.1454612](https://doi.org/10.3389/fphar.2024.1454612)

- **Tan WR**, Sheikh Ghadzi SM, Hyder Ali IA, Harun SN. "Systematic review of population pharmacokinetic models of isoniazid in children and adults with tuberculosis." *Malaysian Journal of Pharmacy.* 2022;8(2):1-15. [doi:10.52494/djiq7058](https://doi.org/10.52494/djiq7058)

### Conference Presentations & Abstracts

- **Tan WR**, Irie K, et al. "PK/PD Modeling of Infliximab in Children with Crohn's Disease." *International Association of Therapeutic Drug Monitoring and Clinical Toxicology (IATDMCT) Conference* (2025) - **Top 10 Abstract nomination**

- **Tan WR**, Irie K, et al. "Model-Informed Simulations to Determine Optimal Piperacillin/Tazobactam Dosing Regimens in Pediatric Perioperative Care: Effect of Body Size and Renal Function." *American Conference on Pharmacometrics (ACOP)* (2024) - Poster Presentation

- **Tan WR**, Irie K, et al. "Model-informed Dose Optimization for Prophylactic Piperacillin-Tazobactam in Perioperative Pediatric Critically Ill Patients." *American Society for Clinical Pharmacology and Therapeutics (ASCPT) Annual Meeting* (2024) - Poster Presentation

---

## Awards & Achievements

- **Top 10 Abstract nomination**, International Association of Therapeutic Drug Monitoring and Clinical Toxicology (IATDMCT) Conference (2025)
- **Computational Professional Development Award**, University of Cincinnati (2023-2025)
- **First Prize (Junior Category)**, Graduate Student Research Forum, University of Cincinnati (2023)

## Get in Touch

Interested in collaborating on pharmacometric research or learning more about my work? Feel free to reach out!

- **Email**: [Wen.Tan@cchmc.org](mailto:Wen.Tan@cchmc.org)
- **LinkedIn**: [wenrui97](https://www.linkedin.com/in/wenrui97/)
- **GitHub**: [@Wrlog](https://github.com/Wrlog)

---

*Last updated: {{ site.time | date: "%B %Y" }}*

