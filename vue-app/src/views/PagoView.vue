<template>
  <div>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <div class="container">
            <ul>
                <li><router-link to="/">Inicio</router-link></li>
                <li>→</li>
                <li><router-link to="/carrito">Carrito de Compras</router-link></li>
                <li>→</li>
                <li><span>Finalizar Compra</span></li>
            </ul>
        </div>
    </div>
    <main>
        <div class="container">
            <div class="page-title">
                <h1>Finalizar Compra</h1>
            </div>

            <form id="checkout-form" @submit.prevent="submitForm">
                <div class="checkout-container">
                    <!-- Checkout Form -->
                    <div class="checkout-form">
                        <!-- Datos Personales -->
                        <h2 class="section-title">1. Datos Personales</h2>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Nombre <span class="required">*</span></label>
                                <input type="text" v-model="formData.firstName" required placeholder="Juan">
                            </div>
                            <div class="form-group">
                                <label>Apellido <span class="required">*</span></label>
                                <input type="text" v-model="formData.lastName" required placeholder="Pérez">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Correo Electrónico <span class="required">*</span></label>
                                <input type="email" v-model="formData.email" required placeholder="juan.perez@ejemplo.com">
                            </div>
                            <div class="form-group">
                                <label>Teléfono/WhatsApp <span class="required">*</span></label>
                                <input type="tel" v-model="formData.phone" required placeholder="0999999999" pattern="[0-9]{10}">
                                <div class="form-hint">Ej: 0999999999 (10 dígitos)</div>
                            </div>
                        </div>

                        <!-- Datos de Envío -->
                        <h2 class="section-title" style="margin-top: 40px;">2. Dirección de Envío</h2>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Provincia <span class="required">*</span></label>
                                <select v-model="formData.province" required>
                                    <option value="">Selecciona una provincia</option>
                                    <option value="pichincha">Pichincha</option>
                                    <option value="guayas">Guayas</option>
                                    <option value="azuay">Azuay</option>
                                    <option value="manabi">Manabí</option>
                                    <option value="tungurahua">Tungurahua</option>
                                    <option value="el-oro">El Oro</option>
                                    <option value="los-rios">Los Ríos</option>
                                    <option value="esmeraldas">Esmeraldas</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Ciudad <span class="required">*</span></label>
                                <input type="text" v-model="formData.city" required placeholder="Quito">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Calle Principal <span class="required">*</span></label>
                            <input type="text" v-model="formData.street" required placeholder="Av. Amazonas">
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Número <span class="required">*</span></label>
                                <input type="text" v-model="formData.streetNumber" required placeholder="N24-123">
                            </div>
                            <div class="form-group">
                                <label>Intersección</label>
                                <input type="text" v-model="formData.intersection" placeholder="y Av. República">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Sector/Barrio <span class="required">*</span></label>
                                <input type="text" v-model="formData.neighborhood" required placeholder="La Carolina">
                            </div>
                            <div class="form-group">
                                <label>Código Postal</label>
                                <input type="text" v-model="formData.zipCode" placeholder="170150">
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Referencias de Ubicación</label>
                            <textarea v-model="formData.reference" placeholder="Ej: Edificio azul, tercer piso, junto al parque..."></textarea>
                        </div>

                        <!-- Método de Pago -->
                        <h2 class="section-title" style="margin-top: 40px;">3. Método de Pago</h2>
                        
                        <div class="payment-methods">
                            <!-- Opción 1: Tarjeta de Crédito/Débito -->
                            <div class="payment-option" :class="{ selected: selectedPayment === 'card' }" @click="selectPayment('card')">
                                <input type="radio" :checked="selectedPayment === 'card'" name="paymentType" style="pointer-events: none;">
                                <div class="payment-header">
                                    <div class="payment-icon"><i class="fa-solid fa-dollar-sign"></i></div>
                                    <div class="payment-info">
                                        <h4>Tarjeta de Crédito/Débito</h4>
                                        <p>Pago seguro con tarjetas de bancos ecuatorianos</p>
                                    </div>
                                </div>
                                
                                <div class="payment-details" v-if="selectedPayment === 'card'" @click.stop>
                                    <h5 style="margin-bottom: 15px; color: #333;">Selecciona tu banco:</h5>
                                    <div class="banks-grid">
                                        <label class="bank-option" :class="{ selected: formData.bank === 'pichincha' }" @click.stop>
                                            <input type="radio" v-model="formData.bank" value="pichincha">
                                            <div class="bank-logo">🏦</div>
                                            <div class="bank-name">Banco Pichincha</div>
                                        </label>
                                        <label class="bank-option" :class="{ selected: formData.bank === 'guayaquil' }" @click.stop>
                                            <input type="radio" v-model="formData.bank" value="guayaquil">
                                            <div class="bank-logo">🏦</div>
                                            <div class="bank-name">Banco Guayaquil</div>
                                        </label>
                                        <!-- Other banks omitted for brevity, logic remains identical -->
                                    </div>

                                    <div class="card-form">
                                        <div class="form-group">
                                            <label>Número de Tarjeta <span class="required">*</span></label>
                                            <div class="card-input">
                                                <input type="text" v-model="formData.cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" @input="formatCard">
                                                <span class="card-brand">{{ cardBrandEmoji }}</span>
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group">
                                                <label>Nombre en la Tarjeta <span class="required">*</span></label>
                                                <input type="text" v-model="formData.cardName" placeholder="JUAN PEREZ" style="text-transform: uppercase;">
                                            </div>
                                            <div class="form-group">
                                                <label>Fecha de Vencimiento <span class="required">*</span></label>
                                                <input type="text" v-model="formData.cardExpiry" placeholder="MM/AA" maxlength="5" @input="formatExpiry">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label>CVV <span class="required">*</span></label>
                                            <input type="text" v-model="formData.cardCVV" placeholder="123" maxlength="4" style="max-width: 150px;">
                                            <div class="cvv-info">
                                                <span>3 o 4 dígitos en el reverso de tu tarjeta</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Opción 2: Pago por WhatsApp -->
                            <div class="payment-option" :class="{ selected: selectedPayment === 'whatsapp' }" @click="selectPayment('whatsapp')">
                                <input type="radio" :checked="selectedPayment === 'whatsapp'" name="paymentType" style="pointer-events: none;">
                                <div class="payment-header">
                                    <div class="payment-icon"><i class="fa-brands fa-whatsapp"></i></div>
                                    <div class="payment-info">
                                        <h4>Pago por WhatsApp</h4>
                                        <p>Nuestro equipo te contactará para coordinar el pago</p>
                                    </div>
                                </div>
                                
                                <div class="payment-details" v-if="selectedPayment === 'whatsapp'" @click.stop>
                                    <div class="whatsapp-info">
                                        <h5>📱 ¿Cómo funciona?</h5>
                                        <ul>
                                            <li>Recibirás un mensaje de WhatsApp en <strong>{{ formData.phone || 'tu número' }}</strong></li>
                                            <li>Nuestro asesor te guiará en el proceso de pago</li>
                                        </ul>
                                    </div>

                                    <div class="form-group" style="margin-top: 20px;">
                                        <label>Confirma tu número de WhatsApp <span class="required">*</span></label>
                                        <input type="tel" v-model="formData.whatsappPhone" placeholder="0999999999">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Terms and Submit -->
                        <div class="submit-section">
                            <div class="terms-checkbox">
                                <label>
                                    <input type="checkbox" v-model="termsAccepted" required>
                                    <span>He leído y acepto los <a href="#" target="_blank">términos y condiciones</a> y la <a href="#" target="_blank">política de privacidad</a></span>
                                </label>
                            </div>

                            <button type="submit" class="btn-submit">
                                Confirmar Pedido - $78.60
                            </button>

                            <div class="security-badge">
                                <span class="icon"><i class="fa-solid fa-lock"></i></span>
                                <span class="text">Compra 100% segura. Tus datos están protegidos.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Order Summary -->
                    <div class="order-summary">
                        <h2>Resumen del Pedido</h2>
                        <!-- Simplified summary for testing -->
                        <div class="summary-item">
                            <div class="summary-item-info">
                                <div class="summary-item-name">Lomo de Res Premium</div>
                                <div class="summary-item-qty">Cantidad: 2</div>
                            </div>
                            <div class="summary-item-price">$36.20</div>
                        </div>

                        <div class="summary-totals">
                            <div class="summary-row">
                                <span>Subtotal</span>
                                <span>$78.60</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total</span>
                                <span class="price">$78.60</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>

    <!-- Modal de Confirmación -->
    <div class="modal" :class="{ active: isConfirmed }" id="confirmation-modal" @click.self="isConfirmed = false">
        <div class="modal-content">
            <div class="modal-icon"><i class="fa-regular fa-circle-check"></i></div>
            <h2>¡Pedido Confirmado!</h2>
            <p v-html="confirmationMessage"></p>
            <div class="modal-buttons">
                <router-link to="/" class="btn btn-primary" style="display:inline-block">Volver al Inicio</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    street: '',
    streetNumber: '',
    intersection: '',
    neighborhood: '',
    zipCode: '',
    reference: '',
    bank: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    whatsappPhone: ''
})

