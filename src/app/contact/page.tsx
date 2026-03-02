import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Money Press team.",
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Contact Us</h1>

        <p className={styles.lead}>
          We&apos;re here to help. Reach out and we&apos;ll get back to you within 24 hours on
          business days.
        </p>

        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <ul className={styles.contactList}>
              <li>
                <strong>Email</strong>
                <a href="mailto:support@moneypress.store">support@moneypress.store</a>
              </li>
              <li>
                <strong>Hours</strong>
                <span>Mon–Fri, 9 am – 6 pm EST</span>
              </li>
              <li>
                <strong>Response Time</strong>
                <span>Within 24 hours</span>
              </li>
            </ul>

            <h2>Quick Links</h2>
            <ul className={styles.quickLinks}>
              <li><a href="/faq">Frequently Asked Questions</a></li>
              <li><a href="/shipping">Shipping &amp; Delivery Info</a></li>
              <li><a href="/returns">Returns &amp; Refund Policy</a></li>
            </ul>
          </div>

          <form className={styles.contactForm} action="#" method="post">
            <h2>Send a Message</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input id="name" type="text" name="name" required placeholder="Jane Smith" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="jane@example.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject">
                <option value="">Select a topic…</option>
                <option value="order">Order inquiry</option>
                <option value="return">Return / refund</option>
                <option value="product">Product question</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can we help you?"
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
