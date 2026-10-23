import { useEffect } from 'react';

/**
 * Modern IntersectionObserver hook that gently reveals sections, headings,
 * and cards as they enter the viewport.
 * - Staggered fade and gentle slide upward
 * - Disconnects after reveal to maintain high compositor performance
 * - Strictly respects prefers-reduced-motion
 */
export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Selector targeting headings, cards, project cards, and explicit reveal targets
    const targetSelectors = [
      '.section-header',
      '.project-card',
      '.skill-card-resume',
      '.timeline-card',
      '.cert-card',
      '.achievement-card',
      '.contact-channel-card',
      '.contact-overview-card',
      '.pdf-viewer-card',
      '.about-card-main',
      '.reveal-on-scroll'
    ].join(', ');

    const elements = document.querySelectorAll(targetSelectors);

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Attach initial reveal class if not present
    elements.forEach((el) => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
    });

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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, dependencies);
}
