const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
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
  const [lamaData, breakoutData, sanaData] = await Promise.all([
    fetchJson('https://lamaretail.com/products.json?limit=250'),
    fetchJson('https://www.breakout.com.pk/products.json?limit=250'),
    fetchJson('https://sanasafinaz.com/products.json?limit=250')
  ]);

  const products = [];

  // 1. SANA SAFINAZ (CLOTHING)
  const sanaItems = sanaData.products.filter(p => p.images && p.images.length >= 2);
  let sanaCount = 0;
  for (const p of sanaItems) {
    if (sanaCount >= 6) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '4500');
    const wasPkrPrice = variant.compare_at_price ? parseFloat(variant.compare_at_price) : null;
    
    // Luxury multiplier calibration: convert PKR to standard base GBP
    const baseGbp = Math.round(pkrPrice * 0.08); // e.g. 4050 PKR -> ~324 GBP
    const wasGbp = wasPkrPrice ? Math.round(wasPkrPrice * 0.08) : null;

    const sizes = p.options.find(o => /size/i.test(o.name))?.values || ['S', 'M', 'L', 'XL'];
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Beige';

    products.push({
      id: 'ss-' + p.id,
      atelierId: 'sana-safinaz',
      category: 'clothing',
      subCategory: p.title.toLowerCase().includes('satin') ? 'Architectural Silks' : 'Haute Prêt',
      brand: 'Sana Safinaz Couture',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp && wasGbp > baseGbp,
      isNewArrival: sanaCount < 3,
      isBestAtelier: true,
      origin: 'Mayfair Vault, London & Lahore',
      dispatchHub: 'Lahore Heritage Protocol',
      trustScore: '99.8%',
      inspectedAt: 'Lahore Master Atelier & London Vault',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Archive Consignment (-' + Math.round((1 - baseGbp / wasGbp) * 100) + '%)' : 'Verified Drop',
      colorName: colorVal,
      colorHex: '#FAF7F2',
      description: cleanHtml(p.body_html) || 'Curated directly from Sana Safinaz seasonal drop. Hand-pleated architecture and bespoke craftsmanship.',
      details: {
        composition: 'Pure Silk Crepe / Cambric Brochia blend with hand-stitched detailing.',
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
    sanaCount++;
  }

  // 2. BREAKOUT (BAGS)
  const breakoutBags = breakoutData.products.filter(p => 
    (p.product_type === 'BAGS' || /BAG/i.test(p.title)) && p.images && p.images.length >= 2
  );
  let breakoutCount = 0;
  for (const p of breakoutBags) {
    if (breakoutCount >= 6) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '7999');
    
    // Scale bag price to luxury calibration
    const baseGbp = Math.round(pkrPrice * 0.05); // e.g. 8499 PKR -> 425 GBP
    const wasGbp = breakoutCount % 2 === 0 ? Math.round(baseGbp * 1.22) : null;

    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Burgundy';

    products.push({
      id: 'bo-' + p.id,
      atelierId: 'breakout-atelier',
      category: 'bags',
      subCategory: 'Structured Bags',
      brand: 'Breakout Urban Atelier',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: breakoutCount < 3,
      isBestAtelier: true,
      origin: 'Lahore & Dubai DIFC Hub',
      dispatchHub: 'Dubai DIFC Hub',
      trustScore: '99.3%',
      inspectedAt: 'Ayiin Regional Authenticity Vault, Dubai',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Consignment Sale (-18%)' : 'Fall Collection Drop',
      colorName: colorVal,
      colorHex: colorVal.toLowerCase().includes('burgundy') ? '#5E0B1B' : '#0B132B',
      description: cleanHtml(p.body_html) || 'Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.',
      details: {
        composition: 'Full-Grain Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.',
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
    breakoutCount++;
  }

  // 3. LAMA (FOOTWEAR)
  const lamaShoes = lamaData.products.filter(p => 
    /SANDALS|BOAT SHOES|BOOTS|PUMPS|LOAFERS|MULES/i.test(p.product_type) && p.images && p.images.length >= 2
  );
  let lamaFootwearCount = 0;
  for (const p of lamaShoes) {
    if (lamaFootwearCount >= 4) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '8010');
    const wasPkrPrice = variant.compare_at_price ? parseFloat(variant.compare_at_price) : null;
    
    // Scale footwear
    const baseGbp = Math.round(pkrPrice * 0.045); // e.g. 11610 PKR -> 522 GBP
    const wasGbp = wasPkrPrice ? Math.round(wasPkrPrice * 0.045 * 1.18) : (lamaFootwearCount === 0 ? Math.round(baseGbp * 1.25) : null);

    const sizes = p.options.find(o => /size/i.test(o.name))?.values || ['36', '37', '38', '39', '40', '41'];
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Wine';

    products.push({
      id: 'lama-' + p.id,
      atelierId: 'lama-retail',
      category: 'footwear',
      subCategory: 'Artisanal Footwear',
      brand: 'LAMA Artisanal Guild',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: lamaFootwearCount < 2,
      isBestAtelier: true,
      origin: 'Florence & DIFC Hub',
      dispatchHub: 'London Mayfair Vault',
      trustScore: '99.5%',
      inspectedAt: 'Ayiin Quality Vetting Suite',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Archive Drop (-20%)' : 'Hand-Welted Real Leather',
      colorName: colorVal,
      colorHex: colorVal.toLowerCase().includes('wine') ? '#5E0B1B' : '#0B132B',
      description: cleanHtml(p.body_html) || 'Hand-finished leather footwear combining modern silhouette structure with super soft insole comfort.',
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
    lamaFootwearCount++;
  }

  // 4. LAMA (BELTS)
  const lamaBelts = lamaData.products.filter(p => 
    /BELT/i.test(p.product_type) && p.images && p.images.length >= 1
  );
  let lamaBeltCount = 0;
  for (const p of lamaBelts) {
    if (lamaBeltCount >= 4) break;
    const variant = p.variants[0] || {};
    const pkrPrice = parseFloat(variant.price || '4950');
    
    // Scale belts
    const baseGbp = Math.round(pkrPrice * 0.055); // e.g. 4950 PKR -> 272 GBP
    const wasGbp = lamaBeltCount % 2 === 1 ? Math.round(baseGbp * 1.25) : null;

    const sizes = p.options.find(o => /size/i.test(o.name))?.values || ['75 cm', '80 cm', '85 cm', '90 cm'];
    const colorVal = p.options.find(o => /color/i.test(o.name))?.values[0] || 'Black';

    products.push({
      id: 'lama-belt-' + p.id,
      atelierId: 'lama-retail',
      category: 'belts',
      subCategory: 'Fine Belts',
      brand: 'LAMA Artisanal Guild',
      title: titleCase(p.title),
      basePrice: baseGbp,
      wasPrice: wasGbp,
      isOnSale: !!wasGbp,
      isNewArrival: lamaBeltCount === 0,
      isBestAtelier: true,
      origin: 'Florence & DIFC Hub',
      dispatchHub: 'London Mayfair Vault',
      trustScore: '99.5%',
      inspectedAt: 'Ayiin Quality Vetting Suite',
      dispatchTime: '2-4 business days via DHL Express',
      tag: wasGbp ? 'Private Vault (-20%)' : 'Woven & Saddle Leather',
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
    lamaBeltCount++;
  }

  console.log('Total live scraped items processed: ' + products.length);
  fs.writeFileSync('./scraped_products.json', JSON.stringify(products, null, 2), 'utf-8');
  console.log('Saved scraped_products.json successfully!');
}

run().catch(console.error);
