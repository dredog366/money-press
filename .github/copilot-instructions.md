# Copilot Instructions for money-press

## Project Overview

**money-press** is a dropshipping storefront for **LatherLoop** — a skincare consumable brand. The app is built with Next.js 14 (App Router) and TypeScript.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** CSS Modules (per-component `.module.css` files)
- **Linting:** ESLint via `eslint-config-next` + `next/core-web-vitals`
- **Formatting:** Prettier (`semi: true`, `singleQuote: false`, `tabWidth: 2`, `trailingComma: "es5"`, `printWidth: 100`)
- **Runtime:** Node.js 18.17+

## Repository Structure

```
money-press/
├── src/
│   ├── app/                  # Next.js App Router pages and layouts
│   │   ├── layout.tsx        # Root layout (HTML shell, global fonts)
│   │   ├── globals.css       # Global CSS reset and variables
│   │   ├── page.tsx          # Home page (/)
│   │   ├── page.module.css   # Home page styles
│   │   └── products/
│   │       └── page.tsx      # Products listing (/products)
│   ├── components/           # Reusable React components
│   │   ├── ProductCard.tsx
│   │   └── ProductCard.module.css
│   ├── data/
│   │   └── products.ts       # Static product data (replace with API/DB when ready)
│   └── types/
│       └── index.ts          # Shared TypeScript types (e.g. Product interface)
├── docs/                     # Business/operational documentation
├── scripts/                  # Shell automation scripts (e.g. setup.sh)
├── templates/                # Paste-ready copy and asset templates
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |

## Coding Conventions

- Use the **App Router** (`src/app/`) — never the Pages Router.
- Co-locate component styles in a `ComponentName.module.css` file next to the component.
- Define all shared types in `src/types/index.ts`; avoid inline type duplication.
- Keep components small and focused; lift state only when necessary.
- Never commit `.env.local` or any file containing secrets. Use `.env.local` for local secrets and document required variables below.
- Validate user input and external API responses at the boundary (not deep in the component tree).
- Avoid OWASP Top 10 vulnerabilities (injection, XSS, CSRF, etc.).

## Environment Variables

Create a `.env.local` file in the project root (already gitignored):

```bash
# Add variables as needed — example:
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## Testing

No test suite is configured yet. When one is added, run it before committing and document the command here.

## Deployment

```bash
npm run build
npm run start
```

Or connect the GitHub repo to [Vercel](https://vercel.com/) for zero-config deployments.
