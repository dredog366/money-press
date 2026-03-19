// ===========================
// Product data (loaded from /api/products on page load)
// ===========================
let PRODUCTS = [];

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
        ${p.image
          ? `<img class="product-img" src="${p.image}" alt="${p.name}" loading="lazy" />`
          : `<div class="product-img product-img-emoji" role="img" aria-label="${p.name}">${p.emoji}</div>`
        }
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
          <div class="cart-item-img" role="img" aria-label="${item.name}">
            ${item.image
              ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;" />`
              : `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:2rem;">${item.emoji}</span>`
            }
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
// Load products from API (single source of truth: lib/products.js)
// ===========================
async function loadProducts() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid product data received from API");
    }
    PRODUCTS = data;
  } catch (err) {
    console.error("Failed to load products from API:", err);
    // Show error message to user
    const productsGrid = document.getElementById("productsGrid");
    if (productsGrid) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <p style="font-size: 1.25rem; color: #999; margin-bottom: 1rem;">⚠️ Unable to load products</p>
          <p style="color: #666;">Please refresh the page or try again later.</p>
        </div>
      `;
    }
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
