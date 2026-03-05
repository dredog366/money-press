const Stripe = require("stripe");

// Valid product prices (server-side validation to prevent price tampering)
const PRODUCT_PRICES = {
  1: { name: "Green Tea Brightening Serum", price: 2499 },
  2: { name: "Chamomile Calming Face Wash", price: 1499 },
  3: { name: "White Tea Eye Cream", price: 3499 },
  4: { name: "Oolong Hydrating Day Cream", price: 2999 },
  5: { name: "Black Tea Firming Toner", price: 1999 },
  6: { name: "Matcha Detox Clay Mask", price: 2299 },
  7: { name: "Rooibos Repair Night Oil", price: 3999 },
  8: { name: "Hibiscus AHA Exfoliating Pads", price: 2799 },
};

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    // Build line items with server-side price validation
    const lineItems = items.map((item) => {
      const product = PRODUCT_PRICES[item.id];
      if (!product) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }
      const qty = Math.max(1, Math.min(99, Math.floor(item.qty)));
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: qty,
      };
    });

    // Calculate if free shipping applies ($50+ = free)
    const subtotal = lineItems.reduce(
      (sum, li) => sum + li.price_data.unit_amount * li.quantity,
      0
    );
    const shippingOptions =
      subtotal >= 5000
        ? [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 0, currency: "usd" },
                display_name: "Free Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 7 },
                  maximum: { unit: "business_day", value: 14 },
                },
              },
            },
          ]
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 499, currency: "usd" },
                display_name: "Standard Shipping",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 7 },
                  maximum: { unit: "business_day", value: 14 },
                },
              },
            },
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: 799, currency: "usd" },
                display_name: "Expedited Shipping (3-5 business days)",
                delivery_estimate: {
                  minimum: { unit: "business_day", value: 3 },
                  maximum: { unit: "business_day", value: 5 },
                },
              },
            },
          ];

    const origin = req.headers.origin || "https://facetea.org";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: shippingOptions,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel.html`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
