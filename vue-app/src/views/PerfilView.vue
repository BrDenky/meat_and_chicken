<template>
  <div class="perfil-view-container">
    <!-- CONTENEDOR DE PERFIL -->
    <div class="perfil-container">
        <!-- SIDEBAR DE PERFIL -->
        <div class="perfil-sidebar">
            <div class="perfil-header">
                <div class="perfil-avatar"><i class="fa-regular fa-user"></i></div>
                <div class="perfil-nombre">Hola, {{ formFacturacion.nombre || 'Usuario' }}</div>
                <div class="perfil-email">{{ formFacturacion.email || '...' }}</div>
            </div>

            <ul class="perfil-menu">
                <li class="perfil-menu-item">
                    <a href="#" class="perfil-menu-link" :class="{ active: currentSection === 'pedidos' }" @click.prevent="cambiarSeccion('pedidos')">
                        <span class="perfil-menu-icon"><i class="fa-solid fa-utensils"></i></span>
                        <span>Pedidos</span>
                    </a>
                </li>
                <li class="perfil-menu-item">
                    <a href="#" class="perfil-menu-link" :class="{ active: currentSection === 'facturacion' }" @click.prevent="cambiarSeccion('facturacion')">
                        <span class="perfil-menu-icon"><i class="fa-solid fa-receipt"></i></span>
                        <span>Datos de facturación</span>
                    </a>
                </li>
                <li class="perfil-menu-item">
                    <a href="#" class="perfil-menu-link" :class="{ active: currentSection === 'direccion' }" @click.prevent="cambiarSeccion('direccion')">
                        <span class="perfil-menu-icon"><i class="fa-solid fa-location-arrow"></i></span>
                        <span>Dirección de entrega</span>
                    </a>
                </li>
            </ul>
        </div>

        <!-- CONTENIDO PRINCIPAL -->
        <div class="perfil-content">
            
            <div class="breadcrumb-perfil">
                <router-link to="/">Inicio</router-link> › <span>Perfil</span>
            </div>

            <!-- SECCIÓN PEDIDOS -->
            <div class="seccion-contenido" v-show="currentSection === 'pedidos'">
                <h1 class="perfil-titulo">HOLA, {{ formFacturacion.nombre ? formFacturacion.nombre.toUpperCase() : 'USUARIO' }}</h1>
                
                <div class="estado-vacio">
                    <div class="estado-vacio-icon">🍴</div>
                    <h3>TODAVÍA NO HAS REALIZADO UN PEDIDO</h3>
                    <p>Realiza tu primera orden</p>
                    <router-link to="/resultados" class="btn-primary-perfil">Ver menú</router-link>
                </div>
            </div>

            <!-- SECCIÓN DATOS DE FACTURACIÓN -->
            <div class="seccion-contenido" v-show="currentSection === 'facturacion'">
                <h1 class="perfil-titulo">Datos de Facturación</h1>
                
                <form class="perfil-form" @submit.prevent="guardarFormulario">
                    <div class="form-section">
                        <h3 class="form-section-title">Información Personal</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Nombre</label>
                                <input type="text" class="form-input" v-model="formFacturacion.nombre" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Apellido</label>
                                <input type="text" class="form-input" v-model="formFacturacion.apellido" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Cédula/RUC</label>
                                <input type="text" class="form-input" v-model="formFacturacion.cedula" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Teléfono</label>
                                <input type="tel" class="form-input" v-model="formFacturacion.telefono" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Correo Electrónico</label>
                            <input type="email" class="form-input" v-model="formFacturacion.email" required>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="form-section-title">Dirección Fiscal</h3>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Provincia</label>
                                <select class="form-input" v-model="formFacturacion.provincia">
                                    <option>Pichincha</option>
                                    <option>Guayas</option>
                                    <option>Azuay</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ciudad</label>
                                <input type="text" class="form-input" v-model="formFacturacion.ciudad">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Dirección Completa</label>
                            <input type="text" class="form-input" v-model="formFacturacion.direccion">
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn-guardar">Guardar cambios</button>
                        <button type="button" class="btn-cancelar">Cancelar</button>
                    </div>
                </form>
            </div>

            <!-- SECCIÓN DIRECCIÓN DE ENTREGA -->
            <div class="seccion-contenido" v-show="currentSection === 'direccion'">
                <h1 class="perfil-titulo">Direcciones de Entrega</h1>
                
                <button class="btn-primary-perfil" style="margin-bottom: 30px;">+ Agregar Nueva Dirección</button>

                <div class="direcciones-grid">
                    <div class="direccion-card principal">
                        <span class="direccion-badge">Principal</span>
                        <div class="direccion-titulo">🏠 Casa</div>
                        <div class="direccion-texto">
                            Av. Amazonas N24-123 y República<br>
                            La Carolina, Quito<br>
                            Pichincha, Ecuador<br>
                            Tel: 0999999999
                        </div>
                        <div class="direccion-acciones">
                            <button class="btn-direccion btn-editar-dir">✏️ Editar</button>
                            <button class="btn-direccion btn-eliminar-dir">🗑️ Eliminar</button>
                        </div>
                    </div>

                    <div class="direccion-card">
                        <div class="direccion-titulo">🏢 Oficina</div>
                        <div class="direccion-texto">
                            Av. 6 de Diciembre N33-42<br>
                            Kennedy, Quito<br>
                            Pichincha, Ecuador<br>
                            Tel: 0988888888
                        </div>
                        <div class="direccion-acciones">
                            <button class="btn-direccion btn-editar-dir">✏️ Editar</button>
                            <button class="btn-direccion btn-eliminar-dir">🗑️ Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECCIÓN NOTIFICACIONES -->
            <div class="seccion-contenido" v-show="currentSection === 'notificaciones'">
                <h1 class="perfil-titulo">Notificaciones</h1>
                
                <div class="notif-toggle">
                    <div class="notif-info">
                        <h4>Ofertas y Promociones</h4>
                        <p>Recibe notificaciones sobre descuentos especiales</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" v-model="formNotificaciones.ofertas">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="notif-toggle">
                    <div class="notif-info">
                        <h4>Estado de Pedidos</h4>
                        <p>Actualizaciones sobre tus pedidos en proceso</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" v-model="formNotificaciones.pedidos">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="notif-toggle">
                    <div class="notif-info">
                        <h4>Nuevos Proveedores</h4>
                        <p>Entérate cuando se unan nuevos proveedores</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" v-model="formNotificaciones.proveedores">
                        <span class="slider"></span>
                    </label>
                </div>

                <div class="notif-toggle">
                    <div class="notif-info">
                        <h4>Newsletter Semanal</h4>
                        <p>Recibe un resumen de ofertas cada semana</p>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" v-model="formNotificaciones.newsletter">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <!-- SECCIÓN CUENTA -->
            <div class="seccion-contenido" v-show="currentSection === 'cuenta'">
                <h1 class="perfil-titulo">Configuración de Cuenta</h1>
                
                <form class="perfil-form" @submit.prevent="guardarFormulario">
                    <div class="form-section">
                        <h3 class="form-section-title">Seguridad</h3>
                        
                        <div class="form-group">
                            <label class="form-label">Contraseña Actual</label>
                            <input type="password" class="form-input" placeholder="••••••••">
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label class="form-label">Nueva Contraseña</label>
                                <input type="password" class="form-input" placeholder="••••••••">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirmar Contraseña</label>
                                <input type="password" class="form-input" placeholder="••••••••">
                            </div>
                        </div>
                    </div>

                    <div class="form-section">
                        <h3 class="form-section-title">Preferencias</h3>
                        
                        <div class="form-group">
                            <label class="form-label">Idioma</label>
                            <select class="form-input">
                                <option>Español</option>
                                <option>English</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Zona Horaria</label>
                            <select class="form-input">
                                <option>GMT-5 (Ecuador)</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn-guardar">💾 Guardar cambios</button>
                        <button type="button" class="btn-cancelar">Cancelar</button>
                    </div>
                </form>
            </div>

            <!-- SECCIÓN POLÍTICAS DE PRIVACIDAD -->
            <div class="seccion-contenido" v-show="currentSection === 'privacidad'">
                <h1 class="perfil-titulo">Políticas de Privacidad</h1>
                
                <div style="line-height: 1.8; color: #666;">
                    <h3 style="color: #333; margin: 20px 0;">Uso de Información</h3>
                    <p>En Meat & Chicken Fast, respetamos tu privacidad. Utilizamos tu información personal únicamente para procesar pedidos, mejorar tu experiencia y enviarte promociones relevantes.</p>

                    <h3 style="color: #333; margin: 20px 0;">Datos Recopilados</h3>
                    <p>Recopilamos: nombre, dirección, teléfono, email y datos de pago (procesados de forma segura).</p>

                    <h3 style="color: #333; margin: 20px 0;">Seguridad</h3>
                    <p>Implementamos medidas de seguridad para proteger tus datos personales contra acceso no autorizado.</p>

                    <h3 style="color: #333; margin: 20px 0;">Derechos del Usuario</h3>
                    <p>Tienes derecho a acceder, modificar o eliminar tu información personal en cualquier momento.</p>
                </div>
            </div>

            <!-- SECCIÓN CONTACTOS -->
            <div class="seccion-contenido" v-show="currentSection === 'contactos'">
                <h1 class="perfil-titulo">Contactos</h1>
                
                <div style="max-width: 600px;">
                    <div style="background: #f8f8f8; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 15px;">📞 Servicio al Cliente</h4>
                        <p style="color: #666; margin-bottom: 10px;">Teléfono: (+593) 980 377 358</p>
                        <p style="color: #666; margin-bottom: 10px;">Email: soporte@meatandchicken.com</p>
                        <p style="color: #666;">Horario: Lun-Vie 8:00 AM - 6:00 PM</p>
                    </div>

                    <div style="background: #f8f8f8; padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                        <h4 style="color: #333; margin-bottom: 15px;">💬 WhatsApp</h4>
                        <p style="color: #666; margin-bottom: 15px;">Chatea con nosotros en tiempo real</p>
                        <a href="https://wa.me/593980377358" target="_blank" class="btn-primary-perfil" style="display: inline-block;">
                            Abrir WhatsApp
                        </a>
                    </div>

                    <div style="background: #f8f8f8; padding: 25px; border-radius: 12px;">
                        <h4 style="color: #333; margin-bottom: 15px;">🏢 Oficinas</h4>
                        <p style="color: #666;">Calle Principal 123<br>Quito, Ecuador</p>
                    </div>
                </div>
            </div>

            <!-- SECCIÓN TÉRMINOS LEGALES -->
            <div class="seccion-contenido" v-show="currentSection === 'terminos'">
                <h1 class="perfil-titulo">Términos Legales</h1>
                
                <div style="line-height: 1.8; color: #666;">
                    <h3 style="color: #333; margin: 20px 0;">Términos y Condiciones de Uso</h3>
                    <p>Al utilizar Meat & Chicken Fast, aceptas nuestros términos y condiciones.</p>

                    <h3 style="color: #333; margin: 20px 0;">Política de Devoluciones</h3>
                    <p>Aceptamos devoluciones dentro de las 24 horas si el producto no cumple con los estándares de calidad prometidos.</p>

                    <h3 style="color: #333; margin: 20px 0;">Garantía de Calidad</h3>
                    <p>Todos nuestros productos son frescos y cumplen con las normas sanitarias vigentes.</p>

                    <h3 style="color: #333; margin: 20px 0;">Responsabilidad</h3>
                    <p>No nos hacemos responsables por demoras en la entrega causadas por factores externos como clima o tráfico.</p>
                </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import '../assets/css/perfil.css' // Import correct css that was in the <head>

