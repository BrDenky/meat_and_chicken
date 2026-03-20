<template>
  <div>

    <!-- SECCIÓN HERO
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
    </section> -->




    <!-- CONTENIDO PRINCIPAL -->
    <main>
        
        <!------------------------------------ Ofertas de la semana ------------------------------------>
        <div class="ofertas-section" id="ofertas">
            <div class="container">
                <h2 class="products-section-title">Ofertas de la semana</h2>
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
                                <img :src="`/img/ofertas/${item.img}`" :alt="item.nombre">
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

        <!------------------------------------ Productos Más Vendidos ------------------------------------>
        <div class="vendidos-section">
            <div class="container">
                <h2 class="products-section-title">Productos Más Vendidos</h2>
                <div class="vendidos-grid">
                    <div 
                        v-for="p in productosMasVendidos" 
                        :key="p.id" 
                        class="vendido-card"
                        @click="$router.push('/producto')">
                        
                        <div class="vendido-img">
                            <img :src="p.img" :alt="p.nombre">
                        </div>
                        <div class="vendido-info">
                            <span class="vendido-cat">{{ p.categoria }}</span>
                            <h3>{{ p.nombre }}</h3>
                            <div class="vendido-footer">
                                <span class="vendido-precio">${{ p.precio.toFixed(2) }}</span>
                            </div>
                            <button class="oferta-btn" @click.stop="agregarAlCarrito(p.nombre, p.precio, '🥩')">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ver-todo-wrapper">
                    <router-link to="/resultados" class="btn-ver-todo">
                        Ver todos los productos <i class="fa-solid fa-arrow-right"></i>
                    </router-link>
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
                            @click.stop="$router.push({ name: 'perfil-proveedor', query: { proveedor: prov.slug } })">
                            Ver Proveedor
                        </button>
                    </div>
                </div>
            </div>
        </div>

                <!-- Puntos Acumulados -->
        <div class="puntos-section" id="puntos">
            <div class="container">
                <div class="puntos-header">
                    <h2>Acumula puntos en cada compra</h2>
                    <p>Los mejores precios con todos nuestros proveedores</p>
                </div>

                <div class="puntos-steps">
                    <div class="puntos-step">
                        <div class="step-icon"><i class="fa-solid fa-cart-shopping"></i></div>
                        <div class="step-content">
                            <h3>1. Compra</h3>
                            <p>Gana 1 punto por cada $1 en tus pedidos.</p>
                        </div>
                    </div>
                    <div class="puntos-step">
                        <div class="step-icon"><i class="fa-solid fa-gem"></i></div>
                        <div class="step-content">
                            <h3>2. Acumula</h3>
                            <p>Se suman automáticamente a tu cuenta.</p>
                        </div>
                    </div>
                    <div class="puntos-step">
                        <div class="step-icon"><i class="fa-solid fa-tag"></i></div>
                        <div class="step-content">
                            <h3>3. Canjea</h3>
                            <p>Ahorra dinero en cualquier proveedor.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- Servicios -->
        <div class="container service-section">
            <div class="service-grid">
                <div class="service-item">
                    <div class="service-icon"><i class="fa-solid fa-paper-plane"></i></div>
                    <div class="service-text">
                        <h3 class="highlight">Envío A Domicilio</h3>
                        <p>Para la ciudad de Quito</p>
                    </div>
                </div>
                <div class="service-item">
                    <div class="service-icon"><i class="fa-solid fa-store"></i></div>
                    <div class="service-text">
                        <h3>14 Sucursales</h3>
                        <p>En la ciudad de Quito</p>
                    </div>
                </div>
                <div class="service-item">
                    <div class="service-icon"><i class="fa-solid fa-wallet"></i></div>
                    <div class="service-text">
                        <h3>Compra 100% Segura</h3>
                        <p>Pago con transferencia o depósito</p>
                    </div>
                </div>
                <div class="service-item">
                    <div class="service-icon"><i class="fa-solid fa-headset"></i></div>
                    <div class="service-text">
                        <h3>Asesoría Personalizada</h3>
                        <p>Te ayudamos en tu pedido</p>
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
    <transition name="slide-in">
        <div v-if="notificacion" class="notificacion-carrito">
            {{ notificacion }}
        </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notificacion = ref('')

// Agreamos lista de ofertas de la semana
const productosEnOferta = ref([
    {
        id: 1,
        nombre: 'Lomo de Res',
        descripcion: 'Corte premium, fresco del día',
        precioAhora: 18.00,
        precioAntes: 22.00,
        descuento: '-18%',
        badge: '7 Pozo',
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
        badge: 'Pechugón',
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
        badge: 'Carnes Ñuble S.A.',
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
        badge: 'Quirocarne',
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
        badge: 'Bachoco',
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
        badge: 'Cárnicas Ismael',
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
        badge: 'Grupo Jorge',
        img: 'images.jpg',
        icono: '🍖'
    }
]);

