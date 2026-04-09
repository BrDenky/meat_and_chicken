import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

export const useCartStore = defineStore('cart', () => {
    // 1. Estado
    const items = ref([])
    const isInitialized = ref(false)
    const isLoading = ref(true) // Nuevo flag para saber si aún se está comunicando con Supabase
    const userId = ref(null)

    // 2. Cargamos del localStorage por defecto hasta saber si hay usuario
    const loadFromLocalStorage = () => {
        const stored = localStorage.getItem('cart_items')
        if (stored) {
            items.value = JSON.parse(stored)
        } else {
            items.value = [] // Aseguramos vaciar la memoria reactiva si no hay nada guardado localmente
        }
    }

    // Al crear el store cargamos localmente de inmediato
    if (!isInitialized.value) {
        loadFromLocalStorage()
        // No quitamos isLoading aún hasta que AppHeader lo valide
    }

    // 3. Inicializar el carrito cuando detectamos al usuario 
    // (Llamado desde AppHeader onMounted/onAuthStateChange)
    const initUserCart = async (uid) => {
        userId.value = uid
        isInitialized.value = true
        isLoading.value = true // Empieza a cargar

        if (!uid) {
            // Usuario hizo logout o es invitado. Cargamos local
            loadFromLocalStorage()
            isLoading.value = false // Terminó de cargar
            return
        }

        // --- LÓGICA DE USUARIO LOGUEADO ---
        // 1. Obtener carrito de Supabase
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', uid)

        if (error) {
            console.error("Error cargando carrito de supabase:", error)
            return
        }

        // 2. Fusionar localStorage con Supabase si hay algo
        const localItems = JSON.parse(localStorage.getItem('cart_items') || '[]')
        
        if (localItems.length > 0) {
            for (const local of localItems) {
                const existing = data.find(dbItem => dbItem.product_id === String(local.id))
                
                if (existing) {
                    // Actualizar cantidad sumando
                    await updateSupabaseQuantity(existing.id, existing.quantity + local.qty)
                } else {
                    // Insertar nuevo
                    await insertToSupabase(local)
                }
            }
            // Limpiamos localStorage después de fusionar exitosamente
            localStorage.removeItem('cart_items')
            
            // Recargamos de supabase para tener los IDs reales y datos frescos
            const { data: freshData } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', uid)
            
            if (freshData) {
                mapSupabaseToLocal(freshData)
            }
        } else {
            // Solo mapeamos lo que hay en BD
            mapSupabaseToLocal(data)
        }
        
        isLoading.value = false // Terminamos de cargar todo
    }

    // Función auxiliar para adaptar BD al Estado de Pinia
    const mapSupabaseToLocal = (data) => {
        items.value = data.map(row => {
            const meta = row.product_metadata || {}
            return {
                id: row.product_id, // ID del producto
                cart_item_id: row.id, // UUID de la fila en Supabase
                qty: row.quantity,
                name: meta.name || 'Producto',
                price: meta.price || 0,
                image: meta.image || '',
                weight: meta.weight || '',
                cut: meta.cut || '',
                sku: meta.sku || ''
            }
        })
    }

    // --- FUNCIONES DE SINCRONIZACIÓN SUPABASE ---
    const insertToSupabase = async (product) => {
        const { data, error } = await supabase
            .from('cart_items')
            .upsert({
                user_id: userId.value,
                product_id: String(product.id),
                quantity: product.qty || 1,
                product_metadata: {
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    weight: product.weight,
                    cut: product.cut,
                    sku: product.sku
                }
            }, { onConflict: 'user_id,product_id'})
            .select()
            .single()
        
        if (error) console.error("Error al insertar en carrito DB:", error)
        return data
    }

    const updateSupabaseQuantity = async (cartItemId, newQty) => {
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQty })
            .eq('id', cartItemId)
        
        if (error) console.error("Error al actualizar cant. en DB:", error)
    }

    const deleteFromSupabase = async (cartItemId) => {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId)
            
        if (error) console.error("Error al eliminar de DB:", error)
    }

    // Guarda en local de forma manual (solo funciona para invitados)
    const saveLocal = () => {
        if (!userId.value) {
            localStorage.setItem('cart_items', JSON.stringify(items.value))
        }
    }


    // 4. Getters
    const totalItems = computed(() => items.value.reduce((acc, item) => acc + item.qty, 0))
    const subtotal = computed(() => items.value.reduce((acc, item) => acc + (item.price * item.qty), 0))
    

    // 5. ACCIONES PRINCIPALES DEL FRONTEND
    const addItem = async (product, qty = 1) => {
        const existingItemIndex = items.value.findIndex(i => i.id === product.id)
        
        if (existingItemIndex !== -1) {
            const existingItem = items.value[existingItemIndex]
            items.value[existingItemIndex].qty += qty // Vue reactivity
            
            if (userId.value && existingItem.cart_item_id) {
                await updateSupabaseQuantity(existingItem.cart_item_id, existingItem.qty)
            }
        } else {
            const newItem = { ...product, qty: qty }
            items.value.push(newItem)
            
            if (userId.value) {
                const dbItem = await insertToSupabase(newItem)
                if (dbItem) {
                    newItem.cart_item_id = dbItem.id
                }
            }
        }
        saveLocal()
    }

    const removeItem = async (id) => {
        const item = items.value.find(i => i.id === id)
        if (!item) return
        
        items.value = items.value.filter(i => i.id !== id)
        
        if (userId.value && item.cart_item_id) {
            await deleteFromSupabase(item.cart_item_id)
        }
        saveLocal()
    }

    const updateQuantity = async (id, change) => {
        const item = items.value.find(i => i.id === id)
        if (!item) return
        
        const newQty = item.qty + change
        if (newQty > 0 && newQty <= 99) {
            item.qty = newQty
            if (userId.value && item.cart_item_id) {
                await updateSupabaseQuantity(item.cart_item_id, item.qty)
            }
            saveLocal()
        }
    }

    const clearCart = async () => {
        items.value = []
        if (userId.value) {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', userId.value)
            
            if (error) console.error("Error vaciando carrito en DB:", error)
        }
        localStorage.removeItem('cart_items')
    }

    return {
        items,
        isLoading,
        totalItems,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        initUserCart
    }
})
