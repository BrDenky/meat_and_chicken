<template>
  <div class="trabaja-page">
    <!-- HERO -->
    <section class="trabaja-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">Impulsa tu Negocio con Nosotros</h1>
        <p class="hero-subtitle">Únete a la red de distribución cárnica líder en la región y lleva tus productos a más hogares y negocios.</p>
        <router-link to="#formulario-registro" class="hero-btn">Empezar Solicitud</router-link>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section class="container beneficios-section">
      <div class="section-header">
        <span class="section-tag">¿Por qué unirte?</span>
        <h2>Beneficios de ser Proveedor</h2>
      </div>
      <div class="beneficios-grid">
        <div class="beneficio-card">
          <div class="beneficio-icon"><i class="fa-solid fa-chart-line"></i></div>
          <h3>Mayor Alcance</h3>
          <p>Accede a nuestra amplia base de clientes en Quito y sus alrededores sin preocuparte por el marketing.</p>
        </div>
        <div class="beneficio-card">
          <div class="beneficio-icon"><i class="fa-solid fa-truck-fast"></i></div>
          <h3>Logística Optimizada</h3>
          <p>Nosotros nos encargamos de la coordinación logística y la entrega segura a los clientes finales.</p>
        </div>
        <div class="beneficio-card">
          <div class="beneficio-icon"><i class="fa-solid fa-laptop-code"></i></div>
          <h3>Herramientas Digitales</h3>
          <p>Gestiona tus productos, precios y pedidos de forma sencilla a través de nuestra plataforma para proveedores.</p>
        </div>
        <div class="beneficio-card">
          <div class="beneficio-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
          <h3>Pagos Puntuales</h3>
          <p>Garantizamos transparencia y agilidad en los procesos de liquidación por tus ventas.</p>
        </div>
      </div>
    </section>

    <!-- REQUISITOS -->
    <section class="requisitos-section">
      <div class="container">
        <div class="requisitos-content">
          <div class="requisitos-text">
            <h2>Lo que Buscamos</h2>
            <p>En Meat & Chicken Fast, mantenemos un estándar de calidad riguroso para ofrecer lo mejor a nuestros clientes.</p>
            <ul class="requisitos-list">
              <li><i class="fa-solid fa-check"></i> Registro sanitario vigente de productos.</li>
              <li><i class="fa-solid fa-check"></i> Cumplimiento de normas de bienestar animal.</li>
              <li><i class="fa-solid fa-check"></i> Capacidad de suministro constante y puntual.</li>
              <li><i class="fa-solid fa-check"></i> Pasión por la frescura y la calidad premium.</li>
              <li><i class="fa-solid fa-check"></i> RUC o RISE activo.</li>
            </ul>
          </div>
          <div class="requisitos-image">
            <img src="@/assets/img/trabaja-hero.png" alt="Socio Proveedor">
          </div>
        </div>
      </div>
    </section>

    <!-- EL PROCESO -->
    <section class="container proceso-section">
      <div class="section-header">
        <h2>El Proceso de Selección</h2>
      </div>
      <div class="proceso-steps">
        <div class="step">
          <div class="step-num">1</div>
          <h4>Registro Inicial</h4>
          <p>Completa el formulario con los datos básicos de tu negocio y productos.</p>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <h4>Evaluación</h4>
          <p>Nuestro equipo revisará tu solicitud y verificará los estándares de calidad.</p>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <h4>Entrevista y Visita</h4>
          <p>Agendamos una reunión y visitamos tus instalaciones si es necesario.</p>
        </div>
        <div class="step">
          <div class="step-num">4</div>
          <h4>Onboarding</h4>
          <p>¡Bienvenido! Configuramos tu perfil y empiezas a vender en nuestra red.</p>
        </div>
      </div>
    </section>

    <!-- FORMULARIO -->
    <section id="formulario-registro" class="container form-section">
      <div class="form-wrapper">
        <div class="form-header">
          <h2>Solicitud de Proveedor</h2>
          <p>Déjanos tus datos y nos pondremos en contacto contigo en menos de 48 horas.</p>
        </div>
        <form @submit.prevent="enviarSolicitud" class="registro-form">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre del Negocio / Marca</label>
              <input type="text" v-model="formData.nombreNegocio" required placeholder="Ej: Carnes del Valle">
            </div>
            <div class="form-group">
              <label>Categoría Principal</label>
              <select v-model="formData.categoria" required>
                <option value="" disabled selected>Seleccionar</option>
                <option value="res">Carne de Res</option>
                <option value="pollo">Pollo / Aves</option>
                <option value="cerdo">Cerdo</option>
                <option value="embutidos">Embutidos</option>
                <option value="otros">Otros</option>
              </select>
            </div>
            <div class="form-group">
              <label>Nombre de Contacto</label>
              <input type="text" v-model="formData.nombreContacto" required placeholder="Tu nombre">
            </div>
            <div class="form-group">
              <label>Teléfono / WhatsApp</label>
              <input type="tel" v-model="formData.telefono" required placeholder="09XXXXXXXX">
            </div>
            <div class="form-group">
              <label>Correo Electrónico</label>
              <input type="email" v-model="formData.email" required placeholder="tu@correo.com">
            </div>
            <div class="form-group full-width">
              <label>Cuéntanos sobre tus productos (Origen, certificaciones, etc.)</label>
              <textarea v-model="formData.mensaje" rows="3" placeholder="Escribe aquí..."></textarea>
            </div>
          </div>
          <button type="submit" class="submit-btn" :disabled="enviando">
            {{ enviando ? 'Enviando...' : 'Enviar Solicitud' }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formData = reactive({
  nombreNegocio: '',
  categoria: '',
  nombreContacto: '',
  telefono: '',
  email: '',
  mensaje: ''
});

const enviando = ref(false);

const enviarSolicitud = () => {
  enviando.value = true;
  // Simulación de envío
  setTimeout(() => {
    alert('¡Solicitud enviada con éxito! Nos comunicaremos pronto contigo.');
    enviando.value = false;
    // Reset form
    Object.assign(formData, {
      nombreNegocio: '',
      categoria: '',
      nombreContacto: '',
      telefono: '',
      email: '',
      mensaje: ''
    });
  }, 1500);
};
</script>

<style scoped>
/* HERO */
.trabaja-hero {
  position: relative;
  height: 500px;
  background-image: url('../assets/img/trabaja-hero.png');
  background-size: cover;
  background-position: center 20%;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 40px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(33, 33, 33, 0.9) 0%, rgba(33, 33, 33, 0.5) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  max-width: 700px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  max-width: 600px;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.hero-btn {
  display: inline-block;
  background: #F05A22;
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: transform 0.3s;
}

.hero-btn:hover {
  transform: scale(1.05);
  background: #d94d1a;
}

/* BENEFICIOS */
.beneficios-section {
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

.section-tag {
  color: #F05A22;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: block;
}

.beneficios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.beneficio-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: transform 0.3s;
}

.beneficio-card:hover {
  transform: translateY(-10px);
  border-color: #F05A22;
}

.beneficio-icon {
  font-size: 2.5rem;
  color: #F05A22;
  margin-bottom: 20px;
}

.beneficio-card h3 {
  font-size: 1.25rem;
  margin-bottom: 15px;
  color: #212121;
}

.beneficio-card p {
  color: #666;
  line-height: 1.6;
}

/* REQUISITOS */
.requisitos-section {
  background: #fdfdfb;
  padding: 60px 0;
  margin-bottom: 60px;
}

.requisitos-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.requisitos-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #212121;
}

.requisitos-text p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.requisitos-list {
  list-style: none;
  padding: 0;
}

.requisitos-list li {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #444;
}

.requisitos-list i {
  color: #28a745;
  font-size: 1.2rem;
}

.requisitos-image img {
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

/* PROCESO */
.proceso-section {
  margin-bottom: 60px;
}

.proceso-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  position: relative;
}

.step {
  text-align: center;
  z-index: 1;
}

.step-num {
  width: 50px;
  height: 50px;
  background: #212121;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin: 0 auto 20px;
  font-size: 1.25rem;
  border: 4px solid #fff;
  box-shadow: 0 0 0 2px #212121;
}

.step h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #212121;
}

.step p {
  font-size: 0.95rem;
  color: #666;
}

/* FORMULARIO */
.form-section {
  margin-bottom: 60px;
}

.form-wrapper {
  background: white;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

.form-group {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Campos de 1/3 de ancho en la segunda fila */
.form-group:nth-child(3),
.form-group:nth-child(4),
.form-group:nth-child(5) {
  grid-column: span 2;
}

.form-group.full-width {
  grid-column: span 6;
}

.form-group label {
  font-weight: 700;
  color: #444;
  font-size: 0.95rem;
}

.form-group input, .form-group select, .form-group textarea {
  padding: 14px 18px;
  border-radius: 12px;
  border: 2px solid #f0f0f0;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  border-color: #F05A22;
}

.submit-btn {
  margin-top: 30px;
  width: 100%;
  padding: 18px;
  background: #212121;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #F05A22;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .requisitos-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group, .form-group:nth-child(3), .form-group:nth-child(4), .form-group:nth-child(5) {
    grid-column: auto;
  }
  
  .form-group.full-width {
    grid-column: auto;
  }
}

@media (max-width: 600px) {
  .form-wrapper {
    padding: 30px 20px;
  }
}
</style>
