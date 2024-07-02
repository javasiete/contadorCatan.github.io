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

var nombreJugadorNaranja = document.getElementById('nombre_jugador_naranja'); //jugador Naranja
var nombreJugadorAzul = document.getElementById('nombre_jugador_azul'); //jugador Azul
var nombreJugadorRojo = document.getElementById('nombre_jugador_rojo'); //jugador Rojo
var nombreJugadorBlanco = document.getElementById('nombre_jugador_blanco'); //jugador Blanco

function mostrar(){
  const nombreNaranja = nombre1.value;
  nombreJugadorNaranja.textContent = nombreNaranja;

  const nombreAzul = nombre2.value;
  nombreJugadorAzul.textContent = nombreAzul;

  const nombreRojo = nombre3.value;
  nombreJugadorRojo.textContent = nombreRojo;

  const nombreBlanco = nombre4.value;
  nombreJugadorBlanco.textContent = nombreBlanco;

}


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
  mostrar();

  document.getElementById('pagina_3').style.display = 'none';
  document.getElementById('pagina_4').style.display = 'block';  
}

// Boton para REGRESAR a la Pagina 2 (Para 3y4 Jugadores):

function abrir_pagina_2_para3y4() {
  window.location.href = './pagina2_para3y4_base.html';
}

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
// BOTON REINICIAR EL JUEGO:

// > Asignamiento de los Contadores:
var divNaranja = document.getElementById('j.naranja');
var divAzul = document.getElementById('j.azul');
var divRojo = document.getElementById('j.rojo');
var divBlanco = document.getElementById('j.blanco');

var botonBorrar = document.getElementById('reiniciar'); //Asignamiento al Btn Resetear

botonBorrar.addEventListener('click', function() { //Lo que hace el Btn de Resetear
  var respuesta = window.confirm('¿Deseas reiniciar la Partida?');
  if (respuesta) {
    divNaranja.textContent = "2";
    divAzul.textContent = "2";
    divRojo.textContent = "2";
    divBlanco.textContent = "2";
  }else {}  
});


