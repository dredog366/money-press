# FaceTea Shop — Deploy Checklist (Vercel + Stripe)

---

## Phase 1: Stripe Account Setup

- [ ] Create a Stripe account at https://stripe.com
- [ ] Complete account verification (business details, bank account)
- [ ] Note your **Test** Secret Key: `sk_test_...` (from Dashboard > Developers > API Keys)
- [ ] Note your **Live** Secret Key: `sk_live_...` (for production — enable after testing)

## Phase 2: Vercel Project Setup

- [ ] Go to https://vercel.com/new
- [ ] Import your GitHub repo (`dredog366/money-press`)
- [ ] Framework preset: **Other** (not Next.js — this is a static site with serverless functions)
- [ ] Build command: leave blank
- [ ] Output directory: `.`
- [ ] Add environment variable:
  - Key: `STRIPE_SECRET_KEY`
  - Value: your Stripe test key (`sk_test_...`) for now
- [ ] Click **Deploy**

## Phase 3: Domain Connection

- [ ] In Vercel project, go to **Settings > Domains**
- [ ] Add `facetea.org` (it's already on your Vercel account)
- [ ] Add `www.facetea.org` as well
- [ ] Vercel handles SSL automatically

## Phase 4: Testing (Use Stripe Test Mode)

- [ ] Visit your deployed site
- [ ] Add products to cart
- [ ] Click Checkout — should redirect to Stripe Checkout page
- [ ] Use test card: `4242 4242 4242 4242` (any future date, any CVC)
- [ ] Complete purchase — should redirect to success page
- [ ] Verify cart is cleared after purchase
- [ ] Test cancel flow — should redirect to cancel page
- [ ] Check Stripe Dashboard > Payments — test payment should appear
- [ ] Test on mobile (phone + tablet)
- [ ] Test all pages: products, about, shipping, FAQ, contact, privacy, terms

## Phase 5: Go Live

- [ ] In Stripe Dashboard, switch from Test to Live mode
- [ ] Copy your **Live** Secret Key (`sk_live_...`)
- [ ] In Vercel > Project Settings > Environment Variables:
  - Update `STRIPE_SECRET_KEY` to your live key
  - Redeploy the project
- [ ] Place a real $14.99 test order (buy the cheapest product)
- [ ] Verify order appears in Stripe Dashboard (live)
- [ ] Refund the test order from Stripe Dashboard

## Phase 6: SEO & Analytics

- [ ] Google Search Console: verify `facetea.org` and submit sitemap
- [ ] Google Analytics: add GA4 tag to `index.html` (in the `<head>`)
- [ ] Test structured data: https://search.google.com/test/rich-results
- [ ] Share on social media and verify Open Graph preview looks correct

## Phase 7: Final Checks

- [ ] All product descriptions are correct
- [ ] Prices match between site and Stripe checkout
- [ ] Contact email `support@facetea.org` is set up
- [ ] Privacy Policy and Terms of Service pages work
- [ ] Free shipping threshold ($50) displays correctly in cart
- [ ] Site loads in under 3 seconds
