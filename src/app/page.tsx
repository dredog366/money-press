import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>FaceTea Shop</h1>
        <p>Tea-powered skincare, delivered to your door.</p>
        <a href="https://shop.facetea.org" className={styles.cta}>
          Shop Now
        </a>
      </section>
    </main>
  );
}
