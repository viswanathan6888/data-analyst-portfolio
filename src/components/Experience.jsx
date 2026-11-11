import React, { useState } from 'react';
import { internshipExperience, companyProjectExperience } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Building
} from './Icons';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="experience" className="section experience-section cinematic-section" aria-label="Work & Project Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">04</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="section-title cinematic-title">
            WORK &amp; <span className="text-red-accent">INTERNSHIPS.</span>
          </h2>
        </div>

        {/* View Switcher Tabs */}
        <div className="experience-filter-tabs cinematic-filter-group" role="tablist" aria-label="Experience view switcher">
          <button
            role="tab"
            aria-selected={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
            className={`cinematic-filter-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            <span>All Experience</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'internships'}
            onClick={() => setActiveTab('internships')}
            className={`cinematic-filter-btn ${activeTab === 'internships' ? 'active' : ''}`}
          >
            <Briefcase size={14} />
            <span>Internships (5)</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'company'}
            onClick={() => setActiveTab('company')}
            className={`cinematic-filter-btn ${activeTab === 'company' ? 'active' : ''}`}
          >
            <Building size={14} />
            <span>Company Projects (5)</span>
          </button>
        </div>

        {/* Section 1: Professional Internships */}
        {(activeTab === 'all' || activeTab === 'internships') && (
          <div className="experience-subgroup">
            <div className="subgroup-title-row cinematic-subgroup-title">
              <span className="subgroup-red-bullet">&bull;</span>
              <h3 className="subgroup-title">Professional Internships</h3>
            </div>

            <SectionCarousel
              items={internshipExperience}
              itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
              ariaLabel="Professional Internships Carousel"
              carouselId="internships-carousel"
              renderItem={(exp, index) => (
                <div
                  key={exp.company + index}
                  className="cinematic-card experience-card"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="experience-card-header">
                    <div className="exp-title-group">
                      <span className="exp-company-cinematic">{exp.company}</span>
                      <h4 className="exp-role-cinematic">{exp.role}</h4>
                    </div>

                    <div className="exp-meta-group">
                      <div className="exp-meta-item cinematic-period-pill">
                        <Calendar size={13} className="text-red" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <p className="exp-summary cinematic-body">{exp.summary}</p>

                  <ul className="exp-bullet-list" style={{ flex: '1 1 auto' }}>
                    {exp.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx} className="exp-bullet-item cinematic-bullet">
                        <CheckCircle2 size={15} className="bullet-icon text-red" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="exp-tech-stack">
                    <span className="tech-stack-label">Core Stack:</span>
                    <div className="tech-pills-list">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="chip-cinematic">
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
          <div className="experience-subgroup company-projects-subgroup" style={{ marginTop: '2.5rem' }}>
            <div className="subgroup-title-row cinematic-subgroup-title">
              <span className="subgroup-red-bullet">&bull;</span>
              <div>
                <h3 className="subgroup-title">Company Project Experience</h3>
                <span className="company-client-note">Aram Pvt. Ltd &bull; Eagle Eye SafDrive Pvt. Ltd &bull; AR4 Tech Pvt. Ltd</span>
              </div>
            </div>

            <SectionCarousel
              items={companyProjectExperience}
              itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
              ariaLabel="Company Projects Carousel"
              carouselId="company-projects-carousel"
              renderItem={(proj) => (
                <div
                  key={proj.title}
                  className="cinematic-card company-project-card"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="cp-header">
                    <span className="cp-company-label-cinematic">{proj.company}</span>
                    <h4 className="cp-title-cinematic">{proj.title}</h4>
                  </div>

                  <p className="cp-summary cinematic-body">{proj.summary}</p>

                  <ul className="cp-bullet-list" style={{ flex: '1 1 auto' }}>
                    {proj.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="cp-bullet-item cinematic-bullet">
                        <CheckCircle2 size={15} className="text-red bullet-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="cp-tech-footer">
                    <span className="tech-stack-label">Stack:</span>
                    <div className="tech-pills-list">
                      {proj.technologies.map((t) => (
                        <span key={t} className="chip-cinematic">
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
