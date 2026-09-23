---
layout: categories
title: Notes
description: Working notes on pharmacometrics, modelling and data science, grouped by topic
keywords: notes, pharmacometrics, PK/PD, modelling, data science
comments: false
menu: Notes
permalink: /notes/
---

Working notes on pharmacometrics, PK/PD modelling and data science — written up
as I go, mostly for my own reference. Grouped by topic; the
[archive]({{ site.url }}/archives/) lists everything by date.

<section class="container posts-content">
{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
<h3>{{ category | first }}</h3>
<ol class="posts-list" id="{{ category[0] | slugify }}">
{% for post in category.last %}
<li class="posts-list-item">
<span class="posts-list-meta">{{ post.date | date:"%Y-%m-%d" }}</span>
<a class="posts-list-name" href="{{ site.url }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ol>
{% endfor %}
</section>
<!-- /section.content -->
