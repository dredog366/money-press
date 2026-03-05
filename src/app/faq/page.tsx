import styles from "./faq.module.css";

export const metadata = {
  title: "FAQ — FaceTea",
};

const faqs = [
  {
    q: "How does the refill reminder work?",
    a: "We don't auto-charge you. About 25 days after your order ships, we'll send a friendly \"running low?\" email with a one-click reorder link. No surprises, no hidden subscriptions.",
  },
  {
    q: "Is FaceTea safe for sensitive skin?",
    a: "Our formula is dermatologically tested and free of parabens, sulfates (SLS/SLES), and artificial dyes. We recommend a patch test on the inside of your wrist if you have a known skin sensitivity.",
  },
  {
    q: "How long does one pod last?",
    a: "One pod is designed for one full facial wash. If you prefer a heavier lather or have a larger surface area to cleanse, you may use two pods.",
  },
  {
    q: "Are the wrappers really biodegradable?",
    a: "Yes. The individual pod wrappers are made from PVA (polyvinyl alcohol), which dissolves completely in water and breaks down naturally.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) and PayPal.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All transactions are encrypted via SSL and processed by Stripe or PayPal — we never see or store your full card number.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "We can modify or cancel orders within 2 hours of placement. After that, the order has typically been sent to fulfillment. Email hello@facetea.site immediately if you need a change.",
  },
  {
    q: "Do you offer wholesale or bulk pricing?",
    a: "Yes! For orders of 10 packs or more, email hello@facetea.site with \"Wholesale Inquiry\" in the subject line.",
  },
  {
    q: "Are your products cruelty-free?",
    a: "Our products are not tested on animals. We are committed to cruelty-free formulations across our entire range.",
  },
  {
    q: "How do I store the pods?",
    a: "Store pods in a cool, dry place. Avoid humidity, which can cause the wrapper to dissolve prematurely. Our Travel Pod Case (sold separately) is perfect for on-the-go storage.",
  },
];

export default function FAQPage() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Can&apos;t find what you&apos;re looking for? <a href="/contact">Get in touch</a>.</p>
        </header>
        <ul className={styles.list}>
          {faqs.map((item) => (
            <li key={item.q} className={styles.item}>
              <h2>{item.q}</h2>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
