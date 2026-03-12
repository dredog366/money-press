# money- FaceTea Shoppress 

Source code for **[FaceTea Shop](https://facetea. a dropshipping storefront selling tea-infused skincare products. Built with vanilla HTML/CSS/JS, Vercel serverless functions, Stripe Checkout, and CJ Dropshipping.org)** 

## Quick Start

```bash
git clone https://github.com/dredog366/money-press.git
cd money-press
npm install
cp .env.example .env.local   # fill in your keys
vercel dev                    # local dev with serverless functions
```

## Environment Variables

See `.env.example` for required values:

| Variable | Where to get it |
|---|---|
| `STRIPE_SECRET_KEY` | [Stripe Dashboard API keys](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | [Stripe Webhooks](https://dashboard.stripe.com/ add endpoint `/api/fulfill` |webhooks) 
| `CJ_API_KEY` | [CJ Dropshipping API key](https://www.cjdropshipping.com/myCJ.html#/apikey) |

## CJ Dropshipping Setup

Run this once to map product variant IDs from CJ (enables order fulfillment):

```bash
CJ_API_KEY=your_key node scripts/fill-cj-mapping.js         # preview
CJ_API_KEY=your_key node scripts/fill-cj-mapping.js --write  # apply
```

Once mapped, the webhook at `/api/fulfill` auto-submits orders to CJ on successful Stripe payment.

## Restocking Agent

Monitor inventory levels across all CJ-mapped products:

```bash
CJ_API_KEY=your_key node scripts/restock-agent.js
CJ_API_KEY=your_key node scripts/restock-agent.js --threshold=20
```

## Architecture

```
index.html           Frontend storefront
script.js            Cart + checkout flow (fetches /api/products)
api/products.js      GET  /api/ product catalogproducts  
api/checkout.js      POST /api/ creates Stripe sessioncheckout  
api/fulfill.js       POST /api/ Stripe webhook -> CJ orderfulfill   
lib/products.js      Single source of truth (prices in cents)
scripts/fill-cj-mapping.js   Maps products to CJ variant IDs
scripts/restock-agent.js     Monitors CJ inventory for low stock
docs/deploy-checklist.md     Full deployment guide
```

## Deploy

See [`docs/deploy-checklist.md`](docs/deploy-checklist.md). Add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `CJ_API_KEY` as Vercel environment variables.
