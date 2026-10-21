import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  Mail,
  Send,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  MapPin,
  CheckCircle2
} from './Icons';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Construct mailto link fallback
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formState.subject || 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        `From: ${formState.name} (${formState.email})\n\n${formState.message}`
      )}`;
      
      // Reset form after short delay
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);
    }, 600);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag section-tag-cyan">
            <Mail size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle">
            Whether you have a data analytics project, need local AI automation, 
            or want to explore full-time/contract roles, feel free to reach out.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Editable Links & Cards */}
          <div className="contact-info-column">
            <h3 className="contact-column-title">Direct Channels</h3>
            <p className="contact-column-desc">
              All links below use standard editable placeholders. Replace them with your actual profiles in <code>src/data/portfolioData.js</code>.
            </p>

            <div className="contact-cards-list">
              {/* Email Card */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <Mail size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">Email Address</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="channel-value"
                    title="Send Email"
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

              {/* LinkedIn Card */}
              <div className="glass-card contact-channel-card glass-card-cyan">
                <div className="channel-icon-wrap bg-cyan-soft">
                  <LinkedinIcon size={22} className="text-cyan" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">LinkedIn Profile</span>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-value"
                  >
                    {personalInfo.linkedin.replace('https://', '')}
                  </a>
                </div>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-secondary copy-btn"
                  aria-label="Open LinkedIn profile"
                >
                  <ExternalLink size={14} />
                  <span>Visit</span>
                </a>
              </div>

              {/* GitHub Card */}
              <div className="glass-card contact-channel-card">
                <div className="channel-icon-wrap bg-violet-soft">
                  <GithubIcon size={22} className="text-violet" />
                </div>
                <div className="channel-details">
                  <span className="channel-label">GitHub Repository</span>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-value"
                  >
                    {personalInfo.github.replace('https://', '')}
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
            </div>

            {/* Quick Availability Card */}
            <div className="glass-card availability-badge-card">
              <div className="avail-header">
                <span className="avail-pulse-dot" />
                <span className="avail-status">{personalInfo.status}</span>
              </div>
              <p className="avail-note">
                Available for Data Analyst, BI Developer, and AI Engineer roles. Fast response time within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-column">
            <div className="glass-card contact-form-card">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtitle">
                Fill out the form below to send an inquiry directly to <code>{personalInfo.email}</code>.
              </p>

              {formSubmitted ? (
                <div className="form-success-card animate-pulse-subtle">
                  <CheckCircle2 size={40} className="text-cyan success-icon" />
                  <h4 className="success-title">Message Prepared!</h4>
                  <p className="success-text">
                    Opening your default email client with your prefilled message addressed to <code>{personalInfo.email}</code>.
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
                        placeholder="e.g. Sarah Connor"
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
                        placeholder="e.g. sarah@example.com"
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
                      placeholder="e.g. Data Analytics / AI Developer Role"
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
                      placeholder="Tell me about your project, team, or opportunity..."
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
