# FaceTea — Skincare Dropshipping Store

A dropshipping storefront built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/). Payments handled via [Stripe Checkout](https://stripe.com/docs/payments/checkout).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Payments:** Stripe Checkout (server-side sessions)
- **Hosting:** Vercel
- **Domain:** facetea.org

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
```

### Set up environment variables

```bash
cp .env.example .env.local
```

Add your Stripe secret key to `.env.local`:

```
STRIPE_SECRET_KEY=sk_live_your_key_here
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |

## Deployment

Deployed on Vercel. Push to `main` to trigger a production deploy.

Environment variable `STRIPE_SECRET_KEY` must be set in Vercel project settings.
