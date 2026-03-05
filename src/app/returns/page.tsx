import styles from "./returns.module.css";

export const metadata = {
  title: "Returns & Refunds — FaceTea",
};

export default function ReturnsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Returns &amp; Refunds</h1>
        <p className={styles.intro}>
          Your satisfaction matters. Here&apos;s our straightforward policy.
        </p>

        <section className={styles.section}>
          <h2>30-day satisfaction guarantee</h2>
          <p>
            If you&apos;re not happy with your FaceTea purchase for any reason,
            contact us within <strong>30 days of delivery</strong> and
            we&apos;ll make it right.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Return guidelines</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Situation</th>
                <th>Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Unopened, unused product</td>
                <td>Full refund or exchange (you pay return shipping)</td>
              </tr>
              <tr>
                <td>Opened product — didn&apos;t like it</td>
                <td>50% store credit</td>
              </tr>
              <tr>
                <td>Skin sensitivity / reaction</td>
                <td>Full refund, no return required</td>
              </tr>
              <tr>
                <td>Damaged or defective on arrival</td>
                <td>Free replacement, no return required</td>
              </tr>
              <tr>
                <td>Wrong item received</td>
                <td>Free replacement + apology</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2>How to start a return or refund</h2>
          <ol className={styles.steps}>
            <li>Email <a href="mailto:hello@facetea.site">hello@facetea.site</a> with your order number and a brief description of the issue.</li>
            <li>We&apos;ll respond within 1 business day with next steps.</li>
            <li>If a refund is approved, it will be processed within 5–7 business days to your original payment method.</li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Non-returnable items</h2>
          <ul className={styles.list}>
            <li>Opened pods (for hygiene reasons — store credit offered instead)</li>
            <li>Orders older than 30 days from delivery date</li>
          </ul>
          <p className={styles.fine}>
            We reserve the right to decline returns that appear fraudulent or abusive.
          </p>
        </section>
      </div>
    </main>
  );
}
