---
layout: post
title: "【Statistics】Maximum Likelihood Estimation (MLE) vs. Maximum A Posteriori (MAP)"
categories: Statistics
description: "Understanding the core differences between MLE, MAP, and Bayesian inference."
keywords: "Maximum likelihood estimation, MAP, Bayesian, Probability vs Statistics"
date: 2022-09-03
---

Maximum Likelihood Estimation (**MLE**) and Maximum A Posteriori (**MAP**) are two common methods for parameter estimation. Because they perform similar tasks, they are often confused.

The following section explains the intuition and mathematical differences between MLE and MAP. To understand them, we must first clarify the relationship between Probability and Statistics.

---

## 1. Probability vs. Statistics: The Cookie Jar Analogy

Probability and statistics may seem like identical concepts, but they actually ask opposite questions.

### The Probability Question
**"Given the Model, predict the Data."**

Imagine you have a **Cookie Jar (The Model)**. You know exactly what is inside: 90 chocolate chip cookies and 10 oatmeal raisin cookies (The Parameters). You reach in and grab a handful of cookies.
* *Probability asks:* "What is the probability that I will pull out 3 chocolate chip cookies and 1 oatmeal raisin?"

### The Statistics Question
**"Given the Data, predict the Model."**

Now, imagine you are blindfolded. You are presented with a jar, but you don't know what is inside. You reach in and pull out a handful of cookies: 3 chocolate chip and 1 oatmeal raisin (**The Data**).
* *Statistics asks:* "Based on these cookies in my hand, what is the likely ratio of cookies inside the jar?"

**In a nutshell:**
* **Probability:** Model $\rightarrow$ Data (Deduction)
* **Statistics:** Data $\rightarrow$ Model (Induction)

Both MLE and MAP are **Statistical** problems. We have data, and we are trying to infer the parameters of the model.

---

## 2. Bayes' Theorem: Updating Beliefs

To understand MAP, you must understand Bayes' Theorem. It is a rule for updating your beliefs after seeing evidence.

$$
P(A | B) = \frac{P(B | A) \times P(A)}{P(B)}
$$

Let's break down the terminology:

* **$P(A | B)$ (Posterior):** "What is the probability of $A$ after I see evidence $B$?"
* **$P(B | A)$ (Likelihood):** "If $A$ were true, what is the probability I would see evidence $B$?"
* **$P(A)$ (Prior):** "What did I believe about $A$ before I saw any evidence?"
* **$P(B)$ (Evidence):** The total probability of seeing the evidence.

### The Car Alarm Analogy

Let $A$ be **"Car Stolen"** and $B$ be **"Alarm Ringing"**.  
We want to know $P(\text{Stolen} | \text{Alarm})$.

1. **Likelihood ($P(\text{Alarm} | \text{Stolen})$):** If your car is being stolen, the alarm will almost certainly ring (high probability).

2. **Prior ($P(\text{Stolen})$):** How likely is it that a car is stolen on any random day? Very low.

3. **Posterior ($P(\text{Stolen} | \text{Alarm})$):** Even though the alarm is ringing, the probability your car is actually being stolen is still relatively low, because the **Prior** (the general rarity of theft) weighs the probability down. It is more likely a false alarm.

---

## 3. The Likelihood Function

The expression $P(x \mid \theta)$ involves Data ($x$) and Parameters ($\theta$). It can be interpreted in two ways:

1. **Probability Function (fixed $\theta$, variable $x$):** If the coin is fair ($\theta=0.5$), what is the probability of getting Heads ($x$)?

2. **Likelihood Function (fixed $x$, variable $\theta$):** If I observed Heads ($x$), what is the likelihood that the coin parameter was $\theta$?

In statistics, we use the second definition. We define the Likelihood Function as:

$$
L(\theta) = P(x \mid \theta)
$$

---

## 4. Maximum Likelihood Estimation (MLE)

