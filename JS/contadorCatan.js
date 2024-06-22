// Funciones para incrementar y decrementar los contadores
function incrementar(nombreContador) {
    let contador = document.getElementById(nombreContador);
    let valor = parseInt(contador.textContent);
    contador.textContent = valor + 1;
  }

  function decrementar(nombreContador) {
    let contador = document.getElementById(nombreContador);
    let valor = parseInt(contador.textContent);
    if (valor > 0) {
      contador.textContent = valor - 1;
    }
  }

