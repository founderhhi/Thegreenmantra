# The Green Mantra Website Revamp

A static, brochure-style revamp of The Green Mantra website built with Vite multi-page architecture.

## Pages

- `index.html` (Home)
- `about-us.html` (About)
- `products.html` (Products)
- `contact-us.html` (Contact)

## Tech Stack

- Vite (MPA)
- Vanilla HTML/CSS/JS
- Data-driven content from `src/content/site-content.json`
- Free static form endpoint support (`VITE_FORM_ENDPOINT`)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Prepare optimized assets (WebP):

```bash
npm run assets:prepare
```

3. Start dev server:

```bash
npm run dev
```

4. Build production output:

```bash
npm run build
```

5. Preview production build locally:

```bash
npm run preview
```

## Quality Scripts

```bash
npm run lint
npm run format
npm run format:check
```

## Environment Variables

Copy `.env.example` to `.env` and update values:

- `VITE_FORM_ENDPOINT`: contact form POST endpoint.
  - Example for free FormSubmit AJAX mode:
    - `https://formsubmit.co/ajax/your-email@example.com`

## Asset Pipeline

- Source reference files: `Ref For design and assets/TGM-Pics/`
- Generated site assets:
  - `public/assets/brand/`
  - `public/assets/home/`
  - `public/assets/about/`
  - `public/assets/products/`
  - `public/assets/certifications/`
  - `public/assets/regional/`

Asset script: `scripts/prepare-assets.mjs`

## Notes

- Site intentionally keeps a single primary CTA: `Contact Us`.
- Contact form submit button is fixed to `Send`.
- Projects content is merged into `about-us.html` under `Our Journey` and `Key Initiatives`.
