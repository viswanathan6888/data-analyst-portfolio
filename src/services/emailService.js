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
 * Never hardcodes or exposes secrets.
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

  return {
    provider: 'none',
    isConfigured: false
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

  if (!config.isConfigured) {
    const err = new Error(
      'Email service credentials are not yet configured. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file or hosting environment variables.'
    );
    err.code = 'NOT_CONFIGURED';
    throw err;
  }

  // Step 3: Dispatch via configured provider
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
