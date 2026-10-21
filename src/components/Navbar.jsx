import React, { useState, useEffect } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import { Menu, X, Download, Terminal, ChevronRight, FileText } from './Icons';

export default function Navbar({ currentPage = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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

  useEffect(() => {
    if (currentPage === 'resume') {
      setActiveSection('resume');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionLinks = navLinks.filter((l) => l.id !== 'resume');
      const sections = sectionLinks.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sectionLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (link.id === 'resume') {
      if (onNavigate) {
        onNavigate('resume');
      } else {
        window.location.hash = '#resume';
      }
      return;
    }

    if (currentPage === 'resume') {
      if (onNavigate) {
        onNavigate('home', link.id);
      } else {
        window.location.hash = `#${link.id}`;
      }
      return;
    }

    // Currently on home page
    const target = document.getElementById(link.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${link.id}`);
      setActiveSection(link.id);
    } else {
      window.location.hash = `#${link.id}`;
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentPage === 'resume') {
      if (onNavigate) {
        onNavigate('home', 'home');
      } else {
        window.location.hash = '#home';
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
      setActiveSection('home');
    }
  };

  return (
    <header
      className={`navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={handleBrandClick}
          className="brand-logo"
          aria-label="Back to home top"
        >
          <div className="brand-icon">
            <Terminal size={18} className="brand-terminal-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">{personalInfo.name}</span>
            <span className="brand-badge">Data Analyst &bull; AI &amp; Data Science</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive =
                currentPage === 'resume'
                  ? link.id === 'resume'
                  : activeSection === link.id;

              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''} ${link.id === 'resume' ? 'nav-link-resume' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.id === 'resume' && <FileText size={14} className="nav-resume-icon" />}
                    <span>{link.label}</span>
                    {isActive && <span className="active-dot" />}
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
            className="btn btn-sm btn-secondary resume-nav-btn"
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
        <div className="mobile-menu-drawer glass-card">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => {
              const isActive =
                currentPage === 'resume'
                  ? link.id === 'resume'
                  : activeSection === link.id;

              return (
                <li key={link.id} className="mobile-nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                  >
                    <div className="mobile-nav-label-wrap">
                      {link.id === 'resume' && <FileText size={16} className="text-violet" />}
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
                className="btn btn-primary"
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
