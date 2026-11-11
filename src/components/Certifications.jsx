import React from 'react';
import { certificationsData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import { ShieldCheck } from './Icons';

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications-section cinematic-section" aria-label="Certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">06</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">CREDENTIALS</span>
          </div>
          <h2 className="section-title cinematic-title">
            VERIFIED <span className="text-red-accent">CERTIFICATIONS.</span>
          </h2>
        </div>

        {/* Certifications Carousel */}
        <SectionCarousel
          items={certificationsData}
          itemsPerPage={{ desktop: 2, tablet: 2, mobile: 1 }}
          ariaLabel="Verified Certifications Carousel"
          carouselId="certifications-carousel"
          renderItem={(cert) => (
            <div
              key={cert.id}
              className="cinematic-card cert-card-cinematic"
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="cert-card-top">
                <div className="cert-icon-wrap-cinematic">
                  <ShieldCheck size={22} className="text-red" />
                </div>
                <span className="cert-status-badge">VERIFIED</span>
              </div>

              <div className="cert-card-body" style={{ flex: '1 1 auto' }}>
                <h3 className="cert-title-cinematic">{cert.title}</h3>
                <span className="cert-issuer-cinematic">{cert.issuer}</span>
                <p className="cert-description-cinematic">{cert.description}</p>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
