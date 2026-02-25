import { pgTable, serial, text, varchar, decimal, integer, timestamp, boolean, enum as pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const categoryEnum = pgEnum('category', ['electronics', 'clothing', 'home', 'sports', 'books', 'other']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled']);

// Products Table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  cost: decimal('cost', { precision: 10, scale: 2 }).notNull(),
  category: categoryEnum('category').notNull().default('other'),
  stock: integer('stock').notNull().default(0),
  imageUrl: varchar('image_url', { length: 500 }),
  sku: varchar('sku', { length: 100 }).unique(),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Orders Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).unique().notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').notNull().default('pending'),
  shippingAddress: text('shipping_address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  priceAtPurchase: decimal('price_at_purchase', { precision: 10, scale: 2 }).notNull(),
});

// Cart Table
export const carts = pgTable('carts', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Cart Items Table
export const cartItems = pgTable('cart_items', {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id').notNull().references(() => carts.id, { onDelete: 'cascade' }),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  cartItems: many(cartItems),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));

export const cartsRelations = relations(carts, ({ many }) => ({
  cartItems: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  product: one(products, { fields: [cartItems.productId], references: [products.id] }),
}));
