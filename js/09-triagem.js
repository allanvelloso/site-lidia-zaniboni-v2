"use strict";
/* =========================================================
   09 - TRIAGEM ("Por onde começar")
   TREE guarda as perguntas e opções. RES guarda o resultado
   final de cada caminho (a área, o primeiro passo sugerido
   e os documentos úteis). Para mudar uma pergunta ou uma
   orientação, edite os objetos abaixo.
   ========================================================= */

var TREE = {
  start:{q:"O que está acontecendo?", o:[
    {l:"Algo mudou na minha família", n:"fam"},
    {l:"Um benefício ou aposentadoria do INSS", n:"prev"},
    {l:"Meu emprego ou meu trabalho", n:"trab"},
    {l:"Uma compra, um serviço ou uma cobrança", n:"cons"},
    {l:"Um imóvel ou um terreno", n:"imo"}
  ]},
  fam:{q:"Qual assunto se aproxima mais?", o:[
    {l:"Separação, divórcio ou partilha de bens", r:"divorcio"},
    {l:"Pensão alimentícia", r:"pensao"},
    {l:"Guarda ou convivência com os filhos", r:"guarda"}
  ]},
  prev:{q:"Em que ponto você está?", o:[
    {l:"Quero saber se já posso me aposentar", r:"aposent"},
    {l:"Meu pedido foi negado pelo INSS", r:"negado"},
    {l:"Estou afastado por doença ou acidente", r:"incap"}
  ]},
  trab:{q:"Qual é a situação?", o:[
    {l:"Fui demitido e acho que faltou receber", r:"rescisao"},
    {l:"Trabalho além do combinado ou sem registro", r:"jornada"},
    {l:"Sofro assédio ou constrangimento no trabalho", r:"assedio"}
  ]},
  cons:{q:"O que aconteceu?", o:[
    {l:"Produto com defeito ou serviço mal prestado", r:"defeito"},
    {l:"Meu nome foi negativado indevidamente", r:"negativ"},
    {l:"É sobre um contrato ou uma cobrança", r:"contrato"}
  ]},
  imo:{q:"Sobre o imóvel, o caso é de:", o:[
    {l:"Compra, venda ou contrato", r:"compra"},
    {l:"Posse, invasão ou disputa de área", r:"posse"},
    {l:"Regularizar um imóvel sem documentação", r:"regular"}
  ]}
};

