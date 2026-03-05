import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>FaceTea</span>
          <p>Tea-powered skincare, delivered to your door.</p>
        </div>
        <nav className={styles.links}>
          <div className={styles.col}>
            <h4>Shop</h4>
            <Link href="/products">All Products</Link>
            <Link href="/products#serums">Serums</Link>
            <Link href="/products#cleansers">Cleansers</Link>
            <Link href="/products#moisturisers">Moisturisers</Link>
          </div>
          <div className={styles.col}>
            <h4>Help</h4>
            <Link href="/faq">FAQ</Link>
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className={styles.col}>
            <h4>Company</h4>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} FaceTea. All rights reserved.</p>
        <div className={styles.badges}>
          <span>🔒 Secure checkout</span>
          <span>🚚 Free shipping $35+</span>
          <span>♻️ Eco packaging</span>
          <span>↩️ 30-day guarantee</span>
        </div>
      </div>
    </footer>
  );
}
