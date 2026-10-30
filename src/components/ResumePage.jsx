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
  Award,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ArrowRight
} from './Icons';

export default function ResumePage({ onNavigate }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('pdf'); // 'pdf' | 'structured'

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

  return (
    <div className="resume-page-view" role="main">
      {/* Top Banner & Breadcrumbs */}
      <section className="resume-hero-section">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className="resume-breadcrumb-row">
            <button
              onClick={() => onNavigate ? onNavigate('home') : (window.location.hash = '#home')}
              className="breadcrumb-back-btn"
              aria-label="Return to portfolio home"
              type="button"
            >
              &larr; Back to Portfolio
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Dedicated Resume Page</span>
          </div>

          <div className="section-header resume-page-header slide-header-compact">
            <div className="section-tag section-tag-violet">
              <FileText size={14} />
              <span>Official Curriculum Vitae</span>
            </div>
            <h1 className="section-title">
              Verified <span className="text-gradient">Resume</span>
            </h1>
            <p className="section-subtitle">
              Official resume of <strong>{personalInfo.name}</strong> &bull; B.Tech in Artificial Intelligence &amp; Data Science (8.5 CGPA). 
              View the embedded PDF document or download a copy below.
            </p>
          </div>

          {/* Quick Credential Highlights Ribbon */}
          <div className="resume-meta-ribbon glass-card">
            <div className="meta-ribbon-item">
              <GraduationCap size={20} className="text-cyan flex-shrink-0" />
              <div>
                <span className="meta-ribbon-label">Education</span>
                <span className="meta-ribbon-val">B.Tech AI &amp; DS &bull; 8.5 CGPA</span>
              </div>
            </div>
            <div className="meta-ribbon-item">
              <Award size={20} className="text-violet flex-shrink-0" />
              <div>
                <span className="meta-ribbon-label">Specialization</span>
                <span className="meta-ribbon-val">Data Analytics &bull; AI Developer</span>
              </div>
            </div>
            <div className="meta-ribbon-item">
              <MapPin size={20} className="text-pink flex-shrink-0" />
              <div>
                <span className="meta-ribbon-label">Location</span>
                <span className="meta-ribbon-val">Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>
            <div className="meta-ribbon-item">
              <FileText size={20} className="text-cyan flex-shrink-0" />
              <div>
                <span className="meta-ribbon-label">File Details</span>
                <span className="meta-ribbon-val">268 KB &bull; PDF &bull; Verified</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="glass-card resume-action-banner">
            <div className="resume-banner-text">
              <div className="resume-badge-row">
                <span className="chip chip-violet">Verified PDF</span>
                <span className="chip chip-cyan">Active Document</span>
              </div>
              <h3 className="resume-banner-title">{resumeData.fileName}</h3>
              <p className="resume-banner-sub">
                Targeting Data Analyst, AI Developer, and Data Scientist opportunities. 
                Complete with verified internship achievements, company initiatives, and credentials.
              </p>
            </div>

            <div className="resume-banner-buttons">
              <button
                onClick={handleDownload}
                className="btn btn-primary resume-action-btn"
                aria-label="Download Official Resume PDF"
                type="button"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>

              <a
                href={personalInfo.resumePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary resume-action-btn"
                aria-label="Open PDF in new tab"
              >
                <ExternalLink size={16} />
                <span>Open in New Tab</span>
              </a>

              <button
                onClick={handlePrint}
                className="btn btn-secondary resume-action-btn print-hide-btn"
                title="Print or Save as PDF via browser"
                type="button"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="glass-card download-toast animate-pulse-subtle" role="status">
              <CheckCircle2 size={18} className="text-cyan flex-shrink-0" />
              <span>
                <strong>{resumeData.fileName}</strong> has been downloaded to your device.
              </span>
            </div>
          )}

          {/* View Mode Switcher */}
          <div className="resume-tab-switcher">
            <button
              onClick={() => setActiveTab('pdf')}
              className={`resume-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
              type="button"
            >
              <FileText size={16} />
              <span>Embedded PDF Viewer</span>
            </button>
            <button
              onClick={() => setActiveTab('structured')}
              className={`resume-tab-btn ${activeTab === 'structured' ? 'active' : ''}`}
              type="button"
            >
              <Sparkles size={16} />
              <span>Structured Summary View</span>
            </button>
          </div>

          {/* Main Viewer Card */}
          {activeTab === 'pdf' ? (
            <div className="glass-card pdf-viewer-card">
              <div className="pdf-card-header">
                <div className="pdf-header-info">
                  <div className="pdf-format-badge">PDF</div>
                  <div>
                    <h4 className="pdf-doc-title">{resumeData.fileName}</h4>
                    <span className="pdf-doc-sub">Official Resume Document &bull; 268 KB &bull; Verified</span>
                  </div>
                </div>
                <div className="pdf-header-controls">
                  <button
                    onClick={handleDownload}
                    className="btn btn-sm btn-primary"
                    aria-label="Download PDF"
                    type="button"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                  <a
                    href={personalInfo.resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                    aria-label="Open PDF in new window"
                  >
                    <ExternalLink size={14} />
                    <span>Full Screen</span>
                  </a>
                </div>
              </div>

              {/* Embedded PDF Viewer Object & Frame */}
              <div className="pdf-embed-wrapper">
                <object
                  data={`${personalInfo.resumePdfUrl}#view=FitH&toolbar=1`}
                  type="application/pdf"
                  className="pdf-embedded-frame"
                  aria-label="Embedded Resume PDF of Viswanathan M"
                >
                  <iframe
                    src={`${personalInfo.resumePdfUrl}#view=FitH&toolbar=1`}
                    title="Embedded Resume PDF"
                    className="pdf-embedded-frame"
                  >
                    {/* Fallback for browsers or devices restricting inline frames */}
                    <div className="pdf-fallback-card">
                      <div className="fallback-icon-wrap">
                        <FileText size={48} className="text-violet" />
                      </div>
                      <h4>Official Resume PDF Ready</h4>
                      <p>
                        Your device or browser restricts inline PDF rendering. You can view or download the full resume document directly with the options below.
                      </p>
                      <div className="fallback-actions">
                        <button onClick={handleDownload} className="btn btn-primary" type="button">
                          <Download size={16} />
                          <span>Download Resume PDF</span>
                        </button>
                        <a
                          href={personalInfo.resumePdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                        >
                          <ExternalLink size={16} />
                          <span>Open PDF in Full Screen</span>
                        </a>
                      </div>
                    </div>
                  </iframe>
                </object>
              </div>

              <div className="pdf-card-footer">
                <span className="pdf-footer-hint">
                  Need direct access? <a href={personalInfo.resumePdfUrl} target="_blank" rel="noopener noreferrer">Open full PDF in a new tab</a> or click <strong>Download Resume</strong>.
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('structured')}
                  className="btn btn-ghost btn-sm"
                >
                  Switch to Text View &rarr;
                </button>
              </div>
            </div>
          ) : (
            /* Structured Resume Summary View */
            <div className="glass-card resume-document-preview">
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
                  <div className="doc-contact-item">
                    <span>Location:</span> {personalInfo.location}
                  </div>
                </div>
              </div>

              <div className="doc-divider" />

              {/* Education */}
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

              <div className="doc-footer-hint">
                <CheckCircle2 size={16} className="text-cyan flex-shrink-0" />
                <span>Directly mirrors the official PDF resume of M. Viswanathan.</span>
              </div>
            </div>
          )}

          {/* Quick Connect CTA at Bottom of Resume */}
          <div className="glass-card resume-cta-card">
            <div>
              <h3 className="resume-cta-title">Interested in discussing opportunities?</h3>
              <p className="resume-cta-text">
                I am actively interviewing for Data Analyst, AI Developer, and Data Scientist roles.
              </p>
            </div>
            <div className="resume-cta-buttons">
              <button
                onClick={() => onNavigate('home', 'contact')}
                className="btn btn-primary"
                type="button"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={handleDownload}
                className="btn btn-secondary"
                type="button"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}