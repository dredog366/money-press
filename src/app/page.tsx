import Link from "next/link";
import { SAMPLE_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

export default function HomePage() {
  const featured = SAMPLE_PRODUCTS.filter((p) => p.inStock).slice(0, 3);

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Tea-powered skincare</span>
        <h1>One pod. One perfect wash.</h1>
        <p>
          FaceTea turns a single dissolvable pod into a rich, skin-loving foam —
          in seconds. No plastic bottle. No fuss. Just the cleanest start to your day.
        </p>
        <div className={styles.heroCtas}>
          <Link href="/products" className={styles.ctaPrimary}>
            Shop the Starter Pack — $34.99
          </Link>
          <a href="#how-it-works" className={styles.ctaSecondary}>
            See how it works ↓
          </a>
        </div>
      </section>

      {/* Trust badges */}
      <section className={styles.badges}>
        <div className={styles.badgesInner}>
          <span>🔒 Secure checkout</span>
          <span>🚚 Free shipping on orders $35+</span>
          <span>♻️ Plastic-free packaging</span>
          <span>↩️ 30-day satisfaction guarantee</span>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section} id="how-it-works">
        <div className={styles.sectionInner}>
          <h2>Your daily ritual, simplified.</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <h3>Wet your hands</h3>
              <p>Splash your face and hands with lukewarm water.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <h3>Drop a pod</h3>
              <p>Place one FaceTea pod in the center of your palm.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <h3>Lather and rinse</h3>
              <p>Rub, massage over your face for 20–30 seconds, then rinse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.benefits}>
        <div className={styles.sectionInner}>
          <h2>Why FaceTea?</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✦</span>
              <h3>Zero waste, zero compromise.</h3>
              <p>Every pod comes in a biodegradable wrapper. Skip the plastic bottle forever.</p>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✦</span>
              <h3>Travel-ready, routine-proof.</h3>
              <p>Each pod fits in your palm. Toss a few in your gym bag, carry-on, or desk drawer.</p>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✦</span>
              <h3>One month in a tiny pack.</h3>
              <p>Six pods, one starter pack, 30 days of your best daily wash — delivered straight to your door.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2>Best sellers</h2>
          <div className={styles.productsGrid}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/products" className={styles.ctaPrimary}>
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <div className={styles.sectionInner}>
          <p className={styles.socialProof}>Loved by 2,000+ daily routines</p>
          <div className={styles.reviewGrid}>
            <blockquote className={styles.review}>
              <p>"Obsessed. I travel every week and these pods have replaced an entire toiletry bag shelf."</p>
              <cite>— Morgan T., verified buyer</cite>
            </blockquote>
            <blockquote className={styles.review}>
              <p>"I can't believe I was lugging a full bottle around. These are genius."</p>
              <cite>— Priya S., verified buyer</cite>
            </blockquote>
            <blockquote className={styles.review}>
              <p>"My partner stole my starter pack so I had to order the 3-month supply. No regrets."</p>
              <cite>— Jamie L., verified buyer</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <div className={styles.sectionInner}>
          <h2>Ready to simplify your routine?</h2>
          <p>
            Start with the Starter Pack. If you love it — and you will — the
            3-Month Supply saves you 24%.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/products" className={styles.ctaPrimary}>
              Shop Now
            </Link>
            <Link href="/about" className={styles.ctaSecondary}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
