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
  CheckCircle2
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
      (activeFilter === 'ai' && (project.category === 'AI & LLMs' || project.category === 'AI & Development'));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="section projects-section">
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
            Enterprise analytics dashboards, automated reporting suites, local LLM analytical agents, 
            and live API data integration pipelines.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="projects-controls-row">
          {/* Category Tabs */}
          <div className="projects-filter-group" role="tablist">
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
              <span>Data Analytics & BI</span>
              <span className="filter-count">4</span>
            </button>
            <button
              role="tab"
              aria-selected={activeFilter === 'ai'}
              onClick={() => setActiveFilter('ai')}
              className={`filter-btn ${activeFilter === 'ai' ? 'filter-btn-active' : ''}`}
            >
              <Bot size={14} />
              <span>AI & Integrations</span>
              <span className="filter-count">2</span>
            </button>
          </div>

          {/* Quick Keyword Search */}
          <div className="projects-search-box">
            <Search size={16} className="search-icon text-muted" />
            <input
              type="text"
              placeholder="Search tech (SQL, Qwen, Power BI, Meta)..."
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
              {/* Card Top / Badge */}
              <div className="project-card-header">
                <span className="chip chip-violet">{project.badge}</span>
                <span className="project-category-label">{project.category}</span>
              </div>

              {/* Title & Summary */}
              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>

                {/* Key Metrics Strip */}
                {project.metricsPreview && (
                  <div className="project-metrics-strip">
                    {project.metricsPreview.map((metric, mIdx) => (
                      <div key={mIdx} className="metric-chip">
                        <span className="metric-val text-cyan">{metric.value}</span>
                        <span className="metric-lbl">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                )}

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
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight size={14} />
                </button>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary icon-btn"
                  title="GitHub Repository (Placeholder)"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <GithubIcon size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="glass-card empty-results-card">
            <Filter size={24} className="text-muted" />
            <p>No projects match your search criteria. Try clearing filters or searching for "SQL", "BI", or "Qwen".</p>
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
