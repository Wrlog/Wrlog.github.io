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
  <h1>Pharmacometrics, omics and sensor data</h1>
  <p class="page-lede">Population PK/PD modeling and model-informed precision
  dosing in pediatric clinical pharmacology, plus untargeted metabolomics and
  wearable sensor data. My research projects, published software and papers
  are below.</p>

  <ul class="tiles">
    <li class="tile tile-blue"><span class="n">6</span><span class="l">Research projects</span></li>
    <li class="tile tile-violet"><span class="n">6</span><span class="l">Publications</span></li>
    <li class="tile tile-green"><span class="n">4</span><span class="l">Public repositories</span></li>
    <li class="tile tile-amber"><span class="n">6</span><span class="l">Conference abstracts</span></li>
  </ul>
</header>

<section class="section accent-blue">
<h2 class="section-heading">Doctoral research</h2>

<div class="thesis">
  <p class="thesis-label">PhD dissertation · expected 2027</p>
  <h3 class="thesis-title">Advancing model-informed precision dosing via
  mechanistic and data-driven algorithms: an infliximab case study</h3>
  <p class="thesis-org">University of Cincinnati College of Medicine ·
  Department of Pharmacology, Physiology and Neurobiology<br>
  Advisor: Tomoyuki Mizuno, PhD</p>
  <p>Children on infliximab for Crohn's disease get sparse, irregular
  monitoring: a few trough concentrations and biomarkers, taken when the clinic
  could. My dissertation asks how far that routine therapeutic drug monitoring
  can go toward choosing a better next dose, and whether a mechanistic model, a
  learned model or both together work best.</p>
  <p>I build a population PK/PD model of infliximab exposure and response, then
  test ensemble machine learning and neural ODEs against it for predicting
  biochemical remission, and deep reinforcement learning for the dosing policy.
  Two supplementary chapters extend this to adult observational cohorts.</p>
  <ul class="chips">
    <li class="chip chip-blue">Population PK/PD</li>
    <li class="chip chip-blue">Model-informed precision dosing</li>
    <li class="chip chip-orange">Ensemble ML</li>
    <li class="chip chip-orange">Neural ODEs</li>
    <li class="chip chip-orange">Deep reinforcement learning</li>
  </ul>
  <p class="thesis-note">Results stay private until the defence.</p>
</div>

<h2 class="section-heading" style="margin-top:38px">Projects</h2>

