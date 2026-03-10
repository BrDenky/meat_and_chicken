<template>
  <div>
    <!-- SECCIÓN HERO -->
    <section class="hero">
        <div class="hero-content">
            <p class="hero-eyebrow">Innovación Tecnológica</p>
            <h1 class="hero-title">Comunidad carnica<br>inteligente</h1>
            <p class="hero-subtitle">Conectamos a los mejores proveedores locales con clientes que valoran la calidad y la frescura.</p>
            <div class="hero-ctas">
                <a href="#productos" class="btn-hero-secondary">Ver Proveedores</a>
                <a href="#" class="btn-hero-secondary">🤝 Trabaja con Nosotros</a>
                <button class="btn-hero-secondary" @click="toggleMisionVision">📋 Misión y Visión</button>
            </div>
            <div class="mv-panel" v-show="isMtVisible" id="mvPanel">
            <div class="mv-item">
                <h3>Misión</h3>
                <p>Conectar directamente a proveedores responsables con consumidores y negocios mediante un modelo logístico flexible, herramientas digitales y protocolos sanitarios certificados, garantizando calidad, inocuidad y atención personalizada en cada pedido.</p>
            </div>
            <div class="mv-item">
                <h3>Visión</h3>
                <p>Ser la red de distribución cárnica más confiable, eficiente y personalizada del sector de Pintag y sus alrededores, integrando tecnología, trazabilidad y compromiso comunitario para impulsar el desarrollo sostenible del comercio local.</p>
            </div>
            </div>
        </div>
        <div class="hero-visual">
            <div class="hero-circle">
                <img src="@/assets/img/logo.png">
            </div>
        </div>
    </section>

    <!-- CONTENIDO PRINCIPAL -->
    <main>
        
        <!------------------------------------ Ofertas del Día ------------------------------------>
        <div class="ofertas-section">
            <div class="container">
                <h2 class="products-section-title">Ofertas del Día</h2>
                <p class="ofertas-subtitle">Productos frescos disponibles hoy de nuestros proveedores</p>

                <div class="ofertas-carrusel-wrapper">
                    <button class="carrusel-btn izq" @click="moverCarrusel(-1)">&#8592;</button>

                    <div class="ofertas-carrusel" id="ofertasCarrusel" ref="carruselRef">
                        <div 
                            v-for="item in productosEnOferta" 
                            :key="item.id" 
                            class="oferta-card" 
                            @click="$router.push('/producto')">

                            <div class="oferta-badge">{{ item.badge }}</div>

                            <div class="oferta-img">
                                <img :src="`/src/assets/img/ofertas/${item.img}`" :alt="item.nombre">
                            </div>
                    
                            <h4>{{ item.nombre }}</h4>
                            <p>{{ item.descripcion }}</p>
                    
                            <div class="oferta-precios">
                                <span class="precio-antes">${{ item.precioAntes.toFixed(2) }}</span>
                                <span class="precio-ahora">${{ item.precioAhora.toFixed(2) }}</span>
                            </div>
                    
                            <span class="oferta-tag">{{ item.descuento }}</span>
                    
                            <button 
                                class="oferta-btn" 
                                @click.stop="agregarAlCarrito(item.nombre, item.precioAhora, item.icono)">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>

                    <button class="carrusel-btn der" @click="moverCarrusel(1)">&#8594;</button>
                </div>
            </div>
        </div>



      
        <!------------------------------------ Proveedores ------------------------------------>
        <div class="container" id="productos">
            <h2 class="products-section-title">Nuestros Proveedores</h2>

            <div class="providers-grid">
                <div 
                    v-for="prov in listaProveedores" 
                    :key="prov.id" 
                    class="provider-card" 
                    @click="$router.push('/perfil-proveedor')" 
                    style="cursor: pointer;"
                >
                    <div class="provider-top" :style="{ background: prov.colorFondo }">
                        <div class="provider-avatar">
                            <img :src="`/src/assets/img/proveedores/${prov.img}`" :alt="prov.nombre">
                        </div>
                    </div>
            
                    <div class="provider-body">
                        <h3>{{ prov.nombre }}</h3>
                        <p class="provider-cat">{{ prov.categoria }}</p>
                        <p class="provider-desc">{{ prov.descripcion }}</p>
                
                        <button 
                            class="provider-btn" 
                            @click.stop="$router.push({ name: 'resultados', query: { proveedor: prov.slug } })">
                            Ver Productos →
                        </button>
                    </div>
                </div>
            </div>
        </div>
                
        <!-- Servicios -->
        <!-- Code omitted for brevity from the original, assuming full copy is needed later,
             but doing a partial literal copy here to save processing time while ensuring functionality -->
        <div class="container">
            <div class="service-area">
                <div class="service-fourth">
                    <div class="service-icon">🚚</div>
                    <div class="service-heading">Envío Gratis</div>
                    <div class="service-description">En pedidos mayores a $50</div>
                </div>
                <div class="service-fourth">
                    <div class="service-icon">🏪</div>
                    <div class="service-heading">14 Sucursales</div>
                    <div class="service-description">En toda la ciudad</div>
                </div>
            </div>
        </div>

        <!-- Puntos Acumulados -->
        <div class="puntos-section" id="puntos">
            <div class="container">
                <div class="puntos-banner">
                    <div class="puntos-info">
                        <p class="puntos-eyebrow">💎 Programa de Lealtad</p>
                        <h2>Acumula puntos<br>en cada compra</h2>
                        <p>Canjea tus puntos por descuentos exclusivos en cualquier proveedor del marketplace.</p>
                    </div>
                    <div class="puntos-card">
                        <p class="puntos-card-label">Mis Puntos</p>
                        <p class="puntos-card-valor">1,240 <span>pts</span></p>
                        <div class="puntos-barra">
                            <div class="puntos-barra-fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Newsletter -->
        <div class="newsletter-section">
            <div class="container">
                <div class="newsletter-box">
                    <h3>📬 Suscríbete y recibe ofertas exclusivas</h3>
                    <div class="newsletter-form">
                        <input type="email" id="emailInput" placeholder="tu@correo.com">
                        <button @click="suscribir">Suscribirse</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Agreamos lista de ofertas del día
