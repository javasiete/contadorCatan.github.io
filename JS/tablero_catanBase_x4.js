const terrenos = [
  { tipo: 'trigo', min: 4, max: 4 },
  { tipo: 'madera', min: 4, max: 4 },
  { tipo: 'pasto', min: 4, max: 4 },
  { tipo: 'arcilla', min: 3, max: 3 },
  { tipo: 'roca', min: 3, max: 3 },
  { tipo: 'desierto', min: 1, max: 1 }
];

const filas = [3, 4, 5, 4, 3];
let tablero = [];
const tableroDiv = document.getElementById('tablero');
const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
const letraNumeroMap = {
  'A': '5', 'B': '2', 'C': '6', 'D': '3', 'E': '8', 'F': '10', 'G': '9', 'H': '12', 'I': '11',
  'J': '4', 'K': '8', 'L': '10', 'M': '9', 'N': '4', 'O': '5', 'P': '6', 'Q': '3', 'R': '11', 'S': 'S'
};

let mostrarImagenes = false; // Variable para rastrear el estado de las imágenes
let mostrarNumeros = false; // Variable para rastrear el estado de las letras/números

function mezclarTerrenos() {
  let listaTerrenos = [];
  terrenos.forEach(terreno => {
    for (let i = 0; i < terreno.max; i++) {
      listaTerrenos.push(terreno.tipo);
    }
  });
  return listaTerrenos.sort(() => Math.random() - 0.5);
}

function terrenoValido(x, y, terreno) {
  const direcciones = [
    [0, -1], [0, 1], [-1, 0], [1, 0], 
    [-1, -1], [1, 1], [-1, 1], [1, -1]
  ];
  for (const [dx, dy] of direcciones) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < filas.length && ny >= 0 && ny < filas[nx] && tablero[nx] && tablero[nx][ny] === terreno) {
      return false;
    }
  }
  return true;
}

function colocarTerreno(x, y, listaTerrenos) {
  for (let intentos = 0; intentos < listaTerrenos.length; intentos++) {
    const terreno = listaTerrenos[intentos];
    if (terrenoValido(x, y, terreno)) {
      return terreno;
    }
  }
  return null;
}

function asignarLetras() {
  const posiciones = [
    { fila: 0, columna: 0 },  // A
    { fila: 0, columna: 1 },  // B
    { fila: 0, columna: 2 },  // C
    { fila: 1, columna: 3 },  // D
    { fila: 2, columna: 4 },  // E
    { fila: 3, columna: 3 },  // F
    { fila: 4, columna: 2 },  // G
    { fila: 4, columna: 1 },  // H
    { fila: 4, columna: 0 },  // I
    { fila: 3, columna: 0 },  // J
    { fila: 2, columna: 0 },  // K
    { fila: 1, columna: 0 },  // L
    { fila: 1, columna: 1 },  // M
    { fila: 1, columna: 2 },  // N
    { fila: 2, columna: 3 },  // O
    { fila: 3, columna: 2 },  // P
    { fila: 3, columna: 1 },  // Q
    { fila: 2, columna: 1 },  // R
    { fila: 2, columna: 2 }   // S (centro)
  ];

  let letraActual = 0;

  for (let i = 0; i < posiciones.length; i++) {
    const { fila, columna } = posiciones[i];
    const hexagono = tableroDiv.children[fila].children[columna];

    if (!hexagono.classList.contains('desierto')) {
      const letraDiv = document.createElement('div');
      letraDiv.className = 'letra';
      letraDiv.innerText = letras[letraActual];
      const numeroDiv = document.createElement('div');
      numeroDiv.className = 'numero';
      numeroDiv.innerText = letraNumeroMap[letras[letraActual]];
      numeroDiv.style.display = 'none'; // Ocultar número inicialmente

      // Cambiar color de números 6 y 8
      if (numeroDiv.innerText === '6' || numeroDiv.innerText === '8') {
        numeroDiv.style.color = 'red';
      }

      const circuloBlanco = document.createElement('div');
      circuloBlanco.className = 'circulo-blanco';
      circuloBlanco.appendChild(letraDiv);
      circuloBlanco.appendChild(numeroDiv);
      hexagono.appendChild(circuloBlanco);
      letraActual++;
    }
  }
}

