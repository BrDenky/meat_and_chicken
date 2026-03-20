<template>
  <div class="noticias-page">
    <!-- HERO SECTION -->
    <section class="noticias-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <span class="hero-tag">Actualidad Cárnica</span>
        <h1 class="hero-title">Noticias y Novedades</h1>
        <p class="hero-subtitle">Descubre las últimas tendencias, consejos de expertos y noticias de nuestra comunidad de productores.</p>
      </div>
    </section>

    <!-- BLOG SECTION -->
    <div class="container blog-container">
      <!-- ARTÍCULO DESTACADO -->
      <section class="featured-post" @click="verNoticia(1)">
        <div class="featured-image">
          <img src="@/assets/img/noticias/sustentabilidad.png" alt="Ganadería Sustentable">
        </div>
        <div class="featured-content">
          <span class="post-category">Sustentabilidad</span>
          <h2>La Ganadería Regenerativa en Pintag: El Futuro del Sector</h2>
          <p>Exploramos cómo nuestros productores están adoptando técnicas que no solo mejoran la calidad de la carne, sino que restauran la biodiversidad de nuestros suelos.</p>
          <div class="post-meta">
            <div class="meta-author">
              <img src="@/assets/img/logo.png" alt="Meat & Chicken Fast">
              <span>Por Equipo Meat & Chicken</span>
            </div>
            <span class="meta-date">20 Marzo, 2026</span>
          </div>
          <button class="read-more-btn">Leer Artículo Completo</button>
        </div>
      </section>

      <!-- FILTROS / CATEGORÍAS -->
      <div class="blog-filters">
        <button class="filter-btn active">Todos</button>
        <button class="filter-btn">Recetas</button>
        <button class="filter-btn">Nutrición</button>
        <button class="filter-btn">Comunidad</button>
        <button class="filter-btn">Tips de Cocina</button>
      </div>

      <!-- GRID DE NOTICIAS -->
      <div class="noticias-grid">
        <article v-for="post in noticias" :key="post.id" class="post-card" @click="verNoticia(post.id)">
          <div class="post-card-image">
            <img :src="post.image" :alt="post.title">
            <span class="post-card-tag">{{ post.category }}</span>
          </div>
          <div class="post-card-content">
            <div class="post-card-meta">{{ post.date }} • {{ post.readTime }} min lectura</div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.summary }}</p>
            <a href="#" class="post-link">Saber más <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </article>
      </div>

      <!-- PAGINACIÓN (Visual) -->
      <div class="blog-pagination">
        <button class="pagi-btn prev" disabled><i class="fa-solid fa-chevron-left"></i></button>
        <button class="pagi-number active">1</button>
        <button class="pagi-number">2</button>
        <button class="pagi-number">3</button>
        <button class="pagi-btn next"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>

    <!-- NEWSLETTER (Reutilizando estilo) -->
    <div class="blog-newsletter">
      <div class="container">
        <div class="newsletter-card">
          <div class="newsletter-icon">
            <i class="fa-solid fa-envelope-open-text"></i>
          </div>
          <h3>¡No te pierdas ninguna novedad!</h3>
          <p>Recibe los mejores tips de cocina y ofertas exclusivas directamente en tu correo.</p>
          <div class="newsletter-form">
            <input type="email" placeholder="tu@correo.com">
            <button class="btn-subscribe">Suscribirme</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const noticias = ref([
  {
    id: 2,
    title: 'Guía de Cortes Premium: Cómo Elegir el Lomo Perfecto',
    category: 'Tips de Cocina',
    summary: 'Aprende a identificar la infiltración de grasa y la textura ideal para que tus parrilladas sean inolvidables.',
    image: '/img/noticias/cortes.png',
    date: '18 Marzo, 2026',
    readTime: '5'
  },
  {
    id: 3,
    title: 'Nuestra Comunidad: Conoce a los Productores del 7 Pozo',
    category: 'Comunidad',
    summary: 'Visitamos la hacienda del 7 Pozo para conocer su proceso de crianza en campo abierto y el compromiso con el bienestar animal.',
    image: '/img/noticias/sustentabilidad.png', // Reusing for demo
    date: '15 Marzo, 2026',
    readTime: '8'
  },
  {
    id: 4,
    title: 'Mitos y Verdades sobre la Carne Blanca',
    category: 'Nutrición',
    summary: '¿Es realmente el pollo la mejor opción para deportistas? Analizamos sus beneficios frente a otras proteínas.',
    image: '/img/ofertas/pechuga.png',
    date: '12 Marzo, 2026',
    readTime: '4'
  },
  {
    id: 5,
    title: 'Nuevos Estándares de Higiene en Distribución',
    category: 'Actualidad',
    summary: 'Implementamos nuevos protocolos de cadena de frío y empaque al vacío para asegurar la máxima frescura.',
    image: '/img/noticias/cortes.png', // Reusing for demo
    date: '10 Marzo, 2026',
    readTime: '6'
  }
]);

