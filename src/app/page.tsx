import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>FaceTea Shop</h1>
        <p>Tea-powered skincare, delivered to your door.</p>
        <Link href="/products" className={styles.cta}>
          Shop Now
        </Link>
      </section>
    </main>
  );
}
