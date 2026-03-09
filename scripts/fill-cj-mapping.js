#!/usr/bin/env node
/**
 * fill-cj-mapping.js
 *
 * Queries the CJ Dropshipping API to resolve cjVid / cjSku for every product
 * whose mapping is currently null in lib/products.js, then prints a mapping
 * table and optionally writes the resolved values back to the file.
 *
 * Usage:
 *   node scripts/fill-cj-mapping.js            # dry-run: print table only
 *   node scripts/fill-cj-mapping.js --write     # write resolved values back to lib/products.js
 *
 * Required environment variable (copy from .env.example → .env.local):
 *   CJ_API_KEY=your_cj_api_key_here
 */

"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CJ_AUTH_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
const CJ_SEARCH_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/product/list";
const PRODUCTS_FILE = path.resolve(__dirname, "../lib/products.js");
const WRITE_MODE = process.argv.includes("--write");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal HTTPS POST helper – returns parsed JSON body. */
function post(url, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const { hostname, pathname, search } = new URL(url);
    const options = {
      hostname,
      path: pathname + (search || ""),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(new Error(`Failed to parse response from ${url}: ${raw}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/** Minimal HTTPS GET helper – returns parsed JSON body. */
function get(url, headers) {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, search } = new URL(url);
    const options = {
      hostname,
      path: pathname + (search || ""),
      method: "GET",
      headers: { "Content-Type": "application/json", ...headers },
    };

    const req = https.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => (raw += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(new Error(`Failed to parse response from ${url}: ${raw}`));
        }
      });
    });

    req.on("error", reject);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// CJ API helpers
// ---------------------------------------------------------------------------

/** Exchange CJ_API_KEY for a short-lived access token. */
async function getAccessToken(apiKey) {
  const data = await post(CJ_AUTH_URL, { apiKey });
  if (!data.result || !data.data || !data.data.accessToken) {
    throw new Error(`CJ auth failed: ${data.message || JSON.stringify(data)}`);
  }
  return data.data.accessToken;
}

/**
 * Search CJ catalogue for a product by name.
 * Returns the first match { cjVid, cjSku } or null if none found.
 */
async function searchProduct(accessToken, productName) {
  const searchUrl =
    CJ_SEARCH_URL +
    `?productNameEn=${encodeURIComponent(productName)}&pageNum=1&pageSize=5`;

  const data = await get(searchUrl, { "CJ-Access-Token": accessToken });

  if (
    !data.result ||
    !data.data ||
    !data.data.list ||
    data.data.list.length === 0
  ) {
    return null;
  }

  const first = data.data.list[0];
  // CJ returns variants inside each product listing
  const variant = first.variants && first.variants[0];
  return {
    cjVid: variant ? variant.vid : null,
    cjSku: first.productSku || (variant ? variant.variantSku : null),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey || apiKey === "your_cj_api_key_here") {
    console.error(
      "Error: CJ_API_KEY is not set. Copy .env.example to .env.local and fill in your key.",
    );
    process.exit(1);
  }

  // Load products from lib/products.js by requiring it directly
  const { PRODUCTS } = require(PRODUCTS_FILE);

  console.log("Authenticating with CJ Dropshipping API…");
  const accessToken = await getAccessToken(apiKey);
  console.log("Access token obtained.\n");

  const results = [];

  for (const product of PRODUCTS) {
    if (product.cjVid && product.cjSku) {
      console.log(
        `[SKIP]  id=${product.id}  "${product.name}" — already mapped`,
      );
      results.push({ ...product, _status: "skipped" });
      continue;
    }

    process.stdout.write(
      `[LOOK]  id=${product.id}  "${product.name}" — searching… `,
    );
    try {
      const match = await searchProduct(accessToken, product.name);
      if (match && (match.cjVid || match.cjSku)) {
        console.log(`found  cjVid=${match.cjVid}  cjSku=${match.cjSku}`);
        results.push({
          ...product,
          cjVid: match.cjVid,
          cjSku: match.cjSku,
          _status: "found",
        });
      } else {
        console.log("not found");
        results.push({ ...product, _status: "not_found" });
      }
    } catch (err) {
      console.log(`error: ${err.message}`);
      results.push({ ...product, _status: "error", _error: err.message });
    }
  }

  // Print summary table
  console.log(
    "\n── Mapping Summary ──────────────────────────────────────────────",
  );
  console.log(
    `${"id".padEnd(4)} ${"SKU".padEnd(14)} ${"cjVid".padEnd(24)} ${"cjSku".padEnd(24)} Status`,
  );
  console.log("─".repeat(80));
  for (const r of results) {
    console.log(
      `${String(r.id).padEnd(4)} ${(r.sku || "").padEnd(14)} ${String(r.cjVid || "—").padEnd(24)} ${String(r.cjSku || "—").padEnd(24)} ${r._status}`,
    );
  }
  console.log("─".repeat(80));

  if (!WRITE_MODE) {
    console.log(
      "\nDry-run complete. Run with --write to patch lib/products.js with the resolved values.",
    );
    return;
  }

  // Write resolved values back to lib/products.js
  let source = fs.readFileSync(PRODUCTS_FILE, "utf8");

  let patchCount = 0;
  for (const r of results) {
    if (r._status !== "found") continue;

    // Replace cjVid placeholder for this product (match null or existing value on same line after cjVid:)
    source = source.replace(
      new RegExp(`(id:\\s*${r.id}[\\s\\S]*?cjVid:\\s*)(?:null|"[^"]*")`),
      `$1${r.cjVid ? `"${r.cjVid}"` : "null"}`,
    );
    source = source.replace(
      new RegExp(`(id:\\s*${r.id}[\\s\\S]*?cjSku:\\s*)(?:null|"[^"]*")`),
      `$1${r.cjSku ? `"${r.cjSku}"` : "null"}`,
    );
    patchCount++;
  }

  fs.writeFileSync(PRODUCTS_FILE, source, "utf8");
  console.log(`\nPatched ${patchCount} product(s) in lib/products.js.`);
  console.log("Review the changes with: git diff lib/products.js");
}

main().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});
