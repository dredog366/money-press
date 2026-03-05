# FaceTea Shop — WooCommerce Quick-Start Setup

This is a step-by-step guide to get your WooCommerce store at `dgrelli-bopge.wpcomstaging.com` fully operational. Do each step in order.

---

## Phase 1: WooCommerce Core Setup (15 min)

### 1.1 Install WooCommerce
1. WordPress Admin > **Plugins > Add New**
2. Search "WooCommerce" > **Install** > **Activate**
3. Complete the Setup Wizard:
   - Store location: United States
   - Industry: Health and beauty
   - Product types: Physical products
   - Skip the optional themes/plugins for now

### 1.2 General Settings
Go to **WooCommerce > Settings > General**:
- Selling location: Sell to United States
- Shipping location: Ship to United States
- Default customer location: Shop base address
- Currency: United States Dollar ($)
- Currency position: Left
- Thousand separator: `,`
- Decimal separator: `.`
- Number of decimals: `2`

### 1.3 Products Settings
**WooCommerce > Settings > Products**:
- Shop page: Select "Shop" (auto-created)
- Weight unit: oz
- Dimensions unit: in
- Enable reviews: Yes
- Enable star rating: Yes

### 1.4 Tax Settings
**WooCommerce > Settings > Tax**:
- Enable tax calculations: Yes
- Prices entered with tax: No, I will enter prices exclusive of tax
- Calculate tax based on: Customer shipping address
- Display prices in the shop: Excluding tax
- Display prices during cart and checkout: Including tax

For automatic US tax calculation, install the free **WooCommerce Tax** extension:
1. Go to **WooCommerce > Extensions**
2. Search "WooCommerce Tax" (by Automattic)
3. Install and activate — it auto-calculates rates by ZIP code

---

## Phase 2: Shipping Setup (10 min)

Go to **WooCommerce > Settings > Shipping**:

### 2.1 Create Shipping Zone
1. Click **Add shipping zone**
2. Zone name: `United States`
3. Zone regions: Select "United States (US)"

### 2.2 Add Shipping Methods
Inside the US zone, add these methods:

**Free Shipping:**
- Click "Add shipping method" > Free Shipping
- Edit: Requires "A minimum order amount"
- Minimum order amount: `50.00`

**Flat Rate:**
- Click "Add shipping method" > Flat Rate
- Cost: `4.99`
- Name: "Standard Shipping"

**Flat Rate (Expedited):**
- Click "Add shipping method" > Flat Rate
- Cost: `7.99`
- Name: "Expedited Shipping (3-5 business days)"

---

## Phase 3: Payment Setup (10 min)

Go to **WooCommerce > Settings > Payments**:

### 3.1 WooCommerce Payments (Recommended)
1. Click **Set up** next to WooCommerce Payments
2. Follow the wizard to connect your bank account
3. Accepts: Visa, Mastercard, Amex, Discover, Apple Pay, Google Pay
4. Fees: 2.9% + $0.30 per transaction (standard)

### 3.2 PayPal (Optional but recommended)
1. Click **Set up** next to PayPal
2. Enter your PayPal business email
3. Enable: PayPal Standard

---

## Phase 4: Import Products (5 min)

### 4.1 Import via CSV
1. Go to **Products > All Products**
2. Click **Import** at the top
3. Upload: `woocommerce/products-import.csv` from this repo
4. Map the columns (WooCommerce auto-detects most)
5. Click **Run the importer**

### 4.2 After Import — Add Images
For each product:
1. Click **Edit** on the product
2. On the right sidebar, click **Set product image**
3. Upload a product photo or use an AI-generated image
4. Also add 2-3 gallery images if available
5. Click **Update**

**Tip:** Use AI image generators (Midjourney, DALL-E, etc.) with prompts like:
- "Product photo of a green tea serum bottle, minimalist, white background, luxury skincare aesthetic"
- "Flat lay of chamomile face wash with chamomile flowers, clean background, product photography"

---

## Phase 5: Create Pages (15 min)

### 5.1 Required Pages (auto-created by WooCommerce)
Verify these exist under **Pages**:
- Shop
- Cart
- Checkout
- My Account

### 5.2 Create These Pages Manually

**About Page:**
1. Pages > Add New
2. Title: "About"
3. Paste the about content from the index.html or write your own
4. Publish

**Contact Page:**
1. Pages > Add New
2. Title: "Contact Us"
3. Add a Contact Form 7 shortcode or simple text with email
4. Publish

**Shipping & Delivery Page:**
1. Pages > Add New
2. Title: "Shipping & Delivery"
3. Copy content from `docs/07-site-copy-templates.md` (Shipping section)
4. Replace `DOMAIN` with `facetea.org`
5. Publish

