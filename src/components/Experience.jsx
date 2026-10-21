import React from 'react';
import { experienceData } from '../data/portfolioData';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Info
} from './Icons';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-violet">
            <Briefcase size={14} />
            <span>Professional Journey</span>
          </div>
          <h2 className="section-title">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on data analytics internships delivering exploratory data analysis, 
            KPI tracking dashboards, and automated reporting workflows.
          </p>
        </div>

        {/* Note on editable placeholders */}
        <div className="glass-card experience-notice-card">
          <Info size={18} className="text-cyan notice-icon" />
          <p className="notice-text">
            <strong>Editable Tenure & Responsibilities:</strong> Dates and role details below use clear placeholders 
            <code>[Month, Year]</code> and neutral analytics workflows. Tailor them anytime in <code>src/data/portfolioData.js</code>.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline">
          {experienceData.map((exp, index) => (
            <div key={exp.company} className="experience-item">
              {/* Timeline Connector Line & Node */}
              <div className="timeline-marker">
                <div className="marker-dot">
                  <span className="marker-inner-dot" />
                </div>
                {index < experienceData.length - 1 && <div className="marker-line" />}
              </div>

              {/* Experience Card */}
              <div className="glass-card experience-card">
                <div className="experience-card-header">
                  <div className="exp-title-group">
                    <div className="exp-company-row">
                      <span className="exp-company">{exp.company}</span>
                      <span className="chip chip-violet">{exp.type}</span>
                      <span className="chip chip-cyan">{exp.badge}</span>
                    </div>
                    {/* Consistent Role Title */}
                    <h3 className="exp-role">{exp.role}</h3>
                  </div>

                  <div className="exp-meta-group">
                    <div className="exp-meta-item">
                      <Calendar size={14} className="text-cyan" />
                      <span className="editable-placeholder-tag">{exp.period}</span>
                    </div>
                    <div className="exp-meta-item">
                      <MapPin size={14} className="text-muted" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="exp-summary">{exp.summary}</p>

                {/* Neutral Non-Invented Responsibilities */}
                <ul className="exp-bullet-list">
                  {exp.bulletPoints.map((bullet, bIdx) => (
                    <li key={bIdx} className="exp-bullet-item">
                      <CheckCircle2 size={16} className="bullet-icon text-cyan" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div className="exp-tech-stack">
                  <span className="tech-stack-label">Tools & Frameworks:</span>
                  <div className="tech-pills-list">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
