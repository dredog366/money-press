#!/usr/bin/env bash
# =============================================================================
# LatherLoop / money-press — WooCommerce Dropshipping Store Setup Script
# =============================================================================
# Usage:
#   1. Edit the CONFIGURATION section below.
#   2. Run: bash setup.sh
#
# Requirements:
#   - Ubuntu 22.04
#   - Run as root (or sudo)
#   - Domain already pointing to this server's IP
# =============================================================================

set -euo pipefail

# =============================================================================
# CONFIGURATION — edit these before running
# =============================================================================
DOMAIN="latherloop.com"
WEB_ROOT="/var/www/${DOMAIN}"
DB_NAME="latherloop_db"
DB_USER="latherloop_user"
DB_PASS="CHANGE_ME_STRONG_DB_PASSWORD"
DB_HOST="localhost"
SITE_TITLE="LatherLoop"
ADMIN_USER="lladmin"
ADMIN_PASS="CHANGE_ME_STRONG_WP_PASSWORD"
ADMIN_EMAIL="admin@latherloop.com"
STORE_ADDRESS="123 Main St"
STORE_CITY="Austin"
STORE_POSTCODE="78701"
PHP_VERSION="8.2"
# =============================================================================

log()  { echo "[$(date '+%H:%M:%S')] $*"; }
fail() { echo "[ERROR] $*" >&2; exit 1; }

# Verify we are root
[[ $EUID -eq 0 ]] || fail "Run this script as root (or with sudo)."

# =============================================================================
# SECTION 1 — System Prerequisites
# =============================================================================
log "=== SECTION 1: Installing system prerequisites ==="

apt-get update -qq
apt-get install -y -qq \
  nginx \
  "php${PHP_VERSION}" "php${PHP_VERSION}-fpm" "php${PHP_VERSION}-mysql" \
  "php${PHP_VERSION}-xml" "php${PHP_VERSION}-curl" "php${PHP_VERSION}-gd" \
  "php${PHP_VERSION}-mbstring" "php${PHP_VERSION}-zip" "php${PHP_VERSION}-intl" \
  "php${PHP_VERSION}-bcmath" "php${PHP_VERSION}-soap" "php${PHP_VERSION}-imagick" \
  mysql-server \
  certbot python3-certbot-nginx \
  curl unzip git wget rsync

systemctl enable --now nginx "php${PHP_VERSION}-fpm" mysql
log "System prerequisites installed."

# =============================================================================
# SECTION 2 — Install WP-CLI
# =============================================================================
log "=== SECTION 2: Installing WP-CLI ==="

if ! command -v wp &>/dev/null; then
  curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
  chmod +x wp-cli.phar
  mv wp-cli.phar /usr/local/bin/wp
fi

wp --info --allow-root | grep "WP-CLI version" || fail "WP-CLI installation failed."
log "WP-CLI ready."

# =============================================================================
# SECTION 3 — MySQL Database Setup
# =============================================================================
log "=== SECTION 3: Creating MySQL database and user ==="

mysql -u root <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

log "Database '${DB_NAME}' and user '${DB_USER}' created."

# =============================================================================
# SECTION 4 — Web Root and Nginx Virtual Host
# =============================================================================
log "=== SECTION 4: Creating web root and Nginx vhost ==="

mkdir -p "${WEB_ROOT}"
chown -R www-data:www-data "${WEB_ROOT}"
chmod -R 755 "${WEB_ROOT}"

NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"

cat > "${NGINX_CONF}" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    root ${WEB_ROOT};
    index index.php index.html;

    client_max_body_size 64M;

    location / {
        try_files \$uri \$uri/ /index.php?\$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php${PHP_VERSION}-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_read_timeout 300;
    }

    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location ~ /\.ht {
        deny all;
    }
}
NGINX

ln -sf "${NGINX_CONF}" "/etc/nginx/sites-enabled/${DOMAIN}"
nginx -t && systemctl reload nginx
log "Nginx vhost configured."

# =============================================================================
# SECTION 5 — WordPress Core Download and Install
# =============================================================================
log "=== SECTION 5: Installing WordPress ==="

cd "${WEB_ROOT}"

wp core download --allow-root --quiet

