import React, { useState } from 'react';
import { internshipExperience, companyProjectExperience } from '../data/portfolioData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Info,
  Layers,
  Building,
  Workflow,
  ChevronLeft,
  ChevronRight
} from './Icons';

export default function Experience({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('internships'); // 'internships' | 'company'
  const [internshipPage, setInternshipPage] = useState(0);
  const [companyPage, setCompanyPage] = useState(0);

  const ITEMS_PER_PAGE = 2;

  // Internships pagination
  const totalInternshipPages = Math.ceil(internshipExperience.length / ITEMS_PER_PAGE);
  const displayedInternships = internshipExperience.slice(
    internshipPage * ITEMS_PER_PAGE,
    (internshipPage + 1) * ITEMS_PER_PAGE
  );

  // Company projects pagination
  const totalCompanyPages = Math.ceil(companyProjectExperience.length / ITEMS_PER_PAGE);
  const displayedCompanyProjects = companyProjectExperience.slice(
    companyPage * ITEMS_PER_PAGE,
    (companyPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div id="experience" className="slide-content-container experience-slide-layout" aria-label="Work & Project Experience">
      <div className="container">
        {/* Compact Section Header */}
        <div className="section-header slide-header-compact">
          <div className="section-tag section-tag-violet">
            <Briefcase size={13} />
            <span>Professional Journey</span>
          </div>
          <h2 className="section-title">
            Work & <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle">
            5 verified internships across data analytics & ML alongside 5 specialized client company initiatives.
          </p>
        </div>

        {/* Tab Switcher & Sub-Pagination Bar */}
        <div className="experience-controls-bar">
          <div className="experience-filter-tabs slide-controls-compact" role="tablist" aria-label="Experience view switcher">
            <button
              role="tab"
              aria-selected={activeTab === 'internships'}
              onClick={() => setActiveTab('internships')}
              className={`filter-btn ${activeTab === 'internships' ? 'filter-btn-active' : ''}`}
            >
              <Briefcase size={14} />
              <span>Internships (Page 1)</span>
              <span className="filter-count">5</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'company'}
              onClick={() => setActiveTab('company')}
              className={`filter-btn ${activeTab === 'company' ? 'filter-btn-active' : ''}`}
            >
              <Building size={14} />
              <span>Company Projects (Page 3)</span>
              <span className="filter-count">5</span>
            </button>
          </div>

          {/* Sub-pagination navigation */}
          {activeTab === 'internships' && (
            <div className="experience-sub-pagination">
              <button
                type="button"
                onClick={() => setInternshipPage(Math.max(0, internshipPage - 1))}
                disabled={internshipPage === 0}
                className="subnav-mini-btn"
                aria-label="Previous roles"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="subnav-step-indicator">
                {internshipPage + 1} / {totalInternshipPages}
              </span>
              <button
                type="button"
                onClick={() => setInternshipPage(Math.min(totalInternshipPages - 1, internshipPage + 1))}
                disabled={internshipPage === totalInternshipPages - 1}
                className="subnav-mini-btn"
                aria-label="Next roles"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="experience-sub-pagination">
              <button
                type="button"
                onClick={() => setCompanyPage(Math.max(0, companyPage - 1))}
                disabled={companyPage === 0}
                className="subnav-mini-btn"
                aria-label="Previous company projects"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="subnav-step-indicator">
                {companyPage + 1} / {totalCompanyPages}
              </span>
              <button
                type="button"
                onClick={() => setCompanyPage(Math.min(totalCompanyPages - 1, companyPage + 1))}
                disabled={companyPage === totalCompanyPages - 1}
                className="subnav-mini-btn"
                aria-label="Next company projects"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* View 1: Internships Display (2 per page) */}
        {activeTab === 'internships' && (
          <div className="experience-deck-grid">
            {displayedInternships.map((exp) => (
              <div key={exp.company} className="glass-card experience-card-deck">
                <div className="experience-card-header">
                  <div className="exp-title-group">
                    <div className="exp-company-row">
                      <span className="exp-company">{exp.company}</span>
                      <span className="chip chip-violet">{exp.type}</span>
                      <span className="chip chip-cyan">{exp.badge}</span>
                    </div>
                    <h4 className="exp-role">{exp.role}</h4>
                  </div>

                  <div className="exp-meta-group">
                    <div className="exp-meta-item">
                      <Calendar size={13} className="text-cyan" />
                      <span className="editable-placeholder-tag">{exp.period}</span>
                    </div>
                  </div>
                </div>

                <p className="exp-summary">{exp.summary}</p>

                <ul className="exp-bullet-list">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="exp-bullet-item">
                      <CheckCircle2 size={13} className="bullet-icon" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tech-stack">
                  <span className="tech-stack-label">Stack:</span>
                  <div className="tech-tags-wrap">
                    {exp.tech.map((t) => (
                      <span key={t} className="chip chip-sm chip-subtle">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Company Projects Display (2 per page) */}
        {activeTab === 'company' && (
          <div className="experience-deck-grid">
            {displayedCompanyProjects.map((cp) => (
              <div key={cp.title} className="glass-card company-project-card-deck">
                <div className="cp-header-row">
                  <div className="cp-badge-wrap">
                    <span className="chip chip-cyan">{cp.category}</span>
                    <span className="cp-company-label">{cp.company}</span>
                  </div>
                  <span className="cp-tag-metric">{cp.tag}</span>
                </div>

                <h4 className="cp-title">{cp.title}</h4>
                <p className="cp-summary">{cp.summary}</p>

                <ul className="exp-bullet-list">
                  {cp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="exp-bullet-item">
                      <CheckCircle2 size={13} className="bullet-icon" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tech-stack">
                  <span className="tech-stack-label">Technologies:</span>
                  <div className="tech-tags-wrap">
                    {cp.tech.map((t) => (
                      <span key={t} className="chip chip-sm chip-subtle">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
