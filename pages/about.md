---
layout: about
title: About
description: Wen Rui Tan - PhD candidate, pharmacometrician and data scientist in pediatric clinical pharmacology
keywords: About, Wen Rui Tan, Pharmacometrician, Data Scientist, Biography
comments: true
menu: About
permalink: /about/
---

<header class="page-intro">
  <p class="eyebrow">About</p>
  <h1>Wen Rui Tan</h1>
  <p class="page-lede">PhD candidate in pharmacology, working on population PK/PD
  modeling and model-informed precision dosing for children — and on where
  machine learning genuinely adds to that, rather than replacing it.</p>
  <p class="id-line">
    <span class="id-item">Cincinnati, OH, United States</span>
    <span class="sep">·</span>
    <a href="mailto:{{ site.email }}">{{ site.email }}</a>
    <span class="sep">·</span>
    <a href="https://www.linkedin.com/in/{{ site.linkedin }}/">LinkedIn</a>
    <span class="sep">·</span>
    <a href="https://github.com/{{ site.github_username }}">GitHub</a>
  </p>
</header>

<section class="section accent-blue">
<h2 class="section-heading">Education</h2>

<ul class="timeline">
  <li>
    <h3 class="tl-title">PhD, Pharmacology and Systems Physiology</h3>
    <p class="tl-org">University of Cincinnati College of Medicine, Cincinnati, OH</p>
    <p class="tl-when">Expected May 2027</p>
    <p>Dissertation: <em>Advancing model-informed precision dosing via hybrid
    mechanistic and data-driven algorithms — an infliximab case study.</em>
    Population PK/PD, ensemble machine learning, neural ODEs and deep
    reinforcement learning applied to dosing in pediatric Crohn's disease.</p>
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
      <dd>Mechanistic population PK/PD models for infliximab (a biologic) and
      piperacillin (a small molecule) in NONMEM, identifying the covariates that
      drive exposure and using them to optimize pediatric dosing.</dd>

      <dt>Machine learning</dt>
      <dd>Gradient boosting, bagging and variational autoencoders for
      disease-response prediction, benchmarked against the pharmacometric models
      they were meant to improve on.</dd>

      <dt>Tool development</dt>
      <dd>R-Shiny dashboards that let clinical teams explore PK simulations
      directly, turning model output into concentration-time profiles and target
      attainment they can read without a pharmacometrician present.</dd>

      <dt>Clinical consultation</dt>
      <dd>Assistant PK consultant to clinical teams, analyzing therapeutic drug
      monitoring data to recommend dose adjustments for immunosuppressants
      (mycophenolic acid, tacrolimus, sirolimus) in high-risk pediatric patients.</dd>

      <dt>Study design</dt>
      <dd>A D-optimal design study in PopED to choose sampling timepoints for
      dupilumab, maximizing information gain while minimizing patient burden in
      pediatric eosinophilic oesophagitis trials.</dd>
    </dl>
  </li>
  <li>
    <h3 class="tl-title">Research Assistant</h3>
    <p class="tl-org">University of Malaya, Kuala Lumpur, Malaysia</p>
    <p class="tl-when">March 2022 – May 2022</p>
    <p>Data cleaning and exploratory analysis on large-scale patient datasets,
    supporting a model-informed precision dosing initiative for vancomycin.</p>
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
      <li class="chip chip-blue">Pirana</li>
    </ul>
    <p class="sg-note">Population PK/PD, exposure–response, indirect response
    models, optimal design, Monte Carlo simulation for dose selection.</p>
  </div>

  <div class="skill-group sg-orange">
    <h3>Machine learning</h3>
    <ul class="chips">
      <li class="chip chip-orange">Gradient boosting</li>
      <li class="chip chip-orange">Random forest</li>
      <li class="chip chip-orange">Neural ODEs</li>
      <li class="chip chip-orange">Variational autoencoders</li>
      <li class="chip chip-orange">Deep Q-networks</li>
    </ul>
    <p class="sg-note">Applied to remission prediction and dosing policy in the
    dissertation, always benchmarked against the mechanistic model rather than
    reported on their own.</p>
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
    self-contained HTML reporting — see the
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
    chronically treated children; therapeutic drug monitoring.</p>
  </div>
</div>
</section>

<section class="section accent-violet">
<h2 class="section-heading">Research interests</h2>

<div class="interests">
  <div class="interest">
    <h3>Population PK/PD</h3>
    <p>Characterizing how drug exposure and response vary across a population,
    and what explains that variability.</p>
  </div>
  <div class="interest">
    <h3>Model-informed precision dosing</h3>
    <p>Turning those models into individual dose recommendations, particularly
    for children, where dosing is too often extrapolated from adults.</p>
  </div>
  <div class="interest">
    <h3>Modeling and simulation</h3>
    <p>Indirect response models, exposure–response analysis and Monte Carlo
    simulation in NONMEM, R, mrgsolve and Python.</p>
  </div>
  <div class="interest">
    <h3>Clinical trial design</h3>
    <p>Optimal design methods that choose sampling schemes to maximize
    information while keeping patient burden low.</p>
  </div>
  <div class="interest">
    <h3>Machine learning in pharmacometrics</h3>
    <p>Where ML genuinely improves on a mechanistic model, and where it only
    looks like it does.</p>
  </div>
</div>
</section>

<section class="section accent-blue">
<h2 class="section-heading">Get in touch</h2>
<div class="contact-card">
  <p>Happy to hear about research collaborations in PK/PD modeling,
  methodological discussion in pharmacometrics, and internship or job
  opportunities.</p>
  <p class="contact-links">
    <a class="cbtn cbtn-primary" href="mailto:{{ site.email }}">Email</a>
    <a class="cbtn" href="https://www.linkedin.com/in/{{ site.linkedin }}/">LinkedIn</a>
    <a class="cbtn" href="https://github.com/{{ site.github_username }}">GitHub</a>
    <a class="cbtn" href="{{ site.url }}/portfolio/">Portfolio</a>
  </p>
</div>
</section>

<p class="updated">Last updated {{ site.time | date: "%B %Y" }}</p>
