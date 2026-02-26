# Money Press

A modern dropshipping e-commerce platform built with Next.js 15, React 19, and PostgreSQL.

## Features

- **Product Management** - Add, edit, and manage product catalog with categories and pricing
- **Shopping Cart** - Session-based shopping cart functionality
- **Order Management** - Track orders from creation to delivery
- **Responsive Design** - Mobile-first UI built with Tailwind CSS
- **REST API** - Complete API for products, orders, and cart operations
- **Type-Safe** - Full TypeScript support with Zod validation

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod
- **Language**: TypeScript

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection string
```

### Database Setup

```bash
# Create database tables (when ready)
npm run db:push
```

### Development

```bash
# Start development server
npm run dev
```

The store will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # REST API routes
│   │   ├── products/   # Product endpoints
│   │   ├── orders/     # Order endpoints
│   │   └── cart/       # Cart endpoints
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── db/
│   ├── schema.ts       # Database schema (Drizzle)
│   └── index.ts        # Database connection
├── lib/
│   └── validations.ts  # Zod schemas
└── styles/
    └── globals.css     # Tailwind styles
```

## API Endpoints

### Products
- `GET /api/products` - List products (with filters: category, minPrice, maxPrice)
- `POST /api/products` - Create product (admin)
- `GET /api/products/[id]` - Get product details
- `PATCH /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order status

## Next Steps

- [ ] Add authentication (admin login)
- [ ] Implement shopping cart UI
- [ ] Add payment processing (Stripe)
- [ ] Product search and filtering UI
- [ ] Order tracking page
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Image optimization
- [ ] Deployment (Vercel/Railway)