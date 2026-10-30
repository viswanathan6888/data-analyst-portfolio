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

              {/* Core Expertise Checklist */}
              <div className="about-checklist">
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Data Analytics &amp; Business Intelligence:</span>
                    <span className="checklist-desc">
                      {' '}Power BI, Tableau, Power Query, Excel, and SQL for actionable reporting and informed decision-making.
                    </span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">AI Applications &amp; LLMs:</span>
                    <span className="checklist-desc">
                      {' '}Building practical AI applications with Large Language Models, Ollama, Qwen, and custom data workflows.
                    </span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">API Integration &amp; Dashboard Development:</span>
                    <span className="checklist-desc">
                      {' '}Meta API data integration, Windsor.ai, automated pipelines, and interactive dashboard solutions.
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

            {/* My Objective Card */}
            <div className="glass-card synergy-banner">
              <div className="synergy-header">
                <Workflow size={20} className="text-cyan" />
                <h4 className="synergy-title">My Objective</h4>
              </div>
              <p className="synergy-text">
                To build practical AI and analytics solutions that turn data into meaningful business insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
