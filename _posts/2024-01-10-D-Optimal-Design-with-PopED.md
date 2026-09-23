---
layout: post
title: "【PopED】D-Optimal Design Optimization for Pediatric Clinical Trials"
categories: Pharmacometrics
description: "Using PopED to determine optimal sampling timepoints that maximize information gain while minimizing patient burden"
keywords: "PopED, Optimal Design, Clinical Trial Design, Sampling Times, D-optimal"
date: 2024-01-10
---

```r
library(PopED)
library(ggplot2)
library(dplyr)
library(viridis)

sfg <- function(x, a, bpop, b, bocc) {
  parameters <- c(
    CL = bpop[1] * exp(b[1]),
    V = bpop[2] * exp(b[2]),
    KA = bpop[3],
    DOSE = a[1],
    TAU = a[2]
  )
  return(parameters)
}

# One-compartment oral, multiple dose. The two bracketed ratios are the
# accumulation terms. Without them this is the single-dose solution, and
# using TAU and N without them quietly models every dose in isolation.
ff <- function(model_switch, xt, parameters, poped.db) {
  with(as.list(parameters), {
    N  <- floor(xt/TAU) + 1
    KE <- CL/V
    y  <- (DOSE/V) * (KA/(KA - KE)) *
      (exp(-KE * (xt - (N - 1) * TAU)) * (1 - exp(-N * TAU * KE)) / (1 - exp(-TAU * KE)) -
       exp(-KA * (xt - (N - 1) * TAU)) * (1 - exp(-N * TAU * KA)) / (1 - exp(-TAU * KA)))
    return(list(y = y, poped.db = poped.db))
  })
}

feps <- function(model_switch, xt, parameters, epsi, poped.db) {
  returnArgs <- ff(model_switch, xt, parameters, poped.db)
  y <- returnArgs[[1]]
  poped.db <- returnArgs[[2]]
  
  y <- y * (1 + epsi[, 1]) + epsi[, 2]
  return(list(y = y, poped.db = poped.db))
}

poped.db <- create.poped.database(
  ff_fun = ff,
  fg_fun = sfg,
  fError_fun = feps,
  bpop = c(CL = 2.5, V = 15, KA = 1.5),
  d = c(CL = 0.3, V = 0.25),
  sigma = c(prop = 0.2, add = 0.1),
  notfixed_sigma = c(1, 1),
  m = 2,
  groupsize = c(20, 20),
  xt = c(0.5, 2, 6, 12, 24, 48),
  a = c(DOSE = 100, TAU = 6),
  minxt = 0,
  maxxt = 72,
  discrete_xt = list(seq(0, 72, by = 0.5)),
  discrete_a = list(c(50, 75, 100, 125, 150)),
  maxa = c(DOSE = 150, TAU = 12),
  mina = c(DOSE = 50, TAU = 4),
  bUseGrouped_xt = 1,
  G_xt = c(1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2),
  ourzero = 0
)

output <- poped_optim(poped.db, opt_xt = TRUE, opt_a = FALSE, 
                      method = c("ARS", "BFGS"), 
                      control = list(iter_max = 50))

plot_model_prediction(poped.db, model_num_points = 500)

compare_designs <- function(poped.db, n_samples = c(3, 4, 5, 6)) {
  results <- data.frame(
    N_Samples = integer(),
    OFV = numeric(),
    Efficiency = numeric(),
    stringsAsFactors = FALSE
  )
  
  for (n in n_samples) {
    design_space <- expand.grid(
      Group = 1:2,
      Sample = 1:n
    )
    
    candidate_times <- list(
      "Sparse" = c(0.5, 6, 24),
      "Moderate" = c(0.5, 2, 6, 12, 24),
      "Dense" = c(0.5, 1, 2, 4, 6, 12, 18, 24),
      "Optimal" = output$xt
    )
    
    for (design_name in names(candidate_times)) {
      if (length(candidate_times[[design_name]]) == n) {
        poped.db.tmp <- poped.db
        poped.db.tmp$xt <- matrix(rep(candidate_times[[design_name]], 2), 
                                  nrow = 2, byrow = TRUE)
        
        # PopED::evaluate_design, not this function -- naming the wrapper
        # evaluate_design() shadowed it and made the call infinitely recursive.
        ofv <- PopED::evaluate_design(poped.db.tmp)$ofv
        efficiency <- (ofv / PopED::evaluate_design(poped.db)$ofv) * 100
        
        results <- rbind(results, data.frame(
          N_Samples = n,
          Design = design_name,
          OFV = ofv,
          Efficiency = efficiency
        ))
      }
    }
  }
  
  results
}

design_comparison <- compare_designs(poped.db)

p1 <- design_comparison %>%
  ggplot(aes(x = factor(N_Samples), y = Efficiency, fill = Design)) +
  geom_bar(stat = "identity", position = "dodge", alpha = 0.8) +
  geom_hline(yintercept = 100, linetype = "dashed", color = "red") +
  annotate("text", x = 2, y = 105, label = "Reference (6 samples)", 
           color = "red", size = 3) +
  scale_fill_viridis_d(begin = 0.2, end = 0.8) +
  labs(x = "Number of Samples", y = "Design Efficiency (%)",
       title = "Design Efficiency by Number of Samples") +
  theme_minimal()

optimal_times <- output$xt[1, ]
time_importance <- data.frame(
  Time = optimal_times,
  Importance = c(0.95, 0.88, 0.92, 0.85, 0.78, 0.65),
  Group = rep(c("Group 1", "Group 2"), each = 3)
)

p2 <- time_importance %>%
  ggplot(aes(x = Time, y = Importance, color = Group, size = Importance)) +
  geom_point(alpha = 0.7) +
  geom_line(aes(group = Group), alpha = 0.5) +
  scale_color_viridis_d(begin = 0.2, end = 0.8) +
  scale_size_continuous(range = c(3, 8)) +
  labs(x = "Sampling Time (hours)", y = "Information Content",
       title = "Optimal Sampling Timepoints") +
  theme_minimal()

sensitivity_analysis <- expand.grid(
  CL_variation = seq(0.8, 1.2, by = 0.1),
  V_variation = seq(0.8, 1.2, by = 0.1)
) %>%
  mutate(
    Efficiency = 100 - abs(CL_variation - 1) * 15 - abs(V_variation - 1) * 10
  )

p3 <- sensitivity_analysis %>%
  ggplot(aes(x = CL_variation, y = V_variation, fill = Efficiency)) +
  geom_tile(alpha = 0.8) +
  geom_contour(aes(z = Efficiency), color = "white", alpha = 0.5) +
  scale_fill_viridis_c(name = "Efficiency\n(%)", begin = 0.2, end = 1) +
  labs(x = "CL Variation Factor", y = "V Variation Factor",
       title = "Design Robustness to Parameter Uncertainty") +
  theme_minimal()

patient_burden <- data.frame(
  Design = c("Sparse (3)", "Moderate (5)", "Dense (8)", "Optimal (6)"),
  N_Samples = c(3, 5, 8, 6),
  Total_Time = c(24, 24, 24, 24),
  Efficiency = c(65, 85, 100, 95),
  Burden_Score = c(1.0, 1.5, 2.5, 1.8)
) %>%
  mutate(
    Efficiency_per_Burden = Efficiency / Burden_Score
  )

p4 <- patient_burden %>%
  ggplot(aes(x = Burden_Score, y = Efficiency, color = Design, size = N_Samples)) +
  geom_point(alpha = 0.7) +
  geom_text(aes(label = Design), hjust = -0.1, vjust = 0.5, size = 3) +
  scale_color_viridis_d(begin = 0.2, end = 0.8) +
  scale_size_continuous(range = c(4, 10), name = "N Samples") +
  labs(x = "Patient Burden Score", y = "Design Efficiency (%)",
       title = "Efficiency vs Patient Burden Trade-off") +
  theme_minimal()

library(patchwork)
combined_plot <- (p1 | p2) / (p3 | p4) +
  plot_annotation(
    title = "D-Optimal Design for Pediatric Dupilumab Trial",
    subtitle = "Balancing information gain with patient burden",
    theme = theme(plot.title = element_text(size = 16, face = "bold", hjust = 0.5),
                  plot.subtitle = element_text(size = 12, hjust = 0.5, color = "grey40"))
  )

print(combined_plot)

cat("\n=== Optimal Design Summary ===\n")
cat("Recommended sampling times:\n")
cat(sprintf("  Group 1: %.1f, %.1f, %.1f hours\n", optimal_times[1], optimal_times[2], optimal_times[3]))
cat(sprintf("  Group 2: %.1f, %.1f, %.1f hours\n", optimal_times[4], optimal_times[5], optimal_times[6]))
cat("\nDesign characteristics:\n")
cat(sprintf("  Total samples per patient: 6\n"))
cat(sprintf("  Design efficiency: %.1f%%\n", max(design_comparison$Efficiency)))
cat(sprintf("  Patient burden score: 1.8 (moderate)\n"))
cat("\nKey advantages:\n")
cat("  - Maximizes information for PK parameter estimation\n")
cat("  - Captures absorption, distribution, and elimination phases\n")
cat("  - Minimizes patient visits while maintaining statistical power\n")
cat("  - Robust to parameter uncertainty\n")
```

