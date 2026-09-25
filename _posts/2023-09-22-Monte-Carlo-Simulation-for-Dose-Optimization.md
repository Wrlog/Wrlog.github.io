---
layout: post
title: "Monte Carlo Simulation for Model-Informed Dose Optimization"
categories: Pharmacometrics
description: "Implementing Monte Carlo simulations to evaluate dosing regimens and determine optimal strategies for pediatric patients"
keywords: "Monte Carlo Simulation, Dose Optimization, Pharmacokinetics, NONMEM, R"
date: 2023-09-22
---

## Why simulate

A population PK model gives you a typical patient and a description of how
much individuals vary around them. But doses are chosen for a population, so
what you want to know is what fraction of that population reaches the target
on a given regimen.

Monte Carlo simulation answers that. The steps are always roughly:

1. Draw a virtual population with covariates covering the range you actually
   treat.
2. Draw individual PK parameters for each subject from the model's
   between-subject variability.
3. Simulate every subject through each candidate regimen.
4. Summarise across the population as probability of target attainment (PTA),
   rather than looking at the profile of the average patient.

Step 4 is the one people skip. Checking that the typical patient's trough
clears the target is a much easier question, and it will recommend a dose that
fails in about half the population.

## Setting up

```r
library(tidyverse)
library(mrgsolve)
library(viridis)
library(patchwork)
library(pracma)   # trapz(), used for AUC below

# mrgsolve's built-in library has no piperacillin model. Point mread() at a
# model file of your own, or start from one of the shipped structural models
# (modlib() provides pk1, pk2, irm1-irm4, emax and others).
mod <- mread("pk2", modlib())

generate_virtual_population <- function(n = 1000, age_range = c(0.5, 18)) {
  age <- runif(n, age_range[1], age_range[2])
  weight <- exp(rnorm(n, log(3.5 * age^0.75), 0.3))
  bsa <- 0.024265 * (weight^0.5378) * ((age * 12)^0.3964)
  crcl <- 0.48 * weight * (140 - age) / (0.7 * 1.0)
  crcl <- pmax(10, pmin(200, crcl))
  
  data.frame(
    ID = 1:n,
    AGE = age,
    WT = weight,
    BSA = bsa,
    CRCL = crcl,
    SEX = sample(c("M", "F"), n, replace = TRUE)
  )
}

run_mc_simulation <- function(model, population, dose_mgkg, interval_hours, n_doses = 4) {
  results <- list()
  
  for (i in 1:nrow(population)) {
    patient <- population[i, ]
    
    CL <- 2.5 * (patient$CRCL/80)^0.75 * (patient$WT/20)^0.75 * 
          exp(rnorm(1, 0, 0.3))
    V <- 15 * (patient$WT/20) * exp(rnorm(1, 0, 0.25))
    
    ev <- ev(amt = dose_mgkg * patient$WT, 
             ii = interval_hours, 
             addl = n_doses - 1)
    
    out <- model %>%
      param(CL = CL, V = V) %>%
      ev(ev) %>%
      mrgsim(end = interval_hours * n_doses, delta = 0.5) %>%
      as.data.frame()
    
    out$ID <- patient$ID
    out$WT <- patient$WT
    out$CRCL <- patient$CRCL
    out$AGE <- patient$AGE
    
    results[[i]] <- out
  }
  
  bind_rows(results)
}

calculate_pta <- function(sim_data, target_threshold, time_window = NULL) {
  if (!is.null(time_window)) {
    sim_data <- sim_data %>%
      filter(time >= time_window[1] & time <= time_window[2])
  }
  
  sim_data %>%
    group_by(ID) %>%
    summarise(
      Cmin = min(CP, na.rm = TRUE),
      Cmax = max(CP, na.rm = TRUE),
      AUC = pracma::trapz(time, CP),
      T_above_target = sum(CP >= target_threshold, na.rm = TRUE) * 0.5,
      PTA = ifelse(Cmin >= target_threshold, 1, 0),
      WT = first(WT),
      CRCL = first(CRCL),
      AGE = first(AGE)
    )
}

evaluate_dosing_regimens <- function(model, population, regimens) {
  results_list <- list()
  
  for (regimen_name in names(regimens)) {
    regimen <- regimens[[regimen_name]]
    
    sim_data <- run_mc_simulation(
      model = model,
      population = population,
      dose_mgkg = regimen$dose,
      interval_hours = regimen$interval,
      n_doses = regimen$n_doses
    )
    
    pta_64 <- calculate_pta(sim_data, target_threshold = 64)
    pta_32 <- calculate_pta(sim_data, target_threshold = 32)
    
    results_list[[regimen_name]] <- list(
      sim_data = sim_data,
      pta_64 = pta_64,
      pta_32 = pta_32,
      regimen = regimen
    )
  }
  
  results_list
}
```

## Choosing the regimens to compare

I keep the candidate regimens close to the current standard of care. The
result has to be a recommendation someone can act on, which usually means a
small change from what's already done. The highest regimen here is only there
to show where the curve levels off. Check any candidate against the licensed
maximum daily dose before quoting it.

