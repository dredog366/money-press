#!/usr/bin/env node
/**
 * restock-agent.js
 *
 * Monitors CJ Dropshipping inventory for all mapped FaceTea products.
 * Logs a restock alert when stock falls below LOW_STOCK_THRESHOLD.
 *
 * Usage (run locally or via cron / Vercel Cron Job):
 *   node scripts/restock-agent.js
 *   node scripts/restock-agent.js --threshold 20   # custom low-stock threshold
 *
 * Required env var: CJ_API_KEY (or CJ_ACCESS_TOKEN for a pre-fetched token)
 *
 * Output: prints a status table and exits 0 normally, exits 1 if any error.
 * Integrate with email/Slack by piping output or extending the alertLowStock() function.
 */

"use strict";

const https = require("https");
const { getProducts } = require("../lib/products");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const LOW_STOCK_THRESHOLD = Number(
  process.argv.find((a) => a.startsWith("--threshold="))?.split("=")[1] ||
    process.argv[process.argv.indexOf("--threshold") + 1] ||
    10
);

const CJ_AUTH_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
const CJ_INVENTORY_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/product/stock/queryByVid";

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------
function httpsPost(url, body) {
  return new Promise((resolve, reject) => {
    const raw = JSON.stringify(body);
    const { hostname, pathname } = new URL(url);
    const req = https.request(
      {
        hostname,
        path: pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(raw),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error("Parse error: " + data)); }
        });
      }
    );
    req.on("error", reject);
    req.write(raw);
    req.end();
  });
}

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, search } = new URL(url);
    const req = https.request(
      {
        hostname,
        path: pathname + (search || ""),
        method: "GET",
        headers: { "Content-Type": "application/json", ...headers },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error("Parse error: " + data)); }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// CJ API helpers
// ---------------------------------------------------------------------------
async function getAccessToken() {
  const token = process.env.CJ_ACCESS_TOKEN;
  if (token && token !== "your_cj_access_token_here") return token;

  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey || apiKey === "your_cj_api_key_here") {
    throw new Error("CJ_API_KEY or CJ_ACCESS_TOKEN must be set in .env.local");
  }
  const res = await httpsPost(CJ_AUTH_URL, { apiKey });
  if (!res.result || !res.data?.accessToken) {
    throw new Error("CJ auth failed: " + (res.message || JSON.stringify(res)));
  }
  return res.data.accessToken;
}

/** Returns stock quantity for a given CJ variant ID, or null if unavailable. */
async function getStock(accessToken, vid) {
  const url = `${CJ_INVENTORY_URL}?vid=${encodeURIComponent(vid)}`;
  const res = await httpsGet(url, { "CJ-Access-Token": accessToken });
  if (!res.result || !res.data) return null;
  // CJ returns remainQuantity or similar field
  return res.data.remainQuantity ?? res.data.stock ?? null;
}

// ---------------------------------------------------------------------------
// Alert — extend this to send email/Slack notifications
// ---------------------------------------------------------------------------
function alertLowStock(product, stock) {
  console.warn(
    `LOW STOCK ALERT: "${product.name}" (id=${product.id}, sku=${product.sku}) ` +
    `only ${stock} units remaining (threshold: ${LOW_STOCK_THRESHOLD})`
  );
  // TODO: send email via SendGrid, Mailchimp, or post to Slack webhook:
  // await fetch(process.env.SLACK_WEBHOOK_URL, { method: "POST",
  //   body: JSON.stringify({ text: `Low stock: ${product.name} (${stock} left)` }) });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const products = getProducts();
  const mapped = products.filter((p) => p.cjVid);

  if (mapped.length === 0) {
    console.log(
      "No products have CJ variant IDs (cjVid) mapped yet.\n" +
        "Run: node scripts/fill-cj-mapping.js --write"
    );
    return;
  }

  console.log(`FaceTea Restock — checking ${mapped.length} mapped products`);
  console.log(`Low-stock threshold: ${LOW_STOCK_THRESHOLD} units\n`);

  const accessToken = await getAccessToken();

  const results = [];
  for (const product of mapped) {
    process.stdout.write(`  Checking "${product.name}" (vid=${product.cjVid})... `);
    try {
      const stock = await getStock(accessToken, product.cjVid);
      if (stock === null) {
        console.log("N/A (unavailable)");
        results.push({ ...product, stock: null, status: "unavailable" });
      } else {
        const low = stock <= LOW_STOCK_THRESHOLD;
        console.log(`${stock} units${low ? " — LOW" : ""}`);
        results.push({ ...product, stock, status: low ? "low" : "ok" });
        if (low) alertLowStock(product, stock);
      }
    } catch (err) {
      console.log(`error: ${err.message}`);
      results.push({ ...product, stock: null, status: "error", error: err.message });
    }
  }

  // Summary table
  const lowCount = results.filter((r) => r.status === "low").length;
  const okCount = results.filter((r) => r.status === "ok").length;
  console.log("\nInventory Summary");
  console.log(`  In stock:   ${okCount}`);
  console.log(`  Low stock:  ${lowCount}`);
  console.log(`  Unmapped:   ${products.length - mapped.length}`);
  console.log("");

  if (lowCount > 0) {
    console.log(`\n${lowCount} product(s) need restocking. Check your CJ Dropshipping dashboard.`);
    process.exit(0); // exit 0 even on low stock — let callers decide severity
  }
}

main().catch((err) => {
  console.error("Restock agent error:", err.message);
  process.exit(1);
});
