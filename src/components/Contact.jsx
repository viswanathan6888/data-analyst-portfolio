import React, { useState } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import SectionCarousel from './SectionCarousel';
import {
  Mail,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Download,
  FileText,
  MapPin,
  CheckCircle2
} from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact({ onOpenResume }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const hasConfiguredGithub =
    Boolean(personalInfo.github) &&
    personalInfo.github.trim() !== '' &&
    !personalInfo.github.includes('your-github-username');

  const handleCopy = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const contactCards = [
    {
      id: 'linkedin',
      element: (
        <div className="glass-card contact-channel-card glass-card-cyan" style={{ height: '100%', margin: 0, padding: '1.5rem' }}>
          <div className="channel-icon-wrap bg-cyan-soft">
            <LinkedinIcon size={24} className="text-cyan" />
          </div>
          <div className="channel-details">
            <span className="channel-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>LinkedIn Profile</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-value"
              aria-label="Open Viswanathan M LinkedIn Profile in a new tab"
            >
              linkedin.com/in/viswanathan-m-434b55309
            </a>
          </div>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary copy-btn"
            aria-label="Visit LinkedIn Profile"
          >
            <ExternalLink size={14} />
            <span>Connect</span>
          </a>
        </div>
      )
    },
    {
      id: 'email',
      element: (
        <div className="glass-card contact-channel-card" style={{ height: '100%', margin: 0, padding: '1.5rem' }}>
          <div className="channel-icon-wrap bg-violet-soft">
            <Mail size={24} className="text-violet" />
          </div>
          <div className="channel-details">
            <span className="channel-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Email Address</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="channel-value"
              title="Send email to Viswanathan M"
            >
              {personalInfo.email}
            </a>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.email, 'email')}
            className="btn btn-sm btn-secondary copy-btn"
            title="Copy email to clipboard"
            aria-label="Copy email address"
            type="button"
          >
            {copiedKey === 'email' ? (
              <>
                <Check size={14} className="text-cyan" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'phone',
      element: (
        <div className="glass-card contact-channel-card" style={{ height: '100%', margin: 0, padding: '1.5rem' }}>
          <div className="channel-icon-wrap bg-cyan-soft">
            <Phone size={24} className="text-cyan" />
          </div>
          <div className="channel-details">
            <span className="channel-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Direct Phone</span>
            <a
              href={`tel:${personalInfo.phone}`}
              className="channel-value"
              title="Call Viswanathan M"
            >
              {personalInfo.phone}
            </a>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.phone, 'phone')}
            className="btn btn-sm btn-secondary copy-btn"
            title="Copy phone number to clipboard"
            aria-label="Copy phone number"
            type="button"
          >
            {copiedKey === 'phone' ? (
              <>
                <Check size={14} className="text-cyan" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'github',
      element: (
        <div className="glass-card contact-channel-card" style={{ height: '100%', margin: 0, padding: '1.5rem' }}>
          <div className="channel-icon-wrap bg-violet-soft">
            <GithubIcon size={24} className="text-violet" />
          </div>
          <div className="channel-details">
            <span className="channel-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>GitHub</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-value"
            >
              github.com/viswanathan6888
            </a>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-secondary copy-btn"
            aria-label="Open GitHub profile"
          >
            <ExternalLink size={14} />
            <span>Visit</span>
          </a>
        </div>
      )
    },
    {
      id: 'resume',
      element: (
        <div className="glass-card contact-channel-card" style={{ height: '100%', margin: 0, padding: '1.5rem' }}>
          <div className="channel-icon-wrap bg-cyan-soft">
            <Download size={24} className="text-cyan" />
          </div>
          <div className="channel-details">
            <span className="channel-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Resume PDF</span>
            <span className="channel-value">{resumeData.fileName}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="btn btn-sm btn-secondary copy-btn"
                aria-label="View interactive resume"
              >
                <FileText size={14} />
                <span>View</span>
              </button>
            )}
            <a
              href={personalInfo.resumePdfUrl}
              download={resumeData.fileName}
              className="btn btn-sm btn-primary copy-btn"
              aria-label="Download official resume PDF"
            >
              <Download size={14} />
              <span>Download</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="contact" className="section contact-section" aria-label="Contact & Social Links">
      <div className="container" style={{ maxWidth: '860px' }}>
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Contact &amp; <span className="text-gradient">Connect</span>
          </h2>
        </div>

        {/* Contact Channels Carousel */}
        <div className="contact-carousel-wrapper">
          <SectionCarousel
            items={contactCards}
            itemsPerPage={{ desktop: 2, tablet: 1, mobile: 1 }}
            ariaLabel="Contact Channels Carousel"
            carouselId="contact-channels-carousel"
            renderItem={(card) => card.element}
          />
        </div>

        {/* Clean Professional Availability Footnote */}
        <div
          className="glass-card availability-badge-card"
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="avail-pulse-dot" />
            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
              {personalInfo.status}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <MapPin size={15} className="text-cyan" />
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
