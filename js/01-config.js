"use strict";
/* =========================================================
   01 - CONFIGURAÇÃO
   Constantes usadas em vários arquivos js/*.js.
   Este arquivo precisa ser carregado ANTES dos outros.
   ========================================================= */

// número de WhatsApp do escritório, usado em vários botões
var WA = "https://wa.me/5522988042917?text=";

// true quando a pessoa pede ao sistema operacional para reduzir animações
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
