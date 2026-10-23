import React, { useState } from 'react';
import { Cpu, Sparkles } from './Icons';

/**
 * Premium AI Neural Engine & Coprocessor Visual
 * Inspired by high-end Apple Intelligence and futuristic AI dashboards.
 * Features:
 * - Minimalist glassmorphic capsule with precision micro-border
 * - Glowing geometric Neural Core with soft orbital shimmer
 * - Smooth, slow floating levitation (zero jerky bouncing)
 * - Refined interactive status preview on hover/click
 */
export default function FuturisticRobotVisual({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const capabilities = [
    "AI Neural Engine • Active",
    "LLM & NLP Pipelines • Ready",
    "Predictive Analytics • Online",
    "Power BI & Automation • Synced"
  ];

  const currentLabel = capabilities[activeStep % capabilities.length];

  return (
    <div
      className={`ai-neural-badge ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveStep((prev) => prev + 1)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveStep((prev) => prev + 1);
        }
      }}
      aria-label="AI Coprocessor Status Badge"
      title="Click to view AI capabilities"
    >
      {/* Soft Ambient Core Halo */}
      <div className="ai-core-halo" aria-hidden="true" />

      {/* Sleek Vector Neural Orb Visual */}
      <div className="ai-neural-orb" aria-hidden="true">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ai-orb-svg"
        >
          <defs>
            <linearGradient id="orbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Orbital Ring */}
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="url(#orbGradient)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.75"
            className="orb-ring-outer"
          />

          {/* Inner Tilt Ring */}
          <ellipse
            cx="20"
            cy="20"
            rx="11"
            ry="14"
            stroke="url(#orbGradient)"
            strokeWidth="1"
            opacity="0.6"
            className="orb-ring-inner"
          />

          {/* Central Neural Pulse Core */}
          <circle
            cx="20"
            cy="20"
            r="5.5"
            fill="url(#orbGradient)"
            filter="url(#softGlow)"
            className="orb-core-pulse"
          />
          <circle cx="20" cy="20" r="2" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>

      {/* Refined Text Status Label */}
      <div className="ai-badge-text-group">
        <span className="ai-status-indicator-dot" />
        <span className="ai-badge-label">{currentLabel}</span>
      </div>

      <Sparkles size={13} className="ai-badge-sparkle text-cyan" />
    </div>
  );
}
