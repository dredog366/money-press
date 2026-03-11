// ===========================
// Product data (fallback when /api/products unavailable)
// ===========================
const PRODUCTS_FALLBACK = [
  {
    id: 1,
    name: "Green Tea Brightening Serum",
    category: "Serums",
    price: 24.99,
    oldPrice: 34.99,
    badge: "Best Seller",
    desc: "Antioxidant-rich serum with matcha extract and vitamin C that visibly brightens and evens skin tone in as little as 2 weeks. Lightweight, fast-absorbing formula with hyaluronic acid and niacinamide.",
    emoji: "🍵",
    sku: "FT-SRM-001",
    size: "30 ml / 1 fl oz",
    skinType: "All skin types",
  },
  {
    id: 2,
    name: "Chamomile Calming Face Wash",
    category: "Cleansers",
    price: 14.99,
    oldPrice: null,
    badge: "New",
    desc: "Gentle foam cleanser with chamomile flower extract and calendula oil that soothes redness and removes impurities without stripping moisture. Leaves skin soft, balanced, and never tight.",
    emoji: "🌼",
    sku: "FT-CLN-002",
    size: "150 ml / 5 fl oz",
    skinType: "Sensitive & dry skin",
  },
  {
    id: 3,
    name: "White Tea Eye Cream",
    category: "Treatments",
    price: 34.99,
    oldPrice: 44.99,
    badge: "Sale",
    desc: "Delicate eye cream with white tea peptides and caffeine that visibly reduces dark circles, puffiness, and crow's feet. The least processed tea delivers premium antioxidant protection.",
    emoji: "☁️",
    sku: "FT-TRT-003",
    size: "15 ml / 0.5 fl oz",
    skinType: "All skin types",
  },
  {
    id: 4,
    name: "Oolong Hydrating Day Cream",
    category: "Moisturisers",
    price: 29.99,
    oldPrice: null,
    badge: null,
    desc: "Lightweight SPF 30 moisturiser with oolong tea polyphenols and ceramides. All-day hydration meets mineral sun protection in one non-greasy step. Sits beautifully under makeup.",
    emoji: "🌿",
    sku: "FT-MST-004",
    size: "50 ml / 1.7 fl oz",
    skinType: "All skin types",
  },
  {
    id: 5,
    name: "Black Tea Firming Toner",
    category: "Toners",
    price: 19.99,
    oldPrice: 27.99,
    badge: "Sale",
    desc: "Alcohol-free toner rich in black tea EGCG catechins. Visibly tightens pores, improves elasticity, and preps skin to absorb serums and moisturisers more effectively.",
    emoji: "🫖",
    sku: "FT-TNR-005",
    size: "200 ml / 6.8 fl oz",
    skinType: "Oily & combination skin",
  },
  {
    id: 6,
    name: "Matcha Detox Clay Mask",
    category: "Masks",
    price: 22.99,
    oldPrice: null,
    badge: "New",
    desc: "Deep-cleansing mask with ceremonial-grade matcha and French kaolin clay. Draws out impurities, excess oil, and pollutants in just 10 minutes — without over-drying or stripping.",
    emoji: "🧪",
    sku: "FT-MSK-006",
    size: "100 ml / 3.4 fl oz",
    skinType: "Oily & acne-prone skin",
  },
  {
    id: 7,
    name: "Rooibos Repair Night Oil",
    category: "Treatments",
    price: 39.99,
    oldPrice: null,
    badge: null,
    desc: "Nourishing facial oil with South African rooibos, rosehip seed oil, and jojoba. Works overnight to repair daily damage, reduce redness, and boost cell turnover while you sleep.",
    emoji: "🌙",
    sku: "FT-TRT-007",
    size: "30 ml / 1 fl oz",
    skinType: "Dry & mature skin",
  },
  {
    id: 8,
    name: "Hibiscus AHA Exfoliating Pads",
    category: "Exfoliants",
    price: 27.99,
    oldPrice: 35.99,
    badge: "Best Seller",
    desc: "Pre-soaked pads with hibiscus-derived AHAs and lactic acid. Textured side buffs dead skin cells; smooth side deposits brightening actives. No rinsing required — radiance in one swipe.",
    emoji: "🌺",
    sku: "FT-EXF-008",
    size: "50 pads per jar",
    skinType: "All skin types",
  },
  {
    id: 9,
    name: "Jade Gua Sha & Roller Set",
    category: "Tools",
    price: 24.99,
    oldPrice: null,
    badge: "New",
    desc: "Premium jade gua sha stone and facial roller duo for sculpting, depuffing, and boosting circulation. Use with your favourite serum or oil for a spa-worthy facial massage at home.",
    emoji: "💎",
    sku: "FT-TLS-009",
    size: "2-piece set with velvet pouch",
    skinType: "All skin types",
  },
  {
    id: 10,
    name: "Hydrocolloid Pimple Patches — Botanical Shapes",
    category: "Treatments",
    price: 9.99,
    oldPrice: null,
    badge: "Best Seller",
    desc: "Fun star, heart, and flower-shaped hydrocolloid patches that flatten blemishes overnight. Ultra-thin, invisible edges stay put under makeup. 36 patches per pack in assorted shapes.",
    emoji: "🌸",
    sku: "FT-TRT-010",
    size: "36 patches per pack",
    skinType: "Acne-prone skin",
  },
  {
    id: 11,
    name: "Ice Roller Facial Depuffer",
    category: "Tools",
    price: 18.99,
    oldPrice: null,
    badge: null,
    desc: "Stainless steel ice roller that stays cold for up to 10 minutes. Reduces morning puffiness, calms redness, and tightens pores. Keep in the freezer for an instant wake-up ritual.",
    emoji: "🧊",
    sku: "FT-TLS-011",
    size: "1 roller with storage cap",
    skinType: "All skin types",
  },
  {
    id: 12,
    name: "LED Light Therapy Wand",
    category: "Tools",
    price: 59.99,
    oldPrice: 79.99,
    badge: "Premium",
    desc: "4-in-1 skincare wand with red LED, blue LED, warmth, and microcurrent modes. Red light boosts collagen, blue light targets acne bacteria. Rechargeable with 3 intensity levels.",
    emoji: "✨",
    sku: "FT-TLS-012",
    size: "1 wand with USB-C charger",
    skinType: "All skin types",
  },
  {
    id: 13,
    name: "Centella & Green Tea Hydrating Serum",
    category: "Serums",
    price: 29.99,
    oldPrice: null,
    badge: "New",
    desc: "Calming serum with centella asiatica (cica) and green tea extract in a premium glass dropper bottle. Reduces redness, repairs the moisture barrier, and delivers deep hydration without stickiness.",
    emoji: "🌱",
    sku: "FT-SRM-013",
    size: "30 ml / 1 fl oz",
    skinType: "Sensitive & all skin types",
  },
];

