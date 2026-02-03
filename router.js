/* UI router: put templates into iframe#frame */
(function(){
  window.BTLIDER = window.BTLIDER || {};
  const T = window.BTLIDER.templates = window.BTLIDER.templates || {};

  function patchSrcdoc(html){
    // Add a tiny bridge so buttons inside iframe can ask parent to open auth screens.
    const bridge = `
<script>
(function(){
  function post(type, payload){ try{ parent.postMessage({__btlider:true,type,payload}, '*'); }catch(e){} }
  document.addEventListener('click', function(e){
    var t=e.target; if(!t) return;
    var txt=(t.textContent||'').trim().toLowerCase();
    var id=(t.id||'').toLowerCase();
    if(id.includes('login') || id.includes('signin') || txt==='вхід' || txt==='увійти' || txt==='войти'){
      e.preventDefault(); e.stopPropagation(); post('OPEN_AUTH','login');
    }
    if(id.includes('register') || id.includes('signup') || txt==='реєстрація' || txt==='регистрация'){
      e.preventDefault(); e.stopPropagation(); post('OPEN_AUTH','register');
    }
  }, true);
})();
</script>`;
    if(html.includes("</body>")) return html.replace("</body>", bridge + "\n</body>");
return html + bridge;
  }

  window.BTLIDER.show = function(screen){
    const frame = document.getElementById('frame');
    if(!frame) return;
    const html = T[screen] || "";
    frame.srcdoc = patchSrcdoc(html || "<div style='color:#fff;padding:20px'>No template: "+screen+"</div>");
  };

  window.addEventListener('message', function(ev){
    const d = ev.data;
    if(!d || d.__btlider !== true) return;
    if(d.type === 'OPEN_AUTH'){
      window.BTLIDER.show('auth');
      // Optionally could switch mode inside auth later.
    }
  });
})();
