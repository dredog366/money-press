# 5 — WooCommerce Product Setup (CLI)

## Products to Create

| SKU | Name | Price | Type |
|-----|------|-------|------|
| `LL-STARTER-6` | LatherLoop Daily Wash Pods — Starter Pack (6 pods) | $34.99 | Simple |
| `LL-SUPPLY-18` | LatherLoop 3-Month Supply (18 pods) | $79.99 | Simple |
| `LL-CASE-01` | LatherLoop Travel Pod Case | $9.99 | Simple |

---

## Option A — WP-CLI + WooCommerce REST API (curl)

WP-CLI's `wp post create` can create WooCommerce products, but the REST API gives more control over Woo-specific fields. Use the approach that works best for your environment.

### Step 1 — Generate a REST API Application Password

```bash
# Create an application password for your admin user (stored securely)
wp user application-password create ADMIN_USER "CLI Deploy" --porcelain --allow-root
# ↑ Copy the returned password — you'll use it as API_PASS below
```

### Step 2 — Create Products via REST API

```bash
# ── Variables ────────────────────────────────────────────────────────────────
DOMAIN="https://DOMAIN"
API_USER="ADMIN_USER"
API_PASS="APPLICATION_PASSWORD_FROM_STEP_1"
AUTH=$(echo -n "$API_USER:$API_PASS" | base64)

# ── Flagship product: 6-pod Starter Pack ─────────────────────────────────────
curl -s -X POST "$DOMAIN/wp-json/wc/v3/products" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "LatherLoop Daily Wash Pods — Starter Pack",
    "type": "simple",
    "status": "publish",
    "sku": "LL-STARTER-6",
    "regular_price": "34.99",
    "short_description": "6 foaming facial wash pods. One pod = one perfect wash. Plastic-free. Travel-ready.",
    "description": "<h2>The Smarter Way to Wash Your Face</h2><p>Each LatherLoop pod dissolves instantly in your palm, releasing a rich, pH-balanced foam that cleanses without stripping. No bottle to carry. No waste to bin.</p><h3>What You Get</h3><ul><li>6 individually wrapped pods</li><li>Approx. 30-day supply when used daily</li><li>Skin-safe formula, dermatologically tested</li><li>Biodegradable wrapper</li></ul><h3>How to Use</h3><ol><li>Wet your hands or face lightly.</li><li>Place one pod in your palm.</li><li>Rub hands together — watch it foam in seconds.</li><li>Massage over face for 20–30 seconds, rinse thoroughly.</li></ol><p><em>For external use only. Discontinue use if irritation occurs. Keep out of eyes.</em></p>",
    "weight": "0.1",
    "dimensions": { "length": "3", "width": "2", "height": "1" },
    "manage_stock": true,
    "stock_quantity": 999,
    "categories": [{"id": 0}],
    "tags": [{"name": "facial wash"}, {"name": "eco"}, {"name": "pods"}, {"name": "skincare"}],
    "meta_data": [
      {"key": "_yoast_wpseo_title", "value": "LatherLoop Foaming Facial Wash Pods — Starter Pack"},
      {"key": "_yoast_wpseo_metadesc", "value": "6 dissolvable foaming facial wash pods. One pod, one perfect wash. Plastic-free skincare delivered to your door."}
    ]
  }' | python3 -m json.tool | grep '"id"' | head -1
# ↑ Note the product ID returned

# ── Bundle: 3-Month Supply (18 pods) ─────────────────────────────────────────
curl -s -X POST "$DOMAIN/wp-json/wc/v3/products" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "LatherLoop 3-Month Supply",
    "type": "simple",
    "status": "publish",
    "sku": "LL-SUPPLY-18",
    "regular_price": "104.97",
    "sale_price": "79.99",
    "short_description": "18 pods — a full 3-month supply. Best value. Save 24% vs. buying 3 starter packs.",
    "description": "<h2>Stock Up and Save</h2><p>Your best daily routine should never run out. The LatherLoop 3-Month Supply delivers 18 pods straight to your door — enough for an uninterrupted 90-day facial wash routine.</p><ul><li>18 pods (3 × 6-pod supply)</li><li>Save $24.98 vs. buying three Starter Packs</li><li>Perfect to share with a partner or keep a spare at the office</li></ul><p><em>For external use only. Discontinue use if irritation occurs.</em></p>",
    "weight": "0.25",
    "manage_stock": true,
    "stock_quantity": 999,
    "tags": [{"name": "bundle"}, {"name": "value"}, {"name": "skincare"}]
  }' | python3 -m json.tool | grep '"id"' | head -1

# ── Upsell: Travel Pod Case ───────────────────────────────────────────────────
curl -s -X POST "$DOMAIN/wp-json/wc/v3/products" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "LatherLoop Travel Pod Case",
    "type": "simple",
    "status": "publish",
    "sku": "LL-CASE-01",
    "regular_price": "9.99",
    "short_description": "Silicone zip pouch holds up to 8 pods. TSA-approved size. Toss it in any bag.",
    "description": "<h2>Never Leave Home Without Your Pods</h2><p>The LatherLoop Travel Pod Case is a compact silicone zip pouch designed to hold up to 8 pods securely. Water-resistant, TSA-friendly, and sized perfectly for your daily carry or gym bag.</p><ul><li>Holds up to 8 pods</li><li>Water-resistant food-grade silicone</li><li>Dimensions: 4\" × 3\" × 0.5\"</li><li>Available in Forest Green and Warm Sand</li></ul>",
    "weight": "0.05",
    "manage_stock": true,
    "stock_quantity": 999,
    "tags": [{"name": "travel"}, {"name": "accessory"}, {"name": "case"}]
  }' | python3 -m json.tool | grep '"id"' | head -1
```

