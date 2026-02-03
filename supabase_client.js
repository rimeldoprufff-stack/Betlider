/* Supabase client init (root) */
(function(){
  window.BTLIDER = window.BTLIDER || {};
  const cfg = window.BTLIDER_CONFIG || {};
  if(!window.supabase || typeof window.supabase.createClient !== 'function'){
    console.warn("[BTLIDER] Supabase UMD not loaded yet.");
    return;
  }
  try{
    window.BTLIDER.sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
  }catch(e){
    console.error("[BTLIDER] Supabase init failed:", e);
  }
})();
