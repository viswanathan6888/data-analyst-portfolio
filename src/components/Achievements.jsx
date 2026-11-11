import React from 'react';
import { achievementsData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import { Trophy, Award } from './Icons';

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements-section cinematic-section" aria-label="Honors & Achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">07</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">HONORS &amp; RECOGNITION</span>
          </div>
          <h2 className="section-title cinematic-title">
            ACHIEVEMENTS &amp; <span className="text-red-accent">AWARDS.</span>
          </h2>
        </div>

        {/* Achievements Carousel */}
        <SectionCarousel
          items={achievementsData}
          itemsPerPage={{ desktop: 2, tablet: 2, mobile: 1 }}
          ariaLabel="Key Achievements Carousel"
          carouselId="achievements-carousel"
          renderItem={(item, idx) => (
            <div
              key={item.id}
              className="cinematic-card achievement-card-cinematic"
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="achievement-icon-row">
                <div className="achievement-trophy-box">
                  {idx === 0 ? (
                    <Trophy size={24} className="text-red" />
                  ) : (
                    <Award size={24} className="text-red" />
                  )}
                </div>
                <span className="achievement-year-tag">2024 - 2026</span>
              </div>

              <div className="achievement-body" style={{ flex: '1 1 auto' }}>
                <h3 className="achievement-title-cinematic">{item.title}</h3>
                <span className="achievement-event-cinematic">{item.event}</span>
                <p className="achievement-desc-cinematic">{item.description}</p>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