function reemplazarFichas() {
  const letraElements = document.querySelectorAll('.letra');
  const numeroElements = document.querySelectorAll('.numero');
  mostrarNumeros = !mostrarNumeros;

  letraElements.forEach(letraElement => {
    letraElement.style.display = mostrarNumeros ? 'none' : 'block';
  });

  numeroElements.forEach(numeroElement => {
    numeroElement.style.display = mostrarNumeros ? 'block' : 'none';
  });

  const botonReemplazar = document.getElementById('btn_reemplazar');
  botonReemplazar.innerText = mostrarNumeros ? 'Voltear Fichas (Letras)' : 'Voltear Fichas (Números)';
}

function crearTablero() {
  tableroDiv.innerHTML = '';
  tablero = [];
  let listaTerrenos = mezclarTerrenos();
  let index = 0;

  for (let i = 0; i < filas.length; i++) {
    const filaDiv = document.createElement('div');
    filaDiv.className = 'fila';
    tablero[i] = [];
    for (let j = 0; j < filas[i]; j++) {
      let terreno;
      if (listaTerrenos.length > 0) {
        terreno = colocarTerreno(i, j, listaTerrenos);
        if (terreno) {
          listaTerrenos.splice(listaTerrenos.indexOf(terreno), 1);
        }
      }
      if (!terreno) {
        terreno = 'desierto';
      }
      tablero[i][j] = terreno;
      const hexagono = document.createElement('div');
      hexagono.className = `hexagono ${terreno}`;
      filaDiv.appendChild(hexagono);
    }
    tableroDiv.appendChild(filaDiv);
  }

  asignarLetras(); // Asignar las letras después de crear el tablero

  if (!validarTerrenos()) {
    console.log("Generando nuevo tablero...");
    crearTablero();
  } else {
    console.log("Tablero creado correctamente.");
  }

  // Restablecer estado inicial al crear el tablero
  mostrarNumeros = false;
  const letraElements = document.querySelectorAll('.letra');
  const numeroElements = document.querySelectorAll('.numero');

  letraElements.forEach(letraElement => {
    letraElement.style.display = 'block';
  });

  numeroElements.forEach(numeroElement => {
    numeroElement.style.display = 'none';
  });

  const botonReemplazar = document.getElementById('btn_reemplazar');
  botonReemplazar.innerText = 'Voltear Fichas (Números)';

  mostrarFichas(); // Vuelve a mostrar el Boton "Ocultar Fichas"

  // Reinicia el boton de "Terrenos 3D":
  const boton = document.getElementById('btn_mostrarTerrenos');
  boton.innerText = 'Terrenos 3D';
  mostrarImagenes = false;

}

function validarTerrenos() {
  let conteoTerrenos = {
    trigo: 0,
    madera: 0,
    pasto: 0,
    arcilla: 0,
    roca: 0,
    desierto: 0
  };

  for (let i = 0; i < filas.length; i++) {
    for (let j = 0; j < filas[i]; j++) {
      const terreno = tablero[i][j];
      conteoTerrenos[terreno]++;
    }
  }

  for (let tipo in conteoTerrenos) {
    if (conteoTerrenos[tipo] < terrenos.find(t => t.tipo === tipo).min) {
      return false;
    }
  }
  return true;
}

function mostrarTerrenos() {
  const hexagonos = document.querySelectorAll('.hexagono');
  mostrarImagenes = !mostrarImagenes;

  hexagonos.forEach(hexagono => {
    const terreno = hexagono.classList[1];
    if (mostrarImagenes) {
      hexagono.style.backgroundImage = `url('./imgs/terreno_${terreno}.png')`;
      hexagono.style.backgroundSize = 'cover';
    } else {
      hexagono.style.backgroundImage = '';
    }
  });

  const botonTerrenos = document.getElementById('btn_mostrarTerrenos');
  botonTerrenos.innerText = mostrarImagenes ? 'Terrenos 2D' : 'Terrenos 3D';
}

