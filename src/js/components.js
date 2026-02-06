function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderHeader(target, { navigation, currentPath }) {
  const items = navigation
    .map((item) => {
      const isActive = item.href === currentPath;
      return `<li><a href="${item.href}" ${
        isActive ? 'aria-current="page" class="is-active"' : ''
      }>${escapeHtml(item.label)}</a></li>`;
    })
    .join('');

  target.innerHTML = `
    <header class="site-header">
      <div class="header-accent" aria-hidden="true"></div>
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="The Green Mantra Home">
          <img src="/assets/brand/logo.webp" width="120" height="100" alt="The Green Mantra logo" />
          <div class="brand-copy">
            <span class="brand-name">The Green Mantra</span>
            <span class="brand-tag">Biodegradable Products</span>
          </div>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          Menu
        </button>
        <nav id="site-nav" class="site-nav" aria-label="Primary">
          <ul>${items}</ul>
        </nav>
      </div>
    </header>
  `;

  const toggle = target.querySelector('.nav-toggle');
  const nav = target.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
  }
}

function renderContactCard(block) {
  const phones = block.phones
    .map((phone) => {
      const tel = phone.replace(/\s+/g, '');
      return `<li><a href="tel:${escapeHtml(tel)}">${escapeHtml(phone)}</a></li>`;
    })
    .join('');

  const emails = block.emails
    .map((email) => `<li><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></li>`)
    .join('');

  return `
    <article class="contact-card">
      <h3>${escapeHtml(block.title)}</h3>
      <p class="contact-company">${escapeHtml(block.company)}</p>
      <p>${escapeHtml(block.address)}</p>
      <p class="contact-label">Phone</p>
      <ul>${phones}</ul>
      <p class="contact-label">Email</p>
      <ul>${emails}</ul>
    </article>
  `;
}

export function renderFooter(target, { navigation, contactBlocks }) {
  const links = navigation
    .map((item) => `<li><a href="${item.href}">${escapeHtml(item.label)}</a></li>`)
    .join('');

  const cards = contactBlocks.map((block) => renderContactCard(block)).join('');

  target.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <section>
          <h2 class="footer-heading">Quick Links</h2>
          <ul class="footer-links">${links}</ul>
        </section>
        <section class="footer-contact-grid" aria-label="Regional Contact Blocks">
          ${cards}
        </section>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} The Green Mantra. Compostable products for a circular future.</p>
      </div>
    </footer>
  `;
}

export function renderProductCards(target, products, { linkToDetails = false } = {}) {
  target.innerHTML = products
    .map((product) => {
      const detailAction = linkToDetails
        ? `<a class="card-link" href="#product-${product.id}">View details</a>`
        : `<a class="card-link" href="products.html#product-${product.id}">View details</a>`;

      const placeholderBadge = product.isPlaceholder
        ? '<span class="asset-tag">Image placeholder</span>'
        : '';

      return `
        <article class="product-card reveal">
          <img
            src="${product.image}"
            loading="lazy"
            width="860"
            height="560"
            alt="${escapeHtml(product.alt)}"
          />
          <div class="card-body">
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.summary)}</p>
            ${placeholderBadge}
            ${detailAction}
          </div>
        </article>
      `;
    })
    .join('');
}

export function renderProofItems(target, items) {
  target.innerHTML = items
    .map((item) => `<li class="proof-item reveal">${escapeHtml(item)}</li>`)
    .join('');
}

export function renderHowItWorksList(target, items) {
  target.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

export function renderApproachSteps(target, steps) {
  target.innerHTML = steps
    .map(
      (step, index) => `
      <article class="step-card reveal">
        <p class="step-index">0${index + 1}</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.description)}</p>
      </article>
    `
    )
    .join('');
}

export function renderProductDetails(target, products) {
  target.innerHTML = products
    .map((product) => {
      const bullets = product.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('');
      const placeholderNote = product.isPlaceholder
        ? '<p class="todo-note">TODO: replace placeholder with brochure-export image for this product.</p>'
        : '';

      return `
        <article id="product-${product.id}" class="product-detail reveal">
          <button class="detail-toggle" type="button" aria-expanded="false" aria-controls="detail-panel-${product.id}">
            <span>${escapeHtml(product.name)}</span>
            <span class="detail-toggle-icon" aria-hidden="true">+</span>
          </button>
          <div id="detail-panel-${product.id}" class="detail-panel" hidden>
            <div class="detail-layout">
              <img src="${product.image}" loading="lazy" width="860" height="560" alt="${escapeHtml(product.alt)}" />
              <div>
                <p>${escapeHtml(product.detail)}</p>
                <ul>${bullets}</ul>
                ${placeholderNote}
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

export function renderProjectBlocks(target, projects) {
  target.innerHTML = projects
    .map(
      (project) => `
      <article class="project-block reveal">
        <img src="${project.image}" loading="lazy" width="1100" height="700" alt="${escapeHtml(project.alt)}" />
        <div class="project-copy">
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
        </div>
      </article>
    `
    )
    .join('');
}

export function renderContactCards(target, contactBlocks) {
  target.innerHTML = contactBlocks.map((block) => renderContactCard(block)).join('');
}
