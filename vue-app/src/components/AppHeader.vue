<template>
  <div>
    <!-- MODAL LOGIN -->
    <div v-show="isLoginVisible" class="login-overlay" @click="cerrarLogin"></div>

    <div v-show="isLoginVisible" class="login-modal" id="loginModal">
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
          <input type="text" id="searchInput" placeholder="Buscar proveedor o producto...">
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
/* Any required component-specific styles over styles.css could go here */
</style>
