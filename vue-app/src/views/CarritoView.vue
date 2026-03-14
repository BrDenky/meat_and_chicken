<template>
  <div>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <div class="container">
            <ul>
                <li><router-link to="/">Inicio</router-link></li>
                <li>→</li>
                <li><span>Carrito de Compras</span></li>
            </ul>
        </div>
    </div>

    <main>
        <div class="container">
            <div class="page-title">
                <h1>Carrito de Compras</h1>
                <p id="cart-count">Tienes <strong>{{ itemsCount }} producto{{ itemsCount !== 1 ? 's' : '' }}</strong> en tu carrito</p>
            </div>

            <div class="cart-container">
                <!-- Cart Items -->
                <div class="cart-items" id="cart-items" v-if="cart.length > 0">
                    <!-- Header -->
                    <div class="cart-header">
                        <div>Producto</div>
                        <div>Precio</div>
                        <div>Cantidad</div>
                        <div>Total</div>
                        <div></div>
                    </div>

                    <!-- Cart Items Rendering -->
                    <div class="cart-item" v-for="item in cart" :key="item.id">
                        <div class="item-product">
                            <div class="item-image">
                                <!-- using dynamic image resolution or a placeholder since they might be varied -->
                                <img :src="`/src/assets/img/${item.image}`" alt="Producto Cárnico" class="related-img">
                            </div>
                            <div class="item-details">
                                <h3>{{ item.name }}</h3>
                                <p>SKU: {{ item.sku }}</p>
                                <p>Peso: {{ item.weight }} | Corte: {{ item.cut }}</p>
                            </div>
                        </div>
                        <div class="item-price" :class="{ discounted: item.originalPrice }">
                            ${{ item.price.toFixed(2) }}
                            <span class="item-price-original" v-if="item.originalPrice">${{ item.originalPrice.toFixed(2) }}</span>
                        </div>
                        <div>
                            <div class="quantity-control">
                                <button @click="updateQuantity(item.id, -1)">-</button>
                                <input type="number" :value="item.qty" readonly>
                                <button @click="updateQuantity(item.id, 1)">+</button>
                            </div>
                        </div>
                        <div class="item-total">${{ (item.price * item.qty).toFixed(2) }}</div>
                        <div>
                            <button class="item-remove" @click="removeItem(item.id)">×</button>
                        </div>
                    </div>

                    <div class="continue-shopping">
                        <router-link to="/resultados">Continuar comprando</router-link>
                    </div>
                </div>

                <div class="empty-cart" v-else>
                    <div class="empty-cart-icon">🛒</div>
                    <h2>Tu carrito está vacío</h2>
                    <p>Añade productos para empezar a comprar</p>
                    <router-link to="/" class="btn btn-primary" style="display: inline-block; max-width: 300px; margin: 0 auto;">
                        Ver productos
                    </router-link>
                </div>

                <!-- Cart Summary -->
                <div class="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    
                    <div class="summary-row subtotal">
                        <span>Subtotal (<span>{{ itemsCount }}</span> artículos)</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                    </div>
                    
                    <div class="summary-row shipping">
                        <span>Envío</span>
                        <span class="shipping-badge">GRATIS</span>
                    </div>
                    
                    <div class="summary-row discount" v-if="appliedDiscount > 0">
                        <span>Descuento</span>
                        <span>-${{ discountAmount.toFixed(2) }}</span>
                    </div>
                    
                    <div class="summary-row total">
                        <span>Total</span>
                        <span class="price">${{ total.toFixed(2) }}</span>
                    </div>
                    
                    <!-- Coupon -->
                    <div class="coupon-section">
                        <h4 style="font-size: 14px; color: #666; margin-bottom: 10px;">¿Tienes un cupón?</h4>
                        <div class="coupon-input">
                            <input type="text" v-model="couponInput" placeholder="Código de cupón" @keyup.enter="applyCoupon">
                            <button @click="applyCoupon">Aplicar</button>
                        </div>
                        <div class="coupon-applied active" v-if="appliedDiscount > 0">
                            <span>Cupón <strong>{{ appliedCode }}</strong> aplicado</span>
                            <button class="remove-coupon" @click="removeCoupon">×</button>
                        </div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="cart-actions">
                        <button class="btn btn-primary" @click="proceedToCheckout" :disabled="cart.length === 0">
                            Proceder al Pago
                        </button>
                        <button class="btn btn-secondary" @click="clearCart" :disabled="cart.length === 0">
                            Vaciar Carrito
                        </button>
                    </div>
                    
                    <!-- Payment Methods -->
                    <div class="payment-methods">
                        <h4>Métodos de Pago Aceptados</h4>
                        <div class="payment-icons">
                            <div class="payment-method-badge">
                                <i class="fa-solid fa-money-bill-wave"></i>
                                <span>Efectivo</span>
                            </div>
                            <div class="payment-method-badge">
                                <i class="fa-solid fa-credit-card"></i>
                                <span>Tarjeta</span>
                            </div>
                            <div class="payment-method-badge">
                                <i class="fa-solid fa-building-columns"></i>
                                <span>Transferencia</span>
                            </div>
                            <div class="payment-method-badge">
                                <i class="fa-solid fa-qrcode"></i>
                                <span>Pago QR</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Security -->
                    <div class="security-badge">
                        <span class="icon"><i class="fa-solid fa-lock"></i></span>
                        <span class="text">Compra 100% segura. Tus datos están protegidos.</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'



