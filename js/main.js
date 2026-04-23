/* ============================================================
 *  NEOGEO+ — Script principal (header, carrinho global, toast)
 * ============================================================ */

const CART_KEY = "neogeoplus_cart_v1";

/* ------------ Carrinho (localStorage) ------------ */
const Cart = {
  items: [],
  load() {
    try {
      this.items = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      this.items = [];
    }
  },
  save() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    this.updateCount();
    document.dispatchEvent(new CustomEvent("cart:change"));
  },
  add(id, qty = 1) {
    const product = getProductById(id);
    if (!product) return;
    const existing = this.items.find((i) => i.id === id);
    if (existing) existing.qty += qty;
    else this.items.push({ id, qty });
    this.save();
    showToast(`Adicionado: ${product.name}`);
  },
  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this.save();
  },
  setQty(id, qty) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    this.save();
  },
  clear() {
    this.items = [];
    this.save();
  },
  totalQty() {
    return this.items.reduce((s, i) => s + i.qty, 0);
  },
  subtotal() {
    return this.items.reduce((s, i) => {
      const p = getProductById(i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },
  updateCount() {
    const el = document.getElementById("cartCount");
    if (el) el.textContent = this.totalQty();
  },
};

Cart.load();
Cart.updateCount();

/* ------------ Toast ------------ */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ------------ Header: menu mobile e busca ------------ */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
  }

  const searchBtn = document.getElementById("searchBtn");
  const searchBar = document.getElementById("searchBar");
  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", () => {
      searchBar.classList.toggle("open");
      if (searchBar.classList.contains("open")) {
        searchBar.querySelector("input")?.focus();
      }
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && searchInput.value.trim()) {
        window.location.href = `produtos.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  // Delegação global: botões .js-add-cart
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-add-cart");
    if (!btn) return;
    e.preventDefault();
    Cart.add(btn.dataset.id, 1);
  });

  // Render grids da home
  renderHomeGrids();
});

/* ------------ Home: grids de promoções e destaques ------------ */
function renderHomeGrids() {
  const promoGrid = document.getElementById("promoGrid");
  if (promoGrid) {
    // Mostra todos os 5 produtos da linha Neo Geo AES+
    promoGrid.innerHTML = PRODUCTS.map(productCardHTML).join("");
  }
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    const feats = PRODUCTS.filter((p) => p.featured).slice(0, 8);
    featuredGrid.innerHTML = feats.map(productCardHTML).join("");
  }
}
