# 8 — Tracking & Analytics

## Minimum Viable Tracking Plan

You need exactly four data streams before launch:

| # | Stream | Tool | Cost |
|---|--------|------|------|
| 1 | Site analytics + ecommerce funnel | GA4 | Free |
| 2 | Ad attribution (paid social) | Meta Pixel + TikTok Pixel | Free |
| 3 | Email performance | Mailchimp / Klaviyo | Free tier |
| 4 | Revenue tracking | Stripe Dashboard | Free |

---

## GA4 Setup Checklist

- [ ] Create a GA4 property at [analytics.google.com](https://analytics.google.com)
- [ ] Create a data stream → Web → enter `facetea.org`
- [ ] Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
- [ ] Add the GA4 script tag to `index.html`, `success.html`, `cancel.html`, `privacy.html`, and `terms.html` — paste in the `<head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

- [ ] Enable **Enhanced Measurement** (toggle on in GA4 data stream settings):
  - Page views
  - Scrolls
  - Outbound clicks
  - Site search
- [ ] Fire ecommerce events from `script.js`:
  - `add_to_cart` — when a product is added
  - `begin_checkout` — when checkout button is clicked
  - On `success.html`, fire a `purchase` event (pass order data via URL params or Stripe session)
- [ ] Verify in GA4 → Realtime → open your site in another tab, verify events firing
- [ ] Create a GA4 **Conversion** event:
  - GA4 → Admin → Events → Mark `purchase` as a conversion

---

## Meta (Facebook/Instagram) Pixel Setup Checklist

- [ ] Create a Meta Business account at [business.facebook.com](https://business.facebook.com)
- [ ] Create a Pixel: Events Manager → Connect Data Sources → Web → Meta Pixel
- [ ] Copy the **Pixel ID** (16-digit number)
- [ ] Add the Meta Pixel base code to the `<head>` of all HTML pages:

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

- [ ] Fire events from `script.js`:
  - `ViewContent` — on product view
  - `AddToCart` — on add to cart
  - `InitiateCheckout` — on checkout click
  - `Purchase` — on `success.html` load
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
- [ ] Add TikTok Pixel base code to the `<head>` of all HTML pages:

```html
<script>
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
    ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
    for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
    ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
    ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
    var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
    var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load('YOUR_PIXEL_ID');
    ttq.page();
  }(window, document, 'ttq');
</script>
```

- [ ] Fire events from `script.js`:
  - `ViewContent`, `AddToCart`, `InitiateCheckout`, `PlaceAnOrder`
- [ ] Enable **TikTok Events API** for better signal (configured in TikTok Ads Manager)

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
- `serum-purchase-lookalike1pct-2026q1`
- `serum-purchase-retarget-atc-2026q1`
- `toner-purchase-purchasers-lal-2026q2`

### UTM Builder Snippet

```bash
# Generate a UTM URL quickly
BASE="https://facetea.org"
SOURCE="facebook"
MEDIUM="paid-social"
CAMPAIGN="serum-purchase-cold-2026q1"
CONTENT="video-v1"
echo "${BASE}/?utm_source=${SOURCE}&utm_medium=${MEDIUM}&utm_campaign=${CAMPAIGN}&utm_content=${CONTENT}"
```

---

## KPI List — Weeks 1–4

### Week 1 (Validation)

| KPI | Target | Tool |
|-----|--------|------|
| Sessions | ≥ 200 | GA4 |
| Add-to-cart rate | ≥ 5% | GA4 |
| Checkout initiation rate | ≥ 2% | GA4 |
| First purchase (any) | ≥ 1 | Stripe |
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
| Cart abandonment rate | < 70% | GA4 |
| Average order value (AOV) | ≥ $38 | Stripe |

### Week 4 (Scale)

| KPI | Target | Tool |
|-----|--------|------|
| ROAS | ≥ 2.0× | Meta / TikTok |
| Revenue (cumulative) | ≥ $500 | Stripe |
| Email list size | ≥ 100 | Mailchimp |
| Repeat purchase rate | ≥ 10% | Stripe |
| Customer acquisition cost (CAC) | < $18 | Calculated |
