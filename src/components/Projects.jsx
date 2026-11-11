import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import SectionCarousel from './SectionCarousel';
import {
  ExternalLink,
  Bot,
  Database,
  Layers,
  Monitor,
  Search,
  Filter,
  ArrowUpRight,
  Eye
} from './Icons';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const renderVisualPreview = (project) => {
    switch (project.previewType) {
      case 'stock-chart':
        return (
          <div className="preview-canvas cinematic-preview stock-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Stock Prediction Model</span>
            </div>
            <div className="stock-visual-lines">
              <div className="stock-metric-row">
                <span className="stock-ticker">TICKER: HISTORICAL &bull; SMA-50</span>
                <span className="stock-change text-red">+Predicted Trend</span>
              </div>
              <div className="stock-wave-container">
                <svg viewBox="0 0 300 60" className="stock-svg" preserveAspectRatio="none">
                  <path
                    d="M0,45 Q40,55 80,30 T160,20 T240,35 T300,10"
                    fill="none"
                    stroke="#ff2a3b"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0,50 Q40,40 80,45 T160,25 T240,20 T300,5"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>
            </div>
          </div>
        );

      case 'forecast-chart':
        return (
          <div className="preview-canvas cinematic-preview forecast-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Sales Forecasting Model</span>
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
          <div className="preview-canvas cinematic-preview medical-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Eye Pathology Classifier</span>
            </div>
            <div className="medical-scan-box">
              <div className="scan-crosshair">
                <Eye size={22} className="text-red" />
              </div>
              <div className="scan-info">
                <span className="scan-status text-red">CNN Ingestion &bull; Augmentation Active</span>
                <span className="scan-sub">Multi-Class Ocular Triage</span>
              </div>
            </div>
          </div>
        );

      case 'offline-chat':
        return (
          <div className="preview-canvas cinematic-preview offline-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Offline Question-Answering</span>
            </div>
            <div className="terminal-preview-code">
              <div className="terminal-line user-line">
                <span className="prompt-sym">&gt;</span> &quot;Query local dataset insights&quot;
              </div>
              <div className="terminal-line qwen-line">
                <span className="model-sym text-red">[NLP System]</span> Zero Network Mode
              </div>
              <div className="terminal-line sql-line">
                <code>Output: Extracted contextual response</code>
              </div>
            </div>
          </div>
        );

      case 'dashboard-funnel':
        return (
          <div className="preview-canvas cinematic-preview funnel-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Campaign Performance Tracker</span>
            </div>
            <div className="funnel-bars">
              <div className="funnel-step">
                <div className="funnel-bar bar-1" style={{ width: '100%' }}>
                  <span className="bar-label">Impressions &amp; Traffic</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-2" style={{ width: '70%' }}>
                  <span className="bar-label">Engagement Clicks</span>
                </div>
              </div>
              <div className="funnel-step">
                <div className="funnel-bar bar-3" style={{ width: '40%' }}>
                  <span className="bar-label">Conversions &amp; Leads</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard-bi':
        return (
          <div className="preview-canvas cinematic-preview bi-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Power BI &amp; Tableau Matrix</span>
            </div>
            <div className="bi-mini-grid">
              <div className="bi-mini-kpi">
                <span className="bi-kpi-title">Warehouse</span>
                <span className="bi-kpi-val text-red">BigQuery</span>
              </div>
              <div className="bi-mini-kpi">
                <span className="bi-kpi-title">Processing</span>
                <span className="bi-kpi-val text-white">Hadoop</span>
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
          <div className="preview-canvas cinematic-preview terminal-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Ollama + Qwen 2.5 Agent</span>
            </div>
            <div className="terminal-preview-code">
              <div className="terminal-line user-line">
                <span className="prompt-sym">&gt;</span> &quot;Analyze CPL by campaign tier&quot;
              </div>
              <div className="terminal-line qwen-line">
                <span className="model-sym text-red">[Qwen 2.5]</span> Translating into safe SQL...
              </div>
              <div className="terminal-line sql-line">
                <code>SELECT campaign, cpl FROM ad_spend...</code>
              </div>
            </div>
          </div>
        );

      case 'dashboard-telemetry':
        return (
          <div className="preview-canvas cinematic-preview telemetry-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Antigravity 3D Console</span>
            </div>
            <div className="telemetry-gauges">
              <div className="gauge-item">
                <span className="gauge-lbl">PIPELINE</span>
                <span className="gauge-val text-red">Active</span>
              </div>
              <div className="gauge-item">
                <span className="gauge-lbl">LATENCY</span>
                <span className="gauge-val text-white">&lt; 15ms</span>
              </div>
              <div className="gauge-item">
                <span className="gauge-lbl">STREAM</span>
                <span className="gauge-val text-red">Online</span>
              </div>
            </div>
          </div>
        );

      case 'code-pipeline':
      default:
        return (
          <div className="preview-canvas cinematic-preview api-canvas">
            <div className="preview-top-bar">
              <span className="preview-dot red-dot" />
              <span className="preview-title">Meta Graph API &amp; Windsor.ai</span>
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
    <section id="projects" className="section projects-section cinematic-section" aria-label="Featured Projects">
      <div className="container">
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">05</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">SELECTED WORKS</span>
          </div>
          <h2 className="section-title cinematic-title">
            FEATURED <span className="text-red-accent">PROJECTS.</span>
          </h2>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-controls-row cinematic-controls-row">
          <div className="projects-filter-group cinematic-filter-group" role="tablist" aria-label="Project filter tabs">
            <button
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`cinematic-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            >
              <span>All Projects</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'ai-ml'}
              onClick={() => setActiveFilter('ai-ml')}
              className={`cinematic-filter-btn ${activeFilter === 'ai-ml' ? 'active' : ''}`}
            >
              <Bot size={14} />
              <span>AI &amp; ML</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'analytics'}
              onClick={() => setActiveFilter('analytics')}
              className={`cinematic-filter-btn ${activeFilter === 'analytics' ? 'active' : ''}`}
            >
              <Database size={14} />
              <span>Analytics &amp; BI</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'data-eng'}
              onClick={() => setActiveFilter('data-eng')}
              className={`cinematic-filter-btn ${activeFilter === 'data-eng' ? 'active' : ''}`}
            >
              <Layers size={14} />
              <span>Engineering &amp; APIs</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'dev'}
              onClick={() => setActiveFilter('dev')}
              className={`cinematic-filter-btn ${activeFilter === 'dev' ? 'active' : ''}`}
            >
              <Monitor size={14} />
              <span>Development</span>
            </button>
          </div>

          <div className="projects-search-box cinematic-search-box">
            <Search size={15} className="search-icon text-muted" />
            <input
              type="text"
              placeholder="Search (Python, Power BI, Qwen)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cinematic-search-input"
              aria-label="Filter projects by technology or title"
            />
          </div>
        </div>

        {/* Projects Carousel */}
        {filteredProjects.length > 0 ? (
          <SectionCarousel
            items={filteredProjects}
            itemsPerPage={{ desktop: 3, tablet: 2, mobile: 1 }}
            ariaLabel="Featured Projects Carousel"
            carouselId="projects-carousel"
            renderItem={(project, idx) => (
              <div
                key={project.id}
                className="cinematic-card project-card-cinematic"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                {/* Visual Mockup Preview Header */}
                <div className="project-preview-wrapper">
                  {renderVisualPreview(project)}
                </div>

                {/* Project Number & Category row (matching video frame_008.jpg) */}
                <div className="project-meta-top">
                  <span className="project-number-tag">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="project-category-badge">{project.category}</span>
                </div>

                {/* Title & Summary */}
                <div className="project-card-body" style={{ flex: '1 1 auto' }}>
                  <h3 className="project-card-title-cinematic">{project.title}</h3>
                  <p className="project-card-summary-cinematic">{project.summary}</p>

                  {/* Tech Stack Pills */}
                  <div className="project-stack-wrap">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip-cinematic">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="project-card-footer">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-cinematic-card-action"
                    style={{ width: '100%', justifyContent: 'center' }}
                    aria-label={`View details and architecture of ${project.title}`}
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight size={14} className="action-arrow" />
                  </button>
                </div>
              </div>
            )}
          />
        ) : null}

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="cinematic-card empty-results-card">
            <Filter size={24} className="text-red" />
            <p>
              No projects match your search criteria. Try searching for &quot;Python&quot;, &quot;Power BI&quot;, &quot;Meta&quot;, or &quot;Qwen&quot;.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="btn btn-cinematic-dark"
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
