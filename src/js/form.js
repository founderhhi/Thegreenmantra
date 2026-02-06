export function initContactForm(sendLabel = 'Send') {
  const form = document.querySelector('#contact-form');
  const statusEl = document.querySelector('#form-status');

  if (!form || !statusEl) {
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const defaultLabel = sendLabel;

  if (submitBtn) {
    submitBtn.textContent = defaultLabel;
  }

  const envEndpoint = import.meta.env.VITE_FORM_ENDPOINT;
  const dataEndpoint = form.getAttribute('data-endpoint');
  const configuredEndpoint = (envEndpoint || dataEndpoint || '').trim();

  if (!configuredEndpoint) {
    setStatus(
      statusEl,
      'warning',
      'Form endpoint is not configured yet. Add VITE_FORM_ENDPOINT in your environment settings.'
    );
    if (submitBtn) {
      submitBtn.disabled = true;
    }
    return;
  }

  const endpoint = normalizeEndpoint(configuredEndpoint);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    if (endpoint.includes('formsubmit.co')) {
      data.append('_captcha', 'false');
      data.append('_template', 'table');
      data.append('_subject', 'New enquiry from The Green Mantra website');
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setStatus(statusEl, 'info', 'Submitting your message...');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setStatus(statusEl, 'success', 'Thanks. Your message has been sent successfully.');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus(
        statusEl,
        'error',
        'We could not send your message right now. Please retry in a moment or email us directly.'
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
      }
    }
  });
}

function normalizeEndpoint(endpoint) {
  if (endpoint.includes('formsubmit.co') && !endpoint.includes('/ajax/')) {
    return endpoint.replace('formsubmit.co/', 'formsubmit.co/ajax/');
  }

  return endpoint;
}

function setStatus(element, type, message) {
  element.className = `form-status form-status--${type}`;
  element.textContent = message;
}
