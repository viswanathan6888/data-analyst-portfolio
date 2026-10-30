import React, { useState, useEffect } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import {
  Download,
  ArrowRight,
  Database,
  Sparkles,
  Terminal,
  Code2,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Mail,
  GraduationCap,
  Award
} from './Icons';
import { LinkedinIcon } from './Icons';
import { ProfessionalProfileFrame } from './AbstractDecorations';
import FuturisticRobotVisual from './FuturisticRobotVisual';

export default function Hero({ onNavigate, onOpenResume }) {
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
            {/* Status Pill & Refined AI Coprocessor */}
            <div className="hero-top-badge-row">
              <div className="hero-status-pill">
                <span className="status-indicator"></span>
                <span className="status-text">{personalInfo.status}</span>
              </div>
              <FuturisticRobotVisual />
            </div>

            {/* Name with subtle animated backdrop & gradient shimmer */}
            <h1 className="hero-title hero-heading-reveal">
              <span className="hero-heading-glow-bg" aria-hidden="true" />
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

            {/* Exact Introduction Provided by User */}
            <div className="hero-description-group">
              <p className="hero-description">
                I am an <strong>AI &amp; Data Science professional</strong> focused on transforming complex data into actionable insights and developing intelligent, data-driven solutions. My work spans <strong>data analytics</strong>, <strong>business intelligence</strong>, <strong>AI-powered applications</strong>, and <strong>interactive dashboard development</strong>.
              </p>
              <p className="hero-description hero-sub-description">
                I leverage technologies such as <strong>Python</strong>, <strong>SQL</strong>, <strong>Power BI</strong>, <strong>Tableau</strong>, <strong>Power Query</strong>, <strong>APIs</strong>, and <strong>Large Language Models (LLMs)</strong> to analyze data, streamline reporting, and support informed decision-making.
              </p>
            </div>

            {/* My Objective Callout */}
            <div className="hero-verification-callout hero-objective-callout">
              <Sparkles size={16} className="text-cyan flex-shrink-0" />
              <span>
                <strong>My Objective:</strong> To build practical AI and analytics solutions that turn data into meaningful business insights.
              </span>
            </div>

            {/* 4 Action Buttons as requested */}
            <div className="hero-actions">
              <button
                onClick={() => onNavigate ? onNavigate('projects') : scrollToSection('projects')}
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
                onClick={() => onNavigate ? onNavigate('contact') : scrollToSection('contact')}
                className="btn btn-secondary glow-hover-btn"
                aria-label="Go to Contact Section"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Core Expertise Badges */}
            <div className="hero-stack-row">
              <span className="stack-label">Core Expertise:</span>
              <div className="stack-pills">
                <span className="chip chip-cyan">Data Analytics &amp; BI</span>
                <span className="chip chip-violet">Python, SQL &amp; Excel</span>
                <span className="chip chip-cyan">Power BI, Tableau &amp; Power Query</span>
                <span className="chip chip-pink">AI Applications, LLMs, Ollama &amp; Qwen</span>
                <span className="chip chip-violet">API Integration &amp; Dashboards</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Professional Profile Photo with subtle inverted parallax */}
          <div
            className="hero-portrait-column hero-fade-in-delayed"
            style={{
              transform: `translate3d(${-parallaxOffset.x * 0.7}px, ${-parallaxOffset.y * 0.7}px, 0)`
            }}
          >
            <ProfessionalProfileFrame imageSrc={personalInfo.profileImage} />
          </div>
        </div>
      </div>
    </section>
  );
}