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
  Info
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
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="glass-card modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="modal-badge-row">
              <span className="chip chip-violet">{project.badge}</span>
              <span className="chip chip-cyan">{project.demoTag}</span>
            </div>
            <h3 id="modal-project-title" className="modal-title">
              {project.title}
            </h3>
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
          {/* Executive Overview */}
          <div className="modal-section">
            <h4 className="modal-section-title">Overview & Objectives</h4>
            <p className="modal-text">{project.description}</p>
          </div>

          {/* Problem Statement & Solution */}
          <div className="modal-section">
            <h4 className="modal-section-title">Problem Statement & Approach</h4>
            <div className="modal-callout-card">
              <p className="modal-callout-text">{project.problemSolved}</p>
            </div>
          </div>

          {/* Key Engineering Features */}
          <div className="modal-section">
            <h4 className="modal-section-title">Key Architectural Features</h4>
            <ul className="modal-feature-list">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="modal-feature-item">
                  <CheckCircle2 size={16} className="text-cyan modal-feature-icon" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Toolchain */}
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

          {/* Transparent Demo Notice */}
          <div className="modal-notice-box">
            <Info size={16} className="text-cyan" />
            <span>
              <strong>Project Status:</strong> This card reflects architecture, analytical modeling, and technical design. Replace repository link in <code>portfolioData.js</code> once published.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {project.isConfigured ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <GithubIcon size={16} />
              <span>View Source Code</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <div className="modal-link-placeholder">
              <GithubIcon size={16} className="text-muted" />
              <span>Link ready to configure in <code>portfolioData.js</code></span>
            </div>
          )}
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
