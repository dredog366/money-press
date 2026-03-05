// ===========================
// Product data
// ===========================
const PRODUCTS = [
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
];

// ===========================
// Cart state
// ===========================
let cart = [];

// ===========================
// Render products
// ===========================
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="product-card">
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
  `).join("");

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

  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

function changeQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
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

  if (countEl) countEl.textContent = cartItemCount();

  if (itemsEl) {
    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    } else {
      itemsEl.innerHTML = cart.map((item) => `
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
      `).join("");

      itemsEl.querySelectorAll(".qty-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          changeQty(Number(btn.dataset.id), Number(btn.dataset.delta))
        );
      });
    }
  }

  if (footerEl) {
    footerEl.classList.toggle("hidden", cart.length === 0);
  }

  if (totalEl) totalEl.textContent = `$${cartTotal().toFixed(2)}`;
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
}

function closeCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar) {
    sidebar.classList.remove("open");
    sidebar.setAttribute("aria-hidden", "true");
  }
  if (overlay) overlay.classList.remove("active");
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
// Init
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartUI();
  initNewsletter();
  initContactForm();

  const cartBtn = document.getElementById("cartBtn");
  const cartClose = document.getElementById("cartClose");
  const cartOverlay = document.getElementById("cartOverlay");

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);
});
