# 4 — Technical Build Plan (CLI-First)

All commands use the placeholders defined in [01-assumptions.md](01-assumptions.md).  
Replace every `PLACEHOLDER` before running.

---

## 4A — Server Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install all required packages in one shot
sudo apt install -y \
  nginx \
  php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-curl \
  php8.2-gd php8.2-mbstring php8.2-zip php8.2-intl \
  php8.2-bcmath php8.2-soap php8.2-imagick \
  mysql-server \
  certbot python3-certbot-nginx \
  curl unzip git wget rsync

# Start & enable services
sudo systemctl enable --now nginx php8.2-fpm mysql

# Secure MySQL
sudo mysql_secure_installation

# Install WP-CLI
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/local/bin/wp
wp --info   # should print WP-CLI version
```

---

## 4B — WordPress Install via WP-CLI

```bash
# ── 1. Create the web root ──────────────────────────────────────────────────
sudo mkdir -p /var/www/DOMAIN
sudo chown -R www-data:www-data /var/www/DOMAIN
sudo chmod -R 755 /var/www/DOMAIN

# Work as www-data for all WP-CLI commands (or use --allow-root if root)
cd /var/www/DOMAIN

# ── 2. Download WordPress core ──────────────────────────────────────────────
wp core download --allow-root

# ── 3. Create the database and user ─────────────────────────────────────────
sudo mysql -u root -p <<'SQL'
CREATE DATABASE IF NOT EXISTS DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'DB_USER'@'localhost' IDENTIFIED BY 'DB_PASS';
GRANT ALL PRIVILEGES ON DB_NAME.* TO 'DB_USER'@'localhost';
FLUSH PRIVILEGES;
SQL

# ── 4. Create wp-config.php ─────────────────────────────────────────────────
wp config create \
  --dbname=DB_NAME \
  --dbuser=DB_USER \
  --dbpass=DB_PASS \
  --dbhost=DB_HOST \
  --dbprefix=ll_ \
  --allow-root

# Add security keys automatically
wp config shuffle-salts --allow-root

# ── 5. Run WordPress core install ───────────────────────────────────────────
wp core install \
  --url="https://DOMAIN" \
  --title="SITE_TITLE" \
  --admin_user="ADMIN_USER" \
  --admin_password="ADMIN_PASS" \
  --admin_email="ADMIN_EMAIL" \
  --skip-email \
  --allow-root

