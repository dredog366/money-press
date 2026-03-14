const Stripe = require("stripe");
const https = require("https");
const { getProductsByIdMap } = require("../lib/products");

const PRODUCT_BY_ID = getProductsByIdMap();
const CJ_AUTH_URL = "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";
const CJ_ORDER_URL = "https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function httpsPost(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const raw = JSON.stringify(body);
    const { hostname, pathname } = new URL(url);
    const req = https.request(
      { hostname, path: pathname, method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(raw), ...headers } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error("CJ response parse error: " + data)); }
        });
      }
    );
    req.on("error", reject);
    req.write(raw);
    req.end();
  });
}

async function getCJToken() {
  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) throw new Error("CJ_API_KEY is not set");
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
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify Stripe webhook signature
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return res.status(500).json({ error: "STRIPE_WEBHOOK_SECRET is not configured" });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: "STRIPE_SECRET_KEY is not configured" });
  }

  let event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // req.body must be the raw Buffer — Vercel provides this when bodyParser is disabled
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  if (event.type !== "checkout.session.completed") {
    return res.status(200).json({ received: true, skipped: true });
  }

  const session = event.data.object;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    // Retrieve full line items from Stripe
    const lineItemsPage = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    const shippingDetails = session.shipping_details;

    if (!shippingDetails?.address) {
      console.error("No shipping address on session", session.id);
      return res.status(200).json({ received: true, error: "No shipping address" });
    }

    const addr = shippingDetails.address;

    // Build CJ order products list — requires cjVid to be mapped in lib/products.js
    const orderProducts = [];
    for (const li of lineItemsPage.data) {
      // Match by product name (Stripe stores the name we passed during checkout)
      const product = Object.values(PRODUCT_BY_ID).find(
        (p) => p.name === li.description
      );
      if (!product) {
        console.warn("Could not match line item to product:", li.description);
        continue;
      }
      if (!product.cjVid && !product.cjSku) {
        console.warn("Product has no CJ mapping:", product.name, "skipping fulfillment");
        continue;
      }
      orderProducts.push({
        vid: product.cjVid,
        quantity: li.quantity,
      });
    }

    if (orderProducts.length === 0) {
      console.error("No CJ-mapped products found in order", session.id);
      return res.status(200).json({ received: true, error: "No products with CJ mapping" });
    }

    const token = await getCJToken();

    const cjPayload = {
      orderNumber: session.id,
      shippingZip: addr.postal_code,
      shippingCountry: addr.country,
      shippingCountryCode: addr.country,
      shippingProvince: addr.state || "",
      shippingCity: addr.city,
      shippingAddress: addr.line1 + (addr.line2 ? " " + addr.line2 : ""),
      shippingPhone: shippingDetails.phone || "0000000000",
      shippingCustomerName: shippingDetails.name,
      remark: `FaceTea order ${session.id}`,
      products: orderProducts,
    };

    const cjRes = await httpsPost(CJ_ORDER_URL, cjPayload, { "CJ-Access-Token": token });

    if (!cjRes.result) {
      console.error("CJ order creation failed:", JSON.stringify(cjRes));
      return res.status(200).json({ received: true, cjError: cjRes.message });
    }

    console.log("CJ order created:", cjRes.data?.orderId, "for Stripe session:", session.id);
    return res.status(200).json({ received: true, cjOrderId: cjRes.data?.orderId });
  } catch (err) {
    console.error("Fulfill error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
