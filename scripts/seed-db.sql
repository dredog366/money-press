-- ============================================================
-- FaceTea Shop — Supabase products table
-- Run once in the Supabase SQL Editor:
--   https://supabase.com/dashboard/project/avsqqugqqibysasqoopf/sql
-- ============================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS products (
  id          SERIAL        PRIMARY KEY,
  name        TEXT          NOT NULL,
  category    TEXT          NOT NULL,
  price       INTEGER       NOT NULL,         -- cents (USD)
  sku         TEXT          UNIQUE,
  cj_vid      TEXT,                           -- CJ variant ID for fulfillment
  cj_sku      TEXT,                           -- CJ SKU (alternative to cj_vid)
  image       TEXT,                           -- product image URL (from CJ or manual)
  emoji       TEXT          DEFAULT '🍵',
  description TEXT,
  size        TEXT,
  skin_type   TEXT,
  badge       TEXT,
  old_price   INTEGER,                        -- cents, nullable (for strike-through price)
  active      BOOLEAN       DEFAULT true,
  sort_order  INTEGER       DEFAULT 0,
  created_at  TIMESTAMPTZ   DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- 2. Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public: read active products only
DROP POLICY IF EXISTS "public_read_active" ON products;
CREATE POLICY "public_read_active"
  ON products FOR SELECT
  USING (active = true);

-- 3. Auto-update updated_at on every UPDATE
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. Seed existing 13 products (preserving IDs so Stripe checkout still works)
INSERT INTO products
  (id, name, category, price, sku, emoji, description, size, skin_type, badge, old_price, sort_order)
VALUES
  (1,  'Green Tea Brightening Serum',
       'Serums',      2499, 'FT-SRM-001', '🍵',
       'Antioxidant-rich serum with matcha extract and vitamin C that visibly brightens and evens skin tone in as little as 2 weeks. Lightweight, fast-absorbing formula with hyaluronic acid and niacinamide.',
       '30 ml / 1 fl oz',          'All skin types',           'Best Seller', 3499, 1),

  (2,  'Chamomile Calming Face Wash',
       'Cleansers',   1499, 'FT-CLN-002', '🌼',
       'Gentle foam cleanser with chamomile flower extract and calendula oil that soothes redness and removes impurities without stripping moisture. Leaves skin soft, balanced, and never tight.',
       '150 ml / 5 fl oz',         'Sensitive & dry skin',     NULL,          NULL, 2),

  (3,  'White Tea Eye Cream',
       'Treatments',  3499, 'FT-TRT-003', '☁️',
       'Delicate eye cream with white tea peptides and caffeine that visibly reduces dark circles, puffiness, and crow''s feet. The least processed tea delivers premium antioxidant protection.',
       '15 ml / 0.5 fl oz',        'All skin types',           'Sale',        4499, 3),

  (4,  'Oolong Hydrating Day Cream',
       'Moisturisers',2999, 'FT-MST-004', '🌿',
       'Lightweight SPF 30 moisturiser with oolong tea polyphenols and ceramides. All-day hydration meets mineral sun protection in one non-greasy step. Sits beautifully under makeup.',
       '50 ml / 1.7 fl oz',        'All skin types',           NULL,          NULL, 4),

  (5,  'Black Tea Firming Toner',
       'Toners',      1999, 'FT-TNR-005', '🫖',
       'Alcohol-free toner rich in black tea EGCG catechins. Visibly tightens pores, improves elasticity, and preps skin to absorb serums and moisturisers more effectively.',
       '200 ml / 6.8 fl oz',       'Oily & combination skin',  'Sale',        2799, 5),

  (6,  'Matcha Detox Clay Mask',
       'Masks',       2299, 'FT-MSK-006', '🧪',
       'Deep-cleansing mask with ceremonial-grade matcha and French kaolin clay. Draws out impurities, excess oil, and pollutants in just 10 minutes — without over-drying or stripping.',
       '100 ml / 3.4 fl oz',       'Oily & acne-prone skin',   'New',         NULL, 6),

  (7,  'Rooibos Repair Night Oil',
       'Treatments',  3999, 'FT-TRT-007', '🌙',
       'Nourishing facial oil with South African rooibos, rosehip seed oil, and jojoba. Works overnight to repair daily damage, reduce redness, and boost cell turnover while you sleep.',
       '30 ml / 1 fl oz',          'Dry & mature skin',        NULL,          NULL, 7),

  (8,  'Hibiscus AHA Exfoliating Pads',
       'Exfoliants',  2799, 'FT-EXF-008', '🌺',
       'Pre-soaked pads with hibiscus-derived AHAs and lactic acid. Textured side buffs dead skin cells; smooth side deposits brightening actives. No rinsing required — radiance in one swipe.',
       '50 pads per jar',          'All skin types',           'Best Seller', 3599, 8),

  (9,  'Jade Gua Sha & Roller Set',
       'Tools',       2499, 'FT-TLS-009', '💎',
       'Premium jade gua sha stone and facial roller duo for sculpting, depuffing, and boosting circulation. Use with your favourite serum or oil for a spa-worthy facial massage at home.',
       '2-piece set with velvet pouch','All skin types',        'New',         NULL, 9),

  (10, 'Hydrocolloid Pimple Patches — Botanical Shapes',
       'Treatments',   999, 'FT-TRT-010', '🌸',
       'Fun star, heart, and flower-shaped hydrocolloid patches that flatten blemishes overnight. Ultra-thin, invisible edges stay put under makeup. 36 patches per pack in assorted shapes.',
       '36 patches per pack',      'Acne-prone skin',          'Best Seller', NULL, 10),

  (11, 'Ice Roller Facial Depuffer',
       'Tools',       1899, 'FT-TLS-011', '🧊',
       'Stainless steel ice roller that stays cold for up to 10 minutes. Reduces morning puffiness, calms redness, and tightens pores. Keep in the freezer for an instant wake-up ritual.',
       '1 roller with storage cap','All skin types',           NULL,          NULL, 11),

  (12, 'LED Light Therapy Wand',
       'Tools',       5999, 'FT-TLS-012', '✨',
       '4-in-1 skincare wand with red LED, blue LED, warmth, and microcurrent modes. Red light boosts collagen, blue light targets acne bacteria. Rechargeable with 3 intensity levels.',
       '1 wand with USB-C charger','All skin types',           'Premium',     7999, 12),

  (13, 'Centella & Green Tea Hydrating Serum',
       'Serums',      2999, 'FT-SRM-013', '🌱',
       'Calming serum with centella asiatica (cica) and green tea extract in a premium glass dropper bottle. Reduces redness, repairs the moisture barrier, and delivers deep hydration without stickiness.',
       '30 ml / 1 fl oz',          'Sensitive & all skin types','New',        NULL, 13)

ON CONFLICT (id) DO NOTHING;

-- Advance the sequence so new products start at ID 14+
SELECT setval('products_id_seq', 13, true);
