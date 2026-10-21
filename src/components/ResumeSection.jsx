import React, { useState } from 'react';
import { personalInfo, resumeData, skillsData, experienceData } from '../data/portfolioData';
import {
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  Printer,
  Sparkles,
  Info
} from './Icons';

export default function ResumeSection({ isModal = false, onClose = null }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    // Trigger download of resume
    const link = document.createElement('a');
    link.href = personalInfo.resumePdfUrl;
    link.download = resumeData.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  const content = (
    <div className="resume-wrapper">
      {/* Action Header */}
      <div className="glass-card resume-action-banner">
        <div className="resume-banner-text">
          <div className="resume-badge-row">
            <span className="chip chip-violet">Curriculum Vitae</span>
            <span className="chip chip-cyan">Updated: {resumeData.lastUpdated}</span>
          </div>
          <h3 className="resume-banner-title">
            Professional Resume & Competency Sheet
          </h3>
          <p className="resume-banner-sub">
            Optimized for Data Analyst and AI Developer positions. Includes enterprise BI, SQL modeling, and local LLM engineering experience.
          </p>
        </div>

        <div className="resume-banner-buttons">
          <button
            onClick={handleDownload}
            className="btn btn-primary resume-action-btn"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="btn btn-secondary resume-action-btn"
            title="Print or Save as PDF via browser"
          >
            <Printer size={16} />
            <span>Print View</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="glass-card download-toast animate-pulse-subtle">
          <CheckCircle2 size={16} className="text-cyan" />
          <span>Resume download triggered ({resumeData.fileName}). To use your custom PDF, replace <code>public/resume.pdf</code>.</span>
        </div>
      )}

      {/* Embedded High-Fidelity Resume Document Preview */}
      <div className="glass-card resume-document-preview">
        {/* Document Header */}
        <div className="doc-header">
          <div className="doc-header-main">
            <h2 className="doc-name">{personalInfo.name}</h2>
            <p className="doc-title">{personalInfo.title}</p>
          </div>
          <div className="doc-header-contacts">
            <div className="doc-contact-item">
              <span>Email:</span> {personalInfo.email}
            </div>
            <div className="doc-contact-item">
              <span>Location:</span> {personalInfo.location}
            </div>
            <div className="doc-contact-item">
              <span>Portfolio:</span> Modern React + Vite App
            </div>
          </div>
        </div>

        <div className="doc-divider" />

        {/* Executive Summary */}
        <div className="doc-section">
          <h4 className="doc-section-title">PROFESSIONAL SUMMARY</h4>
          <p className="doc-text">
            {personalInfo.about.lead} Proficient in SQL query optimization, data warehouse modeling, 
            interactive reporting in Power BI and Tableau, alongside building local AI solutions using Ollama and Qwen models.
          </p>
        </div>

        {/* Core Skills */}
        <div className="doc-section">
          <h4 className="doc-section-title">CORE SKILLS & TECHNOLOGIES</h4>
          <div className="doc-skills-list">
            <div className="doc-skill-category">
              <strong>Data Analytics & BI:</strong> SQL, Excel, Power BI, Tableau, Power Query, Data Modeling, DAX
            </div>
            <div className="doc-skill-category">
              <strong>AI & Development:</strong> Python, Ollama, Qwen, LLMs, Meta API integration, REST APIs, JSON
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="doc-section">
          <h4 className="doc-section-title">PROFESSIONAL EXPERIENCE</h4>
          <div className="doc-experience-list">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="doc-exp-item">
                <div className="doc-exp-heading">
                  <div className="doc-exp-left">
                    <span className="doc-exp-role">{exp.role}</span>
                    <span className="doc-exp-company"> | {exp.company}</span>
                  </div>
                  <span className="doc-exp-period">{exp.period}</span>
                </div>
                <ul className="doc-bullets">
                  {exp.bulletPoints.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications (Placeholders) */}
        <div className="doc-section">
          <h4 className="doc-section-title">EDUCATION & CREDENTIALS</h4>
          <div className="doc-edu-item">
            <div className="doc-exp-heading">
              <span className="doc-exp-role">[Bachelor's Degree in Computer Science / Analytics / Relevant Field]</span>
              <span className="doc-exp-period">[Graduation Year]</span>
            </div>
            <p className="doc-text">[University Name / Institute Location]</p>
          </div>
        </div>

        {/* Customization Tip */}
        <div className="doc-footer-hint">
          <Info size={14} className="text-cyan" />
          <span>This interactive preview reflects live updates from <code>src/data/portfolioData.js</code>.</span>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="resume-modal-title">
        <div className="glass-card resume-modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3 id="resume-modal-title" className="modal-title">Resume & Credentials</h3>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close resume preview">
              &times;
            </button>
          </div>
          <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="resume" className="section resume-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-violet">
            <FileText size={14} />
            <span>Credentials & CV</span>
          </div>
          <h2 className="section-title">
            Resume & <span className="text-gradient">Credentials</span>
          </h2>
          <p className="section-subtitle">
            Download a copy of my curriculum vitae or review the live interactive preview below.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
}
