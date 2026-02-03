/* Template loader (gzip base64 -> string) */
(function(){
  window.BTLIDER = window.BTLIDER || {};
  const T = window.BTLIDER.templates = window.BTLIDER.templates || {};

  async function gunzipBase64(b64){
    b64 = (b64||"").trim();
    if(!b64) return "";
    // base64 -> Uint8Array
    const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    // Modern browsers: DecompressionStream('gzip')
    if('DecompressionStream' in window){
      const ds = new DecompressionStream('gzip');
      const stream = new Blob([bin], {type:'application/gzip'}).stream().pipeThrough(ds);
      return await new Response(stream).text();
    }
    // Fallback: try plain text (if not gz) or show message
    try{
      return new TextDecoder('utf-8').decode(bin);
    }catch(e){
      console.error("[BTLIDER] No gzip support in this browser.", e);
      return "";
    }
  }

  window.BTLIDER.loadTemplates = async function(){
    const ids = [
      ["guest","GZ_GUEST"],
      ["auth","GZ_AUTH"],
      ["vv15","GZ_VV15"]
    ];
    for(const [key,id] of ids){
      const el = document.getElementById(id);
      if(!el) continue;
      const html = await gunzipBase64(el.textContent || "");
      if(html) T[key] = html;
    }
    return T;
  };
})();
