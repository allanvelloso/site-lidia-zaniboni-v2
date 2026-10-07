"use strict";
/* =========================================================
   07 - MODAL
   Janela genérica reaproveitada em dois lugares:
   - detalhe de cada área de atuação (ver js/08-areas.js)
   - Política de Privacidade (aberta a partir do rodapé ou
     do formulário de contato, ver js/11-contato.js)
   ========================================================= */

var modal = document.getElementById("modal"), modalBody = document.getElementById("modalBody"), lastFocus = null;

function closeModal(){
  modal.classList.remove("open");
  if(!document.body.classList.contains("drawer-open")) document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}

function openPrivacy(){
  modalBody.innerHTML = '<h3>Política de Privacidade</h3><p class="lead">Como o escritório trata os dados enviados por este site, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>'
    + '<ul>'
    + '<li><b>O que coletamos:</b> nome, telefone, e-mail (quando informado) e o relato que você escreve sobre o seu caso.</li>'
    + '<li><b>Para que usamos:</b> exclusivamente para responder ao seu contato e, em caso de contratação, para a condução do seu processo.</li>'
    + '<li><b>Como enviamos:</b> os dados são transmitidos diretamente ao WhatsApp ou ao e-mail do escritório, sem passar por servidores de terceiros deste site.</li>'
    + '<li><b>Sigilo:</b> todo o conteúdo compartilhado está protegido pelo sigilo profissional advocatício, independentemente do canal usado.</li>'
    + '<li><b>Seus direitos:</b> você pode, a qualquer momento, solicitar a exclusão dos seus dados de nossos registros de atendimento, escrevendo para contato@lidiazaniboni.adv.br.</li>'
    + '<li><b>Retenção:</b> mensagens de contato não convertidas em atendimento são mantidas pelo tempo necessário para eventual retorno e depois descartadas.</li>'
    + '</ul>'
    + '<p style="font-size:.85rem;color:var(--muted)">Esta página não usa cookies de rastreamento nem compartilha dados com terceiros para fins de publicidade.</p>';
  lastFocus = document.activeElement;
  modal.classList.add("open"); document.body.style.overflow = "hidden";
  modal.querySelector(".x").focus();
}

modal.querySelectorAll("[data-close]").forEach(function(el){ el.addEventListener("click", closeModal); });

var privFooterBtn = document.getElementById("openPrivFooter");
if(privFooterBtn) privFooterBtn.addEventListener("click", openPrivacy);

// Escape fecha apenas o modal; o módulo 06 controla o drawer e seu estado ARIA.
addEventListener("keydown", function(e){
  if(e.key === "Escape" && modal.classList.contains("open")) closeModal();
});
