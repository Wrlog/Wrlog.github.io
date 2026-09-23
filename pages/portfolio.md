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
    <li class="tile tile-blue"><span class="n">3</span><span class="l">Research programs</span></li>
    <li class="tile tile-violet"><span class="n">6</span><span class="l">Publications</span></li>
    <li class="tile tile-green"><span class="n">3</span><span class="l">Public repositories</span></li>
    <li class="tile tile-amber"><span class="n">6</span><span class="l">Conference abstracts</span></li>
  </ul>
</header>

<section class="section accent-blue">
<h2 class="section-heading">Doctoral research</h2>

<div class="thesis">
  <p class="thesis-label">PhD dissertation · expected 2027</p>
  <h3 class="thesis-title">Advancing model-informed precision dosing via hybrid
  mechanistic and data-driven algorithms: an infliximab case study</h3>
  <p class="thesis-org">University of Cincinnati College of Medicine ·
  Department of Pharmacology, Physiology and Neurobiology<br>
  Advisor: Tomoyuki Mizuno, PhD</p>
  <p>Children on infliximab for Crohn's disease are monitored sparsely and
  irregularly — a few trough concentrations and biomarkers, at whatever
  intervals the clinic managed. The dissertation asks how far that routine
  therapeutic drug monitoring can be pushed toward choosing a better next dose,
  and where a mechanistic model, a learned model, or the combination of the two
  does the work.</p>
  <p>It builds a population PK/PD model of infliximab exposure and response,
  then tests data-driven methods against it: ensemble machine learning and
  neural ODEs for predicting biochemical remission, and deep reinforcement
  learning for the dosing policy itself. Two supplementary chapters extend it
  to adult observational cohorts.</p>
  <ul class="chips">
    <li class="chip chip-blue">Population PK/PD</li>
    <li class="chip chip-blue">Model-informed precision dosing</li>
    <li class="chip chip-orange">Ensemble ML</li>
    <li class="chip chip-orange">Neural ODEs</li>
    <li class="chip chip-orange">Deep reinforcement learning</li>
  </ul>
  <p class="thesis-note">Results are not public before the defence.</p>
</div>

<h2 class="section-heading" style="margin-top:38px">Projects</h2>

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

<article class="entry">
  <h3 class="entry-title">Ensemble learning and deep reinforcement learning for infliximab dose selection</h3>
  <p class="entry-meta"><span class="org">Cincinnati Children's Hospital Medical Center</span><span class="sep">·</span>Dissertation work, ongoing</p>

  <p>The data-driven half of the dissertation. A mechanistic population PK/PD
  model gives the reference; the question is what machine learning adds on top
  of it when the only inputs are the sparse, irregular measurements routine care
  produces.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>Ensemble models — gradient boosting and bagging — predicting biochemical remission from treatment-course features.</li>
        <li>Neural ODEs for the biomarker trajectory, which handle irregular sampling in continuous time rather than forcing it onto a grid.</li>
        <li>A deep Q-network learning a dosing policy against a reward defined on target attainment and remission.</li>
        <li>The learned policy compared with standard dosing and with maximum a posteriori Bayesian dosing to a concentration target, so the comparison is against a real alternative rather than a straw man.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>Status</h4>
      <ul>
        <li>Analyses are being finalised for the dissertation; results are held back until the defence.</li>
        <li>Aggregate result tables and figures are collected in a private repository, opened as the work is published.</li>
      </ul>
    </div>
  </div>

  <ul class="chips">
    <li class="chip chip-orange">XGBoost</li>
    <li class="chip chip-orange">Random forest</li>
    <li class="chip chip-orange">Neural ODEs</li>
    <li class="chip chip-orange">Deep Q-networks</li>
    <li class="chip chip-green">Python</li>
    <li class="chip chip-green">PyTorch</li>
    <li class="chip chip-blue">NONMEM</li>
  </ul>

  <p class="entry-note"><span class="badge badge-grey">Private</span>
  Results repository:
  <a href="https://github.com/Wrlog/mipd-ensemble-rl">Wrlog/mipd-ensemble-rl</a>
  — access on request until the work is published.</p>
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
  <li>Irie K, <span class="me">Tan WR</span>, Mizuno T. Towards reinforcement learning-enabled model-informed precision dosing: concepts, applications, and implementation. <em>Therapeutic Drug Monitoring.</em> 2026. <span class="badge badge-grey">In press</span></li>

  <li>Taylor ZL, Nadai T, Irie K, <span class="me">Tan WR</span>, Parikh S, Hosawi A, van Hoogdalem MW, Morales Junior R, Tang Girdwood S, Leino AD, Mizuno K, Vinks AA, Mizuno T. Clinical model-informed precision dosing consult service for accelerating personalized medication in pediatric patients. <em>Clinical Pharmacology &amp; Therapeutics.</em> 2026. <a href="https://doi.org/10.1002/cpt.70324">doi:10.1002/cpt.70324</a></li>

  <li>Morales Junior R, Mizuno T, <span class="me">Tan WR</span>, Irie K, Tang Girdwood S. From PICU to NICU: extrapolating meropenem exposure from pediatric to neonatal intensive care patients. <em>The Journal of Clinical Pharmacology.</em> 2026;66(1):e70097. <a href="https://doi.org/10.1002/jcph.70097">doi:10.1002/jcph.70097</a></li>

  <li><span class="me">Tan WR</span>, Irie K, McIntire C, Luna Torres J, Jones R, Gibson A, Mizuno T, Tang Girdwood S. Model-informed dose optimization for prophylactic piperacillin-tazobactam in perioperative pediatric critically ill patients. <em>Antimicrobial Agents and Chemotherapy.</em> 2025;69(3):e01227-24. <a href="https://doi.org/10.1128/aac.01227-24">doi:10.1128/aac.01227-24</a></li>

  <li>Yang Z, <span class="me">Tan WR</span>, Li Q, et al. Population pharmacokinetic study of the effect of polymorphisms in the ABCB1 and CES1 genes on the pharmacokinetics of dabigatran. <em>Frontiers in Pharmacology.</em> 2024;15:1454612. <a href="https://doi.org/10.3389/fphar.2024.1454612">doi:10.3389/fphar.2024.1454612</a></li>

  <li><span class="me">Tan WR</span>, Sheikh Ghadzi SM, Hyder Ali IA, Harun SN. Systematic review of population pharmacokinetic models of isoniazid in children and adults with tuberculosis. <em>Malaysian Journal of Pharmacy.</em> 2022;8(2):1-15. <a href="https://doi.org/10.52494/djiq7058">doi:10.52494/djiq7058</a></li>
