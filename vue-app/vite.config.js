import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // Añade esta sección aquí:
    server: {
        host: true,      // Permite que otros dispositivos en tu red vean el sitio
        port: 5173,      // El puerto que prefieras
        strictPort: true // Evita que cambie de puerto si el 5173 está ocupado
    }
})