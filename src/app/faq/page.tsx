import type { Metadata } from "next";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Money Press products and orders.",
};

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Most orders arrive within 2–4 business days. You'll receive a tracking number by email once your order ships. International orders may take 7–14 business days.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! All orders over $35 qualify for free standard shipping within the US. Orders under $35 ship for a flat $4.99.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy. If you're not satisfied for any reason, contact us within 30 days of delivery and we'll arrange a return and full refund.",
  },
  {
    q: "Are your products safe for sensitive skin?",
    a: "Our LatherLoop facial wash pods are dermatologically tested and formulated to be gentle on all skin types, including sensitive skin. We do not include parabens, sulfates, or artificial fragrances. If you have a specific skin condition, consult a dermatologist before use.",
  },
  {
    q: "How do the pods work?",
    a: "Each pod is a single-use, pre-measured amount of foaming facial wash. Wet your hands or face lightly, place one pod in your palm, rub your hands together for 2–3 seconds — the pod dissolves and activates into a rich lather. Massage over your face for 20–30 seconds, then rinse thoroughly.",
  },
  {
    q: "How many pods are in a month's supply?",
    a: "Used once daily, one 6-pod Starter Pack lasts approximately 30 days. The 18-pod 3-Month Supply covers a full 90-day routine.",
  },
  {
    q: "Are the pods eco-friendly?",
    a: "Yes. The pods are wrapped in a biodegradable film and contain no plastic bottles or excessive packaging. Each pod is designed to eliminate the need for a traditional plastic squeeze bottle.",
  },
  {
    q: "Can I cancel or change my order?",
    a: "We process orders quickly. If you need to cancel or modify your order, contact us immediately at support@moneypress.store. We'll do our best to help, but we cannot guarantee changes once the order is in processing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) and PayPal. All transactions are secured with 256-bit SSL encryption.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within the United States. International shipping is on our roadmap — subscribe to our newsletter to be notified when it launches.",
  },
];

export default function FaqPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1>Frequently Asked Questions</h1>
        <p className={styles.lead}>
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="/contact">Contact our support team</a> — we&apos;re happy to help.
        </p>

        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.faqItem}>
              <h2 className={styles.faqQ}>{faq.q}</h2>
              <p className={styles.faqA}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
