function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getProductAsset(product, context) {
  if (context === 'home') {
    return {
      image: product.homeImage,
      alt: product.homeAlt,
    };
  }

  return {
    image: product.productImage,
    alt: product.productAlt,
  };
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

function renderContactCard(block, { showLogo = false, variant = 'default' } = {}) {
  const phones = block.phones
    .map((phone) => {
      const tel = phone.replace(/\s+/g, '');
      return `
        <p class="contact-meta">
          <span aria-hidden="true">☎</span>
          <a href="tel:${escapeHtml(tel)}">${escapeHtml(phone)}</a>
        </p>
      `;
    })
    .join('');

  const emails = block.emails
    .map(
      (email) => `
        <p class="contact-meta">
          <span aria-hidden="true">✉</span>
          <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
        </p>
      `
    )
    .join('');

  const logo =
    showLogo && block.logo
      ? `<div class="contact-logo-wrap"><img class="contact-logo" src="${escapeHtml(block.logo)}" alt="${escapeHtml(block.logoAlt || block.company)}" loading="lazy" /></div>`
      : '';

  const variantClass = variant === 'footer' ? 'contact-card--footer' : '';
  const idClass = block.id ? `contact-card--${block.id}` : '';
  const cardClass = ['contact-card', variantClass, idClass].filter(Boolean).join(' ');

  return `
    <article class="${cardClass}">
      <h3>${escapeHtml(block.title)}</h3>
      <p class="contact-company">${escapeHtml(block.company)}</p>
      <p class="contact-address">${escapeHtml(block.address)}</p>
      ${logo}
      <p class="contact-label">Phone</p>
      <div>${phones}</div>
      <p class="contact-label">Email</p>
      <div>${emails}</div>
    </article>
  `;
}

export function renderFooter(target, { navigation, contactBlocks }) {
  const links = navigation
    .map((item) => `<li><a href="${item.href}">${escapeHtml(item.label)}</a></li>`)
    .join('');

  const cards = contactBlocks
    .map((block) => renderContactCard(block, { showLogo: true, variant: 'footer' }))
    .join('');

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

export function renderHomeProductCards(target, products) {
  target.innerHTML = products
    .map((product) => {
      const asset = getProductAsset(product, 'home');
      return `
        <article class="product-card reveal">
          <img
            src="${asset.image}"
            loading="lazy"
            width="860"
            height="560"
            alt="${escapeHtml(asset.alt)}"
          />
          <div class="card-body">
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.summary)}</p>
            <a class="card-link" href="products.html#product-${product.id}">View details</a>
          </div>
        </article>
      `;
    })
    .join('');
}

export function renderProductShowcase(target, products) {
  const slides = products
    .map((product) => {
      const asset = getProductAsset(product, 'product');
      return `
        <article class="carousel-slide">
          <img src="${asset.image}" loading="lazy" width="860" height="560" alt="${escapeHtml(asset.alt)}" />
          <div class="card-body">
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.summary)}</p>
            <a class="card-link" href="#product-${product.id}">View details</a>
          </div>
        </article>
      `;
    })
    .join('');

  target.innerHTML = `
    <section class="product-carousel reveal" data-carousel>
      <div class="carousel-viewport">
        <div class="carousel-track">
          ${slides}
        </div>
      </div>
      <div class="carousel-controls">
        <button class="carousel-btn" type="button" data-carousel-prev aria-label="Previous products">←</button>
        <div class="carousel-dots" data-carousel-dots aria-label="Product carousel pages"></div>
        <button class="carousel-btn" type="button" data-carousel-next aria-label="Next products">→</button>
      </div>
    </section>
  `;
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
        <p class="step-index">${String(index + 1).padStart(2, '0')}</p>
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
      const asset = getProductAsset(product, 'product');
      const bullets = product.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('');

      return `
        <article id="product-${product.id}" class="product-detail reveal">
          <button class="detail-toggle" type="button" aria-expanded="false" aria-controls="detail-panel-${product.id}">
            <span>${escapeHtml(product.name)}</span>
            <span class="detail-toggle-icon" aria-hidden="true">+</span>
          </button>
          <div id="detail-panel-${product.id}" class="detail-panel" hidden>
            <div class="detail-layout">
              <img src="${asset.image}" loading="lazy" width="860" height="560" alt="${escapeHtml(asset.alt)}" />
              <div>
                <p>${escapeHtml(product.detail)}</p>
                <ul>${bullets}</ul>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

export function renderInitiativeCards(target, initiatives) {
  target.innerHTML = initiatives
    .map(
      (item) => `
      <article class="initiative-card reveal">
        <img src="${item.image}" loading="lazy" width="1100" height="700" alt="${escapeHtml(item.alt)}" />
        <div class="initiative-copy">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </div>
      </article>
    `
    )
    .join('');
}

export function renderCertificationBoards(target, certifications) {
  target.innerHTML = certifications
    .map(
      (item) => `
      <article class="certification-card reveal">
        <img src="${item.image}" loading="lazy" width="700" height="520" alt="${escapeHtml(item.alt)}" />
        <h3>${escapeHtml(item.name)}</h3>
      </article>
    `
    )
    .join('');
}

export function renderOfficeMaps(target, mapItems, contactBlocks) {
  const contactById = new Map(contactBlocks.map((block) => [block.id, block]));

  target.innerHTML = mapItems
    .map((mapItem) => {
      const block = contactById.get(mapItem.id);
      if (!block) {
        return '';
      }

      const query = encodeURIComponent(block.address);
      const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
      const openUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

      return `
        <article class="map-card reveal">
          <h3>${escapeHtml(mapItem.title)}</h3>
          <iframe
            class="map-frame"
            src="${embedUrl}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="${escapeHtml(mapItem.title)} map"
          ></iframe>
          <p class="map-address">${escapeHtml(block.address)}</p>
          <p class="map-fallback">
            <a href="${openUrl}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
          </p>
        </article>
      `;
    })
    .join('');
}

export function renderContactCards(target, contactBlocks, options = {}) {
  const { showLogos = false } = options;
  target.innerHTML = contactBlocks
    .map((block) => renderContactCard(block, { showLogo: showLogos }))
    .join('');
}
