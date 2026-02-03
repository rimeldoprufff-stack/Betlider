// Extracted from original index.html
// ===== BOOT (early) =====
(function(){
  const logs = [];
  const maxLog = 400;
  function ts(){ const d=new Date(); return d.toISOString().replace('T',' ').replace('Z',''); }
  function push(level,msg,err){
    const line = `[${ts()}] ${level}: ${msg}` + (err?`\n${String(err && (err.stack||err))}`:"");
    logs.push(line); if(logs.length>maxLog) logs.shift();
    try { const pre = document.getElementById('logText'); if(pre) pre.textContent = logs.join("\n\n"); } catch(_e){}
  }
  window.__BTLIDER_LOG = push;

  window.addEventListener('error', (e)=>{
    push('ERROR', e.message || 'error', e.error || '');
    try { const t=document.getElementById('toast'); if(t){ t.textContent = 'Помилка: '+(e.message||'error'); t.style.display='block'; setTimeout(()=>t.style.display='none', 3500); } } catch(_e){}
  }, true);

  window.addEventListener('unhandledrejection', (e)=>{
    push('REJECT', 'unhandledrejection', e.reason || '');
    try { const t=document.getElementById('toast'); if(t){ t.textContent = 'Помилка: unhandledrejection'; t.style.display='block'; setTimeout(()=>t.style.display='none', 3500); } } catch(_e){}
  });

  window.__BTLIDER_UI = {
    toggleLog() {
      const p=document.getElementById('logPanel');
      if(!p) return;
      p.style.display = (p.style.display==='flex') ? 'none' : 'flex';
      push('INFO','LOG_PANEL_TOGGLE');
    },
    setSplash(pct, text) {
      const i=document.querySelector('#splash .bar > i');
      const p=document.querySelector('#splash .pct');
      const s=document.querySelector('#splash .sub');
      if(i) i.style.width = Math.max(0,Math.min(100,pct||0))+'%';
      if(p) p.textContent = (pct==null? '' : (Math.round(pct)+'%'));
      if(s && text) s.textContent = text;
    },
    hideSplash() {
      const sp=document.getElementById('splash');
      if(sp) sp.style.display='none';
    }
  };

  push('INFO','BOOT_EARLY_SCRIPT_OK');

  setTimeout(()=>{
    const sp=document.getElementById('splash');
    if(sp && sp.style.display!=='none') {
      push('WARN','WATCHDOG_SPLASH_12S');
      try {
        const sub=document.querySelector('#splash .sub');
        if(sub) sub.textContent = 'Довге завантаження на телефоні. Якщо не рушає — цей 1-файл занадто важкий для браузера. Використай split-версію.';
      } catch(_e){}
    }
  }, 12000);
})();
