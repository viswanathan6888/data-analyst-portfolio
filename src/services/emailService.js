import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData.js';

/**
 * Validate contact form input fields.
 * Requirements:
 * - Name: Required, min 2 chars
 * - Email: Required, valid email format
 * - Subject: Required, min 3 chars
 * - Message: Required, min 10 chars
 */
export function validateContactForm(data) {
  const errors = {};
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const subject = (data.subject || '').trim();
  const message = (data.message || '').trim();

  // Name validation
  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address (e.g. name@company.com).';
  }

  // Subject validation
  if (!subject) {
    errors.subject = 'Please enter a subject.';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  // Message validation
  if (!message) {
    errors.message = 'Please enter your message.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Safely inspect and read EmailJS configuration.
 * Uses direct static access for Vite compile-time substitution.
 */
export function getEmailServiceConfig() {
  const serviceId =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_SERVICE_ID) ||
    (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_SERVICE_ID) ||
    '';

  const templateId =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID) ||
    (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_TEMPLATE_ID) ||
    '';

  const publicKey =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_PUBLIC_KEY) ||
    '';

  const missing = [];
  if (!serviceId || serviceId.includes('your_')) missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!templateId || templateId.includes('your_')) missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!publicKey || publicKey.includes('your_')) missing.push('VITE_EMAILJS_PUBLIC_KEY');

  const isConfigured = missing.length === 0;

  return {
    provider: isConfigured ? 'emailjs' : 'none',
    isConfigured,
    serviceId: isConfigured ? serviceId : '',
    templateId: isConfigured ? templateId : '',
    publicKey: isConfigured ? publicKey : '',
    missing
  };
}

/**
 * Send contact email message directly through EmailJS to: viswanathan23ad060@gmail.com
 *
 * @param {Object} formData { name, email, subject, message }
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function sendContactEmail(formData) {
  // Step 1: Client-side validation
  const validation = validateContactForm(formData);
  if (!validation.isValid) {
    const firstError = Object.values(validation.errors)[0];
    const err = new Error(firstError);
    err.validationErrors = validation.errors;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  // Step 2: Check EmailJS configuration
  const config = getEmailServiceConfig();
  const recipientEmail = personalInfo.email || 'viswanathan23ad060@gmail.com';

  if (!config.isConfigured) {
    const err = new Error(
      `EmailJS is not configured. Missing in .env: ${config.missing.join(', ')}`
    );
    err.code = 'NOT_CONFIGURED';
    err.missing = config.missing;
    throw err;
  }

  // Step 3: Dispatch via EmailJS SDK
  const templateParams = {
    // Primary variables
    from_name: formData.name.trim(),
    from_email: formData.email.trim(),
    reply_to: formData.email.trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim(),
    to_email: recipientEmail,
    to_name: personalInfo.name || 'Viswanathan M',

    // Aliases to support all template naming conventions
    name: formData.name.trim(),
    email: formData.email.trim(),
    user_name: formData.name.trim(),
    user_email: formData.email.trim()
  };

  try {
    emailjs.init({ publicKey: config.publicKey });
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );

    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        message: `Your message has been delivered to ${recipientEmail}.`
      };
    } else {
      throw new Error(response.text || 'EmailJS returned a non-200 status code.');
    }
  } catch (err) {
    console.error('EmailJS Send Error:', err);
    const detailedMessage =
      err?.text ||
      err?.message ||
      'Failed to deliver message via EmailJS. Please verify your EmailJS service ID, template ID, and public key.';
    const sendError = new Error(detailedMessage);
    sendError.code = 'EMAILJS_ERROR';
    sendError.originalError = err;
    throw sendError;
  }
}
