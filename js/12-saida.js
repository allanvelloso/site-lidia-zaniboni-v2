"use strict";
/* =========================================================
   12 - AVISO DE SAÍDA (exit-intent)
   Detecta quando o ponteiro do mouse sai por CIMA da janela
   (sinal clássico de que a pessoa vai fechar a aba ou trocar
   de página) e mostra uma mensagem de agradecimento, usando
   o mesmo modal já usado pelas áreas e pela política de
   privacidade (ver js/07-modal.js).

   Só funciona em telas com mouse de verdade (não dispara no
   celular, onde não existe "sair por cima da tela") e
   aparece no máximo uma vez por visita.
   ========================================================= */

var exitArmed = false;
var exitShown = false;

function openExitPopup(){
  if(exitShown) return;
  try{ if(sessionStorage.getItem("lz-exit-shown")){ exitShown = true; return; } }catch(e){}

  exitShown = true;
  try{ sessionStorage.setItem("lz-exit-shown", "1"); }catch(e){}

  modalBody.innerHTML = '<h3>Antes de você ir...</h3>'
    + '<p class="lead">Obrigado por visitar o site da Lidia Zaniboni &amp; Advogados Associados. Conseguiu tirar as suas dúvidas?</p>'
    + '<p style="color:var(--muted);font-size:.95rem">Se ainda ficou alguma pergunta sobre o seu caso, é só chamar — a conversa inicial não tem nenhum compromisso.</p>'
    + '<div style="display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.3rem">'
    + '<a class="btn" href="'+WA+encodeURIComponent("Olá! Estava vendo o site e fiquei com uma dúvida.")+'" target="_blank" rel="noopener">Falar no WhatsApp</a>'
    + '<button type="button" class="btn btn--ghost" id="exitClose">Só estava olhando, obrigado</button>'
    + '</div>';

  // o botão acima foi criado agora, então precisa do próprio listener
  // (o listener geral de "[data-close]" em 07-modal.js só olha o que já existia na página)
  document.getElementById("exitClose").addEventListener("click", closeModal);

  lastFocus = document.activeElement;
  modal.classList.add("open"); document.body.style.overflow = "hidden";
  modal.querySelector(".x").focus();
}

function handleExitIntent(e){
  if(!exitArmed || exitShown) return;
  if(modal.classList.contains("open")) return; // já tem um modal aberto, não interrompe
  if(e.clientY > 10) return;                    // só quando o ponteiro sobe até perto do topo
  if(e.relatedTarget || e.toElement) return;     // saiu para dentro da própria página, não da aba
  openExitPopup();
}

// só liga a detecção em telas com mouse de verdade (evita falso positivo em celular/tablet)
// e só depois de alguns segundos, para não disparar por um movimento inicial do mouse
if(window.matchMedia("(hover: hover) and (pointer: fine)").matches){
  setTimeout(function(){
    exitArmed = true;
    document.addEventListener("mouseout", handleExitIntent);
  }, 4000);
}
