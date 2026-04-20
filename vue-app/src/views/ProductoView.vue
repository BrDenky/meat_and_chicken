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
                <li><span>{{ producto?.nombre || 'Cargando...' }}</span></li>
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
                    </div>

                    <!-- Información del producto -->
                    <div class="product-info">
                        <h1>{{ producto?.nombre || 'Cargando producto...' }}</h1>
                        
                        <div class="product-rating">
                            <div class="stars">★★★★★</div>
                            <span class="rating-count">(156 valoraciones)</span>
                        </div>
                        
                        <div class="product-price">
                            <span class="price-current">${{ producto?.precio_oferta ? producto.precio_oferta.toFixed(2) : (producto?.precio ? producto.precio.toFixed(2) : '0.00') }}</span>
                            <span class="price-original" v-if="producto?.precio_oferta">${{ producto?.precio ? producto.precio.toFixed(2) : '0.00' }}</span>
                        </div>
                        
                        <div class="product-description">
                            <p>
                                {{ producto?.descripcion || 'Sin descripción disponible para este producto.' }}
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
                                <span class="stock-info">✓ {{ producto?.stock || 0 }} disponibles en inventario</span>
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
            <div class="related-products" v-if="productosRelacionados.length > 0">
                <h2>Productos Relacionados</h2>
                <div class="related-grid">
                    <div class="related-product" v-for="rel in productosRelacionados" :key="rel.id" @click="$router.push('/producto/' + rel.id)" style="cursor: pointer;">
                        <div class="related-product-image">
                            <img :src="rel.imagen_url || img1" :alt="rel.nombre" class="related-img">
                        </div>
                        <div class="related-product-info">
                            <div class="related-product-title">{{ rel.nombre }}</div>
                            <div class="related-product-price">${{ (rel.precio_oferta || rel.precio).toFixed(2) }}</div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { supabase } from '../supabase'

const route = useRoute()
const cartStore = useCartStore()

// Estado del producto
const producto = ref(null)
const loading = ref(true)

// Import relevant styles previously injected globally
import '../assets/css/shapes.css'

import img1 from '@/assets/img/carne_1.png'

const images = ref([])
const productosRelacionados = ref([])
const currentImageIndex = ref(0)
const quantity = ref(1)
const currentTab = ref(0)
const notificationMessage = ref('')

// Objeto de información de las pestañas del producto, ahora reactivo al producto cargado
const productoTabs = computed(() => {
    const p = producto.value || {}
    return [
        {
            titulo: 'Ficha Técnica',
            contenido: `
                <div class="tab-details">
                    <h3>Especificaciones Técnicas</h3>
                    <table class="specifications-table">
                        <tr><th>Origen</th><td>${p.origen || 'Haciendas Locales (Ecuador)'}</td></tr>
                        <tr><th>Tipo de Ganado</th><td>${p.tipo_ganado || 'Angus / Brangus seleccionado'}</td></tr>
                        <tr><th>Maduración</th><td>${p.maduracion || '14 - 21 días (Wet Aged)'}</td></tr>
                        <tr><th>Presentación</th><td>${p.presentacion || 'Corte individual empacado al vacío'}</td></tr>
                        <tr><th>Peso Aprox.</th><td>${p.peso ? p.peso + 'kg' : '500g - 800g por unidad'}</td></tr>
                        <tr><th>Vida Útil</th><td>${p.vida_util || '30 días en refrigeración / 6 meses congelado'}</td></tr>
                        <tr><th>Temp. de Almacenamiento</th><td>${p.temp_almacenamiento || '0°C a 4°C'}</td></tr>
                        <tr><th>Alimentación</th><td>${p.alimentacion || 'Pastura natural y granos seleccionados'}</td></tr>
                        <tr><th>Certificaciones</th><td>${p.certificacion || 'AGROCALIDAD, BPM'}</td></tr>
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
    ]
})

const activeImage = computed(() => images.value[currentImageIndex.value])

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
    if (!producto.value) return;

    const itemToAdd = {
        id: producto.value.id,
        name: producto.value.nombre,
        price: producto.value.precio,
        image: producto.value.imagen_url || 'carne_1.png',
        weight: producto.value.peso || '1kg',
        cut: producto.value.categoria || 'Corte Especial',
        sku: 'CAR-PR-' + producto.value.id,
        proveedor_id: producto.value.proveedor_id
    }
    
    // Si la cantidad es > 1, lo añadimos directamente pasando la cantidad
    cartStore.addItem(itemToAdd, quantity.value)
    
    showNotification(`✓ ${quantity.value} unidad(es) añadida(s) al carrito`)
}

onMounted(async () => {
    const id = route.params.id
    if (!id) return
    
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', id)
            .single()
            
        if (error) throw error
        
        producto.value = data
        
        images.value = data.imagen_url ? [data.imagen_url] : [img1]
        currentImageIndex.value = 0

        if (data.categoria) {
            let { data: rels } = await supabase
                .from('productos')
                .select('id, nombre, precio, precio_oferta, imagen_url')
                .eq('categoria', data.categoria)
                .neq('id', data.id)
                .limit(4)
                
            if (!rels || rels.length === 0) {
                const { data: fallbackRels } = await supabase
                    .from('productos')
                    .select('id, nombre, precio, precio_oferta, imagen_url')
                    .neq('id', data.id)
                    .limit(4)
                rels = fallbackRels
            }
            productosRelacionados.value = rels || []
        } else {
             const { data: fallbackRels } = await supabase
                    .from('productos')
                    .select('id, nombre, precio, precio_oferta, imagen_url')
                    .neq('id', data.id)
                    .limit(4)
             productosRelacionados.value = fallbackRels || []
        }
    } catch (err) {
        console.error('Error fetching product:', err)
    } finally {
        loading.value = false
    }
})

const addToWishlist = () => {
    showNotification('❤️ Guardado en tus favoritos')
}

const shareProduct = () => {
    showNotification('📤 Enlace del producto copiado')
}
</script>

<style scoped>
.breadcrumb {
    padding-top: 20px;
    padding-bottom: 10px;
}
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