```r
population <- generate_virtual_population(n = 2000, age_range = c(1, 12))

regimens <- list(
  "Standard_100mg_6h" = list(dose = 100, interval = 6, n_doses = 4),
  "High_125mg_6h" = list(dose = 125, interval = 6, n_doses = 4),
  "Extended_100mg_8h" = list(dose = 100, interval = 8, n_doses = 3),
  "Intensive_150mg_6h" = list(dose = 150, interval = 6, n_doses = 4)
)

simulation_results <- evaluate_dosing_regimens(mod, population, regimens)

pta_summary <- map_dfr(names(simulation_results), function(regimen_name) {
  result <- simulation_results[[regimen_name]]
  data.frame(
    Regimen = regimen_name,
    Dose_mgkg = result$regimen$dose,
    Interval_h = result$regimen$interval,
    PTA_64 = mean(result$pta_64$PTA),
    PTA_32 = mean(result$pta_32$PTA),
    Mean_Cmin = mean(result$pta_64$Cmin),
    Median_Cmin = median(result$pta_64$Cmin),
    P5_Cmin = quantile(result$pta_64$Cmin, 0.05),
    P95_Cmin = quantile(result$pta_64$Cmin, 0.95)
  )
})
```

## Reading the output

I look at three things, though usually only the first gets reported:

- PTA against the target. The usual acceptance threshold is 90% of the
  population, but that's a convention. The threshold should depend on what
  missing the target costs, which is different for a prophylactic indication
  and a life-threatening infection.
- The shape of the dose-PTA curve. If attainment is still rising steeply at
  the chosen dose, the regimen is fragile, and small errors in the assumed PK
  cause large swings in attainment.
- Who fails. The overall percentage hides which subgroup misses. Plotting
  trough against weight and renal function (`p2` below) can turn "88%
  attainment" into "attainment is fine except in the augmented-clearance
  subgroup", and that leads to a different recommendation.

```r
p1 <- pta_summary %>%
  pivot_longer(cols = c(PTA_64, PTA_32), names_to = "Target", values_to = "PTA") %>%
  mutate(Target = ifelse(Target == "PTA_64", "≥64 mg/L", "≥32 mg/L")) %>%
  ggplot(aes(x = reorder(Regimen, PTA), y = PTA, fill = Target)) +
  geom_bar(stat = "identity", position = "dodge", alpha = 0.8) +
  geom_hline(yintercept = 0.9, linetype = "dashed", color = "red", size = 1) +
  annotate("text", x = 2.5, y = 0.92, label = "Target: 90%", color = "red", fontface = "bold") +
  scale_fill_viridis_d(begin = 0.2, end = 0.8) +
  labs(x = "Dosing Regimen", y = "Probability of Target Attainment",
       title = "PTA Comparison Across Dosing Regimens") +
  coord_flip() +
  theme_minimal() +
  theme(legend.position = "bottom")

p2 <- simulation_results$High_125mg_6h$pta_64 %>%
  ggplot(aes(x = WT, y = Cmin, color = CRCL)) +
  geom_point(alpha = 0.5) +
  geom_hline(yintercept = 64, linetype = "dashed", color = "red") +
  geom_smooth(method = "loess", se = TRUE, color = "blue") +
  scale_color_viridis_c(name = "CrCL\n(mL/min)") +
  labs(x = "Weight (kg)", y = "Trough Concentration (mg/L)",
       title = "Cmin Distribution: 125 mg/kg q6h") +
  theme_minimal()

p3 <- map_dfr(names(simulation_results), function(regimen_name) {
  result <- simulation_results[[regimen_name]]
  result$pta_64 %>%
    mutate(Regimen = regimen_name)
}) %>%
  ggplot(aes(x = Regimen, y = Cmin, fill = Regimen)) +
  geom_violin(alpha = 0.7) +
  geom_boxplot(width = 0.2, outlier.alpha = 0.3) +
  geom_hline(yintercept = 64, linetype = "dashed", color = "red") +
  scale_fill_viridis_d(begin = 0.2, end = 0.8) +
  labs(x = "Dosing Regimen", y = "Trough Concentration (mg/L)",
       title = "Cmin Distribution Across Regimens") +
  theme_minimal() +
  theme(legend.position = "none",
        axis.text.x = element_text(angle = 45, hjust = 1))

p4 <- pta_summary %>%
  ggplot(aes(x = Dose_mgkg, y = PTA_64, color = factor(Interval_h))) +
  geom_point(size = 4, alpha = 0.8) +
  geom_line(aes(group = Interval_h), alpha = 0.5) +
  geom_hline(yintercept = 0.9, linetype = "dashed", color = "red") +
  scale_color_viridis_d(name = "Interval\n(hours)", begin = 0.2, end = 0.8) +
  labs(x = "Dose (mg/kg)", y = "PTA (≥64 mg/L)",
       title = "Dose-Response Relationship") +
  theme_minimal()

combined_plot <- (p1 | p2) / (p3 | p4) +
  plot_annotation(
    title = "Monte Carlo Simulation for Piperacillin Dose Optimization",
    subtitle = "Evaluation of multiple dosing regimens in pediatric population (n=2000)",
    theme = theme(plot.title = element_text(size = 16, face = "bold", hjust = 0.5),
                  plot.subtitle = element_text(size = 12, hjust = 0.5, color = "grey40"))
  )

print(combined_plot)

optimal_regimen <- pta_summary %>%
  filter(PTA_64 >= 0.9) %>%
  arrange(Dose_mgkg) %>%
  slice_head(n = 1)

cat("\n=== Optimal Dosing Regimen ===\n")
cat(sprintf("Regimen: %s\n", optimal_regimen$Regimen))
cat(sprintf("Dose: %d mg/kg\n", optimal_regimen$Dose_mgkg))
cat(sprintf("Interval: %d hours\n", optimal_regimen$Interval_h))
cat(sprintf("PTA (≥64 mg/L): %.1f%%\n", optimal_regimen$PTA_64 * 100))
cat(sprintf("Mean Cmin: %.1f mg/L\n", optimal_regimen$Mean_Cmin))
cat(sprintf("5th-95th Percentile Cmin: %.1f - %.1f mg/L\n", 
            optimal_regimen$P5_Cmin, optimal_regimen$P95_Cmin))
```

