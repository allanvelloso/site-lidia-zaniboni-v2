"use strict";
/* =========================================================
   02 - TEMA CLARO / ESCURO
   Alterna o atributo data-theme e lembra a escolha da
   pessoa no localStorage.
   ========================================================= */

var root = document.documentElement, tbtn = document.getElementById("theme");

try{
  var saved = localStorage.getItem("lz-theme");
  if(saved) root.setAttribute("data-theme", saved);
}catch(e){}

tbtn.addEventListener("click", function(){
  var cur = root.getAttribute("data-theme");
  var sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var next = cur ? (cur === "dark" ? "light" : "dark") : (sysDark ? "light" : "dark");
  root.setAttribute("data-theme", next);
  try{ localStorage.setItem("lz-theme", next); }catch(e){}
});
