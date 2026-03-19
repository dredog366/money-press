const { getProducts } = require("../lib/products");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

function mapRow(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.price / 100,
    sku: p.sku,
    cjVid: p.cj_vid || null,
    cjSku: p.cj_sku || null,
    image: p.image || null,
    category: p.category,
    emoji: p.emoji || "🍵",
    desc: p.description,
    size: p.size,
    skinType: p.skin_type,
    badge: p.badge || null,
    oldPrice: p.old_price != null ? p.old_price / 100 : null,
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // --- Supabase (primary source) ---
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=*&active=eq.true&order=sort_order.asc,id.asc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        },
      );
      if (!r.ok) throw new Error(`Supabase ${r.status}`);
      const rows = await r.json();
      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
      return res.status(200).json(rows.map(mapRow));
    } catch (err) {
      console.error("Supabase fetch failed, falling back to lib/products.js:", err.message);
    }
  }

  // --- Fallback: lib/products.js ---
  const products = getProducts().map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price / 100,
    sku: p.sku,
    cjVid: p.cjVid,
    cjSku: p.cjSku,
    image: p.image || null,
    category: p.category,
    emoji: p.emoji,
    desc: p.desc,
    size: p.size,
    skinType: p.skinType,
    badge: p.badge,
    oldPrice: p.oldPrice != null ? p.oldPrice / 100 : null,
  }));

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.status(200).json(products);
};
