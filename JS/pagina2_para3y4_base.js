//JAVASCRIPT DE LA PAGINA 2 (Para 3 y 4 Jugadores):
//-------------------------------------------------------------------------------------------------------------------------

// Almacenar los datos en el Array segun el color que eligieron:

// Array para almacenar los países seleccionados
let guardarDato = [];

// Función para manejar el clic en los botones de país
function toggleCountry(country) {
  let button = event.target;

  // Toggle class 'active' en el botón clickeado
  button.classList.toggle('active');

  // Obtener el texto del botón (nombre del país)
  let countryName = button.textContent.trim();

  let index = guardarDato.indexOf(countryName);
  if (index === -1) {
    // Agregar país al array si no está presente
    guardarDato.push(countryName);
    console.log(guardarDato);
  } else {
    // Remover país del array si ya está presente
    guardarDato.splice(index, 1);
  }

}

// Función para actualizar la vista de los países seleccionados
function actualizarVistaPaises() {
  let selectedCountriesElement = document.getElementById('selected-countries');
  selectedCountriesElement.innerHTML = '';

  if (guardarDato.length === 0) {
    selectedCountriesElement.textContent = 'Ningún país seleccionado';
  } else {
    let ul = document.createElement('ul');
    guardarDato.forEach(country => {
      let li = document.createElement('li');
      li.textContent = country;
      ul.appendChild(li);
    });
    selectedCountriesElement.appendChild(ul);
  }
}

//---------------------------------------------------------//
// BOTON IR A PAGINA 3 y VOLVER A PAGINA 1

function ir_a_pagina_3() {
  if (guardarDato.length == 3) { 
    window.location.href = './pagina3_para3_base.html';
  };

  if (guardarDato.length == 4) {
    window.location.href = './pagina3_para4_base.html';
  };

  if (guardarDato.length <= 1){
    alert("Debes seleccionar entre 3 y 4 colores.")
  }

  if (guardarDato.length == 2){
    alert("Debes seleccionar entre 3 y 4 colores. Te falta al menos marcar 1 más.")
  }

  // Convertimos el objeto a una cadena JSON
  const coloresJSON = JSON.stringify(guardarDato);
  // Guardamos la cadena JSON en el Local Storage
  localStorage.setItem('coloresSeleccionados', coloresJSON);
};

function ir_a_pagina_1() {
  window.location.href = './index.html';
}

//-----------------------------------------------------------------------------------------------------//
// PAGINA 3

// Coloca los NOMBRES de cada JUGADOR en su Placa de Contadores:
function mostrarNombre() {
  // Obtener el valor del input
  var nombre1 = document.getElementById('persona1').value; //jugador Naranja
  var nombre2 = document.getElementById('persona2').value; //jugador Azul
  var nombre3 = document.getElementById('persona3').value; //jugador Rojo
  var nombre4 = document.getElementById('persona4').value; //jugador Blanco
  var nombre5 = document.getElementById('persona5').value; //jugador Verde
  var nombre6 = document.getElementById('persona6').value; //jugador Marrón
  
  // Mostrar el nombre en el div
  var nombreJugadorNaranja = document.getElementById('nombre_jugador_naranja');
  nombreJugadorNaranja.textContent = nombre1;
  var nombreJugadorAzul = document.getElementById('nombre_jugador_azul');
  nombreJugadorAzul.textContent = nombre2;
  var nombreJugadorRojo = document.getElementById('nombre_jugador_rojo');
  nombreJugadorRojo.textContent = nombre3;
  var nombreJugadorBlanco = document.getElementById('nombre_jugador_blanco');
  nombreJugadorBlanco.textContent = nombre4;
  
  var nombreJugadorVerde = document.getElementById('nombre_jugador_verde');
  nombreJugadorVerde.textContent = nombre5;
  var nombreJugadorMarron = document.getElementById('nombre_jugador_marron');
  nombreJugadorMarron.textContent = nombre6;
}

//-------------------------------------------------------------------------------------------------------------------------
// Sonido de Carta (DAME MADERA)

function sonido_dameMadera() {
  var audio = document.getElementById('sonido_dameMadera');
  audio.play();
}
var sonidoYaFunciono = false; //Variable en FALSE porque nunca SONÓ. Y en True si ya sonó por primera vez.
