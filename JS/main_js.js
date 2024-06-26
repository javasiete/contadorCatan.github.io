//MUSICA de FONDO:

const musicaFondo = document.getElementById('musicaFondo');
const botonReproducir = document.getElementById('botonReproducir');
const botonDetener = document.getElementById('botonDetener');

var suenaMusica = null;

// Este evento hace que al hacer click se active la Funcion (reproducirMusica)
// Lo tengo desactivado porque en este caso quiero que suene al tocar el boton "Ir a pagina 3"
// document.body.addEventListener('click', reproducirMusica); 

function reproducirMusica() {
  musicaFondo.play();

  // Remover el evento de clic para que no se reproduzca más de una vez
  document.body.removeEventListener('click', reproducirMusica);

  suenaMusica = true;
  console.log(suenaMusica);

  botonReproducir.style.visibility= 'hidden';
  botonDetener.style.visibility = 'visible';

}

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

//----------------------------------------------------------------------------------------------------------------------
//Sonidos de los Botones_Cartas:

function sonido_dameMadera() {
  var suena_dameMadera = document.getElementById('sonido_dameMadera');
  suena_dameMadera.play();
}

function sonido_dameAlimento() {
  var suena_dameAlimento = document.getElementById('sonido_dameAlimento');
  suena_dameAlimento.play();
}

//-------------------------------------------------------------------------------------------------------------------------
const pagina_1 = document.getElementById('pagina_1');
const pagina_2 = document.getElementById('pagina_2');

// Funcion que Abre la Pagina 2 
function abrir_pagina_2() {
  pagina_1.style.display = 'none';
  pagina_2.style.display = 'block';
}

function volver_a_pagina_1() {
  pagina_1.style.display = 'block';
  pagina_2.style.display = 'none';
}

//-------------------------------------------------------------------------------------------------------------------------
// PAGINA 2

// ESTO ES NUEVO//
let opcionesSeleccionadas = [];

function toggleColor(color) {
    const index = opcionesSeleccionadas.indexOf(color);
    if (index > -1) {
        opcionesSeleccionadas.splice(index, 1);
    } else {
        opcionesSeleccionadas.push(color);
    }
    updateDisplay();
}

function updateDisplay() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
      if (opcionesSeleccionadas.includes(button.innerText)) {
          button.classList.add('selected');
      } else {
          button.classList.remove('selected');
      }
  });

  const selectedColorsDiv = document.getElementById('selected-colors');
  selectedColorsDiv.innerHTML = '';
  if (opcionesSeleccionadas.length > 0) {
      opcionesSeleccionadas.forEach(color => {
          const colorDiv = document.createElement('div');
          colorDiv.innerText = color;
          selectedColorsDiv.appendChild(colorDiv);
      });
  }
}

// HASTA ACA ES LO NUEVO //

//-----------------------------------------------------------------------------------------
//Boton para cuando PASA A LA PAGINA 3 (Boxes de Colores para poner nombre):

var box_jugador1 = document.getElementById('box_jugador1');
var box_jugador2 = document.getElementById('box_jugador2');
var box_jugador3 = document.getElementById('box_jugador3');
var box_jugador4 = document.getElementById('box_jugador4'); // id="placa_jugador_

var placa_jugador_naranja = document.getElementById('placa_jugador_naranja');
var placa_jugador_azul = document.getElementById('placa_jugador_azul');
var placa_jugador_rojo = document.getElementById('placa_jugador_rojo');
var placa_jugador_blanco = document.getElementById('placa_jugador_blanco');

var pagina_3 = document.getElementById('pagina_3');

//Funcion del boton que hace que aparezca la pagina de Placa de Personajes:
function abrir_pagina_3() {
  
  pagina_3.style.visibility = 'visible';

  if (opcionesSeleccionadas.length === 4) {
    console.log("Se eligieron los 4 colores");
    window.location.href = './para4jugadores.html';

} else if (opcionesSeleccionadas.length === 3) {
    if (opcionesSeleccionadas.includes('Naranja')) {
      console.log("Entro Naranja")
      box_jugador1.style.display = 'block';
      placa_jugador_naranja.style.display = 'block';
    }

    if (opcionesSeleccionadas.includes('Azul')) {
      console.log("Entro Azul")
      box_jugador2.style.display = 'block';
      placa_jugador_azul.style.display = 'block';
    }

    if (opcionesSeleccionadas.includes('Rojo')) {
      console.log("Entro Rojo")
      box_jugador3.style.display = 'block';
      placa_jugador_rojo.style.display = 'block';
    }

    if (opcionesSeleccionadas.includes('Blanco')) {
      console.log("Entro Blanco")
      box_jugador4.style.display = 'block';
      placa_jugador_blanco.style.display = 'block';
    }

    pagina_2.style.display = 'none';
    pagina_3.style.display = 'block';
    reproducirMusica() //Arranca a sonar la Canción de Fondo.

  } else if (opcionesSeleccionadas.length <=2){
    alert('Debe seleccionar al menos 3 o 4 Casillas para Continuar');
    pagina_3.style.display = 'none';
  }

}



//-----------------------------------------------------------------------------------------------------//
// PAGINA 3

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
//Boton para cuando PASA A LA PAGINA 4 (placa_contadores):
var pagina_4 = document.getElementById('pagina_4');

function abrir_pagina_4() {
  document.getElementById('pagina_3').style.display = 'none';
  document.getElementById('pagina_4').style.display = 'block';

  mostrarNombre();
}

//Volver a Pagina 2
function volver_a_pagina_2() {
  pagina_2.style.display = 'block';
  pagina_3.style.display = 'none';
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