let PRODUCTS = [...PRODUCTS_FALLBACK];

// ===========================
// Constants
// ===========================
const FREE_SHIPPING_THRESHOLD = 50;

// ===========================
// Cart state (persisted to localStorage)
// ===========================
let cart = JSON.parse(localStorage.getItem("facetea_cart") || "[]");

function saveCart() {
  localStorage.setItem("facetea_cart", JSON.stringify(cart));
}

// ===========================
// Render product filters
// ===========================
function renderFilters() {
  const filtersEl = document.getElementById("productFilters");
  if (!filtersEl) return;

  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  filtersEl.innerHTML =
    '<button class="filter-btn active" data-filter="all">All</button>' +
    categories
      .map(
        (cat) =>
          `<button class="filter-btn" data-filter="${cat}">${cat}</button>`,
      )
      .join("");

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filtersEl
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden-card");
      } else {
        card.classList.add("hidden-card");
      }
    });
  });
}

// ===========================
// Render products
// ===========================
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <article class="product-card" data-category="${p.category}">
      <div class="product-img-wrap">
        <div class="product-img" role="img" aria-label="${p.name}" style="display:flex;align-items:center;justify-content:center;font-size:5rem;">
          ${p.emoji}
        </div>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-body">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <p class="product-meta">${p.size} · ${p.skinType}</p>
      </div>
      <div class="product-footer">
        <span class="product-price">
          $${p.price.toFixed(2)}
          ${p.oldPrice ? `<span class="product-price-old">$${p.oldPrice.toFixed(2)}</span>` : ""}
        </span>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    </article>
  `,
  ).join("");

  grid.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

// ===========================
// Cart logic
// ===========================
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");
  const shippingNote = document.getElementById("cartShippingNote");

  if (countEl) countEl.textContent = cartItemCount();

  if (itemsEl) {
    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    } else {
      itemsEl.innerHTML = cart
        .map(
          (item) => `
        <div class="cart-item">
          <div class="cart-item-img" role="img" aria-label="${item.name}" style="display:flex;align-items:center;justify-content:center;font-size:2rem;">
            ${item.emoji}
          </div>
          <div class="cart-item-info">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</p>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
          </div>
        </div>
      `,
        )
        .join("");

      itemsEl.querySelectorAll(".qty-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          changeQty(Number(btn.dataset.id), Number(btn.dataset.delta)),
        );
      });
    }
  }

  if (footerEl) {
    footerEl.classList.toggle("hidden", cart.length === 0);
  }

  if (totalEl) totalEl.textContent = `$${cartTotal().toFixed(2)}`;

  // Free shipping progress
  if (shippingNote) {
    const total = cartTotal();
    if (total >= FREE_SHIPPING_THRESHOLD) {
      shippingNote.textContent = "🚚 You qualify for FREE shipping!";
    } else {
      const remaining = (FREE_SHIPPING_THRESHOLD - total).toFixed(2);
      shippingNote.textContent = `Add $${remaining} more for free shipping`;
    }
  }
}

// ===========================
// Cart sidebar open/close
// ===========================
function openCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar) {
    sidebar.classList.add("open");
    sidebar.setAttribute("aria-hidden", "false");
  }
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar) {
    sidebar.classList.remove("open");
    sidebar.setAttribute("aria-hidden", "true");
  }
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// ===========================
// Checkout — Stripe Checkout
// ===========================
async function handleCheckout() {
  if (cart.length === 0) return;

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.disabled = true;
    checkoutBtn.textContent = "Processing...";
  }

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((item) => ({ id: item.id, qty: item.qty })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Checkout failed");
    }

    // Redirect to Stripe Checkout
    window.location.href = data.url;
  } catch (err) {
    alert("Checkout error: " + err.message + ". Please try again.");
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.textContent = "Checkout";
    }
  }
}

// ===========================
// Mobile menu
// ===========================
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.textContent = nav.classList.contains("open") ? "✕" : "☰";
  });

  // Close menu when a link is clicked
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.textContent = "☰";
    });
  });
}

// ===========================
// Back to top button
// ===========================
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===========================
// Newsletter form
// ===========================
function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const success = document.getElementById("newsletterSuccess");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    if (success) success.classList.remove("hidden");
  });
}

// ===========================
// Contact form
// ===========================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("contactSuccess");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    if (success) success.classList.remove("hidden");
    setTimeout(() => success && success.classList.add("hidden"), 5000);
  });
}

// ===========================
// Footer category filter links
// ===========================
function initFooterFilters() {
  document.querySelectorAll("[data-filter]").forEach((link) => {
    if (link.classList.contains("filter-btn")) return; // skip filter buttons
    link.addEventListener("click", (e) => {
      const filter = link.dataset.filter;
      if (!filter) return;
      // Scroll to products and activate filter
      setTimeout(() => {
        const filterBtn = document.querySelector(
          `.filter-btn[data-filter="${filter}"]`,
        );
        if (filterBtn) filterBtn.click();
      }, 300);
    });
  });
}

// ===========================
// Load products from API (single source of truth), fallback to static list
// ===========================
async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      PRODUCTS = data;
    }
  } catch (_) {
    PRODUCTS = [...PRODUCTS_FALLBACK];
  }
}

// ===========================
// Init
// ===========================
document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  renderProducts();
  renderFilters();
  updateCartUI();
  initMobileMenu();
  initBackToTop();
  initNewsletter();
  initContactForm();
  initFooterFilters();

  const cartBtn = document.getElementById("cartBtn");
  const cartClose = document.getElementById("cartClose");
  const cartOverlay = document.getElementById("cartOverlay");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
  if (checkoutBtn) checkoutBtn.addEventListener("click", handleCheckout);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });
});
