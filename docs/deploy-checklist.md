# FaceTea Shop — Deploy Checklist (Vercel + Stripe)

---

## Phase 1: Vercel Deployment (DONE)

- [x] Connect GitHub repo to Vercel
- [x] Set Application Preset to "Other" (not Next.js)
- [x] Add `STRIPE_SECRET_KEY` environment variable in Vercel settings
- [x] Deploy and verify site loads at `.vercel.app` URL
- [x] Assign `facetea.org` domain in Vercel project settings

## Phase 2: Stripe Setup

- [ ] Log in to https://dashboard.stripe.com
- [ ] Copy your **test** secret key (`sk_test_...`) and add it to Vercel env vars
- [ ] Test a purchase end-to-end using Stripe test card (`4242 4242 4242 4242`)
- [ ] Verify success page loads and cart clears after purchase
- [ ] Verify cancel page loads when checkout is abandoned
- [ ] Switch to **live** secret key (`sk_live_...`) when ready to accept real payments
- [ ] Update `STRIPE_SECRET_KEY` in Vercel with the live key

## Phase 3: SEO & Indexing

- [ ] Submit sitemap to Google Search Console: `https://facetea.org/sitemap.xml`
  - Go to https://search.google.com/search-console
  - Add property `https://facetea.org`
  - Verify ownership (Vercel DNS verification or HTML file)
  - Submit sitemap URL
- [ ] Test structured data: https://search.google.com/test/rich-results
  - Verify Product rich results appear
  - Verify FAQ rich results appear
- [ ] Create OG image: design a 1200x630px `og-image.png` and add to repo root
  - Use https://www.canva.com/create/social-media-graphics/ (free)
  - Include: logo, tagline, product photos, brand colors (#2d6a4f, #d4a373)
- [ ] Set up Google Analytics (GA4):
  - Create GA4 property at https://analytics.google.com
  - Copy the `G-XXXXXXXXXX` measurement ID
  - Add the GA4 script tag to `index.html` `<head>` section

## Phase 4: Social & Marketing

- [ ] Create social media accounts (Instagram, TikTok, Pinterest)
- [ ] Add social links to site footer
- [ ] Share site link — OG tags will show branded preview card
- [ ] Set up email marketing (Mailchimp free tier) for the newsletter form
- [ ] Submit to Google Merchant Center for Shopping ads (optional)

## Phase 5: Final Checks

- [ ] `https://facetea.org` loads with SSL padlock
- [ ] `https://www.facetea.org` redirects to `https://facetea.org`
- [ ] All 8 products display with correct names, prices, and descriptions
- [ ] Checkout flow works: add to cart → checkout → Stripe → success page
- [ ] Mobile layout works correctly
- [ ] Site loads in under 3 seconds (test at https://pagespeed.web.dev)
- [ ] `robots.txt` accessible at `https://facetea.org/robots.txt`
- [ ] `sitemap.xml` accessible at `https://facetea.org/sitemap.xml`
- [ ] Privacy Policy and Terms of Service links work
- [ ] Free shipping threshold ($50) displays correctly in cart
