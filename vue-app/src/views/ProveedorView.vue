<template>
  <div class="proveedor-view">
    <div class="container">
        <!-- Dashboard Layout -->
        <div class="dashboard-layout">
            
            <!-- SIDEBAR INFORMATIVO (A la izquierda como panel) -->
            <aside class="provider-sidebar">
                <div class="sidebar-sticky">
        <div class="provider-profile-mobile">
            <div class="provider-badge-container">
                <img :src="proveedorPerfil.logo || defaultProviderImg" :alt="proveedorPerfil.nombre" class="provider-logo-large">
                <button class="btn-edit-logo" @click="$refs.logoInput.click()" title="Actualizar Logo">
                    <i class="fa-solid fa-camera"></i>
                </button>
                <input type="file" ref="logoInput" accept="image/*" hidden @change="subirLogoProveedor">
                <span class="verified-badge"><i class="fa-solid fa-circle-check"></i> Verificado</span>
            </div>
            
            <div class="provider-info-header">
                <h1>{{ proveedorPerfil.nombre }}</h1>
                <p class="provider-tagline">Maestros Carniceros</p>
            </div>
        </div>

                    <div class="provider-stats-brief">
                        <div class="brief-item">
                            <span class="label">Experiencia</span>
                            <span class="value">25 años</span>
                        </div>
                        <div class="brief-item">
                            <span class="label">Especialidad</span>
                            <span class="value">Carne de Res</span>
                        </div>
                    </div>

                    <nav class="sidebar-nav">
                        <button class="nav-item" @click="abrirModalCert"><i class="fa-solid fa-certificate"></i> Certificaciones</button>
                        <button class="nav-item" @click="abrirModalPago"><i class="fa-solid fa-address-book"></i> Contacto - Pago</button>
                    </nav>

                    <!-- MOBILE ONLY VISTA GENERAL -->
                    <div class="mobile-stats-section">
                        <div class="stat-card mobile-stat">
                            <div class="stat-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
                            <div class="stat-content">
                                <h3 class="stat-label">Productos Activos</h3>
                                <div class="stat-value">{{ productosActivos }}</div>
                                <div class="stat-trend trend-up">↗</div>
                            </div>
                        </div>

                        <div class="stat-card mobile-stat">
                            <div class="stat-icon orange"><i class="fa-solid fa-sack-dollar"></i></div>
                            <div class="stat-content">
                                <h3 class="stat-label">Ventas del Mes</h3>
                                <div class="stat-value">$4,520</div>
                                <div class="stat-trend trend-up">↗ +15% vs anterior</div>
                            </div>
                        </div>

                        <div class="stat-card mobile-stat">
                            <div class="stat-icon sky"><i class="fa-solid fa-receipt"></i></div>
                            <div class="stat-content">
                                <h3 class="stat-label">Pedidos Totales</h3>
                                <div class="stat-value">89</div>
                                <div class="stat-trend trend-up">↗ +8 hoy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- CONTENIDO PRINCIPAL (Estadísticas y Tabla) -->
            <main class="dashboard-main">
                <!-- Dashboard Stats -->
                <section class="stats-section desktop-stats">
                    <h2 class="section-title">Vista General</h2>
                    <div class="dashboard-stats">
                        <div class="stat-card">
                            <div class="stat-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
                            <div class="stat-content">
                                <h3 class="stat-label">Productos Activos</h3>
                                <div class="stat-value">{{ productosActivos }}</div>
                                <!-- <div class="stat-trend trend-up"></div> -->
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon orange"><i class="fa-solid fa-sack-dollar"></i></div>
                            <div class="stat-content">
                                <h3 class="stat-label">Ventas del Mes</h3>
                                <div class="stat-value">$4,520</div>
                                <div class="stat-trend trend-up">↗ +15% vs anterior</div>
                            </div>
                        </div>

                        <div class="stat-card">
                            <div class="stat-icon sky"><i class="fa-solid fa-receipt"></i></div>
                            <div class="stat-content">
                                <h3 class="stat-label">Pedidos Totales</h3>
                                <div class="stat-value">89</div>
                                <div class="stat-trend trend-up">↗ +8 hoy</div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- TABS DE NAVEGACION PRINCIPAL -->
                <div class="dashboard-tabs" style="margin-bottom: 20px; display: flex; gap: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                    <button 
                        style="background: transparent; border: none; font-size: 18px; cursor: pointer; padding: 10px 20px; border-radius: 8px;" 
                        :style="currentTab === 'productos' ? 'background: #F05A22; color: white; font-weight: bold;' : 'color: #555;'"
                        @click="currentTab = 'productos'">
                        <i class="fa-solid fa-boxes-stacked"></i> Mis Productos
                    </button>
                    <button 
                        style="background: transparent; border: none; font-size: 18px; cursor: pointer; padding: 10px 20px; border-radius: 8px;" 
                        :style="currentTab === 'pedidos' ? 'background: #F05A22; color: white; font-weight: bold;' : 'color: #555;'"
                        @click="currentTab = 'pedidos'">
                        <i class="fa-solid fa-clipboard-list"></i> Mis Pedidos
                    </button>
                </div>

                <!-- Gestión de Productos -->
                <section class="products-management" v-if="currentTab === 'productos'">
                    <div class="table-header-row" :class="{ 'search-open': isSearchActive }">
                        <h2 class="section-title">Mis Productos</h2>
                        <div class="table-actions">
                            <div class="search-box" :class="{ 'active': isSearchActive }">
                                <i class="fa-solid fa-magnifying-glass" @click="isSearchActive = !isSearchActive"></i>
                                <input type="text" v-model="filtroNombre" placeholder="Buscar producto...">
                            </div>
                            <button class="btn-new-product-table" @click="abrirModalProducto">
                                <i class="fa-solid fa-plus"></i> Nuevo
                            </button>
                        </div>
                    </div>

                    <div class="table-container-card">
                        <div class="table-filters-row">
                            <select v-model="filtroCategoria" class="premium-select">
                                <option value="">Categorías</option>
                                <option value="premium">Premium</option>
                                <option value="especial">Especial</option>
                                <option value="normal">Normal</option>
                            </select>
                            <select v-model="filtroEstado" class="premium-select">
                                <option value="">Todos los estados</option>
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                            </select>
                        </div>

                        <div class="premium-table-wrapper">
                            <table class="premium-table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th class="hide-mobile">Corte</th>
                                        <th class="hide-mobile">Fecha Camal</th>
                                        <th class="hide-mobile">Peso</th>
                                        <th class="hide-mobile">Precio</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="prod in filteredProducts" :key="prod.id">
                                        <td>
                                            <div class="product-cell">
                                                <img :src="prod.img" :alt="prod.nombre" class="table-prod-img">
                                                <div class="product-min-info">
                                                    <span class="p-name">{{ prod.nombre }}</span>
                                                    <span class="p-sku">{{ prod.trazabilidad }}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="hide-mobile"><span :class="['p-badge', `badge-${prod.tipo.toLowerCase()}`]">{{ prod.tipo }}</span></td>
                                        <td class="date-cell hide-mobile">{{ prod.fecha }}</td>
                                        <td class="weight-cell hide-mobile">{{ prod.peso }} kg</td>
                                        <td class="price-cell hide-mobile"><strong>${{ prod.precio.toFixed(2) }}</strong></td>
                                        <td><span :class="['status-pill', `status-${prod.estado.toLowerCase()}`]">{{ prod.estado }}</span></td>
                                        <td class="actions-cell">
                                            <div class="table-actions-cell">
                                                <button class="btn-action edit" @click="editarProducto(prod.id)" title="Editar">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button class="btn-action delete" @click="eliminarProducto(prod.id)" title="Eliminar">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="filteredProducts.length === 0">
                                        <td colspan="7" class="empty-state">
                                            <i class="fa-solid fa-box-open"></i>
                                            <p>No se encontraron productos coincidentes.</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <!-- Gestión de Pedidos -->
                <section class="orders-management" v-if="currentTab === 'pedidos'">
                    <h2 class="section-title">Pedidos Entrantes</h2>
                    
                    <div class="premium-table-wrapper" style="margin-top: 20px;">
                        <table class="premium-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Cliente (Info)</th>
                                    <th>Producto Comprado</th>
                                    <th>Cant / Subtotal</th>
                                    <th>Estado de Entrega</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="detalle in misPedidos" :key="detalle.id">
                                    <td style="font-size: 13px; color:#555;">{{ new Date(detalle.created_at).toLocaleString() }}</td>
                                    <td>
                                        <div style="font-size:13px;">
                                            <strong>Tel:</strong> {{ detalle.pedidos?.telefono_contacto }}<br>
                                            <strong>Dirección:</strong> {{ detalle.pedidos?.direccion_envio?.calle_principal || 'No especificada' }}, {{ detalle.pedidos?.direccion_envio?.ciudad }}
                                        </div>
                                    </td>
                                    <td>
                                        <div style="display:flex; align-items:center; gap: 10px;">
                                            <img v-if="detalle.productos?.imagen_url" :src="detalle.productos.imagen_url" style="width:40px; height:40px; border-radius:5px; object-fit:cover;">
                                            <span style="font-weight:600;">{{ detalle.productos?.nombre || 'Producto Desconocido' }}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style="display:block;">{{ detalle.cantidad }}x - <strong>${{ detalle.precio_unitario }}</strong></span>
                                        <span style="color:#F05A22; font-weight:bold; font-size:15px;">Total: ${{ detalle.subtotal }}</span>
                                    </td>
                                    <td>
                                        <select 
                                            class="premium-select" 
                                            style="padding: 6px 12px; font-size: 13px;"
                                            v-model="detalle.estado_proveedor" 
                                            @change="actualizarEstadoPedido(detalle.id, detalle.estado_proveedor)">
                                            <option value="pendiente">🕒 Pendiente</option>
                                            <option value="preparando">📦 Preparando</option>
                                            <option value="en_camino">🚚 En Camino</option>
                                            <option value="entregado">✅ Entregado</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr v-if="misPedidos.length === 0">
                                    <td colspan="5" class="empty-state">
                                        <i class="fa-solid fa-clipboard-list"></i>
                                        <p>Aún no tienes pedidos registrados.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    </div>

    <!-- Modal Nuevo/Editar Producto (Estilo Premium) -->
    <Transition name="fade">
        <div class="premium-modal-overlay" v-if="isModalOpen" @click.self="cerrarModalProducto">
            <div class="premium-modal-content">
                <div class="modal-top">
                    <h2>{{ modalMode === 'create' ? 'Nuevo Producto' : 'Editar Producto' }}</h2>
                    <button class="modal-close-btn" @click="cerrarModalProducto">×</button>
                </div>

                <form @submit.prevent="guardarProducto" class="premium-form horizontal-form">
                    <div class="modal-tabs">
                        <button type="button" :class="['modal-tab-btn', { active: modalTab === 'general' }]" @click="modalTab = 'general'">Datos Generales</button>
                        <button type="button" :class="['modal-tab-btn', { active: modalTab === 'descripcion' }]" @click="modalTab = 'descripcion'">Descripción</button>
                        <button type="button" :class="['modal-tab-btn', { active: modalTab === 'ficha' }]" @click="modalTab = 'ficha'">Ficha Técnica</button>
                    </div>

                    <div class="form-columns" v-if="modalTab === 'general'">
                        <!-- COLUMNA IZQUIERDA: DATOS -->
                        <div class="form-column">
                            <div class="form-group-full">
                                <label>Nombre del Producto *</label>
                                <input type="text" v-model="formData.nombre" required placeholder="Lomo Fino Premium">
                            </div>

                            <div class="form-row-2">
                                <div class="form-group">
                                    <label>Tipo de Corte *</label>
                                    <select v-model="formData.tipoCorte" required>
                                        <option value="">Selecciona...</option>
                                        <option value="premium">Premium</option>
                                        <option value="especial">Especial</option>
                                        <option value="normal">Normal</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Categoría *</label>
                                    <select v-model="formData.categoria" required>
                                        <option value="">Selecciona...</option>
                                        <option value="res">Res</option>
                                        <option value="cerdo">Cerdo</option>
                                        <option value="pollo">Pollo</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row-3">
                                <div class="form-group">
                                    <label>Precio ($) *</label>
                                    <input type="number" v-model.number="formData.precio" step="0.01" required>
                                </div>
                                <div class="form-group">
                                    <label>P. Oferta ($)</label>
                                    <input type="number" v-model.number="formData.precioOferta" step="0.01" placeholder="Vacío">
                                </div>
                                <div class="form-group">
                                    <label>Stock *</label>
                                    <input type="number" v-model.number="formData.stock" step="1" required placeholder="0">
                                </div>
                            </div>

                            <div class="form-row-3">
                                <div class="form-group">
                                    <label>Estado *</label>
                                    <select v-model="formData.estado" required>
                                        <option value="disponible">Disponible</option>
                                        <option value="agotado">Agotado</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>F. Camal *</label>
                                    <input type="date" v-model="formData.fechaCamal" required>
                                </div>
                                <div class="form-group">
                                    <label>Peso (kg) *</label>
                                    <input type="number" v-model.number="formData.peso" step="0.1" required placeholder="0.0">
                                </div>
                            </div>
                        </div>

                        <!-- COLUMNA DERECHA: IMAGENES Y CERTIFICADOS -->
                        <div class="form-column">
                            <label>Imagen del Producto *</label>
                            <div class="image-upload-zone" style="height: 150px;" @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="handleDrop">
                                <input type="file" ref="fileInput" @change="handleFileUpload" hidden accept="image/*">
                                <div class="upload-placeholder" v-if="!tempImagePreview">
                                    <i class="fa-solid fa-cloud-arrow-up"></i>
                                    <p>Arrastra aquí tus fotos</p>
                                    <span>Haz clic para subir (JPG, PNG)</span>
                                </div>
                                <div class="image-preview-container" v-else>
                                    <img :src="tempImagePreview" alt="Preview">
                                    <button type="button" class="btn-clear-img" @click.stop="clearImage">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="form-group-full" style="margin-top:20px;">
                                <label>Certificación del Producto</label>
                                <input type="text" v-model="formData.certificacion" placeholder="Ej: Certificación Sanitaria #12345">
                            </div>
                        </div>
                    </div>

                    <div v-if="modalTab === 'descripcion'" style="padding-top: 10px;">
                        <div class="form-group-full">
                            <label>Descripción detallada del producto</label>
                            <textarea 
                                v-model="formData.descripcion" 
                                maxlength="400" 
                                rows="6" 
                                placeholder="Describe el corte, sus beneficios, recomendaciones de uso..."
                                style="width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; resize: vertical; font-family: inherit;">
                            </textarea>
                            <span style="font-size: 12px; color: #888; float: right; margin-top: 5px;">{{ formData.descripcion?.length || 0 }}/400 caracteres</span>
                        </div>
                    </div>

                    <div class="form-columns" v-if="modalTab === 'ficha'">
                        <!-- COLUMNA IZQUIERDA: ALGUNOS DATOS FICHA -->
                        <div class="form-column">
                            <div class="form-row-2">
                                <div class="form-group">
                                    <label>Origen</label>
                                    <input type="text" v-model="formData.origen" placeholder="Ej: Haciendas Locales (Ecuador)">
                                </div>
                                <div class="form-group">
                                    <label>Tipo de Ganado</label>
                                    <input type="text" v-model="formData.tipoGanado" placeholder="Ej: Angus / Brangus">
                                </div>
                            </div>
                            <div class="form-row-2">
                                <div class="form-group">
                                    <label>Maduración</label>
                                    <input type="text" v-model="formData.maduracion" placeholder="Ej: 14 - 21 días">
                                </div>
                                <div class="form-group">
                                    <label>Presentación</label>
                                    <input type="text" v-model="formData.presentacion" placeholder="Ej: Empacado al vacío">
                                </div>
                            </div>
                            <div class="form-row-2">
                                <div class="form-group">
                                    <label>Vida Útil</label>
                                    <input type="text" v-model="formData.vidaUtil" placeholder="Ej: 30 días">
                                </div>
                                <div class="form-group">
                                    <label>Temp. Almacenamiento</label>
                                    <input type="text" v-model="formData.tempAlmacenamiento" placeholder="Ej: 0°C a 4°C">
                                </div>
                            </div>
                        </div>
                        
                        <!-- COLUMNA DERECHA: RESTO DE DATOS -->
                        <div class="form-column">
                            <div class="form-group-full">
                                <label>Alimentación</label>
                                <input type="text" v-model="formData.alimentacion" placeholder="Ej: Pastura natural y granos">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer-actions">
                        <button type="button" @click="cerrarModalProducto" class="btn-cancel">Cancelar</button>
                        <button type="submit" class="btn-save">
                            <i class="fa-solid fa-check"></i> 
                            {{ modalMode === 'create' ? 'Crear Producto' : 'Guardar Cambios' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>

    <!-- Modal Formas de Pago y Contacto -->
    <Transition name="fade">
        <div class="premium-modal-overlay" v-if="isModalPagoOpen" @click.self="cerrarModalPago">
            <div class="premium-modal-content" style="width: 850px;">
                <div class="modal-top">
                    <h2>Información de Pago y Contacto</h2>
                    <button class="modal-close-btn" @click="cerrarModalPago">×</button>
                </div>

                <form @submit.prevent="guardarPago" class="premium-form horizontal-form">
                    <div class="form-columns" style="gap: 30px;">
                        <!-- COLUMNA IZQUIERDA: DATOS BANCARIOS Y CONTACTO -->
                        <div class="form-column">
                            <h3 style="margin-bottom: 15px; font-size: 16px; color: #F05A22; border-bottom: 2px solid #fff5f2; padding-bottom: 5px;">Datos Bancarios</h3>
                            <div class="form-group-full">
                                <label>Cuenta Banco Pichincha</label>
                                <input type="text" v-model="formDataPago.cuentaPichincha" placeholder="Ej: Ahorros 2200... ">
                            </div>
                            <div class="form-group-full">
                                <label>Cuenta Banco Guayaquil</label>
                                <input type="text" v-model="formDataPago.cuentaGuayaquil" placeholder="Ej: Corriente 1100... ">
                            </div>

                            <h3 style="margin: 25px 0 15px; font-size: 16px; color: #F05A22; border-bottom: 2px solid #fff5f2; padding-bottom: 5px;">Datos de Contacto</h3>
                            <div class="form-row-2">
                                <div class="form-group">
                                    <label>Teléfono Principal</label>
                                    <input type="tel" v-model="formDataPago.telefono" placeholder="0999999999">
                                </div>
                                <div class="form-group">
                                    <label>Email de Soporte</label>
                                    <input type="email" v-model="formDataPago.email" placeholder="correo@ejemplo.com">
                                </div>
                            </div>
                            <div class="form-group-full">
                                <label>Dirección del Local</label>
                                <input type="text" v-model="formDataPago.direccion" placeholder="Calle Principal y Secundaria">
                            </div>
                        </div>

                        <!-- COLUMNA DERECHA: QRs -->
                        <div class="form-column">
                            <h3 style="margin-bottom: 15px; font-size: 16px; color: #F05A22; border-bottom: 2px solid #fff5f2; padding-bottom: 5px;">Códigos QR de Transferencia</h3>
                            
                            <label>QR Banco Pichincha</label>
                            <div class="image-upload-zone" style="height: 140px; margin-bottom: 20px;" @click="$refs.qrPichinchaInput.click()" @dragover.prevent @drop.prevent="handleDropQrPichincha">
                                <input type="file" ref="qrPichinchaInput" @change="handleFileUploadQrPichincha" hidden accept="image/*">
                                <div class="upload-placeholder" v-if="!tempQrPichincha" style="padding: 10px;">
                                    <i class="fa-solid fa-qrcode" style="font-size: 30px; margin-bottom: 10px;"></i>
                                    <p style="font-size: 13px;">Subir QR Pichincha</p>
                                </div>
                                <div class="image-preview-container" v-else>
                                    <img :src="tempQrPichincha" alt="QR Pichincha">
                                    <button type="button" class="btn-clear-img" style="width:28px; height:28px;" @click.stop="tempQrPichincha = null">
                                        <i class="fa-solid fa-xmark" style="font-size: 14px;"></i>
                                    </button>
                                </div>
                            </div>

                            <label>QR Banco Guayaquil</label>
                            <div class="image-upload-zone" style="height: 140px;" @click="$refs.qrGuayaquilInput.click()" @dragover.prevent @drop.prevent="handleDropQrGuayaquil">
                                <input type="file" ref="qrGuayaquilInput" @change="handleFileUploadQrGuayaquil" hidden accept="image/*">
                                <div class="upload-placeholder" v-if="!tempQrGuayaquil" style="padding: 10px;">
                                    <i class="fa-solid fa-qrcode" style="font-size: 30px; margin-bottom: 10px;"></i>
                                    <p style="font-size: 13px;">Subir QR Guayaquil</p>
                                </div>
                                <div class="image-preview-container" v-else>
                                    <img :src="tempQrGuayaquil" alt="QR Guayaquil">
                                    <button type="button" class="btn-clear-img" style="width:28px; height:28px;" @click.stop="tempQrGuayaquil = null">
                                        <i class="fa-solid fa-xmark" style="font-size: 14px;"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer-actions">
                        <button type="button" @click="cerrarModalPago" class="btn-cancel">Cancelar</button>
                        <button type="submit" class="btn-save">
                            <i class="fa-solid fa-save"></i> Guardar Configuración
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>

    <!-- Modal Certificaciones Legales -->
    <Transition name="fade">
        <div class="premium-modal-overlay" v-if="isModalCertOpen" @click.self="cerrarModalCert">
            <div class="premium-modal-content" style="width: 1000px;">
                <div class="modal-top">
                    <div style="display: flex; align-items:center; gap:15px;">
                        <i class="fa-solid fa-file-shield" style="font-size: 32px; color: #F05A22;"></i>
                        <div>
                            <h2 style="margin:0; font-size: 24px;">Certificaciones Legales</h2>
                            <p style="margin:0; font-size: 13px; color: #888;">Documentación técnica indispensable para operar</p>
                        </div>
                    </div>
                    <button class="modal-close-btn" @click="cerrarModalCert">×</button>
                </div>

                <div class="cert-grid">
                    <!-- SECCION 1: CARNE FRESCA -->
                    <div class="cert-card">
                        <div class="cert-info">
                            <span class="cert-category">PROVEEDOR DE:</span>
                            <h3 class="cert-title">Carne Fresca</h3>
                            <div class="cert-req">
                                <strong>Requisito:</strong> CSOM + MABIO
                                <span class="cert-entity">Entidad: Agrocalidad</span>
                            </div>
                        </div>
                        <div class="pdf-upload-zone" @click="$refs.cert1Input.click()">
                            <input type="file" ref="cert1Input" hidden accept=".pdf" @change="e => handlePdfUpload(e, 1)">
                            <div class="pdf-placeholder" v-if="!tempCerts[1]">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>Subir PDF</span>
                            </div>
                            <div class="pdf-active" v-else>
                                <i class="fa-solid fa-circle-check"></i>
                                <span class="file-name">{{ tempCerts[1].name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- SECCION 2: ANIMAL VIVO -->
                    <div class="cert-card">
                        <div class="cert-info">
                            <span class="cert-category">PROVEEDOR DE:</span>
                            <h3 class="cert-title">Animal Vivo</h3>
                            <div class="cert-req">
                                <strong>Requisito:</strong> BPA + Guía de Movilización
                                <span class="cert-entity">Entidad: Agrocalidad</span>
                            </div>
                        </div>
                        <div class="pdf-upload-zone" @click="$refs.cert2Input.click()">
                            <input type="file" ref="cert2Input" hidden accept=".pdf" @change="e => handlePdfUpload(e, 2)">
                            <div class="pdf-placeholder" v-if="!tempCerts[2]">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>Subir PDF</span>
                            </div>
                            <div class="pdf-active" v-else>
                                <i class="fa-solid fa-circle-check"></i>
                                <span class="file-name">{{ tempCerts[2].name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- SECCION 3: PROCESADOS -->
                    <div class="cert-card">
                        <div class="cert-info">
                            <span class="cert-category">PROVEEDOR DE:</span>
                            <h3 class="cert-title">Procesados</h3>
                            <div class="cert-req">
                                <strong>Requisito:</strong> BPM + Notificación Sanitaria
                                <span class="cert-entity">Entidad: ARCSA</span>
                            </div>
                        </div>
                        <div class="pdf-upload-zone" @click="$refs.cert3Input.click()">
                            <input type="file" ref="cert3Input" hidden accept=".pdf" @change="e => handlePdfUpload(e, 3)">
                            <div class="pdf-placeholder" v-if="!tempCerts[3]">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>Subir PDF</span>
                            </div>
                            <div class="pdf-active" v-else>
                                <i class="fa-solid fa-circle-check"></i>
                                <span class="file-name">{{ tempCerts[3].name }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- SECCION 4: OTROS -->
                    <div class="cert-card">
                        <div class="cert-info">
                            <span class="cert-category">PROVEEDOR DE:</span>
                            <h3 class="cert-title">Otras Certificaciones</h3>
                            <div class="cert-req">
                                <strong>Requisito:</strong> RUC / RISE / Patente
                                <span class="cert-entity">Entidad: SRI / Municipio</span>
                            </div>
                        </div>
                        <div class="pdf-upload-zone" @click="$refs.cert4Input.click()">
                            <input type="file" ref="cert4Input" hidden accept=".pdf" @change="e => handlePdfUpload(e, 4)">
                            <div class="pdf-placeholder" v-if="!tempCerts[4]">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>Subir PDF</span>
                            </div>
                            <div class="pdf-active" v-else>
                                <i class="fa-solid fa-circle-check"></i>
                                <span class="file-name">{{ tempCerts[4].name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer-actions" style="border-top:1px solid #eee; margin-top:30px; padding-top:20px;">
                    <button type="button" @click="cerrarModalCert" class="btn-cancel">Cerrar</button>
                    <button type="button" @click="guardarCerts" class="btn-save">
                        <i class="fa-solid fa-cloud-upload"></i> Guardar Todo
                    </button>
                </div>
            </div>
        </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import lomoImg from '@/assets/img/ofertas/lomo.png'
import defaultProviderImg from '@/assets/img/proveedores/provedor_1.png'

const proveedorPerfil = ref({
    nombre: 'Cargando...',
    logo: null
})

const filtroNombre = ref('')
const filtroCategoria = ref('')
const filtroEstado = ref('')
const isSearchActive = ref(false)

const currentTab = ref('productos')
const misPedidos = ref([])

const isModalOpen = ref(false)
const modalMode = ref('create')
const modalTab = ref('general')

const formData = ref({
    nombre: '',
    tipoCorte: '',
    categoria: '',
    precio: 0,
    precioOferta: null,
    estado: 'disponible',
    stock: 0,
    certificacion: '',
    fechaCamal: '',
    peso: 0,
    descripcion: '',
    origen: '',
    tipoGanado: '',
    maduracion: '',
    presentacion: '',
    vidaUtil: '',
    tempAlmacenamiento: '',
    alimentacion: ''
})

const tempImagePreview = ref(null)
const imageFileToUpload = ref(null)

const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
        tempImagePreview.value = URL.createObjectURL(file)
        imageFileToUpload.value = file
    }
}

const handleDrop = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) {
        tempImagePreview.value = URL.createObjectURL(file)
        imageFileToUpload.value = file
    }
}

// Y para limpiar la imagen con el botón de "x"
const clearImage = () => {
    tempImagePreview.value = null
    imageFileToUpload.value = null
}

/* LOGICA DEL MODAL DE PAGOS Y CONTACTO */
const isModalPagoOpen = ref(false)
const formDataPago = ref({
    cuentaPichincha: '',
    cuentaGuayaquil: '',
    telefono: '',
    email: '',
    direccion: ''
})

const tempQrPichincha = ref(null)
const tempQrGuayaquil = ref(null)

const abrirModalPago = () => {
    isModalPagoOpen.value = true
}

const cerrarModalPago = () => {
    isModalPagoOpen.value = false
}

const cargarDatosProveedor = async () => {
    try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData?.user) return
        
        proveedorPerfil.value.nombre = authData.user.user_metadata?.full_name || 'Proveedor Carnico'
        
        const { data, error } = await supabase
            .from('proveedor_info')
            .select('*')
            .eq('proveedor_id', authData.user.id)
            .single() // Solo debe haber una fila de configuración por proveedor
            
        // El error PGRST116 significa que la fila todavía no existe (es un proveedor nuevo), lo ignoramos.
        if (error && error.code !== 'PGRST116') throw error 
        
        if (data) {
            proveedorPerfil.value.logo = data.logo_url || null
            
            formDataPago.value = {
                cuentaPichincha: data.cuenta_pichincha || '',
                cuentaGuayaquil: data.cuenta_guayaquil || '',
                telefono: data.telefono || '',
                email: data.email_soporte || '',
                direccion: data.direccion || ''
            }

            // Poblamos las certificaciones que ya existan en la BD
            if (data.cert_1) tempCerts.value[1] = { name: 'Registrado en sistema' }
            if (data.cert_2) tempCerts.value[2] = { name: 'Registrado en sistema' }
            if (data.cert_3) tempCerts.value[3] = { name: 'Registrado en sistema' }
            if (data.cert_4) tempCerts.value[4] = { name: 'Registrado en sistema' }
        }
    } catch (error) {
        console.error('Error al cargar la información del proveedor:', error)
    }
}

const guardarPago = async () => {
    try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData?.user) {
            alert('Debes iniciar sesión para ejecutar esta acción.')
            return
        }

        // El UPSERT es fenomenal: Si el proveedor no tenía registros, lo inserta. Si ya tenía, lo actualiza.
        const { error } = await supabase.from('proveedor_info').upsert({
            proveedor_id: authData.user.id, // Supabase necesita este id para saber si lo inserta o lo actualiza
            cuenta_pichincha: formDataPago.value.cuentaPichincha,
            cuenta_guayaquil: formDataPago.value.cuentaGuayaquil,
            telefono: formDataPago.value.telefono,
            email_soporte: formDataPago.value.email,
            direccion: formDataPago.value.direccion
        })

        if (error) throw error
        
        alert('✅ Información de pago y contacto respaldada exitosamente en la nube')
        cerrarModalPago()
    } catch (error) {
        console.error('Error al guardar datos de pago:', error)
        alert('❌ No se pudo guardar la información: ' + error.message)
    }
}

const handleFileUploadQrPichincha = (e) => {
    const file = e.target.files[0]
    if (file) tempQrPichincha.value = URL.createObjectURL(file)
}

const handleDropQrPichincha = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) tempQrPichincha.value = URL.createObjectURL(file)
}

