---
layout: portfolio
title: Portfolio
description: Research projects, software and publications in pharmacometrics and data science
keywords: Portfolio, Pharmacometrics, PK/PD, Population Modeling, Publications, Research
comments: false
menu: Portfolio
permalink: /portfolio/
---

<header class="page-intro">
  <p class="eyebrow">Portfolio</p>
  <h1>Pharmacometrics, modeling and machine learning</h1>
  <p class="page-lede">Population PK/PD modeling, model-informed precision dosing
  and machine learning, applied to pediatric clinical pharmacology. Below: the
  research I work on, the software I have published, and the papers it produced.</p>

  <ul class="tiles">
    <li class="tile tile-blue"><span class="n">2</span><span class="l">Research programs</span></li>
    <li class="tile tile-violet"><span class="n">4</span><span class="l">Publications</span></li>
    <li class="tile tile-green"><span class="n">3</span><span class="l">Open-source tools</span></li>
    <li class="tile tile-amber"><span class="n">3</span><span class="l">Awards</span></li>
  </ul>
</header>

<section class="section accent-blue">
<h2 class="section-heading">Research</h2>

<article class="entry">
  <h3 class="entry-title">PK/PD modeling and machine learning for infliximab in pediatric Crohn's disease</h3>
  <p class="entry-meta"><span class="org">Cincinnati Children's Hospital Medical Center</span><span class="sep">·</span>August 2022 – present</p>

  <p>Mechanistic population PK/PD models for infliximab, a monoclonal antibody, in
  children with Crohn's disease, combined with machine learning to improve response
  prediction and guide dosing. Infliximab exposure varies widely between pediatric
  patients, and standard dosing leaves many of them under-exposed.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>Population PK/PD models in NONMEM, carrying covariates for body size, disease status and immunogenicity.</li>
        <li>Indirect response models for the delayed effect on disease biomarkers and clinical endpoints.</li>
        <li>Exposure–response analysis linking AUC and trough concentrations to disease activity scores.</li>
        <li>XGBoost and random forest for disease response, benchmarked against the pharmacometric models to test what the PK/PD features add.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>Results</h4>
      <ul>
        <li>Identified the covariates that drive infliximab exposure and response in children.</li>
        <li>Established exposure–response relationships that inform dose selection.</li>
        <li>Measurable gains in predictive performance from combining the two modeling approaches.</li>
      </ul>
    </div>
  </div>

  <ul class="chips">
    <li class="chip chip-blue">NONMEM</li>
    <li class="chip chip-blue">mrgsolve</li>
    <li class="chip chip-green">R</li>
    <li class="chip chip-green">Python</li>
    <li class="chip chip-orange">scikit-learn</li>
    <li class="chip chip-orange">PyTorch</li>
  </ul>

  <p class="entry-note"><span class="badge badge-amber">Top 10 abstract</span>
  Presented at the IATDMCT Congress, 2025.</p>
</article>

<article class="entry">
  <h3 class="entry-title">Model-informed dose optimization for prophylactic piperacillin–tazobactam in critically ill children</h3>
  <p class="entry-meta"><span class="org">Cincinnati Children's Hospital Medical Center</span><span class="sep">·</span>August 2022 – present</p>

  <p>Prophylactic antibiotic dosing in critically ill children is usually
  extrapolated from adults and rarely validated. This work builds the population PK
  to put that dosing on an evidence base, for children in perioperative care.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>Population PK models in NONMEM for piperacillin in critically ill pediatric patients.</li>
        <li>Covariate analysis of body size, renal function and critical illness on clearance and volume of distribution.</li>
        <li>Monte Carlo simulation across candidate regimens, assessed by probability of target attainment.</li>
        <li>An R-Shiny dashboard letting clinical teams vary weight, renal function and regimen and read the profile and target attainment directly.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>Results</h4>
      <ul>
        <li>Body size and renal function are the covariates that matter for piperacillin exposure.</li>
        <li>Standard regimens are suboptimal for parts of the pediatric population.</li>
        <li>Dosing recommendations that account for patient-specific factors, supporting antibiotic stewardship.</li>
      </ul>
    </div>
  </div>

  <ul class="chips">
    <li class="chip chip-blue">NONMEM</li>
    <li class="chip chip-blue">Pirana</li>
    <li class="chip chip-blue">mrgsolve</li>
    <li class="chip chip-green">R</li>
    <li class="chip chip-green">R-Shiny</li>
  </ul>

  <p class="entry-note"><span class="badge badge-violet">Published</span>
  <em>Antimicrobial Agents and Chemotherapy</em>, 2025
  (<a href="https://doi.org/10.1128/aac.01227-24">doi:10.1128/aac.01227-24</a>).
  Presented at ACOP 2024 and ASCPT 2024.</p>
</article>
</section>

<section class="section accent-green">
<h2 class="section-heading">Software</h2>
<p class="section-lede">Public repositories at <a href="https://github.com/Wrlog">github.com/Wrlog</a>.</p>

