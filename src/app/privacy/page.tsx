import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Money Press Privacy Policy — how we collect and use your data.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Privacy Policy</h1>
        <p className={styles.muted}>Last updated: March 2026</p>

        <p>
          Money Press (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your
          personal information. This Privacy Policy explains what data we collect, how we
          use it, and your rights.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>
            <strong>Order information:</strong> name, email, shipping address, and payment
            details (processed securely by our payment provider — we never store full card
            numbers).
          </li>
          <li>
            <strong>Account information:</strong> if you create an account, your username
            and password (hashed).
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, browser type, and referring URLs,
            collected via cookies and analytics tools (e.g., Google Analytics 4).
          </li>
          <li>
            <strong>Communications:</strong> emails you send us and newsletter
            subscriptions.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To send order confirmations and shipping updates</li>
          <li>To respond to support inquiries</li>
          <li>To send marketing emails (only with your consent)</li>
          <li>To improve our website and product offering</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>
          We do not sell your personal data. We share it only with trusted third-party
          service providers who help us operate our business (payment processors, shipping
          carriers, email service providers), and only to the extent necessary to provide
          those services.
        </p>

        <h2>Cookies</h2>
        <p>
          We use cookies to remember your cart, preferences, and analytics data. You can
          disable cookies in your browser settings, but some features of the site may not
          work as expected.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data at any
          time. To make a request, email us at{" "}
          <a href="mailto:support@moneypress.store">support@moneypress.store</a>.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please{" "}
          <a href="/contact">contact us</a>.
        </p>
      </div>
    </main>
  );
}
