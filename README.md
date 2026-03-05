# FaceTea Shop — Tea-Powered Skincare

A dropshipping storefront for tea-infused skincare products. Static HTML/CSS/JS site with Stripe Checkout, deployed on Vercel.

**Live site:** [facetea.org](https://facetea.org)

---

## Tech Stack

- **Frontend:** Static HTML, CSS, vanilla JavaScript
- **Payments:** Stripe Checkout (serverless function on Vercel)
- **Hosting:** Vercel
- **Domain:** facetea.org (managed via Vercel)

## How It Works

1. Customer browses products and adds items to cart
2. Clicks **Checkout** — cart is sent to `/api/checkout`
3. Vercel serverless function creates a Stripe Checkout session (server-side price validation)
4. Customer is redirected to Stripe's hosted checkout page
5. After payment, customer is redirected to `success.html`

Shipping: free over $50, $4.99 flat rate, or $7.99 expedited.

---

## Quick Start

```bash
git clone https://github.com/dredog366/money-press.git
cd money-press
npm install
```

### Local development

```bash
npx vercel dev
```

This runs the site locally with the serverless `/api/checkout` function.

### Environment variables

Copy `.env.example` to `.env` and add your Stripe secret key:

```bash
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

---

## Project Structure

```
money-press/
├── api/
│   └── checkout.js          # Stripe Checkout serverless function
├── docs/
│   ├── 02-product-research.md
│   ├── 03-brand-positioning.md
│   ├── 06-dropshipping-ops.md
│   ├── 07-site-copy-templates.md
│   ├── 08-tracking-analytics.md
│   ├── 09-launch-plan.md
│   ├── 10-ai-asset-prompts.md
│   └── product-descriptions.md
├── templates/
│   ├── email-templates.md
│   └── social-media-templates.md
├── index.html               # Main storefront
├── styles.css               # All styles
├── script.js                # Product rendering, cart, checkout
├── success.html             # Post-purchase confirmation
├── cancel.html              # Checkout cancelled
├── privacy.html             # Privacy policy
├── terms.html               # Terms of service
├── vercel.json              # Vercel routing config
├── package.json
└── .env.example
```

## Deployment (Vercel)

1. Import repo at [vercel.com/new](https://vercel.com/new)
2. Add environment variable: `STRIPE_SECRET_KEY`
3. Assign `facetea.org` in Vercel > Settings > Domains
4. Test with Stripe test card `4242 4242 4242 4242`
5. Switch to live Stripe key when ready

---

## Documentation

| Doc | What's inside |
|-----|---------------|
| [Product Research](docs/02-product-research.md) | Selection criteria, ranked shortlist, top pick |
| [Brand & Positioning](docs/03-brand-positioning.md) | Brand voice, visual style guide, colors |
| [Dropshipping Ops](docs/06-dropshipping-ops.md) | Supplier sourcing, QC, returns, fulfillment SOP |
| [Site Copy](docs/07-site-copy-templates.md) | Paste-ready copy for every page |
| [Tracking & Analytics](docs/08-tracking-analytics.md) | GA4, pixel setup, UTM conventions, KPIs |
| [Launch Plan](docs/09-launch-plan.md) | 7-day launch + 30-day growth plan |
| [AI Asset Prompts](docs/10-ai-asset-prompts.md) | Prompts for logo, lifestyle, mockup images |
| [Product Descriptions](docs/product-descriptions.md) | Full copy for all 8 products |

---

## Legal

- No medical/health cure claims are made anywhere in this project.
- No trademarked brand names are referenced in product copy.
- All supplier relationships are at arm's length; always verify import regulations for your specific SKU.
