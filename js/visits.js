(function () {
  const config = window.SUPABASE_CONFIG || {};
  const supabaseClient =
    window.supabase && config.url && config.anonKey
      ? window.supabase.createClient(config.url, config.anonKey)
      : null;

  if (!supabaseClient) return;

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

  supabaseClient
    .from(config.visitsTable || "site_visits")
    .insert(payload)
    .then(({ error }) => {
      if (error) console.error("Erro ao registrar visita:", error);
    });
})();
