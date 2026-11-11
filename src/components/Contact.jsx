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
  MapPin
} from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact({ onOpenResume }) {
  const [copiedKey, setCopiedKey] = useState(null);

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
        <div className="cinematic-card contact-channel-card" style={{ height: '100%', margin: 0 }}>
          <div className="channel-icon-wrap-cinematic">
            <LinkedinIcon size={22} className="text-red" />
          </div>
          <div className="channel-details">
            <span className="channel-label-cinematic">LinkedIn Profile</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-value-cinematic"
              aria-label="Open Viswanathan M LinkedIn Profile in a new tab"
            >
              linkedin.com/in/viswanathan-m-434b55309
            </a>
          </div>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cinematic-red btn-sm"
            aria-label="Visit LinkedIn Profile"
          >
            <ExternalLink size={13} />
            <span>Connect</span>
          </a>
        </div>
      )
    },
    {
      id: 'email',
      element: (
        <div className="cinematic-card contact-channel-card" style={{ height: '100%', margin: 0 }}>
          <div className="channel-icon-wrap-cinematic">
            <Mail size={22} className="text-red" />
          </div>
          <div className="channel-details">
            <span className="channel-label-cinematic">Direct Email</span>
            <a
              href={`mailto:${personalInfo.email}`}
              className="channel-value-cinematic"
              title="Send email to Viswanathan M"
            >
              {personalInfo.email}
            </a>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.email, 'email')}
            className="btn btn-cinematic-dark btn-sm"
            title="Copy email to clipboard"
            aria-label="Copy email address"
            type="button"
          >
            {copiedKey === 'email' ? (
              <>
                <Check size={13} className="text-red" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
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
        <div className="cinematic-card contact-channel-card" style={{ height: '100%', margin: 0 }}>
          <div className="channel-icon-wrap-cinematic">
            <Phone size={22} className="text-red" />
          </div>
          <div className="channel-details">
            <span className="channel-label-cinematic">Direct Phone</span>
            <a
              href={`tel:${personalInfo.phone}`}
              className="channel-value-cinematic"
              title="Call Viswanathan M"
            >
              {personalInfo.phone}
            </a>
          </div>
          <button
            onClick={() => handleCopy(personalInfo.phone, 'phone')}
            className="btn btn-cinematic-dark btn-sm"
            title="Copy phone number to clipboard"
            aria-label="Copy phone number"
            type="button"
          >
            {copiedKey === 'phone' ? (
              <>
                <Check size={13} className="text-red" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
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
        <div className="cinematic-card contact-channel-card" style={{ height: '100%', margin: 0 }}>
          <div className="channel-icon-wrap-cinematic">
            <GithubIcon size={22} className="text-red" />
          </div>
          <div className="channel-details">
            <span className="channel-label-cinematic">GitHub Profile</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-value-cinematic"
            >
              github.com/viswanathan6888
            </a>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cinematic-dark btn-sm"
            aria-label="Open GitHub profile"
          >
            <ExternalLink size={13} />
            <span>Visit</span>
          </a>
        </div>
      )
    },
    {
      id: 'resume',
      element: (
        <div className="cinematic-card contact-channel-card" style={{ height: '100%', margin: 0 }}>
          <div className="channel-icon-wrap-cinematic">
            <Download size={22} className="text-red" />
          </div>
          <div className="channel-details">
            <span className="channel-label-cinematic">Verified Resume PDF</span>
            <span className="channel-value-cinematic">{resumeData.fileName}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="btn btn-cinematic-dark btn-sm"
                aria-label="View interactive resume"
              >
                <FileText size={13} />
                <span>View</span>
              </button>
            )}
            <a
              href={personalInfo.resumePdfUrl}
              download={resumeData.fileName}
              className="btn btn-cinematic-red btn-sm"
              aria-label="Download official resume PDF"
            >
              <Download size={13} />
              <span>Download</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="contact" className="section contact-section cinematic-section" aria-label="Contact & Social Links">
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Section Header */}
        <div className="section-header cinematic-header">
          <div className="section-kicker">
            <span className="kicker-num">08</span>
            <span className="kicker-sep">/</span>
            <span className="kicker-title">CONNECT</span>
          </div>
          <h2 className="section-title cinematic-title">
            LET'S WORK <span className="text-red-accent">TOGETHER.</span>
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

        {/* Clean Professional Availability Footnote with Red Indicator */}
        <div className="cinematic-card availability-badge-cinematic" style={{ marginTop: '1.75rem' }}>
          <div className="avail-status-group">
            <span className="avail-pulse-red" />
            <span className="avail-status-text">
              {personalInfo.status}
            </span>
          </div>
          <div className="avail-location-group">
            <MapPin size={14} className="text-red" />
            <span>Coimbatore, Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
