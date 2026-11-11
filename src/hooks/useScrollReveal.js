import { useEffect } from 'react';

/**
 * Cinematic Scroll-Triggered Reveal Hook
 * Primary reference: Dark cinematic portfolio with smooth staggered section
 * and card entrances, clipping mask reveals, and progressive card appearances.
 * - Staggered entrance delays based on element indices
 * - Respects prefers-reduced-motion
 * - Safe fallback timer to guarantee content is NEVER hidden permanently
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Selector targeting headings, cards, project cards, and explicit reveal targets
    const targetSelectors = [
      '.section-header',
      '.cinematic-header',
      '.section-kicker',
      '.cinematic-card',
      '.about-card-main',
      '.highlight-card',
      '.skills-category-card',
      '.experience-card',
      '.company-project-card',
      '.project-card-cinematic',
      '.cert-card-cinematic',
      '.achievement-card-cinematic',
      '.contact-channel-card',
      '.availability-badge-cinematic',
      '.cinematic-section-divider',
      '.reveal-on-scroll'
    ].join(', ');

    const elements = document.querySelectorAll(targetSelectors);

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Attach initial reveal class and stagger delays
    elements.forEach((el, index) => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
      // Calculate stagger delay based on index within its parent or group
      const parent = el.parentElement;
      const siblingIndex = parent ? Array.from(parent.children).indexOf(el) : index;
      const delay = Math.min((siblingIndex % 6) * 0.1, 0.5);
      el.style.setProperty('--stagger-delay', `${delay}s`);
    });

    // IntersectionObserver for viewport entry
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Safe fallback timeout: Ensure all elements are fully revealed after 1.5s
    // so content is never permanently hidden if JS observer is delayed or offscreen
    const safetyTimer = setTimeout(() => {
      elements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          el.classList.add('is-revealed');
        }
      });
    }, 1500);

    return () => {
      clearTimeout(safetyTimer);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, dependencies);
}
