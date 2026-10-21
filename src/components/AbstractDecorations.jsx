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

// Abstract Organic Art Poster Cover (Matching Reference Artwork, No Photo)
// Features the colorful fluid organic topography, Matisse paper-cut style lobes, and editorial badges
export const AbstractArtCover = () => {
  return (
    <div className="abstract-portrait-wrapper" aria-label="Colorful Abstract Portfolio Artwork">
      {/* Background Decorative Abstract Shapes matching reference artwork */}
      <div className="blob-bg-layer blob-pink" />
      <div className="blob-bg-layer blob-orange" />
      <div className="blob-bg-layer blob-yellow" />
      <div className="blob-bg-layer blob-blue" />
      <div className="blob-bg-layer blob-green" />
      <div className="blob-bg-layer blob-purple" />
      <div className="blob-bg-layer blob-navy" />

      {/* Main Abstract Art Poster Canvas */}
      <div className="abstract-art-canvas">
        <svg
          viewBox="0 0 400 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="abstract-art-svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <clipPath id="posterClip">
              <rect width="400" height="520" rx="32" />
            </clipPath>
          </defs>

          <g clipPath="url(#posterClip)">
            {/* 1. Base soft blush pink background */}
            <rect width="400" height="520" fill="#f8b6c8" />

            {/* 2. Top Hot Pink Wave */}
            <path
              d="M0,0 L400,0 L400,160 C360,180 340,140 280,140 C230,140 210,120 180,120 C120,120 80,160 0,130 Z"
              fill="#ec4899"
            />

            {/* 3. Orange Upper Flowing Blob */}
            <path
              d="M110,60 C140,25 210,30 230,70 C245,100 240,150 200,175 C160,200 120,185 105,150 C90,115 90,80 110,60 Z"
              fill="#f97316"
            />

            {/* 4. Yellow Inner Lobe */}
            <path
              d="M125,75 C150,55 195,65 205,95 C215,125 200,150 170,160 C140,170 120,145 115,120 C110,95 115,85 125,75 Z"
              fill="#fbbf24"
            />

            {/* 5. Sky Blue Lake */}
            <path
              d="M135,115 C165,100 195,120 190,155 C185,190 145,215 125,190 C105,165 115,130 135,115 Z"
              fill="#0284c7"
            />

            {/* 6. Dark Royal Navy Serpentine Ribbon */}
            <path
              d="M255,30 C300,30 350,50 400,60 L400,320 C380,310 370,270 350,260 C325,245 320,190 340,160 C355,135 340,90 300,70 C270,55 255,45 255,30 Z"
              fill="#1e3a8a"
            />

            {/* 7. Center Spring Green Lobe */}
            <path
              d="M150,210 C210,210 265,195 270,250 C275,295 240,325 180,335 C120,345 80,300 90,260 C100,220 120,210 150,210 Z"
              fill="#10b981"
            />

            {/* 8. Winding White Fluid River Ribbon */}
            <path
              d="M0,170 C40,170 70,195 90,230 C120,285 160,340 230,360 C290,380 310,340 330,280 C345,230 365,160 400,110 L400,180 C370,220 355,290 340,340 C320,400 270,410 210,385 C140,355 105,300 75,250 C55,220 30,200 0,200 Z"
              fill="#ffffff"
            />

            {/* 9. Lower Electric Purple Wave */}
            <path
              d="M0,370 C40,370 70,330 110,340 C160,355 180,410 220,420 C270,430 300,380 340,390 C370,395 385,420 400,430 L400,520 L0,520 Z"
              fill="#8b5cf6"
            />

            {/* 10. Lower Deep Purple Puddle */}
            <path
              d="M140,360 C190,360 210,400 200,440 C190,470 150,475 130,450 C110,425 115,385 140,360 Z"
              fill="#6d28d9"
            />

            {/* 11. Lower Left Coral-Red Corner */}
            <path
              d="M0,390 C30,390 60,430 50,470 C40,510 10,520 0,520 Z"
              fill="#f43f5e"
            />

            {/* 12. Lower Right Teal Corner */}
            <path
              d="M300,520 C320,480 350,450 400,460 L400,520 Z"
              fill="#0d9488"
            />

            {/* 13. Lower Right Coral Droplet */}
            <path
              d="M340,430 C360,410 380,430 380,460 C380,490 360,500 345,485 C330,470 330,445 340,430 Z"
              fill="#f97316"
            />

            {/* 14. Editorial Typography Cutout directly matching reference image cover layout */}
            <g transform="translate(32, 240)">
              <text
                x="0"
                y="0"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="18"
                fontWeight="900"
                letterSpacing="0.08em"
                fill="#0f172a"
              >
                PORTFOLIO
              </text>
              <text
                x="0"
                y="22"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="18"
                fontWeight="900"
                letterSpacing="0.08em"
                fill="#0f172a"
              >
                DATA &amp; AI
              </text>
            </g>
          </g>
        </svg>

        {/* Glossy Overlay Rim */}
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

// Clean, Professional Profile Frame (140-170px Desktop, 110-130px Mobile)
// Clean circular frame with crisp white & gradient ring
// Colorful abstract background shapes float behind without overlapping photo or text
export const ProfessionalProfileFrame = ({
  imageSrc = '/profile.jpg',
  altText = 'Viswanathan M - Data Analyst | AI & Data Science Professional'
}) => {
  return (
    <div className="professional-portrait-wrapper" aria-label="Viswanathan M Profile Portrait">
      {/* Background Abstract Organic Blobs - Floating Behind Without Overlapping Photo or Text */}
      <div className="portrait-bg-blobs" aria-hidden="true">
        <div className="p-blob p-blob-pink" />
        <div className="p-blob p-blob-orange" />
        <div className="p-blob p-blob-yellow" />
        <div className="p-blob p-blob-blue" />
        <div className="p-blob p-blob-green" />
        <div className="p-blob p-blob-purple" />
      </div>

      {/* Main Clean Circular Portrait Card */}
      <div className="profile-frame-card">
        <div className="profile-ring-outer">
          <div className="profile-img-container">
            <img
              src={imageSrc || '/profile.jpg'}
              alt={altText}
              className="professional-profile-img"
              loading="eager"
              width="155"
              height="155"
            />
          </div>
        </div>

        {/* Professional Meta Pill below photo */}
        <div className="profile-caption-pill">
          <span className="profile-status-dot" />
          <span className="profile-caption-text">Viswanathan M</span>
        </div>
      </div>

      {/* Floating Art Chips positioned cleanly outside the photo */}
      <div className="art-chip profile-art-chip-1">
        <span className="chip-indicator chip-ind-yellow" />
        <span className="chip-text">Data &amp; AI</span>
      </div>
      <div className="art-chip profile-art-chip-2">
        <span className="chip-indicator chip-ind-pink" />
        <span className="chip-text">Power BI &bull; SQL &bull; ML</span>
      </div>
    </div>
  );
};

export const OrganicProfileFrame = ProfessionalProfileFrame;

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