# Verify
wp core version --allow-root
wp user list --allow-root
```

---

## 4C — Nginx Virtual Host Configuration

Create `/etc/nginx/sites-available/DOMAIN`:

```nginx
server {
    listen 80;
    server_name DOMAIN www.DOMAIN;
    root /var/www/DOMAIN;
    index index.php index.html;

    client_max_body_size 64M;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location ~ /\.ht {
        deny all;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/DOMAIN /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 4C — SSL (Let's Encrypt)

### Option A — Nginx (recommended)

```bash
sudo certbot --nginx -d DOMAIN -d www.DOMAIN \
  --non-interactive --agree-tos -m ADMIN_EMAIL
# Certbot auto-updates the Nginx config with HTTPS redirect
sudo systemctl reload nginx
```

### Option B — Apache

```bash
sudo certbot --apache -d DOMAIN -d www.DOMAIN \
  --non-interactive --agree-tos -m ADMIN_EMAIL
sudo systemctl reload apache2
```

### Auto-renewal cron (both)

```bash
sudo crontab -l | { cat; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'"; } | sudo crontab -
```

---

## 4D — Install WooCommerce + Essential Plugins via WP-CLI

```bash
cd /var/www/DOMAIN

# ── WooCommerce core ─────────────────────────────────────────────────────────
wp plugin install woocommerce --activate --allow-root

# ── PAYMENTS ────────────────────────────────────────────────────────────────
# Stripe (free plugin; Stripe account required)
wp plugin install woocommerce-gateway-stripe --activate --allow-root

# PayPal Payments (free plugin; PayPal account required)
wp plugin install woocommerce-paypal-payments --activate --allow-root

# ── SEO ─────────────────────────────────────────────────────────────────────
# Rank Math SEO (free tier is excellent)
wp plugin install seo-by-rank-math --activate --allow-root

# ── SMTP ────────────────────────────────────────────────────────────────────
# WP Mail SMTP (free tier; connect to Gmail/SendGrid/Mailgun)
wp plugin install wp-mail-smtp --activate --allow-root

# ── PERFORMANCE / CACHING ───────────────────────────────────────────────────
# W3 Total Cache (free; or use WP Super Cache below)
wp plugin install w3-total-cache --activate --allow-root

# Image Optimization — Smush (free tier: up to 50 images/month)
wp plugin install wp-smushit --activate --allow-root

# Autoptimize — CSS/JS minification
wp plugin install autoptimize --activate --allow-root

# ── SECURITY ────────────────────────────────────────────────────────────────
# Wordfence (free tier)
wp plugin install wordfence --activate --allow-root

# ── ANALYTICS ───────────────────────────────────────────────────────────────
# Site Kit by Google (GA4 integration, Search Console, free)
wp plugin install google-site-kit --activate --allow-root

# ── CONTACT FORM ────────────────────────────────────────────────────────────
wp plugin install contact-form-7 --activate --allow-root

# ── REDIRECTS / 404 HANDLING ────────────────────────────────────────────────
wp plugin install redirection --activate --allow-root

# ── GDPR COOKIE NOTICE ──────────────────────────────────────────────────────
wp plugin install cookie-notice --activate --allow-root
```

> **PAID alternatives** (optional upgrades later):
> - WooCommerce Subscriptions ($199/yr) — enables true subscribe-and-save. Free alternative: use "WC Subscriptions Free" (community fork) or handle it with monthly cart-reminder emails until budget allows.
> - Rank Math Pro ($59/yr) — adds advanced schema; free tier covers 95% of needs.

---

## 4E — Theme via WP-CLI

```bash
cd /var/www/DOMAIN

# Install and activate Astra (lightweight, WooCommerce-optimized, free)
wp theme install astra --activate --allow-root

# Install Astra Starter Templates plugin (provides 1-click demo import)
wp plugin install astra-sites --activate --allow-root
```

> After activation, go to **Appearance → Starter Templates** in the WP Admin and import the "Organic Shop" or "Natural Products" starter — it will pre-populate colors and layouts close to the LatherLoop brand. Then customise with the palette from [03-brand-positioning.md](03-brand-positioning.md).

---

## 4F — Base Pages Creation via WP-CLI

```bash
cd /var/www/DOMAIN

# Create all required pages with correct slugs
wp post create --post_type=page --post_status=publish \
  --post_title="Home"              --post_name="home"              --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Shop"              --post_name="shop"              --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Cart"              --post_name="cart"              --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Checkout"          --post_name="checkout"          --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="My Account"        --post_name="my-account"        --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Shipping & Delivery" --post_name="shipping-delivery" --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Returns & Refunds" --post_name="returns-refunds"   --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="FAQ"               --post_name="faq"               --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Contact"           --post_name="contact"           --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Privacy Policy"    --post_name="privacy-policy"    --allow-root

wp post create --post_type=page --post_status=publish \
  --post_title="Terms of Service"  --post_name="terms-of-service"  --allow-root

# Get the IDs of the WooCommerce special pages (cart, checkout, my-account)
# and assign them in WooCommerce settings
CART_ID=$(wp post list --post_type=page --name=cart --field=ID --allow-root)
CHECKOUT_ID=$(wp post list --post_type=page --name=checkout --field=ID --allow-root)
MYACCOUNT_ID=$(wp post list --post_type=page --name=my-account --field=ID --allow-root)
SHOP_ID=$(wp post list --post_type=page --name=shop --field=ID --allow-root)

wp option update woocommerce_cart_page_id        "$CART_ID"     --allow-root
wp option update woocommerce_checkout_page_id    "$CHECKOUT_ID" --allow-root
wp option update woocommerce_myaccount_page_id   "$MYACCOUNT_ID" --allow-root
wp option update woocommerce_shop_page_id        "$SHOP_ID"     --allow-root

echo "Pages created. Cart=$CART_ID  Checkout=$CHECKOUT_ID  MyAccount=$MYACCOUNT_ID  Shop=$SHOP_ID"
```

---

## 4G — Core WooCommerce Settings via WP-CLI

```bash
cd /var/www/DOMAIN

# ── Permalinks ───────────────────────────────────────────────────────────────
wp rewrite structure '/%postname%/' --hard --allow-root
wp rewrite flush --hard --allow-root

# ── Currency ─────────────────────────────────────────────────────────────────
wp option update woocommerce_currency 'USD' --allow-root
wp option update woocommerce_currency_pos 'left' --allow-root

# ── Base location ─────────────────────────────────────────────────────────────
wp option update woocommerce_default_country 'US' --allow-root

# ── Store address (update with your real address) ─────────────────────────────
wp option update woocommerce_store_address  '123 Main St' --allow-root
wp option update woocommerce_store_city     'Austin' --allow-root
wp option update woocommerce_store_postcode '78701' --allow-root

# ── Guest checkout ON, account optional ──────────────────────────────────────
wp option update woocommerce_enable_guest_checkout 'yes' --allow-root
wp option update woocommerce_enable_signup_and_login_from_checkout 'yes' --allow-root
wp option update woocommerce_enable_checkout_login_reminder 'yes' --allow-root

# ── Taxes ─────────────────────────────────────────────────────────────────────
wp option update woocommerce_calc_taxes 'yes' --allow-root
wp option update woocommerce_tax_display_shop 'excl' --allow-root
wp option update woocommerce_tax_display_cart 'incl' --allow-root
# NOTE: configure tax rates per state in WP Admin → WooCommerce → Tax

# ── Shipping ──────────────────────────────────────────────────────────────────
# NOTE: shipping zones and rates must be configured in Admin UI:
# WooCommerce → Settings → Shipping → Add Zone → "United States"
# Add "Free Shipping" method with minimum order $35
# Add "Flat Rate" $4.99 fallback

# ── Email "from" settings ─────────────────────────────────────────────────────
wp option update woocommerce_email_from_name 'LatherLoop' --allow-root
wp option update woocommerce_email_from_address 'hello@DOMAIN' --allow-root

# ── Product images ────────────────────────────────────────────────────────────
wp option update woocommerce_thumbnail_image_width 450 --allow-root
wp option update woocommerce_thumbnail_image_height 450 --allow-root
wp option update woocommerce_single_image_width 800 --allow-root

# ── Misc ─────────────────────────────────────────────────────────────────────
wp option update woocommerce_enable_reviews 'yes' --allow-root
wp option update woocommerce_review_rating_required 'no' --allow-root
wp option update blogdescription 'Your daily ritual, simplified.' --allow-root
```

### Steps That Require Admin UI

| Step | Admin UI Location | Notes |
|------|-----------------|-------|
| Connect Stripe | WooCommerce → Settings → Payments → Stripe → Connect | Requires Stripe API keys |
| Connect PayPal | WooCommerce → Settings → Payments → PayPal | Requires PayPal client ID/secret |
| Configure shipping zones | WooCommerce → Settings → Shipping | Add US zone, free shipping $35+, flat rate $4.99 |
| Configure tax rates | WooCommerce → Settings → Tax | TaxJar plugin (free tier) automates this |
| WP Mail SMTP setup | Settings → WP Mail SMTP → Setup Wizard | Connect Gmail or SendGrid |
| Wordfence initial scan | Wordfence → Scan → Start Scan | Run once after install |
| GA4 connection | Site Kit → Connect Google Analytics | Requires Google account |
| Astra customizer | Appearance → Customize | Set colors/fonts from brand guide |
