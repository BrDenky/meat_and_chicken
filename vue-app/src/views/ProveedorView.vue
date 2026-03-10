<template>
  <div class="proveedor-view">
    <div class="container" style="padding-top: 40px; padding-bottom: 40px;">
        <!-- Proveedor Welcome -->
        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
            <div style="display: flex; align-items: center; gap: 20px;">
                <img src="@/assets/img/proveedores/provedor_1.png" alt="7 Pozo" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
                <div>
                    <h1 style="margin: 0; font-size: 24px;">Panel Proveedor - 7 Pozo</h1>
                    <p style="margin: 5px 0 0; color: #666;">25 años de experiencia | 🥩 Carne de Res</p>
                </div>
            </div>
        </div>

        <!-- Dashboard Stats -->
        <h2 class="products-section-title">📊 Dashboard</h2>
        <div class="dashboard-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px;">
            <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Productos Activos</h3>
                <div class="stat-value" style="font-size: 28px; font-weight: bold; color: #333;">24</div>
                <div class="stat-change" style="color: #28a745; font-size: 12px; margin-top: 5px;">↗ +3 este mes</div>
            </div>

            <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Ventas del Mes</h3>
                <div class="stat-value" style="font-size: 28px; font-weight: bold; color: #333;">$4,520</div>
                <div class="stat-change" style="color: #28a745; font-size: 12px; margin-top: 5px;">↗ +15% vs mes anterior</div>
            </div>

            <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Pedidos Totales</h3>
                <div class="stat-value" style="font-size: 28px; font-weight: bold; color: #333;">89</div>
                <div class="stat-change" style="color: #28a745; font-size: 12px; margin-top: 5px;">↗ +8 esta semana</div>
            </div>

            <div class="stat-card" style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
                <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Productos Frescos Hoy</h3>
                <div class="stat-value" style="font-size: 28px; font-weight: bold; color: #333;">18</div>
                <div class="stat-change" style="color: #666; font-size: 12px; margin-top: 5px;">Actualizados hoy</div>
            </div>
        </div>

        <!-- Gestión de Productos -->
        <div class="productos-tabla" style="background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); padding: 20px; margin-bottom: 40px;">
            <div class="tabla-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0;">📦 Mis Productos</h2>
                <button class="btn-nuevo" @click="abrirModalProducto" style="background: #e63946; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">+ Nuevo Producto</button>
            </div>

            <div class="tabla-filtros" style="display: flex; gap: 15px; margin-bottom: 20px;">
                <input type="text" class="filtro-input" v-model="filtroNombre" placeholder="Buscar producto..." style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <select class="filtro-select" v-model="filtroCategoria" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="">Todas las categorías</option>
                    <option value="premium">Premium</option>
                    <option value="especial">Especial</option>
                    <option value="normal">Normal</option>
                </select>
                <select class="filtro-select" v-model="filtroEstado" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="">Todos los estados</option>
                    <option value="disponible">Disponible</option>
                    <option value="agotado">Agotado</option>
                </select>
            </div>

            <div style="overflow-x: auto;">
                <table class="tabla-productos" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f8f8f8; text-align: left;">
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Producto</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Tipo</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Fecha Camal</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Trazabilidad</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Peso (kg)</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Precio</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Estado</th>
                            <th style="padding: 15px; border-bottom: 2px solid #ddd;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prod in filteredProducts" :key="prod.id" style="border-bottom: 1px solid #eee;">
                            <td style="padding: 15px;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <img :src="prod.img" :alt="prod.nombre" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
                                    <span><strong>{{ prod.nombre }}</strong></span>
                                </div>
                            </td>
                            <td style="padding: 15px;"><span :class="['badge', `badge-${prod.tipo.toLowerCase()}`]" style="padding: 5px 10px; border-radius: 20px; font-size: 12px; background: #eee;">{{ prod.tipo }}</span></td>
                            <td style="padding: 15px;">{{ prod.fecha }}</td>
                            <td style="padding: 15px;">{{ prod.trazabilidad }}</td>
                            <td style="padding: 15px;">{{ prod.peso }} kg</td>
                            <td style="padding: 15px;"><strong>${{ prod.precio.toFixed(2) }}</strong></td>
                            <td style="padding: 15px;"><span :class="['badge', `badge-${prod.estado.toLowerCase()}`]" style="padding: 5px 10px; border-radius: 20px; font-size: 12px; background: #e8f5e9; color: #2e7d32;">{{ prod.estado }}</span></td>
                            <td style="padding: 15px;">
                                <button class="acciones-btn btn-editar" @click="editarProducto(prod.id)" style="margin-right: 5px; cursor: pointer; border:none; background:none; font-size: 16px;">✏️</button>
                                <button class="acciones-btn btn-eliminar" @click="eliminarProducto(prod.id)" style="cursor: pointer; border:none; background:none; font-size: 16px;">🗑️</button>
                            </td>
                        </tr>
                        <tr v-if="filteredProducts.length === 0">
                            <td colspan="8" style="padding: 20px; text-align: center; color: #666;">No se encontraron productos.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal Nuevo/Editar Producto -->
    <div class="modal" v-if="isModalOpen" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
        <div class="modal-content" style="background: white; border-radius: 10px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
            <div class="modal-header" style="position: sticky; top: 0; background: white; padding: 20px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin:0;">📦 {{ modalMode === 'create' ? 'Nuevo Producto' : 'Editar Producto' }}</h2>
                <button class="modal-close" @click="cerrarModalProducto" style="background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
            </div>

            <form @submit.prevent="guardarProducto" style="padding: 20px;">
                <div class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="form-group full-width" style="grid-column: 1 / -1;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nombre del Producto <span style="color: red;">*</span></label>
                        <input type="text" v-model="formData.nombre" required placeholder="Ej: Lomo de Res Premium" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>

                    <div class="form-group">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Tipo de Corte <span style="color: red;">*</span></label>
                        <select v-model="formData.tipoCorte" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            <option value="">Selecciona...</option>
                            <option value="premium">Premium</option>
                            <option value="especial">Especial</option>
                            <option value="normal">Normal</option>
                            <option value="mix">Mix/Paquete</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Categoría <span style="color: red;">*</span></label>
                        <select v-model="formData.categoria" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            <option value="">Selecciona...</option>
                            <option value="res">Carne de Res</option>
                            <option value="cerdo">Carne de Cerdo</option>
                            <option value="pollo">Pollo</option>
                            <option value="mix">Mix Parrillero</option>
                            <option value="embutidos">Embutidos</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Precio ($) <span style="color: red;">*</span></label>
                        <input type="number" v-model.number="formData.precio" step="0.01" required placeholder="0.00" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    </div>

                    <div class="form-group">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Estado <span style="color: red;">*</span></label>
                        <select v-model="formData.estado" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            <option value="disponible">Disponible</option>
                            <option value="agotado">Agotado</option>
                        </select>
                    </div>
                </div>

                <div class="form-actions" style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" @click="cerrarModalProducto" style="padding: 10px 20px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer;">Cancelar</button>
                    <button type="submit" style="padding: 10px 20px; border: none; background: #e63946; color: white; border-radius: 5px; cursor: pointer; font-weight: bold;">💾 Guardar Producto</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import lomoImg from '@/assets/img/ofertas/lomo.png'

