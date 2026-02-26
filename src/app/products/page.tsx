import ProductCard from "@/components/ProductCard";
import { SAMPLE_PRODUCTS } from "@/data/products";
import styles from "./products.module.css";

export const metadata = {
  title: "Products — Money Press",
};

export default function ProductsPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>All Products</h1>
      <div className={styles.grid}>
        {SAMPLE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
