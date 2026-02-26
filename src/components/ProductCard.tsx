import type { Product } from "@/types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imagePlaceholder} aria-hidden="true" />
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button className={styles.addToCart} disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
