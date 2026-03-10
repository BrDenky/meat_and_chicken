<!-- Componente principal, aquí se montan todos los demás componentes -->
<template>
  <div id="app-container">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* Global styles will be imported here later */
</style>
