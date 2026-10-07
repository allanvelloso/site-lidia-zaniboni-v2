"use strict";
/* =========================================================
   06 - MENU MOBILE (DRAWER)
   Drawer fullscreen com foco, teclado e bloqueio do scroll.
   ========================================================= */
var drawer = document.getElementById("drawer");
var burger = document.getElementById("burger");
var closeDrawer = document.getElementById("closeDrawer");
var drawerLastFocus = null;

function openDrawer(){
  drawerLastFocus = document.activeElement;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  burger.setAttribute("aria-expanded", "true");
  document.body.classList.add("drawer-open");
  closeDrawer.focus();
}
function closeDrawerMenu(){
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  burger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("drawer-open");
  if(drawerLastFocus && typeof drawerLastFocus.focus === "function") drawerLastFocus.focus();
}

burger.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerMenu);
drawer.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeDrawerMenu); });
addEventListener("keydown", function(e){
  if(e.key === "Escape" && drawer.classList.contains("open")) closeDrawerMenu();
});
