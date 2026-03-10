<template>
  <div class="perfil-proveedor-view">
    <!-- HERO DEL PROVEEDOR -->
    <section class="proveedor-hero">
        <div class="container">
            <div class="proveedor-hero-content">
                <div class="proveedor-logo-container">
                        <div class="provider-avatar">
                            <img src="@/assets/img/proveedores/provedor_1.png" alt="Logo Proveedor">
                        </div>
                    <span class="proveedor-verificado">
                        ✓ Verificado
                    </span>
                </div>

                <div class="proveedor-info-header">
                    <h1 class="proveedor-nombre">7 Pozo</h1>
                    <div class="proveedor-categoria">
                        🥩 Carne de Res Premium
                    </div>
                    <div class="proveedor-experiencia">
                        ⭐ 25-30 años de experiencia en el mercado cárnico
                    </div>

                    <div class="proveedor-stats">
                        <div class="stat-box">
                            <div class="stat-number">150+</div>
                            <div class="stat-label">Productos</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">4.9</div>
                            <div class="stat-label">Calificación</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">5,000+</div>
                            <div class="stat-label">Clientes</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Atención</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- TABS DE NAVEGACIÓN -->
    <div class="proveedor-tabs" ref="tabsContainer">
        <div class="container">
            <div class="tabs-container">
                <button class="tab-btn" :class="{ active: currentTab === 'productos' }" @click="cambiarTab('productos')">
                    📦 Productos
                </button>
                <button class="tab-btn" :class="{ active: currentTab === 'sobre' }" @click="cambiarTab('sobre')">
                    ℹ️ Sobre Nosotros
                </button>
                <button class="tab-btn" :class="{ active: currentTab === 'ubicacion' }" @click="cambiarTab('ubicacion')">
                    📍 Ubicación
                </button>
                <button class="tab-btn" :class="{ active: currentTab === 'noticias' }" @click="cambiarTab('noticias')">
                    📰 Noticias
                </button>
                <button class="tab-btn" :class="{ active: currentTab === 'contacto' }" @click="cambiarTab('contacto')">
                    📞 Contacto
                </button>
            </div>
        </div>
    </div>

    <!-- CONTENIDO -->
    <main>
        
        <!-- TAB: PRODUCTOS -->
        <div class="tab-content" v-show="currentTab === 'productos'">
            <div class="container">
                <h2 class="section-title">Nuestros Productos</h2>

                <div class="productos-filtros">
                    <button class="filtro-btn" :class="{ active: currentFilter === 'Todos' }" @click="currentFilter = 'Todos'">Todos</button>
                    <button class="filtro-btn" :class="{ active: currentFilter === 'Premium' }" @click="currentFilter = 'Premium'">Premium</button>
                    <button class="filtro-btn" :class="{ active: currentFilter === 'Cortes Especiales' }" @click="currentFilter = 'Cortes Especiales'">Cortes Especiales</button>
                    <button class="filtro-btn" :class="{ active: currentFilter === 'Mix Parrillero' }" @click="currentFilter = 'Mix Parrillero'">Mix Parrillero</button>
                    <button class="filtro-btn" :class="{ active: currentFilter === 'Ofertas' }" @click="currentFilter = 'Ofertas'">Ofertas</button>
                </div>

                <div class="productos-grid">
                    <!-- Products rendered via v-for for reactivity with filters -->
                    <div class="producto-card" v-for="product in filteredProducts" :key="product.id">
                        <div class="producto-imagen">
                            <img :src="product.img" :alt="product.name">
                            <span v-if="product.badge" class="producto-badge">{{ product.badge }}</span>
                        </div>
                        <div class="producto-info">
                            <h3 class="producto-nombre">{{ product.name }}</h3>
                            <p class="producto-descripcion">{{ product.desc }}</p>
                            <div class="producto-meta">
                                <span class="producto-precio">{{ product.price }}</span>
                                <span class="producto-stock">✓ Disponible</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: SOBRE NOSOTROS -->
        <div class="tab-content" v-show="currentTab === 'sobre'">
            <div class="container">
                <h2 class="section-title">Sobre Nosotros</h2>

                <div class="sobre-grid">
                    <div class="info-box">
                        <h3>🎯 Nuestra Misión</h3>
                        <p>
                            Proveer carne de res de la más alta calidad a nuestros clientes, garantizando frescura,
                            trazabilidad y excelencia en cada corte. Nos comprometemos a mantener los más altos
                            estándares de calidad desde la granja hasta su mesa, apoyando a productores locales
                            y promoviendo prácticas sostenibles.
                        </p>
                    </div>

                    <div class="info-box">
                        <h3>🔭 Nuestra Visión</h3>
                        <p>
                            Ser el proveedor líder de carne de res premium en Ecuador, reconocidos por nuestra
                            calidad excepcional, innovación en procesos de trazabilidad y compromiso con la
                            satisfacción del cliente. Aspiramos a expandir nuestra red de distribución mientras
                            mantenemos nuestros valores de calidad y servicio.
                        </p>
                    </div>
                </div>

                <div class="info-box" style="margin-bottom: 40px;">
                    <h3>📖 Nuestra Historia</h3>
                    <p style="line-height: 2;">
                        Con más de <strong>25 años de experiencia</strong> en el mercado cárnico ecuatoriano, 7 Pozo
                        comenzó como un pequeño negocio familiar dedicado a la distribución de carne de res de calidad.
                        A lo largo de los años, hemos crecido hasta convertirnos en uno de los principales proveedores
                        de carne premium en el país.
                        <br><br>
                        Nuestra pasión por la excelencia nos ha llevado a implementar sistemas de trazabilidad de
                        última generación, garantizando que cada corte pueda rastrearse desde su origen hasta el
                        consumidor final. Trabajamos directamente con ganaderos locales que comparten nuestros valores
                        de calidad y sostenibilidad.
                    </p>
                </div>

                <div class="info-box">
                    <h3>💎 Nuestros Valores</h3>
                    <ul class="valores-list">
                        <li>
                            <span class="valor-icon">✓</span>
                            <div>
                                <strong>Calidad</strong><br>
                                Seleccionamos únicamente los mejores cortes de carne de res criada en condiciones óptimas.
                            </div>
                        </li>
                        <li>
                            <span class="valor-icon">🔍</span>
                            <div>
                                <strong>Trazabilidad</strong><br>
                                Sistema completo de seguimiento desde la granja hasta el consumidor final.
                            </div>
                        </li>
                        <li>
                            <span class="valor-icon">🌱</span>
                            <div>
                                <strong>Sostenibilidad</strong><br>
                                Prácticas responsables que cuidan el medio ambiente y apoyan a productores locales.
                            </div>
                        </li>
                        <li>
                            <span class="valor-icon">🤝</span>
                            <div>
                                <strong>Confianza</strong><br>
                                Transparencia total en nuestros procesos y compromiso con la satisfacción del cliente.
                            </div>
                        </li>
                        <li>
                            <span class="valor-icon">⚡</span>
                            <div>
                                <strong>Frescura</strong><br>
                                Productos frescos diariamente, manteniendo la cadena de frío en todo momento.
                            </div>
                        </li>
                    </ul>
                </div>

                <h3 style="font-size: 28px; margin: 60px 0 30px; color: #333;">🏆 Certificaciones y Estándares</h3>
                <div class="certificaciones-grid">
                    <div class="certificacion-card">
                        <div class="certificacion-icon">✓</div>
                        <div class="certificacion-nombre">ISO 22000</div>
                    </div>
                    <div class="certificacion-card">
                        <div class="certificacion-icon">🥩</div>
                        <div class="certificacion-nombre">HACCP</div>
                    </div>
                    <div class="certificacion-card">
                        <div class="certificacion-icon">🌿</div>
                        <div class="certificacion-nombre">Orgánico</div>
                    </div>
                    <div class="certificacion-card">
                        <div class="certificacion-icon">🏅</div>
                        <div class="certificacion-nombre">Calidad Premium</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: UBICACIÓN -->
        <div class="tab-content" v-show="currentTab === 'ubicacion'">
            <div class="container">
                <h2 class="section-title">Nuestra Ubicación</h2>

                <div class="ubicacion-container">
                    <div class="mapa-container">
                        <div class="mapa-placeholder">
                            <div>🗺️</div>
                            <p style="font-size: 18px; margin-top: 20px; color: #666;">Mapa interactivo</p>
                            <p style="font-size: 14px; color: #999;">Calle Principal 123, Quito, Ecuador</p>
                        </div>
                    </div>

                    <div class="direccion-info">
                        <div class="direccion-item">
                            <div class="direccion-icon">📍</div>
                            <div class="direccion-text">
                                <h4>Dirección Principal</h4>
                                <p>
                                    Calle Principal 123<br>
                                    Sector Norte, Quito<br>
                                    Pichincha, Ecuador
                                </p>
                            </div>
                        </div>

                        <div class="direccion-item">
                            <div class="direccion-icon">📞</div>
                            <div class="direccion-text">
                                <h4>Teléfonos</h4>
                                <p>
                                    (+593) 2 234 5678<br>
                                    (+593) 980 377 358<br>
                                    WhatsApp disponible
                                </p>
                            </div>
                        </div>

                        <div class="direccion-item">
                            <div class="direccion-icon">🕐</div>
                            <div class="direccion-text">
                                <h4>Horario de Atención</h4>
                                <p>
                                    Lunes a Viernes: 7:00 AM - 7:00 PM<br>
                                    Sábados: 7:00 AM - 5:00 PM<br>
                                    Domingos: 8:00 AM - 2:00 PM
                                </p>
                            </div>
                        </div>

                        <div class="direccion-item">
                            <div class="direccion-icon">✉️</div>
                            <div class="direccion-text">
                                <h4>Correo Electrónico</h4>
                                <p>
                                    info@7pozo.com<br>
                                    ventas@7pozo.com<br>
                                    soporte@7pozo.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: NOTICIAS -->
        <div class="tab-content" v-show="currentTab === 'noticias'">
            <div class="container">
                <h2 class="section-title">Noticias y Novedades</h2>

                <div class="noticias-grid">
                    <div class="noticia-card">
                        <div class="noticia-imagen">📰</div>
                        <div class="noticia-contenido">
                            <div class="noticia-fecha">5 de Marzo, 2026</div>
                            <h3 class="noticia-titulo">Nuevos Cortes Premium Disponibles</h3>
                            <p class="noticia-extracto">
                                Ampliamos nuestra línea de cortes premium con nuevas opciones importadas
                                directamente de las mejores ganaderías del país.
                            </p>
                            <a href="#" class="noticia-leer" @click.prevent>Leer más →</a>
                        </div>
                    </div>
                    <!-- (Aditional news omitted for brevity, simplified logic) -->
                </div>
            </div>
        </div>

        <!-- TAB: CONTACTO -->
        <div class="tab-content" v-show="currentTab === 'contacto'">
            <div class="container">
                <h2 class="section-title">Contáctanos</h2>

                <div class="contacto-grid">
                    <div class="contacto-form">
                        <h3 style="margin-bottom: 25px; color: #333;">Envíanos un Mensaje</h3>
                        
                        <form @submit.prevent="enviarContacto">
                            <div class="form-group">
                                <label class="form-label">Nombre Completo</label>
                                <input type="text" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Correo Electrónico</label>
                                <input type="email" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Teléfono</label>
                                <input type="tel" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Asunto</label>
                                <input type="text" class="form-input" required>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Mensaje</label>
                                <textarea class="form-input" required></textarea>
                            </div>

                            <button type="submit" class="btn-enviar">Enviar Mensaje</button>
                        </form>
                    </div>

                    <div class="contacto-info">
                        <h3 style="margin-bottom: 25px; color: #333;">Información de Contacto</h3>

                        <div class="contacto-metodo">
                            <h4>📞 Llámanos</h4>
                            <p>
                                (+593) 2 234 5678<br>
                                (+593) 980 377 358<br>
                                Lun-Vie: 7:00 AM - 7:00 PM
                            </p>
                        </div>

                        <div class="contacto-metodo">
                            <h4>💬 WhatsApp</h4>
                            <p>
                                (+593) 980 377 358<br>
                                Atención inmediata<br>
                                Disponible 24/7
                            </p>
                        </div>

                        <div class="contacto-metodo">
                            <h4>✉️ Email</h4>
                            <p>
                                info@7pozo.com<br>
                                ventas@7pozo.com<br>
                                Respuesta en 24 horas
                            </p>
                        </div>

                        <div class="contacto-metodo">
                            <h4>🌐 Redes Sociales</h4>
                            <div class="social-links">
                                <a href="#" @click.prevent class="social-btn">📘</a>
                                <a href="#" @click.prevent class="social-btn">📸</a>
                                <a href="#" @click.prevent class="social-btn">🐦</a>
                                <a href="#" @click.prevent class="social-btn">💬</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import lomoImg from '@/assets/img/ofertas/lomo.png'