wp config create \
  --dbname="${DB_NAME}" \
  --dbuser="${DB_USER}" \
  --dbpass="${DB_PASS}" \
  --dbhost="${DB_HOST}" \
  --dbprefix="ll_" \
  --allow-root --quiet

wp config shuffle-salts --allow-root --quiet

wp core install \
  --url="http://${DOMAIN}" \
  --title="${SITE_TITLE}" \
  --admin_user="${ADMIN_USER}" \
  --admin_password="${ADMIN_PASS}" \
  --admin_email="${ADMIN_EMAIL}" \
  --skip-email \
  --allow-root --quiet

log "WordPress installed. Admin: https://${DOMAIN}/wp-admin"

# =============================================================================
# SECTION 6 — SSL (Let's Encrypt via Certbot)
# =============================================================================
# ⚠️  STOP HERE if DNS is not yet propagated — Certbot will fail.
#     Verify with: dig +short ${DOMAIN} @8.8.8.8
#     Should return this server's IP before continuing.
# =============================================================================
log "=== SECTION 6: Requesting SSL certificate ==="

certbot --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  -m "${ADMIN_EMAIL}" \
  --redirect || log "WARNING: Certbot failed — DNS may not be propagated. Run manually: certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"

# Update WP URL to HTTPS after cert
wp option update siteurl "https://${DOMAIN}" --allow-root --quiet
wp option update home    "https://${DOMAIN}" --allow-root --quiet

