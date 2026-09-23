---
layout: post
title: "【R】Building Interactive R-Shiny Dashboards for Pharmacokinetic Simulation Visualization"
categories: R
description: "Developing interactive dashboards for PK simulation data visualization and clinical decision support"
keywords: "R, R-Shiny, Pharmacokinetics, Dashboard, Visualization, Clinical Decision Support"
date: 2023-06-15
---

## Why build a dashboard at all

A population model that only its author can run is worth very little
clinically. The gap is not analytical, it is one of access: the people who make
dosing decisions cannot install NONMEM, and should not have to. A small
interactive application closes that gap by letting them vary the inputs they
already think in -- weight, renal function, dose, interval -- and see the
consequence immediately.

Two design points are worth stating before the code, because they determine
whether the thing gets used:

- **Expose the inputs clinicians reason with, not the model's parameters.**
  Nobody on a ward wants to set a clearance. They want to set a weight and a
  creatinine clearance and see what happens to the trough.
- **Show uncertainty, not a single line.** A median profile invites the reader
  to believe the prediction is exact. Prediction intervals make the spread
  visible, which is the honest representation of a population model and usually
  the more useful one for a dosing decision.

The app below is structured in the conventional Shiny way: a `ui` object
describing the layout, a `server` function containing the simulation logic, and
a reactive expression so the model re-runs only when an input actually changes.

## The interface