const verNoticia = (id) => {
  alert('Visualizando noticia ID: ' + id);
};
</script>

<style scoped>
/* HERO SECTION */
.noticias-hero {
  position: relative;
  height: 400px;
  background-image: url('@/assets/img/noticias/cortes.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 60px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(33, 33, 33, 0.9) 0%, rgba(33, 33, 33, 0.4) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-tag {
  display: inline-block;
  background: #F05A22;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  opacity: 0.9;
  line-height: 1.6;
}

/* BLOG CONTAINER */
.blog-container {
  margin-bottom: 100px;
}

/* FEATURED POST */
.featured-post {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.06);
  margin-bottom: 60px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.featured-post:hover {
  transform: translateY(-5px);
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-content {
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-category {
  color: #F05A22;
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
  display: block;
}

.featured-content h2 {
  font-size: 2.2rem;
  color: #212121;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.featured-content p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.meta-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-author img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.meta-author span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
}

.meta-date {
  font-size: 0.9rem;
  color: #999;
}

.read-more-btn {
  align-self: flex-start;
  background: #F05A22;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.read-more-btn:hover {
  background: #d94d1a;
}

/* FILTERS */
.blog-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.filter-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid #eee;
  border-radius: 30px;
  white-space: nowrap;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover, .filter-btn.active {
  background: #F05A22;
  color: white;
  border-color: #F05A22;
}

/* NOTICIAS GRID */
.noticias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.post-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-8px);
}

.post-card-image {
  position: relative;
  height: 220px;
}

.post-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-card-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #F05A22;
  text-transform: uppercase;
}

.post-card-content {
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-card-meta {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 10px;
}

.post-card h3 {
  font-size: 1.3rem;
  color: #212121;
  margin-bottom: 12px;
  line-height: 1.4;
}

.post-card p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.post-link {
  color: #F05A22;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

/* PAGINATION */
.blog-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagi-btn, .pagi-number {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.pagi-number.active {
  background: #212121;
  color: white;
  border-color: #212121;
}

.pagi-btn:hover:not(:disabled), .pagi-number:hover:not(.active) {
  background: #F05A22;
  color: white;
  border-color: #F05A22;
}

.pagi-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* NEWSLETTER */
.blog-newsletter {
  padding: 80px 0;
  background: #fdfdfb;
}

.newsletter-card {
  background: white;
  padding: 60px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
  max-width: 800px;
  margin: 0 auto;
}

.newsletter-icon {
  font-size: 3rem;
  color: #F05A22;
  margin-bottom: 20px;
}

.newsletter-card h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.newsletter-card p {
  color: #666;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.newsletter-form {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 16px 20px;
  border-radius: 12px;
  border: 2px solid #f0f0f0;
  font-size: 1rem;
  outline: none;
}

.newsletter-form input:focus {
  border-color: #F05A22;
}

.btn-subscribe {
  padding: 16px 30px;
  background: #F05A22;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .featured-post {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 600px) {
  .newsletter-form {
    flex-direction: column;
  }
  
  .noticias-grid {
    grid-template-columns: 1fr;
  }
}
</style>