<div class="cards">
  <article class="card card-green">
    <h3 class="card-title"><a href="https://github.com/Wrlog/dosing-simulator">dosing-simulator</a></h3>
    <p>An R-Shiny application that simulates intravenous dosing regimens for a
    simulated population, on a two-compartment model with first-order elimination,
    allometric scaling on weight, a power function on renal function, and log-normal
    between-subject variability on clearance and central volume. Returns
    concentration-time profiles with prediction intervals, target attainment, time
    above target and trough statistics. No patient data; for research and teaching.</p>
    <ul class="chips">
      <li class="chip chip-green">R</li>
      <li class="chip chip-green">Shiny</li>
    </ul>
  </article>

  <article class="card card-blue">
    <h3 class="card-title"><a href="https://github.com/Wrlog/metabolomics-dashboard-demo">metabolomics-dashboard-demo</a></h3>
    <p>A reporting pattern for omics analysis: simulate a study, run curation and
    association over it, and render the result as one self-contained HTML file that
    opens offline with no server and no notebook. QC drift, PCA and volcano plots,
    with a filter bar that searches and sorts the results. All data is synthetic and
    seeded, and the planted associations are listed so the output can be checked
    against ground truth.</p>
    <ul class="chips">
      <li class="chip chip-green">Python</li>
      <li class="chip chip-blue">numpy</li>
      <li class="chip chip-blue">pandas</li>
      <li class="chip chip-blue">scipy</li>
      <li class="chip chip-blue">matplotlib</li>
    </ul>
    <p class="card-link"><a href="https://wrlog.github.io/metabolomics-dashboard-demo/">View the live dashboard →</a></p>
  </article>

  <article class="card card-orange">
    <h3 class="card-title"><a href="https://github.com/Wrlog/ml-portfolio">ml-portfolio</a></h3>
    <p>Four self-contained machine learning projects — fraud detection, demand
    forecasting, semantic similarity and an implicit-feedback recommender — each
    covering the full path from data preparation through model evaluation.</p>
    <ul class="chips">
      <li class="chip chip-green">Python</li>
      <li class="chip chip-orange">scikit-learn</li>
    </ul>
  </article>
</div>
</section>

<section class="section accent-violet">
<h2 class="section-heading">Publications</h2>

<ol class="refs">
  <li><span class="me">Tan WR</span>, Irie K, McIntire C, Luna Torres J, Jones R, Gibson A, Mizuno T, Tang Girdwood S. Model-informed dose optimization for prophylactic piperacillin-tazobactam in perioperative pediatric critically ill patients. <em>Antimicrobial Agents and Chemotherapy.</em> 2025;69(3):e01227-24. <a href="https://doi.org/10.1128/aac.01227-24">doi:10.1128/aac.01227-24</a></li>

  <li>Morales Junior R, Mizuno T, <span class="me">Tan WR</span>, Irie K, Tang Girdwood S. From PICU to NICU: extrapolating meropenem exposure from pediatric to neonatal intensive care patients. <em>The Journal of Clinical Pharmacology.</em> 2026;66(1):e70097. <a href="https://doi.org/10.1002/jcph.70097">doi:10.1002/jcph.70097</a></li>

  <li>Yang Z, <span class="me">Tan WR</span>, Li Q, et al. Population pharmacokinetic study of the effect of polymorphisms in the ABCB1 and CES1 genes on the pharmacokinetics of dabigatran. <em>Frontiers in Pharmacology.</em> 2024;15:1454612. <a href="https://doi.org/10.3389/fphar.2024.1454612">doi:10.3389/fphar.2024.1454612</a></li>

  <li><span class="me">Tan WR</span>, Sheikh Ghadzi SM, Hyder Ali IA, Harun SN. Systematic review of population pharmacokinetic models of isoniazid in children and adults with tuberculosis. <em>Malaysian Journal of Pharmacy.</em> 2022;8(2):1-15. <a href="https://doi.org/10.52494/djiq7058">doi:10.52494/djiq7058</a></li>
</ol>

<h3 class="sub-heading">Conference presentations</h3>

<ul class="refs plain">
  <li><span class="me">Tan WR</span>, Irie K, et al. PK/PD modeling of infliximab in children with Crohn's disease. <em>IATDMCT Congress</em>, 2025. <span class="badge badge-amber">Top 10 abstract</span></li>

  <li><span class="me">Tan WR</span>, Irie K, et al. Model-informed simulations to determine optimal piperacillin/tazobactam dosing regimens in pediatric perioperative care: effect of body size and renal function. <em>American Conference on Pharmacometrics (ACOP)</em>, 2024. Poster.</li>

  <li><span class="me">Tan WR</span>, Irie K, et al. Model-informed dose optimization for prophylactic piperacillin-tazobactam in perioperative pediatric critically ill patients. <em>ASCPT Annual Meeting</em>, 2024. Poster.</li>
</ul>
</section>

<section class="section accent-amber">
<h2 class="section-heading">Awards</h2>

<ul class="awards">
  <li><span class="year">2025</span><span class="what">Top ten abstract nomination, IATDMCT Congress</span></li>
  <li><span class="year">2023–2025</span><span class="what">Computational Professional Development Award, University of Cincinnati</span></li>
  <li><span class="year">2023</span><span class="what">First prize, junior category, Graduate Student Research Forum, University of Cincinnati</span></li>
</ul>
</section>

<section class="section accent-blue">
<h2 class="section-heading">Get in touch</h2>
<div class="contact-card">
  <p>Open to collaborations in PK/PD modeling, methodological discussion, and
  internship or job opportunities.</p>
  <p class="contact-links">
    <a class="cbtn cbtn-primary" href="mailto:{{ site.email }}">Email</a>
    <a class="cbtn" href="https://www.linkedin.com/in/{{ site.linkedin }}/">LinkedIn</a>
    <a class="cbtn" href="https://github.com/{{ site.github_username }}">GitHub</a>
  </p>
</div>
</section>

<p class="updated">Last updated {{ site.time | date: "%B %Y" }}</p>
