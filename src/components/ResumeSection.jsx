import React, { useState } from 'react';
import {
  personalInfo,
  resumeData,
  internshipExperience,
  companyProjectExperience,
  certificationsData
} from '../data/portfolioData';
import {
  Download,
  FileText,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  Printer,
  Sparkles,
  Info,
  Award
} from './Icons';

export default function ResumeSection({ isModal = false, onClose = null }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
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
            <span className="chip chip-violet">Verified Resume</span>
            <span className="chip chip-cyan">B.Tech AI &amp; DS &bull; 8.5 CGPA</span>
          </div>
          <h3 className="resume-banner-title">
            Curriculum Vitae &mdash; M. Viswanathan
          </h3>
          <p className="resume-banner-sub">
            Targeting Data Analyst, AI Developer, and Data Scientist opportunities. 
            Grounding across Power BI, SQL, Python, machine learning, local LLMs, and Meta API integration.
          </p>
        </div>

        <div className="resume-banner-buttons">
          <button
            onClick={handleDownload}
            className="btn btn-primary resume-action-btn"
            aria-label="Download Official Resume PDF"
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
          <span>
            Official resume downloaded successfully ({resumeData.fileName}).
          </span>
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
              <span>Phone:</span> {personalInfo.phone}
            </div>
            <div className="doc-contact-item">
              <span>Email:</span> {personalInfo.email}
            </div>
            <div className="doc-contact-item">
              <span>LinkedIn:</span> {personalInfo.linkedin.replace('https://www.', '')}
            </div>
          </div>
        </div>

        <div className="doc-divider" />

        {/* Education Section */}
        <div className="doc-section">
          <h4 className="doc-section-title">EDUCATION</h4>
          <div className="doc-edu-item">
            <div className="doc-exp-heading">
              <span className="doc-exp-role">{personalInfo.education.degree}</span>
              <span className="doc-exp-period">Current CGPA: {personalInfo.education.cgpa}</span>
            </div>
            <p className="doc-text">{personalInfo.education.institution}</p>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="doc-section">
          <h4 className="doc-section-title">PROFILE</h4>
          <p className="doc-text">{personalInfo.about.lead}</p>
        </div>

        {/* Professional Internships */}
        <div className="doc-section">
          <h4 className="doc-section-title">PROFESSIONAL INTERNSHIP EXPERIENCE</h4>
          <div className="doc-experience-list">
            {internshipExperience.map((exp, idx) => (
              <div key={idx} className="doc-exp-item">
                <div className="doc-exp-heading">
                  <div className="doc-exp-left">
                    <span className="doc-exp-role">{exp.role}</span>
                    <span className="doc-exp-company"> &bull; {exp.company}</span>
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

        {/* Company Projects */}
        <div className="doc-section">
          <h4 className="doc-section-title">COMPANY PROJECT INITIATIVES</h4>
          <div className="doc-experience-list">
            {companyProjectExperience.map((cp, idx) => (
              <div key={idx} className="doc-exp-item">
                <div className="doc-exp-heading">
                  <div className="doc-exp-left">
                    <span className="doc-exp-role">{cp.title}</span>
                    <span className="doc-exp-company"> &bull; {cp.company}</span>
                  </div>
                </div>
                <p className="doc-text" style={{ fontSize: '0.85rem', marginBottom: '0.35rem' }}>{cp.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="doc-section">
          <h4 className="doc-section-title">VERIFIED CERTIFICATIONS</h4>
          <div className="doc-experience-list">
            {certificationsData.map((cert) => (
              <div key={cert.id} className="doc-exp-item">
                <span className="doc-exp-role" style={{ fontSize: '0.875rem' }}>{cert.title}</span>
                <p className="doc-text" style={{ fontSize: '0.8125rem' }}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Hint */}
        <div className="doc-footer-hint">
          <Info size={14} className="text-cyan" />
          <span>Resume details directly mirror the uploaded resume of M. Viswanathan.</span>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div
        className="modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <div
          className="glass-card resume-modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3 id="resume-modal-title" className="modal-title">
              Curriculum Vitae &mdash; M. Viswanathan
            </h3>
            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close resume preview"
            >
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
    <section id="resume" className="section resume-section" aria-label="Resume">
      <div className="container">
        <div className="section-header">
          <div className="section-tag section-tag-violet">
            <FileText size={14} />
            <span>Credentials &amp; CV</span>
          </div>
          <h2 className="section-title">
            Curriculum <span className="text-gradient">Vitae</span>
          </h2>
          <p className="section-subtitle">
            Download my official resume or review the formatted curriculum vitae below.
          </p>
        </div>

        {content}
      </div>
    </section>
  );
}
