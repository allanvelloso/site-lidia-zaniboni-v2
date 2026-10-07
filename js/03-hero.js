"use strict";
/* =========================================================
   03 - HERO
   Anima o título de abertura palavra por palavra.
   ========================================================= */
var words = ["O", "peso", "de", "um", "problema", "jurídico", "não", "precisa", "ser", "carregado", "sozinho."];
document.getElementById("h1").innerHTML = words.map(function(w,i){
  return '<span class="word" style="animation-delay:'+(i*0.07)+'s">'+w+'</span>';
}).join(" ");
