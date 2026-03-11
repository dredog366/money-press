const { getProducts } = require("../lib/products");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const products = getProducts().map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price / 100,
    sku: p.sku,
    cjVid: p.cjVid,
    cjSku: p.cjSku,
    category: p.category,
    emoji: p.emoji,
    desc: p.desc,
    size: p.size,
    skinType: p.skinType,
    badge: p.badge,
    oldPrice: p.oldPrice != null ? p.oldPrice / 100 : null,
  }));

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=300",
  );
  return res.status(200).json(products);
};
