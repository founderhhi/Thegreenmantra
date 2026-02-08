import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const refDir = path.join(rootDir, 'Ref For design and assets', 'TGM-Pics');

const brandDir = path.join(rootDir, 'public', 'assets', 'brand');
const homeDir = path.join(rootDir, 'public', 'assets', 'home');
const aboutDir = path.join(rootDir, 'public', 'assets', 'about');
const productsDir = path.join(rootDir, 'public', 'assets', 'products');
const certificationsDir = path.join(rootDir, 'public', 'assets', 'certifications');
const regionalDir = path.join(rootDir, 'public', 'assets', 'regional');

const DEFAULT_QUALITY = 82;

async function ensureDirs() {
  await fs.mkdir(brandDir, { recursive: true });
  await fs.mkdir(homeDir, { recursive: true });
  await fs.mkdir(aboutDir, { recursive: true });
  await fs.mkdir(productsDir, { recursive: true });
  await fs.mkdir(certificationsDir, { recursive: true });
  await fs.mkdir(regionalDir, { recursive: true });
}

function ref(...parts) {
  return path.join(refDir, ...parts);
}

async function convertToWebp(sourcePath, outputPath, options = {}) {
  const { width, height, fit = 'inside', quality = DEFAULT_QUALITY } = options;
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

async function convertProductImage(sourcePath, outputPath) {
  await convertToWebp(sourcePath, outputPath, {
    width: 860,
    height: 560,
    fit: 'cover',
    quality: DEFAULT_QUALITY,
  });
}

async function createBrandedProductVisual(outputPath, title, subtitle) {
  const svg = `
    <svg width="960" height="640" viewBox="0 0 960 640" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#F4FBEF"/>
          <stop offset="100%" stop-color="#E1F3D0"/>
        </linearGradient>
        <linearGradient id="badge" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#248C4E"/>
          <stop offset="100%" stop-color="#346A68"/>
        </linearGradient>
      </defs>
      <rect width="960" height="640" fill="url(#bg)" />
      <rect x="34" y="34" width="892" height="572" rx="28" fill="none" stroke="#94BC58" stroke-width="4" />
      <circle cx="190" cy="142" r="52" fill="#94BC58" opacity="0.38" />
      <circle cx="770" cy="504" r="58" fill="#ED7429" opacity="0.2" />
      <rect x="100" y="220" width="760" height="220" rx="24" fill="white" stroke="#D5E9BE" />
      <text x="480" y="315" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="72" fill="#248C4E" font-weight="700">${title}</text>
      <text x="480" y="364" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" fill="#346A68">${subtitle}</text>
      <rect x="298" y="470" width="364" height="56" rx="28" fill="url(#badge)" />
      <text x="480" y="507" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" fill="#FFFFFF" font-weight="600">Compostable Product Innovation</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(outputPath);
}

async function run() {
  await ensureDirs();

  await convertToWebp(ref('Overall.PNG'), path.join(homeDir, 'hero-overall.webp'), {
    width: 1200,
    quality: 84,
  });
  await convertToWebp(ref('Circulareconomy.jpg'), path.join(homeDir, 'circular-economy.webp'), {
    width: 1200,
  });

  await convertToWebp(ref('Handshake.jpg'), path.join(aboutDir, 'journey-handshake.webp'), {
    width: 1200,
  });
  await convertToWebp(
    ref('Tirupati.png'),
    path.join(aboutDir, 'initiative-tirupati.webp'),
    { width: 1200 }
  );
  await convertToWebp(ref("SDG's.jpg"), path.join(aboutDir, 'initiative-sdg.webp'), {
    width: 1200,
  });
  await convertToWebp(ref('Africaproject.png'), path.join(aboutDir, 'initiative-africa.webp'), {
    width: 1200,
  });

  await convertProductImage(
    ref('BIO-BAG-Pics', 'compostable-shopping-bags.jpg'),
    path.join(productsDir, 'home-bio-bag.webp')
  );
  await convertProductImage(
    ref('BIO-BAG-Pics', 'Page 1.jpg'),
    path.join(productsDir, 'product-bio-bag.webp')
  );

  await convertProductImage(
    ref('BIO-BOTTLE-Pics', '30.jpg'),
    path.join(productsDir, 'home-bio-bottle.webp')
  );
  await convertProductImage(
    ref('BIO-BOTTLE-Pics', '29.jpg'),
    path.join(productsDir, 'product-bio-bottle.webp')
  );

  await convertProductImage(
    ref('BIO-POT-Pics', 'compostable-nursery-bags.jpg'),
    path.join(productsDir, 'home-bio-pot.webp')
  );
  await convertProductImage(
    ref('BIO-POT-Pics', 'Page 19.jpg'),
    path.join(productsDir, 'product-bio-pot.webp')
  );

  await convertProductImage(
    ref('BIO-PAD-Pics', '23.jpg'),
    path.join(productsDir, 'home-bio-pad.webp')
  );
  await convertProductImage(
    ref('BIO-PAD-Pics', 'Page 21.jpg'),
    path.join(productsDir, 'product-bio-pad.webp')
  );

  await convertProductImage(
    ref('BIO-BIN-Pics', '1. BOI-Waste Collection Bag.jpeg'),
    path.join(productsDir, 'home-bio-bin.webp')
  );
  await convertProductImage(
    ref('BIO-BIN-Pics', '2. BOI-Waste Collection Bag.jpeg'),
    path.join(productsDir, 'product-bio-bin.webp')
  );

  await createBrandedProductVisual(
    path.join(productsDir, 'bio-pack-generated.webp'),
    'BIO-PACK',
    'Compostable flexible packaging solutions'
  );
  await createBrandedProductVisual(
    path.join(productsDir, 'bio-resine-generated.webp'),
    'BIO-RESINE',
    'Compostable granules and masterbatch feedstock'
  );

  await convertToWebp(ref('appcb.PNG'), path.join(certificationsDir, 'appcb.webp'), {
    width: 700,
  });
  await convertToWebp(ref('cpcb.PNG'), path.join(certificationsDir, 'cpcb.webp'), {
    width: 700,
  });
  await convertToWebp(ref('cipet.PNG'), path.join(certificationsDir, 'cipet.webp'), {
    width: 700,
  });

  await convertToWebp(ref('vertex logo.jpg'), path.join(regionalDir, 'vertex-enterprises.webp'), {
    width: 360,
    quality: 84,
  });
  await convertToWebp(ref('TGM logo.png'), path.join(regionalDir, 'tgm-international.webp'), {
    width: 360,
    quality: 88,
  });

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
