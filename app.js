/**
 * AYIIN — INTERNATIONAL LUXURY MARKETPLACE
 * Master Single Page Application State Machine & Router
 * Enhanced with:
 * - Search-First Concierge Interface on Homepage
 * - Dominating Brands Showcase below the Hero
 * - Interactive Curation Tabs: New Arrivals, Best Ateliers, On Sale, Respective Brands
 * - Deep Brand Panel with Brand-Specific Categories, Sub-disciplines, and Multi-Attribute Filters
 * - Live Multi-Currency Engine (GBP, AED, PKR)
 * - Cart Drawer & Multi-Step Luxury Escrow Checkout
 */

// =============================================================================
// 1. GLOBAL CONFIGURATION & CURRENCY ENGINE
// =============================================================================
const CURRENCY_CONFIG = {
  GBP: {
    code: 'GBP',
    symbol: '£',
    label: 'UK (£)',
    rate: 1,
    format: (val) => `£${Math.round(val).toLocaleString('en-GB')}`,
    freeThreshold: 450,
    shippingFee: 25,
    country: 'United Kingdom',
    phonePrefix: '+44'
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    label: 'UAE (AED)',
    rate: 4.70,
    format: (val) => `${Math.round(val).toLocaleString('en-AE')} AED`,
    freeThreshold: 2115,
    shippingFee: 120,
    country: 'United Arab Emirates',
    phonePrefix: '+971'
  },
  PKR: {
    code: 'PKR',
    symbol: '₨',
    label: 'PK (PKR)',
    rate: 368.50,
    format: (val) => `₨ ${Math.round(val).toLocaleString('en-PK')}`,
    freeThreshold: 165000,
    shippingFee: 9200,
    country: 'Pakistan',
    phonePrefix: '+92'
  }
};

let currentCurrency = 'GBP';

function convertPrice(basePriceInGbp) {
  const cfg = CURRENCY_CONFIG[currentCurrency];
  return cfg.format(basePriceInGbp * cfg.rate);
}

function getConvertedNumber(basePriceInGbp) {
  const cfg = CURRENCY_CONFIG[currentCurrency];
  return Math.round(basePriceInGbp * cfg.rate);
}

// =============================================================================
// 2. VERIFIED ATELIER REPOSITORY (OFFICIAL PARTNER BRANDS & ATELIERS)
// =============================================================================
const ATELIERS = {
  'breakout-atelier': {
    id: 'breakout-atelier',
    name: 'Breakout',
    headline: 'Contemporary Urban Silhouettes & Modern Structural Craft',
    officialLogo: 'https://nishatemporium.com/wp-content/uploads/2019/07/Breakout-Logo-1.png',
    coverBanner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80',
    founded: '2010',
    origin: 'Lahore, Pakistan',
    trustScore: '99.3%',
    ordersFulfilled: '14,820',
    dispatchRate: '99.4%',
    disputeRate: '0.05%',
    rating: '4.9',
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault', 'Dubai Logistics Hub'],
    brandCategories: ['All Works', 'Structured Bags', 'Pleated Bags', 'Shoulder Bags', 'Convertible Backpacks']
  },
  'lama-retail': {
    id: 'lama-retail',
    name: 'LAMA',
    headline: 'Clean Scandinavian Minimalism & Premium Structured Essentials',
    officialLogo: 'https://dev.nishatemporium.com/wp-content/uploads/2023/09/LAMARETAIL.webp',
    coverBanner: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80',
    founded: '2022',
    origin: 'Lahore, Pakistan',
    trustScore: '99.6%',
    ordersFulfilled: '9,420',
    dispatchRate: '99.7%',
    disputeRate: '0.02%',
    rating: '4.9',
    hubs: ['Lahore Heritage Protocol', 'Dubai Logistics Hub', 'London Mayfair Vault'],
    brandCategories: ['All Works', 'Artisanal Footwear', 'Fine Belts', 'Leather Sandals', 'Boat Shoes']
  },
  'sana-safinaz': {
    id: 'sana-safinaz',
    name: 'Sana Safinaz',
    headline: 'Pioneers of Haute Couture, Architectural Silks & Regal Embellishments',
    officialLogo: 'https://crystalpng.com/wp-content/uploads/2025/10/sana-safinaz-logo.png',
    coverBanner: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80',
    founded: '1989',
    origin: 'Karachi, Pakistan',
    trustScore: '99.8%',
    ordersFulfilled: '28,450',
    dispatchRate: '99.8%',
    disputeRate: '0.01%',
    rating: '5.0',
    hubs: ['Lahore Heritage Protocol', 'Karachi Atelier Vault', 'London Mayfair Vault'],
    brandCategories: ['All Works', 'Haute Prêt', 'Architectural Silks', 'Embroidered Shalwars', 'Lawn & Satin Shirts']
  },
  'baroque-couture': {
    id: 'baroque-couture',
    name: 'Baroque',
    headline: 'Timeless South Asian Elegance, Intricate Zardozi & Heritage Chiffon',
    officialLogo: 'https://baroque.pk/cdn/shop/files/LOGO_PNG_V01.png',
    coverBanner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    founded: '2015',
    origin: 'Lahore, Pakistan',
    trustScore: '99.5%',
    ordersFulfilled: '19,300',
    dispatchRate: '99.5%',
    disputeRate: '0.03%',
    rating: '4.9',
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault', 'Dubai Logistics Hub'],
    brandCategories: ['All Works', 'Embroidered Velvet', 'Velvet Shawls', 'Chiffon Dupattas']
  },
  'nishat-linen': {
    id: 'nishat-linen',
    name: 'Nishat Linen',
    headline: 'Master Weavers of Pure Fine Textiles, Jacquard & Heritage Prêt',
    officialLogo: 'https://p.kindpng.com/picc/s/770-7705991_download-nishat-has-some-pretty-designs-and-guess.png',
    coverBanner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80',
    founded: '1990',
    origin: 'Lahore, Pakistan',
    trustScore: '99.4%',
    ordersFulfilled: '32,100',
    dispatchRate: '99.6%',
    disputeRate: '0.02%',
    rating: '4.9',
    hubs: ['Lahore Heritage Protocol', 'London Mayfair Vault', 'Dubai Logistics Hub'],
    brandCategories: ['All Works', 'Jacquard Weaves', 'Handcrafted Shawls']
  },
  'gucci-atelier': {
    id: 'gucci-atelier',
    name: 'Gucci',
    headline: 'Florentine Aristocracy, Iconic Heritage Motifs & High Fashion Craft',
    officialLogo: 'https://3nro060yqg.execute-api.eu-west-2.amazonaws.com/default/image-resizer-prod?file=295696e63d33.jpg',
    coverBanner: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80',
    founded: '1921',
    origin: 'Florence, Italy',
    trustScore: '99.9%',
    ordersFulfilled: '45,200',
    dispatchRate: '99.9%',
    disputeRate: '0.00%',
    rating: '5.0',
    hubs: ['London Mayfair Vault', 'Florence Workshop', 'Dubai Logistics Hub'],
    brandCategories: ['All Works', 'Leather Goods', 'Silk Foulards']
  }
};