const handleFileUploadQrGuayaquil = (e) => {
    const file = e.target.files[0]
    if (file) tempQrGuayaquil.value = URL.createObjectURL(file)
}

const handleDropQrGuayaquil = (e) => {
    const file = e.dataTransfer.files[0]
    if (file) tempQrGuayaquil.value = URL.createObjectURL(file)
}

/* LOGICA DEL MODAL DE CERTIFICACIONES */
const isModalCertOpen = ref(false)
const tempCerts = ref({
    1: null,
    2: null,
    3: null,
    4: null
})

const abrirModalCert = () => isModalCertOpen.value = true
const cerrarModalCert = () => isModalCertOpen.value = false

const handlePdfUpload = (e, index) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
        tempCerts.value[index] = {
            name: file.name,
            file: file
        }
    } else {
        alert('Por favor selecciona un archivo PDF válido')
    }
}

const guardarCerts = async () => {
    try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData?.user) {
            alert('Debes iniciar sesión para subir certificaciones.')
            return
        }

        let subidas = 0;
        let updateData = { proveedor_id: authData.user.id };

        // Recorremos los 4 posibles archivos
        for (const index of [1, 2, 3, 4]) {
            const certData = tempCerts.value[index];
            // Si hay un archivo seleccionado y aún no se ha subido
            if (certData && certData.file) {
                // Generamos un nombre único: id_del_proveedor/cert_1_timestamp.pdf
                const ext = certData.name.split('.').pop();
                const fileName = `${authData.user.id}/cert_${index}_${Date.now()}.${ext}`;
                
                const { data, error: uploadError } = await supabase.storage
                    .from('certificaciones')
                    .upload(fileName, certData.file, {
                        cacheControl: '3600',
                        upsert: true // reemplaza el archivo si tiene el mismo nombre
                    });
                    
                if (uploadError) throw uploadError;
                
                subidas++;
                
                // Obtener la URL pública del PDF subido
                const { data: publicUrlData } = supabase.storage.from('certificaciones').getPublicUrl(fileName);
                
                // Agregamos la URL según el índice de certificación
                updateData[`cert_${index}`] = publicUrlData.publicUrl;
            }
        }

        if (subidas > 0) {
            // Guardamos todas las URLs obtenidas de los certificados subidos en proveedor_info
            const { error: dbError } = await supabase.from('proveedor_info').upsert(updateData);
            
            if (dbError) throw dbError;

            alert('✅ Certificaciones subidas correctamente a Supabase y registradas. Serán revisadas por nuestro equipo técnico.')
            cerrarModalCert()
            await cargarDatosProveedor() // Refrescamos todo y mostramos el check verde
        } else {
            alert('No has seleccionado ningún archivo nuevo para subir.')
        }

    } catch (error) {
        console.error('Error al subir certificaciones:', error)
        alert('❌ Hubo un error al subir los archivos: ' + error.message)
    }
}

