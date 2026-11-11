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
  ChevronDown
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
      {/* Giant Typography Layer Behind Portrait with Smooth Horizontal Gliding (Reference Video) */}
      <div className="hero-giant-watermark-track animated-watermark" aria-hidden="true">
        <div className="hero-giant-watermark-inner">
          <span className="hero-giant-watermark-text">PORTFOLIO &bull; VISWANATHAN M. &bull; DATA &amp; AI &bull;&nbsp;</span>
          <span className="hero-giant-watermark-text">PORTFOLIO &bull; VISWANATHAN M. &bull; DATA &amp; AI &bull;&nbsp;</span>
        </div>
      </div>

      <div className="container hero-container-cinematic">
        <div className="hero-editorial-grid">
          {/* Left Column: Progressive Entrance Animation for Name, Role & Details */}
          <div
            className="hero-left-column"
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.25}px, ${parallaxOffset.y * 0.25}px, 0)`
            }}
          >
            {/* Step 1: Kicker & Status Pill */}
            <div className="hero-kicker-row hero-anim-kicker">
              <span className="hero-kicker-tag">01 / PORTFOLIO</span>
              <div className="hero-status-pill-cinematic">
                <span className="status-indicator-red" />
                <span className="status-text">{personalInfo.status}</span>
              </div>
            </div>

            {/* Step 2: Elegant Greeting (matching reference video frame_002.jpg) */}
            <div className="hero-greeting-line hero-anim-greeting">
              <span className="greeting-script">Hello, I'm</span>
            </div>

            {/* Step 3: Main Name Heading with Bold Condensed Editorial Typography */}
            <div className="hero-name-mask-container hero-anim-name">
              <h1 className="hero-main-name">
                VISWANATHAN <span className="text-red-accent">M.</span>
              </h1>
            </div>

            {/* Step 4: Role Headline (Animated Separately from Name) */}
            <div className="hero-role-headline hero-anim-role">
              <span className="hero-role-badge">DATA ANALYST</span>
              <span className="hero-role-divider">|</span>
              <span className="hero-role-badge highlight">AI DEVELOPER</span>
            </div>

            {/* Step 5: Professional Introduction */}
            <p className="hero-editorial-intro hero-anim-intro">
              AI &amp; Data Science professional focused on transforming complex data into 
              actionable business insights and intelligent, production-ready solutions. 
              Specializing in <strong>Data Analytics</strong>, <strong>Business Intelligence</strong>, 
              <strong>Predictive Machine Learning</strong>, and <strong>Interactive Dashboards</strong> with Python, SQL, Power BI, and LLMs.
            </p>

            {/* Step 6: Primary Action Buttons */}
            <div className="hero-cta-group hero-anim-cta">
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

            {/* Step 7: Location & Social Row */}
            <div className="hero-meta-footer hero-anim-meta">
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

          {/* Right Column: Prominent Portrait with Cinematic Reveal & Floating Animation */}
          <div
            className="hero-right-portrait-column hero-anim-portrait"
            style={{
              transform: `translate3d(${-parallaxOffset.x * 0.4}px, ${-parallaxOffset.y * 0.4}px, 0)`
            }}
          >
            <ProfessionalProfileFrame imageSrc={personalInfo.profileImage} />
          </div>
        </div>

        {/* Step 8: Highlights Carousel with Smooth Staggered Slide-Up */}
        <div className="hero-highlights-cinematic-wrap hero-anim-highlights">
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