const selectedPayment = ref('')
const termsAccepted = ref(false)
const isConfirmed = ref(false)

const cardBrandEmoji = computed(() => {
    const val = formData.value.cardNumber.replace(/\s/g, '')
    if (val.startsWith('4')) return '💳' // Visa
    if (val.startsWith('5')) return '💳' // MC
    return ''
})

const selectPayment = (method) => {
    if (selectedPayment.value === method) {
        selectedPayment.value = ''
    } else {
        selectedPayment.value = method
        if (method === 'whatsapp') {
            formData.value.whatsappPhone = formData.value.phone
        }
    }
}

const formatCard = (e) => {
    let value = e.target.value.replace(/\s/g, '')
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
    formData.value.cardNumber = formattedValue
}

const formatExpiry = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    formData.value.cardExpiry = value
}

// Watch changes on phone to mirror to whatsapp
watch(() => formData.value.phone, (newPhone) => {
    if (selectedPayment.value === 'whatsapp') {
        formData.value.whatsappPhone = newPhone
    }
})

const confirmationMessage = computed(() => {
    if (selectedPayment.value === 'card') {
        return `<strong>Tu pago ha sido procesado exitosamente.</strong><br>
                Recibirás un correo de confirmación con los detalles de tu pedido.<br>
                Número de orden: <strong>#${Math.floor(Math.random() * 100000)}</strong>`
    } else {
        return `<strong>¡Tu pedido ha sido registrado!</strong><br>
                En breve recibirás un mensaje de WhatsApp en el número <strong>${formData.value.whatsappPhone}</strong> 
                para coordinar el pago y la entrega.<br>
                Número de orden: <strong>#${Math.floor(Math.random() * 100000)}</strong>`
    }
})

const submitForm = () => {
    if (!selectedPayment.value) {
        alert('Por favor selecciona un método de pago')
        return
    }

    if (selectedPayment.value === 'card') {
        if (!formData.value.bank) {
            alert('Por favor selecciona tu banco')
            return
        }
        if (!formData.value.cardNumber || !formData.value.cardName || !formData.value.cardExpiry || !formData.value.cardCVV) {
            alert('Por favor completa todos los datos de la tarjeta')
            return
        }
    }

    if (selectedPayment.value === 'whatsapp') {
        if (!formData.value.whatsappPhone) {
            alert('Por favor confirma tu número de WhatsApp')
            return
        }
    }

    if (!termsAccepted.value) {
        alert('Debes aceptar los términos y condiciones')
        return
    }

    isConfirmed.value = true
}
</script>

<style scoped>
/* Specific view styles */
</style>
