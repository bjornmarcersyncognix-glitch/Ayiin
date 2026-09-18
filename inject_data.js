const fs = require('fs');
let appJs = fs.readFileSync('./app.js', 'utf8');

const newAteliers =   'breakout-atelier': {
    id: 'breakout-atelier',
    name: 'Breakout Urban Atelier',
    origin: 'Lahore & Dubai DIFC Hub',
    founded: '2010',
    trustScore: '99.3%',
    ordersFulfilled: '3,840+',
    dispatchRate: '99.6%',
    disputeRate: '0.01%',
    rating: '4.91',
    headline: 'Structured Box Leatherette & Contemporary Architectural Bags',
    bio: 'Pioneering structured leather accessories and minimalist silhouette luggage for the forward-moving cosmopolitan clientele between Lahore and Dubai.',
    coverBanner: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    brandCategories: ['All Works', 'Structured Bags', 'Hobo Bags', 'Convertible Packs'],
    hubs: ['Lahore Heritage Protocol', 'Dubai DIFC Hub']
  },
  'lama-retail': {
    id: 'lama-retail',
    name: 'LAMA Artisanal Guild',
    origin: 'Lahore & London Vault',
    founded: '2021',
    trustScore: '99.5%',
    ordersFulfilled: '2,920+',
    dispatchRate: '99.5%',
    disputeRate: '0.02%',
    rating: '4.93',
    headline: 'Hand-Crafted Real Leather Footwear & Woven Saddle Belts',
    bio: 'Dedicated to genuine leather cordwaining, hand-lasted chunky sandals, boat loafers, and woven accessory craft inspected under Ayiin diplomatic protocols.',
    coverBanner: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1600&q=85',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    brandCategories: ['All Works', 'Artisanal Footwear', 'Fine Belts', 'Saddle Leather'],
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault']
  }
};;

if (!appJs.includes('breakout-atelier')) {
  appJs = appJs.replace(/\n\s*'bottega-artisans':\s*\{[\s\S]*?\n\s*\}\n\};/, match => {
    return match.replace(/\n\};/, ',\n' + newAteliers);
  });
}

const scrapedProducts = JSON.parse(fs.readFileSync('./scraped_products.json', 'utf8'));

const productsEndMarker = '\n];\n\n// =============================================================================\n// 4. CLIENT-SIDE ROUTER';
if (appJs.includes(productsEndMarker)) {
  const formattedScraped = scrapedProducts.map(p => '  ' + JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  appJs = appJs.replace(productsEndMarker, ',\n' + formattedScraped + productsEndMarker);
  fs.writeFileSync('./app.js', appJs, 'utf8');
  console.log('Successfully injected real scraped products into app.js!');
} else {
  console.error('Marker not found in app.js');
}
