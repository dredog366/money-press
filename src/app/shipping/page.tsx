import styles from "./shipping.module.css";

export const metadata = {
  title: "Shipping & Delivery — FaceTea",
};

export default function ShippingPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Shipping &amp; Delivery</h1>

        <section className={styles.section}>
          <h2>Processing time</h2>
          <p>
            All orders are processed within <strong>1–2 business days</strong>{" "}
            (Monday–Friday, excluding US federal holidays).
          </p>
        </section>

        <section className={styles.section}>
          <h2>Shipping options</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Option</th>
                <th>Estimated delivery</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard Shipping</td>
                <td>7–14 business days</td>
                <td>Free on orders $35+ / $4.99 under $35</td>
              </tr>
              <tr>
                <td>Expedited Shipping</td>
                <td>3–5 business days</td>
                <td>$7.99</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2>Where we ship</h2>
          <p>
            We currently ship to the <strong>contiguous United States</strong>{" "}
            (48 states). We&apos;re working on expanding to AK, HI, and
            international destinations — sign up for our email list to be
            notified.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Tracking</h2>
          <p>
            You&apos;ll receive a tracking number by email within 2 business
            days of your order. If you haven&apos;t received a tracking email,
            check your spam folder or{" "}
            <a href="/contact">contact us</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Delays</h2>
          <p>
            During peak seasons (November–January) or weather events, delivery
            windows may extend by 3–5 business days. We&apos;ll always
            communicate proactively if your order is delayed.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Lost or damaged shipments</h2>
          <p>
            If your order arrives damaged or is marked as delivered but
            hasn&apos;t arrived, please{" "}
            <a href="/contact">contact us</a> within{" "}
            <strong>7 days of the expected delivery date</strong> and we&apos;ll
            make it right — no questions asked.
          </p>
        </section>
      </div>
    </main>
  );
}
