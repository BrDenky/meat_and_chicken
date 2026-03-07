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