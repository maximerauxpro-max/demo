/* Supplisson Immobilier · maquette TEMPO : apparitions, carrousel (flèches + glisser), filtres, formulaire */
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
  else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)});}

  document.querySelectorAll('[data-rail]').forEach(function(bloc){
    var rail=bloc.querySelector('.rail');if(!rail)return;
    function pas(){var c=rail.querySelector('.carte');return c?c.getBoundingClientRect().width+14:300}
    bloc.querySelectorAll('[data-dir]').forEach(function(b){b.addEventListener('click',function(){rail.scrollBy({left:pas()*(+b.dataset.dir),behavior:'smooth'})})});
    var x0=0,s0=0,tire=false,bouge=false;
    rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;tire=true;bouge=false;x0=e.clientX;s0=rail.scrollLeft;rail.classList.add('tire')});
    window.addEventListener('pointermove',function(e){if(!tire)return;var d=e.clientX-x0;if(Math.abs(d)>4)bouge=true;rail.scrollLeft=s0-d});
    window.addEventListener('pointerup',function(){if(!tire)return;tire=false;rail.classList.remove('tire')});
    rail.addEventListener('click',function(e){if(bouge){e.preventDefault();bouge=false}},true);
  });

  var filtres=document.querySelectorAll('.filtres button');
  filtres.forEach(function(b){b.addEventListener('click',function(){
    filtres.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    var f=b.dataset.f,n=0;
    document.querySelectorAll('.bien').forEach(function(el){var ok=f==='tous'||el.dataset.type===f||el.dataset.zone===f;el.hidden=!ok;if(ok)n++});
    var c=document.querySelector('.compteur');if(c)c.textContent=n+(n>1?' biens':' bien');
  })});

  var h=(location.hash||'').slice(1);
  if(h){var fb=document.querySelector('.filtres button[data-f="'+h+'"]');if(fb)fb.click();}
  var form=document.querySelector('form.demande');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();var d=new FormData(form),l=[];
    d.forEach(function(v,k){if(v)l.push(k+' : '+v)});
    location.href='mailto:marieevesupplisson@gmail.com?subject='+encodeURIComponent('Demande depuis le site : '+(d.get('Projet')||'contact'))+'&body='+encodeURIComponent(l.join('\n'));
  });}
})();
