<template>
  <div class="producto-view">
    <!--------------------------Revisar si dejar el breadcrumb o no--------------------------------->
    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <div class="container">
            <ul>
                <li><router-link to="/">Inicio</router-link></li>
                <li>&rarr;</li>
                <li><router-link to="/resultados">Productos</router-link></li>
                <li>&rarr;</li>
                <li><span>Producto Premium 1</span></li>
            </ul>
        </div>
    </div>

    <main>
        <div class="container">
            <div class="product-detail">
                <div class="product-main">
                    <!-- Galería de imágenes -->
                    <div class="product-images">
                        <div class="main-image">
                            <div class="product-badges">
                                <span class="badge new">Nuevo</span>
                                <span class="badge featured">Destacado</span>
                            </div>
                            <!-- Using v-bind for dynamic active image -->
                            <img :src="activeImage" alt="Imagen principal">
                        </div>
                        
                        <div class="thumbnails-container-wrapper">
                            <button class="thumb-nav-btn prev" @click="moverMiniaturas(-1)" type="button">
                                <i class="fa-solid fa-chevron-left"></i>
                            </button>

                            <div class="image-thumbnails" ref="miniaturasRef">
                                <div v-for="(img, index) in images" :key="index" 
                                     class="thumbnail" 
                                     :class="{ active: currentImageIndex === index }" 
                                     @click="changeImage(index)">
                                    <img :src="img" alt="Thumbnail">
                                </div>
                            </div>

                            <button class="thumb-nav-btn next" @click="moverMiniaturas(1)" type="button">
                                <i class="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Información del producto -->
                    <div class="product-info">
                        <h1>Producto Premium 1</h1>
                        
                        <div class="product-rating">
                            <div class="stars">★★★★★</div>
                            <span class="rating-count">(156 valoraciones)</span>
                        </div>
                        
                        <div class="product-price">
                            <span class="price-current">$18.10</span>
                            <span class="price-original">$25.50</span>
                            <!-- <span class="price-save">Ahorra $7.40</span> -->
                        </div>
                        
                        <div class="product-description">
                            <p>
                                Llevamos del campo a tu mesa la mejor selección de carne fresca.
                                Sin aditivos ni conservantes, nuestro producto destaca por su color vibrante
                                y su textura firme, reflejo de una crianza responsable y procesos artesanales.
                                Calidad honesta para alimentar a tu familia con lo mejor.
                            </p>
                        </div>
                        
                        <div class="quantity-selector">
                            <label>Cantidad:</label>
                            <div class="quantity-controls">
                                <div class="quantity-input">
                                    <button @click="decreaseQuantity">-</button>
                                    <input type="number" v-model.number="quantity" min="1" max="99" readonly>
                                    <button @click="increaseQuantity">+</button>
                                </div>
                                <span class="stock-info">✓ 247 disponibles en inventario</span>
                                <div class="product-actions">
                                    <button class="btn btn-primary" @click="addToCart">
                                        <span class="btn-icon">🛒</span>
                                        Añadir al carrito
                                    </button>
                                    <button class="btn btn-secondary" @click="addToWishlist">
                                        <i class="fa-solid fa-heart fav-icon-style"></i>
                                    </button>
                                    <!-- <button class="btn btn-secondary" @click="shareProduct">
                                        <span class="btn-icon">📤</span>
                                    </button> -->
                                </div>
                            </div>
                        </div>
                        


                        <div class="product-features">
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span class="feature-text">Cadena de frío garantizada</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span class="feature-text">Corte artesanal fresco</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span class="feature-text">Origen 100% trazable</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span class="feature-text">Certificación Sanitaria</span>
                            </div>
                        </div>
                    </div>
                </div>
            <!---------- TABS DE INFORMACIÓN DEL PRODUCTO ---------->
            <div class="product-tabs">
                <div class="tab-buttons">
                    <button 
                        v-for="(tab, index) in productoTabs" 
                        :key="index"
                        class="tab-button" 
                        :class="{ active: currentTab === index }" 
                        @click="switchTab(index)"
                    >
                        {{ tab.titulo }}
                    </button>
                </div>

                <template v-for="(tab, index) in productoTabs" :key="'tab-data-' + index">
                    <div 
                        v-if="currentTab === index"
                        class="tab-panel" 
                        style="animation: fadeIn 0.3s;"
                        v-html="tab.contenido"
                    ></div>
                </template>
            </div>

            <!-- Productos Relacionados -->
            <div class="related-products">
                <h2>Productos Relacionados</h2>
                <div class="related-grid">
                    <div class="related-product">
                        <div class="related-product-image">
                            <img src="@/assets/img/corte_1.png" alt="Producto Cárnico" class="related-img">
                        </div>
                        <div class="related-product-info">
                            <div class="related-product-title">Producto Premium 2</div>
                            <div class="related-product-price">$4.50</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </main>
    
    <!-- Notification system logic ported to Vue -->
    <transition name="slide-in">
        <div v-if="notificationMessage" class="notification-vue">
            {{ notificationMessage }}
        </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

