"use strict";
/* =========================================================
   10 - PERGUNTAS FREQUENTES
   Anima a altura de cada resposta ao abrir/fechar.
   ========================================================= */

document.querySelectorAll(".faq details").forEach(function(d){
  var ans = d.querySelector(".ans");
  ans.style.height = "0px";
  d.addEventListener("toggle", function(){
    if(reduce){ ans.style.height = d.open ? "auto" : "0px"; return; }
    if(d.open){
      ans.style.transition = "height .35s cubic-bezier(.2,.8,.3,1)";
      ans.style.height = ans.scrollHeight + "px";
    } else {
      ans.style.height = ans.scrollHeight + "px";
      requestAnimationFrame(function(){ ans.style.height = "0px"; });
    }
  });
});
