# CONTENT.md

This file explains how to update copy, logos, images, and contact details without changing core layout code.

## 1. Main Content File

Edit:

- `src/content/site-content.json`

This controls:

- Navigation labels/paths
- CTA labels (`Contact Us`, `Send`)
- Home/About/Products/Projects/Contact text
- Product cards and detail sections
- Asia/Africa contact blocks
- Proof strip bullets

## 2. File/Asset Naming Rules

Use lowercase kebab-case names.

Examples:

- Good: `bio-pack-v2.webp`
- Good: `projects-africa-initiative.webp`
- Avoid: spaces, uppercase, special characters

## 3. Where to Put Images

- Brand/logo assets: `public/assets/brand/`
- Brochure section visuals: `public/assets/brochure/`
- Product card visuals: `public/assets/products/`
- Temporary placeholders: `public/assets/placeholders/`

## 4. How to Update Logo

1. Add new logo file in `public/assets/brand/`.
2. Keep filename consistent or update references in:
   - `src/js/components.js` (header logo path)

Preferred names:

- `logo.png` (source)
- `logo.webp` (optimized)

## 5. How to Update Product Copy

In `src/content/site-content.json`, update each object inside `products`:

- `name`
- `summary`
- `detail`
- `bullets`
- `image`
- `alt`

## 6. How to Update Contact Info

In `src/content/site-content.json`, update `contactBlocks`:

- `title`
- `company`
- `address`
- `phones`
- `emails`

## 7. Contact Form Endpoint (Free Alternative)

Set `VITE_FORM_ENDPOINT` in `.env` or Cloudflare Pages environment variables.

Example:

- `https://formsubmit.co/ajax/your-email@example.com`

## 8. Regenerate Optimized Assets

If you replace reference images and want fresh WebP outputs:

```bash
npm run assets:prepare
```

## 9. Current TODO (Missing Brochure Product Images)

The following products currently use generated placeholders and should be replaced with brochure/PDF-export visuals:

1. `BIO-PACK`
   - Current file: `public/assets/products/bio-pack.webp`
2. `BIO-RESINE`
   - Current file: `public/assets/products/bio-resine.webp`

After adding final images, update matching paths in `src/content/site-content.json`.
