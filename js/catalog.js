/* ============================================================
 *  AVROZ RETROGAMES — Catálogo com filtros, busca e ordenação
 * ============================================================ */

(function () {
  const $ = (sel) => document.querySelector(sel);
  const grid = $("#catalogGrid");
  if (!grid) return;

  const state = {
    cat: "",
    platforms: new Set(),
    priceMin: null,
    priceMax: null,
    onlyPromo: false,
    onlyStock: false,
    sort: "relevance",
    query: "",
  };

  // --- Bootstrap a partir da URL ---
  const params = new URLSearchParams(location.search);
  if (params.get("cat")) state.cat = params.get("cat");
  if (params.get("q")) state.query = params.get("q");
  if (params.get("promo") === "1") state.onlyPromo = true;

  // Sincroniza UI com estado inicial
  const catRadio = document.querySelector(`input[name="cat"][value="${state.cat}"]`);
  if (catRadio) catRadio.checked = true;
  if (state.onlyPromo) $("#onlyPromo").checked = true;

  // Título e subtítulo dinâmicos
  updateHeadings();

  // --- Listeners ---
  document.querySelectorAll('input[name="cat"]').forEach((r) => {
    r.addEventListener("change", () => {
      state.cat = r.value;
      render();
      updateHeadings();
    });
  });
  document.querySelectorAll('[data-filter="platform"] input').forEach((c) => {
    c.addEventListener("change", () => {
      if (c.checked) state.platforms.add(c.value);
      else state.platforms.delete(c.value);
      render();
    });
  });
  $("#priceMin").addEventListener("input", (e) => {
    state.priceMin = e.target.value ? Number(e.target.value) : null;
    render();
  });
  $("#priceMax").addEventListener("input", (e) => {
    state.priceMax = e.target.value ? Number(e.target.value) : null;
    render();
  });
  $("#onlyPromo").addEventListener("change", (e) => {
    state.onlyPromo = e.target.checked;
    render();
  });
  $("#onlyStock").addEventListener("change", (e) => {
    state.onlyStock = e.target.checked;
    render();
  });
  $("#sortSelect").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  $("#clearFilters").addEventListener("click", () => {
    state.cat = "";
    state.platforms.clear();
    state.priceMin = null;
    state.priceMax = null;
    state.onlyPromo = false;
    state.onlyStock = false;
    state.sort = "relevance";
    state.query = "";
    document.querySelectorAll('input[name="cat"]').forEach((r) => (r.checked = r.value === ""));
    document.querySelectorAll('[data-filter="platform"] input').forEach((c) => (c.checked = false));
    $("#priceMin").value = "";
    $("#priceMax").value = "";
    $("#onlyPromo").checked = false;
    $("#onlyStock").checked = false;
    $("#sortSelect").value = "relevance";
    render();
    updateHeadings();
  });

  function updateHeadings() {
    const title = $("#pageTitle");
    const sub = $("#pageSubtitle");
    const bc = $("#bcCat");
    if (state.onlyPromo) {
      title.textContent = "Promoções Ativas";
      sub.textContent = "Ofertas por tempo limitado — aproveite!";
      bc.textContent = "Promoções";
    } else if (state.cat && CATEGORY_LABELS[state.cat]) {
      title.textContent = CATEGORY_LABELS[state.cat];
      sub.textContent = `Explore nossa seção de ${CATEGORY_LABELS[state.cat].toLowerCase()}.`;
      bc.textContent = CATEGORY_LABELS[state.cat];
    } else if (state.query) {
      title.textContent = `Resultados para "${state.query}"`;
      sub.textContent = "Refine os filtros ao lado para encontrar o que procura.";
      bc.textContent = `Busca: ${state.query}`;
    } else {
      title.textContent = "Catálogo Neo Geo AES+";
      sub.textContent = "A linha oficial completa: console, controles, cartuchos e acessórios.";
      bc.textContent = "Catálogo";
    }
  }

  function applyFilters(list) {
    return list.filter((p) => {
      if (state.cat && p.category !== state.cat) return false;
      if (state.platforms.size > 0 && !state.platforms.has(p.platform)) return false;
      if (state.priceMin != null && p.price < state.priceMin) return false;
      if (state.priceMax != null && p.price > state.priceMax) return false;
      if (state.onlyPromo && !p.promo) return false;
      if (state.onlyStock && (!p.stock || p.stock <= 0)) return false;
      if (state.query) {
        const q = state.query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !(p.description || "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }

  function applySort(list) {
    const sorted = [...list];
    switch (state.sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price); break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price); break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")); break;
      case "discount":
        sorted.sort((a, b) => calcDiscount(b) - calcDiscount(a)); break;
      default:
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return sorted;
  }

  function render() {
    const filtered = applySort(applyFilters(PRODUCTS));
    $("#resultsCount").textContent = `${filtered.length} produto${filtered.length === 1 ? "" : "s"}`;
    if (filtered.length === 0) {
      grid.innerHTML = "";
      $("#emptyState").hidden = false;
    } else {
      $("#emptyState").hidden = true;
      grid.innerHTML = filtered.map(productCardHTML).join("");
    }
  }

  render();
})();
