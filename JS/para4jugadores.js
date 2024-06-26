
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
// Coloca los NOMBRES de cada JUGADOR:
function mostrarNombre() {
  // Obtener el valor del input
  var nombre1 = document.getElementById('persona1').value; //jugador Naranja
  var nombre2 = document.getElementById('persona2').value; //jugador Azul
  var nombre3 = document.getElementById('persona3').value; //jugador Rojo
  var nombre4 = document.getElementById('persona4').value; //jugador Blanco
  
  // Mostrar el nombre en el div
  var nombreJugadorNaranja = document.getElementById('nombre_jugador_naranja');
  nombreJugadorNaranja.textContent = nombre1;
  var nombreJugadorAzul = document.getElementById('nombre_jugador_azul');
  nombreJugadorAzul.textContent = nombre2;
  var nombreJugadorRojo = document.getElementById('nombre_jugador_rojo');
  nombreJugadorRojo.textContent = nombre3;
  var nombreJugadorBlanco = document.getElementById('nombre_jugador_blanco');
  nombreJugadorBlanco.textContent = nombre4;
}

//-------------------------------------------------------------------------------------------------------------------------
//Boton para cuando PASA A LA SIGUIENTE PAGINA:
function abrir_pagina_4() {
  document.getElementById('pagina_3').style.display = 'none';
  document.getElementById('pagina_4').style.visibility = 'visible';

  mostrarNombre();
}

// Boton para REGRESAR a la Pagina 1, porque desde esta no se puede volver más que a esa.

document.getElementById('boton_regresar_pag1').addEventListener('click', function() {
  window.location.href = './index.html';
});



//-------------------------------------------------------------------------------------------------------------------------

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

//  Funcion del BOTON REINICIAR CABALLEROS
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
    divFuerzaBarbara.textContent = "4";
    divFuerzaCaballeros.textContent = "0";
    
    divCaballeros.classList.remove('green-text');
    divCaballeros.classList.add('red-text');
    div_resumen.textContent = 'Están Perdiendo';
    sonidoYaFunciono = false; //Reactiva que el Grito de los Caballeros

  }else {}  
});


