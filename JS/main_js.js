// PAGINA 1
//-------------------------------------------------------------------------------------------------------------------------
// Botones para ir a la Pagina 2

//Catan Base:
function ir_a_pagina_2_para3y4_base() {
  window.location.href = './pagina2_para3y4_base.html';
}

function ir_a_pagina_2_para5y6_base() {
  window.location.href = './pagina2_para5y6_base.html';
}

//Ciudades y Caballeros:
function ir_a_pagina_2_para3y4() {
  window.location.href = './pagina2_para3y4.html';
}

function ir_a_pagina_2_para5y6() {
  window.location.href = './pagina2_para5y6.html';
}

function ir_mapGenerator() {
  window.location.href = './mapGenerator.html';
}

//-------------------------------------------------------------------------------------------------------------------------
// Sonido de Carta (DAME ALIMENTO)

function sonido_dameAlimento() {
  var audio = document.getElementById('sonido_dameAlimento');
  audio.play();
}
var sonidoYaFunciono = false; //Variable en FALSE porque nunca SONÓ. Y en True si ya sonó por primera vez.
