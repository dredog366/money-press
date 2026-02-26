# money-press

A dropshipping storefront built with [Next.js](https://nextjs.org/) and TypeScript.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Linting:** ESLint (eslint-config-next)
- **Formatting:** Prettier

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Install dependencies

```bash
npm install
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

## Project Structure

```
money-press/
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── layout.tsx       # Root layout (HTML shell, global fonts)
│   │   ├── globals.css      # Global CSS reset and variables
│   │   ├── page.tsx         # Home page (/)
│   │   └── products/
│   │       └── page.tsx     # Products listing (/products)
│   ├── components/
│   │   └── ProductCard.tsx  # Reusable product card component
│   ├── data/
│   │   └── products.ts      # Sample product data (replace with API/DB)
│   └── types/
│       └── index.ts         # Shared TypeScript types
├── public/                  # Static assets
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Environment Variables

Create a `.env.local` file in the root (never commit this file):

```bash
# Example — add variables as needed
# NEXT_PUBLIC_API_URL=https://api.example.com
```

`.env.local` is already excluded in `.gitignore`.

## Deployment

Build and start the production server:

```bash
npm run build
npm run start
```

Or deploy to [Vercel](https://vercel.com/) with zero configuration — connect your GitHub repo and Vercel handles the rest.
