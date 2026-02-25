import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z.string().nullable(),
  price: z.string(),
  cost: z.string(),
  category: z.enum(['electronics', 'clothing', 'home', 'sports', 'books', 'other']),
  stock: z.number(),
  imageUrl: z.string().nullable(),
  sku: z.string().nullable(),
  active: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.string(),
  cost: z.string(),
  category: z.enum(['electronics', 'clothing', 'home', 'sports', 'books', 'other']).default('other'),
  stock: z.number().int().nonnegative(),
  imageUrl: z.string().url().optional(),
  sku: z.string().min(1).max(100),
});

export const OrderSchema = z.object({
  id: z.number(),
  orderNumber: z.string(),
  customerEmail: z.string().email(),
  customerName: z.string(),
  totalPrice: z.string(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateOrderSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().min(1),
  totalPrice: z.string(),
  shippingAddress: z.string().min(1),
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
});

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
