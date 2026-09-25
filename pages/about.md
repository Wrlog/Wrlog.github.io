---
layout: about
title: About
description: Wen Rui Tan, PhD candidate, pharmacometrician and data scientist in pediatric clinical pharmacology
keywords: About, Wen Rui Tan, Pharmacometrician, Data Scientist, Biography
comments: true
menu: About
permalink: /about/
---

<header class="page-intro">
  <p class="eyebrow">About</p>
  <h1>Wen Rui Tan</h1>
  <p class="page-lede">I'm a PhD candidate in pharmacology working on population
  PK/PD modeling and model-informed precision dosing for children, and on what
  untargeted metabolomics and wearable sensor data add beyond drug
  concentrations.</p>
  <p class="id-line">
    <span class="id-item">Cincinnati, OH, United States</span>
    <span class="sep">·</span>
    <a href="mailto:{{ site.email }}">{{ site.email }}</a>
    <span class="sep">·</span>
    <a href="https://www.linkedin.com/in/{{ site.linkedin }}/">LinkedIn</a>
    <span class="sep">·</span>
    <a href="https://github.com/{{ site.github_username }}">GitHub</a>
    <span class="sep">·</span>
    <a href="https://scholar.google.com/citations?user=ZJU1efMAAAAJ">Google Scholar</a>
  </p>
</header>

<section class="section accent-blue">
<h2 class="section-heading">Education</h2>

<ul class="timeline">
  <li>
    <h3 class="tl-title">PhD, Pharmacology and Systems Physiology</h3>
    <p class="tl-org">University of Cincinnati College of Medicine, Cincinnati, OH</p>
    <p class="tl-when">Expected May 2027</p>
    <p>Dissertation: <em>Advancing model-informed precision dosing via
    mechanistic and data-driven algorithms — an infliximab case study.</em>
    Population PK/PD, ensemble machine learning, neural ODEs and deep
    reinforcement learning applied to dosing in pediatric Crohn's disease.
    Advisor: Tomoyuki Mizuno, PhD.</p>
  </li>
  <li>
    <h3 class="tl-title">Bachelor of Pharmacy (Hons)</h3>
    <p class="tl-org">Universiti Sains Malaysia, Penang, Malaysia</p>
    <p class="tl-when">Awarded September 2020</p>
  </li>
</ul>
</section>

<section class="section accent-orange">
<h2 class="section-heading">Experience</h2>

<ul class="timeline">
  <li>
    <h3 class="tl-title">Graduate Research Assistant, Pharmacometrics</h3>
    <p class="tl-org">Cincinnati Children's Hospital Medical Center, Cincinnati, OH</p>
    <p class="tl-when">August 2022 – present</p>
    <dl class="duties">
      <dt>Population PK/PD modeling</dt>
      <dd>A pediatric population PK/PD model in NONMEM linking infliximab
      exposure to fecal calprotectin through an indirect response model, and
      population PK models for piperacillin to identify suitable doses for
      surgical populations. Both focus on the covariates that drive exposure
      and what they mean for dosing.</dd>

      <dt>Machine learning</dt>
      <dd>Ensemble models (XGBoost, random forest, CatBoost) that predict
      long-term biochemical remission from induction-phase data and individual
      PK/PD parameters, interpreted with SHAP, and a deep Q-network that treats
      dosing as a Markov decision process. All of it is benchmarked against the
      pharmacometric models.</dd>

      <dt>Tool development</dt>
      <dd>Interactive dashboards and standalone HTML reports in R and Python
      showing PK/PD simulation and modeling results (concentration-time
      profiles, diagnostics, target attainment) in a form clinical and research
      teams can read without a pharmacometrician in the room.</dd>

      <dt>Early-onset IBD</dt>
      <dd>Validating an existing population PK model in an early-onset IBD
      cohort, with a dashboard of descriptive statistics, diagnostic plots
      and individual patient PK reports.</dd>

      <dt>Clinical consultation</dt>
      <dd>Assistant PK consultant to clinical teams, analyzing therapeutic drug
      monitoring data to recommend dose adjustments for immunosuppressants
      (mycophenolic acid, tacrolimus, sirolimus) in high-risk pediatric patients.</dd>

      <dt>Study design</dt>
      <dd>A D-optimal design study in PopED to choose dupilumab sampling
      timepoints for pediatric eosinophilic esophagitis trials, maximizing
      information gain while minimizing patient burden.</dd>
    </dl>
  </li>
  <li>
    <h3 class="tl-title">Data Scientist Intern</h3>
    <p class="tl-org">Enveda Therapeutics, Boulder, CO</p>
    <p class="tl-when">July 2026 – September 2026</p>
    <p>Linked untargeted metabolomics to wearable sleep, cardiovascular and
    activity data in healthy volunteers, using linear mixed-effects models with
    FDR control to find metabolite–wearable associations and characterize
    diurnal variability. Built the Python pipeline and dashboard. Also used
    metabolomics to classify ulcerative colitis vs Crohn's disease, and active
    disease vs remission, in a cohort already profiled by genomics,
    transcriptomics and proteomics.</p>
  </li>
  <li>
    <h3 class="tl-title">Research Assistant</h3>
    <p class="tl-org">University of Malaya, Kuala Lumpur, Malaysia</p>
    <p class="tl-when">March 2022 – May 2022</p>
    <p>Data cleaning and exploratory analysis of large patient datasets for a
    model-informed precision dosing initiative for vancomycin.</p>
  </li>
  <li>
    <h3 class="tl-title">Research Assistant</h3>
    <p class="tl-org">Universiti Sains Malaysia, Penang, Malaysia</p>
    <p class="tl-when">May 2021 – May 2022</p>
    <p>Systematic review and meta-analysis of isoniazid population PK models,
    establishing a framework for tuberculosis dosing across populations.</p>
  </li>
