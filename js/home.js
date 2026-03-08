// Funciones específicas de la página de inicio

// Función para mover el carrusel de ofertas
function iniciarCarrusel() {
  const carrusel = document.getElementById('ofertasCarrusel');
  
  // Duplicar las tarjetas para el efecto infinito
  const tarjetas = carrusel.innerHTML;
  carrusel.innerHTML = tarjetas + tarjetas + tarjetas;

  // Empezar en el bloque del medio
  const tarjeta = carrusel.querySelector('.oferta-card');
  const tarjetaAncho = tarjeta.offsetWidth + 20;
  const totalTarjetas = carrusel.querySelectorAll('.oferta-card').length / 3;
  
  carrusel.style.scrollBehavior = 'auto';
  carrusel.scrollLeft = tarjetaAncho * totalTarjetas;
  carrusel.style.scrollBehavior = 'smooth';
}

function moverCarrusel(direccion) {
  const carrusel = document.getElementById('ofertasCarrusel');
  const tarjeta = carrusel.querySelector('.oferta-card');
  const tarjetaAncho = tarjeta.offsetWidth + 20;
  const totalTarjetas = carrusel.querySelectorAll('.oferta-card').length / 3;
  const bloqueAncho = tarjetaAncho * totalTarjetas;

  carrusel.scrollLeft += direccion * tarjetaAncho;

  // Si se pasa del bloque del medio hacia adelante, salta al inicio del medio
  if (carrusel.scrollLeft >= bloqueAncho * 2) {
    setTimeout(() => {
      carrusel.style.scrollBehavior = 'auto';
      carrusel.scrollLeft = bloqueAncho;
      carrusel.style.scrollBehavior = 'smooth';
    }, 300);
  }

  // Si se pasa del bloque del medio hacia atrás, salta al final del medio
  if (carrusel.scrollLeft <= 0) {
    setTimeout(() => {
      carrusel.style.scrollBehavior = 'auto';
      carrusel.scrollLeft = bloqueAncho;
      carrusel.style.scrollBehavior = 'smooth';
    }, 300);
  }
}

// Arrancar el carrusel al cargar la página
window.addEventListener('DOMContentLoaded', iniciarCarrusel);

// Función para suscribirse al newsletter
function suscribir() {
    const email = document.getElementById('emailInput').value.trim();
    if (!email || !email.includes('@')) {
        alert('Ingresa un correo válido');
        return;
    }
    alert('¡Gracias! Te suscribiste con: ' + email);
    document.getElementById('emailInput').value = '';
}
