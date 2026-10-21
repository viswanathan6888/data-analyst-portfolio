import React from 'react';

/**
 * Organic Colorful Abstract SVG Shapes & Wave Dividers
 * Inspired by the colorful Matisse/modernist abstract portfolio cover reference.
 * Palette: Hot Pink, Coral Orange, Sunshine Yellow, Ocean Blue, Lime Green, Vivid Purple, Soft Rose.
 */

// Multi-layered organic wave divider between sections
export const WaveDivider = ({ flip = false, variant = 'default', className = '' }) => {
  return (
    <div
      className={`abstract-wave-container ${flip ? 'wave-flip' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="abstract-wave-svg"
      >
        {variant === 'coral-purple' ? (
          <>
            <path
              d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="#fbcfe8"
              fillOpacity="0.5"
            />
            <path
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,53.3C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="#ffffff"
            />
          </>
        ) : variant === 'teal-yellow' ? (
          <>
            <path
              d="M0,48L60,42.7C120,37,240,27,360,37.3C480,48,600,80,720,85.3C840,91,960,69,1080,58.7C1200,48,1320,48,1380,48L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="#fef08a"
              fillOpacity="0.4"
            />
            <path
              d="M0,80L80,85.3C160,91,320,101,480,96C640,91,800,69,960,64C1120,59,1280,69,1360,74.7L1440,80L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              fill="#ffffff"
            />
          </>
        ) : (
          <>
            <path
              d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="#e0e7ff"
              fillOpacity="0.6"
            />
            <path
              d="M0,80L60,74.7C120,69,240,59,360,64C480,69,600,91,720,96C840,101,960,91,1080,80C1200,69,1320,59,1380,53.3L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
              fill="#ffffff"
            />
          </>
        )}
      </svg>
    </div>
  );
};

// Flowing wave divider transitioning into the dark footer
export const FooterWaveDivider = () => {
  return (
    <div className="footer-wave-container" aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="footer-wave-svg"
      >
        <path
          d="M0,32L60,42.7C120,53,240,75,360,69.3C480,64,600,32,720,26.7C840,21,960,43,1080,53.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          fill="#ec4899"
          fillOpacity="0.3"
        />
        <path
          d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          fill="#0f172a"
        />
      </svg>
    </div>
  );
};

// Abstract Organic Profile Portrait Frame
// Features overlapping lobes in hot pink, gold yellow, ocean blue, lime green, and deep navy
export const OrganicProfileFrame = ({ imageSrc, altText, imageLoaded, onImageLoad, imageError, onImageError }) => {
  return (
    <div className="abstract-portrait-wrapper">
      {/* Background Decorative Abstract Shapes matching reference artwork */}
      <div className="blob-bg-layer blob-pink" />
      <div className="blob-bg-layer blob-orange" />
      <div className="blob-bg-layer blob-yellow" />
      <div className="blob-bg-layer blob-blue" />
      <div className="blob-bg-layer blob-green" />
      <div className="blob-bg-layer blob-purple" />
      <div className="blob-bg-layer blob-navy" />

      {/* Main Organic Photo Contour */}
      <div className="organic-photo-frame">
        {!imageError ? (
          <img
            src={imageSrc}
            alt={altText}
            className={`organic-portrait-img ${imageLoaded ? 'loaded' : ''}`}
            onLoad={onImageLoad}
            onError={onImageError}
            loading="eager"
            width="380"
            height="460"
          />
        ) : (
          <div className="organic-portrait-fallback">
            <span className="fallback-initials">MV</span>
            <span className="fallback-text">Photo at public/profile.jpg</span>
          </div>
        )}

        {/* Inner Colorful Rim Glow */}
        <div className="organic-rim-overlay" />
      </div>

      {/* Overlapping floating art chips */}
      <div className="art-chip art-chip-1">
        <span className="chip-indicator chip-ind-yellow" />
        <span className="chip-text">Data &amp; AI</span>
      </div>
      <div className="art-chip art-chip-2">
        <span className="chip-indicator chip-ind-pink" />
        <span className="chip-text">Power BI &bull; SQL &bull; ML</span>
      </div>
    </div>
  );
};

// Page Corner & Background Floating Blobs
export const BackgroundOrganicBlobs = () => {
  return (
    <div className="page-organic-blobs" aria-hidden="true">
      <div className="corner-blob top-left-blob" />
      <div className="corner-blob top-right-blob" />
      <div className="corner-blob mid-right-blob" />
      <div className="corner-blob mid-left-blob" />
      <div className="corner-blob bottom-blob" />
    </div>
  );
};