</ul>
</section>

<section class="section accent-green">
<h2 class="section-heading">Skills</h2>

<div class="skill-grid">
  <div class="skill-group sg-blue">
    <h3>Pharmacometrics</h3>
    <ul class="chips">
      <li class="chip chip-blue">NONMEM</li>
      <li class="chip chip-blue">mrgsolve</li>
      <li class="chip chip-blue">PopED</li>
      <li class="chip chip-blue">PsN</li>
      <li class="chip chip-blue">Pirana</li>
    </ul>
    <p class="sg-note">Population PK/PD, exposure–response, indirect response
    models, Bayesian forecasting, optimal design, and dosing simulation for
    target attainment.</p>
  </div>

  <div class="skill-group sg-orange">
    <h3>Machine learning</h3>
    <ul class="chips">
      <li class="chip chip-orange">Gradient boosting</li>
      <li class="chip chip-orange">Random forest</li>
      <li class="chip chip-orange">CatBoost</li>
      <li class="chip chip-orange">SHAP</li>
      <li class="chip chip-orange">Neural ODEs</li>
      <li class="chip chip-orange">Variational autoencoders</li>
      <li class="chip chip-orange">Deep Q-networks</li>
    </ul>
    <p class="sg-note">Used in my dissertation for remission prediction and
    dosing policy, always benchmarked against the mechanistic model.</p>
  </div>

  <div class="skill-group sg-green">
    <h3>Programming</h3>
    <ul class="chips">
      <li class="chip chip-green">R</li>
      <li class="chip chip-green">Python</li>
      <li class="chip chip-green">C++</li>
      <li class="chip chip-green">Git</li>
    </ul>
    <p class="sg-note">Shiny dashboards, reproducible analysis pipelines and
    standalone HTML reports. Examples are in the
    <a href="{{ site.url }}/portfolio/">portfolio</a>.</p>
  </div>

  <div class="skill-group sg-violet">
    <h3>Therapeutic areas</h3>
    <ul class="chips">
      <li class="chip chip-violet">Pediatrics</li>
      <li class="chip chip-violet">Infectious disease</li>
      <li class="chip chip-violet">Immunology</li>
      <li class="chip chip-violet">Rare disease</li>
    </ul>
    <p class="sg-note">Biologics and antibiotics in critically ill and
    chronically treated children, and therapeutic drug monitoring.</p>
  </div>
</div>
</section>

<section class="section accent-violet">
<h2 class="section-heading">Research interests</h2>

<div class="interests">
  <div class="interest">
    <h3>Population PK/PD</h3>
    <p>How drug exposure and response vary across a population, and what
    explains the variability.</p>
  </div>
  <div class="interest">
    <h3>Model-informed precision dosing</h3>
    <p>Turning those models into dose recommendations for individual patients,
    especially children, whose doses are too often extrapolated from adults.</p>
  </div>
  <div class="interest">
    <h3>Modeling and simulation</h3>
    <p>Indirect response models, exposure–response analysis and Monte Carlo
    simulation in NONMEM, R, mrgsolve and Python.</p>
  </div>
  <div class="interest">
    <h3>Clinical trial design</h3>
    <p>Optimal design methods for picking sampling schemes that get the most
    information with the least burden on patients.</p>
  </div>
  <div class="interest">
    <h3>Omics in clinical pharmacology</h3>
    <p>Untargeted metabolomics as a readout of disease state and treatment
    response, and the processing (filtering, non-detects, batch structure,
    repeated visits) a feature table needs before its associations are worth
    acting on.</p>
  </div>
  <div class="interest">
    <h3>Wearable and sensor data</h3>
    <p>Turning continuous sleep, cardiovascular and activity streams into
    exposures that can be joined to sparse biological samples, and separating
    within-person signal from diurnal patterns and non-wear.</p>
  </div>
  <div class="interest">
    <h3>Machine learning in pharmacometrics</h3>
    <p>Testing when ML actually does better than a mechanistic model, and
    when it only appears to.</p>
  </div>
</div>
</section>

<section class="section accent-blue">
<h2 class="section-heading">Get in touch</h2>
<div class="contact-card">
  <p>I'm happy to hear about research collaborations in PK/PD modeling,
  methods questions in pharmacometrics, and internship or job
  opportunities.</p>
  <p class="contact-links">
    <a class="cbtn cbtn-primary" href="mailto:{{ site.email }}">Email</a>
    <a class="cbtn" href="https://www.linkedin.com/in/{{ site.linkedin }}/">LinkedIn</a>
    <a class="cbtn" href="https://github.com/{{ site.github_username }}">GitHub</a>
    <a class="cbtn" href="https://scholar.google.com/citations?user=ZJU1efMAAAAJ">Google Scholar</a>
    <a class="cbtn" href="{{ site.url }}/portfolio/">Portfolio</a>
  </p>
</div>
</section>

<p class="updated">Last updated {{ site.time | date: "%B %Y" }}</p>
