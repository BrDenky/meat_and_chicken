<template>
  <div class="sobre-nosotros">
    <!-- HERO SECTION -->
    <section class="about-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">Sobre Nosotros</h1>
        <p class="hero-subtitle">Conectando la frescura del campo con tu mesa desde el corazón de Pintag.</p>
      </div>
    </section>

    <!-- QUIENES SOMOS -->
    <section class="container quienes-somos">
      <div class="about-grid">
        <div class="about-text">
          <span class="section-tag">Nuestra Historia</span>
          <h2>Comprometidos con la Calidad y la Comunidad</h2>
          <p>
            En <strong>Meat & Chicken Fast</strong>, nacimos con la convicción de que el acceso a productos cárnicos frescos y de alta calidad no debería ser un lujo, sino un estándar. Somos una plataforma dedicada a transformar la cadena de suministro local, eliminando intermediarios innecesarios y asegurando que cada corte que llega a tu hogar cumpla con los más estrictos estándares de inocuidad.
          </p>
          <p>
            Nuestra raíces están en Pintag, donde valoramos el trabajo de los productores locales y la confianza de nuestros vecinos. Hoy, integramos tecnología de vanguardia para ofrecer una experiencia de compra personalizada, rápida y segura.
          </p>
        </div>
        <div class="about-visual">
          <div class="visual-card">
            <img src="@/assets/img/logo.png" alt="Meat & Chicken Fast Logo" class="about-logo">
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">14+</span>
                <span class="stat-label">Proveedores</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Fresco</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MISIÓN Y VISIÓN -->
    <section class="mv-section">
      <div class="container">
        <div class="mv-grid">
          <div class="mv-card mission">
            <div class="mv-icon">
              <i class="fa-solid fa-flag-checkered"></i>
            </div>
            <h3>Nuestra Misión</h3>
            <p>
              Conectar directamente a proveedores responsables con consumidores y negocios mediante un modelo logístico flexible, herramientas digitales y protocolos sanitarios certificados, garantizando calidad, inocuidad y atención personalizada en cada pedido.
            </p>
          </div>
          <div class="mv-card vision">
            <div class="mv-icon">
              <i class="fa-solid fa-rocket"></i>
            </div>
            <h3>Nuestra Visión</h3>
            <p>
              Ser la red de distribución cárnica más confiable, eficiente y personalizada del sector de Pintag y sus alrededores, integrando tecnología, trazabilidad y compromiso comunitario para impulsar el desarrollo sostenible del comercio local.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- VALORES -->
    <section class="container valores-section">
      <div class="section-header">
        <span class="section-tag">Nuestros Valores</span>
        <h2>Los Pilares que nos Guían</h2>
      </div>
      <div class="valores-grid">
        <div class="valor-item">
          <div class="valor-icon"><i class="fa-solid fa-shield-halved"></i></div>
          <h4>Confianza</h4>
          <p>Transparencia total en el origen y manejo de nuestros productos.</p>
        </div>
        <div class="valor-item">
          <div class="valor-icon"><i class="fa-solid fa-leaf"></i></div>
          <h4>Sostenibilidad</h4>
          <p>Apoyo al comercio local y prácticas responsables con el entorno.</p>
        </div>
        <div class="valor-item">
          <div class="valor-icon"><i class="fa-solid fa-handshake-angle"></i></div>
          <h4>Compromiso</h4>
          <p>Dedicación absoluta a la satisfacción y salud de nuestros clientes.</p>
        </div>
        <div class="valor-item">
          <div class="valor-icon"><i class="fa-solid fa-microchip"></i></div>
          <h4>Innovación</h4>
          <p>Uso inteligente de la tecnología para mejorar la logística alimentaria.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <div class="container">
        <div class="cta-box">
          <h2>¿Listo para probar la diferencia?</h2>
          <p>Explora los productos de nuestros proveedores locales y recibe calidad premium en la puerta de tu casa.</p>
          <router-link to="/resultados" class="cta-btn">Ver Productos</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No logic needed for this static view currently
</script>

<style scoped>
/* HERO SECTION */
.about-hero {
  position: relative;
  height: 450px;
  background-image: url('../assets/img/about-hero.png');
  background-size: cover;
  background-position: center 25%;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 30px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  opacity: 0.9;
}

/* QUIENES SOMOS */
.quienes-somos {
  margin-bottom: 60px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.section-tag {
  display: inline-block;
  background: #fff5f2;
  color: #F05A22;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.about-text h2 {
  font-size: 2.5rem;
  color: #212121;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.about-text p {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.visual-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  text-align: center;
  border: 1px solid #f0f0f0;
}

.about-logo {
  max-width: 200px;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #F05A22;
}

.stat-label {
  font-size: 0.9rem;
  color: #888;
  font-weight: 600;
}

/* MISIÓN Y VISIÓN */
.mv-section {
  background: #fffaf8; /* Crema cálido acorde a la marca */
  padding: 60px 0;
  color: #333;
  margin-bottom: 60px;
}

.mv-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.mv-card {
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #f0efeb;
  box-shadow: 0 10px 30px rgba(240, 90, 34, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.mv-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(240, 90, 34, 0.12);
  border-color: #F05A22;
}

.mv-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #F05A22 0%, #ff8a5c 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin: 0 auto 25px;
  color: white;
  box-shadow: 0 8px 20px rgba(240, 90, 34, 0.25);
}

.mv-card h3 {
  font-size: 1.6rem;
  margin-bottom: 1.25rem;
  color: #212121;
}

.mv-card p {
  font-size: 1rem;
  line-height: 1.7;
  color: #666;
}

/* VALORES */
.valores-section {
  margin-bottom: 60px;
}

.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #212121;
}

.valores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
}

.valor-item {
  padding: 30px;
  border-radius: 20px;
  background: white;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.valor-item:hover {
  box-shadow: 0 15px 30px rgba(0,0,0,0.05);
  border-color: #F05A22;
}

.valor-icon {
  font-size: 2.5rem;
  color: #F05A22;
  margin-bottom: 20px;
}

.valor-item h4 {
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #212121;
}

.valor-item p {
  color: #666;
  line-height: 1.6;
}

/* CTA */
.about-cta {
  padding-bottom: 80px;
}

.cta-box {
  background: linear-gradient(135deg, #F05A22 0%, #d94d1a 100%);
  border-radius: 30px;
  padding: 60px;
  text-align: center;
  color: white;
}

.cta-box h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-box p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-btn {
  display: inline-block;
  background: white;
  color: #F05A22;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.cta-btn:hover {
  transform: scale(1.05);
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .about-grid, .mv-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }

  .about-visual {
    order: -1;
  }
}

@media (max-width: 600px) {
  .mv-card {
    padding: 30px;
  }
  
  .cta-box {
    padding: 40px 20px;
  }
}
</style>
