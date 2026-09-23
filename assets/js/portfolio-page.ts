// Enhanced TypeScript for Portfolio Page - Interactive Features

interface Project {
  title: string;
  category: string;
  tags: string[];
  date: string;
  description: string;
}

class PortfolioPageEnhancer {
  private projectCards: NodeListOf<Element>;
  private techTags: NodeListOf<Element>;

  constructor() {
    this.init();
  }

  private init(): void {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  private setup(): void {
    // Only run on portfolio page
    if (!document.querySelector(".portfolio-section")) {
      console.log(
        "PortfolioPageEnhancer: .portfolio-section not found, skipping",
      );
      return;
    }
    console.log("PortfolioPageEnhancer: Initializing...");

    this.projectCards = document.querySelectorAll(
      ".project-card, .markdown-body h3",
    );
    this.techTags = document.querySelectorAll(
      ".tech-tag, .markdown-body ul li",
    );

    this.setupProjectCards();
    this.setupTechTags();
    // Removed setupFiltering() - filter buttons not working
    this.setupProjectAnimations();
    this.setupPublicationLinks();
    this.setupAwardAnimations();
    this.setupImageLazyLoading();
    this.setupShareButtons();
  }

  // Enhanced project card interactions
  private setupProjectCards(): void {
    this.projectCards.forEach((card, index) => {
      const element = card as HTMLElement;

      // Staggered entrance animation
      element.style.opacity = "0";
      element.style.transform = "translateY(50px)";
      element.style.transition = `all 0.6s ease ${index * 0.1}s`;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(element);

      // 3D tilt effect on hover
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      });
    });
  }

  // Interactive tech tags with ripple effect
  private setupTechTags(): void {
    this.techTags.forEach((tag) => {
      const element = tag as HTMLElement;

      element.addEventListener("click", (e) => {
        this.createRippleEffect(e, element);
        this.highlightRelatedProjects(element.textContent || "");
      });

      // Pulse animation on hover
      element.addEventListener("mouseenter", () => {
        element.style.animation = "pulse 0.6s ease";
      });
    });
  }

  // Create ripple effect on click
  private createRippleEffect(event: MouseEvent, element: HTMLElement): void {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(102, 126, 234, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  // Highlight projects related to clicked tag
  private highlightRelatedProjects(tagText: string): void {
    this.projectCards.forEach((card) => {
      const element = card as HTMLElement;
      const cardText = element.textContent || "";

      if (cardText.toLowerCase().indexOf(tagText.toLowerCase()) !== -1) {
        element.style.boxShadow = "0 0 30px rgba(102, 126, 234, 0.5)";
        element.style.transform = "scale(1.03)";

        setTimeout(() => {
          element.style.boxShadow = "";
          element.style.transform = "";
        }, 2000);
      }
    });
  }

  // Animate project cards on scroll
  private setupProjectAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            setTimeout(() => {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    this.projectCards.forEach((card) => observer.observe(card));
  }

  // Enhanced publication links with preview
  private setupPublicationLinks(): void {
    const pubLinks = document.querySelectorAll(
      '.publication-item a, .markdown-body a[href*="doi"], .markdown-body a[href*="journal"]',
    );

    pubLinks.forEach((link) => {
      const element = link as HTMLElement;

      element.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("div");
        tooltip.className = "publication-tooltip";
        tooltip.textContent = "Click to view publication";
        tooltip.style.cssText = `
                    position: absolute;
                    background: #667eea;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 0.85em;
                    pointer-events: none;
                    z-index: 1000;
                    transform: translateY(-100%);
                    margin-top: -10px;
                `;

        element.style.position = "relative";
        element.appendChild(tooltip);
      });

      element.addEventListener("mouseleave", () => {
        const tooltip = element.querySelector(".publication-tooltip");
        if (tooltip) tooltip.remove();
      });
    });
  }

  // Animate awards with celebration effect
  private setupAwardAnimations(): void {
    const allListItems = document.querySelectorAll(".markdown-body ul li");
    const awards: Element[] = [];
    allListItems.forEach((li) => {
      if (li.textContent && li.textContent.indexOf("Award") !== -1) {
        awards.push(li);
      }
    });
    const awardListItems = document.querySelectorAll(".awards-list li");
    awardListItems.forEach((li) => awards.push(li));

    awards.forEach((award) => {
      const element = award as HTMLElement;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.celebrateAward(element);
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(element);
    });
  }

  // Celebration animation for awards
  private celebrateAward(element: HTMLElement): void {
    element.style.animation = "celebrate 0.6s ease";

    // Add sparkle effect
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("span");
        sparkle.textContent = "✨";
        sparkle.style.cssText = `
                    position: absolute;
                    font-size: 1.5em;
                    pointer-events: none;
                    animation: sparkle 1s ease forwards;
                `;

        const rect = element.getBoundingClientRect();
        sparkle.style.left = `${Math.random() * rect.width}px`;
        sparkle.style.top = `${Math.random() * rect.height}px`;

        element.style.position = "relative";
        element.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
      }, i * 100);
    }
  }

  // Lazy load images (if any)
  private setupImageLazyLoading(): void {
    const images = document.querySelectorAll(".portfolio-section img");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add("loaded");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Add share buttons for projects
  private setupShareButtons(): void {
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const shareBtn = document.createElement("button");
      shareBtn.className = "share-project-btn";
      shareBtn.innerHTML = "🔗 Share";
      shareBtn.style.cssText = `
                margin-top: 20px;
                padding: 8px 16px;
                background: rgba(102, 126, 234, 0.1);
                border: 2px solid #667eea;
                color: #667eea;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            `;

      shareBtn.addEventListener("click", () => {
        const title = card.querySelector("h3")?.textContent || "";
        this.shareProject(title, window.location.href);
      });

      shareBtn.addEventListener("mouseenter", () => {
        shareBtn.style.background = "#667eea";
        shareBtn.style.color = "white";
      });

      shareBtn.addEventListener("mouseleave", () => {
        shareBtn.style.background = "rgba(102, 126, 234, 0.1)";
        shareBtn.style.color = "#667eea";
      });

      // Only add if not already present
      if (!card.querySelector(".share-project-btn")) {
        card.appendChild(shareBtn);
      }
    });
  }

  // Share project functionality
  private shareProject(title: string, url: string): void {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert("Project link copied to clipboard!");
      });
    }
  }
}

// Add CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05) rotate(2deg); }
    }
    
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is ready
if (document.querySelector(".portfolio-section")) {
  new PortfolioPageEnhancer();
}
