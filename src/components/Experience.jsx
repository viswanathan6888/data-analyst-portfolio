import React, { useState } from 'react';
import { internshipExperience, companyProjectExperience } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Info,
  Layers,
  Building,
  Workflow
} from './Icons';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="experience" className="section experience-section" aria-label="Work & Project Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Work & <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {/* View Switcher Tabs */}
        <div className="experience-filter-tabs" role="tablist" aria-label="Experience view switcher">
          <button
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            className={`filter-btn ${activeTab === 'all' ? 'filter-btn-active' : ''}`}
          >
            <span>All Experience</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'internships'}
            onClick={() => setActiveTab('internships')}
            className={`filter-btn ${activeTab === 'internships' ? 'filter-btn-active' : ''}`}
          >
            <Briefcase size={14} />
            <span>Internships</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'company'}
            onClick={() => setActiveTab('company')}
            className={`filter-btn ${activeTab === 'company' ? 'filter-btn-active' : ''}`}
          >
            <Building size={14} />
            <span>Company Projects</span>
          </button>
        </div>

        {/* Section 1: Professional Internships */}
        {(activeTab === 'all' || activeTab === 'internships') && (
          <div className="experience-subgroup">
            <div className="subgroup-title-row">
              <div className="subgroup-title-left">
                <Briefcase size={20} className="text-cyan" />
                <h3 className="subgroup-title">Professional Internships</h3>
              </div>
            </div>

            <SectionCarousel
              items={internshipExperience}
              itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
              ariaLabel="Professional Internships Carousel"
              carouselId="internships-carousel"
              renderItem={(exp, index) => (
                <div
                  key={exp.company + index}
                  className="glass-card experience-card"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="experience-card-header">
                    <div className="exp-title-group">
                      <div className="exp-company-row">
                        <span className="exp-company">{exp.company}</span>
                      </div>
                      <h4 className="exp-role">{exp.role}</h4>
                    </div>

                    <div className="exp-meta-group">
                      <div className="exp-meta-item">
                        <Calendar size={14} className="text-cyan" />
                        <span className="editable-placeholder-tag">{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <p className="exp-summary">{exp.summary}</p>

                  <ul className="exp-bullet-list" style={{ flex: '1 1 auto' }}>
                    {exp.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx} className="exp-bullet-item">
                        <CheckCircle2 size={16} className="bullet-icon text-cyan" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="exp-tech-stack">
                    <span className="tech-stack-label">Core Tech:</span>
                    <div className="tech-pills-list">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        )}

        {/* Section 2: Company Project Experience */}
        {(activeTab === 'all' || activeTab === 'company') && (
          <div className="experience-subgroup company-projects-subgroup">
            <div className="subgroup-title-row">
              <div className="subgroup-title-left">
                <Building size={20} className="text-violet" />
                <div>
                  <h3 className="subgroup-title">Company Project Experience</h3>
                  <span className="company-client-note">Aram Pvt. Ltd &bull; Eagle Eye SafDrive Pvt. Ltd &bull; AR4 Tech Pvt. Ltd</span>
                </div>
              </div>
            </div>

            <SectionCarousel
              items={companyProjectExperience}
              itemsPerPage={{ desktop: 2, tablet: 2, mobile: 1 }}
              ariaLabel="Company Projects Carousel"
              carouselId="company-projects-carousel"
              renderItem={(proj, idx) => (
                <div
                  key={proj.title}
                  className={`glass-card company-project-card ${idx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="cp-header">
                    <h4 className="cp-title">{proj.title}</h4>
                    <span className="cp-company-label">{proj.company}</span>
                  </div>

                  <p className="cp-summary">{proj.summary}</p>

                  <ul className="cp-bullet-list" style={{ flex: '1 1 auto' }}>
                    {proj.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="cp-bullet-item">
                        <CheckCircle2 size={15} className="text-cyan bullet-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="cp-tech-footer">
                    <span className="tech-stack-label">Stack:</span>
                    <div className="tech-pills-list">
                      {proj.technologies.map((t) => (
                        <span key={t} className="chip chip-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        )}
      </div>
    </section>
  );
}
