import React, { useState } from 'react';
import { internshipExperience, companyProjectExperience, personalInfo, resumeData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Building,
  ArrowUpRight,
  Download
} from './Icons';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('all');

  const careerHighlights = [
    {
      title: 'Real-Time Telemetry & Data Modeling',
      desc: 'Engineered robust SQL pipelines and Power Query automated transformation routines saving hours of manual reporting.'
    },
    {
      title: 'Predictive Intelligence & Forecasting',
      desc: 'Trained regression and classification models with Scikit-learn and deep neural networks for accurate demand predictions.'
    },
    {
      title: 'Executive Dashboards & BI Strategy',
      desc: 'Designed high-impact Power BI and Tableau dashboards tracking revenue, campaign ROI, and customer churn.'
    },
    {
      title: 'Autonomous AI & Local LLM Systems',
      desc: 'Integrated local LLM agents (Ollama + Qwen 2.5) for secure offline document reasoning and SQL query translation.'
    }
  ];

  return (
    <section id="experience" className="section experience-section cinematic-section" aria-label="Work & Project Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">04</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">CAREER TRAJECTORY</span>
          </div>
          <h2 className="section-title cinematic-title">
            WORK &amp; <span className="text-red-accent">INTERNSHIPS.</span>
          </h2>
        </div>

        {/* Editorial 2-Column Banner (Matching exact_045.jpg in Reference Video) */}
        <div className="experience-editorial-banner">
          <div className="banner-left-timeline-glance">
            <span className="timeline-kicker">TIMELINE SUMMARY</span>
            <div className="timeline-glance-list">
              <div className="glance-item active">
                <span className="glance-dot red" />
                <span className="glance-date">2024 - PRESENT</span>
                <span className="glance-role">Data Analyst &amp; AI Developer</span>
              </div>
              <div className="glance-item">
                <span className="glance-dot" />
                <span className="glance-date">2023 - 2024</span>
                <span className="glance-role">5 Professional Internships Completed</span>
              </div>
              <div className="glance-item">
                <span className="glance-dot" />
                <span className="glance-date">2022 - 2026</span>
                <span className="glance-role">B.Tech AI &amp; Data Science (8.5 CGPA)</span>
              </div>
            </div>
          </div>

          <div className="banner-right-philosophy">
            <div className="philosophy-title-stacked">
              <span className="philosophy-line white">SMALL DETAILS.</span>
              <span className="philosophy-line red">BIG IMPACT.</span>
            </div>
            <p className="philosophy-desc">
              Every data point, schema optimization, and hyperparameter tuning directly affects business decisions. 
              Focused on reliable delivery and scalable engineering.
            </p>
          </div>
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

                  <div className="exp-stack-row">
                    {exp.technologies?.map((tech) => (
                      <span key={tech} className="chip-cinematic">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            />
          </div>
        )}

        {/* Section 2: Company Projects Experience */}
        {(activeTab === 'all' || activeTab === 'company') && (
          <div className="experience-subgroup" style={{ marginTop: '2.5rem' }}>
            <div className="subgroup-title-row cinematic-subgroup-title">
              <span className="subgroup-red-bullet">&bull;</span>
              <h3 className="subgroup-title">Company Projects &amp; Deployments</h3>
            </div>

            <SectionCarousel
              items={companyProjectExperience}
              itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
              ariaLabel="Company Projects Carousel"
              carouselId="company-projects-carousel"
              renderItem={(exp, index) => (
                <div
                  key={exp.company + index}
                  className="cinematic-card experience-card"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="experience-card-header">
                    <div className="exp-title-group">
                      <span className="exp-company-cinematic">{exp.company}</span>
                      <h4 className="exp-role-cinematic">{exp.projectTitle}</h4>
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
                    {exp.achievements?.map((ach, aIdx) => (
                      <li key={aIdx} className="exp-bullet-item cinematic-bullet">
                        <CheckCircle2 size={15} className="bullet-icon text-red" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="exp-stack-row">
                    {exp.stack?.map((tech) => (
                      <span key={tech} className="chip-cinematic">
                        {tech}
                      </span>
                    ))}
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