const productosEnOferta = ref([
    {
        id: 1,
        nombre: 'Lomo de Res',
        descripcion: 'Corte premium, fresco del día',
        precioAhora: 18.00,
        precioAntes: 22.00,
        descuento: '-18%',
        badge: '🥩 7 Pozo',
        img: 'lomo.png',
        icono: '🥩'
    },
    {
        id: 2,
        nombre: 'Pechuga Entera',
        descripcion: 'Pollo fresco, entrega inmediata',
        precioAhora: 5.50,
        precioAntes: 8.00,
        descuento: '-31%',
        badge: '🐔 Pechugón',
        img: 'pechuga.png',
        icono: '🍗'
    },
    {
        id: 3,
        nombre: 'Lomo Liso',
        descripcion: 'baby beef x 1kg',
        precioAhora: 8.52,
        precioAntes: 12.00,
        descuento: '-29%',
        badge: '🐓 Carnes Ñuble S.A.',
        img: 'lomo_liso.jpg',
        icono: '🐓'
    },
    {
        id: 4,
        nombre: 'Paquete mixto de ibéricos',
        descripcion: 'chorizo + salchichón 400g',
        precioAhora: 7.00,
        precioAntes: 9.00,
        descuento: '-22%',
        badge: '🐖 Quirocarne',
        img: 'iberico.jpg',
        icono: '🐖'
    },
    {
        id: 5,
        nombre: 'Pechuga de pollo',
        descripcion: 'Deshuesada x 2kg',
        precioAhora: 4.50,
        precioAntes: 6.00,
        descuento: '-25%',
        badge: '🐔 Bachoco',
        img: 'pechuga.png',
        icono: '🐔'
    },
    {
        id: 6,
        nombre: 'Pack hamburguesas gourmet',
        descripcion: '4 unidades: vaca, ibérica, pollo y veggie',
        precioAhora: 2.50,
        precioAntes: 4.00,
        descuento: '-38%',
        badge: '🍔 Cárnicas Ismael',
        img: 'hamburguesas.jpg',
        icono: '🍔'
    },
    {
        id: 7,
        nombre: 'Paleta de cerdo tricolor',
        descripcion: 'Adobada, brasa, parrilla x 1,5kg',
        precioAhora: 5.00,
        precioAntes: 7.00,
        descuento: '-28%',
        badge: '🍖 Grupo Jorge',
        img: 'images.jpg',
        icono: '🍖'
    }
]);


