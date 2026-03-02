import type { Product } from "@/types";
import { PRODUCTS, getProductBySlug as staticGetBySlug } from "@/data/products";

const WC_URL = process.env.WC_URL; // e.g. https://pawwellco.wordpress.com
const WC_KEY = process.env.WC_KEY; // Consumer key from WooCommerce → Settings → REST API
const WC_SECRET = process.env.WC_SECRET; // Consumer secret

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function transformWcProduct(wc: Record<string, unknown>): Product {
  const images = Array.isArray(wc.images)
    ? (wc.images as Array<{ src: string }>).map((img) => img.src)
    : [];
  const categories = Array.isArray(wc.categories)
    ? (wc.categories as Array<{ name: string }>)
    : [];
  const tags = Array.isArray(wc.tags)
    ? (wc.tags as Array<{ name: string }>).map((t) => t.name)
    : [];

  return {
    id: String(wc.id),
    name: String(wc.name ?? ""),
    slug: String(wc.slug ?? ""),
    description: stripHtml(String(wc.description ?? "")),
    shortDescription: stripHtml(String(wc.short_description ?? "")),
    price: parseFloat(String(wc.price)) || 0,
    regularPrice: parseFloat(String(wc.regular_price)) || 0,
    salePrice: wc.sale_price ? parseFloat(String(wc.sale_price)) : undefined,
    imageUrl: images[0] ?? "",
    images,
    category: categories[0]?.name ?? "Uncategorized",
    sku: String(wc.sku ?? ""),
    inStock: wc.stock_status === "instock",
    stockQuantity: Number(wc.stock_quantity) || 0,
    tags,
  };
}

function getAuthHeader(): string {
  return "Basic " + Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
}

export async function fetchProducts(): Promise<Product[]> {
  if (!WC_URL || !WC_KEY || !WC_SECRET) {
    return PRODUCTS;
  }

  try {
    const res = await fetch(
      `${WC_URL}/wp-json/wc/v3/products?per_page=20&status=publish`,
      {
        headers: { Authorization: getAuthHeader() },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return PRODUCTS;
    const data = await res.json();
    return (data as Record<string, unknown>[]).map(transformWcProduct);
  } catch {
    return PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  if (!WC_URL || !WC_KEY || !WC_SECRET) {
    return staticGetBySlug(slug);
  }

  try {
    const res = await fetch(
      `${WC_URL}/wp-json/wc/v3/products?slug=${slug}&status=publish`,
      {
        headers: { Authorization: getAuthHeader() },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return staticGetBySlug(slug);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return staticGetBySlug(slug);
    return transformWcProduct(data[0] as Record<string, unknown>);
  } catch {
    return staticGetBySlug(slug);
  }
}

export function getCheckoutUrl(): string {
  return WC_URL ? `${WC_URL}/checkout` : "#";
}
