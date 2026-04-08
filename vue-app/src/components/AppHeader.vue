<template>
  <div>
    <!-- MODAL LOGIN EXTERNALIZADO -->
    <AuthModal :isVisible="isLoginVisible" @close="cerrarLogin" @notify="showNotification" />

    <!-- HEADER -->
    <header id="header">
      <div class="header-inner">
        <router-link to="/" class="header-brand">
          <img src="@/assets/img/logo.png" alt="Logo">
          <span class="brand-text">Meat & Chicken Fast</span>
        </router-link>

        <div class="header-search">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Buscar proveedor o producto..."
            v-model="searchQuery"
            @keydown.enter="buscar"
          >
        </div>

        <div class="header-actions">

          <!-- Ocultamos el carrito si detectamos que es un proveedor -->
          <router-link v-if="userRole !== 'proveedor'" to="/carrito" class="action-btn"><i class="fa-solid fa-cart-shopping"></i> <span> Mi carrito</span></router-link>
          
          <!-- Si NO hay usuario logueado -->
          <button v-if="!user" class="action-btn" @click="abrirLogin">
            <i class="fa-regular fa-user"></i><span>Mi cuenta</span>
          </button>

          <!-- Si SÍ hay usuario logueado -->
          <template v-else>
            <!-- Cambiamos la ruta según el rol del usuario -->
            <router-link :to="userRole === 'proveedor' ? '/proveedor' : '/perfil'" class="action-btn">
              <i class="fa-solid fa-user"></i><span>Hola, {{ userName }}</span>
            </router-link>
            <!-- Botón de Cerrar Sesión -->
            <button class="action-btn" @click="cerrarSesion" title="Cerrar sesión">
              <i class="fa-solid fa-right-from-bracket" style="color: #F05A22;"></i>
            </button>
          </template>
        </div>
      </div>
    </header>

    <!-- BARRA DE NAVEGACIÓN SECUNDARIA (Se oculta en el panel de proveedor) -->
    <nav class="secondary-nav" v-if="showSecondaryNav">
      <div class="container secondary-nav-inner">
        <router-link to="/#productos" class="secondary-nav-link">Proveedores</router-link>
        <router-link to="/resultados" class="secondary-nav-link">Productos</router-link>
        <router-link to="/registro" class="secondary-nav-link">Trabaja con Nosotros</router-link>
        <router-link to="/sobrenosotros" class="secondary-nav-link">Sobre Nosotros</router-link>
        <router-link to="/noticias" class="secondary-nav-link">Noticias</router-link>
      </div>
    </nav>
    <!-- SISTEMA DE NOTIFICACIONES ELEGANTE -->
    <transition name="slide-in">
      <div v-if="notificationMessage" class="notification-toast" :class="notificationType">
        {{ notificationMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../supabase' // Importamos el cliente de Supabase
import AuthModal from './AuthModal.vue'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')

// Ocultar barra secundaria en el panel de proveedor
const showSecondaryNav = computed(() => {
  const routesToHide = ['/proveedor', '/perfil-proveedor']
  return !routesToHide.includes(route.path)
})

// Variables para el usuario
const user = ref(null)
const userName = ref('')
const userRole = ref('') // Servirá para saber si escondemos o no el carrito

const buscar = () => {
  if (searchQuery.value.trim()) {
    router.push('/resultados?q=' + encodeURIComponent(searchQuery.value.trim()))
  }
}

const isLoginVisible = ref(false)

// Estado para notificaciones
const notificationMessage = ref('')
const notificationType = ref('success') // 'success' o 'error'

const showNotification = (message, type = 'success') => {
  notificationMessage.value = message
  notificationType.value = type
  setTimeout(() => {
    notificationMessage.value = ''
  }, 3500)
}

const abrirLogin = () => {
  isLoginVisible.value = true
}

const cerrarLogin = () => {
  isLoginVisible.value = false
}

// LOGICA DE SESIÓN CON SUPABASE
onMounted(async () => {
  // 1. Obtener la sesión actual al cargar
  const { data: { session } } = await supabase.auth.getSession()
  actualizarUsuario(session)

  // 2. Escuchar cambios (login, logout, etc.)
  supabase.auth.onAuthStateChange((_event, session) => {
    actualizarUsuario(session)
  })
})

const actualizarUsuario = async (session) => {
  if (session && session.user) {
    user.value = session.user
    // Supabase guarda el full_name en el user_metadata por defecto (si lo enviaste)
    // O puedes sacar su correo si no hay nombre
    userName.value = session.user.user_metadata?.full_name?.split(' ')[0] || session.user.email.split('@')[0]
    
    // Obtenemos el rol desde la base de datos para restringir acceso al carrito y linkear al panel correcto
    const { data, error } = await supabase.from('profiles').select('role').eq('id', session.user.id).single()
    if (data) {
      userRole.value = data.role
    } else {
      userRole.value = 'consumer'
    }
  } else {
    user.value = null
    userName.value = ''
    userRole.value = ''
  }
}

const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    showNotification('Error al cerrar sesión', 'error')
  } else {
    showNotification('Sesión cerrada con éxito', 'success')
    router.push('/')
  }
}
</script>

<style scoped>

/* ESTILOS DEL TOAST NOTIFICATION MANEJO DE INICIO DE SESIÓN Y REGISTRO */
.notification-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 2000;
  display: flex;
  align-items: center;
}

.notification-toast.success {
  background-color: #2e7d32;
  border-left: 6px solid #1b5e20;
}

.notification-toast.error {
  background-color: #d32f2f;
  border-left: 6px solid #b71c1c;
}

.slide-in-enter-active, .slide-in-leave-active {
  transition: all 0.3s ease;
}
.slide-in-enter-from, .slide-in-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
