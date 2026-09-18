const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function cleanHtml(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>?/gm, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

async function run() {
  console.log('Fetching live feeds from real brand stores...');
  const [sanaData, baroqueData, breakoutData, lamaData] = await Promise.all([
    fetchJson('https://sanasafinaz.com/products.json?limit=250'),
    fetchJson('https://baroque.pk/products.json?limit=250'),
    fetchJson('https://www.breakout.com.pk/products.json?limit=250'),
    fetchJson('https://lamaretail.com/products.json?limit=250')
  ]);

  const allProducts = [];

  // ==========================================
  // 1. SANA SAFINAZ (Clothing & Couture)
  // ==========================================
  const sanaItems = sanaData.products.filter(p => p.images && p.images.length >= 2);
  let sCount = 0;
  for (const p of sanaItems) {
    if (sCount >= 10) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '4500');
    const wasPkrPrice = variant.compare_at_price ? parseFloat(variant.compare_at_price) : null;
    const baseGbp = Math.round(pkrPrice * 0.08);
    const wasGbp = wasPkrPrice ? Math.round(wasPkrPrice * 0.08) : null;
    const sizes = p.options.find(o => /size/i.test(o.name))?.values || ['S', 'M', 'L', 'XL'];
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Ivory';

    allProducts.push({
      id: 'ss-' + p.id,
      atelierId: 'sana-safinaz',
      category: 'clothing',
      subCategory: p.title.toLowerCase().includes('satin') ? 'Architectural Silks' : 'Haute Prêt',
      brand: 'Sana Safinaz',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp && wasGbp > baseGbp,
      isNewArrival: sCount < 4,
      isBestAtelier: true,
      origin: 'Mayfair Vault, London & Lahore',
      dispatchHub: 'Lahore Heritage Protocol',
      trustScore: '99.8%',
      inspectedAt: 'Lahore Master Atelier & London Vault',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Sale (-' + Math.round((1 - baseGbp / wasGbp) * 100) + '%)' : 'Official Drop',
      colorName: colorVal,
      colorHex: '#FAF7F2',
      description: cleanHtml(p.body_html) || 'Official Sana Safinaz collection piece. Hand-finished detailing with verified luxury hallmarks.',
      details: {
        composition: 'Pure Silk / Cambric Brochia luxury weave.',
        craftsmanship: 'Master-tailored in Lahore atelier; forensic stitch vetting verified.',
        escrowGuarantee: 'Protected under Ayiin Escrow. Funds bonded until client verification.'
      },
      sizes: {
        UK: sizes.map(s => 'UK ' + s),
        EU: sizes.map(s => 'EU ' + s),
        US: sizes.map(s => 'US ' + s)
      },
      image: p.images[0]?.src || '',
      imageHover: p.images[1]?.src || p.images[0]?.src || '',
      gallery: p.images.slice(0, 4).map(i => i.src)
    });
    sCount++;
  }

  // ==========================================
  // 2. BAROQUE (Velvet Shawls & Formal Couture)
  // ==========================================
  const baroqueItems = baroqueData.products.filter(p => p.images && p.images.length >= 2);
  let bqCount = 0;
  for (const p of baroqueItems) {
    if (bqCount >= 10) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '18000');
    const wasPkrPrice = bqCount % 2 === 0 ? Math.round(pkrPrice * 1.25) : null;
    const baseGbp = Math.round(pkrPrice * 0.05);
    const wasGbp = wasPkrPrice ? Math.round(wasPkrPrice * 0.05) : null;

    allProducts.push({
      id: 'bq-' + p.id,
      atelierId: 'baroque-couture',
      category: 'clothing',
      subCategory: 'Embroidered Velvet',
      brand: 'Baroque',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: bqCount < 4,
      isBestAtelier: true,
      origin: 'Lahore & London Mayfair Vault',
      dispatchHub: 'Lahore Heritage Protocol',
      trustScore: '99.9%',
      inspectedAt: 'Ayiin Forensic Authentication Vault',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Winter Archive (-20%)' : 'Hand-Embroidered Velvet',
      colorName: 'Burgundy',
      colorHex: '#5E0B1B',
      description: cleanHtml(p.body_html) || 'Exquisite embroidered velvet collection crafted with intricate beadwork details and fine border finishes.',
      details: {
        composition: '100% Pure Micro-Velvet with Bullion Embroidery.',
        craftsmanship: 'Hand-beaded and finished under dual atelier inspection.',
        escrowGuarantee: 'Bonded in sovereign escrow until 72 hours post-delivery verification.'
      },
      sizes: {
        UK: ['One Size (2.75m Shawl)'],
        EU: ['One Size (2.75m Shawl)'],
        US: ['One Size (2.75m Shawl)']
      },
      image: p.images[0]?.src || '',
      imageHover: p.images[1]?.src || p.images[0]?.src || '',
      gallery: p.images.slice(0, 4).map(i => i.src)
    });
    bqCount++;
  }

  // ==========================================
  // 3. BREAKOUT (Structured Bags & Leatherette)
  // ==========================================
  const breakoutBags = breakoutData.products.filter(p => 
    (p.product_type === 'BAGS' || /BAG/i.test(p.title)) && p.images && p.images.length >= 2
  );
  let boCount = 0;
  for (const p of breakoutBags) {
    if (boCount >= 10) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '7999');
    const baseGbp = Math.round(pkrPrice * 0.05);
    const wasGbp = boCount % 2 === 1 ? Math.round(baseGbp * 1.25) : null;
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Burgundy';

    allProducts.push({
      id: 'bo-' + p.id,
      atelierId: 'breakout-atelier',
      category: 'bags',
      subCategory: 'Structured Bags',
      brand: 'Breakout',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: boCount < 4,
      isBestAtelier: true,
      origin: 'Lahore & Dubai DIFC Hub',
      dispatchHub: 'Dubai DIFC Hub',
      trustScore: '99.3%',
      inspectedAt: 'Ayiin Regional Authenticity Vault, Dubai',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Sale (-20%)' : 'Official Drop',
      colorName: colorVal,
      colorHex: colorVal.toLowerCase().includes('burgundy') ? '#5E0B1B' : '#0B132B',
      description: cleanHtml(p.body_html) || 'Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.',
      details: {
        composition: 'Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.',
        craftsmanship: 'Hand-inspected for edge sealing and hardware alignment.',
        escrowGuarantee: 'Direct brand consignment with Ayiin Escrow buyer guarantee.'
      },
      sizes: {
        UK: ['One Size (28cm)'],
        EU: ['One Size (28cm)'],
        US: ['One Size (28cm)']
      },
      image: p.images[0]?.src || '',
      imageHover: p.images[1]?.src || p.images[0]?.src || '',
      gallery: p.images.slice(0, 4).map(i => i.src)
    });
    boCount++;
  }

  // ==========================================
  // 4. LAMA (Footwear & Belts)
  // ==========================================
  const lamaShoes = lamaData.products.filter(p => 
    /SANDALS|BOAT SHOES|BOOTS|PUMPS|LOAFERS|MULES/i.test(p.product_type) && p.images && p.images.length >= 2
  );
  let lmShoeCount = 0;
  for (const p of lamaShoes) {
    if (lmShoeCount >= 6) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '8010');
    const wasPkrPrice = variant.compare_at_price ? parseFloat(variant.compare_at_price) : null;
    const baseGbp = Math.round(pkrPrice * 0.045);
    const wasGbp = wasPkrPrice ? Math.round(wasPkrPrice * 0.045 * 1.18) : (lmShoeCount === 0 ? Math.round(baseGbp * 1.25) : null);
    const sizes = p.options.find(o => /size/i.test(o.name))?.values || ['36', '37', '38', '39', '40', '41'];
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Wine';

    allProducts.push({
      id: 'lama-' + p.id,
      atelierId: 'lama-retail',
      category: 'footwear',
      subCategory: 'Artisanal Footwear',
      brand: 'LAMA',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: lmShoeCount < 3,
      isBestAtelier: true,
      origin: 'Lahore & London Vault',
      dispatchHub: 'London Mayfair Vault',
      trustScore: '99.5%',
      inspectedAt: 'Ayiin Quality Vetting Suite',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Sale (-20%)' : 'Real Leather',
      colorName: colorVal,
      colorHex: colorVal.toLowerCase().includes('wine') ? '#5E0B1B' : '#0B132B',
      description: cleanHtml(p.body_html) || 'Hand-finished genuine leather footwear combining modern silhouette structure with soft insole comfort.',
      details: {
        composition: 'Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.',
        craftsmanship: 'Hand-lasted with reinforced welt and edge-finished accents.',
        escrowGuarantee: 'Protected under Ayiin Escrow. Inspect in person before funds release.'
      },
      sizes: {
        UK: sizes.map(s => 'UK ' + s),
        EU: sizes.map(s => 'EU ' + s),
        US: sizes.map(s => 'US ' + s)
      },
      image: p.images[0]?.src || '',
      imageHover: p.images[1]?.src || p.images[0]?.src || '',
      gallery: p.images.slice(0, 4).map(i => i.src)
    });
    lmShoeCount++;
  }

  // LAMA Belts
  const lamaBelts = lamaData.products.filter(p => 
    /BELT/i.test(p.product_type) && p.images && p.images.length >= 1
  );
  let lmBeltCount = 0;
  for (const p of lamaBelts) {
    if (lmBeltCount >= 4) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '4950');
    const baseGbp = Math.round(pkrPrice * 0.055);
    const wasGbp = lmBeltCount % 2 === 1 ? Math.round(baseGbp * 1.25) : null;
    const sizes = p.options.find(o => /size/i.test(o.name))?.values || ['75 cm', '80 cm', '85 cm', '90 cm'];
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Black';

    allProducts.push({
      id: 'lama-belt-' + p.id,
      atelierId: 'lama-retail',
      category: 'belts',
      subCategory: 'Fine Belts',
      brand: 'LAMA',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: lmBeltCount === 0,
      isBestAtelier: true,
      origin: 'Lahore & London Vault',
      dispatchHub: 'London Mayfair Vault',
      trustScore: '99.5%',
      inspectedAt: 'Ayiin Quality Vetting Suite',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Sale (-20%)' : 'Woven & Saddle Leather',
      colorName: colorVal,
      colorHex: '#0B132B',
      description: cleanHtml(p.body_html) || 'Hand-crafted woven belt designed for tailoring outerwear, formal suiting, and denim.',
      details: {
        composition: 'Woven fabric and genuine bridle leather trim with brushed brass hardware.',
        craftsmanship: 'Hand-assembled and tested for tensile buckle endurance.',
        escrowGuarantee: 'Bonded escrow security with instant replacement guarantee.'
      },
      sizes: {
        UK: sizes.map(s => '' + s),
        EU: sizes.map(s => '' + s),
        US: sizes.map(s => '' + s)
      },
      image: p.images[0]?.src || '',
      imageHover: p.images[1]?.src || p.images[0]?.src || '',
      gallery: p.images.slice(0, 4).map(i => i.src)
    });
    lmBeltCount++;
  }

  console.log('Total scraped products generated:', allProducts.length);
  fs.writeFileSync('./all_scraped_products.json', JSON.stringify(allProducts, null, 2), 'utf-8');
  console.log('Successfully saved all_scraped_products.json');
}

run().catch(console.error);
