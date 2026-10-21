import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
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
  CheckCircle2
} from './Icons';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const getSkillIcon = (name) => {
    switch (name) {
      case 'SQL':
        return <Database size={22} className="text-cyan" />;
      case 'Python':
        return <Terminal size={22} className="text-violet" />;
      case 'Power BI':
        return <BarChart3 size={22} className="text-cyan" />;
      case 'Tableau':
        return <PieChart size={22} className="text-violet" />;
      case 'Excel':
      case 'Power Query':
        return <FileSpreadsheet size={22} className="text-cyan" />;
      case 'Ollama':
        return <Cpu size={22} className="text-violet" />;
      case 'Qwen':
        return <Sparkles size={22} className="text-cyan" />;
      case 'LLMs':
        return <Bot size={22} className="text-violet" />;
      case 'Meta API':
        return <Share2 size={22} className="text-cyan" />;
      case 'Dashboard Development':
        return <Monitor size={22} className="text-cyan" />;
      case 'Website Development':
        return <Code2 size={22} className="text-violet" />;
      default:
        return <Code2 size={22} className="text-cyan" />;
    }
  };

  const filteredGroups = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((group) => group.categorySlug === activeCategory);

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
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="section-subtitle">
            Core analytical methodologies, business intelligence tools, private local AI runtimes, 
            and modern web development frameworks.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="skills-filter-container">
          <div className="skills-filter-pill-group" role="tablist" aria-label="Skill categories">
            <button
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`filter-btn ${activeCategory === 'all' ? 'filter-btn-active' : ''}`}
            >
              <span>All Competencies</span>
              <span className="filter-count">12</span>
            </button>

            <button
              role="tab"
              aria-selected={activeCategory === 'data-analytics'}
              onClick={() => setActiveCategory('data-analytics')}
              className={`filter-btn ${activeCategory === 'data-analytics' ? 'filter-btn-active' : ''}`}
            >
              <Database size={14} />
              <span>Data Analytics</span>
              <span className="filter-count">6</span>
            </button>

            <button
              role="tab"
              aria-selected={activeCategory === 'ai'}
              onClick={() => setActiveCategory('ai')}
              className={`filter-btn ${activeCategory === 'ai' ? 'filter-btn-active' : ''}`}
            >
              <Bot size={14} />
              <span>AI</span>
              <span className="filter-count">3</span>
            </button>

            <button
              role="tab"
              aria-selected={activeCategory === 'data-integration'}
              onClick={() => setActiveCategory('data-integration')}
              className={`filter-btn ${activeCategory === 'data-integration' ? 'filter-btn-active' : ''}`}
            >
              <Share2 size={14} />
              <span>Data Integration</span>
              <span className="filter-count">1</span>
            </button>

            <button
              role="tab"
              aria-selected={activeCategory === 'development'}
              onClick={() => setActiveCategory('development')}
              className={`filter-btn ${activeCategory === 'development' ? 'filter-btn-active' : ''}`}
            >
              <Monitor size={14} />
              <span>Development</span>
              <span className="filter-count">2</span>
            </button>
          </div>
        </div>

        {/* Grouped Skills Showcase */}
        <div className="skills-groups-wrapper">
          {filteredGroups.map((group) => (
            <div key={group.categorySlug} className="skills-category-group">
              <div className="category-group-header">
                <div className="category-heading-wrap">
                  <h3 className="category-title">{group.category}</h3>
                  <span className="category-badge chip chip-cyan">
                    {group.skills.length} {group.skills.length === 1 ? 'Skill' : 'Skills'}
                  </span>
                </div>
                <p className="category-description">{group.description}</p>
              </div>

              <div className="skills-grid">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className={`glass-card skill-card ${sIdx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
                  >
                    <div className="skill-card-top">
                      <div className="skill-icon-wrapper">
                        {getSkillIcon(skill.name)}
                      </div>
                      <span className="chip chip-violet">{skill.tag}</span>
                    </div>

                    <div className="skill-card-content">
                      <h4 className="skill-name">{skill.name}</h4>
                      <p className="skill-description">{skill.description}</p>
                    </div>

                    <div className="skill-card-footer">
                      <span className="skill-category-tag">{group.category}</span>
                      <span className="skill-verified-check">
                        <CheckCircle2 size={14} className="text-cyan" />
                        <span>Applied in Projects</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Analytical Workflow Architecture Box */}
        <div className="glass-card skill-architecture-box">
          <div className="architecture-grid">
            <div className="architecture-col">
              <div className="architecture-col-header">
                <Database size={18} className="text-cyan" />
                <h4 className="architecture-heading">Data Analytics & Reporting</h4>
              </div>
              <p className="architecture-text">
                SQL aggregation, relational schema modeling, M-Code automated transformations in Power Query, and executive KPI storytelling via interactive Power BI and Tableau dashboards.
              </p>
            </div>

            <div className="architecture-divider" />

            <div className="architecture-col">
              <div className="architecture-col-header">
                <Bot size={18} className="text-violet" />
                <h4 className="architecture-heading">AI & Intelligent Automation</h4>
              </div>
              <p className="architecture-text">
                Private on-premise execution with Ollama and Qwen models for secure text-to-SQL translation, automated metric summarization, Meta API marketing data ingestion, and custom dashboard development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
