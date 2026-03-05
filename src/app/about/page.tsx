import styles from "./about.module.css";

export const metadata = {
  title: "About — FaceTea",
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Our story</span>
          <h1>Skincare that starts with a cup of tea.</h1>
          <p className={styles.lead}>
            FaceTea was born from one simple observation: the same antioxidants
            that make green tea, chamomile, and rooibos good for your body are
            equally powerful for your skin. We built a line around that idea —
            clean, effective, and easy enough for a daily ritual.
          </p>
        </header>

        <section className={styles.section}>
          <h2>What we stand for</h2>
          <div className={styles.values}>
            <div className={styles.value}>
              <h3>Ingredient integrity</h3>
              <p>
                Every formula is free of parabens, sulfates (SLS/SLES), and
                artificial dyes. We use real botanical extracts at concentrations
                that actually work — not just enough to appear on the label.
              </p>
            </div>
            <div className={styles.value}>
              <h3>Less packaging, more product</h3>
              <p>
                Our pod format eliminates the plastic bottle entirely. Biodegradable
                wrappers, minimal outer packaging, nothing wasted. One pack of pods
                saves roughly 300 ml of plastic per year compared to a standard
                cleanser bottle.
              </p>
            </div>
            <div className={styles.value}>
              <h3>Cruelty-free, always</h3>
              <p>
                None of our products are tested on animals. We work only with
                suppliers who share that commitment — no exceptions.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>The FaceTea difference</h2>
          <p>
            Most skincare is designed to be complicated. Multi-step routines,
            confusing ingredient lists, bottles that clutter your counter — and
            for what? A good cleanser and a reliable moisturiser, used
            consistently, deliver better results than ten products used
            inconsistently.
          </p>
          <p>
            That's what we make: the products you actually reach for every day.
            Formulated with tea botanicals, sized to go anywhere, and priced so
            restocking never feels like a decision.
          </p>
        </section>

        <section className={styles.promise}>
          <h2>Our promise</h2>
          <p>
            If any FaceTea product doesn't work for you, contact us within 30
            days of delivery. We'll make it right — no forms, no hoops.
          </p>
        </section>
      </div>
    </main>
  );
}
