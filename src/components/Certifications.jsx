import React from 'react';
import { certificationsData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import { ShieldCheck } from './Icons';

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications-section" aria-label="Certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Certifications</h2>
        </div>

        {/* Certifications Carousel */}
        <SectionCarousel
          items={certificationsData}
          itemsPerPage={{ desktop: 2, tablet: 2, mobile: 1 }}
          ariaLabel="Verified Certifications Carousel"
          carouselId="certifications-carousel"
          renderItem={(cert, idx) => (
            <div
              key={cert.id}
              className={`glass-card cert-card ${idx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="cert-card-top">
                <div className="cert-icon-wrap">
                  <ShieldCheck size={24} className="text-cyan" />
                </div>
              </div>

              <div className="cert-card-body" style={{ flex: '1 1 auto' }}>
                <h3 className="cert-title">{cert.title}</h3>
                <span className="cert-issuer">{cert.issuer}</span>
                <p className="cert-description">{cert.description}</p>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
