import React, { useState } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import {
  Mail,
  Phone,
  Send,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2,
  Download,
  Info,
  AlertCircle
} from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact({ onOpenResume }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasConfiguredGithub =
    Boolean(personalInfo.github) &&
    personalInfo.github.trim() !== '' &&
    !personalInfo.github.includes('your-github-username');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);

      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formState.subject || 'Data Analyst / AI Developer Inquiry'
      )}&body=${encodeURIComponent(
        `From: ${formState.name} (${formState.email})\n\n${formState.message}`
      )}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    }, 500);
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
            Connect with me directly through my verified email, phone, and LinkedIn.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-info-column">
            <h3 className="contact-column-title">Verified Contact Info</h3>
            <p className="contact-column-desc">
              Direct details from my resume. Fully active email, phone, and professional LinkedIn network.
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
                    aria-label="Open M. Viswanathan LinkedIn Profile in a new tab"
                  >
                    linkedin.com/in/viswanathan-m
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
                    <span className="chip chip-violet" style={{ fontSize: '0.65rem' }}>Active</span>
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="channel-value"
                    title="Send Email to M. Viswanathan"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="btn btn-sm btn-secondary copy-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
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
                    title="Call M. Viswanathan"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="btn btn-sm btn-secondary copy-btn"
                  title="Copy phone number to clipboard"
                  aria-label="Copy phone number"
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

              {/* GitHub Card - Configurable */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <GithubIcon size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">GitHub Profile</span>
                    <span className="channel-hint">{hasConfiguredGithub ? 'Connected' : 'To Configure'}</span>
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
                      Add your URL in portfolioData.js
                    </span>
                  )}
                </div>
                {hasConfiguredGithub ? (
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
                ) : (
                  <span className="chip chip-subtle" title="Never invent unverified GitHub URLs">
                    Optional
                  </span>
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
                <button
                  onClick={onOpenResume}
                  className="btn btn-sm btn-primary copy-btn"
                  aria-label="View or download official resume"
                >
                  <Download size={14} />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            {/* Availability Notice */}
            <div className="glass-card availability-badge-card">
              <div className="avail-header">
                <span className="avail-pulse-dot" />
                <span className="avail-status">{personalInfo.status}</span>
              </div>
              <p className="avail-note">
                Located in Coimbatore, Tamil Nadu, India. Open to on-site, hybrid, and remote positions.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-column">
            <div className="glass-card contact-form-card">
              <h3 className="form-title">Send a Direct Message</h3>
              <p className="form-subtitle">
                Have an inquiry or role opportunity? Send a message directly to <code>{personalInfo.email}</code>.
              </p>

              {formSubmitted ? (
                <div className="form-success-card animate-pulse-subtle">
                  <CheckCircle2 size={40} className="text-cyan success-icon" />
                  <h4 className="success-title">Message Prepared!</h4>
                  <p className="success-text">
                    Opening your default email client with your message pre-addressed to <strong>{personalInfo.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormState({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate={false}>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Hiring Manager / Team Lead"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="e.g. recruiter@company.com"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g. Opportunity: Data Analyst / AI Developer"
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      required
                      placeholder="Share details regarding the role, tech stack, or project..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="form-input form-textarea"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary form-submit-btn"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
