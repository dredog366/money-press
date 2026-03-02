import type { Metadata } from "next";
import { fetchProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our full collection of eco-friendly skincare products.",
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>All Products</h1>
        <p className={styles.subheading}>
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {products.length === 0 ? (
        <p className={styles.empty}>No products found. Check back soon!</p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
