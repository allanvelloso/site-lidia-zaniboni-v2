"use strict";
/* =========================================================
   05 - EVENTOS DE SCROLL
   Barra de progresso de leitura, cabeçalho "colado" ao
   rolar, item ativo do menu, preenchimento da linha do
   tempo, efeito parallax institucional e botão "voltar ao topo".
   ========================================================= */

var siteHeader = document.getElementById("top"), prog = document.getElementById("progress"), totop = document.getElementById("totop");
var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav .links a"));
var tl = document.getElementById("tl"), tlfill = document.getElementById("tlfill"), tlItems = document.querySelectorAll(".tl__item");
var parallaxEls = Array.prototype.slice.call(document.querySelectorAll(".parallax"));

function onScroll(){
  var y = window.scrollY, h = document.body.scrollHeight - innerHeight;
  prog.style.width = (h>0 ? (y/h*100) : 0) + "%";
  siteHeader.classList.toggle("stuck", y > 20);
  totop.classList.toggle("show", y > 700);

  navLinks.forEach(function(a){
    var s = document.querySelector(a.getAttribute("href"));
    if(!s) return;
    var r = s.getBoundingClientRect();
    a.classList.toggle("on", r.top <= 140 && r.bottom > 140);
  });

  if(tl){
    var r = tl.getBoundingClientRect(), vis = Math.min(Math.max((innerHeight*0.72 - r.top)/r.height,0),1);
    tlfill.style.height = (vis * (r.height - 20)) + "px";
    tlItems.forEach(function(it){ it.classList.toggle("on", it.getBoundingClientRect().top < innerHeight*0.72); });
  }

  if(!reduce){
    parallaxEls.forEach(function(el){
      var speed = parseFloat(el.dataset.speed || "0.15");
      var r2 = el.parentElement.getBoundingClientRect();
      var offset = (r2.top) * speed;
      el.style.transform = "translateY(" + offset + "px)";
    });
  }
}

addEventListener("scroll", onScroll, {passive:true});
onScroll();

totop.addEventListener("click", function(){ scrollTo({top:0, behavior: reduce?"auto":"smooth"}); });