<article class="entry">
  <h3 class="entry-title">PK/PD modeling and machine learning for infliximab in pediatric Crohn's disease</h3>
  <p class="entry-meta"><span class="org">Cincinnati Children's Hospital Medical Center</span><span class="sep">·</span>August 2022 – present</p>

  <p>Mechanistic population PK/PD models for infliximab (a monoclonal antibody)
  in children with Crohn's disease, combined with machine learning to improve
  response prediction and guide dosing. Exposure varies widely between
  children, and standard dosing leaves many of them under-exposed.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>Population PK/PD models in NONMEM with covariates for body size, disease status and immunogenicity.</li>
        <li>Indirect response models for the delayed effect on disease biomarkers and clinical endpoints.</li>
        <li>Exposure–response analysis linking AUC and trough concentrations to disease activity scores.</li>
        <li>XGBoost and random forest for disease response, benchmarked against the pharmacometric models to see what the PK/PD features add.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>What it gives you</h4>
      <ul>
        <li>How much infliximab exposure and response vary between children, and how much of that the model explains.</li>
        <li>Once between-subject variability is attributed to measurable characteristics and the patient's own monitoring data, the remaining uncertainty is small enough for a model-based dose to be useful.</li>
        <li>A profile of who reaches and stays in biochemical remission, from induction-phase data, while the dose can still be changed.</li>
        <li>Together that's what model-informed precision dosing needs: a model of the variability, an exposure target tied to a clinical endpoint, and an early read on who is on track.</li>
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

  <p>Prophylactic antibiotic doses for critically ill children are usually
  extrapolated from adults and rarely validated. This work gives that dosing a
  population PK evidence base for children in perioperative care.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>Population PK models in NONMEM for piperacillin in critically ill pediatric patients.</li>
        <li>Covariate analysis of body size, renal function and critical illness on clearance and volume of distribution.</li>
        <li>Monte Carlo simulation of candidate regimens, scored by probability of target attainment.</li>
        <li>An R-Shiny dashboard where clinical teams can change weight, renal function and regimen and see the profile and target attainment.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>Results</h4>
      <ul>
        <li>Body size and renal function are the covariates that matter for piperacillin exposure.</li>
        <li>Standard regimens are suboptimal for parts of the pediatric population.</li>
        <li>Dosing recommendations that account for patient-specific factors, to support antibiotic stewardship.</li>
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

  <p>The data-driven half of the dissertation: what machine learning adds on
  top of a mechanistic population PK/PD model when all you have is the sparse,
  irregular data from routine care.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>Ensemble models (gradient boosting and bagging) predicting biochemical remission from treatment-course features.</li>
        <li>Neural ODEs for the biomarker trajectory, which handle irregular sampling in continuous time without forcing it onto a grid.</li>
        <li>A deep Q-network learning a dosing policy, rewarded on target attainment and remission.</li>
        <li>The learned policy compared with standard dosing and with maximum a posteriori Bayesian dosing to a concentration target.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>Status</h4>
      <ul>
        <li>Analyses are being finalised, and results are held back until the defence.</li>
        <li>Aggregate result tables and figures are in a private repository that I'll open as the work is published.</li>
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
  (access on request until the work is published).</p>
</article>

<article class="entry">
  <h3 class="entry-title">Metabolite–wearable associations in healthy volunteers</h3>
  <p class="entry-meta"><span class="org">Enveda Therapeutics</span><span class="sep">·</span>July – September 2026</p>

  <p>Healthy volunteers wore sleep, cardiovascular and activity trackers and
  were sampled for untargeted plasma metabolomics. I looked at what the sensor
  record explains about the metabolome, and how much of a metabolite's apparent
  association with behaviour is just the time of day the blood was drawn.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>One pre-specified exposure per sample from the sensor streams. Window, summary and reference were fixed before looking at outcomes, and alternatives are reported as sensitivity analyses instead of searched over.</li>
        <li>Wear-time rules set in advance, reporting how many participant-days each rule removed.</li>
        <li>Linear mixed-effects models with a participant intercept, splitting within- from between-person variation so the coefficient is a change from the participant's own baseline.</li>
        <li>Harmonic terms on sampling clock time, because the metabolome and every wearable metric vary within the day and collection time would otherwise show up as a spurious effect.</li>
        <li>Benjamini–Hochberg control within each wearable metric, collapsing discoveries to compounds before counting.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>How it's built</h4>
      <ul>
        <li>A Python pipeline from raw device exports and metabolomics deliveries to the association tables, carrying the filtering counts into the output.</li>
        <li>A dashboard of the diurnal profiles, QC and association results for the study team.</li>
      </ul>
    </div>
  </div>

  <ul class="chips">
    <li class="chip chip-green">Python</li>
    <li class="chip chip-orange">Mixed-effects models</li>
    <li class="chip chip-orange">FDR control</li>
    <li class="chip chip-violet">Untargeted metabolomics</li>
    <li class="chip chip-violet">Wearable sensor data</li>
  </ul>

  <p class="entry-note">Analysis code and data belong to Enveda Therapeutics
  and are not public. Background on the methods:
  <a href="{{ site.url }}/2026/09/21/Wearable-Data-and-Molecular-Phenotypes/">wearable data and molecular phenotypes</a>.</p>
</article>

