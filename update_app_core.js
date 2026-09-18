const fs = require('fs');

// 1. Load 40 scraped products
const scraped = JSON.parse(fs.readFileSync('./all_scraped_products.json', 'utf8'));

// 2. Load app.js
let appJs = fs.readFileSync('./app.js', 'utf8');

// 3. Define the 4 Official Real Brand Ateliers with official logos & metadata
const officialAteliers = const ATELIERS = {
  'breakout-atelier': {
    id: 'breakout-atelier',
    name: 'Breakout',
    brandKey: 'Breakout',
    officialLogo: 'https://www.breakout.com.pk/cdn/shop/files/Bkt_logo.svg',
    logoDark: false,
    origin: 'Lahore & Dubai DIFC Hub',
    founded: '2010',
    trustScore: '99.3%',
    ordersFulfilled: '3,840+',
    dispatchRate: '99.6%',
    disputeRate: '0.01%',
    rating: '4.91',
    headline: 'Structured Box Handbags, Pleated Totes & Modern Accessories',
    bio: 'Official Breakout Atelier. Known for contemporary urban silhouettes, reinforced architectural stitching, and structured leatherette luxury collections.',
    coverBanner: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85',
    portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    brandCategories: ['All Works', 'Structured Bags', 'Pleated Bags', 'Buckle Handbags', 'Convertible Backpacks'],
    hubs: ['Lahore Heritage Protocol', 'Dubai DIFC Hub']
  },
  'sana-safinaz': {
    id: 'sana-safinaz',
    name: 'Sana Safinaz',
    brandKey: 'Sana Safinaz',
    officialLogo: 'https://sanasafinaz.com/cdn/shop/files/Sana_Safinaz-1_1.png',
    logoDark: true,
    origin: 'London Mayfair & Lahore Vault',
    founded: '1989',
    trustScore: '99.8%',
    ordersFulfilled: '4,620+',
    dispatchRate: '99.8%',
    disputeRate: '0.01%',
    rating: '4.98',
    headline: 'Pioneers of Contemporary Subcontinental Haute Couture & Fine Silk Prêt',
    bio: 'Official Sana Safinaz House. Iconic architectural draping, bespoke raw silk handloom weaving, and master needlecraft with verified authenticity seal.',
    coverBanner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85',
    portrait: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    brandCategories: ['All Works', 'Haute Prêt', 'Architectural Silks', 'Brochia Shalwars', 'Satin Shirts'],
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault']
  },
  'baroque-couture': {
    id: 'baroque-couture',
    name: 'Baroque',
    brandKey: 'Baroque',
    officialLogo: 'https://baroque.pk/cdn/shop/files/LOGO_PNG_V01.png',
    logoDark: true,
    origin: 'Lahore & London Mayfair Vault',
    founded: '2015',
    trustScore: '99.9%',
    ordersFulfilled: '3,450+',
    dispatchRate: '99.9%',
    disputeRate: '0.00%',
    rating: '4.99',
    headline: 'Exquisite Embroidered Micro-Velvet Shawls & Formal Couture',
    bio: 'Official Baroque Fashion Guild. Master-beaded micro-velvet, bespoke formal ensembles, and heirloom shawls finished under Ayiin diplomatic inspection.',
    coverBanner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
    portrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    brandCategories: ['All Works', 'Embroidered Velvet', 'Velvet Shawls', 'Formal Couture'],
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault']
  },
  'lama-retail': {
    id: 'lama-retail',
    name: 'LAMA',
    brandKey: 'LAMA',
    officialLogo: 'https://lamaretail.com/cdn/shop/files/LAMA-WHITE.png',
    logoDark: false,
    origin: 'Florence Guild & Lahore Vault',
    founded: '2021',
    trustScore: '99.5%',
    ordersFulfilled: '2,920+',
    dispatchRate: '99.5%',
    disputeRate: '0.02%',
    rating: '4.93',
    headline: 'Hand-Crafted Real Leather Footwear, Chunky Sandals & Woven Belts',
    bio: 'Official LAMA Retail Guild. Dedicated to genuine real leather cordwaining, hand-welted chunky sandals, boat loafers, and woven accessories.',
    coverBanner: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1600&q=85',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    brandCategories: ['All Works', 'Artisanal Footwear', 'Leather Sandals', 'Fine Belts', 'Woven Belts'],
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault']
  }
};;

// Replace ATELIERS object
appJs = appJs.replace(/const ATELIERS = \{[\s\S]*?\n\};/, officialAteliers);

// Replace PRODUCTS array with the 40 real scraped products
const formattedProducts = JSON.stringify(scraped, null, 2);
appJs = appJs.replace(/const PRODUCTS = \[[\s\S]*?\n\];/, 'const PRODUCTS = ' + formattedProducts + ';');

fs.writeFileSync('./app.js', appJs, 'utf8');
console.log('Successfully updated app.js with 4 official real brand ateliers and 40 scraped products!');
