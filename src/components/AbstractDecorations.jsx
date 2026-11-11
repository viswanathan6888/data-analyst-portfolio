import React from 'react';

/**
 * Dark Cinematic Editorial Visual Accents & Dividers
 * Primary reference: Dark cinematic portfolio with deep black/charcoal backgrounds,
 * vibrant red accents (#ff2a3b / #ef4444), fine hairline borders, and geometric crosshairs (+, ×).
 */

// Sleek dark cinematic section divider with subtle breathing red center accent
export const WaveDivider = ({ flip = false, variant = 'default', className = '' }) => {
  return (
    <div
      className={`cinematic-section-divider ${className}`}
      aria-hidden="true"
    >
      <div className="divider-line-left" />
      <div className="divider-center-mark">
        <span className="divider-crosshair">+</span>
        <span className="divider-red-dot breathing-dot" />
        <span className="divider-crosshair">+</span>
      </div>
      <div className="divider-line-right" />
    </div>
  );
};

// Sleek red-accent hairline transition leading into the dark footer
export const FooterWaveDivider = () => {
  return (
    <div className="cinematic-footer-divider" aria-hidden="true">
      <div className="footer-divider-glow" />
      <div className="footer-divider-bar">
        <span className="footer-divider-tag">VISWANATHAN M. &bull; PORTFOLIO 2026</span>
        <span className="footer-divider-crosshair">&times;</span>
      </div>
    </div>
  );
};

// Cinematic Dark Profile Frame with scale reveal, floating motion, and breathing glow
export const ProfessionalProfileFrame = ({
  imageSrc = '/profile.jpg',
  altText = 'Viswanathan M - Data Analyst & AI Developer'
}) => {
  return (
    <div className="cinematic-portrait-wrapper" aria-label="Viswanathan M Profile Portrait">
      {/* Background Deep Red Atmospheric Glow with breathing pulse */}
      <div className="portrait-red-glow portrait-glow-pulse" aria-hidden="true" />

      {/* Decorative Technical Crosshairs */}
      <div className="portrait-crosshair top-left">+</div>
      <div className="portrait-crosshair top-right">+</div>
      <div className="portrait-crosshair bottom-left">&times;</div>
      <div className="portrait-crosshair bottom-right">&times;</div>

      {/* Main Cinematic Portrait Container with subtle vertical floating motion */}
      <div className="portrait-image-container cinematic-portrait-float">
        <div className="portrait-rim-light" />
        <img
          src={imageSrc || '/profile.jpg'}
          alt={altText}
          className="cinematic-profile-img"
          loading="eager"
          width="420"
          height="480"
        />
        {/* Seamless bottom dark gradient blend */}
        <div className="portrait-bottom-vignette" />
      </div>

      {/* Sleek Editorial Name Badge */}
      <div className="portrait-caption-pill floating-caption-badge">
        <span className="caption-red-indicator" />
        <span className="caption-name">VISWANATHAN M.</span>
        <span className="caption-role">DATA &bull; AI</span>
      </div>

      {/* Editorial Pill Badges with Micro-Floating Animations */}
      <div className="editorial-floating-chip chip-left float-anim-left">
        <span className="chip-dot" />
        <span className="chip-title">AI DEVELOPER</span>
      </div>
      <div className="editorial-floating-chip chip-right float-anim-right">
        <span className="chip-dot red" />
        <span className="chip-title">DATA ANALYST</span>
      </div>
    </div>
  );
};

export const OrganicProfileFrame = ProfessionalProfileFrame;
export const AbstractArtCover = ProfessionalProfileFrame;

// Dark Cinematic Ambient Background Layers with subtle red glows & corner crosshairs
export const BackgroundOrganicBlobs = () => {
  return (
    <div className="cinematic-ambient-background" aria-hidden="true">
      {/* Subtle deep red radial spotlights */}
      <div className="ambient-spotlight spotlight-top-center" />
      <div className="ambient-spotlight spotlight-mid-left" />
      <div className="ambient-spotlight spotlight-bottom-right" />

      {/* Tech Grid Pattern */}
      <div className="ambient-subtle-grid" />

      {/* Corner Crosshairs */}
      <div className="corner-crosshair top-left-mark">+</div>
      <div className="corner-crosshair top-right-mark">+</div>
      <div className="corner-crosshair bottom-left-mark">+</div>
      <div className="corner-crosshair bottom-right-mark">+</div>
    </div>
  );
};
