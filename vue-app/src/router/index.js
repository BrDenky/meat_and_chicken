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
        },
        {
            path: '/sobrenosotros',
            name: 'sobrenosotros',
            component: () => import('../views/sobrenosotros.vue')
        },
        {
            path: '/noticias',
            name: 'noticias',
            component: () => import('../views/NoticiasView.vue')
        },
        {
            path: '/registro',
            name: 'registro',
            component: () => import('../views/TrabajaView.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 150, // Aumentado para dar más aire entre el header y el título
                behavior: 'auto',
            }
        }
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
