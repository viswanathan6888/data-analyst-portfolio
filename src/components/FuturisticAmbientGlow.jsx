import React, { useEffect, useState, useRef } from 'react';

/**
 * Premium Ambient Lighting & Subtle Interactive Mouse Spotlight
 * Inspired by Apple Pro and modern AI SaaS interfaces.
 * Features:
 * - Smooth mouse-following radial spotlight (damped via requestAnimationFrame)
 * - Ultra-soft ambient gradient glows in background (diffuse, non-distracting)
 * - Subtle geometric dot matrix with radial falloff
 * - Strictly pointer-events: none, non-blocking, composited
 * - Respects prefers-reduced-motion
 */
export default function FuturisticAmbientGlow() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handlePointerMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth lerp loop for the mouse spotlight
    const updatePosition = () => {
      // Smooth linear interpolation (lerp)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.12;

      setMousePos({
        x: Math.round(currentPos.current.x),
        y: Math.round(currentPos.current.y)
      });

      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="premium-ambient-backdrop" aria-hidden="true">
      {/* Interactive Cursor Spotlight */}
      {mousePos.x > -500 && (
        <div
          className="cursor-spotlight"
          style={{
            transform: `translate3d(${mousePos.x - 350}px, ${mousePos.y - 350}px, 0)`
          }}
        />
      )}

      {/* Soft Ambient Aurora Gradient Wells */}
      <div className="ambient-aurora-well aurora-cyan" />
      <div className="ambient-aurora-well aurora-violet" />
      <div className="ambient-aurora-well aurora-pink" />

      {/* Subtle Architectural Dot Grid */}
      <div className="ambient-dot-grid" />
    </div>
  );
}
