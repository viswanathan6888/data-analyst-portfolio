import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Terminal, ArrowUpRight, Mail, Phone, FileText } from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasConfiguredGithub =
    Boolean(personalInfo.github) &&
    personalInfo.github.trim() !== '' &&
    !personalInfo.github.includes('your-github-username');

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
    <footer className="footer-wrapper" role="contentinfo">
      <div className="container footer-container">
        {/* Top Footer Row */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="brand-logo"
              style={{ textDecoration: 'none' }}
            >
              <div className="brand-icon">
                <Terminal size={18} />
              </div>
              <span className="brand-name">{personalInfo.name}</span>
            </a>
            <p className="footer-tagline">
              {personalInfo.title}. {personalInfo.objective}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About Me</a></li>
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
            <h4 className="footer-links-title">Verified Channels</h4>
            <div className="footer-social-links">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary footer-social-btn"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="btn btn-sm btn-secondary footer-social-btn"
                aria-label="Email link"
              >
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="btn btn-sm btn-secondary footer-social-btn"
                aria-label="Phone call"
              >
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </a>

              {hasConfiguredGithub && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary footer-social-btn"
                  aria-label="GitHub profile"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Footer Row */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; {currentYear} {personalInfo.name}. Grounded in verified academic and technical credentials.
          </p>

          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Scroll back to top"
            type="button"
          >
            <span>Back to Top</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}