const filtroNombre = ref('')
const filtroCategoria = ref('')
const filtroEstado = ref('')

const isModalOpen = ref(false)
const modalMode = ref('create')

const formData = ref({
    nombre: '',
    tipoCorte: '',
    categoria: '',
    precio: 0,
    estado: 'disponible'
})

const productos = ref([
    { id: 1, nombre: 'Lomo de Res Premium', tipo: 'Premium', fecha: '07/03/2026', trazabilidad: 'TRZ-2026-001', peso: 2.5, precio: 18.00, estado: 'Disponible', img: lomoImg },
    { id: 2, nombre: 'Costilla de Res', tipo: 'Normal', fecha: '07/03/2026', trazabilidad: 'TRZ-2026-002', peso: 3.0, precio: 15.50, estado: 'Disponible', img: lomoImg },
    { id: 3, nombre: 'Mix Parrillero Especial', tipo: 'Especial', fecha: '08/03/2026', trazabilidad: 'TRZ-2026-003', peso: 5.0, precio: 45.00, estado: 'Agotado', img: lomoImg }
])

const filteredProducts = computed(() => {
    return productos.value.filter(p => {
        const matchNombre = p.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
        const matchCategoria = filtroCategoria.value === '' || p.tipo.toLowerCase() === filtroCategoria.value
        const matchEstado = filtroEstado.value === '' || p.estado.toLowerCase() === filtroEstado.value
        return matchNombre && matchCategoria && matchEstado
    })
})

const abrirModalProducto = () => {
    modalMode.value = 'create'
    formData.value = {
        nombre: '',
        tipoCorte: '',
        categoria: '',
        precio: 0,
        estado: 'disponible'
    }
    isModalOpen.value = true
}

const editarProducto = (id) => {
    const p = productos.value.find(x => x.id === id)
    if(p) {
        modalMode.value = 'edit'
        formData.value = {
            id: p.id,
            nombre: p.nombre,
            tipoCorte: p.tipo.toLowerCase(),
            precio: p.precio,
            estado: p.estado.toLowerCase(),
            categoria: 'res' // mock default
        }
        isModalOpen.value = true
    }
}

const cerrarModalProducto = () => {
    isModalOpen.value = false
}

const guardarProducto = () => {
    alert(`✅ ${modalMode.value === 'create' ? 'Producto creado' : 'Producto actualizado'} exitosamente`)
    cerrarModalProducto()
}

const eliminarProducto = (id) => {
    if(confirm('¿Estás seguro de eliminar este producto?')) {
        productos.value = productos.value.filter(p => p.id !== id)
    }
}
</script>

<style scoped>
/* Scoped overrides if needed */
</style>
