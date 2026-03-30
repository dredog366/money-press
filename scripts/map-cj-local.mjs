/**
 * map-cj-local.mjs — runs entirely locally using CJ + Supabase directly.
 * No deployed endpoints needed.
 *
 * Reads from environment:
 *   CJ_TOKEN        — CJ access token (CJ-Access-Token header value)
 *   SUPABASE_URL    — e.g. https://avsqqugqqibysasqoopf.supabase.co
 *   SUPABASE_SECRET — Supabase service role / secret key
 */

import https from "https";

const CJ_TOKEN      = process.env.CJ_TOKEN;
const SUPABASE_URL  = process.env.SUPABASE_URL  || "https://avsqqugqqibysasqoopf.supabase.co";
const SUPABASE_KEY  = process.env.SUPABASE_SECRET;

if (!CJ_TOKEN || !SUPABASE_KEY) {
  console.error("Missing env vars. Need: CJ_TOKEN, SUPABASE_SECRET");
  process.exit(1);
}

const CJ_SEARCH_URL = "https://developers.cjdropshipping.com/api2.0/v1/product/listV2";

function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      { hostname: u.hostname, path: u.pathname + u.search, method: "GET", headers },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try { resolve(JSON.parse(d)); } catch { reject(new Error("Parse: " + d.slice(0, 200))); }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function searchCJ(q) {
  const url = `${CJ_SEARCH_URL}?keyWord=${encodeURIComponent(q)}&page=1&size=5`;
  const data = await httpsGet(url, { "CJ-Access-Token": CJ_TOKEN });
  if (!data.result) throw new Error("CJ: " + (data.message || JSON.stringify(data)));
  return data.data?.content?.[0]?.productList || [];
}

async function updateSupabase(id, image, cj_vid, cj_sku) {
  const url = `${SUPABASE_URL}/rest/v1/products?id=eq.${id}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ image, cj_vid, cj_sku, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Supabase PATCH ${res.status}: ${await res.text()}`);
}

const PRODUCTS = [
  { id: 1,  name: "Green Tea Brightening Serum",        query: "green tea vitamin c brightening serum" },
  { id: 2,  name: "Chamomile Calming Face Wash",        query: "chamomile gentle foam face wash cleanser" },
  { id: 3,  name: "White Tea Eye Cream",                query: "eye cream dark circles caffeine peptide" },
  { id: 4,  name: "Oolong Hydrating Day Cream",         query: "spf 30 moisturizer day cream ceramide" },
  { id: 5,  name: "Black Tea Firming Toner",            query: "alcohol free firming toner pore tightening" },
  { id: 6,  name: "Matcha Detox Clay Mask",             query: "matcha green tea clay detox face mask" },
  { id: 7,  name: "Rooibos Repair Night Oil",           query: "rosehip facial oil night repair dry skin" },
  { id: 8,  name: "Hibiscus AHA Exfoliating Pads",      query: "aha exfoliating pads lactic acid" },
  { id: 9,  name: "Jade Gua Sha & Roller Set",          query: "jade gua sha facial roller set" },
  { id: 10, name: "Hydrocolloid Pimple Patches",        query: "hydrocolloid pimple patches acne" },
  { id: 11, name: "Ice Roller Facial Depuffer",         query: "stainless steel ice roller face depuff" },
  { id: 12, name: "LED Light Therapy Wand",             query: "led light therapy wand red blue skin" },
  { id: 13, name: "Centella Green Tea Hydrating Serum", query: "centella asiatica cica serum hydrating" },
];

async function run() {
  console.log(`\nMapping ${PRODUCTS.length} FaceTea products → CJ → Supabase\n${"─".repeat(60)}`);
  let ok = 0, fail = 0;

  for (const p of PRODUCTS) {
    process.stdout.write(`[${p.id}/13] ${p.name.padEnd(40)} `);
    try {
      const results = await searchCJ(p.query);
      const first = results[0];
      if (!first) { console.log("⚠  no results"); fail++; continue; }

      // listV2 fields: id, nameEn, bigImage, sku (SPU)
      const image  = first.bigImage || null;
      const cj_vid = null;           // variants require a separate call; sku is sufficient
      const cj_sku = first.sku || null;

      await updateSupabase(p.id, image, cj_vid, cj_sku);
      console.log(`✅`);
      console.log(`         CJ: "${first.nameEn?.slice(0, 55)}"`);
      console.log(`         img: ${image}`);
      console.log(`         sku: ${cj_sku}`);
      ok++;
    } catch (e) {
      console.log(`❌  ${e.message}`);
      fail++;
    }
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log(`\n${"─".repeat(60)}\nDone: ${ok} mapped ✅  ${fail} failed ❌\n`);
  if (fail > 0) console.log("For failed items, go to money-press.vercel.app/admin → My Products → paste image URL manually.\n");
}

run().catch((e) => { console.error("\nFatal:", e.message); process.exit(1); });