// =============================================================================
// 3. PRODUCT REPOSITORY (SCRAPED & AUTHENTICATED ATELIER PIECES)
// =============================================================================
const PRODUCTS = [
  {
    "id": "nl-jacquard-01",
    "atelierId": "nishat-linen",
    "category": "clothing",
    "subCategory": "Jacquard Weaves",
    "brand": "Nishat Linen",
    "title": "Embroidered Jacquard Formal Kurti",
    "basePrice": 165,
    "wasPrice": 220,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore Textile Guild & London Hub",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.4%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-25%)",
    "colorName": "Emerald Green",
    "colorHex": "#064e3b",
    "description": "Exquisite fine jacquard weave embedded with delicate zari embroidery along the neckline and cuffs. Tailored for elevated formal elegance.",
    "details": {
      "composition": "Pure Silk Blend Jacquard with metallic threads.",
      "craftsmanship": "Loomed and hand-finished at Nishat Mills.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": { "UK": ["UK 8", "UK 10", "UK 12"], "EU": ["EU 36", "EU 38", "EU 40"], "US": ["US 4", "US 6", "US 8"] },
    "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    "imageHover": "https://images.unsplash.com/photo-1583391733975-0453303697e8?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583391733975-0453303697e8?auto=format&fit=crop&w=1000&q=80"
    ],
    "groupId": "nl-formal-jacquard"
  },
  {
    "id": "nl-shawl-02",
    "atelierId": "nishat-linen",
    "category": "clothing",
    "subCategory": "Handcrafted Shawls",
    "brand": "Nishat Linen",
    "title": "Heritage Woolen Embroidered Shawl",
    "basePrice": 140,
    "wasPrice": 185,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore Textile Guild & London Hub",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.4%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "New Arrival",
    "colorName": "Oatmeal Cream",
    "colorHex": "#f7f5ee",
    "description": "Artisanal woven woolen wrap with border embroidery inspired by historic Mughal paisleys. Featherlight warmth and unmatched handfeel.",
    "details": {
      "composition": "100% Fine Merino Wool / Pashmina Weft.",
      "craftsmanship": "Hand-loomed in Punjab; hand-embroidered borders.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": { "UK": ["One Size"], "EU": ["One Size"], "US": ["One Size"] },
    "image": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80",
    "imageHover": "https://images.unsplash.com/photo-1601924994938-16e79b884c68?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80"
    ],
    "groupId": "nl-heritage-shawls"
  },
  {
    "id": "gc-bag-1955",
    "atelierId": "gucci-atelier",
    "category": "bags",
    "subCategory": "Leather Goods",
    "brand": "Gucci",
    "title": "Horsebit 1955 Fine Grain Leather Flap Bag",
    "basePrice": 1980,
    "wasPrice": 2250,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Florence Atelier & Bond Street Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.9%",
    "inspectedAt": "Florence Workshop & London Bond Street",
    "dispatchTime": "1-3 business days via Ferrari Express Escrow",
    "tag": "Iconic Curated Piece",
    "colorName": "Black Calfskin",
    "colorHex": "#0b0c10",
    "description": "Crafted in Florence with textured grained calfskin leather, centered with the equestrian horsebit hardware in antiqued gold-toned finish.",
    "details": {
      "composition": "100% Fine Grain Calfskin, Microfiber lining with a suede-like finish.",
      "craftsmanship": "Hand-stitched in Florence; forensic authentication tag embedded.",
      "escrowGuarantee": "Guaranteed under Ayiin Sovereign Escrow. Bonded until client verification."
    },
    "sizes": { "UK": ["One Size"], "EU": ["One Size"], "US": ["One Size"] },
    "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    "imageHover": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    "groupId": "gc-horsebit-leather"
  },
  {
    "id": "gc-foulard-flora",
    "atelierId": "gucci-atelier",
    "category": "clothing",
    "subCategory": "Silk Foulards",
    "brand": "Gucci",
    "title": "Flora Print Mulberry Silk Twill Square Scarf",
    "basePrice": 420,
    "wasPrice": 490,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Florence Atelier & Bond Street Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.9%",
    "inspectedAt": "Florence Workshop & London Bond Street",
    "dispatchTime": "1-3 business days via DHL Express",
    "tag": "New Arrival",
    "colorName": "Ivory Multicolore",
    "colorHex": "#fcfbfa",
    "description": "Historic archival Flora watercolor print printed on rich heavyweight mulberry silk twill with hand-rolled borders.",
    "details": {
      "composition": "100% Organic Mulberry Silk Twill (18 momme).",
      "craftsmanship": "Screen-printed in Como, Italy; hand-rolled edges.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": { "UK": ["90x90 cm"], "EU": ["90x90 cm"], "US": ["35x35 in"] },
    "image": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80",
    "imageHover": "https://images.unsplash.com/photo-1601924994938-16e79b884c68?auto=format&fit=crop&w=1000&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80"
    ],
    "groupId": "gc-silk-scarves"
  },

  {
    "id": "ss-9635186245864",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Architectural Silks",
    "brand": "Sana Safinaz",
    "title": "Stitched Printed Wesst Satin Shirt",
    "basePrice": 324,
    "wasPrice": 648,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Beige",
    "colorHex": "#D4C4B5",
    "description": "Description: Coordinated ease, refined into a seasonal essential Color: Beige Fabric: Satin Cut: Basic Slip: Not Included Dupatta: Not Included Trouser: Not Included",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK S",
        "UK M"
      ],
      "EU": [
        "EU S",
        "EU M"
      ],
      "US": [
        "US S",
        "US M"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25WSU184P2T_1_1.jpg?v=1764570934",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25WSU184P2T_3_1.jpg?v=1764570934",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25WSU184P2T_1_1.jpg?v=1764570934",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25WSU184P2T_3_1.jpg?v=1764570934",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25WSU184P2T_2_1.jpg?v=1764570934"
    ],
    "groupId": "ss-stitched-shirts"
  },
  {
    "id": "ss-9635181363432",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Brochia Shalwar",
    "basePrice": 248,
    "wasPrice": 496,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Ivory Silk",
    "colorHex": "#F8F6F0",
    "description": "Description: Crafted with intention, finished with finesse - this is where technique becomes art. Fabric: Brochia Cut: Skinny Shalwar",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK M",
        "UK L",
        "UK XL"
      ],
      "EU": [
        "EU M",
        "EU L",
        "EU XL"
      ],
      "US": [
        "US M",
        "US L",
        "US XL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25sge353p3_1_1.jpg?v=1756730679",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25sge353p3_1.jpg?v=1756730679",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25sge353p3_1_1.jpg?v=1756730679",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25sge353p3_1.jpg?v=1756730679",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25sge353p3_3.jpg?v=1756730680"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635180118248",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Embroidered Raw Silk Zuri Shalwar",
    "basePrice": 248,
    "wasPrice": 496,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Beige",
    "colorHex": "#D4C4B5",
    "description": "Color: Beige Fabric: Raw Silk Cut: Zuri Shalwar",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK XS",
        "UK S",
        "UK M",
        "UK L"
      ],
      "EU": [
        "EU XS",
        "EU S",
        "EU M",
        "EU L"
      ],
      "US": [
        "US XS",
        "US S",
        "US M",
        "US L"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE454P3_1.jpg?v=1758526415",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE454P3_2.jpg?v=1758526415",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE454P3_1.jpg?v=1758526415",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE454P3_2.jpg?v=1758526415"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635175104744",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Bended Lawn Embroidered Culotte",
    "basePrice": 248,
    "wasPrice": 496,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Sky Blue",
    "colorHex": "#87CEEB",
    "description": "Color: Sky Blue Fabric: Blended Lawn Cut: Culotte",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK XS",
        "UK S",
        "UK M",
        "UK L"
      ],
      "EU": [
        "EU XS",
        "EU S",
        "EU M",
        "EU L"
      ],
      "US": [
        "US XS",
        "US S",
        "US M",
        "US L"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE439P2T_1.jpg?v=1759750652",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE439P2T_4.jpg?v=1759750277",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE439P2T_1.jpg?v=1759750652",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE439P2T_4.jpg?v=1759750277"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635166650600",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Cotton Embroidered Raw Silk Culotte",
    "basePrice": 248,
    "wasPrice": 496,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Emerald",
    "colorHex": "#2E6F40",
    "description": "Color: Green Fabric: Raw Silk Cut: Culotte",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK XS",
        "UK S",
        "UK M",
        "UK L",
        "UK XL"
      ],
      "EU": [
        "EU XS",
        "EU S",
        "EU M",
        "EU L",
        "EU XL"
      ],
      "US": [
        "US XS",
        "US S",
        "US M",
        "US L",
        "US XL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE462_1.jpg?v=1759317902",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE462_2.jpg?v=1759317902",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE462_1.jpg?v=1759317902",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE462_2.jpg?v=1759317902"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635166290152",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Embroidered Jacquard Skinny Shalwar",
    "basePrice": 248,
    "wasPrice": 496,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Cream",
    "colorHex": "#FFFDD0",
    "description": "Color: Cream Fabric: Jacquard Cut: Skinny Shalwar",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK XS",
        "UK M",
        "UK L",
        "UK XL"
      ],
      "EU": [
        "EU XS",
        "EU M",
        "EU L",
        "EU XL"
      ],
      "US": [
        "US XS",
        "US M",
        "US L",
        "US XL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE481_1.jpg?v=1764139510",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE481_2.jpg?v=1764139509",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE481_1.jpg?v=1764139510",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25SGE481_2.jpg?v=1764139509"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635155575016",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Lawn Shalwar",
    "basePrice": 200,
    "wasPrice": 400,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Description: A symphony of detail, composed on a dark canvas Color: Black Fabric: Lawn Cut: Zuri Shalwar",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK XS",
        "UK S",
        "UK M",
        "UK L"
      ],
      "EU": [
        "EU XS",
        "EU S",
        "EU M",
        "EU L"
      ],
      "US": [
        "US XS",
        "US S",
        "US M",
        "US L"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25ESE710P2T_1.jpg?v=1763552520",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25ESE710_1_1.jpg?v=1763552520",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25ESE710P2T_1.jpg?v=1763552520",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25ESE710_1_1.jpg?v=1763552520"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635060187368",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Lawn Skinny Shalwar",
    "basePrice": 147,
    "wasPrice": 368,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-60%)",
    "colorName": "Mustard Gold",
    "colorHex": "#D4AF37",
    "description": "Color: Mustard Fabric: Lawn Cut: Skinny Shalwar",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK S",
        "UK M",
        "UK L"
      ],
      "EU": [
        "EU S",
        "EU M",
        "EU L"
      ],
      "US": [
        "US S",
        "US M",
        "US L"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25muz039_1.jpg?v=1756730774",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25muz039_3.jpg?v=1756730774",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25muz039_1.jpg?v=1756730774",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25muz039_3.jpg?v=1756730774"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635054420200",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Printed Viscose Shalwar",
    "basePrice": 196,
    "wasPrice": 392,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Ivory Silk",
    "colorHex": "#F8F6F0",
    "description": "Description: Make a statement with this bold printed article where style meets individuality Color: Multi Fabric: Viscose Cut: Skinny Shalwar",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK XS",
        "UK S"
      ],
      "EU": [
        "EU XS",
        "EU S"
      ],
      "US": [
        "US XS",
        "US S"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25bsp154p2t_1_d9057295-f327-4415-82fa-e765b4be39ad.jpg?v=1756731157",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25bsp154p2t_3_bf55666c-4125-4643-9e36-ce8a846833e4.jpg?v=1756731157",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25bsp154p2t_1_d9057295-f327-4415-82fa-e765b4be39ad.jpg?v=1756731157",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25bsp154p2t_3_bf55666c-4125-4643-9e36-ce8a846833e4.jpg?v=1756731157"
    ],
    "groupId": "ss-bottoms-couture"
  },
  {
    "id": "ss-9635054387432",
    "atelierId": "sana-safinaz",
    "category": "clothing",
    "subCategory": "Haute Prêt",
    "brand": "Sana Safinaz",
    "title": "Stitched Lawn Shirt",
    "basePrice": 292,
    "wasPrice": 584,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Mayfair Vault, London & Lahore",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.8%",
    "inspectedAt": "Lahore Master Atelier & London Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-50%)",
    "colorName": "Rust Terracotta",
    "colorHex": "#C85A17",
    "description": "Color: Orange Fabric: Lawn Cut: Basic Slip: Not Included Dupatta: Not Included Trouser: Not Included",
    "details": {
      "composition": "Pure Silk / Cambric Brochia luxury weave.",
      "craftsmanship": "Master-tailored in Lahore atelier; forensic stitch vetting verified.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Funds bonded until client verification."
    },
    "sizes": {
      "UK": [
        "UK S",
        "UK M"
      ],
      "EU": [
        "EU S",
        "EU M"
      ],
      "US": [
        "US S",
        "US M"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25muz104bp3_1.jpg?v=1789023547",
    "imageHover": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25MUZ104BP3_3.jpg?v=1789023681",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/ss25muz104bp3_1.jpg?v=1789023547",
      "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25MUZ104BP3_3.jpg?v=1789023681"
    ],
    "groupId": "ss-stitched-shirts"
  },
  {
    "id": "bq-7519080022083",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Embroidered Velvet Sf-4317",
    "basePrice": 1498,
    "wasPrice": 1872,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Winter Archive (-20%)",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Introducing the EMBROIDERED VELVET SF-4317, a stunning three-piece ensemble that celebrates intricate craftsmanship. This luxurious collection features a richly embroidered velvet front paired with delicate organza borders, complemented by a flowing dyed silk component. The back showcases elegant embroidered organza detailing with a coordinating neckline patch. Embellished velvet sleeves with ornate borders and digital printed accents add contemporary flair, while the coordinating digital printed silk dupatta features layered embroidered organza and silk borders for a refined finish. Complete the look with the embroidered silk trouser and matching border. Perfect for those who appreciate timeless elegance with meticulous attention to detail.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/83_08f4af1c-5dfb-467b-9dde-8518ec89aad6.jpg?v=1762429478",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/81_1d92c881-934f-44a1-b80d-54d5d68017a1.jpg?v=1762429478",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/83_08f4af1c-5dfb-467b-9dde-8518ec89aad6.jpg?v=1762429478",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/81_1d92c881-934f-44a1-b80d-54d5d68017a1.jpg?v=1762429478",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/82_0a2b5303-8e42-493b-9b93-d520ec363523.jpg?v=1762429478",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/79_c0bcbcfe-efa3-4e36-acdd-70ff234934f4.jpg?v=1762592130"
    ],
    "groupId": "bq-velvet-formal"
  },
  {
    "id": "bq-7495295336515",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Embroidered Velvet Uf-4317",
    "basePrice": 898,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Hand-Embroidered Velvet",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Introducing the EMBROIDERED VELVET UF-4317, a stunning three-piece ensemble that celebrates intricate craftsmanship. This luxurious collection features a richly embroidered velvet front paired with delicate organza borders, complemented by a flowing dyed silk component. The back showcases elegant embroidered organza detailing with a coordinating neckline patch. Embellished velvet sleeves with ornate borders and digital printed accents add contemporary flair, while the coordinating digital printed silk dupatta features layered embroidered organza and silk borders for a refined finish. Complete the look with the embroidered silk trouser and matching border. Perfect for those who appreciate timeless elegance with meticulous attention to detail.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/83_7aa8306a-b5d4-4c08-a67a-4e4b7d1b6bbb.jpg?v=1759237320",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/81_20dea358-a178-48e0-8a36-f8a85d6223fa.jpg?v=1759237320",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/83_7aa8306a-b5d4-4c08-a67a-4e4b7d1b6bbb.jpg?v=1759237320",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/81_20dea358-a178-48e0-8a36-f8a85d6223fa.jpg?v=1759237320",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/82_b7091e97-831c-49d5-98bd-b46d360626be.jpg?v=1759237320",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/79_0f530ed3-c99b-4cef-9d36-4fbea5a75868.jpg?v=1762591979"
    ],
    "groupId": "bq-velvet-formal"
  },
  {
    "id": "bq-7474595496003",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Digital Printed Viscose Uf-4297",
    "basePrice": 348,
    "wasPrice": 434,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Winter Archive (-20%)",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "This DIGITAL PRINTED VISCOSE UF-4297 set features a beautifully crafted viscose silk shirt and trouser with vibrant digital prints, complemented by a digitally printed viscose shawl. The soft, breathable fabric ensures lasting comfort, while the striking designs add elegance to your wardrobe, making it perfect for both casual outings and special occasions.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/169_3dd8b1e1-e19e-48df-ba65-99d2ae6d93e2.jpg?v=1756985794",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/170_caa3670d-4833-467c-9211-64052bb70d65.jpg?v=1756985794",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/169_3dd8b1e1-e19e-48df-ba65-99d2ae6d93e2.jpg?v=1756985794",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/170_caa3670d-4833-467c-9211-64052bb70d65.jpg?v=1756985794",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/171_ce36a2a5-0eb1-4fec-b61f-fb9d2ed5ded1.jpg?v=1756985794",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/172_c4be4682-77d3-44f1-80ae-34383a878626.jpg?v=1756985794"
    ],
    "groupId": "bq-velvet-formal"
  },
  {
    "id": "bq-7780962566211",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Plain Chiffon Dupatta-129",
    "basePrice": 298,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Hand-Embroidered Velvet",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Elevate your wardrobe with this exquisite plain chiffon dupatta, crafted from premium lightweight chiffon fabric. The piece features an intricately embroidered border that adds a touch of sophistication and elegance to any ensemble. Perfect for layering over traditional or contemporary outfits, this versatile dupatta combines comfort with timeless style. The delicate chiffon drapes beautifully while the detailed embroidered detailing makes it an ideal choice for both everyday wear and special occasions.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/60_5ee18ac5-dfc2-4816-8707-25c90b188e26.jpg?v=1788950818",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/61_6047a400-3e6b-4610-8acf-42a9de8d3892.jpg?v=1788950818",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/60_5ee18ac5-dfc2-4816-8707-25c90b188e26.jpg?v=1788950818",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/61_6047a400-3e6b-4610-8acf-42a9de8d3892.jpg?v=1788950818"
    ],
    "groupId": "bq-chiffon-dupatta"
  },
  {
    "id": "bq-7780961714243",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Plain Chiffon Dupatta-128",
    "basePrice": 298,
    "wasPrice": 372,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Winter Archive (-20%)",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Elevate your wardrobe with this exquisite plain chiffon dupatta, crafted from premium lightweight chiffon fabric. The piece features an intricately embroidered border that adds a touch of sophistication and elegance to any ensemble. Perfect for layering over traditional or contemporary outfits, this versatile dupatta combines comfort with timeless style. The delicate chiffon drapes beautifully while the detailed embroidered detailing makes it an ideal choice for both everyday wear and special occasions.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/74_6adda58a-340b-4ba4-9bd9-9782ed5284b8.jpg?v=1788950352",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/75_5dfdb4f0-d677-4aa5-b160-0650ec9776e5.jpg?v=1788950352",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/74_6adda58a-340b-4ba4-9bd9-9782ed5284b8.jpg?v=1788950352",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/75_5dfdb4f0-d677-4aa5-b160-0650ec9776e5.jpg?v=1788950352"
    ],
    "groupId": "bq-chiffon-dupatta"
  },
  {
    "id": "bq-7830974332995",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Plan Velvet Frock En-1389",
    "basePrice": 998,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Hand-Embroidered Velvet",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Elegant velvet frock with matching velvet trouser in a sophisticated plan design. This coordinated ensemble features luxurious velvet fabric throughout, offering a refined and graceful look. Complete set includes the frock, trouser, and accessories to create a polished, cohesive outfit perfect for special occasions and celebrations.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/60_5ee18ac5-dfc2-4816-8707-25c90b188e26.jpg?v=1788950818",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/61_6047a400-3e6b-4610-8acf-42a9de8d3892.jpg?v=1788950818",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/60_5ee18ac5-dfc2-4816-8707-25c90b188e26.jpg?v=1788950818",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/61_6047a400-3e6b-4610-8acf-42a9de8d3892.jpg?v=1788950818",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/62_af649d0d-5dd0-451f-8e39-fda76af0d799.jpg?v=1788950818"
    ],
    "groupId": "bq-velvet-frock"
  },
  {
    "id": "bq-7830959521859",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Plan Velvet Frock En-1388",
    "basePrice": 998,
    "wasPrice": 1247,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Winter Archive (-20%)",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Elegant velvet frock with matching velvet trouser in a sophisticated plan design. This coordinated ensemble features luxurious velvet fabric throughout, offering a refined and graceful look. Complete set includes the frock, trouser, and accessories to create a polished, cohesive outfit perfect for special occasions and celebrations.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/71_ddaab394-7d95-43af-91b3-ff5e56b8d2c0.jpg?v=1788950352",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/75_5dfdb4f0-d677-4aa5-b160-0650ec9776e5.jpg?v=1788950352",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/71_ddaab394-7d95-43af-91b3-ff5e56b8d2c0.jpg?v=1788950352",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/75_5dfdb4f0-d677-4aa5-b160-0650ec9776e5.jpg?v=1788950352",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/73_717a2b91-0ae4-4f71-8689-16a7603fbba3.jpg?v=1788950353",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/74_6adda58a-340b-4ba4-9bd9-9782ed5284b8.jpg?v=1788950352"
    ],
    "groupId": "bq-velvet-frock"
  },
  {
    "id": "bq-7780968497219",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Embroidered Velvet Shawl Vs-74",
    "basePrice": 998,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Hand-Embroidered Velvet",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Exquisite embroidered velvet shawl crafted with intricate beadwork details. This luxurious 2.75-yard piece features elegant embroidery throughout, perfect for adding sophistication to any ensemble. The shawl comes with complementary bead accessories to enhance your styling options. Ideal for special occasions, formal events, or everyday elegance.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/157_09954f70-e8c6-4139-8fc3-bf38fcabb7aa.jpg?v=1788850805",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/161_7c5c1887-709d-460e-99df-350bcd2b5655.jpg?v=1788850805",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/157_09954f70-e8c6-4139-8fc3-bf38fcabb7aa.jpg?v=1788850805",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/161_7c5c1887-709d-460e-99df-350bcd2b5655.jpg?v=1788850805",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/159_8ecb9d6d-0e7e-458e-9de7-15cc7efbab3a.jpg?v=1788850805",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/158_2c03c479-8330-4b85-8e27-56d551746ab0.jpg?v=1788850805"
    ],
    "groupId": "bq-velvet-shawl"
  },
  {
    "id": "bq-7780967579715",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Embroidered Velvet Shawl Vs-73",
    "basePrice": 998,
    "wasPrice": 1247,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Winter Archive (-20%)",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Exquisite embroidered velvet shawl crafted with intricate beadwork details. This luxurious 2.75-yard piece features elegant embroidery throughout, perfect for adding sophistication to any ensemble. The shawl comes with complementary bead accessories to enhance your styling options. Ideal for special occasions, formal events, or everyday elegance.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/151_20114bae-54b7-4d19-9cf6-e3ce08b5fd3c.jpg?v=1788850908",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/152_74d5ffc6-6a07-4cc5-975d-9834d9014330.jpg?v=1788850908",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/151_20114bae-54b7-4d19-9cf6-e3ce08b5fd3c.jpg?v=1788850908",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/152_74d5ffc6-6a07-4cc5-975d-9834d9014330.jpg?v=1788850908",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/154_73c9c330-cbae-4cbd-9dd6-92f361f9d075.jpg?v=1788850908",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/155_b6c695dd-6075-4b0a-991f-6a6b0d583ad6.jpg?v=1788850908"
    ],
    "groupId": "bq-velvet-shawl"
  },
  {
    "id": "bq-7780963385411",
    "atelierId": "baroque-couture",
    "category": "clothing",
    "subCategory": "Embroidered Velvet",
    "brand": "Baroque",
    "title": "Embroidered Velvet Shawl Vs-66",
    "basePrice": 998,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Mayfair Vault",
    "dispatchHub": "Lahore Heritage Protocol",
    "trustScore": "99.9%",
    "inspectedAt": "Ayiin Forensic Authentication Vault",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Hand-Embroidered Velvet",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Exquisite embroidered velvet shawl crafted with intricate beadwork details. This luxurious 2.75-yard piece features elegant embroidery throughout, perfect for adding sophistication to any ensemble. The shawl comes with complementary bead accessories to enhance your styling options. Ideal for special occasions, formal events, or everyday elegance.",
    "details": {
      "composition": "100% Pure Micro-Velvet with Bullion Embroidery.",
      "craftsmanship": "Hand-beaded and finished under dual atelier inspection.",
      "escrowGuarantee": "Bonded in sovereign escrow until 72 hours post-delivery verification."
    },
    "sizes": {
      "UK": [
        "One Size (2.75m Shawl)"
      ],
      "EU": [
        "One Size (2.75m Shawl)"
      ],
      "US": [
        "One Size (2.75m Shawl)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/2277/5269/files/23_46040d0a-98b5-44fe-bf6a-94fa9c70912a.jpg?v=1788852362",
    "imageHover": "https://cdn.shopify.com/s/files/1/2277/5269/files/22_58f8646a-da24-49b8-9b76-84176b701664.jpg?v=1788852362",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/2277/5269/files/23_46040d0a-98b5-44fe-bf6a-94fa9c70912a.jpg?v=1788852362",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/22_58f8646a-da24-49b8-9b76-84176b701664.jpg?v=1788852362",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/24_436d0ea4-d3fd-447a-b2cb-f5d6b78941d2.jpg?v=1788852362",
      "https://cdn.shopify.com/s/files/1/2277/5269/files/26_fda49f8c-96f3-412c-9448-6dcd6c797589.jpg?v=1788852361"
    ],
    "groupId": "bq-velvet-shawl"
  },
  {
    "id": "bo-9249272496182",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Pleated Bag With Flap Detail",
    "basePrice": 425,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Official Drop",
    "colorName": "Burgundy",
    "colorHex": "#5E0B1B",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BRG_1.jpg?v=1787985546",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BRG_2.jpg?v=1787985545",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BRG_1.jpg?v=1787985546",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BRG_2.jpg?v=1787985545",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BRG_3.jpg?v=1787985546",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BRG_4.jpg?v=1787985545"
    ],
    "groupId": "bo-pleated-bag"
  },
  {
    "id": "bo-9249272463414",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Pleated Bag With Flap Detail",
    "basePrice": 425,
    "wasPrice": 531,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Beige",
    "colorHex": "#D4C4B5",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BGE_1.jpg?v=1787985561",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BGE_2.jpg?v=1787985561",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BGE_1.jpg?v=1787985561",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BGE_2.jpg?v=1787985561",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BGE_3.jpg?v=1787985562",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG035-BGE_4.jpg?v=1787985562"
    ],
    "groupId": "bo-pleated-bag"
  },
  {
    "id": "bo-9249272430646",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Buckle Detail Hand Bag",
    "basePrice": 400,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Official Drop",
    "colorName": "Chestnut",
    "colorHex": "#6B4423",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BRO_1.jpg?v=1787985573",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BRO_2.jpg?v=1787985573",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BRO_1.jpg?v=1787985573",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BRO_2.jpg?v=1787985573",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BRO_5.jpg?v=1787985574",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BRO_3.jpg?v=1787985573"
    ],
    "groupId": "bo-buckle-bag"
  },
  {
    "id": "bo-9249272397878",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Buckle Detail Hand Bag",
    "basePrice": 400,
    "wasPrice": 500,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Beige",
    "colorHex": "#D4C4B5",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BGE_1.jpg?v=1787985584",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BGE_2.jpg?v=1787985583",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BGE_1.jpg?v=1787985584",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BGE_2.jpg?v=1787985583",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BGE_5.jpg?v=1787985584",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG032-BGE_3.jpg?v=1787985583"
    ],
    "groupId": "bo-buckle-bag"
  },
  {
    "id": "bo-9249272627254",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Convertible Backpack",
    "basePrice": 425,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Official Drop",
    "colorName": "Chestnut",
    "colorHex": "#6B4423",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BRO_1.jpg?v=1787985493",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BRO_2.jpg?v=1787985493",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BRO_1.jpg?v=1787985493",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BRO_2.jpg?v=1787985493",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BRO_3.jpg?v=1787985493",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BRO_4.jpg?v=1787985493"
    ],
    "groupId": "bo-backpack"
  },
  {
    "id": "bo-9249272594486",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Convertible Backpack",
    "basePrice": 425,
    "wasPrice": 531,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BLK_1.jpg?v=1787985502",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BLK_2.jpg?v=1787985503",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BLK_1.jpg?v=1787985502",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BLK_2.jpg?v=1787985503",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BLK_3.jpg?v=1787985503",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG039-BLK_4.jpg?v=1787985503"
    ],
    "groupId": "bo-backpack"
  },
  {
    "id": "bo-9249272561718",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Hobo Shoulder Bag",
    "basePrice": 425,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Official Drop",
    "colorName": "Crimson",
    "colorHex": "#8B1E1E",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-RED_4.jpg?v=1787985514",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-RED_2.jpg?v=1787985514",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-RED_4.jpg?v=1787985514",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-RED_2.jpg?v=1787985514",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-RED_5.jpg?v=1787985514",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-RED_9.jpg?v=1787985514"
    ],
    "groupId": "bo-hobo-bag"
  },
  {
    "id": "bo-9249272528950",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Hobo Shoulder Bag",
    "basePrice": 425,
    "wasPrice": 531,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Structured modern silhouette featuring precision stitching, reinforced hardware, and functional compartments.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-BLK_1.jpg?v=1787985531",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-BLK_2.jpg?v=1787985531",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-BLK_1.jpg?v=1787985531",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-BLK_2.jpg?v=1787985531",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-BLK_3.jpg?v=1787985531",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/26FBG037-BLK_4.jpg?v=1787985531"
    ],
    "groupId": "bo-hobo-bag"
  },
  {
    "id": "bo-7950950137910",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Shoulder Bag",
    "basePrice": 162,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Official Drop",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "A large shoulder bag featuring a contrasting white striped design. 100% Polyester",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/25FBG040-BLK_4.jpg?v=1759236448",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/25FBG040-BLK_2.jpg?v=1759236448",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/25FBG040-BLK_4.jpg?v=1759236448",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/25FBG040-BLK_2.jpg?v=1759236448",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/25FBG040-BLK_1.jpg?v=1759236448",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/25FBG040-BLK_3.jpg?v=1759236448"
    ],
    "groupId": "bo-shoulder-bag"
  },
  {
    "id": "bo-7933470441526",
    "atelierId": "breakout-atelier",
    "category": "bags",
    "subCategory": "Structured Bags",
    "brand": "Breakout",
    "title": "Flap Shoulder Bag",
    "basePrice": 212,
    "wasPrice": 265,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & Dubai DIFC Hub",
    "dispatchHub": "Dubai DIFC Hub",
    "trustScore": "99.3%",
    "inspectedAt": "Ayiin Regional Authenticity Vault, Dubai",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Blush Rose",
    "colorHex": "#DDA7A5",
    "description": "Pastel pink shoulder bag with a flap closure and silver accents, complete with two detachable straps for styling options.",
    "details": {
      "composition": "Structured Box Calfskin / Textured Nappa with high-tensile brass hardware.",
      "craftsmanship": "Hand-inspected for edge sealing and hardware alignment.",
      "escrowGuarantee": "Direct brand consignment with Ayiin Escrow buyer guarantee."
    },
    "sizes": {
      "UK": [
        "One Size (28cm)"
      ],
      "EU": [
        "One Size (28cm)"
      ],
      "US": [
        "One Size (28cm)"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/DSC_1212.jpg?v=1757937327",
    "imageHover": "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/DSC_1213.jpg?v=1757937327",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/DSC_1212.jpg?v=1757937327",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/DSC_1213.jpg?v=1757937327",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/DSC_1214.jpg?v=1757937327",
      "https://cdn.shopify.com/s/files/1/0202/5884/8822/files/DSC_1215.jpg?v=1757937327"
    ],
    "groupId": "bo-shoulder-bag"
  },
  {
    "id": "lama-7545176817706",
    "atelierId": "lama-retail",
    "category": "footwear",
    "subCategory": "Artisanal Footwear",
    "brand": "LAMA",
    "title": "Chunky Leather Sandals",
    "basePrice": 252,
    "wasPrice": 425,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Chunky sandals that come super comfy with thick top band. - Material real leather - Ankle grip - Gritted outsole in rubber Our chunky sandals run a size big so please purchase one size down Note: The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.",
      "craftsmanship": "Hand-lasted with reinforced welt and edge-finished accents.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Inspect in person before funds release."
    },
    "sizes": {
      "UK": [
        "UK 35",
        "UK 36",
        "UK 37",
        "UK 38",
        "UK 39",
        "UK 40",
        "UK 41"
      ],
      "EU": [
        "EU 35",
        "EU 36",
        "EU 37",
        "EU 38",
        "EU 39",
        "EU 40",
        "EU 41"
      ],
      "US": [
        "US 35",
        "US 36",
        "US 37",
        "US 38",
        "US 39",
        "US 40",
        "US 41"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-BLACK-CHUNKY-LEATHER-SANDALS_2.webp?v=1739413669",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-BLK_2.jpg?v=1739413669",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-BLACK-CHUNKY-LEATHER-SANDALS_2.webp?v=1739413669",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-BLK_2.jpg?v=1739413669",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-BLK_4.jpg?v=1739413669",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-BLK_1.jpg?v=1739413669"
    ],
    "groupId": "lama-chunky-sandals"
  },
  {
    "id": "lama-7545171279914",
    "atelierId": "lama-retail",
    "category": "footwear",
    "subCategory": "Artisanal Footwear",
    "brand": "LAMA",
    "title": "Leather Boat Shoes",
    "basePrice": 563,
    "wasPrice": 664,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Midnight Navy",
    "colorHex": "#1C2541",
    "description": "Final Sale. No Returns. Made in real leather, boat shoes with contrasting stitched panel and a white outsole. Note: The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.",
      "craftsmanship": "Hand-lasted with reinforced welt and edge-finished accents.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Inspect in person before funds release."
    },
    "sizes": {
      "UK": [
        "UK 40",
        "UK 41",
        "UK 42",
        "UK 43",
        "UK 44",
        "UK 45"
      ],
      "EU": [
        "EU 40",
        "EU 41",
        "EU 42",
        "EU 43",
        "EU 44",
        "EU 45"
      ],
      "US": [
        "US 40",
        "US 41",
        "US 42",
        "US 43",
        "US 44",
        "US 45"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/STRMBL0001-NAVY-MAN-BOAT-SHOES_1_958adf56-b71f-4122-8581-dfb48b232a0e.webp?v=1739412987",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/STRMBL0001-NAVY-MAN-BOAT-SHOES_2_d5587c38-0156-4adc-9fcd-7e7869d63cc7.webp?v=1739412987",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/STRMBL0001-NAVY-MAN-BOAT-SHOES_1_958adf56-b71f-4122-8581-dfb48b232a0e.webp?v=1739412987",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/STRMBL0001-NAVY-MAN-BOAT-SHOES_2_d5587c38-0156-4adc-9fcd-7e7869d63cc7.webp?v=1739412987",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/leather-boat-shoes-lama-retail-1_ecc1c171-381b-4fac-b043-e83128237054.jpg?v=1739412987",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/leather-boat-shoes-lama-retail-2_e44f691f-6ee1-4562-a75d-e3a35281c627.jpg?v=1739412987"
    ],
    "groupId": "lama-boat-shoes"
  },
  {
    "id": "lama-7545166725162",
    "atelierId": "lama-retail",
    "category": "footwear",
    "subCategory": "Artisanal Footwear",
    "brand": "LAMA",
    "title": "Chunky Leather Sandals",
    "basePrice": 360,
    "wasPrice": 425,
    "isOnSale": true,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Saddle Tan",
    "colorHex": "#C49A6C",
    "description": "Real leather, chunky sandals that come super comfy with thick top band, ankle grip and gritted outsole in rubber. Note : Our chunky sandals run a size big so please purchase one size down",
    "details": {
      "composition": "Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.",
      "craftsmanship": "Hand-lasted with reinforced welt and edge-finished accents.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Inspect in person before funds release."
    },
    "sizes": {
      "UK": [
        "UK 35",
        "UK 36",
        "UK 37",
        "UK 38",
        "UK 39",
        "UK 40",
        "UK 41"
      ],
      "EU": [
        "EU 35",
        "EU 36",
        "EU 37",
        "EU 38",
        "EU 39",
        "EU 40",
        "EU 41"
      ],
      "US": [
        "US 35",
        "US 36",
        "US 37",
        "US 38",
        "US 39",
        "US 40",
        "US 41"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-TAN-CHUNKY-LEATHER-SANDALS_6_1dc49883-9e13-49d9-a439-54e0a588a7b0.webp?v=1739412465",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-TAN-CHUNKY-LEATHER-SANDALS_5_d22e8d23-b2ac-42aa-a9fd-728777de9bb6.webp?v=1739412465",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-TAN-CHUNKY-LEATHER-SANDALS_6_1dc49883-9e13-49d9-a439-54e0a588a7b0.webp?v=1739412465",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-TAN-CHUNKY-LEATHER-SANDALS_5_d22e8d23-b2ac-42aa-a9fd-728777de9bb6.webp?v=1739412465",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-TAN-CHUNKY-LEATHER-SANDALS_4_6a6cfa98-cfcb-46c8-923e-10e47986215b.webp?v=1739412465",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWSD0001-TAN-CHUNKY-LEATHER-SANDALS_1_9bae2859-627a-4738-a1b8-909a445ade21.webp?v=1739412465"
    ],
    "groupId": "lama-chunky-sandals"
  },
  {
    "id": "lama-7545166659626",
    "atelierId": "lama-retail",
    "category": "footwear",
    "subCategory": "Artisanal Footwear",
    "brand": "LAMA",
    "title": "Jupiter Leather Sandals",
    "basePrice": 252,
    "wasPrice": 425,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Super cool, super comfy leather sandals with a tri-strap in chunky gritted rubber sole and a high quality soft leather upper. Our Jupiter sandals run a size big so please purchase one size down. Note: The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.",
      "craftsmanship": "Hand-lasted with reinforced welt and edge-finished accents.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Inspect in person before funds release."
    },
    "sizes": {
      "UK": [
        "UK 35",
        "UK 36",
        "UK 37",
        "UK 38",
        "UK 39",
        "UK 40",
        "UK 41"
      ],
      "EU": [
        "EU 35",
        "EU 36",
        "EU 37",
        "EU 38",
        "EU 39",
        "EU 40",
        "EU 41"
      ],
      "US": [
        "US 35",
        "US 36",
        "US 37",
        "US 38",
        "US 39",
        "US 40",
        "US 41"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/jupiter-leather-sandals-lama-retail-1.jpg?v=1739412452",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/jupiter-leather-sandals-lama-retail-2_392111b5-7064-4b73-ba76-18d28d7ceec2.jpg?v=1739412452",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/jupiter-leather-sandals-lama-retail-1.jpg?v=1739412452",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/jupiter-leather-sandals-lama-retail-2_392111b5-7064-4b73-ba76-18d28d7ceec2.jpg?v=1739412452",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/jupiter-leather-sandals-lama-retail-3_0b46aeee-c565-49e9-9c1e-f6c9df954715.jpg?v=1739412452",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/jupiter-leather-sandals-lama-retail-4_5c51719c-9cc0-4597-9328-aa846ebaf34b.jpg?v=1739412452"
    ],
    "groupId": "lama-jupiter-sandals"
  },
  {
    "id": "lama-7545052659754",
    "atelierId": "lama-retail",
    "category": "footwear",
    "subCategory": "Artisanal Footwear",
    "brand": "LAMA",
    "title": "Leather Biker Boots",
    "basePrice": 479,
    "wasPrice": 808,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Genuine leather biker style lace-up boots with dull gold eyelets. Toe Type : Round toe Design detail : Leather lace-up boots with comfortable leather insole and anti-slip outsole. Material : 100% ethically sourced genuine leather outsole. Occasion : Everyday casual Note : The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.",
      "craftsmanship": "Hand-lasted with reinforced welt and edge-finished accents.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Inspect in person before funds release."
    },
    "sizes": {
      "UK": [
        "UK 35",
        "UK 36",
        "UK 37",
        "UK 38",
        "UK 39",
        "UK 40",
        "UK 41"
      ],
      "EU": [
        "EU 35",
        "EU 36",
        "EU 37",
        "EU 38",
        "EU 39",
        "EU 40",
        "EU 41"
      ],
      "US": [
        "US 35",
        "US 36",
        "US 37",
        "US 38",
        "US 39",
        "US 40",
        "US 41"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWBT0001-black-joliebikerboots_2_0d3bcb20-c32c-4526-9170-f00696dbab9a.webp?v=1739408611",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWBT0001-black-joliebikerboots_8_8942ef5f-23d8-41eb-8a0a-29478d15e8a1.webp?v=1739408611",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWBT0001-black-joliebikerboots_2_0d3bcb20-c32c-4526-9170-f00696dbab9a.webp?v=1739408611",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWBT0001-black-joliebikerboots_8_8942ef5f-23d8-41eb-8a0a-29478d15e8a1.webp?v=1739408611",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWBT0001-black-joliebikerboots_9_49293c06-900d-4a3f-a588-449870564819.webp?v=1739408611",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFWBT0001-black-joliebikerboots_10_2b3459d2-71c1-49c7-9f29-01960a1fa706.webp?v=1739408611"
    ],
    "groupId": "lama-biker-boots"
  },
  {
    "id": "lama-7545051873322",
    "atelierId": "lama-retail",
    "category": "footwear",
    "subCategory": "Artisanal Footwear",
    "brand": "LAMA",
    "title": "Suede Leather Chelseas",
    "basePrice": 451,
    "wasPrice": 760,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Chestnut",
    "colorHex": "#6B4423",
    "description": "Genuine suede leather ankle high Chelsea boots with wide elastic bands on the sides for ease of wearing. Toe Type : Round toe Design details : Suede leather boots with comfortable leather insole and anti-slip outsole. Material : Ethically sourced 100% genuine leather. Occasion : Daily casual Note : The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Genuine Hand-Burnished Box Leather with no-slip vulcanized rubber sole.",
      "craftsmanship": "Hand-lasted with reinforced welt and edge-finished accents.",
      "escrowGuarantee": "Protected under Ayiin Escrow. Inspect in person before funds release."
    },
    "sizes": {
      "UK": [
        "UK 40",
        "UK 41",
        "UK 42",
        "UK 43",
        "UK 44",
        "UK 45",
        "UK 46"
      ],
      "EU": [
        "EU 40",
        "EU 41",
        "EU 42",
        "EU 43",
        "EU 44",
        "EU 45",
        "EU 46"
      ],
      "US": [
        "US 40",
        "US 41",
        "US 42",
        "US 43",
        "US 44",
        "US 45",
        "US 46"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFMCB0001-BRN-BUDDY-CHELSEA-BOOTS_2.jpg?v=1739408588",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFMCB0001-BROWN-SUEDE-LEATHER-CHELSEAS_1.jpg?v=1739408588",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFMCB0001-BRN-BUDDY-CHELSEA-BOOTS_2.jpg?v=1739408588",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFMCB0001-BROWN-SUEDE-LEATHER-CHELSEAS_1.jpg?v=1739408588",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFMCB0001-BROWN-SUEDE-LEATHER-CHELSEAS_2.jpg?v=1739408588",
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/SHFMCB0001-BROWN-SUEDE-LEATHER-CHELSEAS_3.jpg?v=1739408588"
    ],
    "groupId": "lama-chelseas"
  },
  {
    "id": "lama-belt-7545170919466",
    "atelierId": "lama-retail",
    "category": "belts",
    "subCategory": "Fine Belts",
    "brand": "LAMA",
    "title": "Slim Woven Belt",
    "basePrice": 272,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": true,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Woven & Saddle Leather",
    "colorName": "Noir",
    "colorHex": "#1A1A1A",
    "description": "Slim woven brushed leather finished belt with a matte brass buckle. Note : The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Woven fabric and genuine bridle leather trim with brushed brass hardware.",
      "craftsmanship": "Hand-assembled and tested for tensile buckle endurance.",
      "escrowGuarantee": "Bonded escrow security with instant replacement guarantee."
    },
    "sizes": {
      "UK": [
        "UNIVERSAL"
      ],
      "EU": [
        "UNIVERSAL"
      ],
      "US": [
        "UNIVERSAL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_303baeef-2cfd-47d2-a34f-02e00610b496.jpg?v=1739412921",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_303baeef-2cfd-47d2-a34f-02e00610b496.jpg?v=1739412921",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_303baeef-2cfd-47d2-a34f-02e00610b496.jpg?v=1739412921"
    ],
    "groupId": "lama-woven-belt"
  },
  {
    "id": "lama-belt-7545170886698",
    "atelierId": "lama-retail",
    "category": "belts",
    "subCategory": "Fine Belts",
    "brand": "LAMA",
    "title": "Slim Woven Belt",
    "basePrice": 272,
    "wasPrice": 340,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Espresso",
    "colorHex": "#4B3621",
    "description": "Slim woven brushed leather finished belt with a matte brass buckle. Note : The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Woven fabric and genuine bridle leather trim with brushed brass hardware.",
      "craftsmanship": "Hand-assembled and tested for tensile buckle endurance.",
      "escrowGuarantee": "Bonded escrow security with instant replacement guarantee."
    },
    "sizes": {
      "UK": [
        "UNIVERSAL"
      ],
      "EU": [
        "UNIVERSAL"
      ],
      "US": [
        "UNIVERSAL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_8e54760c-3750-4ede-a882-b1866db9e962.jpg?v=1739412917",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_8e54760c-3750-4ede-a882-b1866db9e962.jpg?v=1739412917",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_8e54760c-3750-4ede-a882-b1866db9e962.jpg?v=1739412917"
    ],
    "groupId": "lama-woven-belt"
  },
  {
    "id": "lama-belt-7545170853930",
    "atelierId": "lama-retail",
    "category": "belts",
    "subCategory": "Fine Belts",
    "brand": "LAMA",
    "title": "Slim Woven Belt",
    "basePrice": 272,
    "wasPrice": null,
    "isOnSale": false,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Woven & Saddle Leather",
    "colorName": "Chestnut",
    "colorHex": "#6B4423",
    "description": "Slim woven brushed leather finished belt with a matte brass buckle. Note : The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Woven fabric and genuine bridle leather trim with brushed brass hardware.",
      "craftsmanship": "Hand-assembled and tested for tensile buckle endurance.",
      "escrowGuarantee": "Bonded escrow security with instant replacement guarantee."
    },
    "sizes": {
      "UK": [
        "UNIVERSAL"
      ],
      "EU": [
        "UNIVERSAL"
      ],
      "US": [
        "UNIVERSAL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_ae2d07ec-729d-470e-b3ef-8cb00a13dc1d.jpg?v=1739412914",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_ae2d07ec-729d-470e-b3ef-8cb00a13dc1d.jpg?v=1739412914",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_ae2d07ec-729d-470e-b3ef-8cb00a13dc1d.jpg?v=1739412914"
    ],
    "groupId": "lama-woven-belt"
  },
  {
    "id": "lama-belt-7545170821162",
    "atelierId": "lama-retail",
    "category": "belts",
    "subCategory": "Fine Belts",
    "brand": "LAMA",
    "title": "Slim Woven Belt",
    "basePrice": 272,
    "wasPrice": 340,
    "isOnSale": true,
    "isNewArrival": false,
    "isBestAtelier": true,
    "origin": "Lahore & London Vault",
    "dispatchHub": "London Mayfair Vault",
    "trustScore": "99.5%",
    "inspectedAt": "Ayiin Quality Vetting Suite",
    "dispatchTime": "2-4 business days via DHL Express",
    "tag": "Sale (-20%)",
    "colorName": "Saddle Tan",
    "colorHex": "#C49A6C",
    "description": "Slim woven brushed leather finished belt with a matte brass buckle. Note : The actual color of the product may vary slightly from the image.",
    "details": {
      "composition": "Woven fabric and genuine bridle leather trim with brushed brass hardware.",
      "craftsmanship": "Hand-assembled and tested for tensile buckle endurance.",
      "escrowGuarantee": "Bonded escrow security with instant replacement guarantee."
    },
    "sizes": {
      "UK": [
        "UNIVERSAL"
      ],
      "EU": [
        "UNIVERSAL"
      ],
      "US": [
        "UNIVERSAL"
      ]
    },
    "image": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_3819da68-4be7-45bb-9111-5570a668cb53.jpg?v=1739412912",
    "imageHover": "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_3819da68-4be7-45bb-9111-5570a668cb53.jpg?v=1739412912",
    "gallery": [
      "https://cdn.shopify.com/s/files/1/0635/0166/4298/files/slim-woven-belt-lama-retail_3819da68-4be7-45bb-9111-5570a668cb53.jpg?v=1739412912"
    ],
    "groupId": "lama-woven-belt"
  }
];

// =============================================================================
// 4. CLIENT-SIDE ROUTER & STATE MACHINE
// =============================================================================
const APP_STATE = {
  activeView: 'homepage',
  activeAtelierId: 'sana-safinaz',
  activeProductId: 'ayiin-01',
  homepageCurationTab: 'new-arrivals', // 'new-arrivals', 'best-ateliers', 'on-sale', 'brands', 'all'
  brandPanelFilters: {
    category: 'All Works',
    maxPrice: 4000,
    color: 'all',
    hub: 'all',
    sort: 'featured'
  },
  plpFilters: {
    category: 'all',
    ateliers: new Set(),
    maxPrice: 4000,
    color: 'all',
    sort: 'featured'
  },
  activePdpSizeUnit: 'UK',
  activePdpSelectedSize: null,
  activePdpMainImageIndex: 0,
  checkoutStep: 1,
  checkoutData: {
    email: '',
    phone: '',
    fullName: '',
    country: 'United Kingdom',
    addressLine1: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'white-glove-air',
    paymentMethod: 'card',
    orderNumber: 'AYIIN-UK-88492'
  }
};

let cart = [
  {
    product: PRODUCTS[0],
    selectedSize: 'UK 10',
    quantity: 1
  },
  {
    product: PRODUCTS[1],
    selectedSize: 'One Size (28cm)',
    quantity: 1
  }
];

let wishlist = new Set(['ayiin-02', 'ayiin-05']);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  handleRouteFromHash();
  window.addEventListener('hashchange', handleRouteFromHash);
  setupGlobalDOM();
  updateCartUI();
  updateWishlistBadges();
});

function handleRouteFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  
  if (!hash || hash === 'home') {
    navigateToView('homepage');
  } else if (hash.startsWith('atelier/')) {
    const atelierId = hash.split('/')[1];
    navigateToView('atelier', { atelierId });
  } else if (hash.startsWith('plp')) {
    const parts = hash.split('/');
    const category = parts[1] || 'all';
    navigateToView('plp', { category });
  } else if (hash.startsWith('pdp/')) {
    const prodId = hash.split('/')[1];
    navigateToView('pdp', { productId: prodId });
  } else if (hash.startsWith('checkout')) {
    navigateToView('checkout');
  } else {
    navigateToView('homepage');
  }
}

function navigateToView(viewName, params = {}) {
  APP_STATE.activeView = viewName;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  let targetHash = '#' + viewName;
  if (viewName === 'atelier' && params.atelierId) targetHash = '#atelier/' + params.atelierId;
  if (viewName === 'pdp' && params.productId) targetHash = '#pdp/' + params.productId;
  if (viewName === 'plp' && params.category) targetHash = '#plp/' + params.category;
  if (window.location.hash !== targetHash) {
    history.pushState(null, null, targetHash);
  }

  document.querySelectorAll('.app-view-container').forEach(el => el.classList.add('hidden'));

  if (viewName === 'homepage') {
    const el = document.getElementById('view-homepage');
    if (el) el.classList.remove('hidden');
    renderPartnerLogosShowcase();
    renderPrivateDropsCarousel();
    renderFeaturedAtelierMatrix(APP_STATE.featuredAtelierTab || 'all');
    initDropsCountdownTimer();
  } else if (viewName === 'atelier') {
    const atelierId = params.atelierId || APP_STATE.activeAtelierId;
    APP_STATE.activeAtelierId = atelierId;
    APP_STATE.brandPanelFilters.atelierId = atelierId;
    APP_STATE.brandPanelFilters.category = 'All Works';
    const el = document.getElementById('view-atelier');
    if (el) el.classList.remove('hidden');
    renderBrandPanel(atelierId);
  } else if (viewName === 'plp') {
    if (params.category) {
      APP_STATE.plpFilters.category = params.category;
    }
    const el = document.getElementById('view-plp');
    if (el) el.classList.remove('hidden');
    renderPLP();
  } else if (viewName === 'pdp') {
    const prodId = params.productId || APP_STATE.activeProductId;
    APP_STATE.activeProductId = prodId;
    const el = document.getElementById('view-pdp');
    if (el) el.classList.remove('hidden');
    renderPDP(prodId);
  } else if (viewName === 'checkout') {
    const el = document.getElementById('view-checkout');
    if (el) el.classList.remove('hidden');
    renderCheckout();
  }
}