const currentSection = ref('pedidos')
const router = useRouter()
const isLoading = ref(true)

const cambiarSeccion = (seccion) => {
    currentSection.value = seccion
}

const cerrarSesion = async () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        await supabase.auth.signOut()
        alert('Sesión cerrada. Redirigiendo...')
        router.push('/')
    }
}

const guardarFormulario = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    const { error } = await supabase.from('profiles').update({
        first_name: formFacturacion.value.nombre,
        last_name: formFacturacion.value.apellido,
        id_number: formFacturacion.value.cedula,
        phone: formFacturacion.value.telefono,
        province: formFacturacion.value.provincia,
        city: formFacturacion.value.ciudad,
        full_address: formFacturacion.value.direccion,
        notif_offers: formNotificaciones.value.ofertas,
        notif_orders: formNotificaciones.value.pedidos,
        notif_providers: formNotificaciones.value.proveedores,
        notif_newsletter: formNotificaciones.value.newsletter
    }).eq('id', session.user.id)

    if (error) {
        alert('❌ Error al guardar: ' + error.message)
    } else {
        alert('✅ Cambios guardados en la base de datos de manera definitiva')
    }
}

// Data models
const formFacturacion = ref({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    provincia: 'Pichincha',
    ciudad: 'Quito',
    direccion: ''
})

const formNotificaciones = ref({
    ofertas: true,
    pedidos: true,
    proveedores: false,
    newsletter: true
})

onMounted(async () => {
    // 1. Obtener al usuario autenticado
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
        // Redirige silenciosamente si intenta entrar al perfil sin loguearse
        router.push('/')
        return
    }

    const userId = session.user.id

    // 2. Traer el perfil
    const { data: perfil } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (perfil) {
        // Reaccionará automáticamente en los inputs de HTML
        formFacturacion.value = {
            nombre: perfil.first_name || '',
            apellido: perfil.last_name || '',
            cedula: perfil.id_number || '',
            telefono: perfil.phone || '',
            email: perfil.email || '',
            provincia: perfil.province || 'Pichincha',
            ciudad: perfil.city || 'Quito',
            direccion: perfil.full_address || ''
        }
        
        formNotificaciones.value = {
            ofertas: perfil.notif_offers ?? true,
            pedidos: perfil.notif_orders ?? true,
            proveedores: perfil.notif_providers ?? false,
            newsletter: perfil.notif_newsletter ?? true
        }
    }
    isLoading.value = false
})
</script>

<style scoped>
/* Specific overrides can go here */
</style>
