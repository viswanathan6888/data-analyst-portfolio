import React, { useState, useEffect } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Download,
  ArrowRight,
  Database,
  Mail,
  GraduationCap,
  Award,
  Briefcase,
  ExternalLink,
  ChevronDown,
  Layers,
  Bot
} from './Icons';
import { LinkedinIcon, GithubIcon } from './Icons';
import { ProfessionalProfileFrame } from './AbstractDecorations';

export default function Hero({ onOpenResume }) {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const x = ((e.clientX / innerWidth) - 0.5) * 10;
          const y = ((e.clientY / innerHeight) - 0.5) * 10;
          setParallaxOffset({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const heroHighlightItems = [
    {
      num: '01',
      icon: <GraduationCap size={18} className="text-red" />,
      title: 'B.Tech AI & Data Science',
      desc: 'Kathir College of Engineering • 8.5 CGPA'
    },
    {
      num: '02',
      icon: <Briefcase size={18} className="text-red" />,
      title: '5 Professional Internships',
      desc: 'Analytics, Machine Learning & Business Intelligence'
    },
    {
      num: '03',
      icon: <Database size={18} className="text-red" />,
      title: '10 Production Projects',
      desc: 'Predictive ML, Deep Learning & Interactive Dashboards'
    },
    {
      num: '04',
      icon: <Award size={18} className="text-red" />,
      title: '4 Verified Certifications',
      desc: 'Python, Machine Learning, Power BI & Data Analysis'
    }
  ];

  return (
    <section id="home" className="hero-section cinematic-hero-section" aria-label="Hero Section">
      {/* Giant Typography Layer Behind Portrait (Inspired by Reference Video) */}
      <div className="hero-giant-watermark-track" aria-hidden="true">
        <span className="hero-giant-watermark-text">VISWANATHAN M.</span>
      </div>

      <div className="container hero-container-cinematic">
        <div className="hero-editorial-grid">
          {/* Left Column: Editorial Information & CTAs */}
          <div
            className="hero-left-column"
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.25}px, ${parallaxOffset.y * 0.25}px, 0)`
            }}
          >
            {/* Status Pill with Vibrant Red Dot */}
            <div className="hero-kicker-row">
              <span className="hero-kicker-tag">01 / PORTFOLIO</span>
              <div className="hero-status-pill-cinematic">
                <span className="status-indicator-red" />
                <span className="status-text">{personalInfo.status}</span>
              </div>
            </div>

            {/* Target Roles Headline */}
            <div className="hero-role-headline">
              <span className="hero-role-badge">DATA ANALYST</span>
              <span className="hero-role-divider">|</span>
              <span className="hero-role-badge highlight">AI DEVELOPER</span>
            </div>

            {/* Main Name Heading with Bold Condensed Editorial Typography */}
            <h1 className="hero-main-name">
              VISWANATHAN <span className="text-red-accent">M.</span>
            </h1>

            {/* Professional Introduction */}
            <p className="hero-editorial-intro">
              AI &amp; Data Science professional focused on transforming complex data into 
              actionable business insights and intelligent, production-ready solutions. 
              Specializing in <strong>Data Analytics</strong>, <strong>Business Intelligence</strong>, 
              <strong>Predictive Machine Learning</strong>, and <strong>Interactive Dashboards</strong> with Python, SQL, Power BI, and LLMs.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-cta-group">
              <a
                href={personalInfo.resumePdfUrl}
                download={resumeData.fileName}
                className="btn btn-cinematic-red"
                aria-label="Download Official Resume PDF"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn btn-cinematic-dark"
                aria-label="Explore Projects Section"
              >
                <span>View Projects</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn btn-cinematic-ghost"
                aria-label="Scroll to Contact Section"
              >
                <Mail size={15} />
                <span>Contact</span>
              </button>
            </div>

            {/* Location & Social Row */}
            <div className="hero-meta-footer">
              <span className="hero-location-tag">
                <span className="red-pin">&bull;</span> {personalInfo.location}
              </span>
              <div className="hero-social-links">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-icon-btn"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-icon-btn"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Portrait in front of Giant Backdrop */}
          <div
            className="hero-right-portrait-column"
            style={{
              transform: `translate3d(${-parallaxOffset.x * 0.4}px, ${-parallaxOffset.y * 0.4}px, 0)`
            }}
          >
            <ProfessionalProfileFrame imageSrc={personalInfo.profileImage} />
          </div>
        </div>

        {/* Highlights Carousel (Clean Dark Charcoal Cards with Red Numbering) */}
        <div className="hero-highlights-cinematic-wrap">
          <SectionCarousel
            items={heroHighlightItems}
            itemsPerPage={{ desktop: 4, tablet: 2, mobile: 1 }}
            ariaLabel="Key Highlights Carousel"
            carouselId="hero-highlights-carousel"
            renderItem={(item) => (
              <div className="cinematic-highlight-card" key={item.num}>
                <div className="highlight-card-header">
                  <span className="highlight-num">{item.num}</span>
                  <div className="highlight-icon-box">{item.icon}</div>
                </div>
                <h4 className="highlight-title">{item.title}</h4>
                <p className="highlight-desc">{item.desc}</p>
              </div>
            )}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator" onClick={() => scrollToSection('about')}>
          <span className="scroll-crosshair">+</span>
          <span className="scroll-text">SCROLL TO DISCOVER</span>
          <ChevronDown size={14} className="scroll-chevron text-red" />
          <span className="scroll-crosshair">&times;</span>
        </div>
      </div>
    </section>
  );
}
