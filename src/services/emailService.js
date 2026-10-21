import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/portfolioData.js';

/**
 * Validate contact form input fields.
 * Requirements:
 * - Name: Required, min 2 chars
 * - Email: Required, valid format
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
 * Detect available email service configuration from Vite environment variables.
 * Prioritizes custom EmailJS / Web3Forms keys if configured,
 * and falls back to built-in FormSubmit for zero-setup direct delivery.
 */
export function getEmailServiceConfig() {
  const env =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env
      : typeof process !== 'undefined' && process.env
      ? process.env
      : {};

  const emailjsServiceId = env.VITE_EMAILJS_SERVICE_ID || '';
  const emailjsTemplateId = env.VITE_EMAILJS_TEMPLATE_ID || '';
  const emailjsPublicKey = env.VITE_EMAILJS_PUBLIC_KEY || '';
  const web3formsAccessKey = env.VITE_WEB3FORMS_ACCESS_KEY || '';

  const isEmailjsValid =
    Boolean(emailjsServiceId) &&
    Boolean(emailjsTemplateId) &&
    Boolean(emailjsPublicKey) &&
    !emailjsServiceId.includes('your_') &&
    !emailjsTemplateId.includes('your_') &&
    !emailjsPublicKey.includes('your_');

  const isWeb3formsValid =
    Boolean(web3formsAccessKey) &&
    !web3formsAccessKey.includes('your_');

  if (isEmailjsValid) {
    return {
      provider: 'emailjs',
      isConfigured: true,
      serviceId: emailjsServiceId,
      templateId: emailjsTemplateId,
      publicKey: emailjsPublicKey
    };
  }

  if (isWeb3formsValid) {
    return {
      provider: 'web3forms',
      isConfigured: true,
      accessKey: web3formsAccessKey
    };
  }

  // Built-in zero-setup direct delivery to viswanathan23ad060@gmail.com
  return {
    provider: 'formsubmit',
    isConfigured: true,
    recipientEmail: personalInfo.email || 'viswanathan23ad060@gmail.com'
  };
}

/**
 * Send contact email message to recipient: viswanathan23ad060@gmail.com
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

  // Step 2: Check service configuration
  const config = getEmailServiceConfig();
  const recipientEmail = personalInfo.email || 'viswanathan23ad060@gmail.com';

  // Step 3: Dispatch via configured provider

  // Option A: EmailJS (if user configured .env with EmailJS keys)
  if (config.provider === 'emailjs') {
    const templateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      reply_to: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      to_email: recipientEmail,
      to_name: personalInfo.name || 'Viswanathan M',
    };

    try {
      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        {
          publicKey: config.publicKey
        }
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
        'Failed to deliver message via EmailJS. Please verify your EmailJS credentials.';
      const sendError = new Error(detailedMessage);
      sendError.code = 'EMAILJS_ERROR';
      sendError.originalError = err;
      throw sendError;
    }
  }

  // Option B: Web3Forms (if user configured VITE_WEB3FORMS_ACCESS_KEY)
  if (config.provider === 'web3forms') {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: config.accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          from_name: `${formData.name.trim()} (Portfolio)`,
          to_email: recipientEmail
        })
      });

      const result = await response.json();
      if (result.success) {
        return {
          success: true,
          message: `Your message has been delivered to ${recipientEmail}.`
        };
      } else {
        throw new Error(result.message || 'Web3Forms service reported an error.');
      }
    } catch (err) {
      console.error('Web3Forms Send Error:', err);
      const sendError = new Error(err.message || 'Failed to deliver message via Web3Forms.');
      sendError.code = 'WEB3FORMS_ERROR';
      throw sendError;
    }
  }

  // Option C: Built-in FormSubmit (zero setup direct delivery to viswanathan23ad060@gmail.com)
  if (config.provider === 'formsubmit') {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          _subject: `[Portfolio Inquiry] ${formData.subject.trim()}`,
          message: formData.message.trim(),
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();
      const isSuccess = String(data.success) === 'true';

      if (isSuccess) {
        return {
          success: true,
          message: `Your message has been delivered to ${recipientEmail}.`
        };
      }

      // Check if first-time FormSubmit email activation is required
      if (data.message && data.message.toLowerCase().includes('activation')) {
        const activationErr = new Error(
          `FormSubmit sent a one-time activation link to ${recipientEmail}. Please check your inbox and click "Activate Form" once to complete setup.`
        );
        activationErr.code = 'ACTIVATION_REQUIRED';
        activationErr.recipientEmail = recipientEmail;
        throw activationErr;
      }

      throw new Error(data.message || 'Unable to deliver message via FormSubmit service.');
    } catch (err) {
      if (err.code === 'ACTIVATION_REQUIRED') throw err;
      console.error('FormSubmit Send Error:', err);
      const sendError = new Error(
        err.message || 'Failed to deliver message. Please try again or use the email link below.'
      );
      sendError.code = 'FORMSUBMIT_ERROR';
      throw sendError;
    }
  }

  throw new Error('No valid email provider found.');
}

/**
 * Generate fallback mailto link for direct sending if service fails
 */
export function buildMailtoFallback(formData) {
  const recipient = personalInfo.email || 'viswanathan23ad060@gmail.com';
  const subject = encodeURIComponent(
    formData.subject || 'Portfolio Inquiry - Data Analyst / AI Developer'
  );
  const body = encodeURIComponent(
    `Name: ${formData.name || ''}\n` +
    `Email: ${formData.email || ''}\n\n` +
    `Message:\n${formData.message || ''}\n`
  );
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
