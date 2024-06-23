
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

//-----------------------------------------------------------------------------------------------------------------------
//MUSICA de FONDO:

var cancionFondo = document.getElementById('musicaFondo');

// La Funcion para Reproducir la Canción:
function reproducirCancion() {
  cancionFondo.play();
  document.removeEventListener('click', reproducirCancion);// Desactivar cualquier otro clic para reproducir la canción nuevamente
}

// Agregar el evento de clic para reproducir la canción al primer clic
document.addEventListener('click', reproducirCancion);


//-------------------------------------------------------------------------------------------------------------------------
//Boton para DETENER la MUSICA de la PAGINA INTRO

var botonDetener = document.getElementById('botonDetener');

function detenerMusica() {
  cancionFondo.pause();
  botonDetener.style.visibility = 'hidden'; // Oculta el boton de Stop
  botonReproducir.style.visibility = 'visible'; // Aparece el boton de Play
}

function reproducirMusica() {
  cancionFondo.play();
  botonReproducir.style.visibility = 'hidden'; // Oculta el boton de Play
  botonDetener.style.visibility = 'visible'; // Aparece el boton de Stop
}


//-------------------------------------------------------------------------------------------------------------------------
//Boton para cuando PASA A LA SIGUIENTE PAGINA:
function mostrar_divEnPartida() {
  document.getElementById('divIntro').style.display = 'none';
  document.getElementById('divEnPartida').style.display = 'block';

  mostrarNombre();
}

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

  var respuesta = window.confirm('¿Deseas reiniciar el juego"?');
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


