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
  ExternalLink
} from './Icons';
import { LinkedinIcon } from './Icons';
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
          const x = ((e.clientX / innerWidth) - 0.5) * 12;
          const y = ((e.clientY / innerHeight) - 0.5) * 12;
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
      id: 'degree',
      icon: <GraduationCap size={20} className="text-cyan" />,
      title: 'B.Tech in AI & Data Science',
      desc: 'SNS College of Technology • CGPA 8.5'
    },
    {
      id: 'experience',
      icon: <Briefcase size={20} className="text-violet" />,
      title: '5 Professional Internships',
      desc: 'Analytics, Machine Learning & Business Intelligence'
    },
    {
      id: 'projects',
      icon: <Database size={20} className="text-cyan" />,
      title: '10 Production Projects',
      desc: 'ML models, Deep Learning, BI dashboards & API pipelines'
    },
    {
      id: 'certifications',
      icon: <Award size={20} className="text-pink" />,
      title: '4 Verified Certifications',
      desc: 'Python, Machine Learning, Power BI & Data Analysis'
    }
  ];

  return (
    <section id="home" className="hero-section" aria-label="Hero Section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Text Content & Actions */}
          <div
            className="hero-content hero-fade-in"
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.35}px, ${parallaxOffset.y * 0.35}px, 0)`
            }}
          >
            {/* Status Pill */}
            <div className="hero-top-badge-row">
              <div className="hero-status-pill">
                <span className="status-indicator"></span>
                <span className="status-text">{personalInfo.status}</span>
              </div>
            </div>

            {/* Name */}
            <h1 className="hero-title hero-heading-reveal">
              Hi, I'm <span className="text-gradient hero-text-shimmer">Viswanathan M</span>
            </h1>

            {/* Target Roles Headline */}
            <div className="hero-subtitle-wrapper">
              <h2 className="hero-subtitle">
                <span className="text-gradient-cyan">Data Analyst</span>
                <span className="hero-divider">|</span>
                <span className="text-gradient">AI &amp; Data Science Professional</span>
              </h2>
            </div>

            {/* Direct, meaningful professional introduction */}
            <div className="hero-description-group">
              <p className="hero-description">
                AI &amp; Data Science professional focused on transforming complex data into actionable business insights. 
                Specialized in <strong>data analytics</strong>, <strong>business intelligence</strong>, <strong>machine learning models</strong>, 
                and <strong>interactive dashboards</strong> using Python, SQL, Power BI, Tableau, and LLMs.
              </p>
            </div>

            {/* 4 Primary Action Buttons */}
            <div className="hero-actions">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary glow-hover-btn"
                aria-label="Explore Projects Section"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={personalInfo.resumePdfUrl}
                download={resumeData.fileName}
                className="btn btn-secondary glow-hover-btn"
                aria-label="Download Official Resume PDF"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary hero-linkedin-btn glow-hover-btn"
                aria-label="Visit Viswanathan M LinkedIn Profile in a new tab"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ExternalLink size={13} className="hero-btn-external-icon" />
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-secondary glow-hover-btn"
                aria-label="Scroll to Contact Section"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Professional Profile Photo */}
          <div
            className="hero-portrait-column hero-fade-in-delayed"
            style={{
              transform: `translate3d(${-parallaxOffset.x * 0.7}px, ${-parallaxOffset.y * 0.7}px, 0)`
            }}
          >
            <ProfessionalProfileFrame imageSrc={personalInfo.profileImage} />
          </div>
        </div>

        {/* Hero Highlights Carousel */}
        <div className="hero-highlights-carousel-wrap" style={{ marginTop: '2rem' }}>
          <SectionCarousel
            items={heroHighlightItems}
            itemsPerPage={{ desktop: 2, tablet: 2, mobile: 1 }}
            ariaLabel="Key Highlights Carousel"
            carouselId="hero-highlights-carousel"
            renderItem={(item) => (
              <div
                className="glass-card"
                style={{
                  height: '100%',
                  padding: '1.1rem 1.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.2rem 0', color: 'var(--text-main)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}