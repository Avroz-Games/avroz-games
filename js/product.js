/* ============================================================
 *  NEOGEO+ — Página de produto individual (com galeria real)
 * ============================================================ */

(function () {
  const id = new URLSearchParams(location.search).get("id");
  const product = id ? getProductById(id) : null;

  if (!product) {
    document.getElementById("productPage").innerHTML = `
      <div class="container" style="padding:80px 0; text-align:center;">
        <h2>Produto não encontrado</h2>
        <p style="color:var(--text-dim); margin:12px 0 24px;">O produto que você procura pode ter saído do catálogo.</p>
        <a href="produtos.html" class="btn btn-primary">Voltar ao catálogo</a>
      </div>`;
    return;
  }

  document.title = `${product.name} | NEOGEO+`;

  document.getElementById("prodName").textContent = product.name;
  document.getElementById("bcName").textContent = product.name;
  const bcCat = document.getElementById("bcCat");
  if (bcCat) {
    bcCat.textContent = CATEGORY_LABELS[product.category] || "Catálogo";
    bcCat.href = `produtos.html?cat=${product.category}`;
  }

  // Descrição (com opção de longDescription em HTML)
  const descEl = document.getElementById("prodDesc");
  descEl.textContent = product.description;
  if (product.longDescription) {
    const extra = document.createElement("div");
    extra.className = "long-description";
    extra.innerHTML = product.longDescription;
    descEl.insertAdjacentElement("afterend", extra);
  }
  if (product.availableGames) {
    const games = document.createElement("div");
    games.className = "long-description";
    games.innerHTML = `
      <h3>Títulos disponíveis</h3>
      <ul>${product.availableGames.map((g) => `<li>${g}</li>`).join("")}</ul>
    `;
    descEl.insertAdjacentElement("afterend", games);
  }

  // Preço
  const installment = (product.price / 12).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const paymentLine = product.pixOnly
    ? `<span class="price-installment pix">à vista no PIX</span>`
    : `<span class="price-installment">ou 12x de ${installment} sem juros</span>`;
  const priceHTML = `
    ${product.oldPrice ? `<span class="price-old">${formatBRL(product.oldPrice)}</span>` : ""}
    <span class="price-now">${product.variants ? "A partir de " : ""}${formatBRL(product.price)}</span>
    ${paymentLine}
  `;
  document.getElementById("prodPrice").innerHTML = priceHTML;

  // Variantes (Original / Anniversary / Ultimate)
  if (product.variants && product.variants.length > 0) {
    const wrap = document.createElement("div");
    wrap.className = "variants";
    wrap.innerHTML = `
      <h4>Escolha a versão</h4>
      <div class="variant-options">
        ${product.variants
          .map(
            (v, i) => `
          <label class="variant-opt ${i === 0 ? "active" : ""}">
            <input type="radio" name="variant" value="${v.id}" data-price="${v.price}" ${i === 0 ? "checked" : ""} />
            <span class="v-label">${v.label}</span>
            <span class="v-price">${formatBRL(v.price)}</span>
          </label>`
          )
          .join("")}
      </div>
    `;
    document.getElementById("prodPrice").insertAdjacentElement("afterend", wrap);

    wrap.querySelectorAll('input[name="variant"]').forEach((r) => {
      r.addEventListener("change", () => {
        wrap.querySelectorAll(".variant-opt").forEach((el) => el.classList.remove("active"));
        r.closest(".variant-opt").classList.add("active");
        const newPrice = Number(r.dataset.price);
        const newInst = (newPrice / 12).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        document.getElementById("prodPrice").innerHTML = `
          <span class="price-now">${formatBRL(newPrice)}</span>
          <span class="price-installment">ou 12x de ${newInst} sem juros</span>
        `;
      });
    });
  }

  // Meta
  const meta = Object.entries(product.meta || {})
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
    .join("");
  const stockLine = `<li><strong>Estoque:</strong> ${
    product.stock > 0 ? `${product.stock} unidade(s)` : "Sob encomenda"
  }</li>`;
  document.getElementById("prodMeta").innerHTML = meta + stockLine;

  // Galeria com imagens reais
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const galleryMain = document.getElementById("galleryMain");
  galleryMain.innerHTML = `<img src="${images[0]}" alt="${product.name}" />`;

  const thumbsHtml = images
    .map(
      (src, i) => `
      <button class="thumb ${i === 0 ? "active" : ""}" data-src="${src}">
        <img src="${src}" alt="Miniatura ${i + 1}" loading="lazy" />
      </button>`
    )
    .join("");
  document.getElementById("galleryThumbs").innerHTML = thumbsHtml;

  document.querySelectorAll(".gallery-thumbs .thumb").forEach((t) => {
    t.addEventListener("click", () => {
      document.querySelectorAll(".gallery-thumbs .thumb").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      galleryMain.innerHTML = `<img src="${t.dataset.src}" alt="${product.name}" />`;
    });
  });

  // Quantidade
  const qtyInput = document.getElementById("qtyInput");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qtyInput.value = Number(qtyInput.value) + 1;
  });

  document.getElementById("addToCart").addEventListener("click", () => {
    Cart.add(product.id, Number(qtyInput.value) || 1);
  });
  document.getElementById("buyNow").addEventListener("click", () => {
    Cart.add(product.id, Number(qtyInput.value) || 1);
    setTimeout(() => (window.location.href = "carrinho.html"), 400);
  });

  // Relacionados
  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.platform === product.platform)
  ).slice(0, 4);
  document.getElementById("relatedGrid").innerHTML = related.map(productCardHTML).join("");
})();
