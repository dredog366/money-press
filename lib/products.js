/**
 * Single source of truth for FaceTea products.
 * Used by api/products.js (catalog) and api/checkout.js (price validation).
 * Prices in cents (USD). CJDropshipping IDs are placeholders until mapped.
 */
const PRODUCTS = [
  {
    id: 1,
    name: "Green Tea Brightening Serum",
    category: "Serums",
    price: 2499,
    sku: "FT-SRM-001",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🍵",
    desc: "Antioxidant-rich serum with matcha extract and vitamin C that visibly brightens and evens skin tone in as little as 2 weeks. Lightweight, fast-absorbing formula with hyaluronic acid and niacinamide.",
    size: "30 ml / 1 fl oz",
    skinType: "All skin types",
    badge: "Best Seller",
    oldPrice: 3499,
  },
  {
    id: 2,
    name: "Chamomile Calming Face Wash",
    category: "Cleansers",
    price: 1499,
    sku: "FT-CLN-002",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🌼",
    desc: "Gentle foam cleanser with chamomile flower extract and calendula oil that soothes redness and removes impurities without stripping moisture. Leaves skin soft, balanced, and never tight.",
    size: "150 ml / 5 fl oz",
    skinType: "Sensitive & dry skin",
    badge: "New",
    oldPrice: null,
  },
  {
    id: 3,
    name: "White Tea Eye Cream",
    category: "Treatments",
    price: 3499,
    sku: "FT-TRT-003",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "☁️",
    desc: "Delicate eye cream with white tea peptides and caffeine that visibly reduces dark circles, puffiness, and crow's feet. The least processed tea delivers premium antioxidant protection.",
    size: "15 ml / 0.5 fl oz",
    skinType: "All skin types",
    badge: "Sale",
    oldPrice: 4499,
  },
  {
    id: 4,
    name: "Oolong Hydrating Day Cream",
    category: "Moisturisers",
    price: 2999,
    sku: "FT-MST-004",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🌿",
    desc: "Lightweight SPF 30 moisturiser with oolong tea polyphenols and ceramides. All-day hydration meets mineral sun protection in one non-greasy step. Sits beautifully under makeup.",
    size: "50 ml / 1.7 fl oz",
    skinType: "All skin types",
    badge: null,
    oldPrice: null,
  },
  {
    id: 5,
    name: "Black Tea Firming Toner",
    category: "Toners",
    price: 1999,
    sku: "FT-TNR-005",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🫖",
    desc: "Alcohol-free toner rich in black tea EGCG catechins. Visibly tightens pores, improves elasticity, and preps skin to absorb serums and moisturisers more effectively.",
    size: "200 ml / 6.8 fl oz",
    skinType: "Oily & combination skin",
    badge: "Sale",
    oldPrice: 2799,
  },
  {
    id: 6,
    name: "Matcha Detox Clay Mask",
    category: "Masks",
    price: 2299,
    sku: "FT-MSK-006",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🧪",
    desc: "Deep-cleansing mask with ceremonial-grade matcha and French kaolin clay. Draws out impurities, excess oil, and pollutants in just 10 minutes — without over-drying or stripping.",
    size: "100 ml / 3.4 fl oz",
    skinType: "Oily & acne-prone skin",
    badge: "New",
    oldPrice: null,
  },
  {
    id: 7,
    name: "Rooibos Repair Night Oil",
    category: "Treatments",
    price: 3999,
    sku: "FT-TRT-007",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🌙",
    desc: "Nourishing facial oil with South African rooibos, rosehip seed oil, and jojoba. Works overnight to repair daily damage, reduce redness, and boost cell turnover while you sleep.",
    size: "30 ml / 1 fl oz",
    skinType: "Dry & mature skin",
    badge: null,
    oldPrice: null,
  },
  {
    id: 8,
    name: "Hibiscus AHA Exfoliating Pads",
    category: "Exfoliants",
    price: 2799,
    sku: "FT-EXF-008",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🌺",
    desc: "Pre-soaked pads with hibiscus-derived AHAs and lactic acid. Textured side buffs dead skin cells; smooth side deposits brightening actives. No rinsing required — radiance in one swipe.",
    size: "50 pads per jar",
    skinType: "All skin types",
    badge: "Best Seller",
    oldPrice: 3599,
  },
  {
    id: 9,
    name: "Jade Gua Sha & Roller Set",
    category: "Tools",
    price: 2499,
    sku: "FT-TLS-009",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "💎",
    desc: "Premium jade gua sha stone and facial roller duo for sculpting, depuffing, and boosting circulation. Use with your favourite serum or oil for a spa-worthy facial massage at home.",
    size: "2-piece set with velvet pouch",
    skinType: "All skin types",
    badge: "New",
    oldPrice: null,
  },
  {
    id: 10,
    name: "Hydrocolloid Pimple Patches — Botanical Shapes",
    category: "Treatments",
    price: 999,
    sku: "FT-TRT-010",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🌸",
    desc: "Fun star, heart, and flower-shaped hydrocolloid patches that flatten blemishes overnight. Ultra-thin, invisible edges stay put under makeup. 36 patches per pack in assorted shapes.",
    size: "36 patches per pack",
    skinType: "Acne-prone skin",
    badge: "Best Seller",
    oldPrice: null,
  },
  {
    id: 11,
    name: "Ice Roller Facial Depuffer",
    category: "Tools",
    price: 1899,
    sku: "FT-TLS-011",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🧊",
    desc: "Stainless steel ice roller that stays cold for up to 10 minutes. Reduces morning puffiness, calms redness, and tightens pores. Keep in the freezer for an instant wake-up ritual.",
    size: "1 roller with storage cap",
    skinType: "All skin types",
    badge: null,
    oldPrice: null,
  },
  {
    id: 12,
    name: "LED Light Therapy Wand",
    category: "Tools",
    price: 5999,
    sku: "FT-TLS-012",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "✨",
    desc: "4-in-1 skincare wand with red LED, blue LED, warmth, and microcurrent modes. Red light boosts collagen, blue light targets acne bacteria. Rechargeable with 3 intensity levels.",
    size: "1 wand with USB-C charger",
    skinType: "All skin types",
    badge: "Premium",
    oldPrice: 7999,
  },
  {
    id: 13,
    name: "Centella & Green Tea Hydrating Serum",
    category: "Serums",
    price: 2999,
    sku: "FT-SRM-013",
    cjVid: null, // CJ variant ID — fill from CJ dashboard to enable fulfillment
    cjSku: null, // CJ SKU — alternative to cjVid
    emoji: "🌱",
    desc: "Calming serum with centella asiatica (cica) and green tea extract in a premium glass dropper bottle. Reduces redness, repairs the moisture barrier, and delivers deep hydration without stickiness.",
    size: "30 ml / 1 fl oz",
    skinType: "Sensitive & all skin types",
    badge: "New",
    oldPrice: null,
  },
];

function getProducts() {
  return PRODUCTS;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function getProductsByIdMap() {
  return Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
}

module.exports = {
  PRODUCTS,
  getProducts,
  getProductById,
  getProductsByIdMap,
};
