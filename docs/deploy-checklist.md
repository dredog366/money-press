# FaceTea Shop — Deploy & Go-Live Checklist

Use this checklist to ensure everything is ready before launching your store.

---

## Phase 1: Store Setup

- [ ] WooCommerce installed and activated
- [ ] Theme selected and customized with FaceTea branding (colors, fonts, logo)
- [ ] Homepage set as static page with hero, products, and about sections
- [ ] Navigation menu created (Shop, About, Contact)
- [ ] All 8 products imported via CSV (`woocommerce/products-import.csv`)
- [ ] Product images uploaded for all 8 products
- [ ] Product categories created (Serums, Cleansers, Treatments, Moisturisers, Toners, Masks, Exfoliants)
- [ ] Prices verified (regular + sale prices)

## Phase 2: Essential Pages

- [ ] Shop page works and displays products
- [ ] Cart page works (add/remove items)
- [ ] Checkout page works
- [ ] My Account page works (registration + login)
- [ ] About page created with FaceTea story
- [ ] Contact page created with contact form
- [ ] Shipping & Delivery page created
- [ ] Returns & Refunds page created
- [ ] FAQ page created
- [ ] Privacy Policy page updated for your store
- [ ] Terms of Service page created

## Phase 3: Payments & Shipping

- [ ] WooCommerce Payments (or Stripe) connected and tested
- [ ] PayPal configured (optional but recommended)
- [ ] Shipping zones set up:
  - [ ] Free shipping for orders $50+
  - [ ] Flat rate $4.99 for orders under $50
- [ ] Tax settings configured (enable WooCommerce Tax for auto-calculation)
- [ ] Currency set to USD

## Phase 4: Testing

- [ ] **Place a test order** — go through the full checkout flow
- [ ] Verify order confirmation email is received
- [ ] Verify order appears in WooCommerce > Orders
- [ ] Test on mobile (phone + tablet)
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Check all links work (no 404 errors)
- [ ] Check product pages display correctly (descriptions, images, prices)
- [ ] Test cart add/remove/quantity change
- [ ] Test coupon codes (if applicable)
- [ ] Refund the test order after confirming everything works

## Phase 5: Domain & SSL

- [ ] `facetea.org` connected to WordPress.com (see docs/domain-connection.md)
- [ ] DNS verified and propagated
- [ ] SSL certificate active (padlock icon in browser)
- [ ] Old staging URL (`dgrelli-bopge.wpcomstaging.com`) redirects to `facetea.org`
- [ ] Both `facetea.org` and `www.facetea.org` work

## Phase 6: SEO & Analytics

- [ ] **SEO plugin** installed (Yoast SEO or Rank Math — if available on your plan)
- [ ] Homepage meta title: `FaceTea Shop — Tea-Powered Skincare, Delivered to Your Door`
- [ ] Homepage meta description: `Discover premium tea-infused skincare products. Green tea serums, chamomile cleansers, matcha masks and more. Free shipping on orders over $50.`
- [ ] Each product has a unique meta title and description
- [ ] Google Analytics connected (use Google Site Kit plugin or paste GA4 tag)
- [ ] Google Search Console set up and sitemap submitted

## Phase 7: Final Touches

- [ ] Favicon uploaded (small FaceTea logo/icon)
- [ ] Email notifications configured:
  - [ ] New order notification (to you)
  - [ ] Order confirmation (to customer)
  - [ ] Shipping notification (to customer)
- [ ] Store email set to `support@facetea.org` (or your preferred email)
- [ ] Social media links added to footer (if applicable)
- [ ] Remove any sample/placeholder content
- [ ] Check site speed — aim for under 3 seconds load time

---

## Go Live!

Once all boxes are checked:
1. Make `facetea.org` the primary domain
2. Announce on social media
3. Send a launch email to your subscriber list
4. Monitor orders and analytics for the first 48 hours
5. Celebrate!
