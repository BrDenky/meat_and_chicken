<template>
  <div class="resultados-view">
    <div class="container">
      <div class="layout-principal">
        
        <aside class="sidebar-categorias">
            <ul class="lista-categorias">
                <li 
                    class="categoria-item" 
                    :class="{ active: categoriaActiva === 'INICIO' }"
                    @click="filtrarPorCategoria('INICIO')">
                    INICIO
                </li>
                <li 
                    v-for="cat in listaCategorias" 
                    :key="cat" 
                    class="categoria-item"
                    :class="{ active: categoriaActiva === cat }"
                    @click="filtrarPorCategoria(cat)">
                    {{ cat.toUpperCase() }}
                </li>
            </ul>
        </aside>

        <div class="resultados-contenido">
          <h2 class="titulo-seccion">Resultados de la búsqueda</h2>
          
          <div class="resultados-barra">
            <div class="barra-izquierda">
              <p class="conteo">
                <span v-if="searchQuery">"<strong>{{ searchQuery }}</strong>": </span>
                {{ productosFiltrados.length }} prod.
                <button v-if="searchQuery" @click="limpiarBusqueda" class="btn-limpiar" aria-label="Limpiar búsqueda">✕</button>
              </p>
            </div>
            <div class="resultados-orden">
              <select v-model="orden" class="select-orden">
                <option value="default">Ordenar</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
              </select>
            </div>
          </div>

          <div class="resultados-grid">
            <div class="producto-card" v-for="(p, index) in productosFiltrados" :key="index">
              <div class="producto-imagen-wrapper">
                <img :src="p.imagen" :alt="`Fotografía de ${p.nombre}`">
                <div class="producto-hover-acciones">
                  <button class="hover-btn" title="Ver producto" :aria-label="`Ver detalles de ${p.nombre}`" @click="$router.push('/producto/' + p.id)">👁️‍🗨️</button>
                  <button class="hover-btn" title="Agregar al carrito" :aria-label="`Agregar ${p.nombre} al carrito`" @click="HandleAgregarAlCarrito(p)">🛒</button>
                </div>
              </div>
              <div class="producto-info">
                <h4 class="producto-nombre">{{ p.nombre.toUpperCase() }}</h4>
                <div class="precios">
                  <span v-if="p.precioAntes" class="precio-antes">${{ p.precioAntes.toFixed(2) }}</span>
                  <span class="precio-actual">${{ p.precio.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="sin-resultados" v-if="productosFiltrados.length === 0">
            <p>No encontramos productos para tu búsqueda. 🥩</p>
            <button class="btn-limpiar-vacio" @click="limpiarBusqueda">Ver todos los productos</button>
          </div>
        </div>
      </div>
    </div>
    
    <transition name="slide-in">
        <div v-if="notificacion" class="notificacion-carrito">
            {{ notificacion }}
        </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import carneImg from '@/assets/img/carne_1.png'
import { supabase } from '../supabase'

const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.query.q || '')
const cartStore = useCartStore()

watch(() => route.query.q, (nuevoQuery) => {
  searchQuery.value = nuevoQuery || ''
})

const orden = ref('default')
const listaCategorias = ['Res', 'Pollos', 'Pavos', 'Cordero', 'Cerdo', 'Embutidos']
const categoriaActiva = ref(route.query.categoria || 'INICIO')
const notificacion = ref('')

const filtrarPorCategoria = (cat) => {
  categoriaActiva.value = cat
  if (cat === 'INICIO') {
    searchQuery.value = ''
    router.push({ query: {} }) // Limpia la URL
  } else {
    router.push({ query: { ...route.query, categoria: cat } }) // Mantiene búsqueda si hay, y cambia categoría
  }
}

const limpiarBusqueda = () => {
  searchQuery.value = ''
  categoriaActiva.value = 'INICIO'
  router.push({ query: {} })
}

const HandleAgregarAlCarrito = (producto) => {
  const itemToAdd = {
    id: producto.id || producto.nombre.replace(/\s+/g, '-').toLowerCase(), // Si tiene ID de DB lo usa
    name: producto.nombre,
    price: producto.precio,
    image: (producto.imagen || '').split('/').pop() || 'carne_1.png',
    weight: '1kg',
    cut: producto.categoria,
    sku: 'SKU-' + (producto.id || Math.floor(Math.random() * 1000)),
    proveedor_id: producto.proveedor_id
  }
  
  cartStore.addItem(itemToAdd)
  
  notificacion.value = `✓ "${producto.nombre}" añadido al carrito`
  setTimeout(() => {
    notificacion.value = ''
  }, 2500)
}

const productos = ref([])

const cargarProductosDesdeSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('estado', 'disponible') // Sólo mostramos productos con stock/disponibles
      
    if (error) throw error

    if (data) {
      productos.value = data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria || 'Res',
        precio: p.precio,
        precioAntes: null, // Dejamos esto en null (por si en un futuro añades descuentos a tu base)
        imagen: p.imagen_url || carneImg, // Imagen por defecto
        proveedor_id: p.proveedor_id
      }))
    }
  } catch (err) {
    console.error('Error cargando el catálogo global de productos:', err)
  }
}

onMounted(() => {
  cargarProductosDesdeSupabase()
})