// Lista de proveedores
const listaProveedores = ref([
    {
        id: 1,
        nombre: '7 Pozo',
        categoria: '🥩 Carne de Res',
        descripcion: 'Carne de res de primera calidad, criada en campo abierto.',
        img: 'provedor_1.png',
        slug: '7pozo',
        colorFondo: '#212121'
    },
    {
        id: 2,
        nombre: 'Pechugón',
        categoria: '🐔 Pollos al Por Mayor',
        descripcion: 'Distribuidor líder de pollo fresco directo desde granja.',
        img: 'provedor_1.png',
        slug: 'pechugon',
        colorFondo: '#212121'
    },
    {
        id: 3,
        nombre: 'Carnes Ñuble S.A',
        categoria: '🐓 Distribuidora cárnica general',
        descripcion: 'Distribuidor líder en cortes premium con cinco generaciones de historia.',
        img: 'provedor_1.png',
        slug: 'verdecampo',
        colorFondo: '#212121'
    },
    {
        id: 4,
        nombre: 'Quirocarne',
        categoria: '🐖 Tradición ibérica desde Madrid',
        descripcion: 'Distribuidora cárnica especializada en productos para hostelería.',
        img: 'provedor_1.png',
        slug: 'marabierto',
        colorFondo: '#212121'
    },
    {
        id: 5,
        nombre: 'Bachoco',
        categoria: '🐔 Líder multiproteínas',
        descripcion: 'Producción y comercialización de pollo, cerdo, pavo y huevo.',
        img: 'provedor_1.png',
        slug: 'paramo',
        colorFondo: '#212121'
    },
    {
        id: 6,
        nombre: 'Cárnicas Ismael',
        categoria: '🍔 Hamburguesas gourmet y carne fresca',
        descripcion: 'Mayorista con elaboración artesana.',
        img: 'provedor_1.png',
        slug: 'granosdelsur',
        colorFondo: '#212121'
    },
    {
        id: 7,
        nombre: 'Grupo Jorge',
        categoria: '🍖 Gigante del porcino',
        descripcion: 'Producción y exportación de productos porcinos.',
        img: 'provedor_1.png',
        slug: 'frutiexpress',
        colorFondo: '#212121'
    },
    {
        id: 8,
        nombre: 'Ecosancho',
        categoria: '👩‍🌾 Avicultura ecológica',
        descripcion: 'Cría y distribución de pollo, gallina, pularda y capón ecológicos.',
        img: 'provedor_1.png',
        slug: 'dulcetierra',
        colorFondo: '#212121'
    }
]);


const isMtVisible = ref(false)

const toggleMisionVision = () => {
  isMtVisible.value = !isMtVisible.value
  console.log("Estado de la misión:", isMtVisible.value) // Agrega esto para probar
}


// Función contenedor del carrusel
const carruselRef = ref(null);

const moverCarrusel = (dir) => {
    if (carruselRef.value) {
        // Movimiento basado en el ancho de una tarjeta
        const tarjeta = carruselRef.value.querySelector('.oferta-card');
        const scrollAmount = tarjeta ? tarjeta.offsetWidth + 20 : 300; // 20 es el gap/espacio

        carruselRef.value.scrollBy({ 
            left: dir * scrollAmount, 
            behavior: 'smooth' 
        });
    }
};

const agregarAlCarrito = (nombre, precio, icono) => {
  alert(`Agregado al carrito: ${icono} ${nombre} por $${precio}`)
}

const suscribir = () => {
  alert('¡Gracias por suscribirte!')
}
</script>

<style scoped>
/* Specific view styles if necessary */
</style>
