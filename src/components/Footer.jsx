import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUpRight } from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === 'resume') {
      if (onNavigate) {
        onNavigate('resume');
      } else {
        window.location.hash = '#resume';
      }
    } else {
      if (onNavigate) {
        onNavigate('home', sectionId);
      } else {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.location.hash = '#home';
        } else {
          const el = document.getElementById(sectionId);
          if (el) {
            const headerOffset = 76;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          } else {
            window.location.hash = `#${sectionId}`;
          }
        }
      }
    }
  };

  return (
    <footer className="footer-wrapper cinematic-footer" role="contentinfo">
      <div className="container footer-container">
        {/* Top Footer Row */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="cinematic-brand-logo"
            >
              <span className="brand-primary-name">VISWANATHAN</span>
              <span className="brand-red-dot">&bull;</span>
            </a>
            <p className="footer-tagline-cinematic">
              DATA ANALYST &bull; AI DEVELOPER &bull; COIMBATORE, INDIA
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title-cinematic">Navigation</h4>
            <ul className="footer-links-list-cinematic">
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
              <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
              <li><a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>Experience</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
              <li><a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')}>Certifications</a></li>
              <li><a href="#achievements" onClick={(e) => handleNavClick(e, 'achievements')}>Achievements</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
              <li><a href="#resume" onClick={(e) => handleNavClick(e, 'resume')}>Resume</a></li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title-cinematic">Channels</h4>
            <div className="footer-social-links-cinematic">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cinematic-social-chip"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cinematic-social-chip"
                aria-label="GitHub profile"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="footer-bottom-row cinematic-footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} VISWANATHAN M. All rights reserved. Crafted with precision for Data &amp; AI.
          </p>
          <button
            onClick={scrollToTop}
            className="footer-back-to-top-btn"
            type="button"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <span className="arrow-up">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
