import React, { useState } from 'react';
import { personalInfo, resumeData } from '../data/portfolioData';
import {
  Mail,
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
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailConfigured =
    personalInfo.email &&
    !personalInfo.email.includes('your.email') &&
    !personalInfo.email.includes('example.com');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleEmailButtonClick = (e) => {
    if (!isEmailConfigured) {
      e.preventDefault();
      setEmailStatusMessage(
        'Placeholder detected: Please update your real Gmail address in src/data/portfolioData.js to activate the live mailto link.'
      );
      setTimeout(() => setEmailStatusMessage(''), 6000);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);

      if (isEmailConfigured) {
        const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
          formState.subject || 'Data Analyst / AI Developer Inquiry'
        )}&body=${encodeURIComponent(
          `From: ${formState.name} (${formState.email})\n\n${formState.message}`
        )}`;
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 800);
      }
    }, 600);
  };

  return (
    <section id="contact" className="section contact-section" aria-label="Contact & Social Links">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-cyan">
            <Mail size={14} />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="section-title">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            Open to discussing Data Analyst, Business Intelligence, and AI Developer opportunities. 
            Connect directly through the verified channels below.
          </p>
        </div>

        {/* Email configuration helper toast if placeholder clicked */}
        {emailStatusMessage && (
          <div className="glass-card email-warning-toast animate-pulse-subtle">
            <AlertCircle size={18} className="text-cyan" />
            <span>{emailStatusMessage}</span>
          </div>
        )}

        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-info-column">
            <h3 className="contact-column-title">Direct Channels</h3>
            <p className="contact-column-desc">
              LinkedIn is directly linked to my verified profile. GitHub and Gmail can be customized in <code>src/data/portfolioData.js</code>.
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

              {/* GitHub Card */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <GithubIcon size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">GitHub Repository</span>
                    <span className="chip chip-violet" style={{ fontSize: '0.65rem' }}>Portfolio Source</span>
                  </div>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-value"
                    aria-label="Open GitHub Profile"
                  >
                    {personalInfo.github.replace('https://', '')}
                  </a>
                </div>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary copy-btn"
                  aria-label="Visit GitHub Profile"
                >
                  <ExternalLink size={14} />
                  <span>View</span>
                </a>
              </div>

              {/* Gmail Contact Card */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <Mail size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <div className="channel-meta-badge">
                    <span className="channel-label">Gmail Address</span>
                    <span className="channel-hint">{isEmailConfigured ? 'Live' : 'Placeholder'}</span>
                  </div>
                  <a
                    href={isEmailConfigured ? `mailto:${personalInfo.email}` : '#contact'}
                    onClick={handleEmailButtonClick}
                    className="channel-value"
                    title={isEmailConfigured ? 'Send Email' : 'Configure email in portfolioData.js'}
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

              {/* Direct Resume Download Card */}
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
                  className="btn btn-sm btn-secondary copy-btn"
                  aria-label="View or download resume file"
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
                Actively seeking Data Analyst and AI Developer opportunities. Prompt response time.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="contact-form-column">
            <div className="glass-card contact-form-card">
              <h3 className="form-title">Send a Direct Message</h3>
              <p className="form-subtitle">
                Have an inquiry or role opening? Reach out directly via the form below.
              </p>

              {formSubmitted ? (
                <div className="form-success-card animate-pulse-subtle">
                  <CheckCircle2 size={40} className="text-cyan success-icon" />
                  <h4 className="success-title">Message Received!</h4>
                  <p className="success-text">
                    {isEmailConfigured
                      ? `Opening your default email client addressed to ${personalInfo.email}.`
                      : `Message prepared! Update your Gmail in src/data/portfolioData.js to connect automatic mailto transmission.`}
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
                      placeholder="e.g. Data Analyst Opportunity"
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
                      placeholder="Share details about the position, team, or project..."
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