// Ocultar las Fichas
fichasOcultas = false;

function ocultarFichas() {
  if (fichasOcultas === false) {
    const circulos = document.querySelectorAll('.circulo-blanco');

    circulos.forEach(circulo => {
      circulo.style.display = 'none'; // Oculta las Fichas
    });
  
    const botonOcultar = document.getElementById('btn_ocultarFichas');
    botonOcultar.innerText = 'Mostrar Fichas';
    fichasOcultas = true;
  } else {
    mostrarFichas();
  }
}

function mostrarFichas() {
  const circulos = document.querySelectorAll('.circulo-blanco');

  circulos.forEach(circulo => {
    circulo.style.display = 'flex'; // Vuelve a Mostrar las Fichas
  });
  
  const botonOcultar = document.getElementById('btn_ocultarFichas');
  botonOcultar.innerText = 'Ocultar Fichas';
  fichasOcultas = false;
}

//Volver a la Pagina de Generador de Mapas:
function volver_pagina_mapGenerator() {
  window.location.href = './mapGenerator_paginaInicio.html';
}

crearTablero();

// Con el DESIERTO en el medio **************************************************************************************************

function crearTableroCentrado() {
  tableroDiv.innerHTML = '';
  tablero = [];
  let listaTerrenos = mezclarTerrenos();
  
  // Asegurarse de que el desierto esté en el centro
  const desierto = 'desierto';
  const posicionDesierto = { fila: 2, columna: 2 };
  const indexDesierto = listaTerrenos.indexOf(desierto);
  if (indexDesierto !== -1) {
    listaTerrenos.splice(indexDesierto, 1); // Elimina el desierto de la lista
  } 

  // Colocar terrenos en el tablero
  for (let i = 0; i < filas.length; i++) {
    const filaDiv = document.createElement('div');
    filaDiv.className = 'fila';
    tablero[i] = [];
    for (let j = 0; j < filas[i]; j++) {
      let terreno;
      if (i === posicionDesierto.fila && j === posicionDesierto.columna) {
        terreno = desierto; // Coloca el desierto en el centro
      } else if (listaTerrenos.length > 0) {
        terreno = colocarTerreno(i, j, listaTerrenos);
        if (terreno) {
          listaTerrenos.splice(listaTerrenos.indexOf(terreno), 1);
        }
      }
      if (!terreno) {
        terreno = 'desierto';
      }
      tablero[i][j] = terreno;
      const hexagono = document.createElement('div');
      hexagono.className = `hexagono ${terreno}`;
      filaDiv.appendChild(hexagono);
    }
    tableroDiv.appendChild(filaDiv);

    // Reinicia el boton de "Terrenos 3D":
    const boton = document.getElementById('btn_mostrarTerrenos');
    boton.innerText = 'Terrenos 3D';
    mostrarImagenes = false;
  }

  asignarLetras(); // Asignar las letras después de crear el tablero

  if (!validarTerrenos()) {
    console.log("Generando nuevo tablero...");
    crearTableroCentrado(); // Intenta de nuevo si no es válido
  } else {
    console.log("Tablero centrado creado correctamente.");
  }

  // Restablecer estado inicial
  mostrarNumeros = false;
  const letraElements = document.querySelectorAll('.letra');
  const numeroElements = document.querySelectorAll('.numero');

  letraElements.forEach(letraElement => {
    letraElement.style.display = 'block';
  });

  numeroElements.forEach(numeroElement => {
    numeroElement.style.display = 'none';
  });

  const botonReemplazar = document.getElementById('btn_reemplazar');
  botonReemplazar.innerText = 'Voltear Fichas (Números)';

  mostrarFichas();

}
