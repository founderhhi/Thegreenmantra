import content from '../content/site-content.json';
import {
  renderHeader,
  renderFooter,
  renderProductCards,
  renderProofItems,
  renderHowItWorksList,
  renderApproachSteps,
  renderProductDetails,
  renderProjectBlocks,
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
  case 'projects':
    initProjectsPage();
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
  setText('#home-mission-text', home.missionText);

  renderSimpleList(document.querySelector('#home-mission-list'), home.missionBullets);
  renderProductCards(document.querySelector('#home-product-grid'), content.products);
  renderHowItWorksList(document.querySelector('#home-how-list'), content.howItWorksBullets);
  renderProofItems(document.querySelector('#home-proof-list'), content.proofItems);
}

function initAboutPage() {
  const about = content.pages.about;
  setText('#about-headline', about.headline);
  setText('#about-copy', about.copy);

  renderApproachSteps(document.querySelector('#about-approach-grid'), content.aboutApproach);
  renderProofItems(document.querySelector('#about-proof-list'), content.proofItems);
}

function initProductsPage() {
  const products = content.pages.products;
  setText('#products-headline', products.headline);
  setText('#products-intro', products.intro);
  setText('#products-quote', products.quote);
  setText('#products-details-heading', products.detailsHeading);

  renderProductCards(document.querySelector('#products-grid'), content.products, {
    linkToDetails: true,
  });

  renderProductDetails(document.querySelector('#products-details'), content.products);
  renderProofItems(document.querySelector('#products-proof-list'), content.proofItems);
  initAccordions();
}

function initProjectsPage() {
  const projects = content.pages.projects;
  setText('#projects-headline', projects.headline);
  setText('#projects-intro', projects.intro);
  renderProjectBlocks(document.querySelector('#projects-blocks'), content.projects);
}

function initContactPage() {
  const contact = content.pages.contact;
  setText('#contact-headline', contact.headline);
  setText('#contact-intro', contact.intro);

  renderContactCards(document.querySelector('#contact-cards'), content.contactBlocks);
  initContactForm(content.cta.form);
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

function renderSimpleList(target, items) {
  if (!target) {
    return;
  }

  target.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}
