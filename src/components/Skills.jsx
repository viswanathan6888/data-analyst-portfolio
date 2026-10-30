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
  Workflow,
  ChevronLeft,
  ChevronRight,
  Info,
  X
} from './Icons';

export default function Skills({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('analytics-bi');
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'analytics-bi':
        return <Database size={16} className="text-cyan" />;
      case 'ai-ml':
        return <Bot size={16} className="text-violet" />;
      case 'data-engineering':
        return <Layers size={16} className="text-cyan" />;
      case 'api-marketing':
        return <Share2 size={16} className="text-violet" />;
      case 'dev-design':
        return <Monitor size={16} className="text-cyan" />;
      case 'tools':
      default:
        return <Code2 size={16} className="text-violet" />;
    }
  };

  const currentCategoryIndex = skillsCategories.findIndex((c) => c.slug === activeCategory);
  const currentCategory = currentCategoryIndex !== -1 ? skillsCategories[currentCategoryIndex] : null;

  const handlePrevCategory = () => {
    if (activeCategory === 'overview') {
      setActiveCategory(skillsCategories[skillsCategories.length - 1].slug);
    } else if (currentCategoryIndex > 0) {
      setActiveCategory(skillsCategories[currentCategoryIndex - 1].slug);
    } else {
      setActiveCategory('overview');
    }
  };

  const handleNextCategory = () => {
    if (activeCategory === 'overview') {
      setActiveCategory(skillsCategories[0].slug);
    } else if (currentCategoryIndex < skillsCategories.length - 1) {
      setActiveCategory(skillsCategories[currentCategoryIndex + 1].slug);
    } else {
      setActiveCategory('overview');
    }
  };

  return (
    <div id="skills" className="slide-content-container skills-slide-layout" aria-label="Skills & Capabilities">
      <div className="container">
        {/* Compact Section Header */}
        <div className="section-header slide-header-compact">
          <div className="section-tag section-tag-cyan">
            <Code2 size={13} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Competencies</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive skill set directly grounded in my verified resume across business analytics, machine learning, and API pipelines.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="skills-filter-container slide-controls-compact">
          <div className="skills-filter-pill-group" role="tablist" aria-label="Skill categories">
            <button
              role="tab"
              aria-selected={activeCategory === 'overview'}
              onClick={() => setActiveCategory('overview')}
              className={`filter-btn ${activeCategory === 'overview' ? 'filter-btn-active' : ''}`}
            >
              <Sparkles size={14} />
              <span>All Matrix</span>
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

        {/* View 1: Specific Category View (Default) */}
        {activeCategory !== 'overview' && currentCategory && (
          <div className="skills-category-showcase">
            {/* Category Sub-Header with Quick Navigation */}
            <div className="category-subnav-row">
              <div className="category-subnav-info">
                <div className="category-badge-chip">
                  {getCategoryIcon(currentCategory.slug)}
                  <span className="category-name-strong">{currentCategory.category}</span>
                </div>
                <span className="category-desc-line">{currentCategory.description}</span>
              </div>

              <div className="category-subnav-controls">
                <button
                  type="button"
                  onClick={handlePrevCategory}
                  className="subnav-mini-btn"
                  aria-label="Previous Category"
                  title="Previous Category"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="subnav-step-indicator">
                  {currentCategoryIndex + 1} / {skillsCategories.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextCategory}
                  className="subnav-mini-btn"
                  aria-label="Next Category"
                  title="Next Category"
                >
                  <ChevronRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowArchitectureModal(true)}
                  className="btn-outline-xs"
                  title="View Dual Stack Architecture Blueprint"
                >
                  <Info size={14} />
                  <span>Architecture</span>
                </button>
              </div>
            </div>

            {/* Skills Cards Grid for Active Category */}
            <div className="skills-compact-grid">
              {currentCategory.skills.map((skill, sIdx) => (
                <div
                  key={skill.name}
                  className={`glass-card skill-card-compact ${sIdx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
                >
                  <div className="skill-card-top-resume">
                    <h4 className="skill-name-resume">{skill.name}</h4>
                    <CheckCircle2 size={15} className="text-cyan flex-shrink-0" />
                  </div>
                  <p className="skill-focus-text">{skill.focus}</p>
                  <div className="skill-card-bottom-pill">
                    <span className="chip chip-sm chip-subtle">{currentCategory.category.split('&')[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: All Matrix Overview */}
        {activeCategory === 'overview' && (
          <div className="skills-matrix-overview">
            <div className="skills-matrix-grid">
              {skillsCategories.map((group) => (
                <div
                  key={group.slug}
                  className="glass-card matrix-category-card"
                  onClick={() => setActiveCategory(group.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveCategory(group.slug)}
                  title={`Click to view ${group.category}`}
                >
                  <div className="matrix-card-header">
                    <div className="matrix-icon-wrap">
                      {getCategoryIcon(group.slug)}
                    </div>
                    <h4 className="matrix-category-title">{group.category}</h4>
                    <span className="matrix-count-badge">{group.skills.length}</span>
                  </div>
                  <div className="matrix-skills-pills">
                    {group.skills.map((sk) => (
                      <span key={sk.name} className="matrix-skill-chip">
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dual Stack Architecture Modal / Drawer */}
        {showArchitectureModal && (
          <div className="architecture-modal-backdrop" onClick={() => setShowArchitectureModal(false)}>
            <div className="glass-card architecture-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="architecture-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Layers size={20} className="text-cyan" />
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    Dual Stack Architecture Blueprint
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowArchitectureModal(false)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="architecture-grid" style={{ marginTop: '1rem' }}>
                <div className="architecture-col">
                  <div className="architecture-col-header">
                    <Database size={18} className="text-cyan" />
                    <h4 className="architecture-heading">Data Analytics & Business Intelligence</h4>
                  </div>
                  <p className="architecture-text">
                    Power BI, Tableau, Power Query, Excel, SQL, data analysis, data visualization, KPI reporting, and business analytics. 
                    Focus on normalized dimensional modeling, interactive storytelling, and automated ETL pipelines.
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
        )}
      </div>
    </div>
  );
}