// Lista de productos más vendidos (12 unidades para red 4x3)
const productosMasVendidos = ref([
    { id: 1, nombre: 'Lomo de Res Premium', categoria: 'Res', precio: 12.50, img: '/img/carne_1.png' },
    { id: 2, nombre: 'Pechuga de Pollo x 1kg', categoria: 'Aves', precio: 5.80, img: '/img/carne_3.jpg' },
    { id: 3, nombre: 'Chuleta de Cerdo Extra', categoria: 'Cerdo', precio: 4.50, img: '/img/carne_4.jpg' },
    { id: 4, nombre: 'Carne Molida Especial', categoria: 'Res', precio: 6.20, img: '/img/carne_5.jpg' },
    { id: 5, nombre: 'Alitas de Pollo x 12', categoria: 'Aves', precio: 7.50, img: '/img/carne_2.jpg' },
    { id: 6, nombre: 'Costilla Ahumada', categoria: 'Cerdo', precio: 8.90, img: '/img/carne_4.jpg' },
    { id: 7, nombre: 'Hamburguesa Artesanal', categoria: 'Procesados', precio: 2.50, img: '/img/carne_3.jpg' },
    { id: 8, nombre: 'Chorizo Santarrosano', categoria: 'Embutidos', precio: 10.00, img: '/img/carne_5.jpg' },
    { id: 9, nombre: 'Sobrebarriga Gruesa', categoria: 'Res', precio: 9.40, img: '/img/carne_1.png' },
    { id: 10, nombre: 'Muslo de Pollo x 4', categoria: 'Aves', precio: 3.20, img: '/img/carne_2.jpg' },
    { id: 11, nombre: 'Tocino Ahumado', categoria: 'Cerdo', precio: 6.50, img: '/img/carne_4.jpg' },
    { id: 12, nombre: 'Lomo Fino de Chancho', categoria: 'Cerdo', precio: 18.50, img: '/img/carne_1.png' }
]);


// Lista de proveedores
const listaProveedores = ref([
    {
        id: 1,
        nombre: '7 Pozo',
        categoria: 'Carne de Res',
        descripcion: 'Carne de res de primera calidad, criada en campo abierto.',
        img: 'provedor_1.png',
        slug: '7pozo',
        colorFondo: '#212121'
    },
    {
        id: 2,
        nombre: 'Pechugón',
        categoria: 'Pollos al Por Mayor',
        descripcion: 'Distribuidor líder de pollo fresco directo desde granja.',
        img: 'provedor_1.png',
        slug: 'pechugon',
        colorFondo: '#212121'
    },
    {
        id: 3,
        nombre: 'Carnes Ñuble S.A',
        categoria: 'Distribuidora cárnica general',
        descripcion: 'Distribuidor líder en cortes premium con cinco generaciones de historia.',
        img: 'provedor_1.png',
        slug: 'verdecampo',
        colorFondo: '#212121'
    },
    {
        id: 4,
        nombre: 'Quirocarne',
        categoria: 'Tradición ibérica desde Madrid',
        descripcion: 'Distribuidora cárnica especializada en productos para hostelería.',
        img: 'provedor_1.png',
        slug: 'marabierto',
        colorFondo: '#212121'
    },
    {
        id: 5,
        nombre: 'Bachoco',
        categoria: 'Líder multiproteínas',
        descripcion: 'Producción y comercialización de pollo, cerdo, pavo y huevo.',
        img: 'provedor_1.png',
        slug: 'paramo',
        colorFondo: '#212121'
    },
    {
        id: 6,
        nombre: 'Cárnicas Ismael',
        categoria: 'Hamburguesas gourmet y carne fresca',
        descripcion: 'Mayorista con elaboración artesana.',
        img: 'provedor_1.png',
        slug: 'granosdelsur',
        colorFondo: '#212121'
    },
    {
        id: 7,
        nombre: 'Grupo Jorge',
        categoria: 'Gigante del porcino',
        descripcion: 'Producción y exportación de productos porcinos.',
        img: 'provedor_1.png',
        slug: 'frutiexpress',
        colorFondo: '#212121'
    },
    {
        id: 8,
        nombre: 'Ecosancho',
        categoria: 'Avicultura ecológica',
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
  notificacion.value = `${icono} "${nombre}" añadido al carrito ($${precio})`
  setTimeout(() => {
    notificacion.value = ''
  }, 2500)
}

const suscribir = () => {
  alert('¡Gracias por suscribirte!')
}
</script>

<style scoped>
.vendidos-section {
    padding: 20px 0 60px 0;
    background: #fff;
}

.vendidos-section .products-section-title {
    margin-top: 30px;
}

.vendidos-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    margin-top: 40px;
}

.vendido-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;
    cursor: pointer;
}

.vendido-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    border-color: #F05A22;
}

.vendido-img {
    height: 180px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.vendido-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.vendido-info {
    padding: 15px;
}

.vendido-cat {
    font-size: 0.75rem;
    color: #F05A22;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 5px;
    display: block;
}

.vendido-card h3 {
    font-size: 1rem;
    color: #212121;
    margin-bottom: 12px;
    height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.vendido-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.vendido-precio {
    font-size: 1.2rem;
    font-weight: 800;
    color: #212121;
}

.add-btn-small {
    background: #F05A22;
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
}

.add-btn-small:hover {
    background: #212121;
}

.ver-todo-wrapper {
    text-align: center;
    margin-top: 50px;
}

.btn-ver-todo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #212121;
    color: white;
    padding: 14px 28px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s;
}

.btn-ver-todo:hover {
    background: #F05A22;
    transform: translateX(5px);
}

/* Revertir estilos de botones de compra */
.oferta-btn {
    width: 100%;
    background: #F05A22;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 10px;
}

.oferta-btn:hover {
    background: #212121;
}

@media (max-width: 1024px) {
    .vendidos-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .vendidos-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .vendidos-grid {
        grid-template-columns: 1fr;
    }
}
</style>
