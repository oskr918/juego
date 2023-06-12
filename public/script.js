// Obtener elementos del DOM
const apuestaBtns = document.getElementsByClassName('apuestaBtn');
const jugarBtn = document.getElementById('jugarBtn');
const altoBtn = document.getElementById('altoBtn');
const creditosSpan = document.getElementById('creditos');
const slots = document.getElementsByClassName('slot');
const apuesta = document.getElementById('apuesta')


// Variables de juego
let creditos = 100;
let animacion;
let apuestaActual = 0;

// Función para generar un número aleatorio entre 1 y 3
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 3) + 1;
}

// Función para actualizar el contador de créditos
function actualizarCreditos() {
  creditosSpan.textContent = creditos.toString();
}

// Función para verificar si el jugador tiene créditos suficientes para apostar
function tieneCreditosSuficientes() {
  return creditos >= apuestaActual;
}

// Función para iniciar la animación de los slots
function iniciarAnimacion() {
  animacion = setInterval(() => {
    for (let i = 0; i < slots.length; i++) {
      slots[i].textContent = generarNumeroAleatorio();
    }
  }, 100);
  jugarBtn.disabled = true;
  altoBtn.disabled = false;
}

// Función para detener la animación de los slots y comprobar si los números son iguales
function detenerAnimacion() {
  clearInterval(animacion);
  jugarBtn.disabled = false;
  altoBtn.disabled = true;

  if (numerosIguales()) {
    alert('¡Has ganado!');
    creditos += apuestaActual * 3;
  } else {
    alert('Has perdido. Inténtalo de nuevo.');
    creditos -= apuestaActual;
  }

  actualizarCreditos();
}

// Función para verificar si los números generados son iguales
function numerosIguales() {
  return slots[0].textContent === slots[1].textContent && slots[1].textContent === slots[2].textContent;
}

// Función para manejar la lógica de juego al presionar el botón "Jugar"
function jugar() {
  if (tieneCreditosSuficientes()) {
    if (apuestaActual > 0) {
      iniciarAnimacion();
    } else {
      alert('Debes seleccionar una apuesta antes de jugar.');
    }
  } else {
    alert('No tienes suficientes créditos para realizar esa apuesta.');
  }
}

// Event listener para los botones de apuesta
for (let i = 0; i < apuestaBtns.length; i++) {
  apuestaBtns[i].addEventListener('click', function() {
    apuesta.textContent = apuestaBtns[i].textContent
    apuestaActual = parseInt(this.dataset.apuesta);
    actualizarCreditos();
    jugarBtn.disabled = false;
  });
}

// Event listener para el botón "Jugar"
jugarBtn.addEventListener('click', jugar);

// Event listener para el botón "Alto"
altoBtn.addEventListener('click', () => {
  detenerAnimacion();
});

// Actualizar el contador de créditos inicialmente
actualizarCreditos();
