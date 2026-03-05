# 9 — Launch Plan

## 7-Day Launch Timeline

### Day 1 — Stripe + Vercel Setup

**Tasks:**
- [ ] Create Stripe account at [stripe.com](https://stripe.com)
- [ ] Copy test API key (`sk_test_...`) from Stripe Dashboard → Developers → API keys
- [ ] Import repo to Vercel at [vercel.com/new](https://vercel.com/new) → connect `dredog366/money-press`
- [ ] Add environment variable in Vercel: `STRIPE_SECRET_KEY` = your test key
- [ ] Assign `facetea.org` in Vercel → Settings → Domains
- [ ] Verify site loads at `https://facetea.org`
- [ ] Place a test order using card `4242 4242 4242 4242`
- [ ] Confirm `success.html` loads after payment

**Completion Criteria:**
- `https://facetea.org` loads the storefront with SSL padlock
- Test checkout completes successfully via Stripe

---

### Day 2 — Tracking & Pixels

**Tasks:**
- [ ] Set up GA4 property → add script tag to all HTML pages (see [08-tracking-analytics.md](08-tracking-analytics.md))
- [ ] Set up Meta Pixel → add base code to all HTML pages
- [ ] Set up TikTok Pixel → add base code to all HTML pages
- [ ] Fire ecommerce events from `script.js` (AddToCart, InitiateCheckout)
- [ ] Fire purchase event on `success.html`
- [ ] Verify all events in GA4 Realtime, Meta Events Manager, TikTok Events Manager

**Completion Criteria:**
- GA4 Realtime shows sessions
- Meta Events Manager shows PageView + AddToCart events
- TikTok pixel fires correctly

---

### Day 3 — Products & Payments

**Tasks:**
- [ ] Order product samples from supplier (CJDropshipping, Hubba, or AliExpress)
- [ ] Verify all 8 products display correctly on the storefront
- [ ] Test full checkout flow: add to cart → checkout → Stripe payment → success page
- [ ] Verify shipping options display correctly ($0 free over $50, $4.99 flat, $7.99 expedited)
- [ ] Test cancel flow: verify `cancel.html` loads when user cancels at Stripe

**Completion Criteria:**
- All 8 products visible with correct prices
- End-to-end checkout works in Stripe test mode

---

### Day 4 — Brand, Copy & SEO

**Tasks:**
- [ ] Generate logo using AI prompt from [10-ai-asset-prompts.md](10-ai-asset-prompts.md)
- [ ] Generate 5 product mockups and 5 lifestyle images using AI prompts
- [ ] Verify all page copy matches [07-site-copy-templates.md](07-site-copy-templates.md)
- [ ] Add meta descriptions to all HTML pages
- [ ] Submit sitemap to Google Search Console (create a `sitemap.xml` or use a generator)
- [ ] Verify Privacy Policy and Terms of Service links work in footer

**Completion Criteria:**
- All pages have unique meta descriptions
- Google Search Console property created
- No broken links

---

### Day 5 — Email Setup

**Tasks:**
- [ ] Create Mailchimp account, create audience
- [ ] Connect newsletter form on `index.html` to Mailchimp (via embedded form or API)
- [ ] Set up 3 email automations in Mailchimp:
  1. Welcome email (trigger: new subscriber) — 10% off code
  2. Abandoned cart reminder (trigger: 1 hour after abandonment)
  3. Post-purchase refill reminder (trigger: 25 days after purchase)
- [ ] Send a test email — verify delivery

**Completion Criteria:**
- Welcome email auto-fires on form submit
- Test emails arrive in inbox (not spam)

---

### Day 6 — Content, Organic Social & Pre-Launch

**Tasks:**
- [ ] Create Instagram and TikTok accounts: @faceteashop
- [ ] Post 3 organic pieces of content:
  1. "Coming soon" teaser
  2. Product reveal video (15-second loop)
  3. "How to use" Reel/TikTok
- [ ] Set up Meta Business Suite → create Ad Account → add payment method
- [ ] Create first Meta ad campaign in draft (do not publish yet)
- [ ] Final pre-launch QA: mobile responsiveness, checkout flow, email confirmations
- [ ] Switch Stripe to **live mode**: update `STRIPE_SECRET_KEY` in Vercel to `sk_live_...`

**Completion Criteria:**
- 3 pieces of organic content posted
- First Meta ad campaign in draft
- Mobile checkout works on iPhone + Android

---

### Day 7 — Launch Day

**Tasks:**
- [ ] Publish first Meta ad campaign: $10/day, US women 25–45, interest-based
- [ ] Publish first TikTok ad campaign: $5/day, US, broad + skincare interests
- [ ] Post launch-day organic content on Instagram + TikTok
- [ ] Email any pre-launch subscribers with launch announcement + 10% off code
- [ ] Monitor orders, pixel events, and ad spend throughout the day
- [ ] Respond to any DMs or comments within 2 hours

**Completion Criteria:**
- Site is live and taking real orders
- At least 1 paid ad is live
- First organic post gets ≥ 100 views

---

## 30-Day Growth Plan

### Organic Content Cadence

| Platform | Frequency | Content Types |
|----------|-----------|---------------|
| Instagram Reels | 4x/week | Product demos, skincare routine, UGC reposts, "did you know?" |
| Instagram Feed | 3x/week | Product flat lays, lifestyle shots, testimonial graphics |
| TikTok | Daily | Short-form (8–15 sec): satisfying product reveals, GRWM clips, routine hacks |
| Pinterest | 3x/week | Product pins with keywords, lifestyle boards |
| Email newsletter | 1x/week | Tips, product feature, social proof |

**Content pillar rotation (repeat weekly):**
1. **Product** — show the product, how it works, what's in the box
2. **Lifestyle** — morning routines, travel, clean beauty aesthetics
3. **Social proof** — customer reviews, UGC, testimonials
4. **Education** — skincare tips, ingredient info, tea benefits
5. **Promotion** — weekly offer, bundle deals, urgency

---

### Paid Test Plan ($5–$20/day)

| Week | Budget/day | Platform | Objective | Audience |
|------|-----------|----------|-----------|---------|
| 1–2 | $10 | Meta | Purchase | US women 25–45, skincare interests |
| 1–2 | $5 | TikTok | Video views / traffic | US broad, 18–45 |
| 3–4 | $15 | Meta | Purchase | Lookalike 1% of purchasers |
| 3–4 | $10 | Meta | Retarget | Add-to-cart, product viewers (last 14 days) |
| 4+ | Scale winner | Meta | Purchase | Scale winning ad set 20%/day |

**Spend Rule:** Never scale an ad set more than 20% per day. If ROAS drops below 1.5x, pause and iterate creative.

---

### Creative Testing Matrix

| Variable | Variant A | Variant B | Winner criteria |
|----------|-----------|-----------|----------------|
| Hook (first 3 sec) | Product close-up | Hand holding product | CTR ≥ 2.5% |
| Copy angle | "Tea-powered skincare" | "Clean beauty, delivered" | ROAS ≥ 2x |
| CTA | "Shop Now" | "Try Our Best Seller" | CVR on landing page |
| Format | 9:16 vertical video | 1:1 square video | CPM comparison |
| Audience | Women 25–35 | Women 35–50 | CPP comparison |

Test one variable at a time. Run each test for at least 3 days and $30 spend before drawing conclusions.

---

### Email Capture + Basic Flows

**Capture methods:**
- Footer newsletter form (10% off first order)
- Exit-intent popup (trigger: cursor moves toward browser top)
- Post-purchase "refer a friend" CTA

**Email Flow 1 — Welcome Series (3 emails)**

| # | Delay | Subject | Content |
|---|-------|---------|---------|
| 1 | Immediate | "Here's your 10% off code" | Welcome, intro to brand, code |
| 2 | Day 3 | "Why tea-powered skincare works" | Product education, how-to |
| 3 | Day 7 | "Real talk: what our customers are saying" | Social proof, FOMO, CTA |

**Email Flow 2 — Abandoned Cart (3 emails)**

| # | Delay | Subject | Content |
|---|-------|---------|---------|
| 1 | 1 hour | "Did something go wrong?" | Friendly reminder, cart link |
| 2 | 24 hours | "Your skincare is waiting" | Social proof + urgency |
| 3 | 3 days | "Last chance — here's 10% off" | Discount code, clear CTA |

**Email Flow 3 — Post-Purchase Refill Reminder**

| # | Delay | Subject | Content |
|---|-------|---------|---------|
| 1 | Day 25 | "Time to restock?" | Reorder link, bundle offer |
| 2 | Day 32 | "Stock up and save" | Bundle pitch, urgency |

---

### Retention Plan

| Tactic | Description | Tool |
|--------|-------------|------|
| Monthly restock reminder | Day 25 email to all purchasers | Mailchimp automation |
| Bundle upgrade offer | Post-purchase email day 3 | Mailchimp |
| Loyalty discount | After 2nd purchase, email a "VIP" code: 15% off | Manual segment → Mailchimp |
| Referral program | Share link → friend gets 10%, you get $5 credit | ReferralCandy or manual |
| Re-engagement sequence | Customers silent for 45 days → "We miss you" + 15% off | Mailchimp segment |