const subirLogoProveedor = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData?.user) return
        
        const ext = file.name.split('.').pop()
        const fileName = `${authData.user.id}/logo_${Date.now()}.${ext}`
        
        const { error: uploadError } = await supabase.storage
            .from('proveedores_logos')
            .upload(fileName, file, { upsert: true })
            
        if (uploadError) throw uploadError
        
        const { data: publicUrlData } = supabase.storage.from('proveedores_logos').getPublicUrl(fileName)
        const logoUrl = publicUrlData.publicUrl
        
        const { error: dbError } = await supabase.from('proveedor_info').upsert({
            proveedor_id: authData.user.id,
            logo_url: logoUrl
        })
        
        if (dbError) throw dbError
        
        proveedorPerfil.value.logo = logoUrl
    } catch (error) {
        console.error('Error al subir logo:', error)
        alert('Asegúrate de que el bucket de almacenamiento "proveedores_logos" esté creado para que tu logo se guarde correctamente.')
    }
}

const productos = ref([])

// Calculamos automáticamente en tiempo real cuántos productos están marcados como 'Disponible'
const productosActivos = computed(() => {
    return productos.value.filter(p => p.estado.toLowerCase() === 'disponible').length
})

// Función para traer productos reales de tu proveedor actual
const cargarMisProductos = async () => {
    try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData?.user) return
        
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('proveedor_id', authData.user.id)
            
        if (error) throw error
        
        // Mapeamos lo que llega de la base de datos para que encaje 100% con tu diseño UI
        if (data) {
            productos.value = data.map(p => ({
                id: p.id,
                nombre: p.nombre,
                // Capitalizamos la primera letra (ej. "premium" -> "Premium") para la UI
                tipo: p.tipo_corte ? (p.tipo_corte.charAt(0).toUpperCase() + p.tipo_corte.slice(1)) : 'Normal', 
                fecha: p.fecha_camal ? new Date(p.fecha_camal).toLocaleDateString() : 'N/A', 
                trazabilidad: '', // Eliminamos el código inventado a petición tuya
                peso: p.peso || 0,
                precio: p.precio,
                estado: p.estado ? (p.estado.charAt(0).toUpperCase() + p.estado.slice(1)) : 'Disponible',
                img: p.imagen_url || lomoImg, // Fallback genérico a tu imagen de la carpeta local
                categoria: p.categoria || '',
                // Valores ocultos originales para poder recuperarlos en el formulario de edición:
                _raw_fechaCamal: p.fecha_camal || '',
                _raw_certificacion: p.certificacion || '',
                _raw_peso: p.peso || 0,
                _raw_tipoCorte: p.tipo_corte || '',
                _raw_estado: p.estado || 'disponible',
                _raw_origen: p.origen || '',
                _raw_tipoGanado: p.tipo_ganado || '',
                _raw_maduracion: p.maduracion || '',
                _raw_presentacion: p.presentacion || '',
                _raw_vidaUtil: p.vida_util || '',
                _raw_tempAlmacenamiento: p.temp_almacenamiento || '',
                _raw_alimentacion: p.alimentacion || '',
                _raw_precioOferta: p.precio_oferta || null,
                _raw_stock: p.stock || 0,
                _raw_descripcion: p.descripcion || ''
            }))
        }
    } catch (error) {
        console.error('Error cargando la lista de productos:', error)
    }
}