### Step 3 — Set Upsell/Cross-Sell Relationships

```bash
# Replace STARTER_ID and SUPPLY_ID with the IDs returned above

# Set the Starter Pack to upsell to the 3-Month Supply and cross-sell the Travel Case
curl -s -X PUT "$DOMAIN/wp-json/wc/v3/products/STARTER_ID" \
  -H "Authorization: Basic $AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "upsell_ids": [SUPPLY_ID],
    "cross_sell_ids": [CASE_ID]
  }'
```

---

## Option B — WP-CLI post create (simpler, fewer fields)

```bash
cd /var/www/DOMAIN

# Starter Pack
STARTER_ID=$(wp post create \
  --post_type=product \
  --post_status=publish \
  --post_title="LatherLoop Daily Wash Pods — Starter Pack" \
  --post_content="6 foaming facial wash pods. One pod = one perfect wash." \
  --porcelain --allow-root)

wp post meta update $STARTER_ID _price          "34.99" --allow-root
wp post meta update $STARTER_ID _regular_price  "34.99" --allow-root
wp post meta update $STARTER_ID _sku            "LL-STARTER-6" --allow-root
wp post meta update $STARTER_ID _manage_stock   "yes" --allow-root
wp post meta update $STARTER_ID _stock          "999" --allow-root
wp post meta update $STARTER_ID _stock_status   "instock" --allow-root
wp post meta update $STARTER_ID _visibility     "visible" --allow-root
wp post meta update $STARTER_ID _virtual        "no" --allow-root
wp post meta update $STARTER_ID _weight         "0.1" --allow-root

# 3-Month Supply
SUPPLY_ID=$(wp post create \
  --post_type=product \
  --post_status=publish \
  --post_title="LatherLoop 3-Month Supply" \
  --post_content="18 pods — a full 3-month supply. Save 24%." \
  --porcelain --allow-root)

wp post meta update $SUPPLY_ID _price          "79.99" --allow-root
wp post meta update $SUPPLY_ID _regular_price  "104.97" --allow-root
wp post meta update $SUPPLY_ID _sale_price     "79.99" --allow-root
wp post meta update $SUPPLY_ID _sku            "LL-SUPPLY-18" --allow-root
wp post meta update $SUPPLY_ID _manage_stock   "yes" --allow-root
wp post meta update $SUPPLY_ID _stock          "999" --allow-root
wp post meta update $SUPPLY_ID _stock_status   "instock" --allow-root

# Travel Case
CASE_ID=$(wp post create \
  --post_type=product \
  --post_status=publish \
  --post_title="LatherLoop Travel Pod Case" \
  --post_content="Silicone zip pouch. Holds up to 8 pods. TSA-approved." \
  --porcelain --allow-root)

wp post meta update $CASE_ID _price         "9.99" --allow-root
wp post meta update $CASE_ID _regular_price "9.99" --allow-root
wp post meta update $CASE_ID _sku           "LL-CASE-01" --allow-root
wp post meta update $CASE_ID _manage_stock  "yes" --allow-root
wp post meta update $CASE_ID _stock         "999" --allow-root
wp post meta update $CASE_ID _stock_status  "instock" --allow-root

echo "Products created: Starter=$STARTER_ID  Supply=$SUPPLY_ID  Case=$CASE_ID"
```

---

## Step 4 — Import and Attach Product Images

```bash
# Download placeholder product images (replace URLs with your actual images)
wp media import https://DOMAIN/wp-content/uploads/starter-pack.jpg \
  --post_id=$STARTER_ID --title="Starter Pack" --featured_image --allow-root

wp media import https://DOMAIN/wp-content/uploads/supply-18.jpg \
  --post_id=$SUPPLY_ID --title="3-Month Supply" --featured_image --allow-root

wp media import https://DOMAIN/wp-content/uploads/travel-case.jpg \
  --post_id=$CASE_ID --title="Travel Pod Case" --featured_image --allow-root

# If images are local:
# wp media import /path/to/local/image.jpg --post_id=$STARTER_ID --featured_image --allow-root
```

---

## Step 5 — Create Product Category

```bash
# Create the product category
wp term create product_cat "Facial Wash Pods" \
  --slug="facial-wash-pods" \
  --description="Daily foaming facial wash in dissolvable pod form" \
  --allow-root

# Get the category ID
CAT_ID=$(wp term list product_cat --name="Facial Wash Pods" --field=term_id --allow-root)

# Assign category to products
wp post term add $STARTER_ID product_cat $CAT_ID --allow-root
wp post term add $SUPPLY_ID  product_cat $CAT_ID --allow-root
wp post term add $CASE_ID    product_cat $CAT_ID --allow-root
```
