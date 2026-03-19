# CLAUDE.md — AI Assistant Guide for money-press

## CRITICAL — Do Not Misidentify Deployed Files

This is a **static HTML/JS/CSS storefront deployed on Vercel**. It is NOT a Next.js app.

The following files ARE the live production site — **do not delete, "clean up", or treat as contamination:**

- `index.html` — the deployed storefront
- `styles.css` — all site styling
- `script.js` — product catalog, cart, and checkout UI
- `api/checkout.js` — Stripe serverless checkout (Vercel function)
- `api/products.js` — product catalog API (Vercel function)
- `api/fulfill.js` — CJ fulfillment webhook (Vercel function)
- `lib/products.js` — canonical product data (single source of truth)
- `vercel.json` — deployment configuration (static site, no build step)
- `hero-bg.jpg`, `og-image.svg` — production images

The old Next.js scaffold (`src/`, `next.config.ts`, `tsconfig.json`) was intentionally removed from `main` and replaced with this static architecture. Do not recreate it.

## Canonical Location & Repository Isolation

- **Canonical local path:** `/Users/danielgrelli/Projects/new-money-press`
- **GitHub remote:** `https://github.com/dredog366/money-press.git` (branch: `main`)
- **Vercel deploys from:** `dredog366/money-press` → `main` branch

This is the **only** copy that should be edited. Do not create worktrees, clone to other directories, or mix code from sibling projects (`sweattees-shopify`, `real-estate-study-app`). Stale duplicates and worktrees were archived on 2026-03-16 — see `/Users/danielgrelli/Projects/cleanup-report.md` for details.

## Project Overview

**money-press** is the repository for **FaceTea Shop** — a dropshipping storefront selling tea-infused skincare products. The site is a fully functional e-commerce platform with Stripe checkout integration and CJ Dropshipping fulfillment.

## Current Repository State

```
money-press/
├── .git/
├── api/
│   ├── checkout.js         # Stripe Checkout API endpoint
│   └── products.js         # Product catalog API endpoint
├── lib/
│   └── products.js         # Single source of truth for product data
├── scripts/
│   └── fill-cj-mapping.js  # CJ Dropshipping catalog mapper
├── index.html              # Main storefront page
├── script.js               # Frontend JavaScript (cart, checkout, UI)
├── styles.css              # Site styles
├── success.html            # Order confirmation page
├── cancel.html             # Checkout cancelled page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── hero-bg.jpg             # Hero background image
├── vercel.json             # Vercel deployment config
├── package.json            # Node.js dependencies
├── .env.example            # Environment variables template
├── README.md               # Project documentation
└── CLAUDE.md               # This file
```

## Tech Stack

- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework)
- **Backend:** Node.js (serverless functions on Vercel)
- **Payment Processing:** Stripe Checkout
- **Dropshipping:** CJ Dropshipping API integration
- **Hosting:** Vercel
- **Domain:** https://facetea.org
- **Runtime:** Node.js 18.17+

## Product Catalog

The store sells **13 tea-infused skincare products** for women's faces:

**Serums:**

- Green Tea Brightening Serum ($24.99)
- Centella & Green Tea Hydrating Serum ($29.99)

**Cleansers:**

- Chamomile Calming Face Wash ($14.99)

**Treatments:**

- White Tea Eye Cream ($34.99)
- Rooibos Repair Night Oil ($39.99)
- Hydrocolloid Pimple Patches ($9.99)

**Moisturisers:**

- Oolong Hydrating Day Cream ($29.99)

**Toners:**

- Black Tea Firming Toner ($19.99)

**Masks:**

- Matcha Detox Clay Mask ($22.99)

**Exfoliants:**

- Hibiscus AHA Exfoliating Pads ($27.99)

**Tools:**

- Jade Gua Sha & Roller Set ($24.99)
- Ice Roller Facial Depuffer ($18.99)
- LED Light Therapy Wand ($59.99)

**Product Data Architecture:**

- Single source of truth: `lib/products.js` (prices in cents)
- API endpoint: `/api/products` (prices in dollars)
- Frontend: Fetches from `/api/products` on page load
- Checkout: Server-side price validation via `lib/products.js`

## Development Setup

```bash
# Install dependencies
npm install

# Run locally (requires Vercel CLI)
vercel dev

# Or serve statically (no API functions)
npx http-server -p 3000
```

## Environment Variables

Create `.env.local` in the project root:

```bash
# Stripe (required for checkout)
STRIPE_SECRET_KEY=sk_test_...  # or sk_live_... for production

# CJ Dropshipping (optional, for product mapping)
CJ_API_KEY=...
CJ_ACCESS_TOKEN=...
```

## Scripts

```bash
# Fill CJ product mappings (dry run)
npm run fill-cj-mapping

# Fill CJ product mappings (write to lib/products.js)
npm run fill-cj-mapping -- --write
```

## Key Features

**Checkout Flow:**

1. User adds products to cart (stored in localStorage)
2. User clicks "Checkout" → POST /api/checkout
3. Server validates prices against `lib/products.js`
4. Server creates Stripe Checkout session
5. User redirected to Stripe payment page
6. On success → /success.html
7. On cancel → /cancel.html

**Shipping Logic:**

- Orders $50+ → FREE shipping (7-14 business days)
- Orders under $50 → $4.99 standard (7-14 days) or $7.99 expedited (3-5 days)
- Ships to contiguous US only

**Product Data Flow:**

- Products defined in `lib/products.js` (Node.js module)
- Exported via `/api/products` API endpoint
- Frontend fetches on page load via `loadProducts()`
- No fallback data — fails gracefully with error message if API unavailable

## CJ Dropshipping Integration

**Status:** Products defined, but CJ IDs not yet mapped

All 13 products have `cjVid: null` and `cjSku: null`. To map them:

```bash
# Set CJ credentials
export CJ_API_KEY="your-api-key"

# Run mapping script (dry run)
node scripts/fill-cj-mapping.js

# Write mappings back to lib/products.js
node scripts/fill-cj-mapping.js --write
```

The script searches CJ's catalog by product name and populates `cjVid`/`cjSku` fields.

## Deployment

The site is deployed on Vercel:

```bash
# Deploy to production
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

**Pre-deployment checklist:**

1. Set `STRIPE_SECRET_KEY` in Vercel dashboard
2. Verify all products have valid CJ mappings
3. Test checkout flow in Stripe test mode
4. Switch to live Stripe keys when ready

## Code Conventions

### General

- Keep codebase minimal — no frameworks, no build step
- Single source of truth for product data: `lib/products.js`
- Validate user input at API boundaries (checkout.js)
- Never commit `.env` or `.env.local`

### Security

- All Stripe operations server-side
- Client never sees Stripe secret key
- Price validation server-side (prevent tampering)
- HTTPS required (enforced by Vercel)

### Product Updates

**IMPORTANT:** Only edit products in `lib/products.js`. The frontend automatically fetches from `/api/products`. Do not duplicate product data in `script.js`.

## Updating This File

Keep this file current as the project evolves. Update it after:

- Adding/removing products
- Changing API endpoints
- Modifying deployment workflow
- Updating environment variables
- Changing tech stack

---

**Last Updated:** 2026-03-16
**Current Branch:** `main`
