# FaceTea Shop — Deploy Checklist (Hostinger + WooCommerce)

---

## Phase 1: Hostinger Account Setup

- [ ] Log in to https://hpanel.hostinger.com
- [ ] Confirm your hosting plan supports WordPress (any WordPress or Web hosting plan)
- [ ] Note your **Server IP Address** (Plan Details section)
- [ ] Note your **Nameservers** (e.g., `ns1.dns-parking.com`, `ns2.dns-parking.com`)

## Phase 2: WordPress Installation

- [ ] In hPanel, go to **WordPress > Install**
- [ ] Select your hosting plan
- [ ] Set admin email, username, and password
- [ ] Choose language: English
- [ ] Click **Install** — WordPress is ready in ~2 minutes
- [ ] Log in to wp-admin and confirm dashboard loads

## Phase 3: Domain Connection

- [ ] Follow the [domain-connection.md](./domain-connection.md) guide
- [ ] Point `facetea.org` to Hostinger (Option A: nameservers, or Option B: A records)
- [ ] Wait for DNS propagation (check at https://dnschecker.org)
- [ ] In wp-admin: **Settings > General** — set both URLs to `https://facetea.org`
- [ ] In hPanel: **Security > SSL** — install free SSL and force HTTPS
- [ ] Verify `https://facetea.org` loads your WordPress site

## Phase 4: WooCommerce Setup

- [ ] In wp-admin: **Plugins > Add New** — search and install **WooCommerce**
- [ ] Activate WooCommerce and run the setup wizard
- [ ] Set store address, currency (USD), and product type (Physical)
- [ ] In **WooCommerce > Settings > General**: confirm store URL is `https://facetea.org`
- [ ] In **WooCommerce > Settings > Shipping**: set up free shipping zone (threshold: $50)
- [ ] In **WooCommerce > Settings > Payments**: enable a payment gateway (see Phase 5)

## Phase 5: Payment Gateway

- [ ] **Option A — Stripe:** Install "WooCommerce Stripe Payment Gateway" plugin
  - Add Stripe API keys in **WooCommerce > Settings > Payments > Stripe**
- [ ] **Option B — PayPal:** Install "WooCommerce PayPal Payments" plugin
  - Connect your PayPal business account
- [ ] Test a purchase in test/sandbox mode
- [ ] Switch to live mode once confirmed working

## Phase 6: Import Products

- [ ] In wp-admin: **WooCommerce > Products > Import**
- [ ] Upload `woocommerce/products-import.csv` from this repo
- [ ] Map columns and click **Run the Importer**
- [ ] Verify all 8 products appear with correct names, descriptions, and prices
- [ ] Add product images (upload or link from supplier)

## Phase 7: Theme & Branding

- [ ] Follow [facetea-theme-setup.md](./facetea-theme-setup.md) for theme configuration
- [ ] Install a WooCommerce-compatible theme (e.g., Astra, Flavflavor, Flavor by flavor)
- [ ] Set up logo, colors, and fonts per brand guidelines
- [ ] Configure homepage layout with featured products
- [ ] Create pages: About, Shipping & Returns, FAQ, Contact
- [ ] Add Privacy Policy and Terms of Service pages

## Phase 8: Email Setup

- [ ] In hPanel: **Emails > Manage** for facetea.org
- [ ] Create `support@facetea.org`
- [ ] In WooCommerce: **Settings > Emails** — set "From" address to `support@facetea.org`
- [ ] Test: place a test order and confirm email notifications arrive

## Phase 9: SEO & Analytics

- [ ] Install **Yoast SEO** or **Rank Math** plugin
- [ ] Set up meta titles and descriptions for all products and pages
- [ ] Submit sitemap to Google Search Console (`https://facetea.org/sitemap.xml`)
- [ ] Install Google Analytics (GA4) — use **Site Kit by Google** or paste tag in theme header
- [ ] Test structured data: https://search.google.com/test/rich-results

## Phase 10: Final Checks

- [ ] All 8 products have images, descriptions, and correct prices
- [ ] Checkout flow works end-to-end (add to cart → checkout → payment → confirmation)
- [ ] Email notifications work (order confirmation, admin notification)
- [ ] `https://facetea.org` loads with SSL padlock
- [ ] `https://www.facetea.org` redirects to `https://facetea.org`
- [ ] Site loads in under 3 seconds (test at https://pagespeed.web.dev)
- [ ] Mobile layout works correctly
- [ ] Privacy Policy and Terms of Service links in footer
- [ ] Free shipping threshold ($50) displays correctly
- [ ] Contact email `support@facetea.org` receives mail
