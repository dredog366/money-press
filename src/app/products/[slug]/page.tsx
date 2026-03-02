import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductBySlug, fetchProducts, getCheckoutUrl } from "@/lib/woocommerce";
import AddToCartButton from "./AddToCartButton";
import styles from "./page.module.css";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription || product.description,
  };
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const [product, checkoutUrl] = await Promise.all([
    fetchProductBySlug(params.slug),
    Promise.resolve(getCheckoutUrl()),
  ]);

  if (!product) notFound();

  const savings =
    product.salePrice && product.regularPrice > product.salePrice
      ? Math.round(
          ((product.regularPrice - product.salePrice) / product.regularPrice) * 100
        )
      : null;

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        {/* Product image */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrap}>
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.imageUrl} alt={product.name} className={styles.image} />
            ) : (
              <div className={styles.imagePlaceholder} />
            )}
            {savings && <span className={styles.saleBadge}>Save {savings}%</span>}
          </div>
        </div>

        {/* Product details */}
        <div className={styles.details}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>

          {product.sku && <p className={styles.sku}>SKU: {product.sku}</p>}

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {savings && (
              <span className={styles.originalPrice}>
                ${product.regularPrice.toFixed(2)}
              </span>
            )}
            {savings && <span className={styles.savingsTag}>Save {savings}%</span>}
          </div>

          <p className={styles.shortDesc}>{product.shortDescription}</p>

          <div className={styles.actions}>
            <AddToCartButton product={product} />
            {checkoutUrl !== "#" && (
              <a
                href={checkoutUrl}
                className={styles.buyNow}
                rel="noopener noreferrer"
              >
                Buy Now — Secure Checkout
              </a>
            )}
          </div>

          <div className={styles.trust}>
            <span>🚚 Free shipping over $35</span>
            <span>↩️ 30-day returns</span>
            <span>🔒 Secure checkout</span>
          </div>

          {product.description && (
            <div className={styles.descSection}>
              <h2 className={styles.descHeading}>Product Details</h2>
              <p className={styles.desc}>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
