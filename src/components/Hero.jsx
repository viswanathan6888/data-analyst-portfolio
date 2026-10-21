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
  Share2,
  Monitor
} from './Icons';
import { LinkedinIcon, GithubIcon } from './Icons';

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

            {/* Headline */}
            <div className="hero-subtitle-wrapper">
              <h2 className="hero-subtitle">
                <span className="text-gradient-cyan">Data Analyst</span>
                <span className="hero-divider">|</span>
                <span className="text-gradient">AI Developer</span>
              </h2>
            </div>

            {/* Concise Introduction */}
            <p className="hero-description">
              {personalInfo.tagline} Experienced in building business intelligence dashboards 
              with <strong>Power BI & Tableau</strong>, writing optimized <strong>SQL</strong> and <strong>Power Query</strong> pipelines, 
              and deploying private, on-premise AI assistants using <strong>Ollama & Qwen</strong>.
            </p>

            {/* 4 Action Buttons as requested */}
            <div className="hero-actions">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn btn-primary"
                aria-label="View Projects Section"
              >
                <span>View Projects</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onOpenResume}
                className="btn btn-secondary"
                aria-label="View or Download Resume"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary hero-linkedin-btn"
                aria-label="Visit LinkedIn Profile"
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
              <span className="stack-label">Core Domains:</span>
              <div className="stack-pills">
                <span className="chip chip-cyan">Data Analytics & SQL</span>
                <span className="chip chip-violet">Power BI & Tableau</span>
                <span className="chip chip-cyan">Local AI (Ollama + Qwen)</span>
                <span className="chip chip-violet">Meta API Integration</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Profile Photo with Polished Frame */}
          <div className="hero-portrait-column">
            <div className="portrait-frame-container">
              {/* Animated Halo Shimmer Ring */}
              <div className="portrait-halo-ring" aria-hidden="true" />
              
              {/* Glass Frame Card */}
              <div className="glass-card portrait-glass-card">
                <div className="portrait-img-wrapper">
                  {!imageError ? (
                    <img
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.name} - ${personalInfo.title}`}
                      className={`portrait-image ${imageLoaded ? 'portrait-image-loaded' : ''}`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      loading="eager"
                      width="380"
                      height="480"
                    />
                  ) : (
                    <div className="portrait-fallback">
                      <div className="fallback-initials">
                        {personalInfo.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <span className="fallback-hint">Add photo to public/profile.jpg</span>
                    </div>
                  )}

                  {/* Gradient Overlay for subtle glass edge integration */}
                  <div className="portrait-gradient-overlay" />
                </div>

                {/* Floating Micro-Badge Top: Analytics */}
                <div className="portrait-badge badge-top-right animate-float-subtle">
                  <div className="p-badge-icon bg-cyan">
                    <Database size={14} className="text-cyan" />
                  </div>
                  <div className="p-badge-text">
                    <span className="p-badge-title">SQL & Power BI</span>
                    <span className="p-badge-sub">Business Intelligence</span>
                  </div>
                </div>

                {/* Floating Micro-Badge Bottom: AI Engineering */}
                <div className="portrait-badge badge-bottom-left animate-float-subtle-delay">
                  <div className="p-badge-icon bg-violet">
                    <Bot size={14} className="text-violet" />
                  </div>
                  <div className="p-badge-text">
                    <span className="p-badge-title">Ollama + Qwen</span>
                    <span className="p-badge-sub">Local LLM Analytics</span>
                  </div>
                </div>
              </div>

              {/* Recruiter Ready Tagline underneath photo */}
              <div className="portrait-caption">
                <span className="caption-dot" />
                <span className="caption-text">Recruiter-Ready Profile &bull; Updated October 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
