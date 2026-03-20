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
                <span v-if="searchQuery">Resultados para "<strong>{{ searchQuery }}</strong>": </span>
                {{ productosFiltrados.length }} producto(s)
                <button v-if="searchQuery" @click="searchQuery = ''" class="btn-limpiar">✕ Limpiar</button>
              </p>
            </div>
            <div class="resultados-orden">
              <label>Ordenar por:</label>
              <select v-model="orden" class="select-orden">
                <option value="default">Seleccionar</option>
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
            No se encontraron productos.
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