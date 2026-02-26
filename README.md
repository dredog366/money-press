# money-press

Dropshipping company — AI-automated WooCommerce store pipeline.

## Architecture

Keep WordPress boring. WP/Woo handles store + checkout. AI work runs outside WordPress.

```
AI generates data → products.json + assets/ → import_products.py → WooCommerce
```

## Repo structure

```
money-press/
├── setup_woo.sh          # One-time server provisioning (Ubuntu + Nginx)
├── products.json         # Product catalog (edit or AI-generate this)
├── import_products.py    # Pushes products.json into WooCommerce via REST API
├── .env.example          # Credential template — copy to .env, never commit .env
└── assets/               # Product images (create this folder, add your images here)
```

## Quick start

### 1. Provision the server

```bash
cp setup_woo.sh my_setup.sh
# Edit DOMAIN, ADMIN_PASS, DB_PASS at the top
chmod +x my_setup.sh
./my_setup.sh
```

> **Note:** PHP-FPM socket path varies by version. Edit the `fastcgi_pass` line in
> the generated Nginx config if needed (e.g. `php8.2-fpm.sock`).

### 2. Configure WooCommerce REST API (one-time, in browser)

1. WP Admin → WooCommerce → Settings → Advanced → REST API → **Add Key**
2. WP Admin → Users → Profile → **Application Passwords** → Add new

### 3. Set credentials

```bash
cp .env.example .env
# Fill in WC_CONSUMER_KEY, WC_CONSUMER_SECRET, WP_APP_PASSWORD, etc.
```

### 4. Add product images

```bash
mkdir -p assets
# Copy your images into assets/
# Filenames must match the "images" field in products.json
```

### 5. Import products

```bash
python3 -m pip install requests python-dotenv
python3 import_products.py
```

The importer creates new products and updates existing ones (matched by SKU).

## WooCommerce plugins (minimal set)

| Plugin | Purpose |
|---|---|
| WooCommerce | Core store |
| Stripe (official) | Payments |
| PayPal Payments | Payments |
| WP Mail SMTP | Transactional email |
| Rank Math | SEO |
| WP Super Cache | Caching |
| Wordfence | Security |

## Product lineup (FreshPaws — pet dental)

| SKU | Product | Price |
|---|---|---|
| FP-DENTAL-30 | 30-day bottle | $29.99 |
| FP-DENTAL-2PK | 2-pack | $49.99 |
| FP-TRAVEL-CAP | Travel measuring cap | $6.99 |

Edit `products.json` to change or add products.

## Security

- Never commit `.env` — it is in `.gitignore`
- Use WordPress Application Passwords for media upload (not your main password)
- WooCommerce REST API keys are scoped to read/write products only