**The Goal:** Find the parameter $\theta$ that makes the observed data **most likely**.
**The Philosophy:** "Let the data speak for itself. Ignore prior beliefs."

$$
\theta_{MLE} = \operatorname*{argmax}_\theta P(x \mid \theta)
$$

### Example: The Coin Toss

You flip a coin 10 times.

* **Data ($x$):** 7 Heads, 3 Tails.
* **Parameter ($\theta$):** Probability of Heads (Unknown).

We want to maximize the likelihood:

$$P(x \mid \theta) = \theta^7 (1-\theta)^3$$

* If we guess $\theta = 0.5$: $0.5^7 \times 0.5^3 \approx 0.0009$
* If we guess $\theta = 0.7$: $0.7^7 \times 0.3^3 \approx 0.0022$

The likelihood function peaks at $\theta = 0.7$. Therefore, the MLE estimate is $\hat{\theta}_{MLE} = 0.7$.

---

## 5. Maximum A Posteriori (MAP)

**The Goal:** Find the parameter $\theta$ that is most probable given the data **AND** our prior knowledge.
**The Philosophy:** "The data is important, but extraordinary claims require extraordinary evidence."

MAP uses Bayes' Theorem. We want to maximize the **Posterior**:

$$
P(\theta | x) = \frac{P(x | \theta) \times P(\theta)}{P(x)}
$$

Since $P(x)$ is constant with respect to $\theta$, we can ignore it when maximizing. Therefore, MAP maximizes:

$$
\theta_{MAP} = \operatorname*{argmax}_\theta P(\theta \mid x) = \operatorname*{argmax}_\theta [P(x \mid \theta) \times P(\theta)]
$$

In words: MAP maximizes **Likelihood $\times$ Prior**.

### Example: The "Fair" Coin
* **Data ($x$):** 7 Heads, 3 Tails.
* **Prior ($P(\theta)$):** You know from experience that most coins are fair. You represent this belief with a **Beta** prior centred at $\theta=0.5$ -- for example $\text{Beta}(\alpha,\beta)$ with $\alpha=\beta$. A Beta is the natural choice because $\theta$ is a probability confined to $[0,1]$, and because it is conjugate to the binomial likelihood, so the posterior is Beta too. A Gaussian prior is *not* interchangeable: it puts probability mass below 0 and above 1, where no coin can live.

Now we maximize:
$$
(\theta^7 (1-\theta)^3) \times P(\theta)
$$

where $P(\theta)$ is a prior distribution centered at 0.5.

* The **Likelihood** pulls the estimate toward **0.7**.
* The **Prior** pulls the estimate toward **0.5**.
* The **MAP Result** is a compromise between the two, perhaps around **0.65**, depending on the strength of the prior.

### When Data Overcomes Prior Belief
What happens if you flip the coin 1,000 times and get 700 heads?

The likelihood term $\theta^{700}(1-\theta)^{300}$ becomes highly concentrated around $\theta = 0.7$. With sufficient data, the likelihood dominates the prior, and the posterior distribution becomes dominated by the data.
* **Small Sample Size:** Prior has substantial influence (MAP $\neq$ MLE).
* **Large Sample Size:** Prior influence diminishes (MAP $\approx$ MLE).

---

## Summary

| Feature | Maximum Likelihood (MLE) | Maximum A Posteriori (MAP) |
|---------|--------------------------|-----------------------------|
| **Formula** | $\theta_{MLE} = \operatorname*{argmax}_\theta P(x \mid \theta)$ | $\theta_{MAP} = \operatorname*{argmax}_\theta P(x \mid \theta) \times P(\theta)$ |
| **Philosophy** | Only the data matters. | Data + Prior Knowledge matters. |
| **Prior** | Does not incorporate prior information (equivalent to a uniform prior). | Explicitly incorporates a prior distribution, chosen to match the parameter's support (Beta for a probability, Gaussian for an unbounded parameter). |
| **Best Used When** | You have large sample sizes or no prior knowledge. | You have small sample sizes or strong domain knowledge. |
