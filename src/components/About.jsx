import React from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
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
  Share2,
  Download
} from './Icons';

export default function About() {
  const { about, location, email, phone, education } = personalInfo;

  const engineeringSteps = [
    {
      step: '01',
      title: 'DATA INGESTION & PIPELINES',
      desc: 'Automating multi-source ETL with Python, SQL, Power Query, and REST APIs for pristine data consistency.'
    },
    {
      step: '02',
      title: 'MODELING & PREDICTIVE AI',
      desc: 'Developing classification, time-series forecasting, and local LLM agents (Ollama + Qwen 2.5) with high precision.'
    },
    {
      step: '03',
      title: 'EXECUTIVE BI & DEPLOYMENT',
      desc: 'Deploying interactive Power BI executive dashboards and scalable API endpoints that drive measurable business outcomes.'
    }
  ];

  const highlightIcons = [
    <Database size={20} className="text-red" />,
    <Layers size={20} className="text-red" />,
    <Bot size={20} className="text-red" />,
    <Share2 size={20} className="text-red" />
  ];

  return (
    <section id="about" className="section about-section cinematic-section" aria-label="About Me">
      <div className="container">
        {/* Editorial Section Header (Matching Reference Video exact_035.jpg) */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">02</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">BEHIND THE PROCESS</span>
          </div>
          <h2 className="section-title cinematic-title">
            NOT JUST ALGORITHMS. <span className="text-red-accent">SOLVING REAL-WORLD PROBLEMS.</span>
          </h2>
        </div>

        {/* 3-Column Editorial Layout (Matching exact_035.jpg) */}
        <div className="about-exact-3col-grid">
          {/* Column 1: Education, Background & Bio */}
          <div className="about-col-education">
            <div className="about-sub-header">
              <span className="sub-header-num">01</span>
              <h3 className="sub-header-title">EDUCATION &amp; SKILLS</h3>
            </div>

            <div className="cinematic-card about-edu-card">
              <div className="about-education-badge-cinematic">
                <GraduationCap size={16} className="text-red" />
                <span className="edu-title">{education.degree}</span>
              </div>
              <p className="edu-institution">{education.institution}</p>
              <div className="edu-cgpa-pill">
                <span className="cgpa-dot" />
                <span>CGPA: <strong>{education.cgpa}</strong></span>
              </div>

              <div className="edu-bio-text">
                <p>{about.lead}</p>
              </div>

              {/* Quick Contact Info */}
              <div className="about-meta-list">
                <div className="about-meta-item">
                  <MapPin size={14} className="text-red" />
                  <span>{location}</span>
                </div>
                <div className="about-meta-item">
                  <Mail size={14} className="text-red" />
                  <a href={`mailto:${email}`} className="meta-link">{email}</a>
                </div>
                <div className="about-meta-item">
                  <Phone size={14} className="text-red" />
                  <a href={`tel:${phone}`} className="meta-link">{phone}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: 3-Step Process (From Data to Deployment) */}
          <div className="about-col-process">
            <div className="about-sub-header">
              <span className="sub-header-num">02</span>
              <h3 className="sub-header-title">FROM DATA TO VALUE</h3>
            </div>

            <div className="about-process-timeline">
              {engineeringSteps.map((item) => (
                <div key={item.step} className="about-process-item">
                  <div className="process-step-indicator">
                    <span className="process-step-num">{item.step}</span>
                    <div className="process-step-line" />
                  </div>
                  <div className="process-step-content">
                    <h4 className="process-step-title">{item.title}</h4>
                    <p className="process-step-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: The Signature Red Card with Cursive Signature (exact_035.jpg) */}
          <div className="about-col-red-card">
            <div className="about-red-quote-card">
              <div className="quote-mark-icon">&ldquo;</div>
              <p className="red-card-quote-text">
                From raw data to actionable intelligence, every algorithm should serve a clear business purpose.
              </p>
              <div className="red-card-signature-box">
                <span className="signature-cursive">Viswanathan M.</span>
                <span className="signature-title">Data Analyst &amp; AI Developer</span>
              </div>

              <div className="red-card-action-slot">
                <a
                  href={personalInfo.resumePdfUrl}
                  download={resumeData.fileName}
                  className="btn-red-card-download"
                  aria-label="Download Official Resume PDF"
                >
                  <Download size={14} />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Carousel */}
        <div className="about-pillars-carousel-wrap">
          <SectionCarousel
            items={about.highlights}
            itemsPerPage={{ desktop: 4, tablet: 2, mobile: 1 }}
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
    </section>
  );
}
