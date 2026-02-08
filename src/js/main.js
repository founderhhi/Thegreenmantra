import content from '../content/site-content.json';
import {
  renderHeader,
  renderFooter,
  renderHomeProductCards,
  renderProductShowcase,
  renderProofItems,
  renderHowItWorksList,
  renderApproachSteps,
  renderProductDetails,
  renderInitiativeCards,
  renderCertificationBoards,
  renderOfficeMaps,
  renderContactCards,
} from './components.js';
import { initRevealAnimations, initAccordions } from './animations.js';
import { initContactForm } from './form.js';

const page = document.body.dataset.page;

renderHeader(document.querySelector('#site-header'), {
  navigation: content.navigation,
  currentPath: getCurrentPath(),
});

renderFooter(document.querySelector('#site-footer'), {
  navigation: content.navigation,
  contactBlocks: content.contactBlocks,
});

bindPrimaryCta();

switch (page) {
  case 'home':
    initHomePage();
    break;
  case 'about':
    initAboutPage();
    break;
  case 'products':
    initProductsPage();
    break;
  case 'contact':
    initContactPage();
    break;
  default:
    break;
}

initRevealAnimations();

function initHomePage() {
  const home = content.pages.home;
  setText('#home-hero-headline', home.heroHeadline);
  setText('#home-hero-subhead', home.heroSubhead);
  setText('#home-mission-heading', home.missionHeading);
  setText('#home-how-title', home.howHeading);

  const missionParagraphs = home.missionParagraphs || [];
  setText('#home-mission-text-1', missionParagraphs[0] || '');
  setText('#home-mission-text-2', missionParagraphs[1] || '');

  renderSimpleList(document.querySelector('#home-mission-list'), home.missionBullets);
  renderHomeProductCards(document.querySelector('#home-product-grid'), content.products);
  renderHowItWorksList(document.querySelector('#home-how-list'), content.howItWorksBullets);
  renderProofItems(document.querySelector('#home-proof-list'), content.proofItems);
}

function initAboutPage() {
  const about = content.pages.about;
  setText('#about-headline', about.headline);
  setText('#about-copy', about.copy);
  setText('#about-journey-title', about.journey.heading);
  setText('#about-journey-copy', about.journey.intro);
  setText('#about-initiatives-title', about.keyInitiativesHeading);

  setImage('#about-journey-image', about.journey.image, about.journey.alt);

  renderApproachSteps(document.querySelector('#about-approach-grid'), content.aboutApproach);
  renderProofItems(document.querySelector('#about-proof-list'), content.proofItems);
  renderSimpleList(document.querySelector('#about-journey-list'), about.journey.bullets);
  renderInitiativeCards(document.querySelector('#about-initiatives-grid'), about.keyInitiatives);
}

function initProductsPage() {
  const products = content.pages.products;
  setText('#products-headline', products.headline);
  setText('#products-intro', products.intro);
  setText('#products-quote', products.quote);
  setText('#products-showcase-heading', products.showcaseHeading);
  setText('#products-details-heading', products.detailsHeading);
  setText('#products-proof-title', products.proofHeading);
  setText('#products-certifications-title', products.certificationsHeading);

  renderProductShowcase(document.querySelector('#products-showcase'), content.products);
  renderProductDetails(document.querySelector('#products-details'), content.products);
  renderProofItems(document.querySelector('#products-proof-list'), content.productsProofItems);
  renderCertificationBoards(
    document.querySelector('#products-certifications-grid'),
    content.productCertifications
  );

  initProductCarousel(document.querySelector('[data-carousel]'));
  initAccordions();
}

function initContactPage() {
  const contact = content.pages.contact;
  setText('#contact-headline', contact.headline);
  setText('#contact-intro', contact.intro);

  renderContactCards(document.querySelector('#contact-cards'), content.contactBlocks, {
    showLogos: false,
  });
  renderOfficeMaps(
    document.querySelector('#contact-maps-grid'),
    contact.officeMaps || [],
    content.contactBlocks
  );

  initContactForm(content.cta.form);
}

function initProductCarousel(container) {
  if (!container) {
    return;
  }

  const track = container.querySelector('.carousel-track');
  const prev = container.querySelector('[data-carousel-prev]');
  const next = container.querySelector('[data-carousel-next]');
  const dotsRoot = container.querySelector('[data-carousel-dots]');

  if (!track || !prev || !next || !dotsRoot) {
    return;
  }

  const slides = [...track.children];
  if (slides.length === 0) {
    return;
  }

  let index = 0;
  let perView = 1;
  let step = 0;
  let resizeTimer = null;

  function getPerView() {
    if (window.innerWidth >= 1100) {
      return 3;
    }
    if (window.innerWidth >= 760) {
      return 2;
    }
    return 1;
  }

  function maxIndex() {
    return Math.max(0, slides.length - perView);
  }

  function buildDots() {
    const count = maxIndex() + 1;
    dotsRoot.innerHTML = '';

    for (let i = 0; i < count; i += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'carousel-dot';
      button.setAttribute('aria-label', `Show products ${i + 1}`);
      button.addEventListener('click', () => {
        index = i;
        update();
      });
      dotsRoot.append(button);
    }
  }

  function update() {
    const max = maxIndex();
    if (index > max) {
      index = max;
    }
    if (index < 0) {
      index = 0;
    }

    track.style.transform = `translateX(-${index * step}px)`;
    prev.disabled = index === 0;
    next.disabled = index === max;

    const dots = [...dotsRoot.querySelectorAll('.carousel-dot')];
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  }

  function measure() {
    perView = getPerView();
    const gap = 16;
    const basis = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`;
    slides.forEach((slide) => {
      slide.style.flex = `0 0 ${basis}`;
    });

    const firstSlide = slides[0];
    if (!firstSlide) {
      return;
    }

    step = firstSlide.getBoundingClientRect().width + gap;
    buildDots();
    update();
  }

  prev.addEventListener('click', () => {
    index -= 1;
    update();
  });

  next.addEventListener('click', () => {
    index += 1;
    update();
  });

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(measure, 120);
  });

  measure();
}

function bindPrimaryCta() {
  const buttons = [...document.querySelectorAll('[data-cta-primary]')];
  buttons.forEach((button) => {
    button.textContent = content.cta.primary;
  });

  const sendButton = document.querySelector('[data-form-send]');
  if (sendButton) {
    sendButton.textContent = content.cta.form;
  }
}

function getCurrentPath() {
  const pathname = window.location.pathname;
  if (!pathname || pathname.endsWith('/')) {
    return 'index.html';
  }

  const parts = pathname.split('/');
  return parts[parts.length - 1] || 'index.html';
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (!node) {
    return;
  }

  node.textContent = value;
}

function setImage(selector, src, alt) {
  const image = document.querySelector(selector);
  if (!image) {
    return;
  }

  image.src = src;
  image.alt = alt;
}

function renderSimpleList(target, items) {
  if (!target) {
    return;
  }

  target.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}
