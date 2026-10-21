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
  Layers,
  Filter,
  CheckCircle2
} from './Icons';

export default function Skills() {
  const [filter, setFilter] = useState('all');

  // Flatten all skills for quick filtering
  const allSkills = skillsData.flatMap(cat => 
    cat.skills.map(skill => ({ ...skill, category: cat.category }))
  );

  const filteredSkills = filter === 'all'
    ? allSkills
    : allSkills.filter(s => s.category.toLowerCase().includes(filter.toLowerCase()));

  const getSkillIcon = (name) => {
    switch (name) {
      case 'SQL':
        return <Database size={24} className="skill-icon-svg text-cyan" />;
      case 'Python':
        return <Terminal size={24} className="skill-icon-svg text-violet" />;
      case 'Power BI':
        return <BarChart3 size={24} className="skill-icon-svg text-cyan" />;
      case 'Tableau':
        return <PieChart size={24} className="skill-icon-svg text-violet" />;
      case 'Excel':
      case 'Power Query':
        return <FileSpreadsheet size={24} className="skill-icon-svg text-cyan" />;
      case 'Ollama':
        return <Cpu size={24} className="skill-icon-svg text-violet" />;
      case 'Qwen':
        return <Sparkles size={24} className="skill-icon-svg text-cyan" />;
      case 'LLMs':
        return <Bot size={24} className="skill-icon-svg text-violet" />;
      case 'Meta API integration':
        return <Share2 size={24} className="skill-icon-svg text-cyan" />;
      default:
        return <Code2 size={24} className="skill-icon-svg text-cyan" />;
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-cyan">
            <Code2 size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient-cyan">Expertise</span>
          </h2>
          <p className="section-subtitle">
            A battle-tested stack spanning business intelligence, dimensional modeling, 
            local LLM deployments, and REST API integrations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="skills-filter-container">
          <div className="skills-filter-pill-group" role="tablist" aria-label="Skills filter">
            <button
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
            >
              <span>All Skills</span>
              <span className="filter-count">10</span>
            </button>
            <button
              role="tab"
              aria-selected={filter === 'analytics'}
              onClick={() => setFilter('analytics')}
              className={`filter-btn ${filter === 'analytics' ? 'filter-btn-active' : ''}`}
            >
              <Database size={14} />
              <span>Data Analytics & BI</span>
              <span className="filter-count">5</span>
            </button>
            <button
              role="tab"
              aria-selected={filter === 'ai'}
              onClick={() => setFilter('ai')}
              className={`filter-btn ${filter === 'ai' ? 'filter-btn-active' : ''}`}
            >
              <Bot size={14} />
              <span>AI, LLMs & Development</span>
              <span className="filter-count">5</span>
            </button>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.name}
              className={`glass-card skill-card ${idx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
            >
              <div className="skill-card-top">
                <div className="skill-icon-wrapper">
                  {getSkillIcon(skill.name)}
                </div>
                <div className="skill-badge-wrapper">
                  <span className={`chip ${skill.level.includes('Advanced') ? 'chip-violet' : 'chip-cyan'}`}>
                    {skill.level}
                  </span>
                </div>
              </div>

              <div className="skill-card-content">
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>

              <div className="skill-card-footer">
                <span className="skill-category-tag">{skill.category}</span>
                <span className="skill-verified-check">
                  <CheckCircle2 size={14} className="text-cyan" />
                  <span>Production Ready</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Dual Stack Architecture Summary */}
        <div className="glass-card skill-architecture-box">
          <div className="architecture-grid">
            <div className="architecture-col">
              <div className="architecture-col-header">
                <Database size={18} className="text-cyan" />
                <h4 className="architecture-heading">Data Analytics Specialization</h4>
              </div>
              <p className="architecture-text">
                SQL query optimization (window functions, subqueries, CTEs), relational data modeling (Star & Snowflake schemas), M-Code transformation pipelines in Power Query, and executive KPI storytelling via Power BI and Tableau.
              </p>
            </div>

            <div className="architecture-divider" />

            <div className="architecture-col">
              <div className="architecture-col-header">
                <Bot size={18} className="text-violet" />
                <h4 className="architecture-heading">AI & LLM Specialization</h4>
              </div>
              <p className="architecture-text">
                Local on-premise execution via Ollama and Qwen 2.5 series models for secure offline Text-to-SQL, automated report synthesis, structured JSON function calling, Python data scripts, and Meta Graph API data harvesting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
