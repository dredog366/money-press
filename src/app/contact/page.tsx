import styles from "./contact.module.css";

export const metadata = {
  title: "Contact — FaceTea",
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <h1>Get in touch</h1>
          <p>
            We usually respond within one business day. For order issues,
            please have your order number handy.
          </p>
          <ul className={styles.details}>
            <li>
              <strong>Email</strong>
              <a href="mailto:hello@facetea.site">hello@facetea.site</a>
            </li>
            <li>
              <strong>Hours</strong>
              <span>Mon–Fri, 9 am–6 pm ET</span>
            </li>
          </ul>
          <div className={styles.links}>
            <a href="/faq">Read the FAQ →</a>
            <a href="/shipping">Shipping info →</a>
            <a href="/returns">Returns policy →</a>
          </div>
        </div>

        <form className={styles.form} action="mailto:hello@facetea.site" method="POST" encType="text/plain">
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="order">Order number (optional)</label>
            <input id="order" name="order" type="text" placeholder="e.g. #1234" />
          </div>
          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="How can we help?" required />
          </div>
          <button type="submit" className={styles.submit}>
            Send message
          </button>
          <p className={styles.note}>
            🔒 Your information is protected by 256-bit SSL encryption.
          </p>
        </form>
      </div>
    </main>
  );
}
