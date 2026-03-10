<template>
  <div class="resultados-view" style="display: flex; gap: 30px; padding: 40px 0;">
    <div class="container" style="display: flex; gap: 30px; width: 100%;">
        <!-- SIDEBAR DE FILTROS -->
        <aside class="filtros-panel" style="width: 250px; flex-shrink: 0; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); align-self: flex-start;">
            <h3 class="filtros-titulo" style="margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px;">🔧 Filtros</h3>

            <!-- Filtro por categoría -->
            <div class="filtro-grupo" style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px; font-size: 14px;">Categoría</h4>
                <label style="display: block; margin-bottom: 8px;"><input type="checkbox" value="pollos" v-model="categoriasFiltro"> Pollo</label>
                <label style="display: block; margin-bottom: 8px;"><input type="checkbox" value="carnes" v-model="categoriasFiltro"> Carne de Res</label>
            </div>

            <!-- Filtro por proveedor -->
            <div class="filtro-grupo" style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px; font-size: 14px;">Proveedor</h4>
                <label style="display: block; margin-bottom: 8px;"><input type="checkbox" value="7pozo" v-model="proveedoresFiltro"> 7 Pozo</label>
                <label style="display: block; margin-bottom: 8px;"><input type="checkbox" value="pechugon" v-model="proveedoresFiltro"> Pechugón</label>
            </div>

            <!-- Filtro por precio -->
            <div class="filtro-grupo" style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px; font-size: 14px;">Precio máximo: <span>${{ precioMax }}</span></h4>
                <input type="range" min="1" max="50" v-model.number="precioMax" style="width: 100%;">
            </div>

            <!-- Filtro ofertas -->
            <div class="filtro-grupo" style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px; font-size: 14px;">Ofertas</h4>
                <label><input type="checkbox" v-model="soloOfertas"> 🏷️ Solo con descuento</label>
            </div>

            <button class="filtro-limpiar" @click="limpiarFiltros" style="width: 100%; padding: 10px; background: none; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">✕ Limpiar filtros</button>
        </aside>

        <!-- RESULTADOS -->
        <div class="resultados-contenido" style="flex: 1;">
            
            <!-- Barra superior -->
            <div class="resultados-barra" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <p class="resultados-conteo" style="color: #666;">Mostrando {{ productosFiltrados.length }} resultados</p>
                <div class="resultados-orden" style="display: flex; align-items: center; gap: 10px;">
                    <label style="color: #666;">Ordenar por:</label>
                    <select v-model="orden" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                        <option value="default">Relevancia</option>
                        <option value="precio-asc">Precio: menor a mayor</option>
                        <option value="precio-desc">Precio: mayor a menor</option>
                        <option value="descuento">Mayor descuento</option>
                    </select>
                </div>
            </div>

            <!-- Tabs productos / proveedores -->
            <div class="resultados-tabs" style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button :class="['tab-resultado', { active: currentTab === 'productos' }]" @click="currentTab = 'productos'" style="padding: 10px 20px; border: none; background: white; border-radius: 5px; cursor: pointer;">📦 Productos</button>
                <button :class="['tab-resultado', { active: currentTab === 'proveedores' }]" @click="currentTab = 'proveedores'" style="padding: 10px 20px; border: none; background: white; border-radius: 5px; cursor: pointer;">🏪 Proveedores</button>
            </div>

            <!-- Grid de PRODUCTOS -->
            <div v-show="currentTab === 'productos'">
                <div class="resultados-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px;" v-if="productosFiltrados.length > 0">
                    <div class="oferta-card" v-for="(p, index) in productosFiltrados" :key="index" @click="$router.push('/producto')" style="cursor: pointer; background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); position: relative;">
                        <div class="oferta-badge" style="position: absolute; top: 10px; left: 10px; background: #e63946; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px; z-index: 1;">{{ p.proveedor }}</div>
                        <div style="height: 150px; margin-bottom: 15px; border-radius: 5px; overflow: hidden;">
                            <img :src="p.imagen" alt="producto" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h4 style="margin: 0 0 5px 0;">{{ p.nombre }}</h4>
                        <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">{{ p.categoria }}</p>
                        <div class="oferta-precios" style="display: flex; align-items: center; justify-content: space-between;">
                            <span v-if="p.precioAntes" style="text-decoration: line-through; color: #999; font-size: 14px;">${{ p.precioAntes.toFixed(2) }}</span>
                            <span style="font-weight: bold; font-size: 18px; color: #333;">${{ p.precio.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>
                <p class="sin-resultados" v-else style="text-align: center; padding: 40px; color: #666; font-size: 18px;">😕 No se encontraron resultados con esos filtros</p>
            </div>

            <!-- Grid de PROVEEDORES -->
            <div v-show="currentTab === 'proveedores'">
                <div class="providers-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
                    <div class="provider-card" v-for="prov in proveedores" :key="prov.id" @click="$router.push('/perfil-proveedor')" style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); cursor: pointer;">
                        <div class="provider-top" :style="{ background: prov.color, height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '10px' }">
                            <!-- Avatar Placeholder -->
                            <div style="width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; transform: translateY(50%); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                                <span style="font-size: 24px;">🏪</span>
                            </div>
                        </div>
                        <div class="provider-body" style="padding: 40px 20px 20px; text-align: center;">
                            <h3 style="margin: 0 0 5px 0;">{{ prov.nombre }}</h3>
                            <p style="margin: 0 0 15px 0; color: #666; font-size: 14px;">{{ prov.cat }}</p>
                            <button style="width: 100%; padding: 10px; background: #f8f8f8; border: 1px solid #eee; border-radius: 5px; cursor: pointer; color: #333;">Ver Productos →</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import carneImg from '@/assets/img/carne_1.png'
import carne3Img from '@/assets/img/carne_3.jpg'

const currentTab = ref('productos')

// Filtros state
const categoriasFiltro = ref([])
const proveedoresFiltro = ref([])
const precioMax = ref(50)
const soloOfertas = ref(false)
const orden = ref('default')

// Mock Data
const productos = ref([
    { nombre: 'Lomo de Res', proveedor: '7 Pozo', proveedorId: '7pozo', categoria: 'carnes', imagen: carneImg, precio: 18, precioAntes: 22, descuento: true },
    { nombre: 'Costilla de Res', proveedor: '7 Pozo', proveedorId: '7pozo', categoria: 'carnes', imagen: carne3Img, precio: 14, precioAntes: null, descuento: false },
    { nombre: 'Pechuga Entera', proveedor: 'Pechugón', proveedorId: 'pechugon', categoria: 'pollos', imagen: carne3Img, precio: 5.5, precioAntes: 8, descuento: true },
    { nombre: 'Alas de Pollo x kg', proveedor: 'Pechugón', proveedorId: 'pechugon', categoria: 'pollos', imagen: carne3Img, precio: 4, precioAntes: 6, descuento: true },
])

const proveedores = ref([
    { nombre: '7 Pozo', id: '7pozo', cat: '🥩 Carne de Res', color: 'linear-gradient(135deg, #8B2E2E, #C0392B)' },
    { nombre: 'Pechugón', id: 'pechugon', cat: '🐔 Pollos al Por Mayor', color: 'linear-gradient(135deg, #B7950B, #D4AC0D)' },
    { nombre: 'Carnes Ñuble', id: 'verdecampo', cat: '🐓 Distribuidora cárnica general', color: 'linear-gradient(135deg, #1A5E20, #2E7D32)' },
])

const productosFiltrados = computed(() => {
    let result = productos.value.filter(p => {
        if (categoriasFiltro.value.length > 0 && !categoriasFiltro.value.includes(p.categoria)) return false
        if (proveedoresFiltro.value.length > 0 && !proveedoresFiltro.value.includes(p.proveedorId)) return false
        if (p.precio > precioMax.value) return false
        if (soloOfertas.value && !p.descuento) return false
        return true
    })

    if (orden.value === 'precio-asc') result.sort((a, b) => a.precio - b.precio)
    if (orden.value === 'precio-desc') result.sort((a, b) => b.precio - a.precio)
    if (orden.value === 'descuento') result.sort((a, b) => (b.descuento ? 1 : 0) - (a.descuento ? 1 : 0))

    return result
})

const limpiarFiltros = () => {
    categoriasFiltro.value = []
    proveedoresFiltro.value = []
    precioMax.value = 50
    soloOfertas.value = false
    orden.value = 'default'
}
</script>

<style scoped>
/* Scoped styles */
.tab-resultado.active {
    background: #e63946 !important;
    color: white !important;
}
</style>
