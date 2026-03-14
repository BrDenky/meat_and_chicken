<template>
  <div>
    <!-- MODAL LOGIN -->
    <div class="login-overlay" :class="{ active: isLoginVisible }" @click="cerrarLogin"></div>
    <div class="login-modal" :class="{ active: isLoginVisible }" id="loginModal">
      <button class="login-cerrar" @click="cerrarLogin">✕</button>

      <!-- Tabs Cliente / Proveedor -->
      <div class="login-tabs">
        <button class="login-tab" :class="{ active: currentTab === 'cliente' }" @click="cambiarLoginTab('cliente')">🛒 Cliente</button>
        <button class="login-tab" :class="{ active: currentTab === 'proveedor' }" @click="cambiarLoginTab('proveedor')">🏪 Proveedor</button>
      </div>

      <!-- CLIENTE -->
      <div class="login-content" v-show="currentTab === 'cliente'">
        <!-- Subtabs Login / Registro -->
        <div class="login-subtabs">
          <button class="login-subtab" :class="{ active: currentSubtab === 'login-form' }" @click="cambiarSubtab('login-form')">Iniciar Sesión</button>
          <button class="login-subtab" :class="{ active: currentSubtab === 'registro-form' }" @click="cambiarSubtab('registro-form')">Registrarse</button>
        </div>

        <!-- Formulario Login Cliente -->
        <div v-show="currentSubtab === 'login-form'">
          <h3>Bienvenido de nuevo 👋</h3>
          <div class="login-campo">
            <label>Correo electrónico</label>
            <input type="email" placeholder="tu@correo.com">
          </div>
          <div class="login-campo">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••">
          </div>
          <a href="#" class="login-olvide">¿Olvidaste tu contraseña?</a>
          <button class="login-btn" @click="iniciarSesion('cliente')">Iniciar Sesión</button>
        </div>

        <!-- Formulario Registro Cliente -->
        <div v-show="currentSubtab === 'registro-form'">
          <h3>Crear cuenta 🎉</h3>
          <div class="login-campo">
            <label>Nombre completo</label>
            <input type="text" placeholder="Tu nombre">
          </div>
          <div class="login-campo">
            <label>Correo electrónico</label>
            <input type="email" placeholder="tu@correo.com">
          </div>
          <div class="login-campo">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••">
          </div>
          <div class="login-campo">
            <label>Confirmar contraseña</label>
            <input type="password" placeholder="••••••••">
          </div>
          <button class="login-btn" @click="registrarse">Crear Cuenta</button>
        </div>
      </div>

      <!-- PROVEEDOR -->
      <div class="login-content" v-show="currentTab === 'proveedor'">
        <h3>Acceso Proveedores 🏪</h3>
        <p class="login-subtitulo">¿Aún no eres proveedor? <a href="#">Trabaja con nosotros</a></p>
        <div class="login-campo">
          <label>Correo electrónico</label>
          <input type="email" placeholder="proveedor@correo.com">
        </div>
        <div class="login-campo">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••">
        </div>
        <a href="#" class="login-olvide">¿Olvidaste tu contraseña?</a>
        <button class="login-btn" @click="iniciarSesion('proveedor')">Iniciar Sesión</button>
      </div>
    </div>

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

          <router-link to="/carrito" class="action-btn">🛒 <span> Mi carrito</span></router-link>
          <button class="action-btn" @click="abrirLogin">👤<span>Mi cuenta</span></button>
        </div>
      </div>
    </header>

    <!-- BARRA DE NAVEGACIÓN SECUNDARIA -->
    <nav class="secondary-nav">
      <div class="container secondary-nav-inner">
        <a href="/#productos" class="secondary-nav-link">Proveedores</a>
        <a href="/resultados" class="secondary-nav-link">Productos</a>
        <a href="/registro" class="secondary-nav-link">Trabaja con Nosotros</a>
        <a href="/sobre_nosotros" class="secondary-nav-link">Sobre Nosotros</a>
        <a href="/noticias" class="secondary-nav-link">Noticias</a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const buscar = () => {
  if (searchQuery.value.trim()) {
    router.push('/resultados?q=' + encodeURIComponent(searchQuery.value.trim()))
  }
}

const isLoginVisible = ref(false)
const currentTab = ref('cliente')
const currentSubtab = ref('login-form')
const isPuntosVisible = ref(false)

const abrirLogin = () => {
  isLoginVisible.value = true
}

const cerrarLogin = () => {
  isLoginVisible.value = false
}

const cambiarLoginTab = (tab) => {
  currentTab.value = tab
}

const cambiarSubtab = (subtab) => {
  currentSubtab.value = subtab
}

const iniciarSesion = (tipo) => {
  alert('Iniciando sesión como ' + tipo)
  cerrarLogin()
}

const registrarse = () => {
  alert('Cuenta creada exitosamente')
  cerrarLogin()
}

const togglePuntos = () => {
  isPuntosVisible.value = !isPuntosVisible.value
}
</script>

<style scoped>

.login-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1100;
}

.login-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 420px;
  max-width: 90vw;
  z-index: 1200;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
