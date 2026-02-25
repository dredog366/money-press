# 1 — Assumptions

## What Is Assumed

| Item | Assumed State |
|------|---------------|
| Domain | Registered and DNS A-record pointed to server IP |
| Server OS | Ubuntu 22.04 LTS |
| Web server | Nginx **or** Apache (both covered below) |
| PHP | 8.1 or 8.2 |
| Database | MySQL 8.x or MariaDB 10.6+ |
| SSH access | Root or sudo user |
| Shell | bash |
| Region | United States |
| Budget | $0–$200 total (first month) |

---

## If Something Is Missing — Install Commands

### 1. Install Nginx

```bash
sudo apt update && sudo apt install -y nginx
sudo systemctl enable nginx && sudo systemctl start nginx
```

### 2. Install Apache (alternative to Nginx)

```bash
sudo apt update && sudo apt install -y apache2
sudo systemctl enable apache2 && sudo systemctl start apache2
```

### 3. Install PHP 8.2 + required extensions

```bash
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-xml \
  php8.2-curl php8.2-gd php8.2-mbstring php8.2-zip \
  php8.2-intl php8.2-bcmath php8.2-soap php8.2-imagick
sudo systemctl enable php8.2-fpm && sudo systemctl start php8.2-fpm
```

### 4. Install MySQL 8

```bash
sudo apt install -y mysql-server
sudo systemctl enable mysql && sudo systemctl start mysql
sudo mysql_secure_installation   # follow prompts
```

### 5. Install MariaDB (alternative to MySQL)

```bash
sudo apt install -y mariadb-server mariadb-client
sudo systemctl enable mariadb && sudo systemctl start mariadb
sudo mysql_secure_installation
```

### 6. Install supporting utilities

```bash
sudo apt install -y curl unzip git wget rsync
```

### 7. Install WP-CLI

```bash
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
sudo mv wp-cli.phar /usr/local/bin/wp
wp --info   # verify
```

### 8. Install Certbot (Let's Encrypt)

```bash
# For Nginx
sudo apt install -y certbot python3-certbot-nginx

# For Apache
sudo apt install -y certbot python3-certbot-apache
```

---

## Variable Placeholders Used Throughout This Guide

Every command in this guide uses these placeholders — replace them before running:

| Placeholder | Example value | Description |
|-------------|---------------|-------------|
| `DOMAIN` | `latherloop.com` | Your domain name |
| `WEB_ROOT` | `/var/www/latherloop` | Absolute path to web root |
| `DB_NAME` | `latherloop_db` | MySQL database name |
| `DB_USER` | `latherloop_user` | MySQL database user |
| `DB_PASS` | `Str0ngP@ss!` | MySQL database password |
| `DB_HOST` | `localhost` | Database host |
| `SITE_TITLE` | `LatherLoop` | WordPress site title |
| `ADMIN_USER` | `lladmin` | WP admin username |
| `ADMIN_PASS` | `WpAdm!n2024` | WP admin password |
| `ADMIN_EMAIL` | `admin@latherloop.com` | WP admin email |
| `SERVER_IP` | `123.45.67.89` | Your server's public IP |

---

## Minimum Server Specs (Low-Cost Options)

| Provider | Plan | RAM | Disk | Monthly Cost |
|----------|------|-----|------|--------------|
| Hetzner Cloud | CX22 | 4 GB | 40 GB | ~$5 |
| DigitalOcean | Basic Droplet | 1 GB | 25 GB | $6 |
| Vultr | Cloud Compute | 1 GB | 25 GB | $6 |
| Linode (Akamai) | Nanode | 1 GB | 25 GB | $5 |

> **Recommendation:** Hetzner CX22 ($5/mo) — best RAM-per-dollar for WooCommerce.
