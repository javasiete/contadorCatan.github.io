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
  'A': 5, 'B': 2, 'C': 6, 'D': 3, 'E': 8, 'F': 10, 'G': 9, 'H': 12, 'I': 11,
  'J': 4, 'K': 8, 'L': 10, 'M': 9, 'N': 4, 'O': 5, 'P': 6, 'Q': 3, 'R': 11, 'S': 'S'
};

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
  let countDesierto = 0;
  let countRoca = 0;
  let countArcilla = 0;
  let countPasto = 0;
  let countMadera = 0;
  
  for (const [dx, dy] of direcciones) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < filas.length && ny >= 0 && ny < filas[nx] && tablero[nx] && tablero[nx][ny] === terreno) {
      return false;
    }
    if (tablero[nx] && tablero[nx][ny] === 'desierto') {
      countDesierto++;
    } else if (tablero[nx] && tablero[nx][ny] === 'roca') {
      countRoca++;
    } else if (tablero[nx] && tablero[nx][ny] === 'arcilla') {
      countArcilla++;
    } else if (tablero[nx] && tablero[nx][ny] === 'pasto') {
      countPasto++;
    } else if (tablero[nx] && tablero[nx][ny] === 'madera') {
      countMadera++;
    }
  }
  
  if (terreno === 'desierto' && countDesierto >= 1) {
    return false;
  }
  if (terreno === 'roca' && countRoca >= 3) {
    return false;
  }
  if (terreno === 'arcilla' && countArcilla >= 3) {
    return false;
  }
  if (terreno === 'pasto' && countPasto >= 4) {
    return false;
  }
  if (terreno === 'madera' && countMadera >= 4) {
    return false;
  }
  
  return true;
}

function colocarTerreno(x, y, listaTerrenos) {
  for (let intentos = 0; intentos < listaTerrenos.length; intentos++) {
    const terreno = listaTerrenos[intentos];
    const { min, max } = terrenos.find(t => t.tipo === terreno);
    if (terrenoValido(x, y, terreno)) {
      if (min > 0) {
        terrenos.find(t => t.tipo === terreno).min--;
      }
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

  let letrasRestantes = letras.slice(0, -1);  // Excluir 'S' de letrasRestantes
  let letraActual = 0;

  for (let i = 0; i < posiciones.length; i++) {
    const { fila, columna } = posiciones[i];
    const hexagono = tableroDiv.children[fila].children[columna];

    if (!hexagono.classList.contains('desierto')) {
      const letraDiv = document.createElement('div');
      letraDiv.className = 'letra';
      letraDiv.innerText = letrasRestantes[letraActual];
      letraActual++;
      hexagono.appendChild(letraDiv);
    }
  }
}

function reemplazarFichas() {
  const letraElements = document.querySelectorAll('.letra');

  letraElements.forEach(letraElement => {
    const letra = letraElement.innerText;
    if (letraNumeroMap[letra] !== undefined) {
      letraElement.innerText = letraNumeroMap[letra];
      const circuloBlanco = document.createElement('div');
      circuloBlanco.className = 'circulo-blanco';
      letraElement.parentNode.appendChild(circuloBlanco);
      circuloBlanco.appendChild(letraElement);

      // Aplicar color rojo a los números 8 y 6
      const numero = letraNumeroMap[letra];
      if (numero === 8 || numero === 6) {
        letraElement.classList.add('rojo');
      }
    }
  });
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

  if (!validarTablero()) {
    console.log("Generando nuevo tablero...");
    crearTablero();
  } else {
    console.log("Tablero creado correctamente.");
  }
}

function validarTablero() {
  let countTrigo = 0;
  let countMadera = 0;
  let countPasto = 0;
  let countArcilla = 0;
  let countRoca = 0;
  let countDesierto = 0;

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      switch (tablero[i][j]) {
        case 'trigo':
          countTrigo++;
          break;
        case 'madera':
          countMadera++;
          break;
        case 'pasto':
          countPasto++;
          break;
        case 'arcilla':
          countArcilla++;
          break;
        case 'roca':
          countRoca++;
          break;
        case 'desierto':
          countDesierto++;
          break;
      }
    }
  }

  if (countTrigo !== 4 || countMadera !== 4 || countPasto !== 4 || countArcilla !== 3 || countRoca !== 3 || countDesierto !== 1) {
    return false;
  }

  return true;
}

crearTablero();

function ir_a_pagina_1() {
  window.location.href = './index.html';
}