const https = require("https");

const CJ_AUTH_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
const CJ_LIST_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/product/listV2";

// ---------------------------------------------------------------------------
// HTTP helpers (mirrors api/fulfill.js pattern — no extra deps)
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
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("CJ parse error: " + data));
          }
        });
      },
    );
    req.on("error", reject);
    req.write(raw);
    req.end();
  });
}

function httpsGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "GET",
        headers,
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("CJ parse error: " + data));
          }
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

async function getCJToken() {
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) throw new Error("CJ_API_KEY env var is not set");
  const res = await httpsPost(CJ_AUTH_URL, { apiKey });
  if (!res.result || !res.data?.accessToken) {
    throw new Error("CJ auth failed: " + (res.message || JSON.stringify(res)));
  }
  return res.data.accessToken;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Admin-only — requires the ADMIN_PASSWORD in x-admin-key header
  const adminKey = req.headers["x-admin-key"];
  if (!process.env.ADMIN_PASSWORD || adminKey !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { q = "", page = "1" } = req.query;
  if (!q.trim()) {
    return res.status(400).json({ error: "Query parameter ?q= is required" });
  }

  try {
    const token = await getCJToken();
    const searchUrl =
      `${CJ_LIST_URL}?keyWord=${encodeURIComponent(q.trim())}` +
      `&page=${Number(page)}&size=20`;

    const data = await httpsGet(searchUrl, { "CJ-Access-Token": token });

    if (!data.result) {
      return res
        .status(502)
        .json({ error: "CJ search failed: " + (data.message || "unknown") });
    }

    // listV2 returns data.content[0].productList
    const rawList = data.data?.content?.[0]?.productList || [];
    const products = rawList.map((p) => ({
      pid: p.id,
      name: p.nameEn,
      image: p.bigImage,
      price: p.sellPrice,
      categoryName: p.threeCategoryName || "",
      // listV2 doesn't return variants inline — use sku as fallback
      variants: [{
        vid: null,
        name: "Default",
        sku: p.sku || "",
        price: p.sellPrice,
        image: p.bigImage,
      }],
    }));

    return res.status(200).json({
      total: data.data?.totalRecords || 0,
      page: Number(page),
      products,
    });
  } catch (err) {
    console.error("CJ search error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