</ol>

<h3 class="sub-heading">In preparation</h3>

<ul class="refs plain">
  <li><span class="me">Tan WR</span>, Irie K, Boyle BM, Noe JD, Hyams JS, Minar P, Mizuno T. Population pharmacokinetic-pharmacodynamic modeling of infliximab and fecal calprotectin in pediatric Crohn's disease: towards biomarker-guided precision dosing.</li>

  <li><span class="me">Tan WR</span>, Mizuno T. Early identification of long-term biochemical remission in pediatric Crohn's disease using machine learning.</li>

  <li><span class="me">Tan WR</span>, Mizuno T. Advancing model-informed precision dosing: a critical appraisal of emerging computational tools and point-of-care diagnostics.</li>
</ul>

<h3 class="sub-heading">Conference presentations</h3>

<ul class="refs plain">
  <li>Minar PP, <span class="me">Tan WR</span>, Irie K, Boyle BM, Noe JD, Hyams JS, Mizuno T. Bridging drug exposure to biochemical remission: a PK/PD framework to individualize infliximab target concentrations in pediatric Crohn's disease. <em>Digestive Disease Week</em>, 2026.</li>

  <li><span class="me">Tan WR</span>, Irie K, Minar P, Mizuno T. Pharmacokinetic-pharmacodynamic modeling of infliximab in children and young adults with Crohn's disease. <em>IATDMCT Congress</em>, 2025. <span class="badge badge-amber">Top 10 abstract</span></li>

  <li>Morales Junior R, <span class="me">Tan WR</span>, Irie K, Mizuno T, Tang Girdwood S. From PICU to NICU: refining maturation factor for meropenem clearance. <em>ASCPT Annual Meeting</em>, 2025.</li>

  <li><span class="me">Tan WR</span>, Irie K, McIntire C, Luna Torres J, Jones R, Gibson A, Mizuno T, Tang Girdwood S. Model-informed simulations to determine optimal piperacillin/tazobactam dosing regimens in pediatric perioperative care: effect of body size and renal function. <em>American Conference on Pharmacometrics (ACoP)</em>, 2024.</li>

  <li><span class="me">Tan WR</span>, Irie K, McIntire C, Luna Torres J, Jones R, Gibson A, Mizuno T, Tang Girdwood S. Model-informed dose optimization for prophylactic piperacillin-tazobactam in perioperative pediatric critically ill patients. <em>ASCPT Annual Meeting</em>, 2024.</li>

  <li><span class="me">Tan WR</span>, Tahir ARM, Daud NAA. Medical problems among Rohingya refugees and medications prescribed during IMARET clinic visits in Kelantan. <em>International Journal of Human and Health Sciences</em>, 2021;S26.</li>
</ul>
</section>

<section class="section accent-amber">
<h2 class="section-heading">Awards</h2>

<ul class="awards">
  <li>
    <span class="year">2025</span>
    <span class="what">Top ten abstract nomination, IATDMCT Congress</span>
  </li>
  <li>
    <span class="year">2023–2026</span>
    <span class="what">Computational Professional Development Award, University of Cincinnati</span>
  </li>
  <li>
    <span class="year">2022–2026</span>
    <span class="what">Enhancement Fund Award, Department of Pharmacology, Physiology and Neurobiology, University of Cincinnati — awarded in each of 2022, 2023, 2024, 2025 and 2026</span>
  </li>
  <li>
    <span class="year">2023</span>
    <span class="what">First prize, junior category, Graduate Student Research Forum, University of Cincinnati</span>
  </li>
</ul>
</section>

<section class="section accent-orange">
<h2 class="section-heading">Service and mentoring</h2>

<dl class="service">
  <dt>Journal review</dt>
  <dd>Reviewer, <em>Clinical Pharmacology &amp; Therapeutics</em>.</dd>

  <dt>Conference review</dt>
  <dd>Abstract reviewer, ASCPT Annual Meeting 2025 and American Conference on
  Pharmacometrics (ACoP) 2024.</dd>

  <dt>Mentoring</dt>
  <dd>Research co-mentor to Soorya Shanmugam, October 2024 – February 2025, now
  an undergraduate at The Ohio State University.</dd>
</dl>
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
    <a class="cbtn" href="https://scholar.google.com/citations?user=ZJU1efMAAAAJ">Google Scholar</a>
  </p>
</div>
</section>

<p class="updated">Last updated {{ site.time | date: "%B %Y" }}</p>
