import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>Money Press</span>
          <p className={styles.tagline}>Your daily ritual, simplified.</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <div className={styles.group}>
            <h3>Shop</h3>
            <Link href="/products">All Products</Link>
          </div>
          <div className={styles.group}>
            <h3>Help</h3>
            <Link href="/faq">FAQ</Link>
            <Link href="/shipping">Shipping & Delivery</Link>
            <Link href="/returns">Returns & Refunds</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div className={styles.group}>
            <h3>Company</h3>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Money Press. All rights reserved.</p>
      </div>
    </footer>
  );
}
