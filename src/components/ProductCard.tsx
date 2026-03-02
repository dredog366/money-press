"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const savings =
    product.salePrice && product.regularPrice > product.salePrice
      ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
      : null;

  return (
    <article className={styles.card}>
      <Link href={`/products/${product.slug}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrap}>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 900px) 50vw, 33vw"
              className={styles.image}
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
          {savings && (
            <span className={styles.saleBadge}>Save {savings}%</span>
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h2 className={styles.name}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className={styles.description}>{product.shortDescription || product.description}</p>

        <div className={styles.footer}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {savings && (
              <span className={styles.originalPrice}>${product.regularPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className={styles.addToCart}
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
