import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Money Press — your trusted dropshipping destination.",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>About Money Press</h1>

        <p className={styles.lead}>
          Money Press is your trusted destination for premium, eco-conscious skincare
          products — shipped directly to your door.
        </p>

        <h2>Our Story</h2>
        <p>
          We started Money Press with a simple belief: getting great products shouldn&apos;t
          be complicated or wasteful. We scoured the market for skincare essentials that
          actually work, are kind to the environment, and don&apos;t break the bank.
        </p>
        <p>
          Our flagship line — LatherLoop foaming facial wash pods — was the first product
          that changed our minds about what daily skincare could look like. One small pod
          replaces a full plastic bottle. No mess, no waste, no compromise.
        </p>

        <h2>What We Stand For</h2>
        <ul>
          <li>
            <strong>Quality first.</strong> Every product we carry is hand-picked and
            tested before it goes on our shelves.
          </li>
          <li>
            <strong>Eco by default.</strong> We prioritize biodegradable, plastic-free
            packaging and work only with suppliers who share our values.
          </li>
          <li>
            <strong>Honest pricing.</strong> No gimmicks, no artificial markups. You pay
            a fair price for a great product.
          </li>
          <li>
            <strong>Customers first.</strong> If you&apos;re not happy, neither are we.
            Our 30-day hassle-free return policy backs that up.
          </li>
        </ul>

        <h2>By the Numbers</h2>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statNum}>10,000+</span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>300+</span>
            <span className={styles.statLabel}>Plastic Bottles Avoided Per Year</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>2–4 days</span>
            <span className={styles.statLabel}>Average Delivery Time</span>
          </div>
        </div>

        <h2>Get in Touch</h2>
        <p>
          Have questions, ideas, or feedback? We&apos;d love to hear from you.{" "}
          <a href="/contact">Contact our team</a> — we respond within 24 hours on
          business days.
        </p>
      </div>
    </main>
  );
}
