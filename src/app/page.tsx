import Link from "next/link";
import { fetchProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

export default async function HomePage() {
  const products = await fetchProducts();
  const featured = products.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Your daily ritual,&nbsp;simplified.</h1>
          <p>
            Premium skincare products delivered straight to your door. Eco-friendly,
            plastic-free, and built for your routine.
          </p>
          <Link href="/products" className={styles.cta}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className={styles.trust}>
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon} aria-hidden="true">🚚</span>
            <h3>Free Shipping</h3>
            <p>On all orders over $35</p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon} aria-hidden="true">🔒</span>
            <h3>Secure Checkout</h3>
            <p>256-bit SSL encryption</p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon} aria-hidden="true">↩️</span>
            <h3>30-Day Returns</h3>
            <p>Hassle-free returns policy</p>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon} aria-hidden="true">🌿</span>
            <h3>Eco-Friendly</h3>
            <p>Plastic-free, biodegradable</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.productGrid}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/products" className={styles.ctaOutline}>
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className={styles.aboutStrip}>
        <div className={styles.sectionInner}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2>Why Money Press?</h2>
              <p>
                We source the best eco-conscious skincare products and ship them directly
                to your door — no fluff, no waste, no compromise on quality.
              </p>
              <p>
                Every product in our store is hand-picked for effectiveness, sustainability,
                and value. We only sell things we&apos;d use ourselves.
              </p>
              <Link href="/about" className={styles.cta}>
                Our Story
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>10K+</span>
                <span className={styles.statLabel}>Happy Customers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>300+</span>
                <span className={styles.statLabel}>Plastic Bottles Avoided</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>2–4 days</span>
                <span className={styles.statLabel}>Average Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <h2>Get 10% Off Your First Order</h2>
          <p>Subscribe for exclusive deals, new arrivals, and skincare tips.</p>
          <form className={styles.newsletterForm} action="#" method="post">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              aria-label="Email address"
              className={styles.emailInput}
            />
            <button type="submit" className={styles.cta}>
              Subscribe
            </button>
          </form>
          <p className={styles.newsletterNote}>No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
}
