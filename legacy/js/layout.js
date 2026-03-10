// Funciones del menú lateral
function abrirMenu() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarMenu() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = '';
}

function setRole(btn, role) {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.sidebar-nav').forEach(n => n.classList.add('hidden'));
    document.getElementById('menu-' + role).classList.remove('hidden');
}

// Función de búsqueda
function buscar() {
    const val = document.getElementById('searchInput').value.trim();
    if (val) {
        window.location.href = 'resultados.html?q=' + encodeURIComponent(val);
    }
}
document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') buscar();
});

function agregarAlCarrito(nombre, precio, emoji) {
  // Leer carrito actual
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Ver si ya existe el producto
  const existe = carrito.find(p => p.nombre === nombre);

  if (existe) {
    existe.qty += 1;
  } else {
    carrito.push({
      id: Date.now(),
      nombre: nombre,
      precio: precio,
      emoji: emoji,
      qty: 1
    });
  }

  // Guardar
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Notificación visual
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = '✓ ' + nombre + ' añadido al carrito';
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}
function abrirLogin() {
  document.getElementById('loginOverlay').classList.add('active');
  document.getElementById('loginModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cerrarLogin() {
  document.getElementById('loginOverlay').classList.remove('active');
  document.getElementById('loginModal').classList.remove('active');
  document.body.style.overflow = '';
}

function cambiarLoginTab(btn, tab) {
  document.querySelectorAll('.login-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.login-content').forEach(c => c.classList.add('hidden'));
  document.getElementById('login-' + tab).classList.remove('hidden');
}

function cambiarSubtab(btn, formId) {
  document.querySelectorAll('.login-subtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('registro-form').classList.add('hidden');
  document.getElementById(formId).classList.remove('hidden');
}

function iniciarSesion(tipo) {
  // 1. Simular una pequeña validación o carga (opcional pero recomendado)
  console.log('Iniciando sesión como: ' + tipo);

  // 2. Definir a dónde va cada usuario
  switch(tipo) {
    case 'cliente':
      window.location.href = 'perfil.html';
      break;
    
    case 'proveedor':
      window.location.href = 'proveedor.html';
      break;
    
    case 'tecnico':
      window.location.href = 'soporte-panel.html';
      break;

    default:
      // Si no reconoce el tipo, vuelve al inicio
      window.location.href = 'index.html';
  }
}

function registrarse() {
    // 1. Aquí podrías añadir lógica de validación (campos vacíos, etc.)
    console.log("Procesando registro...");

    // 2. Redirección al completar el proceso
    window.location.href = 'index.html';
}