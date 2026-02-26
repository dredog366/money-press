import type { Product } from "@/types";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    description: "Noise-cancelling earbuds with 30-hour battery life and premium sound.",
    price: 49.99,
    imageUrl: "",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Portable Phone Stand",
    description: "Adjustable aluminum stand compatible with all smartphone sizes.",
    price: 14.99,
    imageUrl: "",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "3",
    name: "LED Desk Lamp",
    description: "Touch-control lamp with 5 brightness levels and USB charging port.",
    price: 29.99,
    imageUrl: "",
    category: "Home",
    inStock: false,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "Compact TKL layout with tactile switches and RGB backlighting.",
    price: 79.99,
    imageUrl: "",
    category: "Electronics",
    inStock: true,
  },
];