// =============================================================================
// 5. VIEW 1: HOMEPAGE (SEARCH-FIRST & DOMINATING BRANDS & TABS)
// =============================================================================

// Search-First Input Handler
function handleHeroSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  const dropdown = document.getElementById('heroSearchDropdown');
  if (!dropdown) return;

  if (!query) {
    dropdown.classList.add('hidden');
    dropdown.innerHTML = '';
    return;
  }

  // Matches across Ateliers, Categories, and Products
  const matchedAteliers = Object.values(ATELIERS).filter(a => 
    a.name.toLowerCase().includes(query) || 
    a.origin.toLowerCase().includes(query)
  );

  const matchedProducts = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.subCategory.toLowerCase().includes(query)
  );

  if (matchedAteliers.length === 0 && matchedProducts.length === 0) {
    dropdown.innerHTML = `
      <div class="p-6 text-center text-sm text-[var(--navy-slate)]">
        No verified ateliers or garments found matching "<span class="text-[var(--navy-deep)] font-semibold">${query}</span>".
      </div>
    `;
    dropdown.classList.remove('hidden');
    return;
  }

  dropdown.innerHTML = `
    <div class="p-5 max-h-[70vh] overflow-y-auto space-y-6 text-left">
      ${matchedAteliers.length > 0 ? `
        <div>
          <span class="text-[10px] uppercase tracking-widest font-bold text-[var(--champagne-gold)] block mb-2">Matched Verified Ateliers</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${matchedAteliers.map(at => `
              <div onclick="navigateToView('atelier', { atelierId: '${at.id}' }); closeHeroSearchDropdown();" class="p-3 bg-[var(--bg-silk)] hover:bg-white border border-[var(--border-light)] hover:border-[var(--wine-primary)] cursor-pointer transition-all flex items-center justify-between">
                <div>
                  <h5 class="font-serif text-sm font-semibold text-[var(--navy-deep)]">${at.name}</h5>
                  <span class="text-[11px] text-[var(--navy-muted)]">${at.origin}</span>
                </div>
                <span class="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 border border-emerald-200">✓ ${at.trustScore}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${matchedProducts.length > 0 ? `
        <div>
          <span class="text-[10px] uppercase tracking-widest font-bold text-[var(--champagne-gold)] block mb-2">Authenticated Objects (${matchedProducts.length})</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${matchedProducts.slice(0, 6).map(p => `
              <div onclick="navigateToView('pdp', { productId: '${p.id}' }); closeHeroSearchDropdown();" class="p-2.5 flex items-center gap-3 bg-white hover:bg-[var(--bg-silk)] border border-[var(--border-light)] hover:border-[var(--wine-primary)] cursor-pointer transition-all">
                <img src="${p.image}" alt="${p.title}" class="w-12 h-16 object-cover border border-[var(--border-light)]" />
                <div class="flex-1 min-w-0">
                  <span class="text-[10px] uppercase font-bold text-[var(--navy-slate)] truncate block">${p.brand}</span>
                  <h6 class="font-serif text-xs text-[var(--navy-deep)] truncate">${p.title}</h6>
                  <span class="text-xs font-semibold text-[var(--wine-primary)]">${convertPrice(p.basePrice)}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  dropdown.classList.remove('hidden');
}

function closeHeroSearchDropdown() {
  const dropdown = document.getElementById('heroSearchDropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

function setHeroSearchQuery(q) {
  const input = document.getElementById('heroSearchInput');
  if (input) {
    input.value = q;
    handleHeroSearchInput({ target: input });
  }
}

/// Render Verified Partner Ateliers Logo Showcase directly beneath the Hero
function renderPartnerLogosShowcase() {
  const track = document.getElementById('partnerLogosTrack');
  if (!track) return;

  const atelierList = Object.values(ATELIERS);

  // Scalable, organic rendering: each logo item is monochrome, unified height, with soft hover pill
  const createLogoMarkup = (atelier) => `
    <a href="#atelier/${atelier.id}" onclick="navigateToView('atelier', { atelierId: '${atelier.id}' }); event.preventDefault();" class="partner-logo-item group" title="${atelier.name} — Verified Partner Atelier">
      <img src="${atelier.officialLogo}" alt="${atelier.name} Official Logo" loading="lazy" />
      <span class="partner-logo-badge">✓ Verified Atelier</span>
    </a>
  `;

  // Triple repeat ensures seamless continuous infinite CSS loop across all viewport widths
  const baseLogos = atelierList.map(createLogoMarkup).join('');
  track.innerHTML = baseLogos + baseLogos + baseLogos;
}

// =============================================================================
// CHAWKBAZAR "MODERN" HOMEPAGE MODULE RENDERERS
// =============================================================================

function renderHomepageDominatingBrands() {
  renderPartnerLogosShowcase();
}

// 1. Curated Private Drops (Snap-Scroll Horizontal Carousel)
function renderPrivateDropsCarousel() {
  const container = document.getElementById('privateDropsCarousel');
  if (!container) return;

  // Curate exclusive pieces (New arrivals and on-sale vault consignments)
  const dropsProducts = PRODUCTS.filter(p => p.isNewArrival || p.isOnSale).slice(0, 10);

  container.innerHTML = dropsProducts.map(p => {
    const isWishlisted = wishlist.has(p.id);
    const variants = p.groupId ? PRODUCTS.filter(s => s.groupId === p.groupId) : [p];

    return `
      <div class="drops-card-item">
        <div class="product-card group bg-white border border-[var(--border-light)] p-3" data-id="${p.id}" id="drop-card-${p.id}">
          <div class="product-img-wrapper relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] cursor-pointer" onclick="navigateToView('pdp', { productId: '${p.id}' })">
            <img src="${p.image}" alt="${p.title}" class="main-img card-main-img w-full h-full object-cover" loading="lazy" />
            <img src="${p.imageHover}" alt="${p.title}" class="hover-img card-hover-img w-full h-full object-cover" loading="lazy" />
            
            <span class="absolute top-3 left-3 z-10 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 ${p.isOnSale ? 'bg-[var(--wine-primary)] text-white' : 'bg-white/95 text-[var(--navy-deep)]'} border border-[var(--border-light)]">
              ${p.tag}
            </span>

            <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Save to Wishlist">
              <svg class="w-3.5 h-3.5" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>

            <!-- Quick Reserve Slide-Up Button -->
            <div class="product-actions">
              <button class="btn-quick-add" onclick="quickAddToCart('${p.id}', event)">Quick Reserve</button>
              <button class="btn-quick-view" onclick="navigateToView('pdp', { productId: '${p.id}' }); event.stopPropagation();">Inspect</button>
            </div>
          </div>

          <div class="pt-3 pb-1">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] uppercase tracking-wider font-semibold text-[var(--navy-slate)] truncate">
                ${p.brand}
              </span>
              <span class="text-[9px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.2 border border-emerald-200 font-medium">
                ✓ ${p.trustScore}
              </span>
            </div>

            <h3 class="font-serif text-sm text-[var(--navy-deep)] leading-snug group-hover:text-[var(--wine-primary)] transition-colors line-clamp-1 mb-1 cursor-pointer" onclick="navigateToView('pdp', { productId: '${p.id}' })">
              ${p.title}
            </h3>

            <!-- Color Swatches -->
            <div class="product-variant-row py-0.5">
              <div class="variant-swatches-list">
                ${variants.map(v => `
                  <button 
                    type="button" 
                    class="variant-swatch-pill ${v.id === p.id ? 'active' : ''}" 
                    style="background-color: ${v.colorHex || '#1C2541'};"
                    title="${v.colorName}"
                    onclick="switchCardVariant('${p.id}', '${v.id}', event)"
                  ></button>
                `).join('')}
              </div>
              <span class="variant-count-tag">${p.colorName}</span>
            </div>

            <div class="flex items-baseline justify-between pt-1.5">
              <div>
                <span class="font-sans text-xs font-semibold text-[var(--navy-deep)] card-price">
                  ${convertPrice(p.basePrice)}
                </span>
                ${p.wasPrice ? `
                  <span class="text-[10px] text-[var(--navy-muted)] line-through ml-1.5 card-was-price">
                    ${convertPrice(p.wasPrice)}
                  </span>
                ` : ''}
              </div>
              <span class="text-[10px] text-[var(--navy-muted)]">
                ${p.origin.split('&')[0].trim()}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Carousel Horizontal Scroll Handler
function scrollDropsCarousel(direction) {
  const container = document.getElementById('privateDropsCarousel');
  if (!container) return;
  const scrollAmount = 330 * direction;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// 2. Featured Atelier Showcase (Tabbed 4-Column Product Matrix)
function renderFeaturedAtelierMatrix(activeTab = 'all') {
  const container = document.getElementById('featuredAtelierGrid');
  if (!container) return;

  APP_STATE.featuredAtelierTab = activeTab;

  let filtered = [];
  if (activeTab === 'all') {
    // Curate signature works from each partner house
    const ateliers = ['sana-safinaz', 'baroque-couture', 'lama-retail', 'breakout-atelier', 'nishat-linen', 'gucci-atelier'];
    ateliers.forEach(atId => {
      const items = PRODUCTS.filter(p => p.atelierId === atId);
      if (items.length > 0) {
        filtered.push(items[0]);
        if (items.length > 1 && filtered.length < 8) filtered.push(items[1]);
      }
    });
  } else {
    filtered = PRODUCTS.filter(p => p.atelierId === activeTab);
  }

  container.innerHTML = filtered.map(p => renderSingleProductCard(p)).join('');
}

function setFeaturedAtelierTab(tabId, btnElement) {
  const tabButtons = document.querySelectorAll('#featuredAtelierTabs .featured-tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderFeaturedAtelierMatrix(tabId);
}

// 3. Live Drops Countdown Timer (Simulated Vault Window)
let dropsTimerInterval = null;
function initDropsCountdownTimer() {
  if (dropsTimerInterval) return;

  function updateTimer() {
    const timerEl = document.getElementById('dropsTimerText');
    if (!timerEl) return;

    const now = new Date();
    // Countdown to next midnight GMT
    const midnight = new Date(now);
    midnight.setUTCHours(24, 0, 0, 0);
    const diff = midnight - now;

    if (diff <= 0) {
      timerEl.innerText = 'Vault Access: Refreshing Drops...';
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.innerText = `Vault Access: ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }

  updateTimer();
  dropsTimerInterval = setInterval(updateTimer, 1000);
}

// 4. Newsletter Subscription Handler
function handleSalonSubscribe(e) {
  e.preventDefault();
  const input = document.getElementById('salonEmailInput');
  const email = input ? input.value : '';
  showToast(`Private Salon invitation issued to ${email || 'patron'}. Confidential credentials dispatched.`);
  if (input) input.value = '';
}

/// Reusable single product card renderer with Interactive Color Variant Swatches (Reference: Ray-Ban & Vescartes)
function renderSingleProductCard(p) {
  const isWishlisted = wishlist.has(p.id);
  
  // Find linked color sibling variants in the same family group
  const variants = p.groupId ? PRODUCTS.filter(sibling => sibling.groupId === p.groupId) : [p];

  return `
    <div class="product-card group" data-id="${p.id}" id="card-${p.id}">
      <div class="product-img-wrapper cursor-pointer" onclick="navigateToView('pdp', { productId: '${p.id}' })">
        <img src="${p.image}" alt="${p.title}" class="main-img card-main-img" loading="lazy" />
        <img src="${p.imageHover}" alt="${p.title}" class="hover-img card-hover-img" loading="lazy" />
        
        <span class="absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 ${p.isOnSale ? 'bg-[var(--wine-primary)] text-white' : 'bg-white/95 text-[var(--navy-deep)]'} border border-[var(--border-light)] card-tag">
          ${p.tag}
        </span>

        <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Save to Wishlist">
          <svg class="w-4 h-4" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        <div class="product-actions">
          <button class="btn-quick-add" onclick="quickAddToCart('${p.id}', event)">+ Add To Bag</button>
          <button class="btn-quick-view" onclick="navigateToView('pdp', { productId: '${p.id}' }); event.stopPropagation();">Inspect</button>
        </div>
      </div>

      <div class="pt-4 pb-2">
        <div class="flex items-center justify-between gap-2 mb-1.5">
          <a href="#atelier/${p.atelierId}" onclick="navigateToView('atelier', { atelierId: '${p.atelierId}' }); event.preventDefault();" class="text-xs uppercase tracking-wider font-semibold text-[var(--navy-slate)] hover:text-[var(--wine-primary)] truncate">
            ${p.brand}
          </a>
          <span class="atelier-badge" onclick="openAtelierTrustModal('${p.id}', event)">
            <span class="badge-dot"></span>
            <span>Ayiin Certified • ${p.trustScore}</span>
          </span>
        </div>

        <h3 class="font-serif text-base text-[var(--navy-deep)] leading-snug group-hover:text-[var(--wine-primary)] transition-colors line-clamp-1 mb-1 cursor-pointer card-title" onclick="navigateToView('pdp', { productId: '${p.id}' })">
          ${p.title}
        </h3>

        <!-- Interactive Color Variant Swatches (Switch instantly without leaving page) -->
        <div class="product-variant-row">
          <div class="variant-swatches-list">
            ${variants.map(v => `
              <button 
                type="button" 
                class="variant-swatch-pill ${v.id === p.id ? 'active' : ''}" 
                style="background-color: ${v.colorHex || '#1C2541'};"
                title="${v.colorName} — ${v.title}"
                aria-label="Color ${v.colorName}"
                onclick="switchCardVariant('${p.id}', '${v.id}', event)"
              ></button>
            `).join('')}
          </div>
          <span class="variant-count-tag card-color-label">${p.colorName}</span>
        </div>

        <div class="flex items-baseline justify-between pt-2">
          <div>
            <span class="font-sans text-sm font-semibold text-[var(--navy-deep)] card-price">
              ${convertPrice(p.basePrice)}
            </span>
            ${p.wasPrice ? `
              <span class="text-xs text-[var(--navy-muted)] line-through ml-2 card-was-price">
                ${convertPrice(p.wasPrice)}
              </span>
            ` : ''}
          </div>
          <span class="text-[11px] text-[var(--navy-muted)]">
            ${p.origin.split('&')[0].trim()}
          </span>
        </div>
      </div>
    </div>
  `;
}

// Interactive Color Variant Switcher for Product Cards
function switchCardVariant(currentCardId, targetProductId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  const targetProduct = PRODUCTS.find(p => p.id === targetProductId);
  if (!targetProduct) return;

  const card = document.getElementById(`card-${currentCardId}`);
  if (!card) return;

  // Update card image with smooth crossfade
  const mainImg = card.querySelector('.card-main-img');
  const hoverImg = card.querySelector('.card-hover-img');
  const titleEl = card.querySelector('.card-title');
  const priceEl = card.querySelector('.card-price');
  const wasPriceEl = card.querySelector('.card-was-price');
  const colorLabel = card.querySelector('.card-color-label');
  const tagEl = card.querySelector('.card-tag');
  const wrapper = card.querySelector('.product-img-wrapper');
  const quickAddBtn = card.querySelector('.btn-quick-add');
  const inspectBtn = card.querySelector('.btn-quick-view');
  const wishlistBtn = card.querySelector('.wishlist-btn-card');

  if (mainImg) {
    mainImg.style.opacity = '0.5';
    mainImg.src = targetProduct.image;
    setTimeout(() => { mainImg.style.opacity = ''; }, 200);
  }
  if (hoverImg) hoverImg.src = targetProduct.imageHover;
  if (titleEl) titleEl.textContent = targetProduct.title;
  if (priceEl) priceEl.textContent = convertPrice(targetProduct.basePrice);
  if (wasPriceEl) {
    wasPriceEl.textContent = targetProduct.wasPrice ? convertPrice(targetProduct.wasPrice) : '';
  }
  if (colorLabel) colorLabel.textContent = targetProduct.colorName;
  if (tagEl) {
    tagEl.textContent = targetProduct.tag;
    tagEl.className = `absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 ${targetProduct.isOnSale ? 'bg-[var(--wine-primary)] text-white' : 'bg-white/95 text-[var(--navy-deep)]'} border border-[var(--border-light)] card-tag`;
  }

  // Update active pill state
  card.querySelectorAll('.variant-swatch-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('title').startsWith(targetProduct.colorName));
  });

  // Re-bind quick actions to the target product
  if (wrapper) wrapper.setAttribute('onclick', `navigateToView('pdp', { productId: '${targetProduct.id}' })`);
  if (titleEl) titleEl.setAttribute('onclick', `navigateToView('pdp', { productId: '${targetProduct.id}' })`);
  if (quickAddBtn) quickAddBtn.setAttribute('onclick', `quickAddToCart('${targetProduct.id}', event)`);
  if (inspectBtn) inspectBtn.setAttribute('onclick', `navigateToView('pdp', { productId: '${targetProduct.id}' }); event.stopPropagation();`);
  if (wishlistBtn) wishlistBtn.setAttribute('onclick', `toggleWishlist('${targetProduct.id}', event)`);
}

// Homepage Curation Tab Switcher
function setHomepageCurationTab(tabName, btnElement) {
  APP_STATE.homepageCurationTab = tabName;
  document.querySelectorAll('.curation-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderHomepageCurationGrid();
}

function renderHomepageCurationGrid() {
  const container = document.getElementById('curationProductsGrid');
  if (!container) return;

  const tab = APP_STATE.homepageCurationTab;

  if (tab === 'brands') {
    // Render the interactive brand cards showcase
    container.innerHTML = `
      <div class="col-span-full grid grid-cols-1 md:grid-cols-3 gap-6">
        ${Object.values(ATELIERS).map(a => `
          <div onclick="navigateToView('atelier', { atelierId: '${a.id}' })" class="p-6 bg-[var(--bg-silk)] border border-[var(--border-light)] hover:border-[var(--wine-primary)] transition-all cursor-pointer group">
            <div class="h-44 overflow-hidden mb-4 relative">
              <img src="${a.coverBanner}" alt="${a.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span class="absolute top-3 right-3 text-[10px] uppercase font-bold bg-[var(--navy-deep)] text-white px-2.5 py-1">✓ ${a.trustScore}</span>
            </div>
            <h4 class="font-serif text-xl text-[var(--navy-deep)] group-hover:text-[var(--wine-primary)]">${a.name}</h4>
            <p class="text-xs text-[var(--navy-slate)] mt-1 mb-4">${a.origin}</p>
            <div class="text-xs font-semibold text-[var(--wine-primary)] uppercase tracking-wider flex items-center gap-1">
              <span>View Brand Catalog & Filters</span>
              <span>→</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    return;
  }

  let items = PRODUCTS;

  if (tab === 'new-arrivals') {
    items = PRODUCTS.filter(p => p.isNewArrival);
  } else if (tab === 'best-ateliers') {
    items = PRODUCTS.filter(p => p.isBestAtelier);
  } else if (tab === 'on-sale') {
    items = PRODUCTS.filter(p => p.isOnSale);
  }

  if (items.length === 0) items = PRODUCTS.slice(0, 4);

  container.innerHTML = items.map(p => {
    const isWishlisted = wishlist.has(p.id);
    return `
      <div class="product-card group" data-id="${p.id}">
        <div class="product-img-wrapper cursor-pointer" onclick="navigateToView('pdp', { productId: '${p.id}' })">
          <img src="${p.image}" alt="${p.title}" class="main-img" loading="lazy" />
          <img src="${p.imageHover}" alt="${p.title}" class="hover-img" loading="lazy" />
          
          <span class="absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 ${p.isOnSale ? 'bg-[var(--wine-primary)] text-white' : 'bg-white/95 text-[var(--navy-deep)]'} border border-[var(--border-light)]">
            ${p.tag}
          </span>

          <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${p.id}', event)" title="Save to Wishlist">
            <svg class="w-4 h-4" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          <div class="product-actions">
            <button class="btn-quick-add" onclick="quickAddToCart('${p.id}', event)">+ Add To Bag</button>
            <button class="btn-quick-view" onclick="navigateToView('pdp', { productId: '${p.id}' }); event.stopPropagation();">Inspect</button>
          </div>
        </div>

        <div class="pt-4 pb-2">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <a href="#atelier/${p.atelierId}" onclick="navigateToView('atelier', { atelierId: '${p.atelierId}' }); event.preventDefault();" class="text-xs uppercase tracking-wider font-semibold text-[var(--navy-slate)] hover:text-[var(--wine-primary)] truncate">
              ${p.brand}
            </a>
            <span class="atelier-badge" onclick="openAtelierTrustModal('${p.id}', event)">
              <span class="badge-dot"></span>
              <span>Ayiin Certified • ${p.trustScore}</span>
            </span>
          </div>

          <h3 class="font-serif text-base text-[var(--navy-deep)] leading-snug group-hover:text-[var(--wine-primary)] transition-colors line-clamp-1 mb-1 cursor-pointer" onclick="navigateToView('pdp', { productId: '${p.id}' })">
            ${p.title}
          </h3>

          <div class="flex items-baseline justify-between pt-1">
            <div>
              <span class="font-sans text-sm font-semibold text-[var(--navy-deep)]">
                ${convertPrice(p.basePrice)}
              </span>
              ${p.wasPrice ? `
                <span class="text-xs text-[var(--navy-muted)] line-through ml-2">
                  ${convertPrice(p.wasPrice)}
                </span>
              ` : ''}
            </div>
            <span class="text-[11px] text-[var(--navy-muted)]">
              ${p.origin.split('&')[0].trim()}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// =============================================================================
// 6. VIEW 2: SPECIFIC BRAND PANEL (WITH BRAND-SPECIFIC CATEGORIES & FILTERS)
// =============================================================================
function renderBrandPanel(atelierId) {
  const atelier = ATELIERS[atelierId] || ATELIERS['sana-safinaz'];
  const container = document.getElementById('view-atelier');
  if (!container) return;

  const currentCategory = APP_STATE.brandPanelFilters.category || 'All Works';

  // Filter products for this specific brand
  let brandProducts = PRODUCTS.filter(p => p.atelierId === atelier.id);

  // Apply intelligent brand-specific category filter
  if (currentCategory && currentCategory !== 'All Works') {
    const fullCat = currentCategory.toLowerCase();
    const tokenCat = fullCat.replace(/&/g, ' ').split(' ')[0];
    brandProducts = brandProducts.filter(p => {
      const subCat = (p.subCategory || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      return subCat.includes(fullCat) || cat.includes(fullCat) || title.includes(fullCat) ||
             subCat.includes(tokenCat) || cat.includes(tokenCat) || title.includes(tokenCat);
    });
  }

  // Apply price filter
  brandProducts = brandProducts.filter(p => getConvertedNumber(p.basePrice) <= getConvertedNumber(APP_STATE.brandPanelFilters.maxPrice));

  // Apply color filter
  if (APP_STATE.brandPanelFilters.color !== 'all') {
    brandProducts = brandProducts.filter(p => p.colorName.toLowerCase() === APP_STATE.brandPanelFilters.color.toLowerCase());
  }

  // Apply hub filter
  if (APP_STATE.brandPanelFilters.hub !== 'all') {
    brandProducts = brandProducts.filter(p => p.dispatchHub.toLowerCase() === APP_STATE.brandPanelFilters.hub.toLowerCase());
  }

  // Sort
  if (APP_STATE.brandPanelFilters.sort === 'price-low') {
    brandProducts.sort((a, b) => a.basePrice - b.basePrice);
  } else if (APP_STATE.brandPanelFilters.sort === 'price-high') {
    brandProducts.sort((a, b) => b.basePrice - a.basePrice);
  }

  const hubsList = atelier.hubs || ['London Mayfair Vault', 'Dubai Logistics Hub', 'Lahore Heritage Protocol'];
  const categoryList = atelier.brandCategories || ['All Works'];

  container.innerHTML = `
    <!-- Brand Panel Navigation Bar -->
    <div class="py-3.5 bg-[var(--navy-topbar)] text-white/80 text-xs border-b border-[var(--border-gold-glass)]">
      <div class="container-luxury flex items-center justify-between">
        <div class="flex items-center gap-2">
          <a href="#home" onclick="navigateToView('homepage'); event.preventDefault();" class="hover:text-[var(--champagne-gold)]">← Return to Editorial Home</a>
          <span class="text-white/30">|</span>
          <span class="text-[var(--champagne-gold)] uppercase font-semibold">Atelier Salon: ${atelier.name}</span>
        </div>
        <div class="flex items-center gap-4 text-[11px]">
          <span>Authenticated Hub: <strong class="text-white">${atelier.origin}</strong></span>
        </div>
      </div>
    </div>

    <!-- Atelier Cover Banner -->
    <div class="relative w-full h-[360px] md:h-[440px] overflow-hidden bg-[var(--navy-deep)]">
      <img src="${atelier.coverBanner}" alt="${atelier.name}" class="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out" />
      <div class="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-[var(--navy-deep)]/60 to-transparent"></div>
      
      <div class="container-luxury absolute bottom-8 left-0 right-0 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
        <div class="max-w-2xl">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xs uppercase tracking-[0.25em] font-bold text-[var(--champagne-gold)]">Verified Atelier Partner</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span class="text-xs text-white/70">Est. ${atelier.founded} &bull; ${atelier.origin}</span>
          </div>
          <h1 class="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white mb-2">
            ${atelier.name}
          </h1>
          <p class="text-sm text-white/80 font-light leading-relaxed max-w-xl">
            ${atelier.headline}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <button class="btn-wine" onclick="showToast('Subscribed to private releases from ${atelier.name}');">
            Follow Atelier Releases
          </button>
        </div>
      </div>
    </div>

    <!-- Credibility & Trust Metrics Grid -->
    <div class="bg-[var(--bg-silk)] border-b border-[var(--border-light)] py-6">
      <div class="container-luxury">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 bg-white border border-[var(--border-light)] text-center">
            <div class="font-serif text-2xl sm:text-3xl text-[var(--navy-deep)] font-semibold mb-0.5">${atelier.ordersFulfilled}</div>
            <div class="text-[10px] uppercase tracking-wider font-semibold text-[var(--navy-slate)]">Platform Orders Fulfilled</div>
          </div>
          <div class="p-4 bg-white border border-[var(--border-light)] text-center">
            <div class="font-serif text-2xl sm:text-3xl text-emerald-700 font-semibold mb-0.5">${atelier.dispatchRate}</div>
            <div class="text-[10px] uppercase tracking-wider font-semibold text-[var(--navy-slate)]">On-Time Dispatch Rate</div>
          </div>
          <div class="p-4 bg-white border border-[var(--border-light)] text-center">
            <div class="font-serif text-2xl sm:text-3xl text-[var(--navy-deep)] font-semibold mb-0.5">${atelier.disputeRate}</div>
            <div class="text-[10px] uppercase tracking-wider font-semibold text-[var(--navy-slate)]">Escrow Disputes</div>
          </div>
          <div class="p-4 bg-white border border-[var(--border-light)] text-center">
            <div class="font-serif text-2xl sm:text-3xl text-[var(--wine-primary)] font-semibold mb-0.5">${atelier.rating} / 5.0</div>
            <div class="text-[10px] uppercase tracking-wider font-semibold text-[var(--navy-slate)]">Connoisseur Rating</div>
          </div>
        </div>
      </div>
    </div>

    <!-- BRAND-SPECIFIC CATEGORIES & FILTERS PANEL -->
    <div class="py-10 bg-white border-b border-[var(--border-light)]">
      <div class="container-luxury">
        
        <!-- Brand-Specific Category Tabs -->
        <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[var(--border-light)] gap-4">
          <div>
            <span class="text-xs uppercase tracking-widest font-bold text-[var(--champagne-gold)] block mb-1">Specific Atelier Disciplines</span>
            <h3 class="font-serif text-2xl text-[var(--navy-deep)]">Categories for ${atelier.name}</h3>
          </div>

          <!-- Category Buttons -->
          <div class="flex flex-wrap gap-2">
            ${categoryList.map(cat => `
              <button onclick="setBrandCategory('${cat}')" class="px-4 py-2 text-xs uppercase tracking-wider font-semibold border ${currentCategory.toLowerCase() === cat.toLowerCase() ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white shadow-sm' : 'border-[var(--border-strong)] bg-white text-[var(--navy-deep)] hover:border-[var(--wine-primary)]'} transition-all">
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Brand-Specific Secondary Filters Toolbar -->
        <div class="p-4 bg-[var(--bg-silk)] border border-[var(--border-light)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center text-xs">
          
          <!-- Filter by Dispatch Hub -->
          <div>
            <label class="block text-[10px] uppercase tracking-wider font-bold text-[var(--navy-muted)] mb-1">Inspection & Dispatch Hub</label>
            <select onchange="setBrandHub(this.value)" class="w-full p-2 bg-white border border-[var(--border-strong)] text-[var(--navy-deep)] focus:outline-none">
              <option value="all" ${APP_STATE.brandPanelFilters.hub === 'all' ? 'selected' : ''}>All Certified Hubs</option>
              ${hubsList.map(h => `
                <option value="${h}" ${APP_STATE.brandPanelFilters.hub.toLowerCase() === h.toLowerCase() ? 'selected' : ''}>${h}</option>
              `).join('')}
            </select>
          </div>

          <!-- Filter by Max Budget -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-[10px] uppercase tracking-wider font-bold text-[var(--navy-muted)]">Max Budget</label>
              <span class="font-semibold text-[var(--navy-deep)]">${convertPrice(APP_STATE.brandPanelFilters.maxPrice)}</span>
            </div>
            <input type="range" min="400" max="4000" step="100" value="${APP_STATE.brandPanelFilters.maxPrice}" oninput="setBrandPriceSlider(this.value)" class="w-full accent-[var(--wine-primary)] cursor-pointer" />
          </div>

          <!-- Filter by Color Palette -->
          <div>
            <label class="block text-[10px] uppercase tracking-wider font-bold text-[var(--navy-muted)] mb-1">Palette</label>
            <div class="flex items-center gap-2">
              ${[
                { name: 'all', label: 'All' },
                { name: 'Cream', hex: '#FAF7F2' },
                { name: 'Wine', hex: '#5E0B1B' },
                { name: 'Midnight', hex: '#1C2541' },
                { name: 'Noir', hex: '#0B132B' },
                { name: 'Champagne', hex: '#C5A880' }
              ].map(c => `
                <button onclick="setBrandColor('${c.name}')" title="${c.name}" class="w-5 h-5 rounded-full border ${APP_STATE.brandPanelFilters.color.toLowerCase() === c.name.toLowerCase() ? 'ring-2 ring-[var(--wine-primary)]' : 'border-[var(--border-strong)]'}" style="background: ${c.hex || '#E5E7EB'};"></button>
              `).join('')}
            </div>
          </div>

          <!-- Sort Selector & Reset -->
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="block text-[10px] uppercase tracking-wider font-bold text-[var(--navy-muted)] mb-1">Sort</label>
              <select onchange="setBrandSort(this.value)" class="w-full p-2 bg-white border border-[var(--border-strong)] text-[var(--navy-deep)] focus:outline-none">
                <option value="featured" ${APP_STATE.brandPanelFilters.sort === 'featured' ? 'selected' : ''}>Featured</option>
                <option value="price-low" ${APP_STATE.brandPanelFilters.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${APP_STATE.brandPanelFilters.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              </select>
            </div>
            <button onclick="resetBrandFilters()" class="mt-4 p-2 text-xs text-[var(--wine-primary)] hover:underline whitespace-nowrap">
              Reset
            </button>
          </div>

        </div>

      </div>
    </div>

    <!-- Atelier Filtered Product Catalog Grid -->
    <div class="py-16 bg-[var(--bg-silk)]">
      <div class="container-luxury">
        <div class="flex justify-between items-center mb-6">
          <span class="text-xs uppercase tracking-wider text-[var(--navy-slate)]">Showing <strong>${brandProducts.length}</strong> objects authenticated for ${atelier.name}</span>
          <span class="text-xs text-[var(--champagne-gold)] font-semibold">100% Bonded Escrow Coverage</span>
        </div>

        ${brandProducts.length === 0 ? `
          <div class="py-20 text-center bg-white border border-[var(--border-light)] p-8">
            <h4 class="font-serif text-2xl text-[var(--navy-deep)] mb-2">No Curations Match These Specific Brand Filters</h4>
            <p class="text-xs text-[var(--navy-slate)] mb-4">Try selecting "All Works" or resetting your filters to explore ${atelier.name}'s complete collection.</p>
            <button onclick="resetBrandFilters()" class="btn-wine">Explore All Works (${PRODUCTS.filter(p => p.atelierId === atelier.id).length} pieces)</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            ${brandProducts.map(p => renderSingleProductCard(p)).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

function setBrandCategory(cat) {
  APP_STATE.brandPanelFilters.category = cat;
  renderBrandPanel(APP_STATE.activeAtelierId);
}

function setBrandPriceSlider(val) {
  APP_STATE.brandPanelFilters.maxPrice = Number(val);
  renderBrandPanel(APP_STATE.activeAtelierId);
}

function setBrandColor(col) {
  APP_STATE.brandPanelFilters.color = col;
  renderBrandPanel(APP_STATE.activeAtelierId);
}

function setBrandHub(hub) {
  APP_STATE.brandPanelFilters.hub = hub;
  renderBrandPanel(APP_STATE.activeAtelierId);
}

function setBrandSort(sort) {
  APP_STATE.brandPanelFilters.sort = sort;
  renderBrandPanel(APP_STATE.activeAtelierId);
}

function resetBrandFilters() {
  APP_STATE.brandPanelFilters = {
    category: 'All Works',
    maxPrice: 4000,
    color: 'all',
    hub: 'all',
    sort: 'featured'
  };
  renderBrandPanel(APP_STATE.activeAtelierId);
}

// =============================================================================
// 7. VIEW 3: PRODUCT LISTING PAGE (PLP / CATALOG)
// =============================================================================
function renderPLP() {
  const container = document.getElementById('view-plp');
  if (!container) return;

  const currentCategory = APP_STATE.plpFilters.category;

  let filtered = PRODUCTS.filter(p => {
    if (currentCategory !== 'all' && p.category !== currentCategory) return false;
    if (APP_STATE.plpFilters.ateliers.size > 0 && !APP_STATE.plpFilters.ateliers.has(p.atelierId)) return false;
    const converted = getConvertedNumber(p.basePrice);
    const convertedMax = getConvertedNumber(APP_STATE.plpFilters.maxPrice);
    if (converted > convertedMax) return false;
    if (APP_STATE.plpFilters.color !== 'all' && p.colorName.toLowerCase() !== APP_STATE.plpFilters.color.toLowerCase()) return false;
    return true;
  });

  if (APP_STATE.plpFilters.sort === 'price-low') {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (APP_STATE.plpFilters.sort === 'price-high') {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  }

  container.innerHTML = `
    <div class="py-8 bg-[var(--bg-silk)] border-b border-[var(--border-light)]">
      <div class="container-luxury">
        <div class="flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--navy-slate)] mb-3">
          <a href="#home" onclick="navigateToView('homepage'); event.preventDefault();" class="hover:text-[var(--wine-primary)]">Home</a>
          <span>/</span>
          <span class="text-[var(--champagne-gold)] font-medium">Collections</span>
          <span>/</span>
          <span class="text-[var(--navy-deep)] font-semibold">${currentCategory.toUpperCase()}</span>
        </div>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="font-serif text-3xl sm:text-5xl text-[var(--navy-deep)] font-light capitalize">
              ${currentCategory === 'all' ? 'All Verified Curations' : currentCategory}
            </h1>
            <p class="text-xs text-[var(--navy-slate)] mt-1">Showing ${filtered.length} authenticated items from verified London, Dubai & Lahore ateliers.</p>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xs uppercase tracking-wider text-[var(--navy-muted)] font-medium">Sort By:</span>
            <select onchange="handlePLPSort(this.value)" class="bg-white border border-[var(--border-strong)] text-xs p-2 text-[var(--navy-deep)] focus:outline-none">
              <option value="featured" ${APP_STATE.plpFilters.sort === 'featured' ? 'selected' : ''}>Featured Drops</option>
              <option value="price-low" ${APP_STATE.plpFilters.sort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${APP_STATE.plpFilters.sort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="container-luxury py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- Filter Sidebar -->
        <aside class="lg:col-span-3 space-y-8 sticky top-28 bg-[var(--bg-silk-card)] p-6 border border-[var(--border-light)]">
          <div class="flex items-center justify-between pb-3 border-b border-[var(--border-light)]">
            <span class="font-serif text-base font-semibold text-[var(--navy-deep)] uppercase tracking-wider">Refine Curations</span>
            <button onclick="clearPLPFilters()" class="text-[11px] uppercase tracking-wider text-[var(--wine-primary)] font-semibold hover:underline">Clear All</button>
          </div>

          <div>
            <h4 class="text-xs uppercase font-bold tracking-widest text-[var(--champagne-gold)] mb-3">Disciplines</h4>
            <div class="space-y-1.5 text-xs text-[var(--navy-deep)]">
              ${['all', 'clothing', 'footwear', 'bags', 'belts'].map(cat => `
                <button onclick="setPLPCategory('${cat}')" class="w-full text-left py-1 px-2 flex justify-between items-center ${currentCategory === cat ? 'font-bold text-[var(--wine-primary)] bg-white border-l-2 border-[var(--wine-primary)]' : 'hover:bg-white/60'} transition-all">
                  <span class="capitalize">${cat === 'all' ? 'All Objects' : cat}</span>
                  <span class="text-[10px] text-[var(--navy-muted)]">${cat === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div>
            <h4 class="text-xs uppercase font-bold tracking-widest text-[var(--champagne-gold)] mb-3">Verified Ateliers</h4>
            <div class="space-y-2 text-xs">
              ${Object.values(ATELIERS).map(at => {
                const isChecked = APP_STATE.plpFilters.ateliers.has(at.id);
                return `
                  <label class="flex items-center gap-2 cursor-pointer text-[var(--navy-deep)] hover:text-[var(--wine-primary)]">
                    <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="togglePLPBrandFilter('${at.id}')" class="accent-[var(--wine-primary)]" />
                    <span class="truncate">${at.name}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="uppercase font-bold tracking-widest text-[var(--champagne-gold)]">Max Budget</span>
              <span class="font-semibold text-[var(--navy-deep)]">${convertPrice(APP_STATE.plpFilters.maxPrice)}</span>
            </div>
            <input type="range" min="300" max="4000" step="100" value="${APP_STATE.plpFilters.maxPrice}" oninput="handlePLPPriceSlider(this.value)" class="w-full accent-[var(--wine-primary)] cursor-pointer" />
          </div>

          <div>
            <h4 class="text-xs uppercase font-bold tracking-widest text-[var(--champagne-gold)] mb-3">Atelier Palette</h4>
            <div class="flex flex-wrap gap-2">
              ${[
                { name: 'all', hex: 'linear-gradient(45deg, #FAF7F2, #0B132B)' },
                { name: 'Cream', hex: '#FAF7F2' },
                { name: 'Wine', hex: '#5E0B1B' },
                { name: 'Midnight', hex: '#1C2541' },
                { name: 'Noir', hex: '#0B132B' },
                { name: 'Champagne', hex: '#C5A880' }
              ].map(c => `
                <button onclick="setPLPColor('${c.name}')" title="${c.name}" class="w-6 h-6 rounded-full border ${APP_STATE.plpFilters.color.toLowerCase() === c.name.toLowerCase() ? 'ring-2 ring-[var(--wine-primary)]' : 'border-[var(--border-strong)]'} transition-all" style="background: ${c.hex};"></button>
              `).join('')}
            </div>
          </div>
        </aside>

        <!-- Product Matrix -->
        <main class="lg:col-span-9">
          ${filtered.length === 0 ? `
            <div class="py-24 text-center bg-white border border-[var(--border-light)] p-8">
              <h3 class="font-serif text-2xl text-[var(--navy-deep)] mb-2">No Curations Match These Filters</h3>
              <p class="text-sm text-[var(--navy-slate)] mb-6">Expand your price range or reset atelier selections.</p>
              <button onclick="clearPLPFilters()" class="btn-wine">Reset Filters</button>
            </div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              ${filtered.map(p => renderSingleProductCard(p)).join('')}
            </div>
          `}
        </main>

      </div>
    </div>
  `;
}

function setPLPCategory(cat) {
  APP_STATE.plpFilters.category = cat;
  renderPLP();
}

function togglePLPBrandFilter(brandId) {
  if (APP_STATE.plpFilters.ateliers.has(brandId)) {
    APP_STATE.plpFilters.ateliers.delete(brandId);
  } else {
    APP_STATE.plpFilters.ateliers.add(brandId);
  }
  renderPLP();
}

function handlePLPPriceSlider(val) {
  APP_STATE.plpFilters.maxPrice = Number(val);
  renderPLP();
}

function setPLPColor(col) {
  APP_STATE.plpFilters.color = col;
  renderPLP();
}

function handlePLPSort(sortVal) {
  APP_STATE.plpFilters.sort = sortVal;
  renderPLP();
}

function clearPLPFilters() {
  APP_STATE.plpFilters = {
    category: 'all',
    ateliers: new Set(),
    maxPrice: 4000,
    color: 'all',
    sort: 'featured'
  };
  renderPLP();
}

// =============================================================================
// 8. VIEW 4: PRODUCT DETAIL PAGE (PDP)
// =============================================================================
function renderPDP(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const atelier = ATELIERS[product.atelierId] || ATELIERS['sana-safinaz'];
  const container = document.getElementById('view-pdp');
  if (!container) return;

  const currentUnit = APP_STATE.activePdpSizeUnit;
  const currentSizes = product.sizes[currentUnit] || product.sizes['UK'];
  if (!APP_STATE.activePdpSelectedSize || !currentSizes.includes(APP_STATE.activePdpSelectedSize)) {
    APP_STATE.activePdpSelectedSize = currentSizes[0];
  }

  container.innerHTML = `
    <div class="py-4 bg-[var(--bg-silk)] border-b border-[var(--border-light)] text-xs">
      <div class="container-luxury flex items-center gap-2 text-[var(--navy-slate)] uppercase tracking-wider">
        <a href="#home" onclick="navigateToView('homepage'); event.preventDefault();" class="hover:text-[var(--wine-primary)]">Home</a>
        <span>/</span>
        <a href="#plp/${product.category}" onclick="navigateToView('plp', { category: '${product.category}' }); event.preventDefault();" class="hover:text-[var(--wine-primary)] capitalize">${product.category}</a>
        <span>/</span>
        <span class="text-[var(--navy-deep)] font-semibold truncate">${product.title}</span>
      </div>
    </div>

    <div class="container-luxury py-12 md:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-7 space-y-6">
          <div class="sticky top-28 space-y-4">
            <div class="relative bg-[var(--bg-silk)] overflow-hidden border border-[var(--border-light)] group cursor-zoom-in flex items-center justify-center p-4">
              <img id="pdpMainImg" src="${product.gallery[APP_STATE.activePdpMainImageIndex] || product.image}" alt="${product.title}" class="w-full h-[480px] sm:h-[560px] object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105" />
              <span class="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest px-3 py-1 ${product.isOnSale ? 'bg-[var(--wine-primary)] text-white' : 'bg-white/95 text-[var(--navy-deep)]'} border border-[var(--border-light)] shadow-sm">
                ${product.tag}
              </span>
            </div>

            <!-- Alternative Clean Horizontal Thumbnail Rail -->
            <div class="pdp-gallery-strip">
              ${product.gallery.map((img, idx) => `
                <button type="button" onclick="setPdpImageIndex(${idx})" class="pdp-thumbnail-card ${APP_STATE.activePdpMainImageIndex === idx ? 'active' : ''}" aria-label="View view ${idx + 1}">
                  <img src="${img}" alt="${product.title} perspective ${idx + 1}" />
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 sticky top-28 space-y-6">
          <div class="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
            <a href="#atelier/${product.atelierId}" onclick="navigateToView('atelier', { atelierId: '${product.atelierId}' }); event.preventDefault();" class="text-xs uppercase font-bold tracking-[0.2em] text-[var(--wine-primary)] hover:underline">
              ${product.brand} — ${product.inspectedAt}
            </a>
            <span class="atelier-badge" onclick="openAtelierTrustModal('${product.id}', event)">
              <span class="badge-dot"></span>
              <span>Ayiin Certified • ${product.trustScore}</span>
            </span>
          </div>

          <div>
            <h1 class="font-serif text-3xl sm:text-4xl text-[var(--navy-deep)] leading-snug font-normal mb-3">
              ${product.title}
            </h1>
            <div class="flex items-baseline gap-4">
              <span class="font-sans text-2xl font-bold text-[var(--navy-deep)] tracking-tight">
                ${convertPrice(product.basePrice)}
              </span>
              ${product.wasPrice ? `
                <span class="text-base text-[var(--navy-muted)] line-through">
                  ${convertPrice(product.wasPrice)}
                </span>
              ` : ''}
              <span class="text-xs text-emerald-700 font-medium">Local Duties & Escrow Protected</span>
            </div>
          </div>

          <p class="text-sm text-[var(--navy-slate)] font-light leading-relaxed">
            ${product.description}
          </p>

          <!-- Color Variant Selector on PDP -->
          ${(() => {
            const pdpSiblings = product.groupId ? PRODUCTS.filter(s => s.groupId === product.groupId) : [product];
            return `
              <div class="border-t border-b border-[var(--border-light)] py-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs uppercase font-bold tracking-wider text-[var(--navy-deep)]">Available Colorways (${pdpSiblings.length}):</span>
                  <span class="text-xs text-[var(--wine-primary)] font-semibold">${product.colorName}</span>
                </div>
                <div class="flex items-center gap-2.5">
                  ${pdpSiblings.map(v => `
                    <button 
                      type="button" 
                      onclick="navigateToView('pdp', { productId: '${v.id}' })"
                      class="flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${v.id === product.id ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white shadow-sm' : 'border-[var(--border-strong)] bg-white text-[var(--navy-deep)] hover:border-[var(--wine-primary)]'}"
                      title="${v.colorName} — ${v.title}"
                    >
                      <span class="w-3.5 h-3.5 rounded-full border border-black/20" style="background-color: ${v.colorHex || '#1C2541'};"></span>
                      <span>${v.colorName}</span>
                    </button>
                  `).join('')}
                </div>
              </div>
            `;
          })()}

          <div class="p-4 bg-[var(--bg-silk)] border border-[var(--border-gold)] text-xs text-[var(--navy-primary)] space-y-2">
            <div class="flex items-center gap-2 font-semibold text-[var(--navy-deep)]">
              <svg class="w-4 h-4 text-[var(--champagne-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              <span>Double-Inspected in London & Dubai Protocol Hubs</span>
            </div>
            <p class="text-xs text-[var(--navy-slate)]">Direct dispatch timeframe: <strong>${product.dispatchTime}</strong>.</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs uppercase font-bold tracking-wider text-[var(--navy-deep)]">Select Atelier Sizing:</span>
              <div class="flex items-center gap-2 text-xs">
                <button onclick="setPdpSizeUnit('UK')" class="px-2 py-0.5 font-bold ${currentUnit === 'UK' ? 'text-[var(--wine-primary)] border-b-2 border-[var(--wine-primary)]' : 'text-[var(--navy-muted)]'}">UK</button>
                <button onclick="setPdpSizeUnit('EU')" class="px-2 py-0.5 font-bold ${currentUnit === 'EU' ? 'text-[var(--wine-primary)] border-b-2 border-[var(--wine-primary)]' : 'text-[var(--navy-muted)]'}">EU</button>
                <button onclick="setPdpSizeUnit('US')" class="px-2 py-0.5 font-bold ${currentUnit === 'US' ? 'text-[var(--wine-primary)] border-b-2 border-[var(--wine-primary)]' : 'text-[var(--navy-muted)]'}">US</button>
                <span class="text-white/20">|</span>
                <button onclick="openSizeConciergeModal()" class="text-[var(--champagne-gold)] hover:underline flex items-center gap-1 font-semibold">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Size Concierge
                </button>
              </div>
            </div>

            <div class="grid grid-cols-4 gap-2">
              ${currentSizes.map(sz => `
                <button onclick="setPdpSelectedSize('${sz}')" class="py-2.5 text-xs font-semibold border ${APP_STATE.activePdpSelectedSize === sz ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white' : 'border-[var(--border-strong)] text-[var(--navy-deep)] hover:border-[var(--wine-primary)]'} transition-all">
                  ${sz}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <button onclick="addToCartFromPDP('${product.id}')" class="btn-wine w-full py-4 text-sm tracking-widest font-semibold flex items-center justify-center gap-2">
              <span>Add To Shopping Bag &bull; ${convertPrice(product.basePrice)}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>

            <button onclick="reserveViaConcierge('${product.id}')" class="w-full py-3.5 text-xs uppercase tracking-widest font-semibold text-[var(--navy-deep)] border border-[var(--champagne-gold)] hover:bg-[var(--champagne-light)] transition-all flex items-center justify-center gap-2">
              <svg class="w-4 h-4 text-[var(--champagne-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              <span>Reserve via Private Concierge</span>
            </button>
          </div>

          <div class="border-t border-[var(--border-light)] pt-4 space-y-3 text-xs">
            <details class="group border-b border-[var(--border-light)] pb-3 cursor-pointer" open>
              <summary class="flex justify-between items-center font-serif text-base text-[var(--navy-deep)] font-semibold list-none">
                <span>Material & Fabric Composition</span>
                <span class="group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p class="text-[var(--navy-slate)] pt-2 leading-relaxed font-light">
                ${product.details.composition}
              </p>
            </details>

            <details class="group border-b border-[var(--border-light)] pb-3 cursor-pointer">
              <summary class="flex justify-between items-center font-serif text-base text-[var(--navy-deep)] font-semibold list-none">
                <span>Atelier Craftsmanship & Provenance</span>
                <span class="group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p class="text-[var(--navy-slate)] pt-2 leading-relaxed font-light">
                ${product.details.craftsmanship}
              </p>
            </details>

            <details class="group border-b border-[var(--border-light)] pb-3 cursor-pointer">
              <summary class="flex justify-between items-center font-serif text-base text-[var(--navy-deep)] font-semibold list-none">
                <span>Complimentary Escrow & White-Glove Returns</span>
                <span class="group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p class="text-[var(--navy-slate)] pt-2 leading-relaxed font-light">
                ${product.details.escrowGuarantee} Includes tamper-evident sealing and diplomatic return handling across UK, UAE, and Pakistan.
              </p>
            </details>
          </div>

        </div>

      </div>
    </div>
  `;
}

function setPdpImageIndex(idx) {
  APP_STATE.activePdpMainImageIndex = idx;
  const product = PRODUCTS.find(p => p.id === APP_STATE.activeProductId) || PRODUCTS[0];
  const mainImg = document.getElementById('pdpMainImg');
  if (mainImg) mainImg.src = product.gallery[idx];
  renderPDP(product.id);
}

function setPdpSizeUnit(unit) {
  APP_STATE.activePdpSizeUnit = unit;
  renderPDP(APP_STATE.activeProductId);
}

function setPdpSelectedSize(sz) {
  APP_STATE.activePdpSelectedSize = sz;
  renderPDP(APP_STATE.activeProductId);
}

function addToCartFromPDP(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const currentUnit = APP_STATE.activePdpSizeUnit;
  const currentSizes = product.sizes[currentUnit] || product.sizes['UK'];
  const size = APP_STATE.activePdpSelectedSize || currentSizes[0];

  const existing = cart.find(item => item.product.id === productId && item.selectedSize === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product,
      selectedSize: size,
      quantity: 1
    });
  }

  updateCartUI();
  toggleCart(true);
  showToast(`Added "${product.title}" (${size}) to your shopping bag.`);
}

function reserveViaConcierge(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  showToast(`VIP Concierge reservation initiated for "${product ? product.title : 'piece'}". Our London/Dubai salon desk will contact you.`);
}

// =============================================================================
// 9. VIEW 5: CART SLIDE-OVER DRAWER
// =============================================================================
function toggleCart(open = true) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (!drawer || !backdrop) return;

  if (open) {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cartCountBadge');
  if (badge) {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shippingFill = document.getElementById('shippingProgressFill');
  const shippingText = document.getElementById('shippingProgressText');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-20 text-center">
        <svg class="w-12 h-12 mx-auto text-[var(--navy-muted)] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
        <p class="font-serif text-xl text-[var(--navy-deep)] mb-1">Your Shopping Bag is Empty</p>
        <p class="text-xs text-[var(--navy-slate)] max-w-xs mx-auto">Explore authenticated atelier collections to reserve your rare garments and leather objects.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = convertPrice(0);
    if (shippingFill) shippingFill.style.width = '0%';
    if (shippingText) shippingText.innerHTML = `Add items to qualify for free white-glove concierge delivery.`;
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item-row">
      <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-img cursor-pointer" onclick="navigateToView('pdp', { productId: '${item.product.id}' }); toggleCart(false);" />
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start">
            <span class="text-[10px] uppercase font-bold tracking-widest text-[var(--navy-slate)]">${item.product.brand}</span>
            <button onclick="removeFromCart(${index})" class="text-[var(--navy-muted)] hover:text-[var(--wine-primary)] text-sm">✕</button>
          </div>
          <h4 class="font-serif text-sm text-[var(--navy-deep)] leading-tight mt-0.5 line-clamp-1 cursor-pointer" onclick="navigateToView('pdp', { productId: '${item.product.id}' }); toggleCart(false);">${item.product.title}</h4>
          <div class="text-[11px] text-[var(--champagne-gold)] font-medium mt-1">Size: ${item.selectedSize}</div>
        </div>

        <div class="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border-light)]">
          <div class="flex items-center border border-[var(--border-strong)]">
            <button onclick="changeQuantity(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-xs hover:bg-[var(--bg-silk)]">-</button>
            <span class="w-7 text-center text-xs font-semibold">${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-xs hover:bg-[var(--bg-silk)]">+</button>
          </div>
          <div class="text-sm font-semibold text-[var(--navy-deep)]">
            ${convertPrice(item.product.basePrice * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const baseSubtotal = cart.reduce((sum, item) => sum + (item.product.basePrice * item.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = convertPrice(baseSubtotal);

  const cfg = CURRENCY_CONFIG[currentCurrency];
  const convertedSubtotal = baseSubtotal * cfg.rate;
  const progressPct = Math.min(100, Math.round((convertedSubtotal / cfg.freeThreshold) * 100));

  if (shippingFill) shippingFill.style.width = `${progressPct}%`;
  if (shippingText) {
    if (progressPct >= 100) {
      shippingText.innerHTML = `<span class="text-emerald-700 font-semibold">✓ Order qualifies for White-Glove Atelier Escrow & Concierge Delivery.</span>`;
    } else {
      const remaining = cfg.freeThreshold - convertedSubtotal;
      shippingText.innerHTML = `Add <strong>${cfg.format(remaining)}</strong> more to unlock <strong>Complimentary Concierge Air Dispatch</strong>.`;
    }
  }
}

function quickAddToCart(productId, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const size = product.sizes['UK'][0];
  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product,
      selectedSize: size,
      quantity: 1
    });
  }

  updateCartUI();
  toggleCart(true);
  showToast(`Added "${product.title}" to shopping bag.`);
}

function changeQuantity(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    const title = cart[index].product.title;
    cart.splice(index, 1);
    updateCartUI();
    showToast(`Removed "${title}" from shopping bag.`);
  }
}

function proceedToCheckoutFromCart() {
  toggleCart(false);
  navigateToView('checkout');
}

// =============================================================================
// 10. VIEW 6: MULTI-STEP LUXURY CHECKOUT CONTROLLER
// =============================================================================
function renderCheckout() {
  const container = document.getElementById('view-checkout');
  if (!container) return;

  const baseSubtotal = cart.reduce((sum, item) => sum + (item.product.basePrice * item.quantity), 0);
  const cfg = CURRENCY_CONFIG[currentCurrency];
  const isFreeShipping = (baseSubtotal * cfg.rate) >= cfg.freeThreshold;
  const shippingCost = isFreeShipping ? 0 : cfg.shippingFee;
  const grandTotal = (baseSubtotal * cfg.rate) + shippingCost;

  container.innerHTML = `
    <div class="py-8 bg-[var(--navy-topbar)] text-white border-b border-[var(--border-gold-glass)]">
      <div class="container-luxury flex items-center justify-between">
        <a href="#home" onclick="navigateToView('homepage'); event.preventDefault();" class="brand-logo-text text-2xl font-light">
          AYIIN
        </a>
        <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--champagne-gold)]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
          <span>Bonded Escrow Protected Checkout</span>
        </div>
      </div>
    </div>

    <!-- Step Progress Indicator -->
    <div class="bg-[var(--bg-silk)] border-b border-[var(--border-light)] py-4">
      <div class="container-luxury max-w-4xl">
        <div class="flex items-center justify-between text-xs uppercase tracking-wider font-semibold">
          <div class="flex items-center gap-2 ${APP_STATE.checkoutStep >= 1 ? 'text-[var(--wine-primary)] font-bold' : 'text-[var(--navy-muted)]'}">
            <span class="w-6 h-6 rounded-full border flex items-center justify-center ${APP_STATE.checkoutStep >= 1 ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white' : 'border-[var(--border-strong)]'}">1</span>
            <span>Client ID</span>
          </div>
          <div class="w-12 h-[1px] bg-[var(--border-strong)]"></div>
          <div class="flex items-center gap-2 ${APP_STATE.checkoutStep >= 2 ? 'text-[var(--wine-primary)] font-bold' : 'text-[var(--navy-muted)]'}">
            <span class="w-6 h-6 rounded-full border flex items-center justify-center ${APP_STATE.checkoutStep >= 2 ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white' : 'border-[var(--border-strong)]'}">2</span>
            <span>Delivery</span>
          </div>
          <div class="w-12 h-[1px] bg-[var(--border-strong)]"></div>
          <div class="flex items-center gap-2 ${APP_STATE.checkoutStep >= 3 ? 'text-[var(--wine-primary)] font-bold' : 'text-[var(--navy-muted)]'}">
            <span class="w-6 h-6 rounded-full border flex items-center justify-center ${APP_STATE.checkoutStep >= 3 ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white' : 'border-[var(--border-strong)]'}">3</span>
            <span>Dispatch</span>
          </div>
          <div class="w-12 h-[1px] bg-[var(--border-strong)]"></div>
          <div class="flex items-center gap-2 ${APP_STATE.checkoutStep >= 4 ? 'text-[var(--wine-primary)] font-bold' : 'text-[var(--navy-muted)]'}">
            <span class="w-6 h-6 rounded-full border flex items-center justify-center ${APP_STATE.checkoutStep >= 4 ? 'border-[var(--wine-primary)] bg-[var(--wine-primary)] text-white' : 'border-[var(--border-strong)]'}">4</span>
            <span>Escrow Payment</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Checkout Body -->
    <div class="container-luxury max-w-5xl py-12">
      ${APP_STATE.checkoutStep === 5 ? `
        <div class="max-w-2xl mx-auto text-center bg-white p-10 border border-[var(--border-gold)] shadow-xl">
          <div class="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center mx-auto mb-6 text-emerald-700">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          
          <span class="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--champagne-gold)]">Escrow Reservation Confirmed</span>
          <h2 class="font-serif text-3xl sm:text-4xl text-[var(--navy-deep)] mt-2 mb-3">Your Curation Has Been Reserved.</h2>
          <p class="text-sm text-[var(--navy-slate)] leading-relaxed mb-6">
            Order Reference: <strong class="text-[var(--navy-deep)] font-mono">${APP_STATE.checkoutData.orderNumber}</strong>.<br />
            A confirmed bonded escrow ledger receipt has been transmitted to <strong>${APP_STATE.checkoutData.email || 'client@salon.com'}</strong>.
          </p>

          <div class="border-y border-[var(--border-light)] py-6 mb-8 text-left space-y-4">
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <div>
                <strong class="text-xs text-[var(--navy-deep)] uppercase tracking-wider block">Atelier Physical Verification</strong>
                <p class="text-xs text-[var(--navy-slate)]">Double-blind inspection begins at our London Mayfair / DIFC Dubai hub.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-[var(--champagne-gold)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <div>
                <strong class="text-xs text-[var(--navy-deep)] uppercase tracking-wider block">White-Glove Sealed Air Transit</strong>
                <p class="text-xs text-[var(--navy-slate)]">Customs duty diplomatic clearance and temperature-managed courier.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-[var(--navy-deep)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <div>
                <strong class="text-xs text-[var(--navy-deep)] uppercase tracking-wider block">Delivery & Escrow Release</strong>
                <p class="text-xs text-[var(--navy-slate)]">Funds released to designer atelier solely post-client inspection.</p>
              </div>
            </div>
          </div>

          <button onclick="resetAndReturnHome()" class="btn-wine w-full">Return to Collections</button>
        </div>
      ` : `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div class="lg:col-span-7 bg-white p-8 border border-[var(--border-light)] shadow-sm">
            
            ${APP_STATE.checkoutStep === 1 ? `
              <h3 class="font-serif text-2xl text-[var(--navy-deep)] mb-2">Step 1: Client Identification</h3>
              <p class="text-xs text-[var(--navy-slate)] mb-6">Guest checkout or Member Salon authentication.</p>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Private Email Address</label>
                  <input id="checkoutEmail" type="email" placeholder="patron@residence.com" value="${APP_STATE.checkoutData.email}" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none focus:border-[var(--wine-primary)]" />
                </div>
                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Regional Phone (For White-Glove Handover)</label>
                  <div class="flex">
                    <span class="p-3 bg-[var(--bg-silk)] border border-r-0 border-[var(--border-strong)] text-xs text-[var(--navy-slate)] font-semibold">${cfg.phonePrefix}</span>
                    <input id="checkoutPhone" type="tel" placeholder="7946 0912" value="${APP_STATE.checkoutData.phone}" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none focus:border-[var(--wine-primary)]" />
                  </div>
                </div>
              </div>

              <div class="mt-8 flex justify-end">
                <button onclick="advanceCheckoutStep(2)" class="btn-wine">Continue to Delivery Address →</button>
              </div>
            ` : ''}

            ${APP_STATE.checkoutStep === 2 ? `
              <h3 class="font-serif text-2xl text-[var(--navy-deep)] mb-2">Step 2: White-Glove Delivery Address</h3>
              <p class="text-xs text-[var(--navy-slate)] mb-6">Enter destination residence in UK, UAE, or Pakistan.</p>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Full Name</label>
                  <input id="checkoutName" type="text" placeholder="Lord / Lady / Connoisseur Name" value="${APP_STATE.checkoutData.fullName}" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none focus:border-[var(--wine-primary)]" />
                </div>
                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Destination Country</label>
                  <select id="checkoutCountry" onchange="handleCheckoutCountryChange(this.value)" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none">
                    <option value="United Kingdom" ${APP_STATE.checkoutData.country === 'United Kingdom' ? 'selected' : ''}>United Kingdom (London & Nationwide)</option>
                    <option value="United Arab Emirates" ${APP_STATE.checkoutData.country === 'United Arab Emirates' ? 'selected' : ''}>United Arab Emirates (Dubai, Abu Dhabi)</option>
                    <option value="Pakistan" ${APP_STATE.checkoutData.country === 'Pakistan' ? 'selected' : ''}>Pakistan (Islamabad, Lahore, Karachi)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Street Address & Villa / Apartment</label>
                  <input id="checkoutAddress" type="text" placeholder="18 Berkeley Square / Villa 42, Al Barari" value="${APP_STATE.checkoutData.addressLine1}" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none focus:border-[var(--wine-primary)]" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">City</label>
                    <input id="checkoutCity" type="text" placeholder="London / Dubai / Lahore" value="${APP_STATE.checkoutData.city}" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Postal / Zone Code</label>
                    <input id="checkoutPostal" type="text" placeholder="W1J 6BQ / 00000" value="${APP_STATE.checkoutData.postalCode}" class="w-full p-3 border border-[var(--border-strong)] text-sm focus:outline-none" />
                  </div>
                </div>
              </div>

              <div class="mt-8 flex justify-between">
                <button onclick="advanceCheckoutStep(1)" class="text-xs uppercase tracking-wider font-semibold text-[var(--navy-slate)] hover:underline">← Back</button>
                <button onclick="advanceCheckoutStep(3)" class="btn-wine">Continue to Delivery Method →</button>
              </div>
            ` : ''}

            ${APP_STATE.checkoutStep === 3 ? `
              <h3 class="font-serif text-2xl text-[var(--navy-deep)] mb-2">Step 3: Atelier Dispatch Protocol</h3>
              <p class="text-xs text-[var(--navy-slate)] mb-6">Select your preferred courier handling.</p>

              <div class="space-y-4">
                <label class="flex items-start gap-4 p-4 border ${APP_STATE.checkoutData.deliveryMethod === 'white-glove-air' ? 'border-[var(--wine-primary)] bg-[var(--bg-silk)]' : 'border-[var(--border-light)]'} cursor-pointer">
                  <input type="radio" name="deliveryMethod" value="white-glove-air" checked onchange="APP_STATE.checkoutData.deliveryMethod = this.value" class="mt-1 accent-[var(--wine-primary)]" />
                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <strong class="text-sm text-[var(--navy-deep)]">Complimentary Atelier Air Dispatch</strong>
                      <span class="text-xs font-semibold text-emerald-700">${isFreeShipping ? 'FREE' : cfg.format(cfg.shippingFee)}</span>
                    </div>
                    <p class="text-xs text-[var(--navy-slate)] mt-1">2-4 business days. Temperature-managed aircraft container with tamper-evident seal and signature requirement.</p>
                  </div>
                </label>

                <label class="flex items-start gap-4 p-4 border border-[var(--border-light)] cursor-pointer hover:border-[var(--champagne-gold)]">
                  <input type="radio" name="deliveryMethod" value="vault-armored" onchange="APP_STATE.checkoutData.deliveryMethod = this.value" class="mt-1 accent-[var(--wine-primary)]" />
                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <strong class="text-sm text-[var(--navy-deep)]">Armored Concierge Vault Delivery</strong>
                      <span class="text-xs font-semibold text-[var(--navy-deep)]">+ ${cfg.format(cfg.shippingFee * 2.5)}</span>
                    </div>
                    <p class="text-xs text-[var(--navy-slate)] mt-1">Dedicated security courier with verified ID inspection and white-glove unboxing at your residence.</p>
                  </div>
                </label>
              </div>

              <div class="mt-8 flex justify-between">
                <button onclick="advanceCheckoutStep(2)" class="text-xs uppercase tracking-wider font-semibold text-[var(--navy-slate)] hover:underline">← Back</button>
                <button onclick="advanceCheckoutStep(4)" class="btn-wine">Continue to Escrow Payment →</button>
              </div>
            ` : ''}

            ${APP_STATE.checkoutStep === 4 ? `
              <h3 class="font-serif text-2xl text-[var(--navy-deep)] mb-2">Step 4: Bonded Escrow Payment</h3>
              <p class="text-xs text-[var(--navy-slate)] mb-6">Payment is held safely in escrow until you approve the pieces upon delivery.</p>

              <div class="space-y-4 mb-6">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button type="button" onclick="setPaymentMethod('card')" class="p-3 text-xs font-semibold border ${APP_STATE.checkoutData.paymentMethod === 'card' ? 'border-[var(--wine-primary)] bg-[var(--bg-silk)] text-[var(--wine-primary)]' : 'border-[var(--border-strong)]'}">Credit / Debit</button>
                  <button type="button" onclick="setPaymentMethod('applepay')" class="p-3 text-xs font-semibold border ${APP_STATE.checkoutData.paymentMethod === 'applepay' ? 'border-[var(--wine-primary)] bg-[var(--bg-silk)] text-[var(--wine-primary)]' : 'border-[var(--border-strong)]'}">Apple Pay</button>
                  <button type="button" onclick="setPaymentMethod('tabby')" class="p-3 text-xs font-semibold border ${APP_STATE.checkoutData.paymentMethod === 'tabby' ? 'border-[var(--wine-primary)] bg-[var(--bg-silk)] text-[var(--wine-primary)]' : 'border-[var(--border-strong)]'}">Tabby 4x</button>
                  <button type="button" onclick="setPaymentMethod('wire')" class="p-3 text-xs font-semibold border ${APP_STATE.checkoutData.paymentMethod === 'wire' ? 'border-[var(--wine-primary)] bg-[var(--bg-silk)] text-[var(--wine-primary)]' : 'border-[var(--border-strong)]'}">Bank Wire</button>
                </div>

                <div class="p-4 bg-[var(--bg-silk)] border border-[var(--border-light)] space-y-3">
                  <div>
                    <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Encrypted Card Number</label>
                    <input type="text" placeholder="•••• •••• •••• 4242" class="w-full p-2.5 bg-white border border-[var(--border-strong)] text-sm focus:outline-none" />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">Expiry</label>
                      <input type="text" placeholder="MM / YY" class="w-full p-2.5 bg-white border border-[var(--border-strong)] text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label class="block text-xs uppercase tracking-wider font-semibold text-[var(--navy-deep)] mb-1">CVC / CVV</label>
                      <input type="text" placeholder="•••" class="w-full p-2.5 bg-white border border-[var(--border-strong)] text-sm focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-6">
                <svg class="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span>Sovereign Escrow Hold: The atelier cannot withdraw funds until you sign for the sealed package.</span>
              </div>

              <div class="flex justify-between items-center">
                <button onclick="advanceCheckoutStep(3)" class="text-xs uppercase tracking-wider font-semibold text-[var(--navy-slate)] hover:underline">← Back</button>
                <button onclick="completeCheckoutOrder()" class="btn-wine py-4 text-sm font-semibold tracking-widest flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>Authorize & Place Escrow Order (${cfg.format(grandTotal)})</span>
                </button>
              </div>
            ` : ''}

          </div>

          <div class="lg:col-span-5 sticky top-28 bg-[var(--bg-silk-card)] p-6 border border-[var(--border-light)] space-y-6">
            <h4 class="font-serif text-xl text-[var(--navy-deep)] border-b border-[var(--border-light)] pb-3">Order Summary (${cart.length} Objects)</h4>

            <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
              ${cart.map(item => `
                <div class="flex gap-3 text-xs pb-3 border-b border-[var(--border-light)]">
                  <img src="${item.product.image}" alt="${item.product.title}" class="w-14 h-18 object-cover border border-[var(--border-light)]" />
                  <div class="flex-1">
                    <span class="text-[10px] uppercase font-bold text-[var(--navy-slate)]">${item.product.brand}</span>
                    <h5 class="font-serif text-sm text-[var(--navy-deep)] line-clamp-1">${item.product.title}</h5>
                    <div class="text-[11px] text-[var(--champagne-gold)]">Size: ${item.selectedSize} &bull; Qty: ${item.quantity}</div>
                    <div class="font-semibold text-[var(--navy-deep)] mt-1">${convertPrice(item.product.basePrice * item.quantity)}</div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="space-y-2 text-xs text-[var(--navy-primary)] pt-2">
              <div class="flex justify-between">
                <span class="text-[var(--navy-muted)]">Atelier Subtotal</span>
                <span class="font-semibold">${convertPrice(baseSubtotal)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--navy-muted)]">White-Glove Air Dispatch</span>
                <span class="font-semibold text-emerald-700">${isFreeShipping ? 'COMPLIMENTARY' : cfg.format(shippingCost)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--navy-muted)]">Diplomatic Duty & Escrow Fee</span>
                <span class="font-semibold">INCLUDED</span>
              </div>
              <div class="flex justify-between text-base font-bold text-[var(--navy-deep)] pt-3 border-t border-[var(--border-strong)]">
                <span>Escrow Total</span>
                <span class="font-serif text-2xl text-[var(--wine-primary)]">${cfg.format(grandTotal)}</span>
              </div>
            </div>
          </div>

        </div>
      `}
    </div>
  `;
}

function advanceCheckoutStep(step) {
  const email = document.getElementById('checkoutEmail');
  const phone = document.getElementById('checkoutPhone');
  const name = document.getElementById('checkoutName');
  const addr = document.getElementById('checkoutAddress');
  const city = document.getElementById('checkoutCity');

  if (email) APP_STATE.checkoutData.email = email.value;
  if (phone) APP_STATE.checkoutData.phone = phone.value;
  if (name) APP_STATE.checkoutData.fullName = name.value;
  if (addr) APP_STATE.checkoutData.addressLine1 = addr.value;
  if (city) APP_STATE.checkoutData.city = city.value;

  APP_STATE.checkoutStep = step;
  renderCheckout();
  window.scrollTo({ top: 120, behavior: 'smooth' });
}

function handleCheckoutCountryChange(country) {
  APP_STATE.checkoutData.country = country;
}

function setPaymentMethod(method) {
  APP_STATE.checkoutData.paymentMethod = method;
  renderCheckout();
}

function completeCheckoutOrder() {
  APP_STATE.checkoutStep = 5;
  APP_STATE.checkoutData.orderNumber = `AYIIN-${currentCurrency}-${Math.floor(10000 + Math.random() * 90000)}`;
  cart = [];
  updateCartUI();
  renderCheckout();
  showToast(`Escrow order authorized successfully. Ref: ${APP_STATE.checkoutData.orderNumber}`);
}

function resetAndReturnHome() {
  APP_STATE.checkoutStep = 1;
  navigateToView('homepage');
}

// =============================================================================
// 11. SIZE CONCIERGE & MODALS
// =============================================================================
function openSizeConciergeModal() {
  const modal = document.getElementById('sizeConciergeModal');
  const backdrop = document.getElementById('modalBackdrop');
  if (modal && backdrop) {
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeSizeConciergeModal() {
  const modal = document.getElementById('sizeConciergeModal');
  const backdrop = document.getElementById('modalBackdrop');
  if (modal && backdrop) {
    modal.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function applyConciergeSize(size) {
  APP_STATE.activePdpSelectedSize = size;
  closeSizeConciergeModal();
  renderPDP(APP_STATE.activeProductId);
  showToast(`Concierge recommendation applied: ${size}`);
}

function openAtelierTrustModal(productId, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const atelier = ATELIERS[product.atelierId] || ATELIERS['sana-safinaz'];
  const modal = document.getElementById('atelierModal');
  const content = document.getElementById('atelierModalContent');
  const backdrop = document.getElementById('modalBackdrop');

  if (content) {
    content.innerHTML = `
      <div class="p-6 md:p-10">
        <div class="flex items-center justify-between border-b border-[var(--border-light)] pb-5 mb-6">
          <div>
            <span class="text-[10px] tracking-widest uppercase text-[var(--champagne-gold)] font-bold">Ayiin Platform Governance & Trust</span>
            <h3 class="font-serif text-2xl md:text-3xl text-[var(--navy-deep)] mt-1">${atelier.name}</h3>
            <p class="text-xs text-[var(--navy-slate)] mt-0.5">Atelier Origin: ${atelier.origin}</p>
          </div>
          <div class="text-right">
            <div class="text-2xl md:text-3xl font-serif text-emerald-600 font-bold">${atelier.trustScore}</div>
            <div class="text-[10px] uppercase tracking-wider text-[var(--navy-muted)]">Verified Trust Score</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="p-4 bg-[var(--bg-silk)] border border-[var(--border-light)]">
            <div class="text-xs font-semibold text-[var(--navy-deep)] uppercase tracking-wider mb-1">Double Inspection</div>
            <p class="text-xs text-[var(--navy-slate)]">Item physically examined at ${product.inspectedAt} before final client sealing.</p>
          </div>
          <div class="p-4 bg-[var(--bg-silk)] border border-[var(--border-light)]">
            <div class="text-xs font-semibold text-[var(--navy-deep)] uppercase tracking-wider mb-1">Escrow Guarantee</div>
            <p class="text-xs text-[var(--navy-slate)]">Buyer payment is secured in sovereign escrow until delivery approval in UK, UAE or PK.</p>
          </div>
          <div class="p-4 bg-[var(--bg-silk)] border border-[var(--border-light)]">
            <div class="text-xs font-semibold text-[var(--navy-deep)] uppercase tracking-wider mb-1">Direct Atelier Consignment</div>
            <p class="text-xs text-[var(--navy-slate)]">Zero secondary brokers or unverified distributors.</p>
          </div>
        </div>

        <div class="space-y-3 mb-8">
          <div class="flex justify-between items-center text-xs">
            <span class="text-[var(--navy-slate)]">Material & Fiber Authenticity</span>
            <span class="font-semibold text-[var(--navy-deep)]">100% Guaranteed</span>
          </div>
          <div class="w-full bg-[var(--navy-ultra-light)] h-2 rounded-full overflow-hidden">
            <div class="bg-[var(--wine-primary)] h-full w-[100%]"></div>
          </div>

          <div class="flex justify-between items-center text-xs">
            <span class="text-[var(--navy-slate)]">On-Time Dispatch Rate (${atelier.origin})</span>
            <span class="font-semibold text-[var(--navy-deep)]">${atelier.dispatchRate}</span>
          </div>
          <div class="w-full bg-[var(--navy-ultra-light)] h-2 rounded-full overflow-hidden">
            <div class="bg-[var(--champagne-gold)] h-full w-[99.8%]"></div>
          </div>
        </div>

        <div class="bg-[var(--navy-deep)] text-white p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 class="font-serif text-lg text-white">The Ayiin Authenticity Seal</h4>
            <p class="text-xs text-white/70">Each order ships with an NFC-embedded tamper-evident tamper proof seal and hand-signed provenance certificate.</p>
          </div>
          <button class="btn-wine bg-white text-[var(--navy-deep)] hover:bg-[var(--champagne-light)] border-white whitespace-nowrap" onclick="closeAllModals()">
            Acknowledge & Close
          </button>
        </div>
      </div>
    `;
  }

  if (modal && backdrop) {
    modal.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  closeSearch();
  document.querySelectorAll('.luxury-modal').forEach(m => m.classList.remove('active'));
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  const mobileNav = document.getElementById('mobileNavDrawer');
  if (mobileNav) mobileNav.classList.remove('active');
  closeHeroSearchDropdown();
  document.body.style.overflow = '';
}

// =============================================================================
// 12. CURRENCY & WISHLIST & GLOBAL LISTENERS
// =============================================================================
function handleCurrencyChange(newCurrency) {
  currentCurrency = newCurrency;
  const select = document.getElementById('currencySelector');
  const selectMobile = document.getElementById('currencySelectorMobile');
  if (select) select.value = newCurrency;
  if (selectMobile) selectMobile.value = newCurrency;

  const annShipping = document.getElementById('announcementShipping');
  if (annShipping) {
    const cfg = CURRENCY_CONFIG[currentCurrency];
    annShipping.innerHTML = `Complimentary White-Glove Atelier Delivery on orders above <strong>${cfg.format(cfg.freeThreshold)}</strong> & Escrow Protection`;
  }

  if (APP_STATE.activeView === 'homepage') {
    renderHomepageDominatingBrands();
    renderHomepageCurationGrid();
  }
  if (APP_STATE.activeView === 'atelier') renderBrandPanel(APP_STATE.activeAtelierId);
  if (APP_STATE.activeView === 'plp') renderPLP();
  if (APP_STATE.activeView === 'pdp') renderPDP(APP_STATE.activeProductId);
  if (APP_STATE.activeView === 'checkout') renderCheckout();
  updateCartUI();

  showToast(`Currency updated to ${CURRENCY_CONFIG[currentCurrency].label}`);
}

function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    showToast(`Removed from Private Wishlist.`);
  } else {
    wishlist.add(productId);
    showToast(`Saved "${product.title}" to Private Wishlist.`);
  }

  updateWishlistBadges();
  document.querySelectorAll(`.product-card[data-id="${productId}"] .wishlist-btn-card`).forEach(btn => {
    btn.classList.toggle('active', wishlist.has(productId));
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', wishlist.has(productId) ? 'currentColor' : 'none');
  });
}

function updateWishlistBadges() {
  const badge = document.getElementById('wishlistCountBadge');
  if (badge) {
    badge.textContent = wishlist.size;
    badge.style.display = wishlist.size > 0 ? 'flex' : 'none';
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'luxury-toast';
  toast.innerHTML = `
    <svg class="w-4 h-4 text-[var(--champagne-gold)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      if (input) input.focus();
    }, 80);
  }
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (overlay) overlay.classList.remove('active');
  if (input) input.value = '';
  if (results) {
    results.innerHTML = '';
    results.classList.add('hidden');
  }
}

function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (overlay && overlay.classList.contains('active')) {
    closeSearch();
  } else {
    openSearch();
  }
}

function handleSearchInput(e) {
  const q = e.target.value.trim().toLowerCase();
  const results = document.getElementById('searchResults');
  if (!results) return;

  if (!q) {
    results.innerHTML = '';
    results.classList.add('hidden');
    return;
  }

  results.classList.remove('hidden');

  const matches = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subCategory.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    results.innerHTML = `
      <div class="py-6 text-center">
        <div class="text-white text-base font-serif mb-1">No curations found matching "${q}".</div>
        <p class="text-white/60 text-xs">Try searching by atelier (Sana Safinaz, LAMA, Baroque, Breakout) or category (Leather, Silks, Footwear, Bags).</p>
      </div>
    `;
    return;
  }

  results.innerHTML = `
    <div class="flex items-center justify-between text-xs text-white/70 pb-3 border-b border-white/10 mb-4">
      <span class="uppercase tracking-wider">Found <strong>${matches.length}</strong> Authenticated Curations</span>
      <span class="text-[var(--champagne-gold)] uppercase tracking-wider text-[11px]">100% Escrow Protected</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${matches.slice(0, 8).map(m => `
        <div class="search-result-card group" onclick="navigateToView('pdp', { productId: '${m.id}' }); closeSearch();">
          <div class="relative overflow-hidden bg-[var(--bg-silk)] aspect-[3/4] mb-2.5 rounded-sm">
            <img src="${m.image}" alt="${m.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span class="absolute top-2 left-2 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 ${m.isOnSale ? 'bg-[var(--wine-primary)] text-white' : 'bg-white text-[var(--navy-deep)]'} border border-[var(--border-light)]">
              ${m.tag}
            </span>
          </div>
          <div class="flex items-center justify-between text-[11px] mb-1">
            <span class="uppercase tracking-wider font-bold text-[var(--wine-primary)]">${m.brand}</span>
            <span class="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 font-semibold">✓ ${m.trustScore}</span>
          </div>
          <h5 class="font-serif text-sm text-[var(--navy-deep)] line-clamp-1 group-hover:text-[var(--wine-primary)] transition-colors">${m.title}</h5>
          <div class="flex items-baseline justify-between mt-1.5 pt-1.5 border-t border-[var(--border-light)]">
            <span class="text-sm font-bold text-[var(--navy-deep)]">${convertPrice(m.basePrice)}</span>
            <span class="text-[10px] text-[var(--navy-slate)] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform font-semibold text-[var(--wine-primary)]">Inspect →</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function toggleMobileNav(open = true) {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('modalBackdrop');
  if (drawer && backdrop) {
    if (open) {
      drawer.classList.add('active');
      backdrop.classList.add('active');
    } else {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
    }
  }
}

function setupGlobalDOM() {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }
  });

  const modalBackdrop = document.getElementById('modalBackdrop');
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeAllModals);

  const searchOverlay = document.getElementById('searchOverlay');
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeAllModals();
      }
    });
  }

  const drawerBackdrop = document.getElementById('drawerBackdrop');
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => toggleCart(false));

  document.addEventListener('click', (e) => {
    const searchOverlay = document.getElementById('searchOverlay');
    const header = document.querySelector('.site-header');
    if (searchOverlay && searchOverlay.classList.contains('active')) {
      if (header && !header.contains(e.target)) {
        closeSearch();
      }
    }
    const searchWrapper = document.querySelector('.hero-search-first-wrapper');
    if (searchWrapper && !searchWrapper.contains(e.target)) {
      closeHeroSearchDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      toggleCart(false);
      closeHeroSearchDropdown();
    }
  });
}
