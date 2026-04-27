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
  const visitsCount = document.getElementById("visitsCount");
  const visitsToday = document.getElementById("visitsToday");
  const lastVisit = document.getElementById("lastVisit");
  const visitsList = document.getElementById("visitsList");
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

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDateTime(value) {
    return value ? new Date(value).toLocaleString("pt-BR") : "-";
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
                <strong>Pedido ${escapeHTML(order.id)}</strong>
                <span>${createdAt}</span>
              </div>
              <span class="order-status">${escapeHTML(order.status || "novo")}</span>
            </div>
            <div class="order-grid">
              <div>
                <h4>Cliente</h4>
                <p>${escapeHTML(customer.name || "-")}</p>
                <p>${escapeHTML(customer.email || "-")}</p>
                <p>${escapeHTML(customer.phone || "-")}</p>
                <p>CPF: ${escapeHTML(customer.document || "-")}</p>
              </div>
              <div>
                <h4>Entrega</h4>
                <p>${escapeHTML(address || "-")}</p>
                <p>Referência: ${escapeHTML(customer.reference || "-")}</p>
                <p>Frete: ${escapeHTML(order.shipping_status || "a_calcular")}</p>
              </div>
              <div>
                <h4>Resumo</h4>
                <p>Subtotal: ${formatBRL(order.subtotal)}</p>
                <p>Desconto: ${formatBRL(order.discount)}</p>
                <p><strong>Total: ${formatBRL(order.total)}</strong></p>
                <p>Pagamento: ${escapeHTML(order.payment_method || "a_confirmar")}</p>
              </div>
            </div>
            <div class="order-items">
              <h4>Itens</h4>
              <ul>
                ${items
                  .map(
                    (item) =>
                      `<li>${escapeHTML(item.quantity)}x ${escapeHTML(item.name)} - ${formatBRL(item.subtotal)}</li>`
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

  function renderVisits(recentVisits, totalCount, todayCount) {
    visitsCount.textContent = String(totalCount || 0);
    visitsToday.textContent = String(todayCount || 0);
    lastVisit.textContent = recentVisits.length ? formatDateTime(recentVisits[0].created_at) : "-";

    if (!recentVisits.length) {
      visitsList.innerHTML = `<div class="admin-empty">Nenhuma visita encontrada.</div>`;
      return;
    }

    visitsList.innerHTML = `
      <div class="visit-table">
        ${recentVisits
          .map(
            (visit) => `
              <div class="visit-row">
                <strong>${escapeHTML(visit.path || "/")}</strong>
                <span>${formatDateTime(visit.created_at)}</span>
                <small>${escapeHTML(visit.page_title || "Página sem título")}</small>
                <small>Origem: ${escapeHTML(visit.referrer || "Direto")}</small>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  async function loadVisits() {
    visitsList.innerHTML = `<div class="admin-empty">Carregando visitas...</div>`;

    const table = config.visitsTable || "site_visits";
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [totalResult, todayResult, recentResult] = await Promise.all([
      supabaseClient.from(table).select("id", { count: "exact", head: true }),
      supabaseClient
        .from(table)
        .select("id", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),
      supabaseClient
        .from(table)
        .select("path,page_title,referrer,created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    const error = totalResult.error || todayResult.error || recentResult.error;
    if (error) {
      visitsCount.textContent = "0";
      visitsToday.textContent = "0";
      lastVisit.textContent = "-";
      visitsList.innerHTML = `<div class="admin-empty">Não foi possível carregar as visitas. Execute o script supabase/visits.sql no Supabase.</div>`;
      console.error(error);
      return;
    }

    renderVisits(recentResult.data || [], totalResult.count, todayResult.count);
  }

  async function loadDashboard() {
    await Promise.all([loadOrders(), loadVisits()]);
  }

  async function showPanel(session) {
    loginBox.hidden = true;
    panel.hidden = false;
    adminUser.textContent = session.user.email;
    await loadDashboard();
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

  refreshBtn.addEventListener("click", loadDashboard);

  logoutBtn.addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    location.reload();
  });

  init();
})();
