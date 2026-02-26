#!/usr/bin/env bash
set -euo pipefail

### ====== EDIT THESE ======
DOMAIN="example.com"
SITE_TITLE="My Store"
ADMIN_USER="admin"
ADMIN_EMAIL="you@example.com"
ADMIN_PASS="CHANGE_THIS_NOW"

DB_NAME="wp_${DOMAIN//./_}"
DB_USER="wpuser"
DB_PASS="CHANGE_THIS_NOW"
DB_HOST="localhost"

WEBROOT="/var/www/${DOMAIN}"
### ========================

echo "[1/9] Packages"
sudo apt-get update
sudo apt-get install -y nginx mysql-server php-fpm php-mysql php-curl php-gd php-xml php-mbstring php-zip unzip curl certbot python3-certbot-nginx

echo "[2/9] Web root"
sudo mkdir -p "$WEBROOT"
sudo chown -R "$USER":"$USER" "$WEBROOT"

echo "[3/9] MySQL DB + user"
sudo mysql -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "[4/9] WP-CLI"
curl -sSLo /tmp/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
php /tmp/wp --info >/dev/null
sudo mv /tmp/wp /usr/local/bin/wp
sudo chmod +x /usr/local/bin/wp

echo "[5/9] Download WordPress"
cd "$WEBROOT"
wp core download --locale=en_US

echo "[6/9] wp-config + install"
wp config create --dbname="$DB_NAME" --dbuser="$DB_USER" --dbpass="$DB_PASS" --dbhost="$DB_HOST" --skip-check
wp core install \
  --url="https://${DOMAIN}" \
  --title="$SITE_TITLE" \
  --admin_user="$ADMIN_USER" \
  --admin_password="$ADMIN_PASS" \
  --admin_email="$ADMIN_EMAIL"

echo "[7/9] Nginx server block"
# NOTE: Replace php-fpm.sock with your actual PHP-FPM socket path if needed.
# Common versions: /run/php/php8.1-fpm.sock, /run/php/php8.2-fpm.sock
NGINX_CONF="/etc/nginx/sites-available/${DOMAIN}"
sudo tee "$NGINX_CONF" >/dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    root ${WEBROOT};

    index index.php index.html;

    location / {
        try_files \$uri \$uri/ /index.php?\$args;
    }

    location ~ \.php\$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php-fpm.sock;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)\$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/${DOMAIN}"
sudo nginx -t
sudo systemctl reload nginx

echo "[8/9] SSL"
sudo certbot --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  -m "${ADMIN_EMAIL}" \
  --redirect

echo "[9/9] Install WooCommerce + minimal plugins + theme"
wp plugin install woocommerce --activate
wp theme install storefront --activate

# Payments
wp plugin install woocommerce-gateway-stripe --activate
wp plugin install woocommerce-paypal-payments --activate

# Email + SEO
wp plugin install wp-mail-smtp --activate
wp plugin install rank-math --activate

# Cache + security
wp plugin install wp-super-cache --activate
wp plugin install wordfence --activate

echo "DONE. Next: configure Stripe/PayPal keys + SMTP in wp-admin (requires UI)."