onMounted(() => {
    cargarMisProductos()
    cargarDatosProveedor()
    cargarMisPedidos()
})

const cargarMisPedidos = async () => {
    try {
        const { data: authData } = await supabase.auth.getUser()
        if (!authData?.user) return
        
        const { data, error } = await supabase
            .from('detalles_pedido')
            .select(`
                id,
                cantidad,
                precio_unitario,
                subtotal,
                estado_proveedor,
                created_at,
                pedidos!inner(
                    id,
                    cliente_id,
                    estado,
                    direccion_envio,
                    telefono_contacto,
                    created_at
                ),
                productos!inner(
                    nombre,
                    imagen_url
                )
            `)
            .eq('proveedor_id', authData.user.id)
            .order('created_at', { ascending: false })
            
        if (error) throw error
        
        if (data) {
            misPedidos.value = data
        }
    } catch (e) {
        console.error('Error cargando pedidos', e)
    }
}

const actualizarEstadoPedido = async (detalleId, nuevoEstado) => {
    try {
        const { error } = await supabase
            .from('detalles_pedido')
            .update({ estado_proveedor: nuevoEstado })
            .eq('id', detalleId)
            
        if (error) throw error
        alert('✅ Estado del pedido actualizado exitosamente')
    } catch(e) {
        console.error('Error al actualizar estado:', e)
        alert('❌ No se pudo actualizar el estado del pedido.')
    }
}

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
    modalTab.value = 'general'
    formData.value = {
        id: null,
        nombre: '',
        tipoCorte: '',
        categoria: '',
        precio: 0,
        peso: 0,
        fechaCamal: '',
        certificacion: '',
        estado: 'disponible',
        origen: '',
        tipoGanado: '',
        maduracion: '',
        presentacion: '',
        vidaUtil: '',
        tempAlmacenamiento: '',
        alimentacion: '',
        precioOferta: null,
        stock: 0,
        descripcion: ''
    }
    tempImagePreview.value = null
    imageFileToUpload.value = null
    isModalOpen.value = true
}