<article class="entry">
  <h3 class="entry-title">Untargeted metabolomics of inflammatory bowel disease</h3>
  <p class="entry-meta"><span class="org">Enveda Therapeutics</span><span class="sep">·</span>July – September 2026<span class="sep">·</span>feeds a supplementary dissertation chapter</p>

  <p>Plasma metabolomics on an adult IBD cohort already profiled by genomics,
  transcriptomics and proteomics, but not metabolomics. Can the metabolome
  separate ulcerative colitis from Crohn's disease, and active disease from
  remission? And could it predict treatment response <em>before</em> the first
  dose, which the dosing work in the dissertation has to assume away?</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>A reproducible notebook sequence per delivery: load and hash the exports, filter and normalize, QC and missingness, PCA, differential analysis, candidate review.</li>
        <li>Annotation and prevalence filters compared with alternatives, with the cost of each choice reported.</li>
        <li>Patient-intercept mixed models for repeated visits, with ordinary least squares and a run-order-adjusted model as sensitivity comparisons, and Benjamini–Hochberg control within each contrast.</li>
        <li>Non-detects left as missing rather than imputed, plus a separate presence/absence test, since a model of detected intensity can't see a feature that's absent in one group.</li>
        <li>Cross-batch comparability and low-signal exclusion run as diagnostics that report and stop when they don't apply.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>What came of it</h4>
      <ul>
        <li>A feasibility assessment instead of a classifier. Medication is recorded without start dates, so only a handful of patients in this cohort have a plasma sample from before a documented treatment start.</li>
        <li>That sets the design and size a study would need to answer the pre-treatment question, which is what the supplementary chapter reports.</li>
      </ul>
    </div>
  </div>

  <ul class="chips">
    <li class="chip chip-green">Python</li>
    <li class="chip chip-orange">Mixed-effects models</li>
    <li class="chip chip-orange">PCA</li>
    <li class="chip chip-orange">FDR control</li>
    <li class="chip chip-violet">Untargeted metabolomics</li>
  </ul>

  <p class="entry-note">Analysis code and data belong to Enveda Therapeutics
  and are not public. Background on the methods:
  <a href="{{ site.url }}/2026/09/14/Untargeted-Metabolomics-Feature-Tables/">untargeted metabolomics, from feature table to association list</a>.</p>
</article>

<article class="entry">
  <h3 class="entry-title">External validation of a published infliximab model in very early onset IBD</h3>
  <p class="entry-meta"><span class="org">Cincinnati Children's Hospital Medical Center</span><span class="sep">·</span>2025 – 2026</p>

  <p>A population PK model published in one paediatric population doesn't
  automatically hold in another. This tests an existing infliximab model in a
  very early onset IBD cohort, children much younger than the populations it
  was built on, and reports how well it predicts them.</p>

  <div class="panels">
    <div class="panel panel-approach">
      <h4>Approach</h4>
      <ul>
        <li>The published model with every parameter fixed and nothing re-estimated, so it's tested as published.</li>
        <li>Individual clearances as empirical Bayes estimates for each child, given the published priors.</li>
        <li>Prediction-corrected visual predictive checks for Crohn's alone and for the pooled Crohn's, ulcerative colitis and indeterminate colitis cohort.</li>
        <li>Interactive HTML dashboards of the cohort, diagnostics and per-patient PK for the study team.</li>
      </ul>
    </div>
    <div class="panel panel-results">
      <h4>How it's built</h4>
      <ul>
        <li>Python for data preparation and reporting, NONMEM and PsN for fitting and VPCs. Versions are pinned, since a pandas change can move a histogram bin edge.</li>
        <li>The repository has code only: no patient data, datasets or rendered dashboards. A synthetic-data generator mimics the real workbook's structure and awkward cases, so the pipeline runs without PHI.</li>
      </ul>
    </div>
  </div>

  <ul class="chips">
    <li class="chip chip-blue">NONMEM</li>
    <li class="chip chip-blue">PsN</li>
    <li class="chip chip-blue">VPC</li>
    <li class="chip chip-green">Python</li>
    <li class="chip chip-violet">External validation</li>
  </ul>

  <p class="entry-note"><span class="badge badge-grey">Private</span>
  Code: <a href="https://github.com/Wrlog/VEO_CCHMC">Wrlog/VEO_CCHMC</a>
  (access on request).</p>
