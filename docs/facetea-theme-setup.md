# FaceTea Shop — WordPress/WooCommerce Theme Setup Guide

This guide walks you through setting up your WordPress site at `dgrelli-bopge.wpcomstaging.com` with FaceTea Shop branding and WooCommerce.

---

## 1. Activate WooCommerce

1. Go to **Plugins > Add New** in your WordPress dashboard
2. Search for **WooCommerce**
3. Click **Install Now**, then **Activate**
4. The WooCommerce Setup Wizard will launch — follow these steps:
   - **Store details:** Enter your business address (used for tax/shipping calculations)
   - **Industry:** Select "Health and beauty"
   - **Product types:** Select "Physical products"
   - **Business details:** Fill in as appropriate
   - **Theme:** Keep your current theme or choose one (see below)

---

## 2. Theme Selection & Branding

### Recommended Free Themes (WordPress.com compatible)
- **Astra** — lightweight, fast, WooCommerce-optimized
- **flavor** — modern storefront theme
- **flavor** — If your plan supports it, the default **flavor** theme works well

### Brand Colors (FaceTea Shop)
Apply these in **Appearance > Customize > Colors**:

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary (buttons, links) | Deep Green | `#2d6a4f` |
| Secondary (accents) | Warm Gold | `#d4a373` |
| Background | Off-White | `#fefae0` |
| Text | Dark Charcoal | `#2b2d42` |
| Footer Background | Dark Green | `#1b4332` |

### Fonts
- **Headings:** Use a clean serif like "Playfair Display" or "DM Serif Display"
- **Body:** Use a readable sans-serif like "Inter", "DM Sans", or the theme default

### Logo
- Go to **Appearance > Customize > Site Identity**
- Upload your FaceTea Shop logo
- Set **Site Title** to: `FaceTea Shop`
- Set **Tagline** to: `Tea-Powered Skincare, Delivered to Your Door`

---

## 3. Homepage Setup

### Set a Static Homepage
1. Go to **Settings > Reading**
2. Select **"A static page"**
3. Set **Homepage** to your custom homepage (create one if needed)
4. Set **Posts page** to "Blog" (or leave blank)

### Homepage Sections (using your theme's page builder or blocks)

**Hero Section:**
- Heading: `Tea-Powered Skincare, Delivered to Your Door`
- Subtext: `Discover our collection of premium tea-infused skincare products — crafted to brighten, calm and hydrate.`
- Button: `Shop Now` → links to `/shop`

**Trust Badges (Icon + Text blocks):**
- Free Shipping on orders over $50
- Secure Checkout — 256-bit SSL
- 30-Day Returns — hassle-free
- 24/7 Support — always here to help

**Featured Products:**
- Use the WooCommerce block **"Featured Products"** or **"Best Selling Products"**
- Display 4–8 products in a grid

**About Section:**
- Heading: `About FaceTea Shop`
- Text: `FaceTea Shop is your destination for tea-powered skincare. We harness the natural antioxidants and botanicals found in green tea, white tea, oolong and chamomile to create gentle, effective formulas for every skin type.`

**Newsletter Section:**
- Heading: `Get 10% Off Your First Order`
- Subtext: `Subscribe to our newsletter for exclusive deals and new arrivals.`
- Use a newsletter plugin like Mailchimp for WooCommerce or a simple contact form

---

## 4. Navigation Menu

Go to **Appearance > Menus** and create a primary menu:

| Label | Link |
|-------|------|
| Shop | `/shop` (WooCommerce shop page) |
| About | `/about` or anchor to about section |
| Contact | `/contact` |

Optional secondary items:
- My Account → `/my-account`
- Cart → `/cart`

---

## 5. WooCommerce Settings

### General (WooCommerce > Settings > General)
- **Store Address:** Your business address
- **Currency:** USD ($)
- **Selling locations:** Sell to United States (expand later)

### Products (WooCommerce > Settings > Products)
- **Shop page:** Set to your "Shop" page
- **Weight unit:** oz
- **Dimensions unit:** in

### Shipping (WooCommerce > Settings > Shipping)
Create a **Shipping Zone** for "United States":

| Method | Condition | Cost |
|--------|-----------|------|
| Free Shipping | Orders $50+ | $0 |
| Flat Rate | Under $50 | $4.99 |

### Payments (WooCommerce > Settings > Payments)
WordPress.com supports:
- **WooCommerce Payments** (built-in, powered by Stripe) — recommended
- **PayPal Standard**
- **Stripe** (if you install the Stripe plugin)

Enable **WooCommerce Payments** and follow the setup wizard to connect your bank account.

### Tax (WooCommerce > Settings > Tax)
- Enable tax calculations
- Set tax based on **Customer shipping address**
- For US sales, enable the **WooCommerce Tax** extension (free, auto-calculates rates)

---

## 6. Essential Pages

WooCommerce auto-creates some pages. Verify these exist under **Pages**:

| Page | URL | Notes |
|------|-----|-------|
| Shop | `/shop` | Product listing — auto-created |
| Cart | `/cart` | Auto-created |
| Checkout | `/checkout` | Auto-created |
| My Account | `/my-account` | Auto-created |
| About | `/about` | Create manually |
| Contact | `/contact` | Create manually with contact form |
| Shipping & Delivery | `/shipping` | Create manually — copy from docs/07-site-copy-templates.md |
| Returns & Refunds | `/returns` | Create manually — copy from docs/07-site-copy-templates.md |
| FAQ | `/faq` | Create manually — copy from docs/07-site-copy-templates.md |
| Privacy Policy | `/privacy-policy` | WordPress default; customize for your store |

---

## 7. Import Products

1. Go to **Products > All Products**
2. Click **Import** at the top
3. Upload the file: `woocommerce/products-import.csv`
4. Map columns when prompted (WooCommerce should auto-detect most fields)
5. Click **Run the importer**
6. After import, go through each product and:
   - Upload a product image (use AI-generated images or stock photos)
   - Set a product gallery if you have multiple angles
   - Verify the price, description, and category are correct

---

## 8. Footer Setup

Go to **Appearance > Customize > Footer** (or Widgets):

- **Footer text:** `© 2026 FaceTea Shop. All rights reserved.`
- **Footer links:** Shop | About | Contact | Privacy Policy | Terms of Service
- **Social links:** Add your social media URLs when ready