const editarProducto = (id) => {
    const p = productos.value.find(x => x.id === id)
    if (p) {
        modalMode.value = 'edit'
        modalTab.value = 'general'
        formData.value = {
            id: p.id,
            nombre: p.nombre,
            tipoCorte: p._raw_tipoCorte,
            precio: p.precio,
            estado: p._raw_estado,
            categoria: p.categoria,
            peso: p._raw_peso,
            fechaCamal: p._raw_fechaCamal,
            certificacion: p._raw_certificacion,
            origen: p._raw_origen,
            tipoGanado: p._raw_tipoGanado,
            maduracion: p._raw_maduracion,
            presentacion: p._raw_presentacion,
            vidaUtil: p._raw_vidaUtil,
            tempAlmacenamiento: p._raw_tempAlmacenamiento,
            alimentacion: p._raw_alimentacion,
            precioOferta: p._raw_precioOferta,
            stock: p._raw_stock,
            descripcion: p._raw_descripcion
        }
        tempImagePreview.value = p.img !== lomoImg ? p.img : null
        imageFileToUpload.value = null
        isModalOpen.value = true
    }
}

const cerrarModalProducto = () => {
    isModalOpen.value = false
}

const guardarProducto = async () => {
    try {
        // Obtenemos el usuario que inició sesión
        const { data: authData, error: authError } = await supabase.auth.getUser()
        
        if (authError || !authData?.user) {
            alert('Debes iniciar sesión como proveedor para agregar productos.')
            return
        }

        let imageUrl = undefined

        // Si se seleccionó un archivo nuevo, lo subimos
        if (imageFileToUpload.value) {
            const ext = imageFileToUpload.value.name.split('.').pop()
            const fileName = `${authData.user.id}/prod_${Date.now()}.${ext}`
            
            const { error: uploadError } = await supabase.storage
                .from('productos')
                .upload(fileName, imageFileToUpload.value, {
                    upsert: true
                })
                
            if (uploadError) throw uploadError
            
            // Obtenemos la URL pública de la foto recién subida
            const { data: publicUrlData } = supabase.storage.from('productos').getPublicUrl(fileName)
            imageUrl = publicUrlData.publicUrl
        }

        if (modalMode.value === 'create') {
            const insertData = {
                nombre: formData.value.nombre,
                tipo_corte: formData.value.tipoCorte,
                categoria: formData.value.categoria,
                precio: formData.value.precio,
                estado: formData.value.estado,
                fecha_camal: formData.value.fechaCamal,
                peso: formData.value.peso,
                certificacion: formData.value.certificacion,
                origen: formData.value.origen,
                tipo_ganado: formData.value.tipoGanado,
                maduracion: formData.value.maduracion,
                presentacion: formData.value.presentacion,
                vida_util: formData.value.vidaUtil,
                temp_almacenamiento: formData.value.tempAlmacenamiento,
                alimentacion: formData.value.alimentacion,
                precio_oferta: formData.value.precioOferta || null,
                stock: formData.value.stock || 0,
                descripcion: formData.value.descripcion || '',
                proveedor_id: authData.user.id
            }
            if (imageUrl) insertData.imagen_url = imageUrl

            // Mandamos los datos a la tabla productos de Supabase
            const { error } = await supabase.from('productos').insert(insertData)

            if (error) throw error
            alert('✅ Producto creado exitosamente en la Base de Datos')
        } else {
            const updateData = {
                nombre: formData.value.nombre,
                tipo_corte: formData.value.tipoCorte,
                categoria: formData.value.categoria,
                precio: formData.value.precio,
                estado: formData.value.estado,
                fecha_camal: formData.value.fechaCamal,
                peso: formData.value.peso,
                certificacion: formData.value.certificacion,
                origen: formData.value.origen,
                tipo_ganado: formData.value.tipoGanado,
                maduracion: formData.value.maduracion,
                presentacion: formData.value.presentacion,
                vida_util: formData.value.vidaUtil,
                temp_almacenamiento: formData.value.tempAlmacenamiento,
                alimentacion: formData.value.alimentacion,
                precio_oferta: formData.value.precioOferta || null,
                stock: formData.value.stock || 0,
                descripcion: formData.value.descripcion || ''
            }
            if (imageUrl) updateData.imagen_url = imageUrl

            // Actualizamos un producto existente que tiene el id guardado
            const { error } = await supabase.from('productos').update(updateData).eq('id', formData.value.id)

            if (error) throw error
            alert(`✅ Producto actualizado exitosamente`)
        }
        
        await cargarMisProductos() // 🎉 Refresca la tabla automáticamente después de crear o editar
        cerrarModalProducto()
    } catch (error) {
        console.error('Error al guardar el producto:', error)
        alert('❌ No se pudo guardar el producto: ' + error.message)
    }
}

