<template>
  <div class="resultados-view">
    <div class="container">
      <nav class="breadcrumbs">
        <span>Casa</span> | <span>Resultados de la búsqueda</span>
      </nav>

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
              <span class="grid-icon">▤ ☰</span>
              <p class="conteo">
                <span v-if="searchQuery">Resultados para "<strong>{{ searchQuery }}</strong>": </span>
                {{ productosFiltrados.length }} producto(s)
                <button v-if="searchQuery" @click="searchQuery = ''" class="btn-limpiar">✕ Limpiar</button>
              </p>
            </div>
            <div class="resultados-orden">
              <label>Ordenar por:</label>
              <select v-model="orden" class="select-orden">
                <option value="default">Seleccione</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <div class="resultados-grid">
            <div class="producto-card" v-for="(p, index) in productosFiltrados" :key="index">
              <div class="producto-imagen-wrapper">
                <img :src="p.imagen" alt="producto">
                <div class="producto-hover-acciones">
                  <button class="hover-btn" title="Ver producto" @click="$router.push('/producto')">👁️‍🗨️</button>
                  <button class="hover-btn" title="Agregar al carrito" @click="agregarAlCarrito(p.nombre)">🛒</button>
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

          <p class="sin-resultados" v-if="productosFiltrados.length === 0">
            😕 No se encontraron productos.
          </p>
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
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import carneImg from '@/assets/img/carne_1.png'
import carne3Img from '@/assets/img/carne_3.jpg'

const route = useRoute()
const searchQuery = ref(route.query.q || '')

// Actualiza cuando cambia la URL
watch(() => route.query.q, (nuevoQuery) => {
  searchQuery.value = nuevoQuery || ''
})

const orden = ref('default')
const listaCategorias = ['Pollos', 'Pavos', 'Cordero', 'Cerdo', 'Embutidos']
const categoriaActiva = ref('INICIO')
const notificacion = ref('')

const filtrarPorCategoria = (cat) => {
  categoriaActiva.value = cat
  if (cat === 'INICIO') searchQuery.value = ''
}

const agregarAlCarrito = (nombre) => {
  notificacion.value = `✓ "${nombre}" añadido al carrito`
  setTimeout(() => {
    notificacion.value = ''
  }, 2500)
}

const productos = ref([
  { nombre: 'Lomo fino de chancho und', categoria: 'Cerdo', imagen: carneImg, precio: 18.50, precioAntes: 21.00 },
  { nombre: 'Carne de cerdo foodpacking', categoria: 'Cerdo', imagen: carne3Img, precio: 12.00, precioAntes: null },
])

const productosFiltrados = computed(() => {
  let result = [...productos.value]

  if (searchQuery.value.trim()) {
    result = result.filter(p =>
      p.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (categoriaActiva.value !== 'INICIO') {
    result = result.filter(p => p.categoria === categoriaActiva.value)
  }

  if (orden.value === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
  if (orden.value === 'precio-desc') result.sort((a, b) => b.precio - a.precio)

  return result
})
</script>

<style scoped>
.btn-limpiar {
  margin-left: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 0.78rem;
  cursor: pointer;
  color: #666;
}
.btn-limpiar:hover {
  background: #F05A22;
  color: white;
  border-color: #F05A22;
}
.notificacion-carrito {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #1B4332;
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
.breadcrumbs {
  font-size: 13px;
  color: #666;
  margin-bottom: 30px;
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
}
.categoria-item {
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  transition: background 0.2s;
}
.categoria-item:hover {
  background: #f9f9f9;
  color: #F05A22;
}
.categoria-item.active {
  background: #f2f2f2;
  font-weight: bold;
}
.titulo-seccion {
  font-size: 24px;
  margin-bottom: 30px;
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
  gap: 15px;
}
.conteo { color: #666; font-size: 14px; margin: 0; }
.select-orden {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
.resultados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 30px;
}
.producto-card {
  background: white;
  transition: transform 0.2s;
}
.producto-card:hover {
  transform: translateY(-5px);
}
.producto-imagen-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
  margin-bottom: 15px;
}
.producto-imagen-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.producto-hover-acciones {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  flex-direction: column;
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
  width: 40px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: transform 0.2s, background 0.2s;
}
.hover-btn:hover {
  background: #F05A22;
  transform: scale(1.1);
}
.producto-nombre {
  font-size: 14px;
  color: #444;
  margin-bottom: 10px;
  height: 40px;
}
.precio-actual {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
.precio-antes {
  text-decoration: line-through;
  color: #999;
  margin-right: 10px;
  font-size: 14px;
}
</style>