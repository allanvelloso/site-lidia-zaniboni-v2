"use strict";
/* =========================================================
   11 - FORMULÁRIO DE CONTATO
   Wizard em 3 etapas: assunto -> relato -> dados de contato.
   Termina com dois botões (WhatsApp e e-mail), ambos
   bloqueados até a pessoa aceitar a Política de Privacidade.
   ========================================================= */

var wizBody = document.getElementById("wizBody"), wizSteps = document.querySelectorAll(".wiz__steps i");
var data = {nome:"", fone:"", email:"", area:"", msg:""}, step = 1;

function setSteps(n){ wizSteps.forEach(function(el,i){ el.classList.toggle("on", i < n); }); }

function renderWiz(){
  setSteps(step);

  if(step === 1){
    wizBody.innerHTML = '<div class="fade"><h3>Sobre o que é o seu contato?</h3><p class="sub">Etapa 1 de 3</p><div class="chips" id="chips"></div>'
      + '<p class="err" id="e1">Escolha um assunto para continuar.</p>'
      + '<div class="wiz__nav"><button class="btn" id="n1">Continuar</button></div></div>';
    var ch = document.getElementById("chips");
    AREAS.map(function(a){return a.t;}).concat(["Outro assunto"]).forEach(function(t){
      var b = document.createElement("button");
      b.className = "chip" + (data.area===t ? " on" : ""); b.type="button"; b.textContent = t;
      b.addEventListener("click", function(){
        data.area = t;
        ch.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("on"); });
        b.classList.add("on"); document.getElementById("e1").style.display="none";
      });
      ch.appendChild(b);
    });
    document.getElementById("n1").addEventListener("click", function(){
      if(!data.area){ document.getElementById("e1").style.display="block"; return; }
      step = 2; renderWiz();
    });

  } else if(step === 2){
    wizBody.innerHTML = '<div class="fade"><h3>Conte o que aconteceu</h3><p class="sub">Etapa 2 de 3 — algumas linhas já ajudam.</p>'
      + '<label>Descrição<textarea id="msg" placeholder="Ex.: fui demitido em agosto e não recebi as verbas rescisórias.">'+data.msg+'</textarea></label>'
      + '<p class="err" id="e2">Escreva pelo menos uma frase sobre o seu caso.</p>'
      + '<div class="wiz__nav"><button class="btn btn--ghost" id="b2">Voltar</button><button class="btn" id="n2">Continuar</button></div></div>';
    document.getElementById("b2").addEventListener("click", function(){ data.msg = document.getElementById("msg").value; step=1; renderWiz(); });
    document.getElementById("n2").addEventListener("click", function(){
      data.msg = document.getElementById("msg").value.trim();
      if(data.msg.length < 10){ document.getElementById("e2").style.display="block"; return; }
      step = 3; renderWiz();
    });

  } else {
    wizBody.innerHTML = '<div class="fade"><h3>Como falamos com você?</h3><p class="sub">Etapa 3 de 3</p>'
      + '<label>Nome<input id="nome" type="text" value="'+data.nome+'" placeholder="Como devemos chamar você" autocomplete="name"></label>'
      + '<label>Telefone (WhatsApp)<input id="fone" type="tel" value="'+data.fone+'" placeholder="(22) 90000-0000" autocomplete="tel"></label>'
      + '<label>E-mail (opcional, para resposta alternativa)<input id="email" type="email" value="'+data.email+'" placeholder="voce@exemplo.com" autocomplete="email"></label>'
      + '<p class="err" id="e3">Informe pelo menos o seu nome.</p>'
      + '<label class="consent"><input type="checkbox" id="consent"><span>Li e concordo com a <button type="button" class="linkish" id="openPriv">Política de Privacidade</button> e autorizo o uso dos meus dados para este contato.</span></label>'
      + '<p class="err" id="e4">É preciso aceitar a política de privacidade para enviar.</p>'
      + '<div class="wiz__nav"><button class="btn btn--ghost" id="b3">Voltar</button><a class="btn" id="send" href="#" target="_blank" rel="noopener">Enviar no WhatsApp</a><a class="btn btn--ghost" id="sendMail" href="#">Enviar por e-mail</a></div>'
      + '<p class="sub" style="margin:1.1rem 0 0">Suas informações são tratadas com sigilo profissional e usadas apenas para responder a este contato.</p></div>';

    var send = document.getElementById("send"), sendMail = document.getElementById("sendMail"), consent = document.getElementById("consent");

    function build(){
      data.nome = document.getElementById("nome").value.trim();
      data.fone = document.getElementById("fone").value.trim();
      data.email = document.getElementById("email").value.trim();
      var t = "Olá! Meu nome é " + (data.nome || "(nome)") + ".\nAssunto: " + data.area + ".\n\n" + data.msg;
      if(data.fone) t += "\n\nTelefone para contato: " + data.fone;
      if(data.email) t += "\nE-mail para contato: " + data.email;
      send.href = WA + encodeURIComponent(t);
      var subject = "Contato pelo site — " + data.area;
      sendMail.href = "mailto:contato@lidiazaniboni.adv.br?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(t);
    }
    ["nome","fone","email"].forEach(function(id){ document.getElementById(id).addEventListener("input", build); });
    build();

    document.getElementById("b3").addEventListener("click", function(e){ e.preventDefault(); step=2; renderWiz(); });
    document.getElementById("openPriv").addEventListener("click", openPrivacy);

    function guard(e){
      build();
      var e3 = document.getElementById("e3"), e4 = document.getElementById("e4");
      var ok = true;
      if(!data.nome){ e3.style.display="block"; ok=false; } else { e3.style.display="none"; }
      if(!consent.checked){ e4.style.display="block"; ok=false; } else { e4.style.display="none"; }
      if(!ok) e.preventDefault();
    }
    send.addEventListener("click", guard);
    sendMail.addEventListener("click", guard);
  }
}

renderWiz();