const eliminarProducto = async (id) => {
    if(confirm('¿Estás seguro de eliminar este producto definitivamente de la base de datos?')) {
        try {
            const { error } = await supabase.from('productos').delete().eq('id', id)
            
            if (error) throw error
            
            // Lo removemos de la tabla visual de inmediato
            productos.value = productos.value.filter(p => p.id !== id)
            alert('🗑️ Producto eliminado de Supabase')
        } catch (error) {
            console.error('Error al borrar', error)
            alert('❌ No se pudo eliminar el producto: ' + error.message)
        }
    }
}
</script>

<style scoped>
.proveedor-view {
    background: #f8f9fa;
    min-height: 100vh;
    padding: 40px 0;
}

.dashboard-layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 30px;
    align-items: flex-start;
}

/* SIDEBAR STYLES */
.provider-sidebar {
    background: white;
    border-radius: 24px;
    padding: 30px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
}

.sidebar-sticky {
    position: sticky;
    top: 100px;
}

.provider-badge-container {
    position: relative;
    width: 120px;
    margin: 0 auto 20px;
}

.provider-logo-large {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.verified-badge {
    position: absolute;
    bottom: -5px;
    right: 5px;
    background: #4caf50;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    border: 2px solid #fff;
    z-index: 5;
}

.btn-edit-logo {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: white;
    border: 2px solid #eee;
    color: #F05A22;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: all 0.2s;
    z-index: 10;
}

.btn-edit-logo:hover {
    background: #F05A22;
    color: white;
    transform: scale(1.1);
    border-color: #F05A22;
}

.provider-info-header {
    text-align: center;
    margin-bottom: 25px;
}

.provider-info-header h1 {
    font-size: 22px;
    margin: 0;
    color: #333;
}

.provider-tagline {
    color: #888;
    font-size: 14px;
    margin: 5px 0 0;
}

.provider-stats-brief {
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 25px;
}

.brief-item {
    text-align: center;
}

.brief-item .label {
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    color: #aaa;
    letter-spacing: 0.5px;
}

.brief-item .value {
    font-weight: 700;
    color: #444;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 25px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    border: none;
    background: transparent;
    border-radius: 12px;
    color: #666;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
}

.nav-item i { width: 20px; }

.nav-item:hover { background: #fdf2ee; color: #F05A22; }
.nav-item.active { background: #fdf2ee; color: #F05A22; }

.btn-new-product {
    width: 100%;
    padding: 14px;
    background: #F05A22;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(240, 90, 34, 0.2);
    transition: all 0.3s;
}

.btn-new-product:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(240, 90, 34, 0.3); }

/* MAIN DASHBOARD STYLES */
.section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
}

.dashboard-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.stat-card {
    background: white;
    padding: 24px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.02);
}

