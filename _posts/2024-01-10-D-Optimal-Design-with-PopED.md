---
layout: post
title: "【PopED】D-Optimal Design Optimization for Pediatric Clinical Trials"
categories: Pharmacometrics
description: "Using PopED to determine optimal sampling timepoints that maximize information gain while minimizing patient burden"
keywords: "PopED, Optimal Design, Clinical Trial Design, Sampling Times, D-optimal"
date: 2024-01-10
---

## Why optimise a design at all

In paediatrics the binding constraint is rarely the model. It is blood volume.
A neonate cannot give twelve samples, and a parent will not consent to a study
that asks for them. So the design question is not "how many samples would be
ideal" but "given that we may take four, which four".

That is an optimisation problem with a well-defined objective. The Fisher
information matrix describes how much the data will tell you about the
parameters; a **D-optimal** design maximises its determinant, which is
equivalent to minimising the volume of the joint confidence region around the
parameter estimates. PopED evaluates that criterion for a population model and
searches over sampling times, doses and group sizes.

The important caveat up front: **the optimal design depends on the model and
the parameter values you assume**. You are optimising for the model you think
you have. If the prior estimates are badly wrong, the design is optimal for the
wrong thing, which is why the robustness of a design to parameter
misspecification matters as much as its nominal efficiency.

## Setting up the model

A one-compartment oral model with first-order absorption, dosed to steady
state. Clearance and volume carry between-subject variability; absorption does
not, which is a common simplification when absorption is poorly identified
from sparse data.

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
```

The residual error is combined proportional and additive. That choice matters
more than it looks: with a purely proportional error the optimiser will happily
place samples in the terminal tail where concentrations are near zero, because
the *relative* error there is unchanged. The additive component is what stops
it doing that.

## Defining the design space

```r
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
  # Both groups share one sampling schedule: the six indices repeat across
  # groups. Numbering them 1,1,1,1,1,1,2,2,2,2,2,2 instead would constrain all
  # six times *within* a group to be equal, collapsing the design to a single
  # timepoint per group.
  G_xt = matrix(rep(1:6, 2), nrow = 2, byrow = TRUE),
  ourzero = 0
)
```

`discrete_xt` restricts sampling to the half hour. This is worth doing: an
optimiser left on a continuous scale will return times like 3.47 h, which no
ward will hit, and a design that is optimal only if executed perfectly is not
optimal in practice.

## Running the optimisation

```r
output <- poped_optim(poped.db, opt_xt = TRUE, opt_a = FALSE,
                      method = c("ARS", "BFGS"),
                      control = list(iter_max = 50))

plot_model_prediction(poped.db, model_num_points = 500)
```

`ARS` (adaptive random search) explores globally and `BFGS` refines locally;
running them in sequence is the usual pattern, because the D-criterion surface
has local optima and a gradient method alone will sit in whichever one it
started nearest. Doses are held fixed here (`opt_a = FALSE`) since the dose was
set by the clinical protocol, not by us.

## Comparing candidate designs

The number that matters to a protocol team is not the D-criterion, which is on
an uninterpretable scale, but **efficiency relative to a reference design** —
how much information a cheaper design retains.

```r
compare_designs <- function(poped.db, n_samples = c(3, 4, 5, 6)) {
  results <- data.frame()

  candidate_times <- list(
    "Sparse"   = c(0.5, 6, 24),
    "Moderate" = c(0.5, 2, 6, 12, 24),
    "Dense"    = c(0.5, 1, 2, 4, 6, 12, 18, 24),
    "Optimal"  = as.numeric(output$xt[1, ])
  )

  reference_ofv <- PopED::evaluate_design(poped.db)$ofv

  for (design_name in names(candidate_times)) {
    times <- candidate_times[[design_name]]
    if (!length(times) %in% n_samples) next

    poped.db.tmp <- poped.db
    poped.db.tmp$xt <- matrix(rep(times, 2), nrow = 2, byrow = TRUE)

    # PopED::evaluate_design, not this function -- naming the wrapper
    # evaluate_design() shadows it and makes the call infinitely recursive.
    ofv <- PopED::evaluate_design(poped.db.tmp)$ofv

    results <- rbind(results, data.frame(
      N_Samples = length(times),
      Design    = design_name,
      OFV       = ofv,
      # D-efficiency relative to the reference, normalised by the number of
      # parameters. Comparing raw determinants across designs is meaningless.
      Efficiency = 100 * (ofv / reference_ofv)^(1 / length(poped.db$parameters$bpop))
    ))
  }

  results
}

design_comparison <- compare_designs(poped.db)

p1 <- design_comparison %>%
  ggplot(aes(x = factor(N_Samples), y = Efficiency, fill = Design)) +
  geom_bar(stat = "identity", position = "dodge", alpha = 0.8) +
  geom_hline(yintercept = 100, linetype = "dashed", color = "red") +
  annotate("text", x = 2, y = 105, label = "Reference design",
           color = "red", size = 3) +
  scale_fill_viridis_d(begin = 0.2, end = 0.8) +
  labs(x = "Number of Samples", y = "D-efficiency (%)",
       title = "Design efficiency by number of samples") +
  theme_minimal()

print(p1)

cat("\n=== Optimised sampling schedule ===\n")
cat(sprintf("Times (h): %s\n", paste(round(as.numeric(output$xt[1, ]), 1), collapse = ", ")))
cat(sprintf("Samples per patient: %d\n", length(output$xt[1, ])))
cat("\nEfficiency of candidate designs, relative to the reference:\n")
print(design_comparison[, c("Design", "N_Samples", "Efficiency")], row.names = FALSE)
```

## Reading the result

The useful output is the shape of the efficiency curve, not any single number.
Typically it is steep at the low end and flat at the top: going from three
samples to five buys a great deal, and going from six to eight buys very
little. That flat region is the argument to take to a protocol team, because it
says the extra draws cost patient tolerance and purchase almost no precision.

Two caveats worth stating whenever these results are presented:

- **The design is conditional on the assumed parameters.** Before committing,
  re-evaluate the chosen design across a plausible range of CL and V. If its
  efficiency falls away sharply, the design is fragile and a more robust
  criterion (ED-optimality, which averages over a prior on the parameters) is
  the better choice.
- **D-optimality optimises parameter precision, not the quantity you care
  about.** If the decision rests on a predicted exposure or a probability of
  target attainment, the relevant criterion is the precision of *that*, which
  is not the same design.

## What this does not cover

Cost functions over sampling windows, ED-optimal designs under parameter
uncertainty, and designs optimised for model discrimination rather than
parameter precision. PopED supports all three; none are shown here.