</article>
</section>

<section class="section accent-green">
<h2 class="section-heading">Software</h2>
<p class="section-lede">Public repositories at <a href="https://github.com/Wrlog">github.com/Wrlog</a>.</p>

<div class="cards">
  <article class="card card-green">
    <h3 class="card-title"><a href="https://github.com/Wrlog/dosing-simulator">dosing-simulator</a></h3>
    <p>An R-Shiny app that simulates intravenous dosing regimens in a simulated
    population, using a two-compartment model with first-order elimination,
    allometric scaling on weight, a power function on renal function, and
    log-normal between-subject variability on clearance and central volume. It
    reports concentration-time profiles with prediction intervals, target
    attainment, time above target and trough statistics. No patient data; it's
    for research and teaching. The PK solver is a closed-form solution of the
    two-compartment model, so it all runs in the browser with no server.</p>
    <ul class="chips">
      <li class="chip chip-green">R</li>
      <li class="chip chip-green">Shiny</li>
      <li class="chip chip-green">WebAssembly</li>
    </ul>
    <p class="card-link"><a href="https://wrlog.github.io/dosing-simulator/">Run the simulator in your browser →</a></p>
  </article>

  <article class="card card-blue">
    <h3 class="card-title"><a href="https://github.com/Wrlog/metabolomics-dashboard-demo">metabolomics-dashboard-demo</a></h3>
    <p>A reporting pattern for omics analysis: simulate a study, run curation
    and association, and render the result as one HTML file that opens offline
    without a server or notebook. It has QC drift, PCA and volcano plots and a
    filter bar to search and sort results. The data is synthetic and seeded,
    and the planted associations are listed so you can check the output
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

  <article class="card card-violet">
    <h3 class="card-title"><a href="https://github.com/Wrlog/nonmem-model-library">nonmem-model-library</a></h3>
    <p>NONMEM control streams for model families that come up often in drug
    development: two-compartment population PK, Claret tumour growth
    inhibition, an indirect response PK/PD model, a Weibull time-to-event model
    and a binary exposure–response model. Each has a simulated dataset and the
    parameters that generated it, so you can check a run against the known
    answer. Static checks on every commit compare $INPUT with the data columns
    in order, parameter references with declarations, and likelihood models
    with their $ESTIMATION record.</p>
    <ul class="chips">
      <li class="chip chip-blue">NONMEM</li>
      <li class="chip chip-green">Python</li>
      <li class="chip chip-orange">matplotlib</li>
    </ul>
    <p class="card-link"><a href="https://wrlog.github.io/nonmem-model-library/">Browse the model library →</a></p>
  </article>

  <article class="card card-orange">
    <h3 class="card-title"><a href="https://github.com/Wrlog/ml-portfolio">ml-portfolio</a></h3>
    <p>Four machine learning projects: fraud detection, demand forecasting,
    semantic similarity and an implicit-feedback recommender. Each runs on a
    laptop CPU in under three minutes, has a test suite, and is framed around a
    practical decision, like pricing the two error types to pick a fraud
    threshold, deriving every lag from the forecast horizon so nothing leaks, or
    showing that the split protocol moves the score more than the model does.
    All data is synthetic and generated in the repository.</p>
    <ul class="chips">
      <li class="chip chip-green">Python</li>
      <li class="chip chip-orange">LightGBM</li>
      <li class="chip chip-orange">scikit-learn</li>
      <li class="chip chip-orange">matplotlib</li>
    </ul>
    <p class="card-link"><a href="https://wrlog.github.io/ml-portfolio/">View the results dashboard →</a></p>
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
    <span class="year">2022–2026</span>
    <span class="what">Enhancement Fund Award, Department of Pharmacology, Physiology and Neurobiology, University of Cincinnati, awarded in each of 2022, 2023, 2024, 2025 and 2026</span>
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
  <p>I'm open to collaborations in PK/PD modeling, methods discussions, and
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
