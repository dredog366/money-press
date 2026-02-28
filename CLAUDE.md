# CLAUDE.md — AI Assistant Guide for money-press

## Project Overview

**money-press** is the dropshipping company project for `dredog366`. It connects
to a WordPress + WooCommerce backend and ships a Next.js 14 storefront.

## Portfolio — Three Separate Repos

This is repo **1 of 3** in the `dredog366` project portfolio. Each project must
live in its own GitHub repository. They share no code.

| # | Repo Name | Purpose | Status |
|---|-----------|---------|--------|
| 1 | `money-press` | Dropshipping store — Next.js frontend + WooCommerce backend | **Active** |
| 2 | `real-estate-study-app` | Real estate study guide application | **Needs to be created** |
| 3 | `pawwelco.com` | Separate dropshipping storefront (pawwelco brand) | **Needs to be created** |

### How to create the missing repos (account owner action required)

```
1. Go to https://github.com/new
2. Create repo: real-estate-study-app  (owner: dredog366, private or public)
3. Create repo: pawwelco.com           (owner: dredog366, private or public)
4. Clone each and start a fresh project — no files from money-press should be copied
```

---

## This Repo: money-press

### What it contains

```
money-press/
├── docs/               # WooCommerce dropshipping build blueprint (10 guides)
├── scripts/
│   └── setup.sh        # Server provisioning — WordPress + WooCommerce install
├── src/                # Next.js 14 + TypeScript storefront
│   ├── app/            # App Router pages (home, /products)
│   ├── components/     # ProductCard component
│   ├── data/           # Static product data (products.ts)
│   └── types/          # Shared TypeScript types
├── templates/          # Email + social media copy templates
├── index.html          # Plain HTML prototype storefront
├── script.js           # JS for the HTML prototype
├── styles.css          # CSS for the HTML prototype
├── next.config.ts
├── package.json
├── tsconfig.json
└── CLAUDE.md
```

### Tech Stack

- **Frontend:** Next.js 14, TypeScript, CSS Modules
- **Backend/Commerce:** WordPress + WooCommerce (self-hosted)
- **Server setup:** Ubuntu 22.04, Nginx or Apache, PHP 8.2, MySQL 8

### WordPress + WooCommerce Connection

The `docs/` folder contains the full build blueprint. Key connection points:

| Concern | File |
|---------|------|
| Server provisioning | `scripts/setup.sh` |
| WordPress + WooCommerce install | `docs/04-technical-build.md` |
| WooCommerce configuration | `docs/05-woo-configuration.md` |
| Dropshipping operations | `docs/06-dropshipping-ops.md` |
| Analytics & tracking | `docs/08-tracking-analytics.md` |

To connect the Next.js frontend to WooCommerce use the
[WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/).
Store your API credentials in a `.env.local` file (never commit this file):

```bash
# .env.local — do not commit
NEXT_PUBLIC_WC_URL=https://your-wordpress-site.com
WC_CONSUMER_KEY=ck_xxxxxxxxxxxx
WC_CONSUMER_SECRET=cs_xxxxxxxxxxxx
```

### Development Scripts

```bash
npm install          # install dependencies
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build
npm run lint         # ESLint check
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WC_URL` | Base URL of your WordPress/WooCommerce site |
| `WC_CONSUMER_KEY` | WooCommerce REST API consumer key |
| `WC_CONSUMER_SECRET` | WooCommerce REST API consumer secret |

Create a `.env.example` with placeholder values and commit that; never commit
the real `.env.local`.

### Git Workflow

```bash
# Push changes
git push -u origin <current-branch>

# Exponential backoff on network failure: 2s → 4s → 8s → 16s
```

- Never push to `main` or `master` without explicit permission
- Always develop on a `claude/` prefixed branch

---

## Conventions

### General
- Keep the codebase minimal — only add what is needed for the current task
- No over-engineering; avoid premature abstractions
- Validate only at system boundaries (user input, external APIs)

### Code Style
- TypeScript strict mode, follow Next.js App Router conventions
- Use ESLint + Prettier (config files already present)
- Do not add docstrings or comments to code you did not change

### Security
- Never commit secrets, credentials, or `.env` files
- Sanitize all user input before use
- Avoid OWASP Top 10 vulnerabilities

### Testing
- Write tests for new features once a testing framework is established
- Run tests before committing
