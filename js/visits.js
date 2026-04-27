(function () {
  const config = window.SUPABASE_CONFIG || {};
  const supabaseClient =
    window.supabase && config.url && config.anonKey
      ? window.supabase.createClient(config.url, config.anonKey)
      : null;

  if (!supabaseClient) return;

  function ensureCounter() {
    let counter = document.getElementById("publicVisitCounter");
    if (counter) return counter;

    counter = document.createElement("div");
    counter.id = "publicVisitCounter";
    counter.className = "public-visit-counter";
    counter.setAttribute("aria-live", "polite");
    counter.innerHTML = '<span>Visitas</span><strong>...</strong>';
    document.body.appendChild(counter);
    return counter;
  }

  async function updatePublicCounter() {
    const counter = ensureCounter();
    const total = counter.querySelector("strong");
    const { data, error } = await supabaseClient.rpc("get_site_visit_count");

    if (error) {
      console.error("Erro ao carregar contador de visitas:", error);
      counter.hidden = true;
      return;
    }

    total.textContent = Number(data || 0).toLocaleString("pt-BR");
    counter.hidden = false;
  }

  async function registerVisit() {
    const visitKey = `avroz_visit_${location.pathname}`;
    const lastVisit = Number(sessionStorage.getItem(visitKey) || 0);
    const now = Date.now();

    if (now - lastVisit < 30 * 60 * 1000) return;
    sessionStorage.setItem(visitKey, String(now));

    const payload = {
      path: location.pathname || "/",
      page_title: document.title,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      language: navigator.language,
      screen_width: window.screen ? window.screen.width : null,
      screen_height: window.screen ? window.screen.height : null,
    };

    const { error } = await supabaseClient.from(config.visitsTable || "site_visits").insert(payload);
    if (error) console.error("Erro ao registrar visita:", error);
  }

  registerVisit().finally(updatePublicCounter);
})();