.stat-icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: #e3f2fd;
    color: #1a73e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.stat-icon.orange { background: #fff3e0; color: #fb8c00; }
.stat-icon.sky { background: #e0f7fa; color: #00acc1; }

.stat-label { font-size: 13px; color: #888; font-weight: 600; margin-bottom: 4px; }
.stat-value { font-size: 24px; font-weight: 800; color: #333; }
.stat-trend { font-size: 11px; margin-top: 4px; }
.trend-up { color: #4caf50; }

/* TABLE STYLES */
.table-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
}

.table-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-box {
    position: relative;
    width: 250px;
}

.search-box i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
}

.search-box input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border-radius: 12px;
    border: 1.5px solid #f0f0f0;
    background: white;
    font-size: 14px;
    transition: all 0.3s;
}

.search-box input:focus {
    outline: none;
    border-color: #F05A22;
    box-shadow: 0 0 0 4px rgba(240, 90, 34, 0.05);
}

.btn-new-product-table {
    padding: 10px 20px;
    background: #F05A22;
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(240, 90, 34, 0.2);
    transition: all 0.3s;
    white-space: nowrap;
}

.btn-new-product-table:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(240, 90, 34, 0.3);
}

.btn-new-product-table i {
    font-size: 14px;
}

.table-container-card {
    background: white;
    border-radius: 24px;
    padding: 25px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.02);
}

.table-filters-row {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}

.premium-select {
    padding: 8px 15px;
    border-radius: 10px;
    border: 1px solid #eee;
    color: #666;
    font-weight: 600;
}

.premium-table-wrapper { overflow-x: auto; }

.premium-table {
    width: 100%;
    border-collapse: collapse;
}

.premium-table th {
    text-align: left;
    padding: 15px;
    font-size: 12px;
    text-transform: uppercase;
    color: #aaa;
    letter-spacing: 1px;
    border-bottom: 1px solid #f5f5f5;
}

