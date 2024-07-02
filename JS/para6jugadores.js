//MUSICA de FONDO:

const musicaFondo = document.getElementById('musicaFondo');
const botonReproducir = document.getElementById('botonReproducir');
const botonDetener = document.getElementById('botonDetener');

var suenaMusica = null;

function reproducirMusica() {
  musicaFondo.play();

  // Remover el evento de clic para que no se reproduzca más de una vez
  document.body.removeEventListener('click', reproducirMusica);

  suenaMusica = true;
  console.log(suenaMusica);

  botonReproducir.style.visibility= 'hidden';
  botonDetener.style.visibility = 'visible';

}

document.body.addEventListener('click', reproducirMusica);

function detenerMusica() {
  musicaFondo.pause();
  botonReproducir.style.visibility = 'visible';
  botonDetener.style.visibility= 'hidden';
  suenaMusica = false;
  console.log(suenaMusica);

}

// Mostrar el botón correspondiente cuando termine la canción
// Cuando termina la cancion y si apretamos el boton, vuelve a sonar
musicaFondo.onended = function() {
  botonReproducir.style.visibility = 'visible';
  botonDetener.style.visibility= 'hidden';
} 

//-------------------------------------------------------------------------------------------------------------------------
//Trae los datos de la Pag.2 en forma de JSON:

// Obtenemos la cadena JSON del Local Storage
const coloresJSON = localStorage.getItem('coloresSeleccionados');

//convertimos la cadena JSON a un Objeto
const colores = JSON.parse(coloresJSON);

// Muestra los colores en el DIV
if (coloresJSON) {
    
    console.log (`Colores guardados: ${JSON.stringify(colores)}`);
}

//-------------------------------------------------------------------------------------------------------------------------
// Función para que "Si no esta el COLOR dentro del Array" los Boxes no aparezcan (con style.display):

function mostrarBoxes(array) {
  //Box para Color NARANJA:
  if (!array.includes("Naranja")) {
      document.getElementById('box_jugador1').style.display = 'none';
      document.getElementById('contador_1').style.display = 'none';
  }
  //Box para Color AZUL:
  if (!array.includes("Azul")) {
      document.getElementById('box_jugador2').style.display = 'none';
      document.getElementById('contador_2').style.display = 'none';
  }
  //Box para el Color ROJO:
  if (!array.includes("Rojo")) {
    document.getElementById('box_jugador3').style.display = 'none';
    document.getElementById('contador_3').style.display = 'none';
  }
  //Box para el Color BLANCO:
  if (!array.includes("Blanco")) {
    document.getElementById('box_jugador4').style.display = 'none';
    document.getElementById('contador_4').style.display = 'none';
  }
  //Box para el Color VERDE:
  if (!array.includes("Verde")) {
    document.getElementById('box_jugador5').style.display = 'none';
    document.getElementById('contador_7').style.display = 'none';
  }
  //Box para el Color MARRON:
  if (!array.includes("Marrón")) {
    document.getElementById('box_jugador6').style.display = 'none';
    document.getElementById('contador_8').style.display = 'none';
  }

}

// Activa la función de arriba.
mostrarBoxes(colores);

//-------------------------------------------------------------------------------------------------------------------------
// Captura los nombres de los INPUT para que aparezcan en la Pag.4

// Obtener el valor del input
var nombre1 = document.getElementById('persona1'); //jugador Naranja
var nombre2 = document.getElementById('persona2'); //jugador Azul
var nombre3 = document.getElementById('persona3'); //jugador Rojo
var nombre4 = document.getElementById('persona4'); //jugador Blanco
var nombre5 = document.getElementById('persona5'); //jugador Verde
var nombre6 = document.getElementById('persona6'); //jugador Marron

var nombreJugadorNaranja = document.getElementById('nombre_jugador_naranja'); //jugador Naranja
var nombreJugadorAzul = document.getElementById('nombre_jugador_azul'); //jugador Azul
var nombreJugadorRojo = document.getElementById('nombre_jugador_rojo'); //jugador Rojo
var nombreJugadorBlanco = document.getElementById('nombre_jugador_blanco'); //jugador Blanco
var nombreJugadorVerde = document.getElementById('nombre_jugador_verde'); //jugador Verde
var nombreJugadorMarron = document.getElementById('nombre_jugador_marron'); //jugador Marron

function mostrar(){
  const nombreNaranja = nombre1.value;
  nombreJugadorNaranja.textContent = nombreNaranja;

  const nombreAzul = nombre2.value;
  nombreJugadorAzul.textContent = nombreAzul;

  const nombreRojo = nombre3.value;
  nombreJugadorRojo.textContent = nombreRojo;

  const nombreBlanco = nombre4.value;
  nombreJugadorBlanco.textContent = nombreBlanco;

  const nombreVerde = nombre5.value;
  nombreJugadorVerde.textContent = nombreVerde;

  const nombreMarron = nombre6.value;
  nombreJugadorMarron.textContent = nombreMarron}


function mostrarNombre() {
  
  const nombreNaranja = nombre1.value;
  nombreJugadorNaranja.textContent = nombreNaranja;

  const nombreAzul = nombre2.value;
  nombreJugadorAzul.textContent = nombreAzul;

  const nombreRojo = nombre3.value;
  nombreJugadorRojo.textContent = nombreRojo;

  const nombreBlanco = nombre4.value;
  nombreJugadorBlanco.textContent = nombreBlanco;
  
}

