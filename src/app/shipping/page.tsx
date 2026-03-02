import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: "Shipping times, rates, and delivery information for Money Press.",
};

export default function ShippingPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Shipping &amp; Delivery</h1>
        <p className={styles.lead}>
          We want your order to arrive fast and in perfect condition. Here&apos;s everything
          you need to know.
        </p>

        <h2>Shipping Rates</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order Total</th>
              <th>Shipping Method</th>
              <th>Cost</th>
              <th>Estimated Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$35 and over</td>
              <td>Standard Shipping</td>
              <td>Free</td>
              <td>2–4 business days</td>
            </tr>
            <tr>
              <td>Under $35</td>
              <td>Standard Shipping</td>
              <td>$4.99</td>
              <td>2–4 business days</td>
            </tr>
          </tbody>
        </table>

        <h2>Processing Time</h2>
        <p>
          Orders placed before 2 pm EST on business days are typically processed and
          shipped the same day. Orders placed after 2 pm or on weekends and holidays are
          processed the next business day.
        </p>

        <h2>Tracking Your Order</h2>
        <p>
          Once your order ships, you&apos;ll receive a shipping confirmation email with a
          tracking number. You can use this number to track your package directly on the
          carrier&apos;s website.
        </p>

        <h2>Delivery Issues</h2>
        <p>
          If your package is delayed, lost, or arrives damaged, please{" "}
          <a href="/contact">contact us</a> within 7 days of the expected delivery date.
          We will work with the carrier to resolve the issue and, if necessary, reship
          your order at no additional cost.
        </p>

        <h2>Address Accuracy</h2>
        <p>
          Please double-check your shipping address before placing your order. We are not
          responsible for orders shipped to an incorrectly entered address. If you notice
          an error, <a href="/contact">contact us immediately</a> — we will do our best
          to update the address before the order ships.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about your shipment, please{" "}
          <a href="/contact">contact our support team</a>. We respond within 24 hours on
          business days.
        </p>
      </div>
    </main>
  );
}