.premium-table td { padding: 15px; border-bottom: 1px solid #f5f5f5; vertical-align: middle; }

.product-cell { display: flex; align-items: center; gap: 15px; }
.table-prod-img { width: 45px; height: 45px; border-radius: 10px; object-fit: cover; }

.product-min-info { display: flex; flex-direction: column; }
.p-name { font-weight: 700; color: #333; }
.p-sku { font-size: 10px; color: #bbb; }

.p-badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
}

.badge-premium { background: #fdf2ee; color: #F05A22; }
.badge-especial { background: #e3f2fd; color: #1a73e8; }
.badge-normal { background: #f5f5f5; color: #666; }

.status-pill {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
}

.status-disponible { background: #e8f5e9; color: #2e7d32; }
.status-agotado { background: #ffebee; color: #c62828; }

.table-actions-cell {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-action {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: 14px;
}

.btn-action.edit { background: #f1f3f4; color: #5f6368; }
.btn-action.delete { background: #ffebee; color: #c62828; }
.btn-action:hover { transform: scale(1.1); }

/* MODAL PREMIUM */
.premium-modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(5px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.premium-modal-content {
    background: white;
    width: 900px;
    max-width: 95vw;
    border-radius: 24px;
    padding: 35px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-tabs {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 5px;
}

.modal-tab-btn {
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 700;
    color: #aaa;
    cursor: pointer;
    padding: 5px 10px;
    position: relative;
    transition: all 0.3s;
}

.modal-tab-btn.active {
    color: #F05A22;
}

.modal-tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: -7px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #F05A22;
    border-radius: 3px;
}

.form-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 20px;
}

.form-group-full {
    margin-bottom: 20px;
}

.form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.form-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.large-zone {
    height: 300px !important;
}

.modal-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f5f5f5;
}

.modal-top h2 { font-size: 24px; margin: 0; color: #333; }
.modal-close-btn { background: none; border: none; font-size: 32px; cursor: pointer; color: #ccc; transition: color 0.2s; }
.modal-close-btn:hover { color: #e63946; }

.premium-form label { display: block; margin-bottom: 10px; font-weight: 700; font-size: 14px; color: #444; }

.premium-form input, .premium-form select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    background: #fdfdfd;
    font-size: 14px;
    transition: all 0.3s;
}

.premium-form input:focus, .premium-form select:focus {
    outline: none;
    border-color: #F05A22;
    background: white;
}

.modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
}

.btn-cancel { padding: 12px 25px; border: none; background: #f5f5f5; border-radius: 12px; font-weight: 700; cursor: pointer; }
.btn-save { padding: 12px 25px; border: none; background: #F05A22; color: white; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
.btn-save:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(240, 90, 34, 0.3); }
.btn-save i { margin-right: 8px; }

/* CERTIFICATIONS MODAL STYLES */
.cert-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 10px;
}

.cert-card {
    background: #fcfcfc;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
}

.cert-card:hover {
    border-color: #F05A22;
    background: #fffafa;
    transform: translateY(-2px);
}

.cert-info { flex: 1; }

.cert-category {
    font-size: 10px;
    font-weight: 800;
    color: #bbb;
    letter-spacing: 1px;
}

.cert-title {
    font-size: 18px;
    margin: 5px 0 12px;
    color: #333;
}

.cert-req {
    font-size: 13px;
    color: #666;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cert-entity {
    font-size: 12px;
    color: #F05A22;
    font-weight: 600;
}

.pdf-upload-zone {
    width: 130px;
    height: 100px;
    border: 2px dashed #ddd;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: white;
    transition: all 0.3s;
}

.pdf-upload-zone:hover {
    border-color: #F05A22;
    background: #fff5f2;
}

.pdf-placeholder {
    text-align: center;
    color: #aaa;
}

.pdf-placeholder i {
    font-size: 24px;
    margin-bottom: 8px;
    color: #ddd;
}

.pdf-placeholder span {
    font-size: 11px;
    font-weight: 700;
}

.pdf-active {
    text-align: center;
    color: #2e7d32;
    padding: 10px;
}

.pdf-active i {
    font-size: 24px;
    margin-bottom: 8px;
}

.file-name {
    font-size: 10px;
    font-weight: 700;
    display: block;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* IMAGE UPLOAD ZONE */
.image-upload-zone {
    width: 100%;
    height: 180px;
    border: 2px dashed #eee;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #fdfdfd;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
}

.image-upload-zone:hover {
    border-color: #F05A22;
    background: #fff5f2;
}

.upload-placeholder {
    text-align: center;
    color: #aaa;
}

.upload-placeholder i {
    font-size: 40px;
    margin-bottom: 15px;
    color: #F05A22;
    opacity: 0.7;
}

.upload-placeholder p {
    font-weight: 700;
    margin: 0;
    color: #444;
}

.upload-placeholder span {
    font-size: 11px;
    display: block;
    margin-top: 5px;
}

.image-preview-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.image-preview-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
}

.btn-clear-img {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    border: 1px solid #eee;
    color: #e63946;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.2s;
}

.btn-clear-img:hover {
    background: #e63946;
    color: white;
}

/* ANIMACIONES */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.mobile-stats-section {
    display: none;
}

@media (max-width: 1024px) {
    /* Ajustar Contenedor al ancho completo en móvil */
    .dashboard-layout { grid-template-columns: 1fr; gap: 0; }
    
    .sidebar-sticky { 
        position: relative; 
        top: 0; 
        display: flex;
        flex-direction: column;
        padding: 15px;
        border-radius: 0;
    }

    /* Ocultar Experiencia y Especialidad */
    .provider-stats-brief { display: none; }
    
    /* Ocultar vista general de desktop */
    .desktop-stats { display: none; }

    /* Estructura del card de Proveedor en Mobile */
    
    /* 1. Imagen, Nombre y Badge en una sola fila */
    .provider-profile-mobile {
        order: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        text-align: left;
        width: 100%;
    }

    .provider-badge-container {
        display: contents; /* Rompe la caja para que imagen y badge participen en el flex superior */
    }

    .provider-logo-large {
        order: 1;
        display: block !important;
        width: 50px !important;
        height: 35px !important;
        border-radius: 4px !important; /* Rectangular sutil */
        border: 1px solid #ddd !important;
        box-shadow: none !important;
        object-fit: cover;
        flex-shrink: 0;
    }

    .provider-info-header {
        order: 2;
        margin: 0;
        text-align: left;
        flex-shrink: 0;
        display: block;
    }

    .provider-info-header h1 {
        font-size: 16px;
        margin: 0;
        font-weight: 800;
        white-space: nowrap;
    }

    .verified-badge {
        order: 3;
        position: relative !important;
        bottom: auto !important;
        right: auto !important;
        display: inline-flex !important;
        align-items: center;
        gap: 4px;
        background: #5cb85c;
        color: white;
        padding: 3px 8px 3px 4px !important;
        border-radius: 15px !important;
        font-size: 9px !important;
        font-weight: 700;
        flex-shrink: 0;
        border: none !important; /* Quitar borde del desktop */
    }

    .verified-badge i {
        background: white;
        color: #5cb85c;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 7px;
    }

    .provider-info-header .provider-tagline {
        display: none;
    }

    /* 2. Botones de Navegación */
    .sidebar-nav {
        order: 2;
        flex-direction: row;
        overflow-x: auto;
        gap: 10px;
        width: 100%;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        border: none;
    }
    
    .sidebar-nav::-webkit-scrollbar {
        display: none; /* Ocultar scrollbar visual pero mantener funcionalidad */
    }

    .nav-item {
        white-space: nowrap;
        padding: 8px 12px;
        font-size: 13px;
        background: #f8f9fa;
        flex: 1;
        text-align: center;
        justify-content: center;
    }

    /* 3. Vista general debajo y vertical (Oculto según solicitud) */
    .mobile-stats-section {
        display: none;
    }

    .mobile-stat {
        padding: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        border: 1px solid #f9f9f9;
        margin-bottom: 0;
    }
    
    .dashboard-main {
        margin-top: 20px; /* Separación solicitada */
    }

    /* Table Header Mobile Layout */
    .table-header-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 15px;
    }

    .section-title {
        font-size: 18px;
        margin-bottom: 0;
    }

    .table-actions {
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    .search-box {
        width: 40px;
        height: 40px;
        padding: 0;
        justify-content: center;
        border-radius: 50%;
        min-width: unset;
        flex: none;
    }
    
    .search-box:not(.active) input {
        display: none; /* Hide input text leaving only icon when not active */
    }
    
    .search-box i {
        color: #F05A22;
        cursor: pointer;
    }

    .btn-new-product-table {
        padding: 0 16px;
        height: 40px;
        font-size: 13px;
    }
    
    /* Expansión de búsqueda al hacer clic */
    .table-header-row.search-open .section-title,
    .table-header-row.search-open .btn-new-product-table {
        display: none;
    }

    .table-header-row.search-open .table-actions {
        width: 100%;
    }

    .table-header-row.search-open .search-box {
        width: 100%;
        justify-content: flex-start;
        padding: 0 15px;
        border-radius: 20px;
    }

    .table-header-row.search-open .search-box input {
        display: block;
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        padding: 10px;
    }

    .table-container-card {
        padding: 10px;
        border-radius: 12px;
    }
    
    /* Ocultar atributos de tabla en mobile */
    .hide-mobile {
        display: none !important;
    }
}
</style>
