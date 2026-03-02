import type { Product } from "@/types";

// Static fallback products — replace with real WooCommerce products via the API
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "LatherLoop Daily Wash Pods — Starter Pack",
    slug: "latherloop-starter-pack",
    shortDescription:
      "6 foaming facial wash pods. One pod = one perfect wash. Plastic-free. Travel-ready.",
    description:
      "Each LatherLoop pod dissolves instantly in your palm, releasing a rich, pH-balanced foam that cleanses without stripping. No bottle to carry. No waste to bin. Approx. 30-day supply when used daily. Skin-safe formula, dermatologically tested. Biodegradable wrapper.",
    price: 34.99,
    regularPrice: 34.99,
    imageUrl: "",
    images: [],
    category: "Facial Wash Pods",
    sku: "LL-STARTER-6",
    inStock: true,
    stockQuantity: 999,
    tags: ["facial wash", "eco", "pods", "skincare"],
  },
  {
    id: "2",
    name: "LatherLoop 3-Month Supply",
    slug: "latherloop-3-month-supply",
    shortDescription:
      "18 pods — a full 3-month supply. Best value. Save 24% vs. buying 3 starter packs.",
    description:
      "Your best daily routine should never run out. The LatherLoop 3-Month Supply delivers 18 pods straight to your door — enough for an uninterrupted 90-day facial wash routine. Perfect to share with a partner or keep a spare at the office.",
    price: 79.99,
    regularPrice: 104.97,
    salePrice: 79.99,
    imageUrl: "",
    images: [],
    category: "Facial Wash Pods",
    sku: "LL-SUPPLY-18",
    inStock: true,
    stockQuantity: 999,
    tags: ["bundle", "value", "skincare"],
  },
  {
    id: "3",
    name: "LatherLoop Travel Pod Case",
    slug: "latherloop-travel-case",
    shortDescription:
      "Silicone zip pouch holds up to 8 pods. TSA-approved size. Toss it in any bag.",
    description:
      "The LatherLoop Travel Pod Case is a compact silicone zip pouch designed to hold up to 8 pods securely. Water-resistant, TSA-friendly, and sized perfectly for your daily carry or gym bag. Available in Forest Green and Warm Sand.",
    price: 9.99,
    regularPrice: 9.99,
    imageUrl: "",
    images: [],
    category: "Accessories",
    sku: "LL-CASE-01",
    inStock: true,
    stockQuantity: 999,
    tags: ["travel", "accessory", "case"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
