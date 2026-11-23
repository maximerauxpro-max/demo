/* TEMPO, suivi des démos (19/11/2026) : ouverture, défilement > 50 %, clic. Pas de cookie, pas d'IP, pas de donnée personnelle.
   Exclus : robots / aperçus de liens, et les appareils marqués « moi » (page moi.html). */
(function(){
  var U="https://mtzccxepxxmyzzhljewe.supabase.co/rest/v1/demo_vues", K="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emNjeGVweHhteXp6aGxqZXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzI3OTAsImV4cCI6MjA4NTk0ODc5MH0.aVKgWv2Im0xOoCNhfGVQ160e4nWvnHOt_uGOUIuGPLY";
  var seg=location.pathname.split("/").filter(Boolean), last=seg[seg.length-1]||""; if(/\.html?$/.test(last)){ seg.pop(); last=last.replace(/\.html?$/,""); } else last="index"; var slug=((seg[seg.length-1]||"")+(last!=="index"?"/"+last:"")).slice(0,80); /* 23/11 : « demo/page » pour les sous-pages (avant : « carte.html » mélangeait les démos) */
  var ua=navigator.userAgent||"";
  try{ if(localStorage.getItem("tempo_moi")==="1") return; }catch(e){}
  if(/bot|crawl|spider|facebookexternalhit|facebot|whatsapp|telegram|preview|slurp|headless|lighthouse/i.test(ua)) return;
  if(/[?&]apercu=1/.test(location.search)) return;
  function envoie(ev){ try{ fetch(U,{method:"POST",keepalive:true,headers:{"apikey":K,"Authorization":"Bearer "+K,"Content-Type":"application/json","Prefer":"return=minimal"},
    body:JSON.stringify({slug:slug,evenement:ev,ua:ua.slice(0,300),referrer:(document.referrer||"").slice(0,300)})}); }catch(e){} }
  setTimeout(function(){ if(document.visibilityState!=="hidden") envoie("ouverture"); else document.addEventListener("visibilitychange",function v(){ if(document.visibilityState==="visible"){ envoie("ouverture"); document.removeEventListener("visibilitychange",v);} }); }, 1500);
  var vu=false; addEventListener("scroll",function(){ if(vu) return; var h=document.documentElement; if((h.scrollTop+innerHeight)/h.scrollHeight>0.5){ vu=true; envoie("defilement"); } },{passive:true});
  document.addEventListener("click",function(e){ var a=e.target.closest&&e.target.closest("a,button"); if(a&&/tempo|appel|tel:|mailto:|contact|rdv/i.test((a.href||"")+a.className+a.textContent)) envoie("clic"); });
})();