```r
library(shiny)
library(shinydashboard)
library(plotly)
library(DT)
library(dplyr)
library(ggplot2)
library(mrgsolve)

# mrgsolve ships no piperacillin model; modlib() provides generic
# structures (pk1, pk2, irm1-irm4, emax). Swap in your own model file
# with mread("mymodel", project = "models").
mod <- mread("pk2", modlib())

ui <- dashboardPage(
  dashboardHeader(title = "Piperacillin PK Simulation Dashboard"),
  dashboardSidebar(
    sidebarMenu(
      menuItem("Simulation", tabName = "simulation", icon = icon("flask")),
      menuItem("Dose Optimization", tabName = "dosing", icon = icon("pills")),
      menuItem("Target Attainment", tabName = "pta", icon = icon("bullseye")),
      menuItem("Patient Profiles", tabName = "profiles", icon = icon("user-md"))
    ),
    hr(),
    h4("Patient Parameters", style = "padding-left: 15px;"),
    numericInput("weight", "Weight (kg)", value = 20, min = 5, max = 100, step = 0.1),
    numericInput("age", "Age (years)", value = 5, min = 0.1, max = 18, step = 0.1),
    numericInput("crcl", "Creatinine Clearance (mL/min)", value = 80, min = 10, max = 200, step = 1),
    selectInput("dose", "Dose (mg/kg)", choices = c(50, 75, 100, 125, 150), selected = 100),
    selectInput("interval", "Dosing Interval (hours)", choices = c(4, 6, 8, 12), selected = 6),
    numericInput("n_sims", "Number of Simulations", value = 1000, min = 100, max = 10000, step = 100),
    actionButton("run_sim", "Run Simulation", class = "btn-primary", style = "width: 100%;")
  ),
  dashboardBody(
    tags$head(
      tags$style(HTML("
        .content-wrapper { background-color: #f4f4f4; }
        .box { border-radius: 5px; }
        .info-box { border-radius: 5px; }
      "))
    ),
    tabItems(
      tabItem(tabName = "simulation",
        fluidRow(
          infoBox("AUC0-24", textOutput("auc"), icon = icon("chart-area"), color = "blue", width = 4),
          infoBox("Cmax", textOutput("cmax"), icon = icon("arrow-up"), color = "green", width = 4),
          infoBox("Cmin", textOutput("cmin"), icon = icon("arrow-down"), color = "red", width = 4)
        ),
        fluidRow(
          box(
            title = "Concentration-Time Profile", status = "primary", solidHeader = TRUE,
            width = 12, height = 500,
            plotlyOutput("conc_plot", height = "450px")
          )
        ),
        fluidRow(
          box(
            title = "Simulation Summary Statistics", status = "info", solidHeader = TRUE,
            width = 12,
            DT::dataTableOutput("summary_table")
          )
        )
      ),
      tabItem(tabName = "dosing",
        fluidRow(
          box(
            title = "Dose-Exposure Relationship", status = "primary", solidHeader = TRUE,
            width = 6,
            plotlyOutput("dose_response", height = "400px")
          ),
          box(
            title = "Optimal Dosing Recommendations", status = "success", solidHeader = TRUE,
            width = 6,
            h4("Recommended Regimen:", style = "color: #3c763d;"),
            verbatimTextOutput("optimal_dose"),
            hr(),
            h5("Rationale:"),
            textOutput("dose_rationale")
          )
        ),
        fluidRow(
          box(
            title = "Dosing Regimen Comparison", status = "warning", solidHeader = TRUE,
            width = 12,
            plotlyOutput("regimen_comparison", height = "400px")
          )
        )
      ),
      tabItem(tabName = "pta",
        fluidRow(
          box(
            title = "Probability of Target Attainment", status = "primary", solidHeader = TRUE,
            width = 12,
            plotlyOutput("pta_plot", height = "500px")
          )
        ),
        fluidRow(
          box(
            title = "PTA Summary by Dosing Regimen", status = "info", solidHeader = TRUE,
            width = 12,
            DT::dataTableOutput("pta_table")
          )
        )
      ),
      tabItem(tabName = "profiles",
        fluidRow(
          box(
            title = "Virtual Patient Population", status = "primary", solidHeader = TRUE,
            width = 12,
            DT::dataTableOutput("patient_table")
          )
        ),
        fluidRow(
          box(
            title = "Covariate Effects on PK Parameters", status = "success", solidHeader = TRUE,
            width = 6,
            plotlyOutput("covariate_cl", height = "350px")
          ),
          box(
            title = "Covariate Effects on Vd", status = "success", solidHeader = TRUE,
            width = 6,
            plotlyOutput("covariate_vd", height = "350px")
          )
        )
      )
    )
  )
)

server <- function(input, output, session) {
  
  sim_results <- eventReactive(input$run_sim, {
    withProgress(message = "Running simulations...", value = 0, {
      setProgress(0.2, detail = "Preparing patient parameters")
      
      patient_params <- data.frame(
        ID = 1:input$n_sims,
        WT = rnorm(input$n_sims, input$weight, input$weight * 0.2),
        AGE = rnorm(input$n_sims, input$age, input$age * 0.15),
        CRCL = rnorm(input$n_sims, input$crcl, input$crcl * 0.25)
      ) %>%
        mutate(
          WT = pmax(5, pmin(100, WT)),
          AGE = pmax(0.1, pmin(18, AGE)),
          CRCL = pmax(10, pmin(200, CRCL))
        )
      
      setProgress(0.4, detail = "Simulating PK profiles")
      
      dose_mg <- input$dose * patient_params$WT
      
      sim_data <- lapply(1:input$n_sims, function(i) {
        ev <- ev(amt = dose_mg[i], ii = as.numeric(input$interval), addl = 3)
        out <- mod %>%
          param(CL = 2.5 * (patient_params$CRCL[i]/80)^0.75 * (patient_params$WT[i]/20)^0.75,
                V = 15 * (patient_params$WT[i]/20)) %>%
          ev(ev) %>%
          mrgsim(end = 24, delta = 0.5) %>%
          as.data.frame()
        out$ID <- i
        out$WT <- patient_params$WT[i]
        out$CRCL <- patient_params$CRCL[i]
        return(out)
      }) %>%
        bind_rows()
      
      setProgress(0.8, detail = "Calculating PK metrics")
      
      pk_metrics <- sim_data %>%
        group_by(ID) %>%
        summarise(
          AUC = pracma::trapz(time, CP),
          Cmax = max(CP, na.rm = TRUE),
          Cmin = min(CP[time >= 18], na.rm = TRUE),
          Tmax = time[which.max(CP)],
          WT = first(WT),
          CRCL = first(CRCL)
        )
      
      setProgress(1.0, detail = "Complete")
      
      list(sim_data = sim_data, pk_metrics = pk_metrics, patient_params = patient_params)
    })
  })
  
  output$conc_plot <- renderPlotly({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    p <- results$sim_data %>%
      filter(ID <= 10) %>%
      ggplot(aes(x = time, y = CP, group = ID, color = factor(ID))) +
      geom_line(alpha = 0.7) +
      geom_hline(yintercept = 64, linetype = "dashed", color = "red", alpha = 0.7) +
      annotate("text", x = 20, y = 70, label = "Target: 64 mg/L", color = "red") +
      labs(x = "Time (hours)", y = "Concentration (mg/L)",
           title = "Concentration-Time Profiles (Sample of 10 patients)") +
      theme_minimal() +
      theme(legend.position = "none")
    
    ggplotly(p, tooltip = c("time", "CP", "ID"))
  })
  
  output$auc <- renderText({
    results <- sim_results()
    if (is.null(results)) return("--")
    paste0(round(mean(results$pk_metrics$AUC, na.rm = TRUE), 1), " mg·h/L")
  })
  
  output$cmax <- renderText({
    results <- sim_results()
    if (is.null(results)) return("--")
    paste0(round(mean(results$pk_metrics$Cmax, na.rm = TRUE), 1), " mg/L")
  })
  
  output$cmin <- renderText({
    results <- sim_results()
    if (is.null(results)) return("--")
    paste0(round(mean(results$pk_metrics$Cmin, na.rm = TRUE), 1), " mg/L")
  })
  
  output$summary_table <- DT::renderDataTable({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    results$pk_metrics %>%
      summarise(
        Metric = c("AUC (mg·h/L)", "Cmax (mg/L)", "Cmin (mg/L)"),
        Mean = c(mean(AUC), mean(Cmax), mean(Cmin)),
        Median = c(median(AUC), median(Cmax), median(Cmin)),
        `5th Percentile` = c(quantile(AUC, 0.05), quantile(Cmax, 0.05), quantile(Cmin, 0.05)),
        `95th Percentile` = c(quantile(AUC, 0.95), quantile(Cmax, 0.95), quantile(Cmin, 0.95))
      ) %>%
      DT::datatable(options = list(pageLength = 10, dom = 't'), rownames = FALSE) %>%
      DT::formatRound(columns = 2:5, digits = 2)
  })
  
  output$dose_response <- renderPlotly({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    dose_range <- seq(50, 150, by = 25)
    dose_effects <- data.frame(
      Dose = rep(dose_range, each = input$n_sims),
      AUC = NA,
      Cmin = NA
    )
    
    p <- results$pk_metrics %>%
      ggplot(aes(x = WT, y = AUC, color = CRCL)) +
      geom_point(alpha = 0.6) +
      geom_smooth(method = "loess", se = TRUE, color = "blue") +
      scale_color_viridis_c(name = "CrCL\n(mL/min)") +
      labs(x = "Weight (kg)", y = "AUC (mg·h/L)",
           title = "AUC vs Body Weight (colored by Creatinine Clearance)") +
      theme_minimal()
    
    ggplotly(p)
  })
  
  output$optimal_dose <- renderText({
    results <- sim_results()
    if (is.null(results)) return("Run simulation first")
    
    target_pta <- results$pk_metrics %>%
      mutate(PTA = ifelse(Cmin >= 64, 1, 0)) %>%
      summarise(PTA = mean(PTA))
    
    if (target_pta$PTA >= 0.9) {
      paste0(input$dose, " mg/kg every ", input$interval, " hours\n",
             "PTA: ", round(target_pta$PTA * 100, 1), "%")
    } else {
      recommended_dose <- input$dose * 1.25
      paste0("Consider: ", round(recommended_dose, 0), " mg/kg every ", input$interval, " hours\n",
             "Current PTA: ", round(target_pta$PTA * 100, 1), "%")
    }
  })
  
  output$pta_plot <- renderPlotly({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    pta_data <- results$pk_metrics %>%
      mutate(
        PTA_64 = ifelse(Cmin >= 64, 1, 0),
        PTA_32 = ifelse(Cmin >= 32, 1, 0)
      ) %>%
      group_by(WT = cut(WT, breaks = seq(5, 100, by = 10))) %>%
      summarise(
        PTA_64 = mean(PTA_64),
        PTA_32 = mean(PTA_32),
        .groups = 'drop'
      )
    
    p <- pta_data %>%
      pivot_longer(cols = c(PTA_64, PTA_32), names_to = "Target", values_to = "PTA") %>%
      ggplot(aes(x = WT, y = PTA, fill = Target)) +
      geom_bar(stat = "identity", position = "dodge") +
      geom_hline(yintercept = 0.9, linetype = "dashed", color = "red") +
      scale_fill_manual(values = c("PTA_64" = "#667eea", "PTA_32" = "#764ba2"),
                       labels = c("PTA_64" = "≥64 mg/L", "PTA_32" = "≥32 mg/L")) +
      labs(x = "Weight Category (kg)", y = "Probability of Target Attainment",
           title = "PTA by Weight Category") +
      theme_minimal() +
      theme(axis.text.x = element_text(angle = 45, hjust = 1))
    
    ggplotly(p)
  })
  
  output$patient_table <- DT::renderDataTable({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    results$patient_params %>%
      DT::datatable(options = list(pageLength = 15, scrollX = TRUE)) %>%
      DT::formatRound(columns = c("WT", "AGE", "CRCL"), digits = 2)
  })
  
  output$covariate_cl <- renderPlotly({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    p <- results$pk_metrics %>%
      ggplot(aes(x = CRCL, y = AUC, color = WT)) +
      geom_point(alpha = 0.6) +
      geom_smooth(method = "lm", se = TRUE, color = "blue") +
      scale_color_viridis_c(name = "Weight\n(kg)") +
      labs(x = "Creatinine Clearance (mL/min)", y = "AUC (mg·h/L)",
           title = "Effect of Renal Function on Exposure") +
      theme_minimal()
    
    ggplotly(p)
  })
  
  output$covariate_vd <- renderPlotly({
    results <- sim_results()
    if (is.null(results)) return(NULL)
    
    p <- results$pk_metrics %>%
      ggplot(aes(x = WT, y = Cmax, color = CRCL)) +
      geom_point(alpha = 0.6) +
      geom_smooth(method = "loess", se = TRUE, color = "green") +
      scale_color_viridis_c(name = "CrCL\n(mL/min)") +
      labs(x = "Weight (kg)", y = "Cmax (mg/L)",
           title = "Effect of Body Size on Peak Concentration") +
      theme_minimal()
    
    ggplotly(p)
  })
}

shinyApp(ui = ui, server = server)
```

