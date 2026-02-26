# 8 — Tracking & Analytics

## Minimum Viable Tracking Plan

You need exactly four data streams before launch:

| # | Stream | Tool | Cost |
|---|--------|------|------|
| 1 | Site analytics + ecommerce funnel | GA4 | Free |
| 2 | Ad attribution (paid social) | Meta Pixel + TikTok Pixel | Free |
| 3 | Email performance | Mailchimp / Klaviyo | Free tier |
| 4 | WooCommerce revenue | WooCommerce Reports (built-in) | Free |

---

## GA4 Setup Checklist

- [ ] Create a GA4 property at [analytics.google.com](https://analytics.google.com)
- [ ] Create a data stream → Web → enter your domain
- [ ] Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
- [ ] Install **Site Kit by Google** plugin (already installed in step 4D)
- [ ] In WP Admin → Site Kit → Connect Google Analytics → paste Measurement ID
- [ ] Enable **Enhanced Measurement** (toggle on in GA4 data stream settings):
  - Page views ✅
  - Scrolls ✅
  - Outbound clicks ✅
  - Site search ✅
  - Video engagement ✅
  - File downloads ✅
- [ ] Enable **Ecommerce tracking** in GA4:
  - GA4 → Admin → Data Streams → [your stream] → Enhanced Measurement → toggle off "Form interactions" (reduces noise)
  - Install **WooCommerce Google Analytics Integration** plugin:

```bash
wp plugin install woocommerce-google-analytics-integration --activate --allow-root
```

  - Go to WooCommerce → Settings → Integration → Google Analytics → enter Measurement ID → enable "Add to cart events" + "Purchase events"
- [ ] Verify in GA4 → Realtime → open your site in another tab, verify events firing
- [ ] Create a GA4 **Conversion** event:
  - GA4 → Admin → Events → Mark `purchase` as a conversion

---

## Meta (Facebook/Instagram) Pixel Setup Checklist

- [ ] Create a Meta Business account at [business.facebook.com](https://business.facebook.com)
- [ ] Create a Pixel: Events Manager → Connect Data Sources → Web → Meta Pixel
- [ ] Copy the **Pixel ID** (16-digit number)
- [ ] Install **PixelYourSite** (free plugin):

```bash
wp plugin install pixelyoursite --activate --allow-root
```

- [ ] In WP Admin → PixelYourSite → enter Pixel ID
- [ ] Enable WooCommerce events:
  - ViewContent ✅
  - AddToCart ✅
  - InitiateCheckout ✅
  - Purchase ✅
- [ ] Set up **Meta Conversions API** (server-side, reduces iOS signal loss):
  - In PixelYourSite Pro (paid) OR manually via Meta's partner setup
  - Free alternative: use Meta's native Conversions API Gateway (no code required — [see Meta docs](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started))
- [ ] Test in Events Manager → Test Events → verify purchase event fires on a test order
- [ ] Create Custom Audiences:
  - All website visitors (last 180 days)
  - Product viewers (last 30 days)
  - Add to cart (last 14 days)
  - Purchasers (all time)
- [ ] Create Lookalike Audience from Purchasers (1%, 2%, 3% US)

---

## TikTok Pixel Setup Checklist

- [ ] Create TikTok Business account at [ads.tiktok.com](https://ads.tiktok.com)
- [ ] Go to Assets → Events → Web Events → Manage → Create Pixel
- [ ] Choose **TikTok Pixel** setup → Manual install
- [ ] Copy Pixel ID
- [ ] Install **TikTok for WooCommerce** plugin:

```bash
wp plugin install tiktok --activate --allow-root
```

- [ ] Go to WP Admin → TikTok → Connect → follow OAuth flow
- [ ] Verify events: ViewContent, AddToCart, InitiateCheckout, PlaceAnOrder
- [ ] Enable **TikTok Events API** (reduces signal loss, similar to Meta CAPI) — configured in the plugin settings

---

## UTM Naming Convention

Format: `utm_source / utm_medium / utm_campaign / utm_content / utm_term`

### Source Values

| Channel | `utm_source` |
|---------|-------------|
| Facebook feed ad | `facebook` |
| Instagram ad | `instagram` |
| TikTok ad | `tiktok` |
| Google Search | `google` |
| Email (Mailchimp) | `mailchimp` |
| Organic social (manual link) | `instagram-organic` |
| Influencer | `influencer` |

### Medium Values

| Type | `utm_medium` |
|------|-------------|
| Paid social | `paid-social` |
| Paid search | `cpc` |
| Email | `email` |
| Organic social | `social` |
| Influencer / UGC | `influencer` |

### Campaign Naming Template

`[PRODUCT]-[OBJECTIVE]-[AUDIENCE]-[DATE]`

Examples:
- `starter6-purchase-lookalike1pct-2024q1`
- `starter6-purchase-retarget-atc-2024q1`
- `bundle18-purchase-purchasers-lal-2024q2`

### UTM Builder Snippet

```bash
# Generate a UTM URL quickly
BASE="https://DOMAIN/product/latherloop-daily-wash-pods-starter-pack"
SOURCE="facebook"
MEDIUM="paid-social"
CAMPAIGN="starter6-purchase-cold-2024q1"
CONTENT="video-v1"
echo "${BASE}/?utm_source=${SOURCE}&utm_medium=${MEDIUM}&utm_campaign=${CAMPAIGN}&utm_content=${CONTENT}"
```

---

## KPI List — Weeks 1–4

### Week 1 (Validation)

| KPI | Target | Tool |
|-----|--------|------|
| Sessions | ≥ 200 | GA4 |
| Add-to-cart rate | ≥ 5% | GA4 / WooCommerce |
| Checkout initiation rate | ≥ 2% | GA4 |
| First purchase (any) | ≥ 1 | WooCommerce |
| Email subscribers | ≥ 20 | Mailchimp |
| Pixel events firing | 100% | Meta Events Manager |

### Week 2 (First Paid Test)

| KPI | Target | Tool |
|-----|--------|------|
| Cost per click (CPC) | < $1.50 | Meta Ads Manager |
| Cost per add-to-cart | < $5 | Meta Ads Manager |
| Cost per purchase (CPP) | < $25 | Meta Ads Manager |
| ROAS | ≥ 1.4× | Meta Ads Manager |
| Email open rate | ≥ 30% | Mailchimp |

### Week 3 (Optimization)

| KPI | Target | Tool |
|-----|--------|------|
| ROAS | ≥ 1.8× | Meta / TikTok |
| Returning visitor rate | ≥ 15% | GA4 |
| Cart abandonment rate | < 70% | GA4 / WooCommerce |
| Average order value (AOV) | ≥ $38 | WooCommerce |

### Week 4 (Scale)

| KPI | Target | Tool |
|-----|--------|------|
| ROAS | ≥ 2.0× | Meta / TikTok |
| Revenue (cumulative) | ≥ $500 | WooCommerce |
| Email list size | ≥ 100 | Mailchimp |
| Repeat purchase rate | ≥ 10% | WooCommerce |
| Customer acquisition cost (CAC) | < $18 | Calculated |
