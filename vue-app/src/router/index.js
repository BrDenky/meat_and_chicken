import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/carrito',
            name: 'carrito',
            component: () => import('../views/CarritoView.vue')
        },
        {
            path: '/pago',
            name: 'pago',
            component: () => import('../views/PagoView.vue')
        },
        {
            path: '/perfil',
            name: 'perfil',
            component: () => import('../views/PerfilView.vue')
        },
        {
            path: '/perfil-proveedor',
            name: 'perfil-proveedor',
            component: () => import('../views/PerfilProveedorView.vue')
        },
        {
            path: '/producto',
            name: 'producto',
            component: () => import('../views/ProductoView.vue')
        },
        {
            path: '/proveedor',
            name: 'proveedor',
            component: () => import('../views/ProveedorView.vue')
        },
        {
            path: '/resultados',
            name: 'resultados',
            component: () => import('../views/ResultadosView.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
