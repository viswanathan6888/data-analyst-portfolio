import React from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  User,
  Database,
  Bot,
  Layers,
  MapPin,
  Mail,
  CheckCircle2,
  Workflow,
  Sparkles,
  ArrowRight
} from './Icons';

export default function About() {
  const { about, location, email, status } = personalInfo;

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-violet">
            <User size={14} />
            <span>Profile Overview</span>
          </div>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            Uniting classical quantitative analytics with cutting-edge autonomous AI pipelines.
          </p>
        </div>

        {/* About Main Layout */}
        <div className="about-grid">
          {/* Left Column: Narrative & Values */}
          <div className="about-text-column">
            <div className="glass-card about-card-main">
              <h3 className="about-lead-title">{about.lead}</h3>
              
              <div className="about-paragraphs">
                {about.paragraphs.map((p, index) => (
                  <p key={index} className="about-paragraph">
                    {p}
                  </p>
                ))}
              </div>

              {/* Quick Persona Strengths Checklist */}
              <div className="about-checklist">
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Data Rigor First:</span>
                    <span className="checklist-desc"> Clean schemas, normalized SQL structures, and validated KPI metrics.</span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Modern AI Automation:</span>
                    <span className="checklist-desc"> Deploying private LLM agents (Ollama + Qwen) to automate exploratory analysis.</span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Business Alignment:</span>
                    <span className="checklist-desc"> Translating raw operational logs into clear dashboards that drive strategic outcomes.</span>
                  </div>
                </div>
              </div>

              {/* Editable Profile Meta Banner */}
              <div className="about-meta-row">
                <div className="about-meta-pill">
                  <MapPin size={15} className="text-cyan" />
                  <span>Location: <strong>{location}</strong></span>
                </div>
                <div className="about-meta-pill">
                  <Mail size={15} className="text-violet" />
                  <span>Email: <strong>{email}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Pillars Grid */}
          <div className="about-highlights-column">
            <div className="highlights-grid">
              {about.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className={`glass-card highlight-card ${idx % 2 === 1 ? 'glass-card-cyan' : ''}`}
                >
                  <div className="highlight-card-header">
                    <span className="highlight-tag">{item.label}</span>
                    <span className="highlight-accent-dot" />
                  </div>
                  <h4 className="highlight-value text-gradient">{item.value}</h4>
                  <p className="highlight-desc">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Synergistic Workflow Card */}
            <div className="glass-card synergy-banner">
              <div className="synergy-header">
                <Workflow size={20} className="text-cyan" />
                <h4 className="synergy-title">The Analyst-Developer Synergy</h4>
              </div>
              <p className="synergy-text">
                Traditional data analytics provides verified numbers; AI engineering provides contextual reasoning. By fusing SQL/BI depth with private Ollama LLM agents and Meta API feeds, analytics transforms from reactive reports into automated intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
