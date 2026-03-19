/**
 * /api/admin — Protected product CRUD for the FaceTea admin panel.
 *
 * All methods require the header:  x-admin-key: <ADMIN_PASSWORD>
 *
 * GET    /api/admin            — list all products (active + inactive)
 * POST   /api/admin            — add a new product
 * PUT    /api/admin            — update a product (body: { id, ...fields })
 * DELETE /api/admin?id=<n>     — deactivate a product (soft delete)
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// ---------------------------------------------------------------------------
// Auth guard
// ---------------------------------------------------------------------------
function checkAuth(req, res) {
  if (!ADMIN_PASSWORD) {
    res.status(500).json({ error: "ADMIN_PASSWORD env var is not set" });
    return false;
  }
  const key = req.headers["x-admin-key"];
  if (!key || key !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Supabase REST helper (uses service/secret key — bypasses RLS)
// ---------------------------------------------------------------------------
async function sb(method, path, body) {
  if (!SUPABASE_URL || !SUPABASE_SECRET) {
    throw new Error("SUPABASE_URL or SUPABASE_SECRET_KEY env vars are not set");
  }
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const headers = {
    apikey: SUPABASE_SECRET,
    Authorization: `Bearer ${SUPABASE_SECRET}`,
    "Content-Type": "application/json",
  };
  if (method === "POST" || method === "PATCH") {
    headers["Prefer"] = "return=representation";
  }
  const r = await fetch(url, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { ok: r.ok, status: r.status, data };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
module.exports = async function handler(req, res) {
  if (!checkAuth(req, res)) return;

  // ---- GET — list all products ----
  if (req.method === "GET") {
    try {
      const { ok, status, data } = await sb(
        "GET",
        "products?select=*&order=sort_order.asc,id.asc",
      );
      if (!ok) return res.status(status).json({ error: "Supabase error", detail: data });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ---- POST — add new product ----
  if (req.method === "POST") {
    const {
      name, category, price, sku,
      cj_vid, cj_sku, image, emoji,
      description, size, skin_type, badge, old_price,
    } = req.body || {};

    if (!name || !category || price == null) {
      return res.status(400).json({ error: "name, category, and price are required" });
    }

    const payload = {
      name,
      category,
      price: Math.round(Number(price) * 100),   // store as cents
      sku: sku || null,
      cj_vid: cj_vid || null,
      cj_sku: cj_sku || null,
      image: image || null,
      emoji: emoji || "🍵",
      description: description || "",
      size: size || "",
      skin_type: skin_type || "All skin types",
      badge: badge || null,
      old_price: old_price ? Math.round(Number(old_price) * 100) : null,
      active: true,
      sort_order: 99,
    };

    try {
      const { ok, status, data } = await sb("POST", "products", payload);
      if (!ok) return res.status(status).json({ error: "Supabase error", detail: data });
      return res.status(201).json(Array.isArray(data) ? data[0] : data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ---- PUT — update a product ----
  if (req.method === "PUT") {
    const { id, ...updates } = req.body || {};
    if (!id) return res.status(400).json({ error: "id is required in body" });

    // Convert dollar values to cents if supplied
    if (updates.price != null) updates.price = Math.round(Number(updates.price) * 100);
    if (updates.old_price != null) updates.old_price = Math.round(Number(updates.old_price) * 100);
    updates.updated_at = new Date().toISOString();

    // Normalise empty strings to null for optional fields
    ["cj_vid", "cj_sku", "image", "badge", "sku"].forEach((k) => {
      if (updates[k] === "") updates[k] = null;
    });

    try {
      const { ok, status, data } = await sb("PATCH", `products?id=eq.${id}`, updates);
      if (!ok) return res.status(status).json({ error: "Supabase error", detail: data });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // ---- DELETE — soft-delete (deactivate) a product ----
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "?id= query param is required" });

    try {
      const { ok, status, data } = await sb("PATCH", `products?id=eq.${id}`, {
        active: false,
        updated_at: new Date().toISOString(),
      });
      if (!ok) return res.status(status).json({ error: "Supabase error", detail: data });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", "GET,POST,PUT,DELETE");
  return res.status(405).json({ error: "Method not allowed" });
};
