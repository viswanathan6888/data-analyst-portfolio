import React from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  User,
  GraduationCap,
  Database,
  Bot,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Workflow,
  Sparkles
} from './Icons';

export default function About() {
  const { about, location, email, phone, education } = personalInfo;

  return (
    <section id="about" className="section about-section" aria-label="About Me">
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
            B.Tech in Artificial Intelligence & Data Science with hands-on expertise in Business Intelligence, 
            machine learning models, and local LLM architectures.
          </p>
        </div>

        {/* About Main Layout */}
        <div className="about-grid">
          {/* Left Column: Narrative & Values */}
          <div className="about-text-column">
            <div className="glass-card about-card-main">
              <div className="about-education-badge">
                <GraduationCap size={16} className="text-cyan" />
                <span>{education.degree} &bull; {education.institution} (CGPA: {education.cgpa})</span>
              </div>

              <h3 className="about-lead-title">{about.lead}</h3>

              <div className="about-paragraphs">
                {about.paragraphs.map((p, index) => (
                  <p key={index} className="about-paragraph">
                    {p}
                  </p>
                ))}
              </div>

              {/* Three Pillars Checklist directly from Resume */}
              <div className="about-checklist">
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Data Analytics & BI:</span>
                    <span className="checklist-desc">
                      {' '}Crafting dimensional models, interactive Power BI / Tableau dashboards, and automated Power Query ETL.
                    </span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">AI & Machine Learning:</span>
                    <span className="checklist-desc">
                      {' '}Building supervised/deep learning pipelines (Scikit-learn, TensorFlow, PyTorch) and deploying private local LLMs (Ollama, Qwen 2.5).
                    </span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Data Engineering & APIs:</span>
                    <span className="checklist-desc">
                      {' '}Connecting Meta Marketing API and Windsor.ai pipelines, querying Google BigQuery, and working with Apache Hadoop.
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Profile Meta Banner */}
              <div className="about-meta-row">
                <div className="about-meta-pill">
                  <MapPin size={15} className="text-cyan" />
                  <span>{location}</span>
                </div>
                <div className="about-meta-pill">
                  <Mail size={15} className="text-violet" />
                  <a href={`mailto:${email}`} className="meta-link">{email}</a>
                </div>
                <div className="about-meta-pill">
                  <Phone size={15} className="text-cyan" />
                  <a href={`tel:${phone}`} className="meta-link">{phone}</a>
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
                  <h4 className="highlight-value text-gradient">{item.title}</h4>
                  <p className="highlight-desc">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Synergistic Workflow Card */}
            <div className="glass-card synergy-banner">
              <div className="synergy-header">
                <Workflow size={20} className="text-cyan" />
                <h4 className="synergy-title">Career Objective</h4>
              </div>
              <p className="synergy-text">
                Passionate about pursuing a high-impact career as a <strong>Data Analyst</strong>, <strong>AI Developer</strong>, or <strong>Data Scientist</strong>, contributing to intelligent, reliable, and impactful decision systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
