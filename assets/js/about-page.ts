// Enhanced TypeScript for About Page - Interactive Features

interface SkillCategory {
  name: string;
  skills: string[];
  icon?: string;
}

interface TimelineEvent {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: "education" | "experience" | "achievement";
}

class AboutPageEnhancer {
  private skillCategories: NodeListOf<Element>;
  private timelineItems: NodeListOf<Element>;
  private contactSection: HTMLElement | null;
  private sections: NodeListOf<Element>;

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
    try {
      // Only run on about page
      const aboutSection = document.querySelector(".about-section");
      if (!aboutSection) {
        console.log("AboutPageEnhancer: .about-section not found, skipping");
        return;
      }
      console.log("AboutPageEnhancer: Initializing...");

      // Verify CSS is loaded
      if (aboutSection) {
        const styles = window.getComputedStyle(aboutSection);
        console.log("AboutPageEnhancer: CSS loaded - padding:", styles.padding);
      }

      this.skillCategories = document.querySelectorAll(
        ".skill-item, .markdown-body h3",
      );
      this.timelineItems = document.querySelectorAll(
        ".timeline-item, .markdown-body h3 + p",
      );
      this.contactSection = document.querySelector(
        ".contact-info, .markdown-body h2:last-of-type",
      );
      this.sections = document.querySelectorAll(
        ".about-section .markdown-body > h2",
      );

      console.log("AboutPageEnhancer: Found", this.sections.length, "sections");

      this.setupSkillTagsAnimation();
      this.setupTimelineAnimation();
      this.setupSectionReveal();
      this.setupContactFormats();
      this.setupProgressBars();
      this.setupInteractiveCards();
      this.setupSmoothScrollToSection();
      this.setupParallaxEffects();

      console.log("AboutPageEnhancer: Initialization complete");
    } catch (error) {
      console.error("AboutPageEnhancer: Error during setup", error);
    }
  }

  // Animate skill tags with staggered effect
  private setupSkillTagsAnimation(): void {
    const skillLists = document.querySelectorAll(
      ".markdown-body ul li, .skill-item li",
    );

    skillLists.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateX(-20px)";
      element.style.transition = `all 0.4s ease ${index * 0.05}s`;

      // Use Intersection Observer for scroll-triggered animation
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.style.opacity = "1";
              element.style.transform = "translateX(0)";
              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(element);
    });
  }

  // Animate timeline items sequentially
  private setupTimelineAnimation(): void {
    const timelineItems = document.querySelectorAll(
      ".timeline-item, .markdown-body h3",
    );

    timelineItems.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = `all 0.5s ease ${index * 0.1}s`;

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
        { threshold: 0.2 },
      );

      observer.observe(element);
    });
  }

  // Reveal sections with fade-in effect
  private setupSectionReveal(): void {
    if (!this.sections || this.sections.length === 0) return;

    this.sections.forEach((section) => {
      try {
        const element = section as HTMLElement;
        if (!element) return;

        const sectionContent = this.getNextSiblingUntil(
          element,
          "h2",
        ) as HTMLElement;

        // Check if sectionContent exists before accessing style
        if (sectionContent && sectionContent.style) {
          sectionContent.style.opacity = "0";
          sectionContent.style.transform = "translateY(20px)";
          sectionContent.style.transition = "all 0.6s ease";

          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  sectionContent.style.opacity = "1";
                  sectionContent.style.transform = "translateY(0)";
                  observer.unobserve(sectionContent);
                }
              });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
          );

          observer.observe(element);
        }
      } catch (error) {
        console.warn("AboutPageEnhancer: Error in setupSectionReveal", error);
      }
    });
  }

  // Helper to get all siblings until a specific selector
  private getNextSiblingUntil(
    element: Element,
    selector: string,
  ): Element | null {
    if (!element || !element.nextElementSibling) return null;

    let next: Element | null = element.nextElementSibling;
    const siblings: Element[] = [];

    while (next) {
      if (next.matches && next.matches(selector)) break;
      siblings.push(next);
      if (!next.nextElementSibling) break;
      next = next.nextElementSibling;
    }

    return siblings.length > 0 ? siblings[0] : null;
  }

  // Format contact information with click-to-copy functionality
  private setupContactFormats(): void {
    const contactLinks = document.querySelectorAll(
      '.about-section a[href^="mailto:"], .about-section a[href^="tel:"]',
    );

    contactLinks.forEach((link) => {
      const element = link as HTMLElement;
      element.style.cursor = "pointer";
      element.title = "Click to copy";

      link.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          const text = href.replace(/^(mailto:|tel:)/, "");
          this.copyToClipboard(text);
          this.showCopyFeedback(element);
        }
      });
    });
  }

  // Copy text to clipboard
  private copyToClipboard(text: string): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        console.log("Copied to clipboard:", text);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback copy failed", err);
      }
      document.body.removeChild(textArea);
    }
  }

  // Show visual feedback when copying
  private showCopyFeedback(element: HTMLElement): void {
    if (!element) return;

    const originalText = element.textContent || "";
    element.textContent = "Copied!";
    element.style.color = "#764ba2";

    setTimeout(() => {
      if (element) {
        element.textContent = originalText;
        element.style.color = "";
      }
    }, 2000);
  }

  // Add progress bars for skills (if needed)
  private setupProgressBars(): void {
    // This can be extended to show skill proficiency levels
    const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseenter", () => {
        element.style.transform = "scale(1.02)";
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "scale(1)";
      });
    });
  }

  // Enhanced interactive cards
  private setupInteractiveCards(): void {
    const cards = document.querySelectorAll(".skill-item, .contact-info");

    cards.forEach((card) => {
      const element = card as HTMLElement;

      // Fix: Explicitly type 'e' as MouseEvent to access clientX/Y
      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
      });
    });
  }

  // Smooth scroll to sections
  private setupSmoothScrollToSection(): void {
    const sectionLinks = document.querySelectorAll('a[href^="#"]');

    sectionLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href !== "#") {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = (target as HTMLElement).offsetTop - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }

  // Subtle parallax effects for background elements
  private setupParallaxEffects(): void {
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        // Apply parallax to background gradients
        const section = document.querySelector(".about-section") as HTMLElement;
        if (section) {
          // Fix: backgroundPositionY is not standard in strictly typed CSSStyleDeclaration.
          // We use 'backgroundPosition' instead or a type cast if specific Y control is needed.
          section.style.backgroundPosition = `center ${rate}px`;
        }
      },
      { passive: true },
    );
  }

  // Add typing effect for name/title (optional)
  public addTypingEffect(
    element: HTMLElement,
    text: string,
    speed: number = 100,
  ): void {
    let i = 0;
    element.textContent = "";

    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }

  // Add counter animation for numbers
  public animateCounter(
    element: HTMLElement,
    target: number,
    duration: number = 2000,
  ): void {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toString();
      }
    };

    updateCounter();
  }
}

// Initialize when DOM is ready
try {
  if (document.querySelector(".about-section")) {
    new AboutPageEnhancer();
  }
} catch (error) {
  console.error("AboutPageEnhancer: Failed to initialize", error);
}