**Returns & Refunds Page:**
1. Pages > Add New
2. Title: "Returns & Refunds"
3. Copy content from `docs/07-site-copy-templates.md` (Returns section)
4. Replace `DOMAIN` with `facetea.org`
5. Publish

**FAQ Page:**
1. Pages > Add New
2. Title: "FAQ"
3. Copy the FAQ content (use Accordion blocks if available)
4. Replace `DOMAIN` with `facetea.org`
5. Publish

**Privacy Policy:**
1. Go to **Settings > Privacy** and edit the auto-generated page
2. Customize with content from `privacy.html`

---

## Phase 6: Theme & Branding (15 min)

### 6.1 Theme Selection
Go to **Appearance > Themes**:
- Recommended: **Astra** (lightweight, WooCommerce-optimized)
- Install and activate

### 6.2 Customize Branding
Go to **Appearance > Customize**:

**Site Identity:**
- Site Title: `FaceTea Shop`
- Tagline: `Tea-Powered Skincare, Delivered to Your Door`
- Upload a logo (or use text logo for now)
- Upload a favicon (tea emoji or custom icon)

**Colors:**
- Primary: `#2d6a4f` (deep green)
- Secondary/Accent: `#d4a373` (warm gold)
- Body text: `#2b2d42` (dark charcoal)
- Background: `#ffffff` (white)

**Typography:**
- Headings: System default or "DM Serif Display"
- Body: System default or "Inter"

### 6.3 Navigation Menu
**Appearance > Menus:**
1. Create a "Primary Menu"
2. Add items:
   - Shop → `/shop`
   - About → `/about`
   - Shipping → `/shipping`
   - FAQ → `/faq`
   - Contact → `/contact`
3. Set as "Primary Menu" location

### 6.4 Homepage Setup
**Settings > Reading:**
- Select "A static page"
- Homepage: Create a new page called "Home"
- On the Home page, add blocks:
  - Cover block (hero) with heading + Shop Now button
  - Products block (Best Selling or Featured)
  - About section
  - Newsletter signup (if you have a Mailchimp plugin)

---

## Phase 7: Essential Plugins (10 min)

Install these from **Plugins > Add New**:

| Plugin | Purpose | Free? |
|--------|---------|-------|
| WooCommerce | Core e-commerce | Yes |
| WooCommerce Payments | Accept cards | Yes |
| Rank Math SEO | SEO optimization | Yes |
| WP Mail SMTP | Reliable email delivery | Yes |
| Cookie Notice | GDPR cookie consent banner | Yes |

**For Rank Math SEO — after activation:**
1. Run the setup wizard
2. Set homepage title: `FaceTea Shop — Tea-Powered Skincare, Delivered to Your Door`
3. Set homepage description: `Discover premium tea-infused skincare products. Green tea serums, chamomile cleansers, matcha masks and more. Free shipping on orders over $50.`

---

## Phase 8: Email Configuration (10 min)

### 8.1 WooCommerce Emails
Go to **WooCommerce > Settings > Emails**:

Configure these notifications:
- **New order** (to you): Enable, set "Recipient" to your email
- **Processing order** (to customer): Enable
- **Completed order** (to customer): Enable
- **Refunded order** (to customer): Enable

For each email:
- Set "From" name: `FaceTea Shop`
- Set "From" address: `support@facetea.org` (or your email)
- Header image: Upload your logo
- Footer text: `FaceTea Shop — Tea-Powered Skincare`
- Base color: `#2d6a4f`

### 8.2 WP Mail SMTP
1. Go to **WP Mail SMTP > Settings**
2. Choose "Other SMTP" or your email provider
3. Configure so order emails are reliably delivered

---

## Phase 9: Test Everything (15 min)

### 9.1 Place a Test Order
1. Add products to cart on your store
2. Go through checkout
3. Use WooCommerce Payments test mode or PayPal sandbox
4. Verify:
   - Order confirmation email received
   - Order appears in WooCommerce > Orders
   - Cart is cleared after purchase

### 9.2 Test on Different Devices
- Desktop: Chrome, Safari, Firefox
- Mobile: iPhone Safari, Android Chrome
- Tablet if possible

### 9.3 Check All Links
- Product pages load correctly
- Cart add/remove works
- All menu links work
- Footer links work
- Contact form submits

### 9.4 Refund the Test Order
After confirming everything works, refund the test order from WooCommerce > Orders.

---

## Phase 10: Go Live!

1. Connect `facetea.org` domain (see `docs/domain-connection.md`)
2. Disable WooCommerce Payments test mode
3. Set up Google Analytics (via Rank Math or Site Kit plugin)
4. Submit sitemap to Google Search Console
5. Announce your store!

---

## Total Setup Time: ~90 minutes

Follow the deploy checklist (`docs/deploy-checklist.md`) to make sure nothing is missed.