//-------------------------------------------------------------------------------------------------------------------------
//Boton para cuando PASA A LA SIGUIENTE PAGINA:

//Boton para ir a la Pagina 4:

function abrir_pagina_4() {
  var divCaballeros = document.getElementById('f.caballeros');
  divCaballeros.classList.add('red-text');
  mostrar();

  document.getElementById('pagina_3').style.display = 'none';
  document.getElementById('pagina_4').style.display = 'block';  
}

// Boton para REGRESAR a la Pagina 2 (Para 5y6 Jugadores):

function abrir_pagina_2_para5y6() {
  window.location.href = './pagina2_para5y6.html';
}

//-------------------------------------------------------------------------------------------------------------------------
// PAGINA 4

//Grito de los CABALLEROS cuando tienen la misma FUERZA que los BARBAROS:
function reproducirSonido() {
  var audio = document.getElementById('sonido');
  audio.play();
}
var sonidoYaFunciono = false; //Variable en FALSE porque nunca SONÓ. Y en True si ya sonó por primera vez.

//-------------------------------------------------------------------------------------------------------------------------

// Funciones para INCREMENTAR y DECREMENTAR los CONTADORES:
function incrementar(nombreContador) {
  let contador = document.getElementById(nombreContador);
  let valor = parseInt(contador.textContent);
  contador.textContent = valor + 1;
  actualizarEstilo();
}

function decrementar(nombreContador) {
  let contador = document.getElementById(nombreContador);
  let valor = parseInt(contador.textContent);
  if (valor > 0) {
    contador.textContent = valor - 1;
    actualizarEstilo();
  }
}

//----------------------------------------------------------------------------------------------------------------------

// Funcion del BOTON REINICIAR CABALLEROS
document.addEventListener('DOMContentLoaded', function() {

  var botonReiniciar_fCaballeros = document.getElementById('reiniciar_F.Caballeros');
  var divCaballeros = document.getElementById('f.caballeros');

  botonReiniciar_fCaballeros.addEventListener('click', function() {
    divCaballeros.textContent = "0"; //El contador de F.Caballeros vuelve a 0.
    divCaballeros.classList.remove('green-text');
    divCaballeros.classList.add('red-text');
    div_resumen.textContent = 'Están Perdiendo';
    sonidoYaFunciono = false; //Vuelve a reinciar el Grito de los Caballeros.
  });
});

//----------------------------------------------------------------------------------------------------------------------

// FUNCION PARA COLORES SEGUN LA FUERZA BARBARA vs FUERZA CABALLEROS ACTIVADOS:

var div_fuerza_caballeros = document.getElementById('div_fuerza_caballeros');
var div_resumen = document.getElementById('resumen');

// > Función para actualizar el estilo de los divs según la comparación de valores
function actualizarEstilo() {
  var valorBarbara = parseInt(document.getElementById('f.barbara').textContent);
  var valorCaballeros = parseInt(document.getElementById('f.caballeros').textContent);

  var divBarbara = document.getElementById('f.barbara');
  var divCaballeros = document.getElementById('f.caballeros');

  if (valorCaballeros >= valorBarbara) {
      divCaballeros.classList.add('green-text');
      divCaballeros.classList.remove('red-text');
      div_resumen.textContent = 'Están Ganando';
      if (sonidoYaFunciono == false) {
        reproducirSonido();
        sonidoYaFunciono = true; //Se pone en True porque ya sonó y no quiero que vuelva a sonar hasta su Reiniciamiento.
      }

  } else {
      divCaballeros.classList.remove('green-text');
      divCaballeros.classList.add('red-text');
      div_resumen.textContent = 'Están Perdiendo';
  }
  
}

//----------------------------------------------------------------------------------------------------------------------
// BOTON REINICIAR EL JUEGO:

// > Asignamiento de los Contadores:
var divNaranja = document.getElementById('j.naranja');
var divAzul = document.getElementById('j.azul');
var divRojo = document.getElementById('j.rojo');
var divBlanco = document.getElementById('j.blanco');
var divVerde = document.getElementById('j.verde');
var divMarron = document.getElementById('j.marron');
var divFuerzaBarbara = document.getElementById('f.barbara');
var divFuerzaCaballeros = document.getElementById('f.caballeros');

var botonBorrar = document.getElementById('reiniciar'); //Asignamiento al Btn Resetear

botonBorrar.addEventListener('click', function() { //Lo que hace el Btn de Resetear

  var div_fuerza_caballeros = document.getElementById('div_fuerza_caballeros');
  var div_resumen = document.getElementById('resumen');
  var divBarbara = document.getElementById('f.barbara');
  var divCaballeros = document.getElementById('f.caballeros');

  var respuesta = window.confirm('¿Deseas reiniciar la Partida?');
  if (respuesta) {
    divNaranja.textContent = "3";
    divAzul.textContent = "3";
    divRojo.textContent = "3";
    divBlanco.textContent = "3";
    divVerde.textContent = "3";
    divMarron.textContent = "3";
    divFuerzaBarbara.textContent = "4";
    divFuerzaCaballeros.textContent = "0";
    
    divCaballeros.classList.remove('green-text');
    divCaballeros.classList.add('red-text');
    div_resumen.textContent = 'Están Perdiendo';
    sonidoYaFunciono = false; //Reactiva que el Grito de los Caballeros

  }else {}  
});
