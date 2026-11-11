import React, { useEffect, useState, useRef } from 'react';

/**
 * Cinematic Ambient Lighting & Interactive Red Cursor Spotlight
 * Inspired by high-contrast dark editorial portfolios with vibrant red accents.
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

    const updatePosition = () => {
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
      {/* Interactive Cursor Spotlight with subtle dark red glow */}
      {mousePos.x > -500 && (
        <div
          className="cursor-spotlight-cinematic"
          style={{
            transform: `translate3d(${mousePos.x - 300}px, ${mousePos.y - 300}px, 0)`
          }}
        />
      )}

      {/* Atmospheric Red & Charcoal Radial Wells */}
      <div className="ambient-aurora-well aurora-red-deep" />
      <div className="ambient-aurora-well aurora-red-subtle" />
      <div className="ambient-aurora-well aurora-charcoal" />

      {/* Subtle Architectural Grid */}
      <div className="ambient-dot-grid" />
    </div>
  );
}