import '../assets/css/perfil_proveedor.css'

const currentTab = ref('productos')
const currentFilter = ref('Todos')
const tabsContainer = ref(null)

const cambiarTab = (tab) => {
    currentTab.value = tab
    if (tabsContainer.value) {
        window.scrollTo({
            top: tabsContainer.value.offsetTop - 80, // Offset for header
            behavior: 'smooth'
        })
    }
}

const enviarContacto = (e) => {
    alert('✅ Mensaje enviado. Nos pondremos en contacto pronto.')
    e.target.reset()
}

// Reactivity for products
const allProducts = [
    { id: 1, name: 'Lomo de Res Premium', desc: 'Corte premium, fresco del día. Criado en campo abierto.', price: '$18.00', badge: 'Premium', img: lomoImg, category: 'Premium' },
    { id: 2, name: 'Costilla de Res', desc: 'Perfecta para parrilla. Trazabilidad garantizada.', price: '$15.50', badge: 'Especial', img: lomoImg, category: 'Cortes Especiales' },
    { id: 3, name: 'Mix Parrillero Especial', desc: 'Combinación perfecta de cortes premium para parrilla.', price: '$45.00', badge: 'Mix', img: lomoImg, category: 'Mix Parrillero' },
    { id: 4, name: 'Chuleta de Res', desc: 'Jugosa y tierna, ideal para todo tipo de preparaciones.', price: '$12.50', badge: null, img: lomoImg, category: 'Todos' },
    { id: 5, name: 'Carne Molida Extra', desc: 'Carne molida de primera calidad, baja en grasa.', price: '$8.00', badge: 'Oferta', img: lomoImg, category: 'Ofertas' },
    { id: 6, name: 'Asado de Tira', desc: 'Corte tradicional argentino, jugoso y sabroso.', price: '$20.00', badge: 'Premium', img: lomoImg, category: 'Premium' },
]

const filteredProducts = computed(() => {
    if (currentFilter.value === 'Todos') return allProducts
    return allProducts.filter(p => p.category === currentFilter.value || (p.badge && currentFilter.value.includes(p.badge)))
})
</script>

<style scoped>
/* Scoped styles overrides here */
</style>