# Set up auto-renewal
(crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
log "SSL certificate issued. Auto-renewal cron added."

# =============================================================================
# SECTION 7 — Theme: Astra
# =============================================================================
log "=== SECTION 7: Installing Astra theme ==="

cd "${WEB_ROOT}"

wp theme install astra --activate --allow-root --quiet
wp plugin install astra-sites --activate --allow-root --quiet
log "Astra theme installed and activated."

# =============================================================================
# SECTION 8 — Plugins
# =============================================================================
log "=== SECTION 8: Installing plugins ==="

PLUGINS=(
  # Core e-commerce
  "woocommerce"
  # Payments (keys must be entered in Admin UI)
  "woocommerce-gateway-stripe"
  "woocommerce-paypal-payments"
  # SEO
  "seo-by-rank-math"
  # SMTP (configure in Admin UI)
  "wp-mail-smtp"
  # Performance
  "w3-total-cache"
  "autoptimize"
  # Image optimization
  "wp-smushit"
  # Security
  "wordfence"
  # Analytics
  "google-site-kit"
  "woocommerce-google-analytics-integration"
  # Pixel tracking
  "pixelyoursite"
  "tiktok"
  # Contact form
  "contact-form-7"
  # Redirects
  "redirection"
  # GDPR
  "cookie-notice"
)

for plugin in "${PLUGINS[@]}"; do
  wp plugin install "${plugin}" --activate --allow-root --quiet \
    && log "  ✓ ${plugin}" \
    || log "  ✗ FAILED: ${plugin} (check manually)"
done

log "All plugins installed."

# =============================================================================
# SECTION 9 — Core WooCommerce Settings
# =============================================================================
log "=== SECTION 9: Configuring WooCommerce settings ==="

cd "${WEB_ROOT}"

# Permalinks
wp rewrite structure '/%postname%/' --hard --allow-root --quiet
wp rewrite flush --hard --allow-root --quiet

# Currency and locale
wp option update woocommerce_currency          'USD'    --allow-root
wp option update woocommerce_currency_pos      'left'   --allow-root
wp option update woocommerce_default_country   'US'     --allow-root
wp option update woocommerce_store_address     "${STORE_ADDRESS}" --allow-root
wp option update woocommerce_store_city        "${STORE_CITY}"    --allow-root
wp option update woocommerce_store_postcode    "${STORE_POSTCODE}" --allow-root

# Checkout
wp option update woocommerce_enable_guest_checkout            'yes' --allow-root
wp option update woocommerce_enable_signup_and_login_from_checkout 'yes' --allow-root
wp option update woocommerce_enable_checkout_login_reminder   'yes' --allow-root

# Taxes
wp option update woocommerce_calc_taxes      'yes'  --allow-root
wp option update woocommerce_tax_display_shop 'excl' --allow-root
wp option update woocommerce_tax_display_cart 'incl' --allow-root

# Reviews
wp option update woocommerce_enable_reviews          'yes' --allow-root
wp option update woocommerce_review_rating_required  'no'  --allow-root

# Email
wp option update woocommerce_email_from_name    "${SITE_TITLE}"    --allow-root
wp option update woocommerce_email_from_address "hello@${DOMAIN}"  --allow-root

# Image sizes
wp option update woocommerce_thumbnail_image_width  450 --allow-root
wp option update woocommerce_thumbnail_image_height 450 --allow-root
wp option update woocommerce_single_image_width     800 --allow-root

# Tagline
wp option update blogdescription 'Your daily ritual, simplified.' --allow-root

log "WooCommerce core settings applied."

# =============================================================================
# SECTION 10 — Create Pages
# =============================================================================
log "=== SECTION 10: Creating pages ==="

cd "${WEB_ROOT}"

declare -A PAGES=(
  ["Home"]="home"
  ["Shop"]="shop"
  ["Cart"]="cart"
  ["Checkout"]="checkout"
  ["My Account"]="my-account"
  ["Shipping & Delivery"]="shipping-delivery"
  ["Returns & Refunds"]="returns-refunds"
  ["FAQ"]="faq"
  ["Contact"]="contact"
  ["Privacy Policy"]="privacy-policy"
  ["Terms of Service"]="terms-of-service"
)

for title in "${!PAGES[@]}"; do
  slug="${PAGES[$title]}"
  # Check if page already exists
  existing=$(wp post list --post_type=page --name="${slug}" --field=ID --allow-root 2>/dev/null || true)
  if [[ -z "$existing" ]]; then
    wp post create \
      --post_type=page \
      --post_status=publish \
      --post_title="${title}" \
      --post_name="${slug}" \
      --allow-root --quiet
    log "  Created page: ${title} (/${slug}/)"
  else
    log "  Page already exists: ${title} (ID: ${existing})"
  fi
done

# Wire WooCommerce to the correct pages
CART_ID=$(wp post list --post_type=page --name=cart       --field=ID --allow-root 2>/dev/null)
CHECKOUT_ID=$(wp post list --post_type=page --name=checkout  --field=ID --allow-root 2>/dev/null)
MYACCOUNT_ID=$(wp post list --post_type=page --name=my-account --field=ID --allow-root 2>/dev/null)
SHOP_ID=$(wp post list --post_type=page --name=shop       --field=ID --allow-root 2>/dev/null)

[[ -n "$CART_ID" ]]      && wp option update woocommerce_cart_page_id     "$CART_ID"     --allow-root
[[ -n "$CHECKOUT_ID" ]]  && wp option update woocommerce_checkout_page_id "$CHECKOUT_ID" --allow-root
[[ -n "$MYACCOUNT_ID" ]] && wp option update woocommerce_myaccount_page_id "$MYACCOUNT_ID" --allow-root
[[ -n "$SHOP_ID" ]]      && wp option update woocommerce_shop_page_id     "$SHOP_ID"     --allow-root

log "Pages created and WooCommerce page IDs updated."

# =============================================================================
# SECTION 11 — Create Products
# =============================================================================
log "=== SECTION 11: Creating WooCommerce products ==="

cd "${WEB_ROOT}"

# Product category
CAT_EXISTING=$(wp term list product_cat --name="Facial Wash Pods" --field=term_id --allow-root 2>/dev/null || true)
if [[ -z "$CAT_EXISTING" ]]; then
  wp term create product_cat "Facial Wash Pods" \
    --slug="facial-wash-pods" \
    --description="Daily foaming facial wash in dissolvable pod form" \
    --allow-root --quiet
fi
CAT_ID=$(wp term list product_cat --name="Facial Wash Pods" --field=term_id --allow-root)

create_product() {
  local title="$1" sku="$2" price="$3" regular_price="$4" sale_price="$5" content="$6"

  existing=$(wp post list --post_type=product --meta_key=_sku --meta_value="${sku}" \
    --field=ID --allow-root 2>/dev/null || true)
  if [[ -n "$existing" ]]; then
    log "  Product already exists: ${title} (ID: ${existing})"
    echo "$existing"
    return
  fi

  id=$(wp post create \
    --post_type=product \
    --post_status=publish \
    --post_title="${title}" \
    --post_content="${content}" \
    --porcelain --allow-root)

  wp post meta update "$id" _price          "$price"         --allow-root
  wp post meta update "$id" _regular_price  "$regular_price" --allow-root
  [[ -n "$sale_price" ]] && wp post meta update "$id" _sale_price "$sale_price" --allow-root
  wp post meta update "$id" _sku            "$sku"   --allow-root
  wp post meta update "$id" _manage_stock   "yes"    --allow-root
  wp post meta update "$id" _stock          "999"    --allow-root
  wp post meta update "$id" _stock_status   "instock" --allow-root
  wp post meta update "$id" _visibility     "visible" --allow-root
  wp post meta update "$id" _virtual        "no"     --allow-root

  wp post term add "$id" product_cat "$CAT_ID" --allow-root --quiet

  log "  Created product: ${title} (ID: ${id}, SKU: ${sku})"
  echo "$id"
}

STARTER_ID=$(create_product \
  "LatherLoop Daily Wash Pods — Starter Pack" \
  "LL-STARTER-6" \
  "34.99" "34.99" "" \
  "6 foaming facial wash pods. One pod = one perfect wash. Plastic-free. Travel-ready.")

SUPPLY_ID=$(create_product \
  "LatherLoop 3-Month Supply" \
  "LL-SUPPLY-18" \
  "79.99" "104.97" "79.99" \
  "18 pods — a full 3-month supply. Save 24% vs buying 3 starter packs.")

CASE_ID=$(create_product \
  "LatherLoop Travel Pod Case" \
  "LL-CASE-01" \
  "9.99" "9.99" "" \
  "Silicone zip pouch. Holds up to 8 pods. TSA-approved size.")

log "Products created: Starter=${STARTER_ID}, Supply=${SUPPLY_ID}, Case=${CASE_ID}"

# =============================================================================
# STOP HERE — Steps requiring Admin UI
# =============================================================================
log ""
log "================================================================="
log " AUTOMATED SETUP COMPLETE"
log "================================================================="
log ""
log "The following steps require manual action in the WordPress Admin:"
log ""
log "  1. STRIPE PAYMENTS:"
log "     WooCommerce → Settings → Payments → Stripe → Connect"
log "     (Requires Stripe API keys from stripe.com)"
log ""
log "  2. PAYPAL PAYMENTS:"
log "     WooCommerce → Settings → Payments → PayPal → Connect"
log "     (Requires PayPal client ID + secret)"
log ""
log "  3. SHIPPING ZONES:"
log "     WooCommerce → Settings → Shipping → Add Zone"
log "     Add 'United States' zone → Free shipping $35+ and Flat Rate $4.99"
log ""
log "  4. TAX RATES:"
log "     WooCommerce → Settings → Tax → Add rates per state"
log "     (Or use TaxJar plugin for automatic US tax calculation)"
log ""
log "  5. WP MAIL SMTP:"
log "     Settings → WP Mail SMTP → Setup Wizard"
log "     Connect Gmail or SendGrid for transactional emails"
log ""
log "  6. GOOGLE ANALYTICS (GA4):"
log "     Site Kit → Connect Google Analytics → enter Measurement ID"
log ""
log "  7. META PIXEL:"
log "     PixelYourSite → enter Pixel ID from Meta Events Manager"
log ""
log "  8. ASTRA BRANDING:"
log "     Appearance → Customize → set colors/fonts per brand guide"
log "     Colors: #1E3A2F (Deep Forest), #F7F5F2 (Foam White), #A8C5A0 (Sage Mist)"
log ""
log "  9. PRODUCT IMAGES:"
log "     WooCommerce → Products → upload images for each product"
log ""
log " 10. WORDFENCE INITIAL SCAN:"
log "     Wordfence → Scan → Start Scan"
log ""
log "Admin URL:   https://${DOMAIN}/wp-admin"
log "Admin User:  ${ADMIN_USER}"
log ""
log "Full documentation: https://github.com/dredog366/money-press"
log "================================================================="
