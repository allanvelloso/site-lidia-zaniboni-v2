"use strict";
/* =========================================================
   08 - ÁREAS DE ATUAÇÃO
   Os dados de cada área (o "banco de dados" do site), a
   montagem dos cards na tela e a abertura do modal de
   detalhe. Para adicionar ou editar uma área, mexa só no
   array AREAS abaixo.
   ========================================================= */

var ICON = {
  fam:'<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5M17 15c3 0 5 1.8 5 4"/>',
  prev:'<path d="M12 3v9l5 3M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>',
  trab:'<path d="M3 8h18v12H3zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  civ:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h4"/>',
  cons:'<path d="M3 4h2l2.6 11.6a2 2 0 0 0 2 1.4h7.7a2 2 0 0 0 2-1.5L21 8H6M9 21h.01M18 21h.01"/>',
  imo:'<path d="M3 10.5 12 4l9 6.5M5 9.5V20h14V9.5M10 20v-6h4v6"/>'
};

var AREAS = [
  {id:"fam", t:"Direito de Família", s:"Divórcio, guarda, pensão e partilha de bens",
   d:"Conduzimos momentos delicados com o máximo de discrição, buscando acordos inteligentes sempre que possível e firmeza quando necessário para proteger o seu futuro.",
   l:["Divórcio consensual e litigioso","Guarda e regulamentação de visitas","Pensão alimentícia: fixação, revisão e cobrança","Partilha de bens e união estável"],
   w:"Olá! Gostaria de falar diretamente com a advogada sobre um caso de direito de família."},
  {id:"prev", t:"Direito Previdenciário (INSS)", s:"Aposentadorias, revisões e benefícios negados",
   d:"Não aceite uma negativa sem antes entender o porquê. Analisamos seu CNIS e histórico de contribuições a fundo antes de protocolar ou recorrer no INSS.",
   l:["Aposentadoria por tempo de contribuição e por idade","Aposentadoria por incapacidade permanente","Auxílio por incapacidade temporária","Revisão e restabelecimento de benefícios"],
   w:"Olá! Gostaria de falar diretamente com a advogada sobre um assunto previdenciário (INSS)."},
  {id:"trab", t:"Direito Trabalhista", s:"Rescisões, verbas, horas extras e assédio",
   d:"Defesa intransigente de quem trabalha e assessoria preventiva de segurança jurídica para quem contrata, garantindo que nenhum direito fique para trás.",
   l:["Rescisões e verbas rescisórias","Horas extras e jornada","Assédio moral no ambiente de trabalho","Consultoria preventiva para empresas"],
   w:"Olá! Gostaria de falar diretamente com a advogada sobre uma questão trabalhista."},
  {id:"civ", t:"Direito Civil", s:"Contratos, cobranças e reparações de danos",
   d:"Segurança jurídica na hora de assinar um contrato e pulso firme para cobrar o que é devido ou buscar reparações justas quando algo sai do combinado.",
   l:["Elaboração e revisão de contratos","Responsabilidade civil","Ações de cobrança","Danos morais e materiais"],
   w:"Olá! Gostaria de falar diretamente com a advogada sobre uma questão de direito civil."},
  {id:"cons", t:"Direito do Consumidor", s:"Compras, serviços e nome negativado",
   d:"Abusos de grandes empresas, produtos com defeito crônico ou negativações indevidas combatidos com agilidade e busca por reparação.",
   l:["Produtos com defeito e trocas recusadas","Serviços não prestados ou mal prestados","Negativação indevida do nome","Danos morais e materiais"],
   w:"Olá! Gostaria de falar diretamente com a advogada sobre um problema de consumo."},
  {id:"imo", t:"Direito Imobiliário", s:"Imóveis, posse e regularização",
   d:"Blindagem para o seu patrimônio. Da análise de contratos e escrituras à solução de disputas de posse e regularização de imóveis na Região dos Lagos.",
   l:["Compra e venda de imóveis","Usucapião","Ações possessórias","Regularização fundiária"],
   w:"Olá! Gostaria de falar diretamente com a advogada sobre uma questão imobiliária."}
];

var cards = document.getElementById("cards");
AREAS.forEach(function(a){
  var b = document.createElement("button");
  b.className = "card rv"; b.type = "button"; b.setAttribute("data-id", a.id);
  b.innerHTML = '<svg class="ico" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+ICON[a.id]+'</svg>'
    + '<h3>'+a.t+'</h3><p>'+a.s+'</p><span class="more"><i></i> Ver detalhes</span>';
  b.addEventListener("mousemove", function(e){
    var r = b.getBoundingClientRect();
    b.style.setProperty("--mx", (e.clientX-r.left)+"px");
    b.style.setProperty("--my", (e.clientY-r.top)+"px");
  });
  b.addEventListener("click", function(){ openArea(a.id); });
  cards.appendChild(b); io.observe(b);
});

function openArea(id){
  var a = AREAS.filter(function(x){return x.id===id;})[0];
  modalBody.innerHTML = '<h3>'+a.t+'</h3><p class="lead">'+a.d+'</p><ul>'
    + a.l.map(function(i){return "<li>"+i+"</li>";}).join("")
    + '</ul><a class="btn" href="'+WA+encodeURIComponent(a.w)+'" target="_blank" rel="noopener">Falar sobre isso no WhatsApp</a>';
  lastFocus = document.activeElement;
  modal.classList.add("open"); document.body.style.overflow = "hidden";
  modal.querySelector(".x").focus();
}
