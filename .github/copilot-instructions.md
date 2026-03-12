# Copilot Instructions for money-press (FaceTea Shop)

## Project Overview

**money-press** is the GitHub repo for **FaceTea Shop** (https://facetea.org) — a dropshipping storefront selling tea-infused skincare products. It uses vanilla HTML/CSS/JS on the frontend, Node.js serverless functions on Vercel for the API, Stripe Checkout for payments, and CJ Dropshipping for fulfillment.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (no framework)
- **Backend:** Node.js serverless functions in `api/` directory (Vercel)
- **Payments:** Stripe Checkout Sessions API
- **Fulfillment:** CJ Dropshipping API v2.0
- **Hosting:** Vercel (static + serverless, `framework: null`)
- **Domain:** https://facetea.org

## Key Files

| File | Purpose |
|------|---------|
| `lib/products.js` | Single source of truth — product data, prices in **cents** |
| `api/products.js` | `GET /api/products` — returns catalog with prices in dollars |
| `api/checkout.js` | `POST /api/checkout` — creates Stripe Checkout session |
| `api/fulfill.js` | `POST /api/fulfill` — places CJ order on successful Stripe payment |
| `scripts/fill-cj-mapping.js` | Resolves `cjVid`/`cjSku` from CJ catalog (run once with `--write`) |
| `scripts/restock-agent.js` | Monitors inventory via CJ API and alerts on low stock |
| `vercel.json` | Routes `/api/products` and `/api/checkout` to serverless functions |
| `script.js` | Frontend cart, product rendering, checkout flow |

## Environment Variables (`.env.local`)

```bash
STRIPE_SECRET_KEY=sk_test_...
CJ_API_KEY=your_cj_api_key_here
CJ_ACCESS_TOKEN=your_cj_access_token_here
```

## CJ Dropshipping Setup

All products in `lib/products.js` have `cjVid: null` and `cjSku: null` by default.
Run `node scripts/fill-cj-mapping.js --write` with `CJ_API_KEY` set to populate these.
Once mapped, `api/fulfill.js` auto-submits orders to CJ on Stripe payment success.

## Coding Conventions

- Prices in **cents** everywhere in `lib/products.js`; dollars only in API responses
- Checkout validates prices server-side from `lib/products.js` — never trust client prices
- Business logic stays in `lib/` — API handlers import from there
- Never commit `.env.local` or secrets
