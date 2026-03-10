// Toma el componente principal y lo monta en el index.html
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/styles.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
