import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Code2,
  CheckCircle2,
  Database,
  Bot,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal
} from './Icons';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-project-title">
      <div className="glass-card modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <span className="chip chip-violet">{project.badge}</span>
            <h3 id="modal-project-title" className="modal-title">{project.title}</h3>
            <span className="modal-category">{project.category}</span>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Executive Summary */}
          <div className="modal-section">
            <h4 className="modal-section-title">Overview & Impact</h4>
            <p className="modal-text">{project.description}</p>
          </div>

          {/* Problem Solved */}
          <div className="modal-section">
            <h4 className="modal-section-title">Problem Statement & Resolution</h4>
            <div className="modal-callout-card">
              <p className="modal-callout-text">{project.problemSolved}</p>
            </div>
          </div>

          {/* Key Metrics / Highlights */}
          {project.metricsPreview && (
            <div className="modal-section">
              <h4 className="modal-section-title">Key Performance Indicators</h4>
              <div className="modal-metrics-grid">
                {project.metricsPreview.map((m, idx) => (
                  <div key={idx} className="modal-metric-card">
                    <span className="metric-val text-gradient-cyan">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Architectural Features */}
          <div className="modal-section">
            <h4 className="modal-section-title">Engineering & Analytical Highlights</h4>
            <ul className="modal-feature-list">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="modal-feature-item">
                  <CheckCircle2 size={16} className="text-cyan modal-feature-icon" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="modal-section">
            <h4 className="modal-section-title">Technology & Toolchain</h4>
            <div className="modal-stack-tags">
              {project.stack.map((item) => (
                <span key={item} className="chip chip-cyan">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <GithubIcon size={16} />
            <span>Repository (Placeholder)</span>
            <ExternalLink size={13} />
          </a>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
