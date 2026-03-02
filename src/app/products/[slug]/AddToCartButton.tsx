"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  if (!product.inStock) {
    return (
      <button className={styles.addToCart} disabled>
        Out of Stock
      </button>
    );
  }

  return (
    <div className={styles.qtyRow}>
      <div className={styles.qtyControl}>
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
          className={styles.qtyBtn}
        >
          −
        </button>
        <span className={styles.qty}>{qty}</span>
        <button
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
          className={styles.qtyBtn}
        >
          +
        </button>
      </div>
      <button className={styles.addToCart} onClick={handleAdd}>
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
