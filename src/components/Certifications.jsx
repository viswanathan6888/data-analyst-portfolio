import React from 'react';
import { certificationsData } from '../data/portfolioData';
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Sparkles,
  Info
} from './Icons';

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications-section" aria-label="Certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-header slide-header-compact">
          <div className="section-tag section-tag-cyan">
            <Award size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="text-gradient">Training</span>
          </h2>
          <p className="section-subtitle">
            Formal professional certifications and skill accreditations directly listed on my verified resume.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certificationsData.map((cert, idx) => (
            <div
              key={cert.id}
              className={`glass-card cert-card ${idx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
            >
              <div className="cert-card-top">
                <div className="cert-icon-wrap">
                  <ShieldCheck size={24} className="text-cyan" />
                </div>
                <span className="chip chip-violet">{cert.badge}</span>
              </div>

              <div className="cert-card-body">
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
                <p className="cert-description">{cert.description}</p>
              </div>

              <div className="cert-card-footer">
                <span className="cert-status-badge">
                  <CheckCircle2 size={14} className="text-cyan" />
                  <span>Resume Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Factual Integrity Banner */}
        <div className="glass-card cert-notice-banner">
          <Info size={16} className="text-cyan" />
          <span>
            <strong>Authentic Accreditations:</strong> All certifications are directly mapped to my original resume without invented dates, false IDs, or exaggerated claims.
          </span>
        </div>
      </div>
    </section>
  );
}