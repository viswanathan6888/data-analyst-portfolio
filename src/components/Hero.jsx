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
          const x = ((e.clientX / innerWidth) - 0.5) * 8;
          const y = ((e.clientY / innerHeight) - 0.5) * 8;
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
      {/* Giant Red Typography "PORTFOLIO" Behind Subject (Exact Match to Reference Video) */}
      <div className="hero-giant-portfolio-backdrop" aria-hidden="true">
        <span className="hero-giant-portfolio-word">PORTFOLIO</span>
      </div>

      {/* Decorative Technical Editorial Grid Lines & Corner Crosshairs */}
      <div className="hero-grid-decorations" aria-hidden="true">
        <span className="hero-crosshair top-left">+</span>
        <span className="hero-crosshair top-right">+</span>
        <span className="hero-crosshair bottom-left">&times;</span>
        <span className="hero-crosshair bottom-right">+</span>
        <div className="hero-vertical-guide-left" />
        <div className="hero-vertical-guide-right" />
      </div>

      <div className="container hero-container-cinematic">
        {/* Exact 3-Column Editorial Hero Layout (Left: Info, Center: Portrait, Right: Stats) */}
        <div className="hero-exact-layout">
          {/* Left Column: Kicker, Script Greeting, Giant Name, Red Roles, Bio, CTA */}
          <div
            className="hero-left-column"
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.2}px, ${parallaxOffset.y * 0.2}px, 0)`
            }}
          >
            {/* Kicker Tag & Status */}
            <div className="hero-kicker-row hero-anim-kicker">
              <span className="hero-kicker-tag">
                <span className="kicker-red-dot" /> DATA ANALYST | AI DEVELOPER
              </span>
              <div className="hero-status-pill-cinematic">
                <span className="status-indicator-red" />
                <span className="status-text">{personalInfo.status}</span>
              </div>
            </div>

            {/* Handwritten Script Greeting: "Hello, I'm" (Caveat font) */}
            <div className="hero-greeting-line hero-anim-greeting">
              <span className="greeting-script-exact">Hello, I'm</span>
            </div>

            {/* Main Name: VISWANATHAN. (Oversized White Bebas Neue with Period) */}
            <div className="hero-name-mask-container hero-anim-name">
              <h1 className="hero-main-name-exact">
                VISWANATHAN<span className="text-red-accent">.</span>
              </h1>
            </div>

            {/* Target Role Headline: Bold Vibrant Red Stacked */}
            <div className="hero-role-stacked hero-anim-role">
              <div className="role-line-red">DATA ANALYST &amp;</div>
              <div className="role-line-red">AI DEVELOPER</div>
            </div>

            {/* Professional Introduction */}
            <p className="hero-editorial-intro hero-anim-intro">
              AI &amp; Data Science professional specialized in transforming multi-source raw data into
              predictive intelligence, automated pipelines, and production-grade models. 
              Strong expertise in <strong>Machine Learning</strong>, <strong>Power BI Dashboards</strong>, 
              and <strong>Intelligent AI Systems</strong>.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-cta-group hero-anim-cta">
              <a
                href={personalInfo.resumePdfUrl}
                download={resumeData.fileName}
                className="btn btn-exact-red"
                aria-label="Download Official Resume PDF"
              >
                <span>Download Resume</span>
                <span className="btn-icon-arrow">&darr;</span>
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

          {/* Center Column: Cutout Portrait Overlapping Giant "PORTFOLIO" Text */}
          <div
            className="hero-center-portrait-column hero-anim-portrait"
            style={{
              transform: `translate3d(${-parallaxOffset.x * 0.3}px, ${-parallaxOffset.y * 0.3}px, 0)`
            }}
          >
            <ProfessionalProfileFrame imageSrc={personalInfo.profileImage} />
          </div>

          {/* Right Column: Hero Metrics & Numbers Column (Exact Match to Reference Video) */}
          <div
            className="hero-right-stats-column hero-anim-meta"
            style={{
              transform: `translate3d(${parallaxOffset.x * 0.15}px, ${parallaxOffset.y * 0.15}px, 0)`
            }}
          >
            <div className="hero-stats-kicker">
              <span>PRECISION &amp; SCALE</span>
              <span className="stats-kicker-sep">/</span>
              <span className="text-red-accent">DATA TO VALUE</span>
            </div>

            {/* Metric 1 */}
            <div className="hero-stat-block">
              <div className="stat-number-row">
                <span className="stat-giant-num">5.</span>
              </div>
              <div className="stat-label-wrap">
                <span className="stat-primary-label">INTERNSHIPS COMPLETED</span>
                <span className="stat-sub-label">Analytics &amp; Machine Learning</span>
              </div>
            </div>

            <div className="hero-stat-divider" />

            {/* Metric 2 */}
            <div className="hero-stat-block">
              <div className="stat-number-row">
                <span className="stat-giant-num">10.</span>
              </div>
              <div className="stat-label-wrap">
                <span className="stat-primary-label">PRODUCTION PROJECTS</span>
                <span className="stat-sub-label">Predictive ML, AI Agents &amp; Dashboards</span>
              </div>
            </div>

            <div className="hero-stat-divider" />

            {/* Metric 3 */}
            <div className="hero-stat-block">
              <div className="stat-number-row">
                <span className="stat-giant-num">8.5</span>
              </div>
              <div className="stat-label-wrap">
                <span className="stat-primary-label">ACADEMIC CGPA</span>
                <span className="stat-sub-label">B.Tech AI &amp; Data Science</span>
              </div>
            </div>

            <div className="hero-stat-divider" />

            {/* Download CV Action Link */}
            <div className="hero-right-download-link-box">
              <a
                href={personalInfo.resumePdfUrl}
                download={resumeData.fileName}
                className="hero-download-cv-link"
                title="Download Official CV / Resume"
              >
                <span>DOWNLOAD CV</span>
                <span className="download-cv-arrow">&darr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Highlights Carousel with Smooth Navigation */}
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
