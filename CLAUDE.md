# CLAUDE.md — AI Assistant Guide for money-press

## Project Overview

**money-press** is a modern dropshipping e-commerce store built with Next.js 15, React 19, and PostgreSQL. The storefront is fully functional with product management, orders, and cart systems.

## Current State

```
money-press/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # REST API endpoints
│   │   │   ├── products/      # Product CRUD operations
│   │   │   ├── orders/        # Order management
│   │   │   └── cart/          # Shopping cart
│   │   ├── layout.tsx         # Root layout with navigation
│   │   └── page.tsx           # Home page with hero and featured products
│   ├── components/            # Reusable React components
│   ├── db/
│   │   ├── schema.ts          # Drizzle ORM database schema
│   │   └── index.ts           # Database connection
│   ├── lib/
│   │   └── validations.ts     # Zod validation schemas
│   └── styles/
│       └── globals.css        # Tailwind CSS global styles
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.js          # PostCSS configuration
├── .env.example               # Environment variable template
├── .eslintrc.json             # ESLint configuration
├── .gitignore                 # Git ignore rules
├── README.md                  # User-facing documentation
└── CLAUDE.md                  # This file
```

## Tech Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 3.4
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 14+ with Drizzle ORM
- **Validation**: Zod 3.22
- **Language**: TypeScript 5.3
- **Package Manager**: npm/pnpm


## Development Branch

The active development branch is:

```
claude/claude-md-mm2mnu1wdd9474mi-a5IGM
```

Always develop on the designated `claude/` branch. Never push to `main` or `master` without explicit permission.

## Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and set DATABASE_URL:
# DATABASE_URL=postgresql://username:password@localhost:5432/money_press
```

### Database Setup

```bash
# Create database
createdb money_press

# Run migrations (when migration system is set up)
npm run db:push
```

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npmAPI Endpoints

### Products
```
GET    /api/products           # List products (filters: category, minPrice, maxPrice, limit, offset)
POST   /api/products           # Create product (admin)
GET    /api/products/[id]      # Get product by ID
PATCH  /api/products/[id]      # Update product
DELETE /api/products/[id]      # Delete product
```

### Orders
```
GET    /api/orders             # List orders (filters: status, limit, offset)
POST   /api/orders             # Create order with items
GET    /api/orders/[id]        # Get order details
PATCH  /api/orders/[id]        # Update order (e.g., status)
```

### Cart (TODO)
```
GET    /api/cart               # Get cart by session
POST   /api/cart/items         # Add item to cart
PATCH  /api/cart/items/[id]    # Update cart item quantity
DELETE /api/cart/items/[id]    # Remove item from cart
```

## Database Schema

### Products Table
- `id` - Primary key
- `name` - Product name (varchar 255)
- `description` - Product description (text)
- `price` - Selling price (decimal)
- `cost` - Cost price (decimal)
- `category` - Category enum (electronics, clothing, home, sports, books, other)
- `stock` - Inventory count
- `imageUrl` - Product image URL
- `sku` - Unique stock keeping unit
- `active` - Visibility flag
- `createdAt`, `updatedAt` - Timestamps

### Orders Table
- `id` - Primary key
- `orderNumber` - Unique order ID (e.g., ORD-1234567890-abc123)
- `customerEmail` - Customer email
- `customerName` - Customer name
- `totalPrice` - Order total (decimal)
- `status` - Status enum (pending, processing, shipped, delivered, cancelled)
- `shippingAddress` - Delivery address
- `createdAt`, `updatedAt` - Timestamps

### Order Items Table
- `id` - Primary key
- `orderId` - Foreign key to orders
- `productId` - Foreign key to products
- `quantity` - Item quantity
- `priceAtPurchase` - Price at time of purchase (for historical accuracy)

### Carts Table
- `id` - Primary key
- `sessionId` - Unique session identifier
- `createdAt`, `updatedAt` - Timestamps

### Cart Items Table
- `id` - Primary key
- `cartId` - Foreign key to carts
- `productId` - Foreign key to products
- `quantity` - Item quantity

## Next Steps

Priority features to implement:

1. **Shopping Cart UI**
   - Display products on homepage with real data
   - Add to cart functionality
   - Cart page with quantity adjustment

2. **Admin Dashboard**
   - Product management interface
   - Order tracking and status updates
   - Inventory management

3. **Checkout & Payments**
   - Checkout flow
   - Stripe integration
   - Order confirmation emails

4. **Additional Features**
   - User authentication
   - Search and advanced filtering
   - Product reviews/ratings
   - Wishlist
   - Admin analytics
- Follow Next.js and React best practices
- Use functional components with hooks
- Use Tailwind CSS for all styling
- No utility classes beyond Tailwind

### Database
- Use Drizzle ORM for all database queries
- Keep schema in `src/db/schema.ts`
- Use migrations for schema changes (implement when needed)

### API
- Follow REST conventions
- Use Zod for request/response validation
- Return consistent error responses
- Proper HTTP status codes

### Security
- Never commit `.env` files
- Sanitize all user inputs
- Use parameterized queries (handled by Drizzle)
- Validate all requests with Zod schemas
- Implement authentication before payment processing
