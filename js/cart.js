/* ============================================================
 *  AVROZ RETROGAMES — Página do carrinho de compras
 * ============================================================ */

(function () {
  const itemsEl = document.getElementById("cartItems");
  if (!itemsEl) return;

  // WhatsApp da loja (apenas dígitos, com DDI). Número oficial: +55 (19) 99415-9689
  const WHATSAPP_NUMBER = "5519994159689";

  // Cupom MAD2026 — concede 5% de desconto exclusivamente
  // no pagamento via PIX. Sem cupom, o valor cobrado é o mesmo do anúncio.
  const COUPONS = {
    MAD2026: { rate: 0.05, type: "pix", label: "Desconto MAD2026 PIX (-5%)" },
  };

  let activeCoupon = null; // { code, rate, type, label } ou null

  const checkoutForm = document.getElementById("checkoutForm");
  const supabaseConfig = window.SUPABASE_CONFIG || {};
  const supabaseClient =
    window.supabase && supabaseConfig.url && supabaseConfig.anonKey
      ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
      : null;

  function getOrderTotals() {
    const subtotal = Cart.subtotal();
    const couponRate = activeCoupon ? activeCoupon.rate : 0;
    const discount = subtotal * couponRate;
    const total = Math.max(0, subtotal - discount);

    return { subtotal, discount, total };
  }

  function renderItems() {
    if (Cart.items.length === 0) {
      itemsEl.innerHTML = `
        <div class="empty-cart">
          <img class="empty-cart-icon" src="img/icons/shopping-cart.svg" alt="" />
          <h3>Seu carrinho está vazio</h3>
          <p>Que tal dar uma olhada nos nossos jogos?</p>
          <a href="produtos.html" class="btn btn-primary" style="margin-top:14px;">Ver catálogo</a>
        </div>`;
      return;
    }

    itemsEl.innerHTML = Cart.items
      .map((item) => {
        const p = getProductById(item.id);
        if (!p) return "";
        const subtotal = p.price * item.qty;
        return `
          <div class="cart-item" data-id="${p.id}">
            <a href="produto.html?id=${p.id}" class="ci-img">
              <img src="${p.image}" alt="${p.name}" loading="lazy" />
            </a>
            <div>
              <a href="produto.html?id=${p.id}" class="ci-name">${p.name}</a>
              <div class="ci-meta">${CATEGORY_LABELS[p.category] || ""} • ${PLATFORM_LABELS[p.platform] || ""}</div>
              <div class="ci-meta" style="margin-top:4px;">${formatBRL(p.price)} un.</div>
            </div>
            <div class="ci-qty">
              <button data-action="dec" aria-label="Diminuir">−</button>
              <input type="number" min="1" value="${item.qty}" data-action="qty" />
              <button data-action="inc" aria-label="Aumentar">+</button>
            </div>
            <div class="ci-price">${formatBRL(subtotal)}</div>
            <button class="ci-remove" data-action="remove" aria-label="Remover">✕</button>
          </div>`;
      })
      .join("");

    itemsEl.querySelectorAll(".cart-item").forEach((row) => {
      const id = row.dataset.id;
      row.querySelector('[data-action="dec"]').addEventListener("click", () => {
        const item = Cart.items.find((i) => i.id === id);
        if (item && item.qty > 1) Cart.setQty(id, item.qty - 1);
        else Cart.remove(id);
      });
      row.querySelector('[data-action="inc"]').addEventListener("click", () => {
        const item = Cart.items.find((i) => i.id === id);
        if (item) Cart.setQty(id, item.qty + 1);
      });
      row.querySelector('[data-action="qty"]').addEventListener("change", (e) => {
        const n = Math.max(1, Number(e.target.value) || 1);
        Cart.setQty(id, n);
      });
      row.querySelector('[data-action="remove"]').addEventListener("click", () => {
        Cart.remove(id);
      });
    });
  }

  function renderSummary() {
    const { subtotal, discount, total } = getOrderTotals();

    document.getElementById("sumSubtotal").textContent = formatBRL(subtotal);
    document.getElementById("sumShipping").textContent = subtotal === 0 ? "—" : "A calcular";

    // Linha de desconto — visível apenas com cupom ativo
    const discountRow = document.getElementById("sumDiscountRow");
    const discountLabel = document.getElementById("sumDiscountLabel");
    const discountValue = document.getElementById("sumDiscount");
    if (activeCoupon && discount > 0) {
      discountRow.style.display = "";
      discountLabel.textContent = activeCoupon.label;
      discountValue.textContent = "- " + formatBRL(discount);
    } else {
      discountRow.style.display = "none";
    }

    // Rótulo do total: muda para PIX quando há cupom ativo.
    const totalLabel = document.getElementById("sumTotalLabel");
    if (activeCoupon && activeCoupon.type === "pix") {
      totalLabel.textContent = "Total dos produtos no PIX";
    } else {
      totalLabel.textContent = "Total dos produtos";
    }

    document.getElementById("sumTotal").textContent = formatBRL(total);
  }

  function renderAll() {
    renderItems();
    renderSummary();
  }

  // Cupom
  document.getElementById("applyCoupon").addEventListener("click", () => {
    const input = document.getElementById("couponInput");
    const code = input.value.trim().toUpperCase();
    if (COUPONS[code]) {
      activeCoupon = { code, ...COUPONS[code] };
      const pixMsg = activeCoupon.type === "pix" ? " — válido para pagamento no PIX" : "";
      showToast(`Cupom ${code} aplicado (-${Math.round(activeCoupon.rate * 100)}%)${pixMsg}`);
    } else if (code === "") {
      activeCoupon = null;
      showToast("Cupom removido");
    } else {
      activeCoupon = null;
      input.value = "";
      showToast("Cupom inválido ou expirado");
    }
    renderSummary();
  });

  function getCheckoutData() {
    return {
      name: document.getElementById("customerName").value.trim(),
      document: document.getElementById("customerDocument").value.trim(),
      email: document.getElementById("customerEmail").value.trim(),
      phone: document.getElementById("customerPhone").value.trim(),
      zip: document.getElementById("customerZip").value.trim(),
      state: document.getElementById("customerState").value.trim().toUpperCase(),
      street: document.getElementById("customerStreet").value.trim(),
      number: document.getElementById("customerNumber").value.trim(),
      complement: document.getElementById("customerComplement").value.trim(),
      district: document.getElementById("customerDistrict").value.trim(),
      city: document.getElementById("customerCity").value.trim(),
      reference: document.getElementById("customerReference").value.trim(),
    };
  }

  function getOrderItems() {
    return Cart.items
      .map((item) => {
        const product = getProductById(item.id);
        if (!product) return null;

        return {
          id: product.id,
          name: product.name,
          quantity: item.qty,
          unit_price: product.price,
          subtotal: product.price * item.qty,
        };
      })
      .filter(Boolean);
  }

  function buildOrderPayload(customer) {
    const totals = getOrderTotals();

    return {
      status: "novo",
      source: "github-pages",
      customer,
      items: getOrderItems(),
      coupon: activeCoupon
        ? {
            code: activeCoupon.code,
            type: activeCoupon.type,
            label: activeCoupon.label,
            rate: activeCoupon.rate,
          }
        : null,
      subtotal: Number(totals.subtotal.toFixed(2)),
      discount: Number(totals.discount.toFixed(2)),
      total: Number(totals.total.toFixed(2)),
      shipping_status: "a_calcular",
      payment_method: activeCoupon && activeCoupon.type === "pix" ? "pix" : "a_confirmar",
    };
  }

  async function saveOrderToSupabase(payload) {
    if (!supabaseClient) {
      showToast("Supabase ainda nao configurado; pedido seguira pelo WhatsApp");
      return null;
    }

    const table = supabaseConfig.ordersTable || "orders";
    const { data, error } = await supabaseClient.from(table).insert(payload).select("id").single();

    if (error) {
      throw error;
    }

    return data;
  }

  // Monta a mensagem de pedido que será enviada ao WhatsApp da loja.
  // Mantém o formato enxuto e em texto puro para facilitar a leitura pelo atendente.
  function buildWhatsAppMessage(customer, savedOrder) {
    const { subtotal, discount, total } = getOrderTotals();

    const lines = [];
    lines.push("Olá! Quero finalizar meu pedido na AVROZ RETROGAMES.");
    if (savedOrder?.id) {
      lines.push(`Pedido registrado no sistema: ${savedOrder.id}`);
    }
    lines.push("");
    lines.push("*Dados do cliente:*");
    lines.push(`Nome: ${customer.name}`);
    lines.push(`CPF: ${customer.document}`);
    lines.push(`E-mail: ${customer.email}`);
    lines.push(`Telefone/WhatsApp: ${customer.phone}`);
    lines.push("");
    lines.push("*Endereço de entrega:*");
    lines.push(`CEP: ${customer.zip}`);
    lines.push(`Endereço: ${customer.street}, ${customer.number}`);
    if (customer.complement) {
      lines.push(`Complemento: ${customer.complement}`);
    }
    lines.push(`Bairro: ${customer.district}`);
    lines.push(`Cidade/UF: ${customer.city}/${customer.state}`);
    if (customer.reference) {
      lines.push(`Referência: ${customer.reference}`);
    }
    lines.push("");
    lines.push("*Itens do pedido:*");
    Cart.items.forEach((item) => {
      const p = getProductById(item.id);
      if (!p) return;
      const itemSubtotal = p.price * item.qty;
      lines.push(`• ${p.name} — ${item.qty}x ${formatBRL(p.price)} = ${formatBRL(itemSubtotal)}`);
    });
    lines.push("");
    lines.push("*Resumo:*");
    lines.push(`Subtotal: ${formatBRL(subtotal)}`);
    lines.push("Frete: a calcular após confirmação do endereço.");
    if (activeCoupon && discount > 0) {
      lines.push(`${activeCoupon.label}: - ${formatBRL(discount)}`);
    }
    lines.push(`*Total dos produtos: ${formatBRL(total)}*`);
    lines.push("");
    if (activeCoupon && activeCoupon.type === "pix") {
      lines.push(`Forma de pagamento: *PIX à vista* (cupom ${activeCoupon.code} aplicado).`);
    } else {
      lines.push("Forma de pagamento: aguardo orientação (PIX, cartão ou boleto).");
    }
    lines.push("");
    lines.push("Poderia confirmar a disponibilidade e me enviar os dados para pagamento? Obrigado!");

    return lines.join("\n");
  }

  document.getElementById("checkoutBtn").addEventListener("click", async () => {
    if (Cart.items.length === 0) {
      showToast("Seu carrinho está vazio");
      return;
    }
    if (!checkoutForm.reportValidity()) {
      showToast("Preencha seus dados de contato e endereço");
      return;
    }

    const customer = getCheckoutData();
    const orderPayload = buildOrderPayload(customer);
    let savedOrder = null;

    try {
      savedOrder = await saveOrderToSupabase(orderPayload);
    } catch (error) {
      console.error("Erro ao salvar pedido no Supabase:", error);
      showToast("Nao foi possivel salvar no Supabase; pedido seguira pelo WhatsApp");
    }

    const message = buildWhatsAppMessage(customer, savedOrder);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
    showToast("Redirecionando para o WhatsApp...");
  });

  // Atualiza quando o carrinho mudar em outra aba / via Cart.add()
  document.addEventListener("cart:change", renderAll);

  renderAll();
})();
