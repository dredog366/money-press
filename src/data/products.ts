import type { Product } from "@/types";

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Green Tea Brightening Serum",
    description: "Antioxidant-rich serum with matcha extract. Visibly brightens and evens skin tone in 2 weeks.",
    price: 24.99,
    imageUrl: "",
    category: "Serums",
    inStock: true,
  },
  {
    id: "2",
    name: "Chamomile Calming Face Wash",
    description: "Gentle foam cleanser with chamomile and calendula. Soothes redness and removes impurities.",
    price: 14.99,
    imageUrl: "",
    category: "Cleansers",
    inStock: true,
  },
  {
    id: "3",
    name: "White Tea Eye Cream",
    description: "Delicate eye cream with white tea peptides. Reduces dark circles and fine lines overnight.",
    price: 34.99,
    imageUrl: "",
    category: "Treatments",
    inStock: false,
  },
  {
    id: "4",
    name: "Oolong Hydrating Day Cream",
    description: "Lightweight SPF 30 moisturiser with oolong polyphenols. Hydrates and shields all day.",
    price: 29.99,
    imageUrl: "",
    category: "Moisturisers",
    inStock: true,
  },
];
