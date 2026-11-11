import React from 'react';
import { personalInfo } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Database,
  Bot,
  Layers,
  Share2
} from './Icons';

export default function About() {
  const { about, location, email, phone, education } = personalInfo;

  const highlightIcons = [
    <Database size={20} className="text-red" />,
    <Layers size={20} className="text-red" />,
    <Bot size={20} className="text-red" />,
    <Share2 size={20} className="text-red" />
  ];

  return (
    <section id="about" className="section about-section cinematic-section" aria-label="About Me">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">02</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">ABOUT ME</span>
          </div>
          <h2 className="section-title cinematic-title">
            TURNING RAW DATA INTO <span className="text-red-accent">PREDICTIVE VALUE.</span>
          </h2>
        </div>

        {/* About Main Layout */}
        <div className="about-grid cinematic-about-grid">
          {/* Left Column: Narrative & Educational Details */}
          <div className="about-text-column">
            <div className="cinematic-card about-card-main">
              <div className="about-education-badge-cinematic">
                <GraduationCap size={16} className="text-red" />
                <span>{education.degree} &bull; {education.institution} (CGPA: {education.cgpa})</span>
              </div>

              <h3 className="about-lead-title cinematic-lead">{about.lead}</h3>

              <div className="about-paragraphs">
                {about.paragraphs.map((p, index) => (
                  <p key={index} className="about-paragraph cinematic-body">
                    {p}
                  </p>
                ))}
              </div>

              {/* Core Focus Checklist */}
              <div className="about-checklist cinematic-checklist">
                <div className="checklist-item cinematic-check-item">
                  <CheckCircle2 size={18} className="check-icon-red" />
                  <div>
                    <strong className="checklist-title">Data Analytics &amp; Business Intelligence:</strong>
                    <span className="checklist-desc">
                      {' '}Power BI, Tableau, Power Query, Excel, and SQL for automated, executive reporting.
                    </span>
                  </div>
                </div>
                <div className="checklist-item cinematic-check-item">
                  <CheckCircle2 size={18} className="check-icon-red" />
                  <div>
                    <strong className="checklist-title">AI Engineering &amp; Machine Learning:</strong>
                    <span className="checklist-desc">
                      {' '}Predictive models, deep learning classification, local LLMs (Ollama, Qwen), and automated ETL pipelines.
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Meta Details */}
              <div className="about-meta-row cinematic-meta-row">
                <div className="about-meta-pill cinematic-pill">
                  <MapPin size={14} className="text-red" />
                  <span>{location}</span>
                </div>
                <div className="about-meta-pill cinematic-pill">
                  <Mail size={14} className="text-red" />
                  <a href={`mailto:${email}`} className="meta-link">{email}</a>
                </div>
                <div className="about-meta-pill cinematic-pill">
                  <Phone size={14} className="text-red" />
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
                  className="cinematic-card highlight-card"
                >
                  <div className="highlight-card-top">
                    <span className="highlight-pill-tag">0{idx + 1}</span>
                    <div className="highlight-icon-wrap">
                      {highlightIcons[idx % highlightIcons.length]}
                    </div>
                  </div>
                  <h4 className="highlight-item-title">{item.title}</h4>
                  <p className="highlight-item-desc">{item.description}</p>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
