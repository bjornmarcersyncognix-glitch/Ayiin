# AYIIN — International Verified Luxury Fashion Marketplace Platform
### Preview Edition: UK • UAE • Pakistan

A world-class, responsive, high-fidelity luxury eCommerce frontend crafted for **AYIIN** — an elevated multi-brand fashion marketplace portal comparable to Net-a-Porter, Farfetch, and SSENSE.

---

## 1. Brand Architecture & Positioning
- **Role**: Elevated curator and trust intermediary hosting double-vetted designer ateliers.
- **Target Audience**: Elite patrons and connoisseurs in **Mayfair & Kensington (UK)**, **DIFC & Downtown Dubai (UAE)**, and **Gulberg & Clifton (Pakistan)**.
- **Aesthetic**: Minimalist high visual restraint, generous negative space, refined serif typography, and rich tactile photography.
- **Strict Catalog Discipline**: Restricted strictly to 4 core disciplines:
  1. **Apparel & Prêt** (Haute raw silk capes, double-faced cashmere overcoats, tailored separates)
  2. **Structured Bags** (Architectural box calfskin satchels, suede evening clutches)
  3. **Artisanal Footwear** (Hand-welted velvet mules, sculptural Nappa leather boots)
  4. **Fine Belts & Leather** (Hand-engraved brass buckles, bridle leather, waist cinchers)

---

## 2. Strictly Enforced Color Palette
| Token | Hex Code | Purpose |
|---|---|---|
| **Crisp White** | `#FFFFFF` | Core surface clarity |
| **Warm Silk / Cream** | `#FAF7F2` & `#F3EFE6` | Editorial backgrounds & tactile separation |
| **Midnight Navy** | `#0B132B` & `#1C2541` | Deep structural anchoring, primary text & luxury footer |
| **Deep Wine / Maroon** | `#5E0B1B` (Hover: `#480814`) | Primary action CTAs & high-impact focal points |
| **Warm Champagne Gold** | `#C5A880` & `#EFE7DC` | Trust badges, credibility metrics, and fine borders |
| **Slate Navy** | `#5A6275` | Editorial subtitles, metadata, and secondary labels |

---

## 3. Interactive Features & State Machine
1. **Dynamic Multi-Currency Switcher**:
   - Seamless conversion between **GBP (£)**, **AED (د.إ)**, and **PKR (₨)**.
   - Dynamic real-time recalculation across the catalog grid, quick-view modal, and slide-over cart drawer.
   - Dynamic regional threshold messaging for complimentary white-glove delivery.
2. **Slide-Over Luxury Cart Drawer**:
   - Item quantity controls, subtotal computation, and animated threshold progress bar for white-glove concierge dispatch.
3. **Ayiin Atelier Verification Inspector**:
   - Interactive modal accessed by clicking any *"Verified [Score]"* badge.
   - Displays physical inspection hub provenance (Mayfair, London / DIFC, Dubai / Lahore Protocol Hub), bonded escrow terms, and low-dispute metrics (<0.04%).
4. **Quick View & Sizing Selector**:
   - Direct modal inspection with regional sizing options, full material specifications, and one-click bag reservation.
5. **Private Wishlist System**:
   - Micro-animated wishlist toggle with heart counter synchronization and feedback toasts.
6. **Full-Screen Luxury Search**:
   - Search filter across all verified ateliers, materials (e.g. *Raw Silk*, *Calfskin*, *Velvet*), and product categories.

---

## 4. File Structure
```
ayiin-luxury-marketplace/
├── index.html       # Complete semantic, accessible HTML5 homepage structure
├── styles.css       # Bespoke design tokens, typography, luxury transitions & responsive queries
├── app.js           # Interactive state machine (currencies, cart, modals, search, toasts)
└── README.md        # Architectural documentation and guide
```

---

## 5. How to View & Test
1. **Direct Browser Launch**: Double-click `index.html` or open it in any modern browser (Chrome, Edge, Safari, Firefox).
2. **Local Static Server**:
   ```bash
   npx serve .
   # or
   python -m http.server 8080
   ```
