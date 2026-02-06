import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const refDir = path.join(rootDir, 'Ref For design and assets');
const brandDir = path.join(rootDir, 'public', 'assets', 'brand');
const brochureDir = path.join(rootDir, 'public', 'assets', 'brochure');
const productsDir = path.join(rootDir, 'public', 'assets', 'products');
const placeholdersDir = path.join(rootDir, 'public', 'assets', 'placeholders');

async function ensureDirs() {
  await fs.mkdir(brandDir, { recursive: true });
  await fs.mkdir(brochureDir, { recursive: true });
  await fs.mkdir(productsDir, { recursive: true });
  await fs.mkdir(placeholdersDir, { recursive: true });
}

async function convertToWebp(sourcePath, outputPath, options = {}) {
  const { width, height, fit = 'inside', quality = 82 } = options;
  let pipeline = sharp(sourcePath);

  if (width || height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit,
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality }).toFile(outputPath);
}

async function cropToWebp(sourcePath, outputPath, crop, options = {}) {
  const { width, height, quality = 82 } = options;
  let pipeline = sharp(sourcePath).extract(crop);

  if (width || height) {
    pipeline = pipeline.resize({
      width,
      height,
      fit: 'cover',
      position: 'center',
      withoutEnlargement: false,
    });
  }

  await pipeline.webp({ quality }).toFile(outputPath);
}

async function createPlaceholder(outputPath, title, subtitle) {
  const svg = `
    <svg width="960" height="640" viewBox="0 0 960 640" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#F7F7F7"/>
          <stop offset="100%" stop-color="#E4F2D2"/>
        </linearGradient>
      </defs>
      <rect width="960" height="640" fill="url(#bg)" />
      <rect x="34" y="34" width="892" height="572" fill="none" stroke="#94BC58" stroke-width="4" rx="24" />
      <text x="480" y="290" font-family="Poppins, Arial, sans-serif" font-size="56" text-anchor="middle" fill="#248C4E" font-weight="700">${title}</text>
      <text x="480" y="360" font-family="Inter, Arial, sans-serif" font-size="30" text-anchor="middle" fill="#346A68">${subtitle}</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(outputPath);
}

async function run() {
  await ensureDirs();

  const brochureConversions = [
    ['Screenshot (15).png', 'home-hero-lifestyle.webp', { width: 1600 }],
    ['0.PNG', 'home-flagship-highlight.webp', { width: 1600 }],
    ['4.PNG', 'home-lifecycle.webp', { width: 1400 }],
    ['5.PNG', 'home-aerobic-degradation.webp', { width: 1400 }],
    ['6.PNG', 'home-ipr-biobag.webp', { width: 1400 }],
    ['7.PNG', 'home-iso-test-results.webp', { width: 1400 }],
    ['8.PNG', 'about-products-innovation.webp', { width: 1600 }],
    ['9.PNG', 'projects-story-panels.webp', { width: 1600 }],
    ['11.PNG', 'brand-legacy-banner.webp', { width: 1600 }],
    ['Capture.PNG', 'projects-africa-initiative.webp', { width: 1600 }],
    ['TGM_visual_aid_home.png', 'wireframe-home.webp', { width: 1600 }],
    ['TGM_visual_aid_products.png', 'wireframe-products.webp', { width: 1600 }],
    ['TGM_visual_aid_contact.png', 'wireframe-contact.webp', { width: 1600 }],
  ];

  for (const [srcFile, outFile, options] of brochureConversions) {
    const src = path.join(refDir, srcFile);
    const out = path.join(brochureDir, outFile);
    await convertToWebp(src, out, options);
  }

  await cropToWebp(
    path.join(refDir, '3.PNG'),
    path.join(brochureDir, 'projects-tirupati.webp'),
    { left: 0, top: 0, width: 622, height: 701 },
    { width: 1100, height: 700 }
  );

  await cropToWebp(
    path.join(refDir, '3.PNG'),
    path.join(brochureDir, 'projects-sdg-grid.webp'),
    { left: 622, top: 0, width: 623, height: 701 },
    { width: 1100, height: 700 }
  );

  await cropToWebp(
    path.join(refDir, '2.PNG'),
    path.join(productsDir, 'bio-bottle.webp'),
    { left: 0, top: 140, width: 308, height: 380 },
    { width: 860, height: 560 }
  );

  await cropToWebp(
    path.join(refDir, '2.PNG'),
    path.join(productsDir, 'bio-bag.webp'),
    { left: 308, top: 140, width: 308, height: 380 },
    { width: 860, height: 560 }
  );

  await cropToWebp(
    path.join(refDir, '0.PNG'),
    path.join(productsDir, 'bio-pot.webp'),
    { left: 380, top: 140, width: 460, height: 390 },
    { width: 860, height: 560 }
  );

  await cropToWebp(
    path.join(refDir, '2.PNG'),
    path.join(productsDir, 'bio-pad.webp'),
    { left: 924, top: 140, width: 308, height: 380 },
    { width: 860, height: 560 }
  );

  await cropToWebp(
    path.join(refDir, '2.PNG'),
    path.join(productsDir, 'bio-bin.webp'),
    { left: 616, top: 140, width: 308, height: 380 },
    { width: 860, height: 560 }
  );

  await createPlaceholder(
    path.join(productsDir, 'bio-pack.webp'),
    'BIO-PACK',
    'Brochure visual pending'
  );

  await createPlaceholder(
    path.join(productsDir, 'bio-resine.webp'),
    'BIO-RESINE',
    'Brochure visual pending'
  );

  await createPlaceholder(
    path.join(placeholdersDir, 'generic-product-placeholder.webp'),
    'IMAGE TODO',
    'Replace with brochure export'
  );

  const logoPng = path.join(brandDir, 'logo.png');
  const logoWebp = path.join(brandDir, 'logo.webp');
  await convertToWebp(logoPng, logoWebp, { width: 240, quality: 92 });
}

run().then(
  () => {
    console.log('Assets prepared successfully.');
  },
  (error) => {
    console.error(error);
    process.exitCode = 1;
  }
);