const productosFiltrados = computed(() => {
  let result = [...productos.value]

  if (searchQuery.value.trim()) {
    result = result.filter(p =>
      p.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (categoriaActiva.value !== 'INICIO') {
    const catFiltro = categoriaActiva.value.toLowerCase()
    
    // Normalizar a singular (ej: pollos -> pollo) para tener más aciertos
    let terminoSingular = catFiltro
    if (catFiltro.endsWith('s') && catFiltro !== 'res') {
      terminoSingular = catFiltro.slice(0, -1)
    }

    result = result.filter(p => {
      const catProd = (p.categoria || '').toLowerCase()
      const nomProd = (p.nombre || '').toLowerCase()
      return catProd === catFiltro || 
             catProd.includes(terminoSingular) || 
             nomProd.includes(terminoSingular)
    })
  }

  if (orden.value === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
  if (orden.value === 'precio-desc') result.sort((a, b) => b.precio - a.precio)

  return result
})
</script>

<style scoped>
.resultados-view {
  background-color: #fcfcfc;
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.layout-principal {
  display: flex;
  gap: 40px;
}
.sidebar-categorias {
  width: 240px;
  flex-shrink: 0;
}
.lista-categorias {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #eee;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
.categoria-item {
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  transition: background 0.2s;
}
.categoria-item:last-child {
  border-bottom: none;
}
.categoria-item:hover {
  background: #f9f9f9;
  color: #F05A22;
}
.categoria-item.active {
  background: #f2f2f2;
  font-weight: bold;
  border-left: 4px solid #F05A22; /* Cambiado de verde a naranja */
}
.titulo-seccion {
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 0;
}
.resultados-barra {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
}
.barra-izquierda {
  display: flex;
  align-items: center;
}
.conteo { 
  color: #666; 
  font-size: 14px; 
  margin: 0; 
  display: flex;
  align-items: center;
}
.select-orden {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
}
.btn-limpiar {
  margin-left: 10px;
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  font-size: 10px;
  transition: all 0.2s;
}
.btn-limpiar:hover {
  background: #F05A22;
  color: white;
}
.resultados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.producto-card {
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #f0f0f0;
}
.producto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.producto-imagen-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
  margin-bottom: 15px;
  border-radius: 8px;
}
.producto-imagen-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.producto-hover-acciones {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: row;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.producto-imagen-wrapper:hover .producto-hover-acciones {
  opacity: 1;
}
.hover-btn {
  background: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.2s, background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hover-btn:hover {
  background: #F05A22;
  color: white;
  transform: scale(1.1);
}
.producto-info {
  padding: 0 8px;
}
.producto-nombre {
  font-size: 13px;
  color: #444;
  margin-bottom: 8px;
  height: 38px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.precios {
  display: flex;
  align-items: center;
  gap: 8px;
}
.precio-actual {
  font-weight: 800;
  font-size: 18px;
  color: #F05A22; /* Cambiado de verde a naranja */
}
.precio-antes {
  text-decoration: line-through;
  color: #999;
  font-size: 13px;
}
.sin-resultados {
  text-align: center;
  color: #666;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  border: 1px dashed #ccc;
}
.btn-limpiar-vacio {
  margin-top: 15px;
  padding: 10px 20px;
  background: #F05A22; /* Cambiado de verde a naranja */
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
.notificacion-carrito {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #F05A22; /* Cambiado de verde a naranja */
  color: white;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 9999;
}
.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.3s ease;
}
.slide-in-enter-from, .slide-in-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* ================================
   RESPONSIVE MÓVIL OPTIMIZADO
   ================================ */
@media (max-width: 768px) {
  .layout-principal {
    flex-direction: column;
    gap: 0; /* Quitamos el gap gigante */
  }
  
  .sidebar-categorias {
    width: 100%;
    margin-bottom: 10px;
  }
  
  /* Magia del Scroll Horizontal para categorías */
  .lista-categorias {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;
    padding: 10px 5px;
    background: transparent;
    border: none;
    border-radius: 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }
  .lista-categorias::-webkit-scrollbar {
    display: none; /* Chrome/Safari */
  }
  
  .categoria-item {
    border: 1px solid #e0e0e0;
    border-radius: 25px; /* Estilo píldora */
    padding: 8px 16px;
    font-size: 13px;
    background: white;
    white-space: nowrap; /* Evita que el texto baje de línea */
    flex-shrink: 0; /* Evita que el botón se aplaste */
  }
  
  .categoria-item.active {
    background: #F05A22; /* Cambiado de verde a naranja */
    color: white;
    border-color: #F05A22;
  }

  /* Ocultar título redundante en móvil para ahorrar espacio */
  .titulo-seccion {
    display: none;
  }

  /* Barra de controles en una sola línea */
  .resultados-barra {
    flex-direction: row;
    padding: 10px 5px;
    margin-bottom: 15px;
    border-top: none; /* Diseño más limpio */
  }
  
  .conteo {
    font-size: 13px;
  }

  .select-orden {
    padding: 6px 10px;
    font-size: 13px;
  }

  /* Ajuste de la grilla de productos */
  .resultados-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  .resultados-grid {
    /* En pantallas muy pequeñas, dejamos 2 columnas pero ajustamos tamaños */
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .producto-card {
    padding: 8px;
  }
  .producto-imagen-wrapper {
    height: 120px; /* Imagen más pequeña */
  }
  .producto-nombre {
    font-size: 12px;
    height: 34px; /* Ajustado para dos líneas exactas */
  }
  .precio-actual {
    font-size: 15px;
  }
  .precio-antes {
    font-size: 11px;
  }
  .hover-btn {
    width: 35px;
    height: 35px;
    font-size: 0.9rem;
  }
  .notificacion-carrito {
    left: 10px;
    right: 10px;
    text-align: center;
  }
}
</style>