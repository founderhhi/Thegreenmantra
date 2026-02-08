# CONTENT.md

This file explains where editable copy and assets live after the revamp.

## 1. Main Content File

Edit:

- `src/content/site-content.json`

This controls:

- Navigation labels/paths
- CTA labels (`Contact Us`, `Send`)
- Home/About/Products/Contact copy
- Product images (`homeImage` and `productImage`)
- About `Our Journey` and `Key Initiatives`
- Regional contact cards (Asia/Africa)
- Products-only proof strip and certification boards
- Contact-page office maps (`officeMaps`)

## 2. Product Image Fields

Each product in `products[]` now uses:

- `homeImage`, `homeAlt`
- `productImage`, `productAlt`

`BIO-PACK` and `BIO-RESINE` currently use generated branded visuals:

- `public/assets/products/bio-pack-generated.webp`
- `public/assets/products/bio-resine-generated.webp`

## 3. Regional Contact Cards

`contactBlocks[]` supports optional logo metadata:

- `logo`
- `logoAlt`

Footer cards display logos. Contact page cards intentionally do not.

## 4. Products Certifications Section

Products page uses:

- `productsProofItems[]`
- `productCertifications[]`

Each certification object:

- `name`
- `image`
- `alt`

## 5. Asset Locations

- Brand/header logo: `public/assets/brand/`
- Home visuals: `public/assets/home/`
- About visuals: `public/assets/about/`
- Product visuals: `public/assets/products/`
- Certification boards: `public/assets/certifications/`
- Regional logos: `public/assets/regional/`

## 6. Regenerate Optimized Assets

When reference images change, regenerate all output assets:

```bash
npm run assets:prepare
```

Source files are read from:

- `Ref For design and assets/TGM-Pics/`
