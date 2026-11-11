import React, { useState } from 'react';
import { skillsCategories } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Code2,
  Database,
  BarChart3,
  Bot,
  Share2,
  Monitor,
  CheckCircle2,
  Layers
} from './Icons';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories =
    activeCategory === 'all'
      ? skillsCategories
      : skillsCategories.filter((group) => group.slug === activeCategory);

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'analytics-bi':
        return <Database size={18} className="text-red" />;
      case 'ai-ml':
        return <Bot size={18} className="text-red" />;
      case 'data-engineering':
        return <Layers size={18} className="text-red" />;
      case 'api-marketing':
        return <Share2 size={18} className="text-red" />;
      case 'dev-design':
        return <Monitor size={18} className="text-red" />;
      case 'tools':
      default:
        return <Code2 size={18} className="text-red" />;
    }
  };

  return (
    <section id="skills" className="section skills-section cinematic-section" aria-label="Skills & Capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">03</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">TECHNICAL ARSENAL</span>
          </div>
          <h2 className="section-title cinematic-title">
            SKILLS &amp; <span className="text-red-accent">COMPETENCIES.</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-filter-container">
          <div className="skills-filter-pill-group cinematic-filter-group" role="tablist" aria-label="Skill categories">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`cinematic-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            >
              <span>All Categories</span>
            </button>

            {skillsCategories.map((cat) => (
              <button
                key={cat.slug}
                role="tab"
                aria-selected={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`cinematic-filter-btn ${activeCategory === cat.slug ? 'active' : ''}`}
              >
                {getCategoryIcon(cat.slug)}
                <span>{cat.category.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Skills Showcase with SectionCarousel */}
        <div className="skills-groups-wrapper">
          <SectionCarousel
            items={filteredCategories}
            itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
            ariaLabel="Skill Categories Carousel"
            carouselId="skill-categories-carousel"
            renderItem={(group) => (
              <div
                key={group.slug}
                className="cinematic-card skills-category-card"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div className="skills-card-header">
                  <div className="skills-header-icon-box">
                    {getCategoryIcon(group.slug)}
                  </div>
                  <div>
                    <h3 className="skills-group-title">{group.category}</h3>
                    <p className="skills-group-desc">{group.description}</p>
                  </div>
                </div>

                <div className="skills-list" style={{ flex: '1 1 auto' }}>
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-chip-cinematic">
                      <span className="chip-red-pip" />
                      <span className="chip-label">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
