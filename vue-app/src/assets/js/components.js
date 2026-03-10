// Carga el header
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;

    // Funciones del menú
    window.abrirMenu = function() {
      document.getElementById('sidebar').classList.add('open');
      document.getElementById('overlay').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    window.cerrarMenu = function() {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('active');
      document.body.style.overflow = '';
    }
    window.setRole = function(btn, role) {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.sidebar-nav').forEach(n => n.classList.add('hidden'));
      document.getElementById('menu-' + role).classList.remove('hidden');
    }
    window.buscar = function() {
      const val = document.getElementById('searchInput').value.trim();
      if (val) window.location.href = 'resultados.html?q=' + encodeURIComponent(val);
    }
    document.getElementById('searchInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') window.buscar();
    });
  });

// Carga el footer
fetch('footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-placeholder').innerHTML = html;
  });