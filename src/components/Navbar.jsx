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
      const scrollPos = window.scrollY + 120;

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

    if (link.id === 'home') {
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

    const target = document.getElementById(link.id);
    if (target) {
      const headerOffset = 76;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
      className={`navbar-wrapper cinematic-navbar-wrapper ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <div className="container navbar-container">
        {/* Brand / Logo: VISWANATHAN • matching reference style */}
        <a
          href="#home"
          onClick={handleBrandClick}
          className="cinematic-brand-logo"
          aria-label="Back to home top"
        >
          <span className="brand-primary-name">VISWANATHAN</span>
          <span className="brand-red-dot">&bull;</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="cinematic-nav-list">
            {navLinks.map((link) => {
              const isActive =
                currentPage === 'resume'
                  ? link.id === 'resume'
                  : activeSection === link.id;

              return (
                <li key={link.id} className="cinematic-nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`cinematic-nav-link ${isActive ? 'active' : ''} ${link.id === 'resume' ? 'resume-link' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="cinematic-nav-active-bar" aria-hidden="true" />}
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
            className="btn btn-cinematic-nav-cta"
            aria-label="Download Official Resume PDF"
            title="Download Official Resume PDF"
          >
            <Download size={13} />
            <span>Download CV</span>
          </a>

          <button
            className="mobile-toggle cinematic-mobile-toggle"
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
        <div className="cinematic-mobile-drawer">
          <ul className="cinematic-mobile-nav-list">
            {navLinks.map((link) => {
              const isActive =
                currentPage === 'resume'
                  ? link.id === 'resume'
                  : activeSection === link.id;

              return (
                <li key={link.id} className="cinematic-mobile-nav-item">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`cinematic-mobile-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <div className="nav-label-group">
                      {isActive && <span className="mobile-red-dot" />}
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight size={16} className="mobile-chevron" />
                  </a>
                </li>
              );
            })}
            <li className="cinematic-mobile-nav-item mobile-cta-slot">
              <a
                href={personalInfo.resumePdfUrl}
                download={resumeData.fileName}
                className="btn btn-cinematic-red"
                style={{ width: '100%', justifyContent: 'center' }}
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
