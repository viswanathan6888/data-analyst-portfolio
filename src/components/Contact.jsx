import React, { useState } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import {
  Mail,
  Phone,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  MapPin,
  Download,
  Briefcase,
  FileText,
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

  return (
    <section id="contact" className="section contact-section" aria-label="Contact & Social Links">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-cyan">
            <Mail size={14} />
            <span>Direct Channels</span>
          </div>
          <h2 className="section-title">
            Contact & <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open to discussing Data Analyst, AI Developer, and Data Scientist opportunities. 
            Connect with me directly through my verified email, phone, and professional LinkedIn network.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Verified Contact Channels */}
          <div className="contact-info-column">
            <h3 className="contact-column-title">Verified Contact Info</h3>
            <p className="contact-column-desc">
              Direct details from my resume. Reach out anytime through verified email, phone, or LinkedIn.
            </p>

            <div className="contact-cards-list">
              {/* Verified LinkedIn Card */}
              <div className="glass-card contact-channel-card glass-card-cyan">
                <div className="channel-icon-wrap bg-cyan-soft">
                  <LinkedinIcon size={22} className="text-cyan" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">LinkedIn Profile</span>
                    <span className="chip chip-cyan" style={{ fontSize: '0.65rem' }}>Verified</span>
                  </div>
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

              {/* Verified Gmail Address */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <Mail size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">Verified Email</span>
                    <span className="chip chip-violet" style={{ fontSize: '0.65rem' }}>Primary</span>
                  </div>
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

              {/* Verified Phone Number */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-cyan-soft">
                  <Phone size={22} className="text-cyan" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">Direct Phone</span>
                    <span className="chip chip-cyan" style={{ fontSize: '0.65rem' }}>Resume</span>
                  </div>
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

              {/* GitHub Card */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <GithubIcon size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">GitHub Profile</span>
                    <span className="chip chip-violet" style={{ fontSize: '0.65rem' }}>Repositories</span>
                  </div>
                  {hasConfiguredGithub ? (
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-value"
                    >
                      {personalInfo.github.replace('https://', '')}
                    </a>
                  ) : (
                    <span className="channel-value text-muted" style={{ fontSize: '0.85rem' }}>
                      github.com/viswanathan6888
                    </span>
                  )}
                </div>
                {hasConfiguredGithub && (
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
                )}
              </div>

              {/* Resume Quick Action */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-cyan-soft">
                  <Download size={22} className="text-cyan" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Curriculum Vitae</span>
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
            </div>

            {/* Availability Notice */}
            <div className="glass-card availability-badge-card">
              <div className="avail-header">
                <span className="avail-pulse-dot" />
                <span className="avail-status">{personalInfo.status}</span>
              </div>
              <p className="avail-note">
                Located in Coimbatore, Tamil Nadu, India. Open to on-site, hybrid, and remote opportunities across Data Analytics, AI Engineering, and Data Science.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Professional Overview & Direct Reach Showcase */}
          <div className="contact-overview-column">
            <div className="glass-card contact-overview-card">
              <div className="overview-header">
                <div className="section-tag section-tag-purple" style={{ marginBottom: '0.75rem' }}>
                  <Sparkles size={14} />
                  <span>Opportunities & Collaboration</span>
                </div>
                <h3 className="overview-title">
                  Let's Discuss Next Steps
                </h3>
                <p className="overview-subtitle">
                  I am actively seeking roles where I can deliver impactful data models, insightful business dashboards, and practical AI applications. Reach out directly via email or connect on LinkedIn.
                </p>
              </div>

              {/* Direct Highlight Cards */}
              <div className="contact-highlights-stack">
                {/* Email Highlight Card */}
                <div className="direct-reach-box">
                  <div className="reach-icon-box bg-violet-soft">
                    <Mail size={22} className="text-violet" />
                  </div>
                  <div className="reach-content">
                    <span className="reach-tag">Direct Email</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="reach-main-text"
                      title={`Send email to ${personalInfo.email}`}
                    >
                      {personalInfo.email}
                    </a>
                    <span className="reach-desc">
                      Fastest channel for job opportunities, interview requests, and collaboration inquiries.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.email, 'overview-email')}
                    className="btn btn-sm btn-primary reach-action-btn"
                    aria-label="Copy direct email"
                  >
                    {copiedKey === 'overview-email' ? (
                      <>
                        <Check size={14} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LinkedIn Highlight Card */}
                <div className="direct-reach-box">
                  <div className="reach-icon-box bg-cyan-soft">
                    <LinkedinIcon size={22} className="text-cyan" />
                  </div>
                  <div className="reach-content">
                    <span className="reach-tag">LinkedIn Network</span>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reach-main-text"
                      title="Open Viswanathan M LinkedIn profile"
                    >
                      linkedin.com/in/viswanathan-m
                    </a>
                    <span className="reach-desc">
                      Connect to explore professional background, credentials, and network endorsements.
                    </span>
                  </div>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary reach-action-btn"
                    aria-label="Open LinkedIn profile"
                  >
                    <ExternalLink size={14} />
                    <span>View Profile</span>
                  </a>
                </div>
              </div>

              {/* Open Roles Pill Badges */}
              <div className="focus-roles-card">
                <h4 className="focus-roles-title">
                  <Briefcase size={16} className="text-cyan" />
                  <span>Target Roles & Areas of Contribution</span>
                </h4>
                <div className="focus-roles-tags">
                  <span className="role-tag">Data Analyst</span>
                  <span className="role-tag">AI Developer</span>
                  <span className="role-tag">Data Scientist (Associate)</span>
                  <span className="role-tag">BI Dashboard Specialist</span>
                  <span className="role-tag">Python & SQL Engineering</span>
                  <span className="role-tag">LLM & GenAI Applications</span>
                </div>
              </div>

              {/* Location & Quick Summary */}
              <div className="contact-meta-footer">
                <div className="meta-footer-item">
                  <MapPin size={16} className="text-cyan" />
                  <span><strong>Base:</strong> Coimbatore, TN, India</span>
                </div>
                <div className="meta-footer-item">
                  <CheckCircle2 size={16} className="text-green" />
                  <span><strong>Availability:</strong> Immediate / Actively Interviewing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
