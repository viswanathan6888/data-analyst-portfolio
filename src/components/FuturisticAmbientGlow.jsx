import React from 'react';

/**
 * Futuristic Ambient Glow & Floating Cyber Particles
 * - Soft neon atmospheric lighting (cyan, violet, pink)
 * - Shimmering floating particle specks
 * - Delicate cybernetic spatial grid
 * - Strictly pointer-events: none, sits behind content, 100% non-blocking
 * - Respects prefers-reduced-motion
 */
export default function FuturisticAmbientGlow() {
  const particles = [
    { left: '8%', top: '15%', delay: '0s', duration: '6s', size: 'small', color: 'cyan' },
    { left: '22%', top: '35%', delay: '1.2s', duration: '7.5s', size: 'medium', color: 'violet' },
    { left: '88%', top: '20%', delay: '0.5s', duration: '6.8s', size: 'small', color: 'pink' },
    { left: '76%', top: '48%', delay: '2.1s', duration: '8.2s', size: 'large', color: 'cyan' },
    { left: '15%', top: '65%', delay: '1.8s', duration: '7.1s', size: 'small', color: 'violet' },
    { left: '42%', top: '80%', delay: '0.8s', duration: '6.4s', size: 'medium', color: 'cyan' },
    { left: '92%', top: '75%', delay: '2.5s', duration: '7.8s', size: 'small', color: 'pink' },
    { left: '60%', top: '28%', delay: '1.5s', duration: '8.5s', size: 'small', color: 'cyan' },
    { left: '30%', top: '12%', delay: '3.0s', duration: '6.2s', size: 'medium', color: 'pink' },
    { left: '82%', top: '90%', delay: '0.9s', duration: '7.4s', size: 'small', color: 'violet' },
    { left: '5%', top: '85%', delay: '2.2s', duration: '8.0s', size: 'medium', color: 'cyan' },
    { left: '68%', top: '62%', delay: '1.7s', duration: '6.9s', size: 'small', color: 'pink' }
  ];

  return (
    <div className="futuristic-ambient-layer" aria-hidden="true">
      {/* Subtle Ambient Neon Light Aura Wells */}
      <div className="ambient-glow-well glow-well-cyan top-left" />
      <div className="ambient-glow-well glow-well-violet mid-right" />
      <div className="ambient-glow-well glow-well-pink bottom-center" />

      {/* Floating Cyber Particle Field */}
      <div className="floating-particles-field">
        {particles.map((p, idx) => (
          <span
            key={idx}
            className={`cyber-particle particle-${p.color} particle-${p.size}`}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* Delicate Cybernetic Geometric Grid */}
      <div className="ambient-cyber-mesh" />
    </div>
  );
}
