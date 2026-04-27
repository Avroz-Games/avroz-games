(function () {
  const config = window.SUPABASE_CONFIG || {};
  const supabaseClient =
    window.supabase && config.url && config.anonKey
      ? window.supabase.createClient(config.url, config.anonKey)
      : null;

  const loginBox = document.getElementById("adminLogin");
  const panel = document.getElementById("adminPanel");
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");
  const adminUser = document.getElementById("adminUser");
  const ordersList = document.getElementById("ordersList");
  const ordersCount = document.getElementById("ordersCount");
  const ordersTotal = document.getElementById("ordersTotal");
  const ordersDiscount = document.getElementById("ordersDiscount");
  const refreshBtn = document.getElementById("refreshOrders");
  const logoutBtn = document.getElementById("logoutBtn");

  function formatBRL(value) {
    return Number(value || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function setMessage(message) {
    loginMessage.textContent = message;
  }

  function renderEmpty(message) {
    ordersList.innerHTML = `<div class="admin-empty">${message}</div>`;
    ordersCount.textContent = "0";
    ordersTotal.textContent = formatBRL(0);
    ordersDiscount.textContent = formatBRL(0);
  }

  function renderOrders(orders) {
    if (!orders.length) {
      renderEmpty("Nenhum pedido encontrado.");
      return;
    }

    const total = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
    const discount = orders.reduce((sum, order) => sum + Number(order.discount || 0), 0);

    ordersCount.textContent = String(orders.length);
    ordersTotal.textContent = formatBRL(total);
    ordersDiscount.textContent = formatBRL(discount);

    ordersList.innerHTML = orders
      .map((order) => {
        const customer = order.customer || {};
        const items = Array.isArray(order.items) ? order.items : [];
        const createdAt = new Date(order.created_at).toLocaleString("pt-BR");
        const address = [
          `${customer.street || ""}, ${customer.number || ""}`.trim(),
          customer.complement,
          customer.district,
          `${customer.city || ""}/${customer.state || ""}`.trim(),
          customer.zip,
        ]
          .filter(Boolean)
          .join(" - ");

        return `
          <article class="order-card">
            <div class="order-head">
              <div>
                <strong>Pedido ${order.id}</strong>
                <span>${createdAt}</span>
              </div>
              <span class="order-status">${order.status || "novo"}</span>
            </div>
            <div class="order-grid">
              <div>
                <h4>Cliente</h4>
                <p>${customer.name || "-"}</p>
                <p>${customer.email || "-"}</p>
                <p>${customer.phone || "-"}</p>
                <p>CPF: ${customer.document || "-"}</p>
              </div>
              <div>
                <h4>Entrega</h4>
                <p>${address || "-"}</p>
                <p>Referência: ${customer.reference || "-"}</p>
                <p>Frete: ${order.shipping_status || "a_calcular"}</p>
              </div>
              <div>
                <h4>Resumo</h4>
                <p>Subtotal: ${formatBRL(order.subtotal)}</p>
                <p>Desconto: ${formatBRL(order.discount)}</p>
                <p><strong>Total: ${formatBRL(order.total)}</strong></p>
                <p>Pagamento: ${order.payment_method || "a_confirmar"}</p>
              </div>
            </div>
            <div class="order-items">
              <h4>Itens</h4>
              <ul>
                ${items
                  .map(
                    (item) =>
                      `<li>${item.quantity}x ${item.name} - ${formatBRL(item.subtotal)}</li>`
                  )
                  .join("")}
              </ul>
            </div>
          </article>
        `;
      })
      .join("");
  }

  async function loadOrders() {
    ordersList.innerHTML = `<div class="admin-empty">Carregando pedidos...</div>`;

    const table = config.ordersTable || "orders";
    const { data, error } = await supabaseClient
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      renderEmpty("Não foi possível carregar os pedidos. Verifique as políticas de leitura no Supabase.");
      console.error(error);
      return;
    }

    renderOrders(data || []);
  }

  async function showPanel(session) {
    loginBox.hidden = true;
    panel.hidden = false;
    adminUser.textContent = session.user.email;
    await loadOrders();
  }

  async function init() {
    if (!supabaseClient) {
      setMessage("Supabase não configurado.");
      return;
    }

    const { data } = await supabaseClient.auth.getSession();
    if (data.session) {
      await showPanel(data.session);
    }
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supabaseClient) {
      setMessage("Supabase não configurado.");
      return;
    }

    const email = document.getElementById("adminEmail").value.trim();
    const redirectTo = `${location.origin}${location.pathname}`;
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    setMessage(
      error
        ? "Não foi possível enviar o link. Verifique o e-mail e as configurações do Supabase."
        : "Link enviado. Verifique seu e-mail para acessar a área de vendas."
    );
  });

  refreshBtn.addEventListener("click", loadOrders);

  logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    location.reload();
  });

  init();
})();
