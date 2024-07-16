const filas = [5, 6, 7, 8, 7, 6, 5];
const tableroDiv = document.getElementById('tablero');

const numerosAgua = [2, 8, 12, 13, 15, 16, 19, 21, 24, 26, 29, 32, 36, 39, 42];
const numerosNiebla = [1, 6, 7, 14, 22, 23, 30, 31, 37, 38, 43, 44];

const isla1 = [20, 27, 28, 34, 35, 40, 41];
const isla2 = [3, 4, 5, 9, 10, 11, 17, 18, 25, 33];

const maxTerrenosIsla1 = { madera: 2, pasto: 2, trigo: 1, roca: 1, arcilla: 1 };
const minTerrenosIsla1 = { madera: 1, pasto: 1, trigo: 0, roca: 0, arcilla: 0 };

const maxTerrenosIsla2 = { arcilla: 2, trigo: 2, madera: 2, roca: 2, pasto: 2 };
const minTerrenosIsla2 = { arcilla: 1, trigo: 1, madera: 0, roca: 0, pasto: 0 };

const terrenosIsla1 = ['madera', 'madera', 'pasto', 'pasto', 'trigo', 'roca', 'arcilla'];
const terrenosIsla2 = ['arcilla', 'arcilla', 'trigo', 'trigo', 'madera', 'madera', 'roca', 'roca', 'pasto', 'pasto'];

let mostrarImagenes = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function puedeColocar(tablero, index, terreno) {
    const posicionesAdyacentes = [
        index - 1, index + 1, // izquierda, derecha
        index - 5, index - 6, // arriba
        index + 5, index + 6, // abajo
        index - 7, index + 7  // diagonales
    ];
    return !posicionesAdyacentes.some(pos => tablero[pos] === terreno);
}

function validarTerrenos(tablero) {
    const conteoIsla1 = {};
    isla1.forEach(pos => {
        const terreno = tablero[pos - 1];
        conteoIsla1[terreno] = (conteoIsla1[terreno] || 0) + 1;
    });

    for (const terreno in conteoIsla1) {
        if (conteoIsla1[terreno] > (maxTerrenosIsla1[terreno] || 0) || conteoIsla1[terreno] < (minTerrenosIsla1[terreno] || 0)) {
            return false;
        }
    }

    const conteoIsla2 = {};
    isla2.forEach(pos => {
        const terreno = tablero[pos - 1];
        conteoIsla2[terreno] = (conteoIsla2[terreno] || 0) + 1;
    });

    for (const terreno in conteoIsla2) {
        if (conteoIsla2[terreno] > (maxTerrenosIsla2[terreno] || 0) || conteoIsla2[terreno] < (minTerrenosIsla2[terreno] || 0)) {
            return false;
        }
    }

    return true;
}

function crearTablero() {
    tableroDiv.innerHTML = '';
    let tablero = Array(45).fill('default');

    // Marcar agua y niebla
    numerosAgua.forEach(num => tablero[num - 1] = 'agua');
    numerosNiebla.forEach(num => tablero[num - 1] = 'niebla');

    // Intentar hasta que se valide correctamente
    let validado = false;
    while (!validado) {
        tablero.fill('default');
        numerosAgua.forEach(num => tablero[num - 1] = 'agua');
        numerosNiebla.forEach(num => tablero[num - 1] = 'niebla');
        
        shuffle(terrenosIsla1);
        shuffle(terrenosIsla2);

        // Colocar terrenos en isla 1
        isla1.forEach((pos, index) => {
            let terreno = terrenosIsla1[index];
            while (!puedeColocar(tablero, pos - 1, terreno)) {
                terreno = terrenosIsla1[Math.floor(Math.random() * terrenosIsla1.length)];
            }
            tablero[pos - 1] = terreno;
        });

        // Colocar terrenos en isla 2
        isla2.forEach((pos, index) => {
            let terreno = terrenosIsla2[index];
            while (!puedeColocar(tablero, pos - 1, terreno)) {
                terreno = terrenosIsla2[Math.floor(Math.random() * terrenosIsla2.length)];
            }
            tablero[pos - 1] = terreno;
        });

        // Validar terrenos en ambas islas
        validado = validarTerrenos(tablero);

        // Cambiar el texto del botón
        const boton = document.getElementById('btn_mostrarTerrenos');
        boton.innerText = 'Terrenos 3D';
        mostrarImagenes = false;
    }

    // Renderizar el tablero
    let numero = 1;
    for (let i = 0; i < filas.length; i++) {
        const filaDiv = document.createElement('div');
        filaDiv.className = 'fila';
        for (let j = 0; j < filas[i]; j++) {
            const hexagono = document.createElement('div');
            const terreno = tablero[numero - 1];
            hexagono.className = `hexagono ${terreno}`;
            if (terreno !== 'agua' && terreno !== 'niebla') {
                hexagono.innerText = numero;
            }
            filaDiv.appendChild(hexagono);
            numero++;
        }
        tableroDiv.appendChild(filaDiv);
    }
}

// Para mostrar los terrenos:
function mostrarTerrenos() {
    const hexagonos = document.querySelectorAll('.hexagono');
    mostrarImagenes = !mostrarImagenes; // Cambiar estado

    hexagonos.forEach(hexagono => {
        const terreno = hexagono.className.split(' ')[1]; // Obtener el terreno
        if (mostrarImagenes) {
            // Mostrar imágenes
            switch (terreno) {
                case 'pasto':
                    hexagono.style.backgroundImage = "url('./imgs/terreno_pasto.png')";
                    break;
                case 'madera':
                    hexagono.style.backgroundImage = "url('./imgs/terreno_madera.png')";
                    break;
                case 'roca':
                    hexagono.style.backgroundImage = "url('./imgs/terreno_roca.png')";
                    break;
                case 'trigo':
                    hexagono.style.backgroundImage = "url('./imgs/terreno_trigo.png')";
                    break;
                case 'arcilla':
                    hexagono.style.backgroundImage = "url('./imgs/terreno_arcilla.png')";
                    break;
                default:
                    break;
            }
            hexagono.style.backgroundSize = 'cover'; // Asegurarse de que la imagen cubra el hexágono
        } else {
            // Volver al color por defecto
            hexagono.style.backgroundImage = '';
            hexagono.innerText = terreno !== 'agua' && terreno !== 'niebla' ? hexagono.innerText : '';
        }
    });

    // Cambiar el texto del botón
    const boton = document.getElementById('btn_mostrarTerrenos');
    boton.innerText = mostrarImagenes ? 'Terrenos 2D' : 'Terrenos 3D';
}

// Iniciar el tablero al cargar la página
crearTablero();

//Volver a la Pagina de Generador de Mapas:
function volver_pagina_mapGenerator() {
    window.location.href = './mapGenerator_paginaInicio.html';
  }
  