import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import {
  FolderGit2,
  ExternalLink,
  Code2,
  Database,
  Bot,
  Layers,
  Sparkles,
  ArrowUpRight,
  Search,
  Filter,
  CheckCircle2,
  Share2,
  Monitor,
  Info
} from './Icons';
import { GithubIcon } from './Icons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'analytics' && project.category === 'Data Analytics') ||
      (activeFilter === 'ai' && project.category === 'AI') ||
      (activeFilter === 'integration' && project.category === 'Data Integration') ||
      (activeFilter === 'dev' && project.category === 'Development');

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  // Render rich CSS/vector dashboard mockup preview for each project
  const renderVisualPreview = (project) => {
    switch (project.previewType) {
      case 'dashboard-funnel':
        return (
          <div className="preview-canvas funnel-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot" />
              <span className="preview-title">Lead Conversion Funnel UI</span>
              <span className="preview-tag">[Demo Mockup]</span>
            </div>
            <div className="funnel-bars">
              <div className="funnel-step">
                <div className="funnel-bar bar-1" style={{ width: '100%' }}>
                  <span className="bar-label">Total Inbound</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-2" style={{ width: '74%' }}>
                  <span className="bar-label">MQL Qualified</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-3" style={{ width: '48%' }}>
                  <span className="bar-label">SQL Pipeline</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-4" style={{ width: '28%' }}>
                  <span className="bar-label">Closed Won</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard-bi':
        return (
          <div className="preview-canvas bi-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot" />
              <span className="preview-title">Power BI / Tableau Matrix</span>
              <span className="preview-tag">[Demo Mockup]</span>
            </div>
            <div className="bi-mini-grid">
              <div className="bi-mini-kpi">
                <span className="bi-kpi-title">YoY Trend</span>
                <span className="bi-kpi-val text-cyan">Tracked</span>
              </div>
              <div className="bi-mini-kpi">
                <span className="bi-kpi-title">Data Schema</span>
                <span className="bi-kpi-val text-violet">Star Model</span>
              </div>
            </div>
            <div className="bi-sparklines">
              <div className="spark-bar" style={{ height: '40%' }} />
              <div className="spark-bar" style={{ height: '65%' }} />
              <div className="spark-bar" style={{ height: '55%' }} />
              <div className="spark-bar active" style={{ height: '85%' }} />
              <div className="spark-bar" style={{ height: '70%' }} />
              <div className="spark-bar" style={{ height: '95%' }} />
            </div>
          </div>
        );

      case 'terminal-ai':
        return (
          <div className="preview-canvas terminal-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot green-dot" />
              <span className="preview-title">Ollama & Qwen 2.5 Agent</span>
              <span className="preview-tag">[Local Terminal]</span>
            </div>
            <div className="terminal-preview-code">
              <div className="terminal-line user-line">
                <span className="prompt-sym">&gt;</span> &quot;Query top cohorts by retention&quot;
              </div>
              <div className="terminal-line qwen-line">
                <span className="model-sym">[Qwen2.5]</span> Generating safe SQL CTE...
              </div>
              <div className="terminal-line sql-line">
                <code>SELECT cohort, rate FROM metrics...</code>
              </div>
            </div>
          </div>
        );

      case 'code-pipeline':
        return (
          <div className="preview-canvas api-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot cyan-dot" />
              <span className="preview-title">Meta Graph API Pipeline</span>
              <span className="preview-tag">[ETL Stream]</span>
            </div>
            <div className="api-preview-lines">
              <div className="api-route">
                <span className="api-method">GET</span> /v21.0/act_.../insights
              </div>
              <div className="api-status-row">
                <span className="api-badge-ok">200 OK</span>
                <span className="api-meta">JSON &rarr; Relational Rows</span>
              </div>
            </div>
          </div>
        );

      case 'dashboard-telemetry':
        return (
          <div className="preview-canvas telemetry-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot purple-dot" />
              <span className="preview-title">Antigravity Telemetry View</span>
              <span className="preview-tag">[UI Console]</span>
            </div>
            <div className="telemetry-gauges">
              <div className="gauge-item">
                <span className="gauge-lbl">PIPELINE</span>
                <span className="gauge-val text-cyan">Active</span>
              </div>
              <div className="gauge-item">
                <span className="gauge-lbl">LATENCY</span>
                <span className="gauge-val text-violet">&lt; 15ms</span>
              </div>
              <div className="gauge-item">
                <span className="gauge-lbl">STREAM</span>
                <span className="gauge-val text-green">Online</span>
              </div>
            </div>
          </div>
        );

      case 'etl-flow':
      default:
        return (
          <div className="preview-canvas pq-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot" />
              <span className="preview-title">Power Query M-Engine</span>
              <span className="preview-tag">[Transformation]</span>
            </div>
            <div className="pq-steps-preview">
              <span className="pq-chip">1. Promoted Headers</span>
              <span className="pq-chip">2. Changed Types</span>
              <span className="pq-chip">3. Deduplicated Keys</span>
              <span className="pq-chip active">4. Normalized Schema</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="section projects-section" aria-label="Featured Projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-cyan">
            <FolderGit2 size={14} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Recruiter-ready case studies highlighting business intelligence dashboards, local AI assistants, 
            API ingestion pipelines, and automated transformation engines.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-controls-row">
          {/* Category Tabs */}
          <div className="projects-filter-group" role="tablist" aria-label="Project filter tabs">
            <button
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`filter-btn ${activeFilter === 'all' ? 'filter-btn-active' : ''}`}
            >
              <span>All Projects</span>
              <span className="filter-count">6</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'analytics'}
              onClick={() => setActiveFilter('analytics')}
              className={`filter-btn ${activeFilter === 'analytics' ? 'filter-btn-active' : ''}`}
            >
              <Database size={14} />
              <span>Data Analytics</span>
              <span className="filter-count">3</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'ai'}
              onClick={() => setActiveFilter('ai')}
              className={`filter-btn ${activeFilter === 'ai' ? 'filter-btn-active' : ''}`}
            >
              <Bot size={14} />
              <span>AI</span>
              <span className="filter-count">1</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'integration'}
              onClick={() => setActiveFilter('integration')}
              className={`filter-btn ${activeFilter === 'integration' ? 'filter-btn-active' : ''}`}
            >
              <Share2 size={14} />
              <span>Integration</span>
              <span className="filter-count">1</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'dev'}
              onClick={() => setActiveFilter('dev')}
              className={`filter-btn ${activeFilter === 'dev' ? 'filter-btn-active' : ''}`}
            >
              <Monitor size={14} />
              <span>Development</span>
              <span className="filter-count">1</span>
            </button>
          </div>

          {/* Quick Keyword Search */}
          <div className="projects-search-box">
            <Search size={16} className="search-icon text-muted" />
            <input
              type="text"
              placeholder="Search tools (Power BI, SQL, Qwen, Meta)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Filter projects by technology or title"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`glass-card project-card ${idx % 2 === 0 ? 'glass-card-violet-accent' : 'glass-card-cyan'}`}
            >
              {/* Visual Mockup Preview Header */}
              <div className="project-preview-wrapper">
                {renderVisualPreview(project)}
              </div>

              {/* Card Meta & Badges */}
              <div className="project-card-header">
                <span className="chip chip-violet">{project.badge}</span>
                <span className="project-category-label">{project.category}</span>
              </div>

              {/* Title & Summary */}
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>

                {/* Tech Stack Pills */}
                <div className="project-stack-wrap">
                  {project.stack.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="project-card-footer">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-sm btn-primary project-inspect-btn"
                  aria-label={`Inspect architecture of ${project.title}`}
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight size={14} />
                </button>

                {project.isConfigured ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary icon-btn"
                    title="View GitHub Repository"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GithubIcon size={16} />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-sm btn-secondary icon-btn"
                    title="Architecture preview - Link editable in portfolioData.js"
                    aria-label={`View details for ${project.title}`}
                  >
                    <Info size={16} className="text-cyan" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="glass-card empty-results-card">
            <Filter size={24} className="text-muted" />
            <p>
              No projects match your search criteria. Try clearing filters or searching for &quot;SQL&quot;, &quot;Power BI&quot;, or &quot;Qwen&quot;.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="btn btn-sm btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Case Study Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
