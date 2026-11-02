import React from 'react';
import { personalInfo } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
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
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        {/* About Main Layout */}
        <div className="about-grid">
          {/* Left Column: Narrative & Details */}
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

              {/* Core Focus Checklist */}
              <div className="about-checklist">
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">Data Analytics &amp; Business Intelligence:</span>
                    <span className="checklist-desc">
                      {' '}Power BI, Tableau, Power Query, Excel, and SQL for actionable business reporting.
                    </span>
                  </div>
                </div>
                <div className="checklist-item">
                  <CheckCircle2 size={18} className="check-icon" />
                  <div>
                    <span className="checklist-title">AI Applications &amp; Machine Learning:</span>
                    <span className="checklist-desc">
                      {' '}Predictive models, deep learning classification, local LLMs (Ollama, Qwen), and automated ETL pipelines.
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Meta Details */}
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

          {/* Right Column: 4 Core Pillars Carousel */}
          <div className="about-highlights-column">
            <SectionCarousel
              items={about.highlights}
              itemsPerPage={{ desktop: 2, tablet: 2, mobile: 1 }}
              ariaLabel="About Highlights Carousel"
              carouselId="about-highlights-carousel"
              renderItem={(item, idx) => (
                <div
                  key={idx}
                  className={`glass-card highlight-card ${idx % 2 === 1 ? 'glass-card-cyan' : ''}`}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="highlight-card-header">
                    <span className="highlight-tag">{item.label}</span>
                  </div>
                  <h4 className="highlight-value text-gradient">{item.title}</h4>
                  <p className="highlight-desc" style={{ flex: '1 1 auto' }}>{item.description}</p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
