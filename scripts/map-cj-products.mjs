/**
 * map-cj-products.mjs
 *
 * Searches CJ Dropshipping for each FaceTea product, picks the best image
 * and variant, then updates Supabase via the deployed /api/admin endpoint.
 *
 * Usage:
 *   node scripts/map-cj-products.mjs
 *
 * Env (or pass inline):
 *   SITE_URL     — e.g. https://money-press.vercel.app  (default)
 *   ADMIN_KEY    — value of your ADMIN_PASSWORD env var
 */

const SITE_URL = process.env.SITE_URL || "https://money-press.vercel.app";
const ADMIN_KEY = process.env.ADMIN_KEY;

if (!ADMIN_KEY) {
  console.error("Set ADMIN_KEY=<your-admin-password> before running.");
  process.exit(1);
}

// The 13 FaceTea products with targeted CJ search terms.
const PRODUCTS = [
  { id: 1,  name: "Green Tea Brightening Serum",             query: "green tea vitamin c brightening serum" },
  { id: 2,  name: "Chamomile Calming Face Wash",             query: "chamomile gentle foam face wash cleanser" },
  { id: 3,  name: "White Tea Eye Cream",                     query: "eye cream dark circles caffeine peptide" },
  { id: 4,  name: "Oolong Hydrating Day Cream",              query: "spf 30 moisturizer day cream ceramide" },
  { id: 5,  name: "Black Tea Firming Toner",                 query: "alcohol free firming toner pore tightening" },
  { id: 6,  name: "Matcha Detox Clay Mask",                  query: "matcha green tea clay detox face mask" },
  { id: 7,  name: "Rooibos Repair Night Oil",                query: "rosehip facial oil night repair dry skin" },
  { id: 8,  name: "Hibiscus AHA Exfoliating Pads",           query: "aha exfoliating pads lactic acid" },
  { id: 9,  name: "Jade Gua Sha & Roller Set",               query: "jade gua sha facial roller set" },
  { id: 10, name: "Hydrocolloid Pimple Patches",             query: "hydrocolloid pimple patches acne" },
  { id: 11, name: "Ice Roller Facial Depuffer",              query: "stainless steel ice roller face depuff" },
  { id: 12, name: "LED Light Therapy Wand",                  query: "led light therapy wand red blue skin" },
  { id: 13, name: "Centella Green Tea Hydrating Serum",      query: "centella asiatica cica serum hydrating" },
];

async function searchCJ(query) {
  const url = `${SITE_URL}/api/cj-search?q=${encodeURIComponent(query)}&page=1`;
  const res = await fetch(url, { headers: { "x-admin-key": ADMIN_KEY } });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`CJ search failed (${res.status}): ${txt}`);
  }
  return res.json();
}

async function updateProduct(id, image, cj_vid, cj_sku) {
  const res = await fetch(`${SITE_URL}/api/admin`, {
    method: "PUT",
    headers: { "x-admin-key": ADMIN_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ id, image, cj_vid, cj_sku }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Admin update failed (${res.status}): ${txt}`);
  }
  return res.json();
}

async function run() {
  console.log(`\nSearching CJ for ${PRODUCTS.length} products via ${SITE_URL}\n${"─".repeat(60)}`);

  const results = [];

  for (const product of PRODUCTS) {
    process.stdout.write(`[${product.id}/13] ${product.name} ... `);

    try {
      const data = await searchCJ(product.query);
      const first = data.products?.[0];

      if (!first) {
        console.log("⚠  no CJ results");
        results.push({ id: product.id, name: product.name, status: "no_results" });
        continue;
      }

      // Prefer the first variant; fall back to the product-level image.
      const variant = first.variants?.[0];
      const image   = variant?.image || first.image;
      const cj_vid  = variant?.vid   || null;
      const cj_sku  = variant?.sku   || null;

      await updateProduct(product.id, image, cj_vid, cj_sku);

      console.log(`✅  ${first.name.slice(0, 55)}`);
      console.log(`      image : ${image}`);
      console.log(`      vid   : ${cj_vid}  sku: ${cj_sku}`);
      results.push({ id: product.id, name: product.name, status: "ok", cjName: first.name, image, cj_vid, cj_sku });
    } catch (err) {
      console.log(`❌  ${err.message}`);
      results.push({ id: product.id, name: product.name, status: "error", error: err.message });
    }

    // Small delay to avoid hammering the CJ API.
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\n${"─".repeat(60)}`);
  const ok  = results.filter((r) => r.status === "ok").length;
  const err = results.filter((r) => r.status !== "ok").length;
  console.log(`Done: ${ok} mapped, ${err} need manual review\n`);

  if (err > 0) {
    console.log("Products needing manual attention:");
    results.filter((r) => r.status !== "ok").forEach((r) => {
      console.log(`  ID ${r.id}: ${r.name} (${r.status})`);
    });
    console.log("\nFor these, open facetea.org/admin → My Products → paste a CJ image URL manually.\n");
  }
}

run().catch((err) => {
  console.error("\nFatal:", err.message);
  process.exit(1);
});
