import React, { useState, useEffect } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import { Menu, X, Download, Terminal, ChevronRight, FileText, Sparkles } from './Icons';

export default function Navbar({ activeSlideId = 'home', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickedLink, setClickedLink] = useState(null);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' },
    { label: 'Resume', href: '#resume', id: 'resume' },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setClickedLink(link.id);
    setTimeout(() => setClickedLink(null), 400);

    if (onNavigate) {
      onNavigate(link.id);
    } else {
      window.location.hash = `#${link.id}`;
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.hash = '#home';
    }
  };

  const isScrolled = true;

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        {/* Brand / Logo with subtle futuristic hover glow */}
        <a
          href="#home"
          onClick={handleBrandClick}
          className="brand-logo"
          aria-label="Back to home top"
        >
          <div className="brand-icon brand-icon-glow">
            <Terminal size={18} className="brand-terminal-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">{personalInfo.name}</span>
            <span className="brand-badge">Data Analyst &bull; AI &amp; Data Science</span>
          </div>
        </a>

        {/* Desktop Futuristic Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list futuristic-nav-capsule">
            {navLinks.map((link) => {
              const isActive = activeSlideId === link.id;
              const isJustClicked = clickedLink === link.id;

              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''} ${link.id === 'resume' ? 'nav-link-resume' : ''} ${isJustClicked ? 'nav-link-pulse' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.id === 'resume' && <FileText size={14} className="nav-resume-icon" />}
                    <span>{link.label}</span>

                    {/* Glowing neon indicator for selected item */}
                    {isActive && (
                      <span className="nav-neon-active-indicator" aria-hidden="true">
                        <span className="nav-neon-core" />
                        <span className="nav-neon-blur" />
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="navbar-actions">
          <a
            href={personalInfo.resumePdfUrl}
            download={resumeData.fileName}
            className="btn btn-sm btn-secondary resume-nav-btn glow-hover-btn"
            aria-label="Download Official Resume PDF"
            title="Download Official Resume PDF"
          >
            <Download size={14} />
            <span>Download CV</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            type="button"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer glass-card mobile-futuristic-drawer">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive = activeSlideId === link.id;

              return (
                <li key={link.id} className="mobile-nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                  >
                    <div className="mobile-nav-label-wrap">
                      {link.id === 'resume' ? (
                        <FileText size={16} className="text-violet" />
                      ) : (
                        isActive && <span className="mobile-active-neon-pip" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight size={16} />
                  </a>
                </li>
              );
            })}
            <li className="mobile-nav-item mobile-cta-item">
              <a
                href={personalInfo.resumePdfUrl}
                download={resumeData.fileName}
                className="btn btn-primary glow-hover-btn"
                style={{ width: '100%' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={16} />
                <span>Download Resume PDF</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}