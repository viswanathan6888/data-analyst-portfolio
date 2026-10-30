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
  Info,
  TrendingUp,
  Activity,
  Eye,
  ChevronLeft,
  ChevronRight
} from './Icons';
import { GithubIcon } from './Icons';

export default function Projects({ onNavigate }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);

  const PROJECTS_PER_PAGE = 3;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(0);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setPage(0);
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'ai-ml' && project.category.includes('AI')) ||
      (activeFilter === 'analytics' && project.category.includes('Analytics')) ||
      (activeFilter === 'data-eng' && project.category.includes('Engineering')) ||
      (activeFilter === 'dev' && project.category.includes('Development'));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const paginatedProjects = filteredProjects.slice(
    page * PROJECTS_PER_PAGE,
    (page + 1) * PROJECTS_PER_PAGE
  );

  const renderVisualPreview = (project) => {
    switch (project.previewType) {
      case 'stock-chart':
        return (
          <div className="preview-canvas stock-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot green-dot" />
              <span className="preview-title">Stock Prediction Model</span>
              <span className="preview-tag">[Concept UI]</span>
            </div>
            <div className="stock-visual-lines">
              <div className="stock-metric-row">
                <span className="stock-ticker">TICKER: HISTORICAL &bull; SMA-50</span>
                <span className="stock-change text-green">+Predicted Trend</span>
              </div>
              <div className="stock-wave-container">
                <svg viewBox="0 0 300 60" className="stock-svg" preserveAspectRatio="none">
                  <path
                    d="M0,45 Q40,55 80,30 T160,20 T240,35 T300,10"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,50 Q40,40 80,45 T160,25 T240,20 T300,5"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            </div>
          </div>
        );

      case 'forecast-chart':
        return (
          <div className="preview-canvas forecast-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot purple-dot" />
              <span className="preview-title">Sales Forecasting Model</span>
              <span className="preview-tag">[Concept UI]</span>
            </div>
            <div className="forecast-bars-container">
              <div className="f-bar-col">
                <div className="f-bar" style={{ height: '45%' }} />
                <span className="f-lbl">Q1</span>
              </div>
              <div className="f-bar-col">
                <div className="f-bar" style={{ height: '60%' }} />
                <span className="f-lbl">Q2</span>
              </div>
              <div className="f-bar-col">
                <div className="f-bar" style={{ height: '52%' }} />
                <span className="f-lbl">Q3</span>
              </div>
              <div className="f-bar-col">
                <div className="f-bar active" style={{ height: '82%' }} />
                <span className="f-lbl">Q4 (F)</span>
              </div>
            </div>
          </div>
        );

      case 'medical-vision':
        return (
          <div className="preview-canvas medical-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot cyan-dot" />
              <span className="preview-title">Eye Pathology Classifier</span>
              <span className="preview-tag">[Deep Learning]</span>
            </div>
            <div className="medical-scan-box">
              <div className="scan-crosshair">
                <Eye size={22} className="text-cyan" />
              </div>
              <div className="scan-info">
                <span className="scan-status text-cyan">CNN Ingestion &bull; Augmentation Active</span>
                <span className="scan-sub">Multi-Class Ocular Triage</span>
              </div>
            </div>
          </div>
        );

      case 'offline-chat':
        return (
          <div className="preview-canvas offline-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot green-dot" />
              <span className="preview-title">Offline Question-Answering</span>
              <span className="preview-tag">[Local NLP]</span>
            </div>
            <div className="terminal-preview-code">
              <div className="terminal-line user-line">
                <span className="prompt-sym">&gt;</span> &quot;Query local dataset insights&quot;
              </div>
              <div className="terminal-line qwen-line">
                <span className="model-sym">[NLP System]</span> Parsing intent &bull; Zero Network
              </div>
              <div className="terminal-line sql-line">
                <code>Output: Extracted contextual response</code>
              </div>
            </div>
          </div>
        );

      case 'dashboard-funnel':
        return (
          <div className="preview-canvas funnel-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot" />
              <span className="preview-title">Campaign Performance Tracker</span>
              <span className="preview-tag">[Concept UI]</span>
            </div>
            <div className="funnel-bars">
              <div className="funnel-step">
                <div className="funnel-bar bar-1" style={{ width: '100%' }}>
                  <span className="bar-label">Impressions & Traffic</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-2" style={{ width: '70%' }}>
                  <span className="bar-label">Engagement Clicks</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-3" style={{ width: '40%' }}>
                  <span className="bar-label">Conversions & Leads</span>
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
              <span className="preview-title">Power BI & Tableau Matrix</span>
              <span className="preview-tag">[Concept UI]</span>
            </div>
            <div className="bi-mini-grid">
              <div className="bi-mini-kpi">
                <span className="bi-kpi-title">Warehouse</span>
                <span className="bi-kpi-val text-cyan">BigQuery</span>
              </div>
              <div className="bi-mini-kpi">
                <span className="bi-kpi-title">Processing</span>
                <span className="bi-kpi-val text-violet">Hadoop</span>
              </div>
            </div>
            <div className="bi-sparklines">
              <div className="spark-bar" style={{ height: '40%' }} />
              <div className="spark-bar" style={{ height: '65%' }} />
              <div className="spark-bar active" style={{ height: '90%' }} />
              <div className="spark-bar" style={{ height: '75%' }} />
            </div>
          </div>
        );

      case 'terminal-ai':
        return (
          <div className="preview-canvas terminal-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot green-dot" />
              <span className="preview-title">Ollama + Qwen 2.5 Agent</span>
              <span className="preview-tag">[Private LLM]</span>
            </div>
            <div className="terminal-preview-code">
              <div className="terminal-line user-line">
                <span className="prompt-sym">&gt;</span> &quot;Analyze CPL by campaign tier&quot;
              </div>
              <div className="terminal-line qwen-line">
                <span className="model-sym">[Qwen 2.5]</span> Translating into safe SQL CTE...
              </div>
              <div className="terminal-line sql-line">
                <code>SELECT campaign, cpl FROM ad_spend...</code>
              </div>
            </div>
          </div>
        );

      case 'dashboard-telemetry':
        return (
          <div className="preview-canvas telemetry-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot purple-dot" />
              <span className="preview-title">Antigravity 3D Console</span>
              <span className="preview-tag">[Spatial UI]</span>
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

      case 'code-pipeline':
      default:
        return (
          <div className="preview-canvas api-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot cyan-dot" />
              <span className="preview-title">Meta Graph API & Windsor.ai</span>
              <span className="preview-tag">[Data Ingestion]</span>
            </div>
            <div className="api-preview-lines">
              <div className="api-route">
                <span className="api-method">GET</span> /v21.0/act_.../insights
              </div>
              <div className="api-status-row">
                <span className="api-badge-ok">200 OK</span>
                <span className="api-meta">JSON &rarr; Power Query &rarr; BI</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="section projects-section" aria-label="Featured Projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header slide-header-compact">
          <div className="section-tag section-tag-cyan">
            <FolderGit2 size={14} />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            All 10 projects directly sourced from my verified resume, spanning machine learning models, 
            deep learning image classification, BI dashboards, local AI assistants, and API pipelines.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-controls-row">
          <div className="projects-filter-group" role="tablist" aria-label="Project filter tabs">
            <button
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => handleFilterChange('all')}
              className={`filter-btn ${activeFilter === 'all' ? 'filter-btn-active' : ''}`}
            >
              <span>All Projects</span>
              <span className="filter-count">10</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'ai-ml'}
              onClick={() => handleFilterChange('ai-ml')}
              className={`filter-btn ${activeFilter === 'ai-ml' ? 'filter-btn-active' : ''}`}
            >
              <Bot size={14} />
              <span>AI & ML</span>
              <span className="filter-count">5</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'analytics'}
              onClick={() => handleFilterChange('analytics')}
              className={`filter-btn ${activeFilter === 'analytics' ? 'filter-btn-active' : ''}`}
            >
              <Database size={14} />
              <span>Analytics & BI</span>
              <span className="filter-count">2</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'data-eng'}
              onClick={() => handleFilterChange('data-eng')}
              className={`filter-btn ${activeFilter === 'data-eng' ? 'filter-btn-active' : ''}`}
            >
              <Layers size={14} />
              <span>Engineering & APIs</span>
              <span className="filter-count">1</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'dev'}
              onClick={() => handleFilterChange('dev')}
              className={`filter-btn ${activeFilter === 'dev' ? 'filter-btn-active' : ''}`}
            >
              <Monitor size={14} />
              <span>Development</span>
              <span className="filter-count">2</span>
            </button>
          </div>

          <div className="projects-search-box">
            <Search size={16} className="search-icon text-muted" />
            <input
              type="text"
              placeholder="Search tools (Python, Power BI, Qwen, Meta)..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
              aria-label="Filter projects by technology or title"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {paginatedProjects.map((project, idx) => (
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
                <span className="project-category-label">{project.category.split('&')[0].trim()}</span>
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

                <button
                  onClick={() => setSelectedProject(project)}
                  className="btn btn-sm btn-secondary icon-btn"
                  title="Architecture details"
                  aria-label={`View details for ${project.title}`}
                >
                  <Info size={16} className="text-cyan" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Pagination Row */}
        {filteredProjects.length > PROJECTS_PER_PAGE && (
          <div className="projects-pagination-row">
            <button
              type="button"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="subnav-mini-btn"
              aria-label="Previous projects page"
              title="Previous Projects"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>

            <div className="projects-page-dots">
              {Array.from({ length: totalPages }).map((_, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setPage(pIdx)}
                  className={`project-dot ${page === pIdx ? 'project-dot-active' : ''}`}
                  aria-label={`Go to page ${pIdx + 1}`}
                  title={`Page ${pIdx + 1}`}
                />
              ))}
            </div>

            <span className="projects-page-counter">
              Page {page + 1} of {totalPages} ({filteredProjects.length} Projects)
            </span>

            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="subnav-mini-btn"
              aria-label="Next projects page"
              title="Next Projects"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="glass-card empty-results-card">
            <Filter size={24} className="text-muted" />
            <p>
              No projects match your search criteria. Try searching for &quot;Python&quot;, &quot;Power BI&quot;, &quot;Meta&quot;, or &quot;Qwen&quot;.
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