"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";

const WC_URL = process.env.NEXT_PUBLIC_WC_URL;
const checkoutUrl = WC_URL ? `${WC_URL}/checkout` : null;

export default function CartView() {
  const { items, itemCount, total, removeFromCart, updateQuantity, clearCart } = useCart();

  if (itemCount === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.empty}>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/products" className={styles.cta}>
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const freeShippingThreshold = 35;
  const toFreeShipping = Math.max(0, freeShippingThreshold - total);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Your Cart</h1>

      {toFreeShipping > 0 ? (
        <p className={styles.freeShippingBanner}>
          Add <strong>${toFreeShipping.toFixed(2)}</strong> more for free shipping!
        </p>
      ) : (
        <p className={styles.freeShippingBanner + " " + styles.freeUnlocked}>
          🎉 You&apos;ve unlocked free shipping!
        </p>
      )}

      <div className={styles.layout}>
        {/* Items */}
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.product.id} className={styles.item}>
              <div className={styles.itemImage}>
                {item.product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.product.imageUrl} alt={item.product.name} />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
              </div>
              <div className={styles.itemDetails}>
                <Link href={`/products/${item.product.slug}`} className={styles.itemName}>
                  {item.product.name}
                </Link>
                {item.product.sku && (
                  <p className={styles.itemSku}>SKU: {item.product.sku}</p>
                )}
                <div className={styles.itemActions}>
                  <div className={styles.qtyControl}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.itemPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <button className={styles.clearBtn} onClick={clearCart}>
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{total >= freeShippingThreshold ? "Free" : "$4.99"}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>
              ${(total >= freeShippingThreshold ? total : total + 4.99).toFixed(2)}
            </span>
          </div>

          {checkoutUrl ? (
            <a href={checkoutUrl} className={styles.checkoutBtn}>
              Proceed to Checkout
            </a>
          ) : (
            <p className={styles.checkoutNote}>
              Configure your WooCommerce store URL in <code>.env.local</code> to enable
              checkout.
            </p>
          )}

          <Link href="/products" className={styles.continueShopping}>
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
