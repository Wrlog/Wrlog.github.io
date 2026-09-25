"""Figure for the 2026-09-25 piperacillin-tazobactam post. Run from anywhere:

    python _figures/pip_q2h_dose_by_crcl.py
"""
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

# Table 3, Tan et al. 2025 AAC 69(3):e0122724 (Q2H recommendations, mg/kg piperacillin)
crcl = ["20-29", "30-59", "60-89", "90-129", "\u2265130"]
wt = ["10-29 kg", "30-49 kg", "50-69 kg", "\u226570 kg"]
one = {  # 100% fT > 1x MIC (8 mg/L)
    "10-29 kg": [7.5, 9, 9.5, 10.5, 15],
    "30-49 kg": [7, 8.5, 9, 10, 11],
    "50-69 kg": [6.5, 8, 8.5, 9.5, 10.5],
    "\u226570 kg": [6, 7.5, 8, 9, 10],
}
four = {  # 100% fT > 4x MIC (32 mg/L)
    "10-29 kg": [29, 30, 40, 41, 55],
    "30-49 kg": [27, 30, 38, 39, 45],
    "50-69 kg": [25, 30, 36, 37, 43],
    "\u226570 kg": [25, 30, 34, 35, 41],
}
colors = ["#2a78d6", "#eb6834", "#1baf7a", "#4a3aa7"]
markers = ["o", "s", "^", "D"]
surface, ink, ink2, grid = "#fcfcfb", "#0b0b0b", "#52514e", "#e4e3df"

plt.rcParams.update({"font.size": 11, "axes.edgecolor": ink2, "axes.labelcolor": ink,
                     "xtick.color": ink2, "ytick.color": ink2, "text.color": ink})
fig, axes = plt.subplots(1, 2, figsize=(10, 4.6), sharey=True, facecolor=surface)
x = range(len(crcl))
for ax, data, title in [(axes[0], one, "Target: free PIP above 8 mg/L (1\u00d7 MIC)"),
                        (axes[1], four, "Target: free PIP above 32 mg/L (4\u00d7 MIC)")]:
    ax.set_facecolor(surface)
    ax.axhspan(80, 100, color="#c3c2b7", alpha=0.45, lw=0)
    ax.text(len(crcl) - 1, 90, "guideline 80\u2013100 mg/kg", ha="right", va="center",
            color=ink2, fontsize=10)
    for (name, vals), c, m in zip(data.items(), colors, markers):
        ax.plot(x, vals, color=c, lw=2, marker=m, ms=7, mec=surface, mew=1.5, label=name)
    ax.set_xticks(list(x), crcl)
    ax.set_xlabel("CrCL group (mL/min/1.73 m\u00b2)")
    ax.set_title(title, fontsize=11.5, loc="left", color=ink)
    ax.set_ylim(0, 105)
    ax.grid(axis="y", color=grid, lw=0.8)
    ax.set_axisbelow(True)
    for s in ["top", "right"]:
        ax.spines[s].set_visible(False)
axes[0].set_ylabel("Piperacillin dose every 2 h (mg/kg)")
axes[0].legend(title="Body weight", frameon=False, loc="center left", bbox_to_anchor=(0.02, 0.5), fontsize=10, title_fontsize=10)
fig.tight_layout()
out = Path(__file__).resolve().parent.parent / "images/posts/pharmacokinetic/pip-q2h-dose-by-crcl.png"
fig.savefig(out, dpi=150, facecolor=surface)
print("saved", out)
