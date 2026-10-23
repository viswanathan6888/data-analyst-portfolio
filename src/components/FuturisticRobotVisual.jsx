import React, { useState } from 'react';
import { Sparkles, Bot, Cpu } from './Icons';

/**
 * Futuristic Robot Visual & AI Companion
 * Features:
 * - Floating cybernetic head with glossy visor & animated digital neon eyes
 * - Pulsing antenna beacon emitting subtle neon waves
 * - Holographic energy reactor core with gradient pulse
 * - Interactive hover & click reactions (status messages, happy eye emotes)
 * - Lightweight SVG, high-performance compositor CSS animations, zero DOM bloat
 */
export default function FuturisticRobotVisual({ size = 'medium', className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clickIndex, setClickIndex] = useState(0);

  const statusMessages = [
    "AI Companion Online ⚡",
    "LLM & Neural Net Ready 🧠",
    "Data Models: Optimized 📊",
    "Power BI & Python Active 🚀"
  ];

  const currentMsg = statusMessages[clickIndex % statusMessages.length];

  return (
    <div
      className={`futuristic-robot-badge ${size} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setClickIndex((prev) => prev + 1)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setClickIndex((prev) => prev + 1);
        }
      }}
      aria-label="Interactive Futuristic AI Robot Companion. Click to cycle status."
      title="Click to cycle AI Companion status!"
    >
      {/* Ambient Neon Backlight Glow */}
      <div className="robot-neon-aura" aria-hidden="true" />

      {/* Floating Robot Figure */}
      <div className="robot-floating-avatar">
        <svg
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="robot-svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="robotHelmetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="robotVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="robotCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            <filter id="neonCyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="coreNeonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Antenna Rod & Glowing Neon Orb */}
          <line x1="50" y1="12" x2="50" y2="24" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="10" r="5" fill="#06b6d4" filter="url(#neonCyanGlow)" className="robot-antenna-orb" />
          <circle cx="50" cy="10" r="8" stroke="#06b6d4" strokeWidth="1" opacity="0.6" className="robot-antenna-wave" />

          {/* Cybernetic Ear Nodes */}
          <rect x="18" y="38" width="6" height="18" rx="3" fill="#64748b" />
          <rect x="19" y="42" width="4" height="10" rx="2" fill="#06b6d4" filter="url(#neonCyanGlow)" />
          
          <rect x="76" y="38" width="6" height="18" rx="3" fill="#64748b" />
          <rect x="77" y="42" width="4" height="10" rx="2" fill="#06b6d4" filter="url(#neonCyanGlow)" />

          {/* Sleek Helmet Shell */}
          <rect x="22" y="24" width="56" height="46" rx="20" fill="url(#robotHelmetGrad)" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Subtle Top Glass Sheen */}
          <path d="M 30 28 Q 50 25 70 28" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

          {/* Curved Visor Screen */}
          <rect x="27" y="33" width="46" height="28" rx="12" fill="url(#robotVisorGrad)" stroke="#1e293b" strokeWidth="1.5" />
          {/* Subtle Visor Scanline */}
          <line x1="30" y1="47" x2="70" y2="47" stroke="#06b6d4" strokeWidth="0.5" opacity="0.35" strokeDasharray="3 2" />

          {/* Expressive Neon Eyes */}
          {isHovered ? (
            /* Joyful arched cyber eyes on hover */
            <g className="robot-eyes-happy">
              <path d="M 34 50 Q 40 42 46 50" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#neonCyanGlow)" />
              <path d="M 54 50 Q 60 42 66 50" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#neonCyanGlow)" />
            </g>
          ) : (
            /* Digital high-tech oval eyes */
            <g className="robot-eyes-normal">
              <circle cx="40" cy="47" r="4.5" fill="#06b6d4" filter="url(#neonCyanGlow)" className="robot-eye" />
              <circle cx="41.5" cy="45.5" r="1.5" fill="#ffffff" />
              
              <circle cx="60" cy="47" r="4.5" fill="#06b6d4" filter="url(#neonCyanGlow)" className="robot-eye" />
              <circle cx="61.5" cy="45.5" r="1.5" fill="#ffffff" />
            </g>
          )}

          {/* Floating Robotic Chassis */}
          <path
            d="M 32 76 C 32 74 38 72 50 72 C 62 72 68 74 68 76 L 64 96 C 64 98 58 100 50 100 C 42 100 36 98 36 96 Z"
            fill="url(#robotHelmetGrad)"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Holographic Reactor Core */}
          <circle cx="50" cy="85" r="6" fill="url(#robotCoreGrad)" filter="url(#coreNeonGlow)" className="robot-energy-core" />
          <circle cx="50" cy="85" r="9" stroke="#ec4899" strokeWidth="1" opacity="0.6" className="robot-core-pulse" />

          {/* Floating Jet Pods */}
          <ellipse cx="30" cy="88" rx="3.5" ry="6.5" fill="#64748b" />
          <ellipse cx="70" cy="88" rx="3.5" ry="6.5" fill="#64748b" />

          {/* Ion Thruster Glow */}
          <ellipse cx="50" cy="102" rx="7" ry="2.5" fill="#06b6d4" filter="url(#neonCyanGlow)" opacity="0.75" className="robot-thruster" />
        </svg>
      </div>

      {/* Floating Status / Speech Pill */}
      <div className="robot-speech-pill">
        <span className="speech-neon-dot" />
        <span className="speech-label">{currentMsg}</span>
        <Sparkles size={12} className="speech-sparkle text-cyan" />
      </div>

      {/* Soft Grounding Levitation Shadow */}
      <div className="robot-ground-shadow" aria-hidden="true" />
    </div>
  );
}
