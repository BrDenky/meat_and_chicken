<template>
  <div class="main-header-wrapper" :class="{ 'header-hidden': !isVisible, 'no-behavior': !isBehaviorEnabled }">
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
          <router-link v-if="userRole !== 'proveedor'" to="/carrito" class="action-btn cart-btn-header">
            <div class="cart-icon-wrapper">
              <i class="fa-solid fa-cart-shopping"></i>
              <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
            </div>
            <span> Mi carrito</span>
          </router-link>
          
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
        <router-link to="/resultados" class="secondary-nav-link" @click="forceShowHeader">Productos</router-link>
        <router-link to="/#productos" class="secondary-nav-link" @click="forceShowHeader">Proveedores</router-link>
        <router-link to="/registro" class="secondary-nav-link" @click="forceShowHeader">Trabaja con Nosotros</router-link>
        <router-link to="/sobrenosotros" class="secondary-nav-link" @click="forceShowHeader">Sobre Nosotros</router-link>
        <router-link to="/noticias" class="secondary-nav-link" @click="forceShowHeader">Noticias</router-link>
      </div>
    </nav>
  </div>

  <!-- ESPACIADOR: Solo se muestra si el header es fijo (behavior enabled) -->
  <div v-if="isBehaviorEnabled" class="header-placeholder" :class="{ 'with-secondary': showSecondaryNav }"></div>

  <!-- SISTEMA DE NOTIFICACIONES ELEGANTE -->
  <transition name="slide-in">
    <div v-if="notificationMessage" class="notification-toast" :class="notificationType">
      {{ notificationMessage }}
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { supabase } from '../supabase' // Importamos el cliente de Supabase
import AuthModal from './AuthModal.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

// Determinar si el comportamiento dinámico del header está habilitado para esta vista
const isBehaviorEnabled = computed(() => {
  const disabledRoutes = ['/carrito', '/pago']
  return !disabledRoutes.includes(route.path)
})

// Lógica de visibilidad al hacer scroll con bloqueo para navegación
const isVisible = ref(true)
const skipScroll = ref(false)
let lastScrollY = window.scrollY

const handleScroll = () => {
  if (!isBehaviorEnabled.value) {
    isVisible.value = true
    return
  }
  if (skipScroll.value) return 
  
  const currentScrollY = window.scrollY
  if (currentScrollY > lastScrollY && currentScrollY > 150) {
    isVisible.value = false
  } else if (currentScrollY < lastScrollY) {
    isVisible.value = true
  }
  lastScrollY = currentScrollY
}

const searchQuery = ref('')

// Ocultar barra secundaria en el panel de proveedor
const showSecondaryNav = computed(() => {
  const routesToHide = ['/proveedor']
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

const abrirLogin = () => isLoginVisible.value = true
const cerrarLogin = () => isLoginVisible.value = false

const forceShowHeader = () => {
    if (!isBehaviorEnabled.value) {
        isVisible.value = true
        return
    }
    isVisible.value = true
    skipScroll.value = true
    setTimeout(() => {
        lastScrollY = window.scrollY
        skipScroll.value = false
    }, 800) // Aumentamos el tiempo de bloqueo para asegurar que los navegadores terminen de lanzar eventos de scroll tras el salto
}

// Forzamos que el header aparezca al cambiar de ruta o usar anclas
watch(() => route.fullPath, () => {
    forceShowHeader()
})

// LOGICA DE SESIÓN CON SUPABASE
onMounted(async () => {
  // 1. Obtener la sesión actual al cargar
  const { data: { session } } = await supabase.auth.getSession()
  actualizarUsuario(session)

  // 2. Escuchar cambios (login, logout, etc.)
  supabase.auth.onAuthStateChange((_event, session) => {
    actualizarUsuario(session)
  })

  // 3. Listener de scroll (solo si está habilitado)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

    // Inicializamos carrito híbrido con Supabase si no es un proveedor
    if (userRole.value !== 'proveedor') {
      cartStore.initUserCart(session.user.id)
    }
  } else {
    user.value = null
    userName.value = ''
    userRole.value = ''
    cartStore.initUserCart(null) // Revertimos al local storage
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
.main-header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: none;
  background: white; /* Asegura que el fondo sea sólido al fijarse */
}

.header-hidden {
  transform: translateY(-100%);
}

.no-behavior {
  position: relative !important;
  transform: none !important;
  transition: none !important;
}

.header-placeholder {
  height: 90px; /* Altura del header principal reducido */
}

.header-placeholder.with-secondary {
  height: 130px; /* Altura del header + nav secundaria reducido */
}

@media (max-width: 768px) {
  .header-placeholder {
    height: 90px;
  }
  .header-placeholder.with-secondary {
    height: 140px; /* Aumentado de 130px para dar más aire */
  }
}

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

/* ESTILOS PARA EL BADGE DEL CARRITO */
.cart-btn-header {
  position: relative;
}

.cart-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #212121;
  color: white;
  font-size: 11px;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  border-radius: 20px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.cart-btn-header:hover .cart-badge {
  background-color: #F05A22;
}
</style>