// Import relevant styles previously injected globally
import '../assets/css/shapes.css'

import img1 from '@/assets/img/carne_1.png'
import img2 from '@/assets/img/carne_2.jpg'
import img3 from '@/assets/img/carne_3.jpg'
import img4 from '@/assets/img/carne_4.jpg'
import img5 from '@/assets/img/carne_5.jpg'

const images = [img1, img2, img3, img4, img5]
const currentImageIndex = ref(0)
const quantity = ref(1)
const currentTab = ref(0)
const notificationMessage = ref('')

// Objeto de información de las pestañas del producto
const productoTabs = ref([
    {
        titulo: 'Descripción',
        contenido: `
            <div class="tab-details">
                <h3>Detalles del Corte</h3>
                <p>
                    Nuestro corte Premium es seleccionado de ganado joven criado en pastizales
                    naturales, garantizando una textura tierna y un marmoleo excepcional.
                    Cada pieza es procesada bajo estrictos estándares de higiene para asegurar
                    que llegue a tu mesa con toda su jugosidad y sabor original.
                </p>
                <p>Compromiso de calidad:</p>
                <ul class="quality-list">
                    <li>100% Carne de pastoreo natural</li>
                    <li>Sin hormonas ni promotores de crecimiento</li>
                    <li>Corte artesanal realizado por maestros carniceros</li>
                    <li>Empaque al vacío para mantener la frescura</li>
                    <li>Cadena de frío monitoreada constantemente</li>
                </ul>
            </div>
        `
    },
    {
        titulo: 'Ficha Técnica',
        contenido: `
            <div class="tab-details">
                <h3>Especificaciones Técnicas</h3>
                <table class="specifications-table">
                    <tr><th>Origen</th><td>Haciendas Locales (Ecuador)</td></tr>
                    <tr><th>Tipo de Ganado</th><td>Angus / Brangus seleccionado</td></tr>
                    <tr><th>Maduración</th><td>14 - 21 días (Wet Aged)</td></tr>
                    <tr><th>Presentación</th><td>Corte individual empacado al vacío</td></tr>
                    <tr><th>Peso Aprox.</th><td>500g - 800g por unidad</td></tr>
                    <tr><th>Vida Útil</th><td>30 días en refrigeración / 6 meses congelado</td></tr>
                    <tr><th>Temp. de Almacenamiento</th><td>0°C a 4°C</td></tr>
                    <tr><th>Alimentación</th><td>Pastura natural y granos seleccionados</td></tr>
                    <tr><th>Certificaciones</th><td>AGROCALIDAD, BPM</td></tr>
                </table>
            </div>
        `
    },
    {
        titulo: 'Valoraciones',
        contenido: `
            <div class="tab-details">
                <h3>Opiniones de Parrilleros</h3>
                <div class="tab-review">
                    <div class="review-header">
                        <div>
                            <strong>Ricardo Peña</strong>
                            <div class="stars">★★★★★</div>
                        </div>
                        <span class="review-date">Hace 2 días</span>
                    </div>
                    <p class="review-text">
                        La suavidad de la carne es de otro nivel. El marmoleo estaba perfecto y
                        el empaque llegó muy frío, se nota el cuidado en el transporte.
                    </p>
                </div>
            </div>
        `
    }
])

const activeImage = computed(() => images[currentImageIndex.value])

const miniaturasRef = ref(null)

const changeImage = (index) => {
    currentImageIndex.value = index
}

const moverMiniaturas = (dir) => {
    if (miniaturasRef.value) {
        const thumb = miniaturasRef.value.querySelector('.thumbnail');
        const scrollAmount = thumb ? thumb.offsetWidth + 10 : 100;
        miniaturasRef.value.scrollBy({ 
            left: dir * scrollAmount, 
            behavior: 'smooth' 
        });
    }
}

const increaseQuantity = () => {
    if (quantity.value < 99) {
        quantity.value++
    }
}

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

const switchTab = (index) => {
    currentTab.value = index
}

const showNotification = (message) => {
    notificationMessage.value = message
    setTimeout(() => {
        notificationMessage.value = ''
    }, 3000)
}

const addToCart = () => {
    // Para simplificar en esta vista estática, creamos el objeto producto
    const itemToAdd = {
        id: 'producto-premium-1',
        name: 'Producto Premium 1',
        price: 18.10,
        image: 'carne_1.png',
        weight: '800g',
        cut: 'Corte Especial',
        sku: 'CAR-PR-001'
    }
    
    // Si la cantidad es > 1, lo añadimos directamente pasando la cantidad
    cartStore.addItem(itemToAdd, quantity.value)
    
    showNotification(`✓ ${quantity.value} unidad(es) añadida(s) al carrito`)
}

const addToWishlist = () => {
    showNotification('❤️ Guardado en tus favoritos')
}

const shareProduct = () => {
    showNotification('📤 Enlace del producto copiado')
}
</script>

<style scoped>
.notification-vue {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
}
.slide-in-enter-active, .slide-in-leave-active {
    transition: all 0.3s ease;
}
.slide-in-enter-from, .slide-in-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
