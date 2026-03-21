<template>
  <div>
    <!-- MODAL LOGIN -->
    <div class="login-overlay" :class="{ active: isVisible }" @click="cerrar"></div>
    <div class="login-modal" :class="{ active: isVisible }" id="loginModal">
      <button class="login-cerrar" @click="cerrar">✕</button>

      <!-- Tab Cliente / Proveedor -->
      <div class="login-tabs">
        <button class="login-tab" :class="{ active: currentTab === 'cliente' }" @click="cambiarLoginTab('cliente')"><i class="fa-solid fa-cart-shopping"></i> Cliente</button>
        <button class="login-tab" :class="{ active: currentTab === 'proveedor' }" @click="cambiarLoginTab('proveedor')"><i class="fa-solid fa-store"></i> Proveedor</button>
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
          <h3>Bienvenido</h3>
          <div class="login-campo">
            <label>Correo electrónico</label>
            <input type="email" v-model="loginForm.email" :disabled="isLoading">
          </div>
          <div class="login-campo">
            <label>Contraseña</label>
            <input type="password" v-model="loginForm.password" :disabled="isLoading" @keydown.enter="iniciarSesion('cliente')">
          </div>
          <a href="#" class="login-olvide">¿Olvidaste tu contraseña?</a>
          <button class="login-btn" @click="iniciarSesion('cliente')" :disabled="isLoading">
            {{ isLoading ? 'Cargando...' : 'Iniciar Sesión' }}
          </button>
        </div>

        <!-- Formulario Registro Cliente -->
        <div v-show="currentSubtab === 'registro-form'">
          <h3>Crear cuenta</h3>
          <div class="login-campo">
            <label>Nombre completo</label>
            <input type="text" v-model="registroForm.nombre" :disabled="isLoading">
          </div>
          <div class="login-campo">
            <label>Correo electrónico</label>
            <input type="email" v-model="registroForm.email" :disabled="isLoading">
          </div>
          <div class="login-campo">
            <label>Contraseña</label>
            <input type="password" v-model="registroForm.password" :disabled="isLoading">
          </div>
          <div class="login-campo">
            <label>Confirmar contraseña</label>
            <input type="password" v-model="registroForm.confirmPassword" :disabled="isLoading" @keydown.enter="registrarse">
          </div>
          <button class="login-btn" @click="registrarse" :disabled="isLoading">
            {{ isLoading ? 'Cargando...' : 'Crear Cuenta' }}
          </button>
        </div>
      </div>

      <!-- PROVEEDOR -->
      <div class="login-content" v-show="currentTab === 'proveedor'">
        <h3>Acceso Proveedores</h3>
        <p class="login-subtitulo">¿Aún no eres proveedor? <a href="#">Trabaja con nosotros</a></p>
        <div class="login-campo">
          <label>Correo electrónico</label>
          <input type="email" v-model="loginForm.email" :disabled="isLoading">
        </div>
        <div class="login-campo">
          <label>Contraseña</label>
          <input type="password" v-model="loginForm.password" :disabled="isLoading" @keydown.enter="iniciarSesion('proveedor')">
        </div>
        <a href="#" class="login-olvide">¿Olvidaste tu contraseña?</a>
        <button class="login-btn" @click="iniciarSesion('proveedor')" :disabled="isLoading">
          {{ isLoading ? 'Cargando...' : 'Iniciar Sesión' }}
        </button>
      </div>
    </div>
  </div>
</template>


<!------------------------ CONEXIÓN CON SUPABASE ------------------------>



<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase' // Importamos el cliente de Supabase

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'notify'])

const router = useRouter()

const currentTab = ref('cliente')
const currentSubtab = ref('login-form')
const isLoading = ref(false)

const loginForm = ref({ email: '', password: '' })
const registroForm = ref({ nombre: '', email: '', password: '', confirmPassword: '' })

const cerrar = () => {
  emit('close')
  // Limpiamos formularios al cerrar
  loginForm.value = { email: '', password: '' }
  registroForm.value = { nombre: '', email: '', password: '', confirmPassword: '' }
}

const cambiarLoginTab = (tab) => {
  currentTab.value = tab
}

const cambiarSubtab = (subtab) => {
  currentSubtab.value = subtab
}

// LÓGICA DE LOGIN CON SUPABASE
const iniciarSesion = async (tipo) => {
  if (!loginForm.value.email || !loginForm.value.password) {
    emit('notify', 'Por favor, llena todos los campos', 'error')
    return
  }

  isLoading.value = true
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginForm.value.email,
    password: loginForm.value.password
  })
  isLoading.value = false

  if (error) {
    emit('notify', 'Error al iniciar sesión: ' + error.message, 'error')
    return
  }

  // Si fue exitoso
  emit('notify', '¡Inicio de sesión exitoso!', 'success')
  cerrar()
  
  if (tipo === 'proveedor') {
    router.push('/proveedor')
  } else {
    router.push('/')
  }
}

// LÓGICA DE REGISTRO CON SUPABASE
const registrarse = async () => {
  const { nombre, email, password, confirmPassword } = registroForm.value

  if (!nombre || !email || !password) {
    emit('notify', 'Por favor, llena todos los campos', 'error')
    return
  }
  if (password !== confirmPassword) {
    emit('notify', 'Las contraseñas no coinciden', 'error')
    return
  }

  isLoading.value = true
  // 1. Registramos en Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: nombre 
      }
    }
  })
  isLoading.value = false

  if (error) {
    emit('notify', 'Error al registrar: ' + error.message, 'error')
    return
  }

  // 2. Creamos el perfil asociado en la tabla pública 'profiles'
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      email: email,
      first_name: nombre,
      role: 'consumer' // Por defecto lo metemos como cliente
    })
    if (profileError) {
      console.error('No se pudo crear el perfil base:', profileError.message)
    }
  }
  
  emit('notify', 'Cuenta creada exitosamente. Iniciando sesión...', 'success')
  // Hacemos login automático
  await supabase.auth.signInWithPassword({ email, password })
  cerrar()
  router.push('/perfil')
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

.login-modal h3{
  text-align: center;
}
</style>
