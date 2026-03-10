<template>
  <div class="producto-view">
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
                        
                        <div class="image-thumbnails">
                            <div v-for="(img, index) in images" :key="index" 
                                 class="thumbnail" 
                                 :class="{ active: currentImageIndex === index }" 
                                 @click="changeImage(index)">
                                <img :src="img" alt="Thumbnail">
                            </div>
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
                            <span class="price-save">Ahorra $7.40</span>
                        </div>
                        
                        <div class="product-description">
                            <p>
                                Llevamos del campo a tu mesa la mejor selección de carne fresca.
                                Sin aditivos ni conservantes, nuestro producto destaca por su color vibrante
                                y su textura firme, reflejo de una crianza responsable y procesos artesanales.
                                Calidad honesta para alimentar a tu familia con lo mejor.
                            </p>
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
                        
                        <div class="quantity-selector">
                            <label>Cantidad:</label>
                            <div class="quantity-controls">
                                <div class="quantity-input">
                                    <button @click="decreaseQuantity">-</button>
                                    <input type="number" v-model.number="quantity" min="1" max="99" readonly>
                                    <button @click="increaseQuantity">+</button>
                                </div>
                                <span class="stock-info">✓ 247 disponibles en stock</span>
                            </div>
                        </div>
                        
                        <div class="product-actions">
                            <button class="btn btn-primary" @click="addToCart">
                                <span class="btn-icon">🛒</span>
                                Añadir al carrito
                            </button>
                            <button class="btn btn-secondary" @click="addToWishlist">
                                <span class="btn-icon">❤️</span>
                            </button>
                            <button class="btn btn-secondary" @click="shareProduct">
                                <span class="btn-icon">📤</span>
                            </button>
                        </div>
                    </div>
                </div>

            <div class="product-tabs">
                <div class="tab-buttons">
                    <button class="tab-button" :class="{ active: currentTab === 0 }" @click="switchTab(0)">Descripción</button>
                    <button class="tab-button" :class="{ active: currentTab === 1 }" @click="switchTab(1)">Ficha Técnica</button>
                    <button class="tab-button" :class="{ active: currentTab === 2 }" @click="switchTab(2)">Valoraciones</button>
                </div>

                <div class="tab-content" v-show="currentTab === 0">
                    <h3 style="margin-bottom: 15px;">Detalles del Corte</h3>
                    <p style="line-height: 1.8; color: #666; margin-bottom: 15px;">
                        Nuestro corte Premium es seleccionado de ganado joven criado en pastizales
                        naturales, garantizando una textura tierna y un marmoleo excepcional.
                        Cada pieza es procesada bajo estrictos estándares de higiene para asegurar
                        que llegue a tu mesa con toda su jugosidad y sabor original.
                    </p>
                    <p style="line-height: 1.8; color: #666; margin-bottom: 15px;">
                        Compromiso de calidad:
                    </p>
                    <ul style="line-height: 2; color: #666; margin-left: 20px;">
                        <li>100% Carne de pastoreo natural</li>
                        <li>Sin hormonas ni promotores de crecimiento</li>
                        <li>Corte artesanal realizado por maestros carniceros</li>
                        <li>Empaque al vacío para mantener la frescura</li>
                        <li>Cadena de frío monitoreada constantemente</li>
                    </ul>
                </div>

                <div class="tab-content" v-show="currentTab === 1">
                    <h3 style="margin-bottom: 20px;">Especificaciones Técnicas</h3>
                    <table class="specifications-table">
                        <tr><td>Origen</td><td>Haciendas Locales (Ecuador)</td></tr>
                        <tr><td>Tipo de Ganado</td><td>Angus / Brangus seleccionado</td></tr>
                        <tr><td>Maduración</td><td>14 - 21 días (Wet Aged)</td></tr>
                        <tr><td>Presentación</td><td>Corte individual empacado al vacío</td></tr>
                        <tr><td>Peso Aprox.</td><td>500g - 800g por unidad</td></tr>
                        <tr><td>Vida Útil</td><td>30 días en refrigeración / 6 meses congelado</td></tr>
                        <tr><td>Temperatura de Almacenamiento</td><td>0°C a 4°C</td></tr>
                        <tr><td>Alimentación</td><td>Pastura natural y granos seleccionados</td></tr>
                        <tr><td>Certificaciones</td><td>AGROCALIDAD, BPM (Buenas Prácticas de Manufactura)</td></tr>
                    </table>
                </div>

                <div class="tab-content" v-show="currentTab === 2">
                    <h3 style="margin-bottom: 20px;">Opiniones de Parrilleros</h3>
                    <!-- Dummy reviews extracted from original code -->
                    <div style="background: #f8f8f8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <div>
                                <strong style="font-size: 18px;">Ricardo Peña</strong>
                                <div class="stars" style="color: #ffc107; font-size: 14px;">★★★★★</div>
                            </div>
                            <span style="color: #999; font-size: 14px;">Hace 2 días</span>
                        </div>
                        <p style="color: #666; line-height: 1.6;">
                            La suavidad de la carne es de otro nivel. El marmoleo estaba perfecto y
                            el empaque llegó muy frío, se nota el cuidado en el transporte.
                        </p>
                    </div>

                    <!-- Omitting the rest of reviews for brevity, maintaining structure -->
                </div>
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

const activeImage = computed(() => images[currentImageIndex.value])

const changeImage = (index) => {
    currentImageIndex.value = index
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
