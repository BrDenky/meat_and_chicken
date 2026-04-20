<template>
  <div class="perfil-proveedor-view">
    <!-- HERO DEL PROVEEDOR -->
    <section class="proveedor-hero">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <div class="hero-info-wrapper">
          <div class="provider-avatar-circle">
            <img :src="proveedorInfo.logo || defaultProviderImg" alt="Logo Proveedor">
            <span class="badge-verificado"><i class="fa-solid fa-circle-check"></i></span>
          </div>
          <div class="hero-text">
            <span class="section-tag">Proveedor Destacado</span>
            <h1 class="proveedor-nombre">{{ proveedorInfo.nombre }}</h1>
            <p class="proveedor-tagline">🥩 Carne de Res Premium con tradición y calidad garantizada.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS BAR QUICK VIEW -->
    <div class="stats-bar-wrapper">
      <div class="container">
        <div class="stats-bar">
          <div class="stat-card">
            <span class="stat-value">150+</span>
            <span class="stat-label">Productos</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-card">
            <span class="stat-value">4.9</span>
            <span class="stat-label">Valoración</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-card">
            <span class="stat-value">25+</span>
            <span class="stat-label">Años Exp.</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-card">
            <span class="stat-value">24/7</span>
            <span class="stat-label">Atención</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TABS DE NAVEGACIÓN -->
    <nav class="proveedor-nav-tabs" ref="tabsContainer">
      <div class="container">
        <div class="tabs-list">
          <button class="nav-tab-btn" :class="{ active: currentTab === 'productos' }" @click="cambiarTab('productos')">
            <i class="fa-solid fa-box-open"></i> Productos
          </button>
          <button class="nav-tab-btn" :class="{ active: currentTab === 'sobre' }" @click="cambiarTab('sobre')">
            <i class="fa-solid fa-address-card"></i> Nuestra Historia
          </button>
          <button class="nav-tab-btn" :class="{ active: currentTab === 'ubicacion' }" @click="cambiarTab('ubicacion')">
            <i class="fa-solid fa-map-location-dot"></i> Ubicación
          </button>
          <button class="nav-tab-btn" :class="{ active: currentTab === 'noticias' }" @click="cambiarTab('noticias')">
            <i class="fa-solid fa-newspaper"></i> Novedades
          </button>
          <button class="nav-tab-btn" :class="{ active: currentTab === 'contacto' }" @click="cambiarTab('contacto')">
            <i class="fa-solid fa-envelope"></i> Contacto
          </button>
        </div>
      </div>
    </nav>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="profile-main-content">
      
      <!-- TAB: PRODUCTOS -->
      <transition name="fade" mode="out-in">
        <div class="tab-pane" v-if="currentTab === 'productos'" key="productos">
          <div class="container">
            <div class="section-header-centered">
              <span class="section-tag">Catálogo</span>
              <h2>Nuestros Mejores Cortes</h2>
            </div>

            <div class="productos-filtros">
              <button class="filtro-chip" :class="{ active: currentFilter === 'Todos' }" @click="currentFilter = 'Todos'">Todos</button>
              <button class="filtro-chip" :class="{ active: currentFilter === 'Premium' }" @click="currentFilter = 'Premium'">Premium</button>
              <button class="filtro-chip" :class="{ active: currentFilter === 'Cortes Especiales' }" @click="currentFilter = 'Cortes Especiales'">Especiales</button>
              <button class="filtro-chip" :class="{ active: currentFilter === 'Mix Parrillero' }" @click="currentFilter = 'Mix Parrillero'">Parrilleros</button>
              <button class="filtro-chip" :class="{ active: currentFilter === 'Ofertas' }" @click="currentFilter = 'Ofertas'">Ofertas</button>
            </div>

            <div class="productos-grid">
              <div class="producto-card-modern" v-for="product in filteredProducts" :key="product.id">
                <div class="card-img-wrapper">
                  <img :src="product.img" :alt="product.name">
                  <span v-if="product.badge" class="modern-badge">{{ product.badge }}</span>
                </div>
                <div class="card-body">
                  <h3 class="p-name">{{ product.name }}</h3>
                  <p class="p-desc">{{ product.desc }}</p>
                  <div class="p-footer">
                    <span class="p-price">{{ product.price }}</span>
                    <button class="add-to-cart-simple" title="Añadir al carrito">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB: SOBRE NOSOTROS -->
        <div class="tab-pane" v-else-if="currentTab === 'sobre'" key="sobre">
          <!-- HISTORIA -->
          <section class="container history-section">
            <div class="history-grid">
              <div class="history-content">
                <span class="section-tag">Desde 2001</span>
                <h2>Más de 25 años de tradición cárnica</h2>
                <p>
                  {{ proveedorInfo.nombre }} comenzó como un sueño familiar en las faldas de la cordillera, buscando llevar la mejor selección de carne a las mesas ecuatorianas. Con el tiempo, nos hemos convertido en un referente de <strong>trazabilidad y calidad</strong>.
                </p>
                <p>
                  Nuestra pasión por el campo se refleja en cada uno de nuestros procesos. Trabajamos con ganadería responsable, asegurando que cada animal sea criado en las mejores condiciones para garantizar un producto final excepcional.
                </p>
              </div>
              <div class="history-visual">
                <div class="visual-deco-card">
                  <i class="fa-solid fa-award"></i>
                  <span>Líderes en Calidad Premium</span>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- TAB: UBICACIÓN -->
        <div class="tab-pane" v-else-if="currentTab === 'ubicacion'" key="ubicacion">
          <div class="container">
            <div class="location-layout">
              <div class="location-map">
                <div class="map-frame">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31918.069115712165!2d-78.4891124!3d-0.170624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a72dcf97ec1%3A0x130ef1492ba68735!2sSector%20Norte%2C%20Quito!5e0!3m2!1ses!2sec!4v1712615419022!5m2!1ses!2sec" 
                    width="100%" 
                    height="500" 
                    style="border:0; border-radius: 30px;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                  </iframe>
                </div>
              </div>
              <div class="location-details">
                <span class="section-tag">Encuéntranos</span>
                <h2>Nuestras Instalaciones</h2>
                <div class="contact-methods-list">
                  <div class="method-item">
                    <div class="m-icon"><i class="fa-solid fa-location-dot"></i></div>
                    <div class="m-info">
                      <h4>Matriz Principal</h4>
                      <p>Calle Principal 123, Sector Norte, Quito - Ecuador</p>
                    </div>
                  </div>
                  <div class="method-item">
                    <div class="m-icon"><i class="fa-solid fa-clock"></i></div>
                    <div class="m-info">
                      <h4>Horarios</h4>
                      <p>Lun - Sáb: 07:00 AM - 07:00 PM<br>Dom: 08:00 AM - 02:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB: NOTICIAS -->
        <div class="tab-pane" v-else-if="currentTab === 'noticias'" key="noticias">
          <div class="container">
            <div class="section-header-centered">
              <span class="section-tag">Blog</span>
              <h2>Novedades y Recetas</h2>
            </div>
            <div class="news-modern-grid">
              <div class="news-card-minimal">
                <div class="news-img-box">📰</div>
                <div class="news-body">
                  <span class="news-date">05 Mar 2026</span>
                  <h3>Nuevos Cortes de Exportación</h3>
                  <p>Descubre nuestra nueva línea de cortes madurados con procesos europeos...</p>
                  <a href="#" class="read-more-link">Leer más <i class="fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB: CONTACTO -->
        <div class="tab-pane" v-else-if="currentTab === 'contacto'" key="contacto">
          <div class="container">
            <div class="contact-modern-grid">
              <div class="form-wrapper">
                <h3>Envíanos un mensaje</h3>
                <form @submit.prevent="enviarContacto" class="modern-form">
                  <div class="form-row">
                    <input type="text" placeholder="Nombre" required>
                    <input type="email" placeholder="Email" required>
                  </div>
                  <input type="text" placeholder="Asunto" required>
                  <textarea placeholder="¿En qué podemos ayudarte?" required></textarea>
                  <button type="submit" class="btn-primary-gradient">Enviar Mensaje</button>
                </form>
              </div>
              <div class="info-sidebar">
                <div class="sidebar-box">
                  <h4>Canales Directos</h4>
                  <div class="direct-link">
                    <i class="fa-brands fa-whatsapp"></i>
                    <span>+593 980 377 358</span>
                  </div>
                  <div class="direct-link">
                    <i class="fa-solid fa-phone"></i>
                    <span>(02) 234 5678</span>
                  </div>
                  <div class="direct-link">
                    <i class="fa-solid fa-envelope"></i>
                    <span>{{ proveedorInfo.correo || 'ventas@ejemplo.com' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../supabase'
import lomoImg from '@/assets/img/ofertas/lomo.png'
import defaultProviderImg from '@/assets/img/proveedores/provedor_1.png'
import '../assets/css/perfil_proveedor.css'

const route = useRoute()

const proveedorInfo = ref({
    nombre: 'Cargando...',
    correo: '',
    logo: null
})

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

const realProducts = ref([
    { id: 1, name: 'Lomo de Res Premium', desc: 'Corte premium, fresco del día. Criado en campo abierto.', price: '$18.00', badge: 'Premium', img: lomoImg, category: 'Premium' },
    { id: 2, name: 'Costilla de Res', desc: 'Perfecta para parrilla. Trazabilidad garantizada.', price: '$15.50', badge: 'Especial', img: lomoImg, category: 'Cortes Especiales' },
    { id: 3, name: 'Mix Parrillero Especial', desc: 'Combinación perfecta de cortes premium para parrilla.', price: '$45.00', badge: 'Mix', img: lomoImg, category: 'Mix Parrillero' },
    { id: 4, name: 'Chuleta de Res', desc: 'Jugosa y tierna, ideal para todo tipo de preparaciones.', price: '$12.50', badge: null, img: lomoImg, category: 'Todos' }
])

const filteredProducts = computed(() => {
    if (currentFilter.value === 'Todos') return realProducts.value
    return realProducts.value.filter(p => p.category === currentFilter.value || (p.badge && currentFilter.value.includes(p.badge)))
})

const cargarDatosProveedor = async () => {
    const pId = route.params.id
    if (!pId) return;

    try {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', pId).single()
        if (profile) {
            proveedorInfo.value.nombre = profile.first_name || profile.email.split('@')[0]
            proveedorInfo.value.correo = profile.email
        }
        
        // Cargar logo
        const { data: infoData } = await supabase.from('proveedor_info').select('logo_url').eq('proveedor_id', pId).single()
        if (infoData && infoData.logo_url) {
            proveedorInfo.value.logo = infoData.logo_url
        }

        // Cargar productos
        const { data: prodData } = await supabase.from('productos').select('*').eq('proveedor_id', pId)
        if (prodData && prodData.length > 0) {
            realProducts.value = prodData.map(p => ({
                id: p.id,
                name: p.nombre,
                desc: p.descripcion || `Corte fresco. Categoria: ${p.categoria || 'Normal'}`,
                price: '$' + p.precio.toFixed(2),
                badge: p.estado === 'disponible' ? 'Stock' : 'Agotado',
                img: p.imagen_url || lomoImg,
                category: p.categoria || 'Todos'
            }))
        } else {
            realProducts.value = [] // Mostramos que no hay productos suyos
        }
    } catch (e) {
        console.error('Error cargando proveedor', e)
    }
}

onMounted(() => {
    cargarDatosProveedor()
})
</script>

<style scoped>
/* Scoped styles overrides here */
</style>