/*--------------- AQUÍ VAMOS AÑADIENDO DE FORMA ORDENADA LOS PRODUCTOS DEL CARRITO ---------------*/
const cart = ref([
    { id: 1, name: 'Lomo Fino Premium', sku: 'CAR-LF001', weight: '500g', cut: 'Medallón', price: 18.10, originalPrice: 25.50, qty: 2, image: 'corte_1.png' },
    { id: 2, name: 'Lomo Fino Premium', sku: 'CAR-LF001', weight: '500g', cut: 'Medallón', price: 4.50, originalPrice: null, qty: 1, image: 'corte_2.png' },
    { id: 3, name: 'Lomo Fino Premium', sku: 'CAR-LF001', weight: '500g', cut: 'Medallón', price: 10.70, originalPrice: null, qty: 3, image: 'corte_3.png' },
    { id: 4, name: 'Lomo Fino Premium', sku: 'CAR-LF001', weight: '500g', cut: 'Medallón', price: 5.80, originalPrice: null, qty: 1, image: 'corte_4.png' }
])

const couponInput = ref('')
const appliedDiscount = ref(0)
const appliedCode = ref('')

const itemsCount = computed(() => cart.value.reduce((acc, item) => acc + item.qty, 0))
const subtotal = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.qty), 0))
const discountAmount = computed(() => subtotal.value * appliedDiscount.value)
const total = computed(() => subtotal.value - discountAmount.value)

const updateQuantity = (id, change) => {
    const item = cart.value.find(i => i.id === id)
    if (!item) return
    
    const newQty = item.qty + change
    if (newQty < 1) {
        if (confirm('¿Deseas eliminar este producto del carrito?')) {
            removeItem(id)
        }
        return
    }
    if (newQty > 99) {
        alert('Cantidad máxima: 99 unidades')
        return
    }
    
    item.qty = newQty
}

const removeItem = (id) => {
    cart.value = cart.value.filter(i => i.id !== id)
}

const clearCart = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        cart.value = []
    }
}

const applyCoupon = () => {
    const code = couponInput.value.trim().toUpperCase()
    if (!code) {
        alert('Por favor ingresa un código de cupón')
        return
    }
    
    const validCoupons = {
        'DESCUENTO10': 0.10,
        'BIENVENIDO': 0.10,
        'PROMO2026': 0.15
    }
    
    if (validCoupons[code]) {
        appliedDiscount.value = validCoupons[code]
        appliedCode.value = code
        couponInput.value = ''
        alert(`¡Cupón aplicado! ${validCoupons[code] * 100}% de descuento`)
    } else {
        alert('Cupón inválido o expirado')
    }
}

const removeCoupon = () => {
    appliedDiscount.value = 0
    appliedCode.value = ''
    alert('Cupón eliminado')
}

const proceedToCheckout = () => {
    if (cart.value.length === 0) return
    window.location.href = '/pago'
}
</script>

<style scoped>
/* Scoped styles */
</style>
