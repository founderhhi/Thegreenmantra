export function initRevealAnimations() {
  const revealItems = [...document.querySelectorAll('.reveal')];

  if (revealItems.length === 0) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -12% 0px',
    }
  );

  revealItems.forEach((element) => observer.observe(element));
}

export function initAccordions() {
  const toggles = [...document.querySelectorAll('.detail-toggle')];

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      const panelId = toggle.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      const icon = toggle.querySelector('.detail-toggle-icon');

      toggle.setAttribute('aria-expanded', String(!isOpen));

      if (icon) {
        icon.textContent = isOpen ? '+' : '-';
      }

      if (panel) {
        panel.hidden = isOpen;
      }
    });
  });
}
