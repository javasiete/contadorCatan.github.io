//JAVASCRIPT DE LA PAGINA 2 (Para 5 y 6 Jugadores):
//-------------------------------------------------------------------------------------------------------------------------

// Almacenar los datos en el Array segun el color que eligieron:

// Array para almacenar los Colores seleccionados
let guardarDato = [];

// Función para manejar el clic en los botones de cada COLOR
function toggleCountry(country) {
  let button = event.target;

  // Toggle class 'active' en el botón clickeado
  button.classList.toggle('active');

  // Obtener el texto del botón (nombre del Color)
  let countryName = button.textContent.trim();

  let index = guardarDato.indexOf(countryName);
  if (index === -1) {
    // Agrega el nombre del Color al array si no está presente
    guardarDato.push(countryName);
    console.log(guardarDato);
  } else {
    // Elimina el Color del array si ya está presente
    guardarDato.splice(index, 1);
  }
}

// Función para actualizar la vista de los Colores seleccionados
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

// Para avanzar a la PAGINA 3:
function ir_a_pagina_3() {
  if (guardarDato.length == 5) { 
    console.log("Entro el numero 5");
    window.location.href = './pagina3_para5_base.html';
  };

  if (guardarDato.length == 6) {
    console.log("Entro el numero 6");
    window.location.href = './pagina3_para6_base.html';
  };

  if (guardarDato.length == 4){
    alert("Debes seleccionar entre 5 y 6 colores. Te falta al menos marcar 1 más.")
  }

  if (guardarDato.length <= 3){
    alert("Debes seleccionar entre 5 y 6 colores.")
  }


  // Convertimos el objeto a una cadena JSON
  const coloresJSON = JSON.stringify(guardarDato);
  // Guardamos la cadena JSON en el Local Storage
  localStorage.setItem('coloresSeleccionados', coloresJSON);

};

// Para regresar a la PAGINA 1:
function ir_a_pagina_1() {
  window.location.href = './index.html';
}

//-------------------------------------------------------------------------------------------------------------------------
// Sonido de Carta (DAME MADERA)

function sonido_dameMadera() {
  var audio = document.getElementById('sonido_dameMadera');
  audio.play();
}
var sonidoYaFunciono = false; //Variable en FALSE porque nunca SONÓ. Y en True si ya sonó por primera vez.

//-------------------------------------------------------------------------------------------------------------------------

