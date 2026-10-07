"use strict";
/* =========================================================
   04 - REVELAR AO ROLAR
   Mostra elementos com a classe .rv conforme entram na tela,
   e anima os números da faixa de estatísticas do herói.
   ========================================================= */

var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

var cio = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting) return;
    var el = e.target, end = +el.dataset.count, sfx = el.dataset.suffix || "", t = 0;
    if(reduce){ el.textContent = end + sfx; cio.unobserve(el); return; }
    var iv = setInterval(function(){
      t += 1; el.textContent = Math.min(t, end) + (t>=end ? sfx : "");
      if(t >= end) clearInterval(iv);
    }, 900/Math.max(end,1));
    cio.unobserve(el);
  });
},{threshold:.6});
document.querySelectorAll("[data-count]").forEach(function(el){ cio.observe(el); });