var RES = {
  divorcio:{a:"Direito de Família", p:"Verificar se há acordo possível entre as partes: um divórcio consensual costuma ser bem mais rápido e menos desgastante que o litigioso.", d:"Certidão de casamento, documentos dos bens do casal e, se houver filhos, certidões de nascimento.", w:"Olá! Gostaria de falar sobre separação, divórcio ou partilha de bens."},
  pensao:{a:"Direito de Família", p:"Identificar se o caso é de fixar, revisar ou cobrar a pensão — cada um segue um caminho diferente.", d:"Comprovantes de despesas da criança e o que você tiver sobre a renda do outro responsável.", w:"Olá! Gostaria de falar sobre pensão alimentícia."},
  guarda:{a:"Direito de Família", p:"Entender a rotina atual da criança. A guarda compartilhada é a regra no Brasil, salvo situações específicas.", d:"Certidão de nascimento e registros da convivência atual (mensagens, comprovantes escolares).", w:"Olá! Gostaria de falar sobre guarda ou convivência com os filhos."},
  aposent:{a:"Direito Previdenciário", p:"Analisar o seu CNIS para conferir tempo de contribuição, períodos faltantes e qual regra de transição se aplica a você.", d:"Extrato do CNIS (Meu INSS), carteira de trabalho e carnês de contribuição.", w:"Olá! Gostaria de saber se já posso me aposentar."},
  negado:{a:"Direito Previdenciário", p:"Ler a carta de indeferimento para entender o motivo exato da negativa e avaliar recurso administrativo ou ação judicial.", d:"Carta de indeferimento, extrato do CNIS e o protocolo do pedido no Meu INSS.", w:"Olá! Meu pedido no INSS foi negado e gostaria de orientação."},
  incap:{a:"Direito Previdenciário", p:"Organizar a documentação médica, que é o que sustenta o pedido de benefício por incapacidade.", d:"Laudos, exames, receitas e atestados com CID, além do CNIS.", w:"Olá! Estou afastado por questão de saúde e gostaria de orientação sobre o INSS."},
  rescisao:{a:"Direito Trabalhista", p:"Conferir o termo de rescisão e recalcular as verbas devidas. Fique atento ao prazo de dois anos após o fim do contrato.", d:"Carteira de trabalho, termo de rescisão, contracheques e extrato do FGTS.", w:"Olá! Fui demitido e gostaria de conferir minhas verbas rescisórias."},
  jornada:{a:"Direito Trabalhista", p:"Reunir provas da jornada real e do vínculo, que são a base desse tipo de reclamação.", d:"Registros de ponto, escalas, mensagens com a chefia, contracheques e nomes de testemunhas.", w:"Olá! Gostaria de falar sobre jornada de trabalho ou vínculo sem registro."},
  assedio:{a:"Direito Trabalhista", p:"Documentar os episódios com data e contexto antes de qualquer providência.", d:"Mensagens, e-mails, áudios, atestados médicos e relação de possíveis testemunhas.", w:"Olá! Gostaria de falar sobre assédio no ambiente de trabalho."},
  defeito:{a:"Direito do Consumidor", p:"Registrar a reclamação junto ao fornecedor e guardar o número de protocolo — ele costuma ser decisivo.", d:"Nota fiscal, contrato, protocolos de atendimento e fotos do produto.", w:"Olá! Gostaria de falar sobre um produto com defeito ou serviço mal prestado."},
  negativ:{a:"Direito do Consumidor", p:"Confirmar a origem da dívida antes de agir: negativação indevida e dívida real seguem caminhos distintos.", d:"Extrato do Serasa/SPC, comprovantes de pagamento e a notificação recebida.", w:"Olá! Meu nome foi negativado e gostaria de orientação."},
  contrato:{a:"Direito do Consumidor / Civil", p:"Ler o contrato para identificar cláusulas abusivas e o que foi efetivamente contratado.", d:"Contrato assinado, boletos, comprovantes de pagamento e a comunicação com a empresa.", w:"Olá! Gostaria de falar sobre um contrato ou uma cobrança."},
  compra:{a:"Direito Imobiliário", p:"Checar a documentação do imóvel e do vendedor antes de assinar ou pagar qualquer valor.", d:"Matrícula atualizada do imóvel, contrato ou proposta e certidões do vendedor.", w:"Olá! Gostaria de falar sobre compra ou venda de imóvel."},
  posse:{a:"Direito Imobiliário", p:"Verificar há quanto tempo a posse existe e se houve turbação recente, o que muda a medida cabível.", d:"Documentos do imóvel, contas em seu nome no endereço, fotos e registros da ocupação.", w:"Olá! Gostaria de falar sobre uma questão de posse de imóvel."},
  regular:{a:"Direito Imobiliário", p:"Levantar a situação registral do imóvel para saber se o caminho é usucapião ou regularização administrativa.", d:"Qualquer contrato ou recibo de compra, contas antigas no endereço e a matrícula, se existir.", w:"Olá! Gostaria de falar sobre regularização de imóvel."}
};

var qbody = document.getElementById("qbody"), qbar = document.getElementById("qbar"), quizHistory = [];
var CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function renderNode(key, step){
  var n = TREE[key];
  qbar.style.width = (step/3*100) + "%";
  var html = '<div class="fade"><h3>'+n.q+'</h3><div class="opts">';
  n.o.forEach(function(o,i){ html += '<button class="opt" data-i="'+i+'">'+o.l+CHECK+'</button>'; });
  html += '</div>';
  if(quizHistory.length) html += '<div class="quiz__foot"><button class="linkish" id="back">← Voltar</button></div>';
  html += '</div>';
  qbody.innerHTML = html;
  qbody.querySelectorAll(".opt").forEach(function(b){
    b.addEventListener("click", function(){
      var o = n.o[+b.dataset.i];
      quizHistory.push({k:key, s:step});
      if(o.n) renderNode(o.n, step+1); else renderResult(o.r);
    });
  });
  var bk = document.getElementById("back");
  if(bk) bk.addEventListener("click", function(){ var p = quizHistory.pop(); renderNode(p.k, p.s); });
}

function renderResult(id){
  var r = RES[id];
  qbar.style.width = "100%";
  qbody.innerHTML = '<div class="fade result">'
   + '<span class="result__tag">Sua dúvida é de</span><h3>'+r.a+'</h3>'
   + '<div class="box"><b>O primeiro passo costuma ser</b><p>'+r.p+'</p></div>'
   + '<div class="box"><b>O que ajuda ter em mãos</b><p>'+r.d+'</p></div>'
   + '<div style="display:flex;flex-wrap:wrap;gap:.7rem;align-items:center;margin-top:1.2rem">'
   + '<a class="btn" href="'+WA+encodeURIComponent(r.w)+'" target="_blank" rel="noopener">Conversar sobre o meu caso</a>'
   + '<button class="linkish" id="again">Recomeçar</button></div>'
   + '<p style="font-size:.82rem;color:var(--muted);margin-top:1.3rem">Esta orientação é geral e informativa. Só a análise do seu caso concreto permite dizer o caminho correto.</p></div>';
  document.getElementById("again").addEventListener("click", function(){ quizHistory = []; renderNode("start",1); });
}

renderNode("start", 1);
