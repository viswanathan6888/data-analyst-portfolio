import React from 'react';
import { achievementsData, resumeData, personalInfo } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import { Trophy, Award, Sparkles, ArrowUpRight } from './Icons';

export default function Achievements() {
  const techTickerItems = [
    'PYTHON',
    'SQL & POSTGRESQL',
    'POWER BI & DAX',
    'TENSORFLOW',
    'PYTORCH',
    'SCIKIT-LEARN',
    'LANGCHAIN & OLLAMA',
    'GOOGLE CLOUD PLATFORM',
    'PANDAS & NUMPY',
    'FASTAPI & REST APIS',
    'DOCKER',
    'GIT & GITHUB',
    'TABLEAU',
    'EXCEL ADVANCED'
  ];

  return (
    <section id="achievements" className="section achievements-section cinematic-section" aria-label="Honors & Achievements">
      {/* Tech Stack Logo & Tool Ticker Banner (Matching exact_018.jpg in Reference Video) */}
      <div className="tech-ticker-container" aria-hidden="true">
        <div className="tech-ticker-track">
          <div className="tech-ticker-inner">
            {techTickerItems.concat(techTickerItems).map((tech, idx) => (
              <span key={idx} className="tech-ticker-item">
                <span className="ticker-item-dot">&bull;</span>
                <span className="ticker-item-text">{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Exact 2-Column Recognition Layout (Matching exact_018.jpg) */}
        <div className="recognition-exact-grid">
          {/* Left Column: "THE WORK. THE RECOGNITION." with Giant 10.+ Stat */}
          <div className="recognition-left-column">
            <div className="section-kicker">
              <span className="kicker-num">07</span>
              <span className="kicker-sep">/</span>
              <span className="kicker-title">AWARDS &amp; MILESTONES</span>
            </div>

            <div className="recognition-title-stacked">
              <h2 className="recog-title-line white">THE WORK.</h2>
              <h2 className="recog-title-line red">THE RECOGNITION.</h2>
            </div>

            <p className="recognition-summary-text">
              Demonstrated track record of analytical rigor, academic excellence, 
              and technical execution across hackathons, production pipelines, and corporate internships.
            </p>

            {/* Giant Stat Block with Sparkle Crosshairs */}
            <div className="recognition-giant-stat-card">
              <span className="stat-crosshair top-left">+</span>
              <span className="stat-crosshair bottom-right">+</span>
              <div className="giant-stat-number-row">
                <span className="giant-stat-number">10<span className="giant-stat-plus">+</span></span>
                <span className="giant-stat-sparkle">&lowast;</span>
              </div>
              <span className="giant-stat-caption">VERIFIED PRODUCTION PROJECTS &amp; HONORS</span>
            </div>
          </div>

          {/* Right Column: Sleek List of Awards with Year Tags */}
          <div className="recognition-right-column">
            <div className="recognition-items-list">
              {achievementsData.map((item, idx) => (
                <div key={item.id || idx} className="recognition-editorial-row">
                  <div className="recog-row-indicator">
                    <span className="recog-row-num">0{idx + 1}</span>
                  </div>
                  <div className="recog-row-content">
                    <h3 className="recog-item-title">{item.title}</h3>
                    <span className="recog-item-event">{item.event}</span>
                    <p className="recog-item-desc">{item.description}</p>
                  </div>
                  <div className="recog-row-year-box">
                    <span className="recog-year-pill">2024 - 2026</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel for Extra Items if more exist */}
            <div className="recognition-carousel-wrap">
              <SectionCarousel
                items={achievementsData}
                itemsPerPage={{ desktop: 1, tablet: 1, mobile: 1 }}
                ariaLabel="Key Achievements Carousel"
                carouselId="achievements-carousel"
                renderItem={(item, idx) => (
                  <div
                    key={item.id}
                    className="cinematic-card achievement-card-cinematic"
                  >
                    <div className="achievement-icon-row">
                      <div className="achievement-trophy-box">
                        {idx === 0 ? (
                          <Trophy size={22} className="text-red" />
                        ) : (
                          <Award size={22} className="text-red" />
                        )}
                      </div>
                      <span className="achievement-year-tag">2024 - 2026</span>
                    </div>

                    <div className="achievement-body">
                      <h4 className="achievement-title-cinematic">{item.title}</h4>
                      <span className="achievement-event-cinematic">{item.event}</span>
                      <p className="achievement-desc-cinematic">{item.description}</p>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
