import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          FaceTea
        </Link>
        <nav className={styles.nav}>
          <Link href="/products">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/products" className={styles.cartBtn}>
          Shop Now
        </Link>
      </div>
    </header>
  );
}
