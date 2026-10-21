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
import {
  validateContactForm,
  sendContactEmail,
  buildMailtoFallback,
  getEmailServiceConfig
} from '../services/emailService';

export default function Contact({ onOpenResume }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [sentDetails, setSentDetails] = useState(null);

  const hasConfiguredGithub =
    Boolean(personalInfo.github) &&
    personalInfo.github.trim() !== '' &&
    !personalInfo.github.includes('your-github-username');

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFieldChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleFieldBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validation = validateContactForm(formState);
    if (validation.errors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });

    // Validate inputs
    const validation = validateContactForm(formState);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setStatus('sending');
    setErrorMessage('');
    setErrorCode('');

    try {
      await sendContactEmail(formState);
      setSentDetails({
        name: formState.name.trim(),
        email: formState.email.trim(),
        subject: formState.subject.trim()
      });
      setStatus('success');
      // Reset form after verified successful transmission
      setFormState({ name: '', email: '', subject: '', message: '' });
      setFieldErrors({});
      setTouched({});
    } catch (err) {
      console.error('Failed to send contact message:', err);
      setStatus('error');
      setErrorCode(err.code || 'SEND_ERROR');
      setErrorMessage(
        err.message ||
          'Failed to send message. Please verify your connection or email directly.'
      );
    }
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
                <a
                  href={personalInfo.resumePdfUrl}
                  download={resumeData.fileName}
                  className="btn btn-sm btn-primary copy-btn"
                  aria-label="Download official resume PDF"
                >
                  <Download size={14} />
                  <span>Resume</span>
                </a>
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

              {status === 'success' ? (
                <div className="form-success-card animate-pulse-subtle" role="status" aria-live="polite">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="success-title">Message Sent Successfully!</h4>
                  <p className="success-text">
                    Thank you, <strong>{sentDetails?.name}</strong>! Your message has been transmitted and delivered directly to{' '}
                    <strong>{personalInfo.email}</strong>. I will review your note and respond shortly.
                  </p>

                  {sentDetails && (
                    <div className="success-summary-box">
                      <div className="summary-item">
                        <span className="summary-label">Subject:</span>{' '}
                        <span className="summary-val">{sentDetails.subject}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Your Email:</span>{' '}
                        <span className="summary-val">{sentDetails.email}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Delivered to:</span>{' '}
                        <span className="summary-val">{personalInfo.email}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setSentDetails(null);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  {status === 'error' && (
                    <div className="form-alert-error" role="alert">
                      <div className="form-alert-error-header">
                        <AlertCircle size={18} className="flex-shrink-0" />
                        <span>
                          {errorCode === 'ACTIVATION_REQUIRED'
                            ? 'One-Time Form Activation Required'
                            : errorCode === 'NOT_CONFIGURED'
                            ? 'Email Service Setup Required'
                            : 'Message Delivery Failed'}
                        </span>
                      </div>
                      <div className="form-alert-error-body">
                        {errorCode === 'ACTIVATION_REQUIRED' ? (
                          <>
                            <p style={{ marginBottom: '0.45rem' }}>
                              A confirmation email from <strong>FormSubmit</strong> was sent to <strong>{personalInfo.email}</strong>.
                            </p>
                            <p style={{ marginBottom: '0.45rem', fontSize: '0.84rem' }}>
                              👉 Please open your Gmail inbox (<strong>{personalInfo.email}</strong>) and click <strong>"Activate Form"</strong> once.
                              After that single click, all submissions will automatically arrive in your inbox!
                            </p>
                            <p style={{ fontSize: '0.84rem' }}>
                              You can also send your message directly via your email app right now without losing what you typed.
                            </p>
                          </>
                        ) : errorCode === 'NOT_CONFIGURED' ? (
                          <>
                            <p style={{ marginBottom: '0.45rem' }}>
                              Direct sending requires configuring your EmailJS environment variables in <code>.env</code>:
                            </p>
                            <pre className="env-guide-code">
{`VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key`}
                            </pre>
                            <p style={{ marginTop: '0.45rem' }}>
                              In the meantime, you can send your message directly via your email client to <strong>{personalInfo.email}</strong> without losing what you typed.
                            </p>
                          </>
                        ) : (
                          <p>{errorMessage}</p>
                        )}
                      </div>
                      <div className="form-alert-actions">
                        {errorCode === 'ACTIVATION_REQUIRED' && (
                          <a
                            href="https://mail.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary"
                          >
                            <Mail size={14} />
                            <span>Check Gmail Inbox</span>
                          </a>
                        )}
                        <a
                          href={buildMailtoFallback(formState)}
                          className={`btn btn-sm ${errorCode === 'ACTIVATION_REQUIRED' ? 'btn-secondary' : 'btn-primary'}`}
                        >
                          <Mail size={14} />
                          <span>Open Email Client</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setStatus('idle');
                            setErrorMessage('');
                          }}
                          className="btn btn-sm btn-secondary"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="form-group-row">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Your Name <span className="text-pink">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Hiring Manager / Team Lead"
                        value={formState.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        onBlur={() => handleFieldBlur('name')}
                        className={`form-input ${fieldErrors.name ? 'is-invalid' : ''}`}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                        disabled={status === 'sending'}
                      />
                      {fieldErrors.name && (
                        <div id="name-error" className="form-field-error">
                          <AlertCircle size={13} />
                          <span>{fieldErrors.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Your Email <span className="text-pink">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="e.g. recruiter@company.com"
                        value={formState.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        onBlur={() => handleFieldBlur('email')}
                        className={`form-input ${fieldErrors.email ? 'is-invalid' : ''}`}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        disabled={status === 'sending'}
                      />
                      {fieldErrors.email && (
                        <div id="email-error" className="form-field-error">
                          <AlertCircle size={13} />
                          <span>{fieldErrors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject <span className="text-pink">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="e.g. Opportunity: Data Analyst / AI Developer"
                      value={formState.subject}
                      onChange={(e) => handleFieldChange('subject', e.target.value)}
                      onBlur={() => handleFieldBlur('subject')}
                      className={`form-input ${fieldErrors.subject ? 'is-invalid' : ''}`}
                      aria-invalid={Boolean(fieldErrors.subject)}
                      aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                      disabled={status === 'sending'}
                    />
                    {fieldErrors.subject && (
                      <div id="subject-error" className="form-field-error">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.subject}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Message <span className="text-pink">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Share details regarding the role, tech stack, timeline, or schedule a discussion..."
                      value={formState.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      onBlur={() => handleFieldBlur('message')}
                      className={`form-input form-textarea ${fieldErrors.message ? 'is-invalid' : ''}`}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      disabled={status === 'sending'}
                    ></textarea>
                    {fieldErrors.message && (
                      <div id="message-error" className="form-field-error">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.message}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary form-submit-btn"
                    aria-label="Send message to Viswanathan M"
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="form-spinner" aria-hidden="true" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <div className="form-recipient-note">
                    <Sparkles size={14} className="text-cyan" />
                    <span>Delivers directly to <strong>{personalInfo.email}</strong></span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
