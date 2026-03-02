import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Money Press 30-day hassle-free return and refund policy.",
};

export default function ReturnsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Returns &amp; Refunds</h1>
        <p className={styles.lead}>
          Not happy? We&apos;ll make it right. Our 30-day hassle-free return policy has you
          covered.
        </p>

        <h2>30-Day Return Window</h2>
        <p>
          You may return any product within 30 days of the delivery date for a full
          refund, no questions asked. Items must be unused and in their original packaging
          to qualify for a return.
        </p>

        <h2>How to Start a Return</h2>
        <ol>
          <li>
            Email us at <a href="mailto:support@moneypress.store">support@moneypress.store</a>{" "}
            with your order number and the reason for your return.
          </li>
          <li>
            We&apos;ll send you a prepaid return shipping label within 1 business day.
          </li>
          <li>Package the item securely and drop it off at any authorized shipping location.</li>
          <li>
            Once we receive and inspect the return, we&apos;ll issue a full refund to your
            original payment method within 3–5 business days.
          </li>
        </ol>

        <h2>Damaged or Defective Items</h2>
        <p>
          If your order arrives damaged or defective, please{" "}
          <a href="/contact">contact us within 7 days</a> of delivery with a photo of
          the damage. We will send a replacement at no charge or issue a full refund,
          whichever you prefer.
        </p>

        <h2>Exceptions</h2>
        <ul>
          <li>Opened or used pods cannot be returned for hygiene reasons, unless defective.</li>
          <li>Items returned after 30 days are not eligible for a refund.</li>
          <li>Original shipping charges are non-refundable unless the return is due to our error.</li>
        </ul>

        <h2>Refund Timeline</h2>
        <p>
          Refunds are processed within 3–5 business days of receiving your returned item.
          Depending on your bank or card issuer, it may take an additional 3–7 business
          days for the refund to appear on your statement.
        </p>

        <h2>Need Help?</h2>
        <p>
          Our support team is standing by. <a href="/contact">Contact us</a> and we&apos;ll
          get back to you within 24 hours on business days.
        </p>
      </div>
    </main>
  );
}
