import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  Download,
  ArrowRight,
  Database,
  Bot,
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
import { OrganicProfileFrame } from './AbstractDecorations';

export default function Hero({ onOpenResume }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section" aria-label="Hero Section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Text Content & Actions */}
          <div className="hero-content">
            {/* Status Pill */}
            <div className="hero-status-pill">
              <span className="status-indicator"></span>
              <span className="status-text">{personalInfo.status}</span>
            </div>

            {/* Name */}
            <h1 className="hero-title">
              Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
            </h1>

            {/* Target Roles Headline */}
            <div className="hero-subtitle-wrapper">
              <h2 className="hero-subtitle">
                <span className="text-gradient-cyan">Data Analyst</span>
                <span className="hero-divider">|</span>
                <span className="text-gradient">AI Developer</span>
                <span className="hero-divider">|</span>
                <span className="text-gradient-cyan">Aspiring Data Scientist</span>
              </h2>
            </div>

            {/* Concise Resume-Grounded Introduction */}
            <p className="hero-description">
              Pursuing <strong>B.Tech in Artificial Intelligence & Data Science</strong> at <strong>Kathir College Of Engineering, Coimbatore</strong> (Current CGPA: <strong>8.5</strong>). 
              Specializing in transforming complex multi-source data into enterprise <strong>Power BI & Tableau</strong> dashboards, 
              building machine learning pipelines, and deploying private on-premise AI assistants using <strong>Ollama & Qwen 2.5</strong>.
            </p>

            {/* Verification Note for CGPA per user instructions */}
            <div className="hero-verification-callout">
              <GraduationCap size={15} className="text-cyan flex-shrink-0" />
              <span>
                <strong>Academic Standing:</strong> Current CGPA: <strong>{personalInfo.education.cgpa}</strong> ({personalInfo.education.institution}) &bull; <em className="text-dim">Note: formatted as 8.5 CGPA per resume entry &quot;8.5%&quot;.</em>
              </span>
            </div>

            {/* 4 Action Buttons as requested */}
            <div className="hero-actions">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
                aria-label="Explore Projects Section"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenResume}
                className="btn btn-secondary"
                aria-label="Download Resume"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary hero-linkedin-btn"
                aria-label="Visit Viswanathan M LinkedIn Profile in a new tab"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
                <ExternalLink size={13} className="hero-btn-external-icon" />
              </a>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-secondary"
                aria-label="Scroll to Contact Section"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Core Domain Badges */}
            <div className="hero-stack-row">
              <span className="stack-label">Core Focus:</span>
              <div className="stack-pills">
                <span className="chip chip-cyan">Power BI & SQL</span>
                <span className="chip chip-violet">Python & Scikit-learn</span>
                <span className="chip chip-cyan">Ollama & Qwen 2.5</span>
                <span className="chip chip-violet">Meta API Integration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Profile Photo with Multicolored Organic Frame */}
          <div className="hero-portrait-column">
            <OrganicProfileFrame
              imageSrc={personalInfo.profileImage}
              altText={`${personalInfo.name} - ${personalInfo.title}`}
              imageLoaded={imageLoaded}
              onImageLoad={() => setImageLoaded(true)}
              imageError={imageError}
              onImageError={() => setImageError(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
