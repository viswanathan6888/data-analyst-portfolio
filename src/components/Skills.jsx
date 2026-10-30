import React, { useState } from 'react';
import { skillsCategories } from '../data/portfolioData';
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
          <div className="section-tag section-tag-cyan">
            <Code2 size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Competencies</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive skill set directly grounded in my resume across data analytics, business intelligence, 
            machine learning, big data platforms, and API integrations.
          </p>
        </div>

        {/* Core Expertise Banner */}
        <div className="glass-card core-expertise-banner" style={{ marginBottom: '2.5rem', padding: '1.75rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Sparkles size={18} className="text-cyan" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              Core Expertise
            </h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span className="chip chip-cyan" style={{ fontSize: '0.875rem', padding: '0.4rem 0.9rem', fontWeight: 700 }}>
              Data Analytics &amp; Business Intelligence
            </span>
            <span className="chip chip-violet" style={{ fontSize: '0.875rem', padding: '0.4rem 0.9rem', fontWeight: 700 }}>
              Python, SQL &amp; Excel
            </span>
            <span className="chip chip-cyan" style={{ fontSize: '0.875rem', padding: '0.4rem 0.9rem', fontWeight: 700 }}>
              Power BI, Tableau &amp; Power Query
            </span>
            <span className="chip chip-pink" style={{ fontSize: '0.875rem', padding: '0.4rem 0.9rem', fontWeight: 700 }}>
              AI Applications, LLMs, Ollama &amp; Qwen
            </span>
            <span className="chip chip-violet" style={{ fontSize: '0.875rem', padding: '0.4rem 0.9rem', fontWeight: 700 }}>
              API Integration &amp; Dashboard Development
            </span>
          </div>
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
              <span className="filter-count">6</span>
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
                <span className="filter-count">{cat.skills.length}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categorized Skills Showcase */}
        <div className="skills-groups-wrapper">
          {filteredCategories.map((group) => (
            <div key={group.slug} className="skills-category-group">
              <div className="category-group-header">
                <div className="category-heading-wrap">
                  {getCategoryIcon(group.slug)}
                  <h3 className="category-title">{group.category}</h3>
                  <span className="category-badge chip chip-cyan">
                    {group.skills.length} Skills
                  </span>
                </div>
                <p className="category-description">{group.description}</p>
              </div>

              <div className="skills-resume-grid">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className={`glass-card skill-card-resume ${sIdx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
                  >
                    <div className="skill-card-top-resume">
                      <h4 className="skill-name-resume">{skill.name}</h4>
                      <CheckCircle2 size={15} className="text-cyan" />
                    </div>
                    <p className="skill-focus-text">{skill.focus}</p>
                    <span className="chip chip-sm chip-subtle">{group.category.split('&')[0].trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dual Stack Architecture Summary */}
        <div className="glass-card skill-architecture-box">
          <div className="architecture-grid">
            <div className="architecture-col">
              <div className="architecture-col-header">
                <Database size={18} className="text-cyan" />
                <h4 className="architecture-heading">Data Analytics & Business Intelligence</h4>
              </div>
              <p className="architecture-text">
                Power BI, Tableau, Power Query, Excel, SQL, data analysis, data visualization, KPI reporting, and business analytics. 
                Focus on normalized dimensional modeling, interactive storytelling, and automated ETL.
              </p>
            </div>

            <div className="architecture-divider" />

            <div className="architecture-col">
              <div className="architecture-col-header">
                <Bot size={18} className="text-violet" />
                <h4 className="architecture-heading">AI, Machine Learning & Data Engineering</h4>
              </div>
              <p className="architecture-text">
                Python, TensorFlow/Keras, PyTorch, Scikit-learn, LangChain, Ollama, Qwen 2.5, Claude, Meta Marketing API, BigQuery, and Hadoop. 
                Emphasis on private on-premise inference, automated pipelines, and full-stack dashboards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
