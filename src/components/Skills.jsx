import React, { useState } from 'react';
import { skillsCategories } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Code2,
  Database,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Terminal,
  Cpu,
  Sparkles,
  Bot,
  Share2,
  Monitor,
  CheckCircle2,
  Layers,
  Workflow
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
        return <Database size={18} className="text-cyan" />;
      case 'ai-ml':
        return <Bot size={18} className="text-violet" />;
      case 'data-engineering':
        return <Layers size={18} className="text-cyan" />;
      case 'api-marketing':
        return <Share2 size={18} className="text-violet" />;
      case 'dev-design':
        return <Monitor size={18} className="text-cyan" />;
      case 'tools':
      default:
        return <Code2 size={18} className="text-violet" />;
    }
  };

  return (
    <section id="skills" className="section skills-section" aria-label="Skills & Capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Skills & <span className="text-gradient">Competencies</span>
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-filter-container">
          <div className="skills-filter-pill-group" role="tablist" aria-label="Skill categories">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`filter-btn ${activeCategory === 'all' ? 'filter-btn-active' : ''}`}
            >
              <span>All Categories</span>
            </button>

            {skillsCategories.map((cat) => (
              <button
                key={cat.slug}
                role="tab"
                aria-selected={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`filter-btn ${activeCategory === cat.slug ? 'filter-btn-active' : ''}`}
              >
                {getCategoryIcon(cat.slug)}
                <span>{cat.category.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Skills Showcase */}
        <div className="skills-groups-wrapper">
          <SectionCarousel
            items={filteredCategories}
            itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
            ariaLabel="Skill Categories Carousel"
            carouselId="skill-categories-carousel"
            renderItem={(group) => (
              <div
                key={group.slug}
                className="glass-card skills-category-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.5rem',
                  borderRadius: '18px'
                }}
              >
                <div className="category-group-header" style={{ marginBottom: '1rem' }}>
                  <div className="category-heading-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {getCategoryIcon(group.slug)}
                    <h3 className="category-title" style={{ fontSize: '1.15rem', margin: 0 }}>{group.category}</h3>
                  </div>
                </div>

                <div
                  className="skills-resume-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '0.75rem',
                    flex: '1 1 auto'
                  }}
                >
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={skill.name}
                      className={`glass-card skill-card-resume ${sIdx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
                      style={{ padding: '0.85rem 1rem', height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <div className="skill-card-top-resume">
                        <h4 className="skill-name-resume" style={{ fontSize: '0.92rem' }}>{skill.name}</h4>
                        <CheckCircle2 size={15} className="text-cyan flex-shrink-0" />
                      </div>
                      <p className="skill-focus-text" style={{ fontSize: '0.78rem', flex: '1 1 auto', margin: '0.35rem 0' }}>
                        {skill.focus}
                      </p>
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
