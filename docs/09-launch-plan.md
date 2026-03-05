# 9 — Launch Plan

## 7-Day Launch Timeline

### Day 1 — Infrastructure & WordPress Install

**Tasks:**

- [ ] Provision server (Hetzner CX22 or equivalent)
- [ ] Point domain DNS A-record to server IP (TTL 300)
- [ ] Run server prerequisites from [04-technical-build.md §4A](04-technical-build.md)
- [ ] Install WP-CLI
- [ ] Run WordPress install commands (§4B)
- [ ] Configure Nginx virtual host (§4C)
- [ ] Issue SSL certificate with Certbot (§4C)

**Completion Criteria:**

- `https://DOMAIN` loads the WordPress default homepage with padlock ✅
- WP Admin accessible at `https://DOMAIN/wp-admin` ✅

---

### Day 2 — WooCommerce + Plugins + Theme

**Tasks:**

- [ ] Install WooCommerce and all plugins (§4D)
- [ ] Install Astra theme (§4E)
- [ ] Create all pages (§4F)
- [ ] Run all WooCommerce settings commands (§4G)
- [ ] Configure Nginx for WooCommerce (larger upload limit, caching headers)

**Completion Criteria:**

- Shop page renders at `https://DOMAIN/shop` ✅
- All 11 pages exist with correct slugs ✅
- WooCommerce setup wizard shows as complete ✅

---

### Day 3 — Products, Images & Payments

**Tasks:**

- [ ] Order product samples from supplier (CJDropshipping or AliExpress)
- [ ] Create 3 products via REST API or WP-CLI (§05)
- [ ] Upload product images (placeholder until samples arrive)
- [ ] Configure Stripe (Admin UI — requires Stripe account + API keys)
- [ ] Configure PayPal (Admin UI — requires PayPal client ID/secret)
- [ ] Set up shipping zones (Admin UI: US zone, free $35+, flat $4.99)
- [ ] Place a test order end-to-end (use Stripe test mode)

**Completion Criteria:**

- All 3 products visible in Shop ✅
- Test order completes successfully ✅
- Order confirmation email received ✅

---

### Day 4 — Brand, Copy & SEO

**Tasks:**

