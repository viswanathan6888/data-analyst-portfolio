import React from 'react';
import { achievementsData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import { Trophy, Award } from './Icons';

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements-section" aria-label="Honors & Achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Achievements</h2>
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
              className={`glass-card achievement-card ${idx === 0 ? 'highlight-featured' : ''}`}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="achievement-icon-row">
                <div className="achievement-trophy-wrap">
                  {idx === 0 ? (
                    <Trophy size={26} className="text-cyan trophy-gold" />
                  ) : (
                    <Award size={26} className="text-violet" />
                  )}
                </div>
              </div>

              <div className="achievement-body" style={{ flex: '1 1 auto' }}>
                <h3 className="achievement-title">{item.title}</h3>
                <span className="achievement-event">{item.event}</span>
                <p className="achievement-desc">{item.description}</p>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
