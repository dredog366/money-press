# CLAUDE.md — AI Assistant Guide for FaceTea Shop

## Project Overview

**FaceTea Shop** is a tea-infused skincare dropshipping store. Static HTML/CSS/JS site with Stripe Checkout, deployed on Vercel.

**Live site:** [facetea.org](https://facetea.org)

## Tech Stack

- **Frontend:** Static HTML, CSS, vanilla JavaScript (no framework)
- **Payments:** Stripe Checkout via Vercel serverless function (`api/checkout.js`)
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Domain:** facetea.org (managed via Vercel)
- **Formatting:** Prettier

## Repository Structure

```
money-press/
├── api/checkout.js          # Stripe Checkout serverless function
├── docs/                    # Business planning docs
├── templates/               # Email and social media templates
├── index.html               # Main storefront (all pages in one file)
├── styles.css               # All styles
├── script.js                # Product data, cart logic, checkout flow
├── success.html             # Post-purchase confirmation
├── cancel.html              # Checkout cancelled
├── privacy.html             # Privacy policy
├── terms.html               # Terms of service
├── vercel.json              # Vercel routing (rewrites /api/checkout)
├── package.json             # Only dependency: stripe
└── .env.example             # Required: STRIPE_SECRET_KEY
```

## Development

```bash
npm install
npx vercel dev              # Runs site + serverless functions locally
```

Environment variable required: `STRIPE_SECRET_KEY` (from Stripe dashboard).

## Key Architecture Decisions

- **No framework** — pure static HTML for maximum speed and simplicity
- **Server-side price validation** — `api/checkout.js` validates prices against a hardcoded product map to prevent tampering
- **Stripe hosted checkout** — no PCI scope; Stripe handles all payment UI
- **Single-page storefront** — `index.html` contains hero, products, about, newsletter, contact, and footer sections

## Git Workflow

- `main` branch auto-deploys to Vercel production
- Create feature branches for changes, merge via PR
- Never commit `.env` or secrets

## Conventions

- Keep the codebase minimal — only add what is needed
- Sanitize all user input before use
- Never commit secrets, credentials, or `.env` files
- Format with Prettier before committing: `npm run format`
