import React from 'react';
import { achievementsData } from '../data/portfolioData';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Info
} from './Icons';

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements-section" aria-label="Honors & Achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-violet">
            <Trophy size={14} />
            <span>Honors & Recognition</span>
          </div>
          <h2 className="section-title">
            Key <span className="text-gradient">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Academic symposium accolades, creative 3D visual design awards, and recognized technical webinar participation.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {achievementsData.map((item, idx) => (
            <div
              key={item.id}
              className={`glass-card achievement-card ${idx === 0 ? 'highlight-featured' : ''}`}
            >
              <div className="achievement-icon-row">
                <div className="achievement-trophy-wrap">
                  {idx === 0 ? (
                    <Trophy size={26} className="text-cyan trophy-gold" />
                  ) : (
                    <Award size={26} className="text-violet" />
                  )}
                </div>
                <span className="chip chip-cyan">{item.badge}</span>
              </div>

              <div className="achievement-body">
                <h3 className="achievement-title">{item.title}</h3>
                <span className="achievement-event">{item.event}</span>
                <p className="achievement-desc">{item.description}</p>
              </div>

              <div className="achievement-footer">
                <div className="achievement-check-row">
                  <CheckCircle2 size={14} className="text-cyan" />
                  <span>Resume Documented Honor</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