- [ ] Apply brand colors and fonts in Astra Customizer
- [ ] Paste homepage hero copy from [07-site-copy-templates.md](07-site-copy-templates.md)
- [ ] Paste product page copy for all 3 products
- [ ] Paste copy into Shipping, Returns, FAQ, Contact pages
- [ ] Add Privacy Policy and Terms of Service (use WooCommerce's auto-generate or a free generator)
- [ ] Configure Rank Math: set focus keyword per page, write meta descriptions
- [ ] Submit XML sitemap to Google Search Console

**Completion Criteria:**

- All pages have unique copy and meta descriptions ✅
- Google Search Console property created and sitemap submitted ✅
- No broken links (check with a free crawler like Screaming Frog lite) ✅

---

### Day 5 — Email, Tracking & Pixels

**Tasks:**

- [ ] Connect WP Mail SMTP to Gmail or SendGrid (Admin UI)
- [ ] Send a test email — verify delivery ✅
- [ ] Create Mailchimp account, create audience, embed signup form in footer
- [ ] Set up GA4 property and connect via Site Kit
- [ ] Install and configure Meta Pixel via PixelYourSite
- [ ] Install and configure TikTok Pixel via plugin
- [ ] Verify all events fire on a test purchase (Stripe test mode)
- [ ] Set up 3 email automations in Mailchimp:
  1. Welcome email (trigger: new subscriber)
  2. Abandoned cart (trigger: 1-hour after cart abandonment — requires Mailchimp + WooCommerce integration)
  3. Post-purchase refill reminder (trigger: 25 days after purchase date)

**Completion Criteria:**

- Welcome email auto-fires on form submit ✅
- GA4 Realtime shows sessions ✅
- Meta Events Manager shows PageView events ✅

---

### Day 6 — Content, Organic Social & Pre-Launch

**Tasks:**

- [ ] Generate logo using AI prompt from [10-ai-asset-prompts.md](10-ai-asset-prompts.md)
- [ ] Generate 5 product mockups and 5 lifestyle images using AI prompts
- [ ] Create Instagram and TikTok accounts: @latherloop
- [ ] Post 3 organic pieces of content:
  1. "Coming soon" teaser — behind the scenes of pods
  2. Product reveal video (15-second loop)
  3. "How to use" Reel/TikTok
- [ ] Set up Meta Business Suite → create Ad Account → add payment method
- [ ] Create first Meta ad campaign in draft (do not publish yet)
- [ ] Final pre-launch QA: mobile responsiveness, checkout flow, email confirmations

**Completion Criteria:**

- 3 pieces of organic content posted ✅
- First Meta ad campaign in draft ✅
- Mobile checkout works on iPhone + Android ✅

---

### Day 7 — Launch Day 🚀

**Tasks:**

- [ ] Remove any "Coming Soon" or maintenance mode
- [ ] Publish first Meta ad campaign: $10/day, US women 25–45, interest-based
- [ ] Publish first TikTok ad campaign: $5/day, US, broad + skincare interests
- [ ] Post launch-day organic content on Instagram + TikTok
- [ ] Email any pre-launch subscribers with launch announcement + 10% off code
- [ ] Monitor orders, pixel events, and ad spend throughout the day
- [ ] Respond to any DMs or comments within 2 hours

**Completion Criteria:**

- Site is live and taking orders ✅
- At least 1 paid ad is live ✅
- First organic post gets ≥ 100 views ✅

---

## 30-Day Growth Plan

### Organic Content Cadence

| Platform         | Frequency | Content Types                                                         |
| ---------------- | --------- | --------------------------------------------------------------------- |
| Instagram Reels  | 4×/week   | Pod dissolving, skincare routine, UGC reposts, "did you know?"        |
| Instagram Feed   | 3×/week   | Product flat lays, lifestyle shots, testimonial graphics              |
| TikTok           | Daily     | Short-form (8–15 sec): satisfying pod foam, GRWM clips, routine hacks |
| Pinterest        | 3×/week   | Product pins with keywords, lifestyle boards                          |
| Email newsletter | 1×/week   | Tips, refill reminder, product feature, social proof                  |

**Content pillar rotation (repeat weekly):**

1. **Product** — show the pod, how it works, what's in the box
2. **Lifestyle** — morning routines, travel, clean beauty aesthetics
3. **Social proof** — customer reviews, UGC, testimonials
4. **Education** — skincare tips, ingredient info, eco-consciousness
5. **Promotion** — weekly offer, bundle deals, urgency

---

### Paid Test Plan ($5–$20/day)

| Week | Budget/day   | Platform | Objective             | Audience                                    |
| ---- | ------------ | -------- | --------------------- | ------------------------------------------- |
| 1–2  | $10          | Meta     | Purchase              | US women 25–45, skincare interests          |
| 1–2  | $5           | TikTok   | Video views / traffic | US broad, 18–45                             |
| 3–4  | $15          | Meta     | Purchase              | Lookalike 1% of purchasers                  |
| 3–4  | $10          | Meta     | Retarget              | Add-to-cart, product viewers (last 14 days) |
| 4+   | Scale winner | Meta     | Purchase              | Scale winning ad set 20%/day                |

**Spend Rule:** Never scale an ad set more than 20% per day. If ROAS drops below 1.5×, pause and iterate creative.

---

### Creative Testing Matrix

| Variable           | Variant A               | Variant B                    | Winner criteria     |
| ------------------ | ----------------------- | ---------------------------- | ------------------- |
| Hook (first 3 sec) | Pod dissolving close-up | Hand holding pod before foam | CTR ≥ 2.5%          |
| Copy angle         | "Zero plastic bottle"   | "One pod = one perfect wash" | ROAS ≥ 2×           |
| CTA                | "Shop Now"              | "Try the Starter Pack"       | CVR on landing page |
| Format             | 9:16 vertical video     | 1:1 square video             | CPM comparison      |
| Audience           | Women 25–35             | Women 35–50                  | CPP comparison      |

Test one variable at a time. Run each test for at least 3 days and $30 spend before drawing conclusions.

---

### Email Capture + Basic Flows

**Capture methods:**

- Footer newsletter form (10% off first order)
- Exit-intent popup (trigger: cursor moves toward browser top) — use OptinMonster Free or ConvertBox
- Post-purchase "refer a friend" CTA: "Share with a friend, they get 10% off, you get $5 credit"

**Email Flow 1 — Welcome Series (3 emails)**

| #   | Delay     | Subject                                         | Content                       |
| --- | --------- | ----------------------------------------------- | ----------------------------- |
| 1   | Immediate | "Here's your 10% off code 🎉"                   | Welcome, intro to brand, code |
| 2   | Day 3     | "How LatherLoop works (and why it's different)" | Product education, how-to     |
| 3   | Day 7     | "Real talk: what our customers are saying"      | Social proof, FOMO, CTA       |

**Email Flow 2 — Abandoned Cart (3 emails)**

| #   | Delay    | Subject                        | Content                      |
| --- | -------- | ------------------------------ | ---------------------------- |
| 1   | 1 hour   | "Did something go wrong?"      | Friendly reminder, cart link |
| 2   | 24 hours | "Your pods are waiting 🫧"     | Social proof + urgency       |
| 3   | 3 days   | "Last chance — here's 10% off" | Discount code, clear CTA     |

**Email Flow 3 — Post-Purchase Refill Reminder**

| #   | Delay  | Subject                                      | Content                            |
| --- | ------ | -------------------------------------------- | ---------------------------------- |
| 1   | Day 25 | "Running low on pods?"                       | Reorder link, bundle upgrade offer |
| 2   | Day 32 | "Stock up and save — 3-month supply 24% off" | Bundle pitch, urgency              |

---

### Retention Plan (Refill / Bundles)

| Tactic                      | Description                                                            | Tool                              |
| --------------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| Monthly refill reminder     | Day 25 email to all Starter Pack purchasers                            | Mailchimp automation              |
| Bundle upgrade offer        | Post-purchase email day 3: "Love it? Save 24% with the 3-month supply" | Mailchimp                         |
| Loyalty discount            | After 2nd purchase, email a "VIP" code: 15% off any order              | Manual segment → Mailchimp        |
| "Friends & Family" referral | Share link → friend gets 10%, you get $5 store credit                  | ReferralCandy free tier or manual |
| Re-engagement sequence      | Customers silent for 45 days → "We miss you" email + 15% off           | Mailchimp segment                 |
| Seasonal bundle             | Q4: "Holiday gift set" (2× Starter Pack + Travel Case) in a gift box   | WooCommerce grouped product       |
