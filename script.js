// ===========================
// Product data
// ===========================
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: 79.99,
    oldPrice: 129.99,
    badge: "Sale",
    desc: "Premium sound quality with up to 30 hours of battery life and active noise cancellation.",
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Smart Fitness Tracker",
    category: "Health & Fitness",
    price: 49.99,
    oldPrice: 79.99,
    badge: "Best Seller",
    desc: "Track your heart rate, steps, sleep and more. Water-resistant with 7-day battery.",
    emoji: "⌚",
  },
  {
    id: 3,
    name: "Portable Phone Stand",
    category: "Accessories",
    price: 14.99,
    oldPrice: null,
    badge: null,
    desc: "Adjustable aluminium desk stand compatible with all smartphones and tablets.",
    emoji: "📱",
  },
  {
    id: 4,
    name: "LED Desk Lamp",
    category: "Home & Office",
    price: 34.99,
    oldPrice: 49.99,
    badge: "Sale",
    desc: "Dimmable LED lamp with USB charging port and 5 colour temperature settings.",
    emoji: "💡",
  },
  {
    id: 5,
    name: "Insulated Water Bottle",
    category: "Lifestyle",
    price: 24.99,
    oldPrice: null,
    badge: "New",
    desc: "Keeps drinks cold for 24 hrs or hot for 12 hrs. BPA-free stainless steel.",
    emoji: "🥤",
  },
  {
    id: 6,
    name: "Magnetic Phone Car Mount",
    category: "Automotive",
    price: 19.99,
    oldPrice: 29.99,
    badge: "Sale",
    desc: "Strong magnetic hold with 360° rotation. Fits any vent and all phone sizes.",
    emoji: "🚗",
  },
  {
    id: 7,
    name: "Yoga Mat",
    category: "Health & Fitness",
    price: 29.99,
    oldPrice: null,
    badge: null,
    desc: "Non-slip, eco-friendly mat with alignment lines. 6mm thick for joint support.",
    emoji: "🧘",
  },
  {
    id: 8,
    name: "USB-C Multi-Port Hub",
    category: "Electronics",
    price: 39.99,
    oldPrice: 59.99,
    badge: "Best Seller",
    desc: "7-in-1 hub with 4K HDMI, USB 3.0, SD card reader and 100W PD charging.",
    emoji: "🔌",
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
