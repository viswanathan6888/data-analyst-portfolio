import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Terminal, ArrowUpRight, Mail, Phone } from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasConfiguredGithub =
    Boolean(personalInfo.github) &&
    personalInfo.github.trim() !== '' &&
    !personalInfo.github.includes('your-github-username');

  return (
    <footer className="footer-wrapper" role="contentinfo">
      <div className="container footer-container">
        {/* Top Footer Row */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="brand-icon">
                <Terminal size={18} />
              </div>
              <span className="brand-name">{personalInfo.name}</span>
            </div>
            <p className="footer-tagline">
              {personalInfo.title}. {personalInfo.objective}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#certifications">Certifications</a></li>
              <li><a href="#achievements">Achievements</a></li>
              <li><a href="#contact">Contact</a></li>
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
          >
            <span>Back to Top</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
