import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Money Press Terms of Service.",
};

export default function TermsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Terms of Service</h1>
        <p className={styles.muted}>Last updated: March 2026</p>

        <p>
          By accessing or using the Money Press website and purchasing our products, you
          agree to the following terms. Please read them carefully.
        </p>

        <h2>Products and Pricing</h2>
        <p>
          We reserve the right to modify product descriptions, prices, and availability
          at any time without prior notice. All prices are listed in US dollars and are
          exclusive of applicable taxes.
        </p>

        <h2>Orders</h2>
        <p>
          By placing an order, you represent that you are at least 18 years of age and
          that all information you provide is accurate. We reserve the right to refuse or
          cancel any order for any reason, including suspected fraud.
        </p>

        <h2>Payment</h2>
        <p>
          Payment is due at the time of purchase. All transactions are secured with
          industry-standard encryption. We accept major credit cards and PayPal.
        </p>

        <h2>Shipping</h2>
        <p>
          Please review our <a href="/shipping">Shipping &amp; Delivery page</a> for
          estimated delivery times and rates. We are not responsible for delays caused by
          carriers or customs.
        </p>

        <h2>Returns</h2>
        <p>
          Please review our <a href="/returns">Returns &amp; Refunds policy</a> for full
          details.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on this website — including text, images, logos, and design — is
          the property of Money Press and may not be reproduced without written
          permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Money Press shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of our
          products or website.
        </p>

        <h2>Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Texas, United States,
          without regard to its conflict of law provisions.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms? <a href="/contact">Contact us</a> and we&apos;ll
          respond within 24 hours on business days.
        </p>
      </div>
    </main>
  );
}
