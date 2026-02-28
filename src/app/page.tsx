import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Money Press</h1>
        <p>Quality products, delivered fast.</p>
        <Link href="/products" className={styles.cta}>
          Shop Now
        </Link>
      </section>
    </main>
  );
}
