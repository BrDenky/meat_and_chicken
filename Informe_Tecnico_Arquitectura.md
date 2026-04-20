# Informe Técnico: Arquitectura y Flujo de la Aplicación "Meat & Chicken Fast"

## 1. Resumen Ejecutivo
El presente informe detalla la arquitectura de software y los flujos operativos implementados en la aplicación **Meat & Chicken Fast**. La plataforma está diseñada como un Marketplace B2B2C (Business-to-Business-to-Consumer) que conecta proveedores cárnicos de alta calidad con consumidores finales, ofreciendo una experiencia premium, trazabilidad de productos y gestión eficiente tanto para compradores como vendedores.

---

## 2. Arquitectura Tecnológica
La aplicación está construida utilizando tecnologías modernas de desarrollo web, adoptando un enfoque de **Single Page Application (SPA)** respaldado por una arquitectura **Serverless / BaaS (Backend as a Service)**.

### Frontend
- **Framework Principal:** Vue.js 3 (Composition API) para una interfaz reactiva, modular y eficiente.
- **Herramienta de Construcción:** Vite, proporcionando tiempos de compilación ultrarrápidos y optimización de assets.
- **Enrutamiento:** Vue Router, manejando la navegación limpia entre múltiples vistas (Inicio, Carrito, Pago, Perfil de Proveedor, etc.).
- **Gestión del Estado Global:** Pinia (utilizado en módulos críticos como el carrito de compras `cart.js`), permitiendo la reactividad global y persistencia de datos complejos.

### Backend y Base de Datos (Supabase)
La persistencia de datos, autenticación y almacenamiento de archivos se gestionan mediante **Supabase** (una alternativa Open Source a Firebase basada en PostgreSQL):
- **Base de Datos Relacional:** PostgreSQL, manejando tablas para perfiles (`proveedor_info`), inventario (`productos`), carrito de compras (`cart_items`), e inscripciones (`solicitudes_proveedor`).
- **Autenticación:** Supabase Auth, asegurando el inicio de sesión para los distintos actores y el manejo seguro de sesiones (JWT).
- **Almacenamiento (Storage):** Buckets de Supabase para almacenar de manera segura imágenes de productos, códigos QR de pagos y PDFs de certificaciones legales (Agrocalidad, ARCSA).

---

## 3. Flujo de Compra por Parte del Cliente (B2C)

El proceso de compra fue diseñado priorizando la menor fricción posible, manteniendo un estándar visual premium.

1. **Exploración y Selección:**
   - El cliente puede explorar proveedores destacados o ver el catálogo de productos (ej. Lomo Fino Premium, Mix Parrillero).
   - La vista de productos cuenta con filtros dinámicos basados en categorías y tipos de corte.

2. **Gestión del Carrito de Compras (`cart.js`):**
   - **Sistema Híbrido:** Si el usuario es _invitado_, el carrito se guarda localmente (Local Storage). Al iniciar sesión, el carrito local se fusiona ("upsert") automáticamente con la base de datos en Supabase.
   - Cálculos en tiempo real de subtotales y cantidades manejados en el estado local temporal.

3. **Checkout (Finalización de Compra - `PagoView.vue`):**
   - **Datos Personales y Envío:** Recolección dinámica de datos de despacho geolocalizados por provincias y confirmación de dirección exacta.
   - **Múltiples Métodos de Pago:**
     - *Tarjeta de Crédito/Débito:* Formulario simulado para plataformas locales mediante botón de pago con verificación de BIN para identificar el banco.
     - *Pago por WhatsApp:* Coordinación directa con asesores.
   - **Cierre:** Al confirmar, se limpian las tablas del carrito, se genera un número de orden único y se despliega un modal de confirmación limpio.

---

## 4. Implementación y Flujo del Proveedor (B2B)

Los proveedores cárnicos cuentan con un ecosistema propio para digitalizar sus ventas manteniendo cumplimiento legal.

1. **Onboarding Institucional (`TrabajaView.vue`):**
   - Landing page para captar prospectos con exposición de beneficios. 
   - Formulario que registra directamente la solicitud en la tabla `solicitudes_proveedor` para ser auditada por administración antes del alta definitiva.

2. **Dashboard Privado de Proveedor (`ProveedorView.vue`):**
   Una vez verificados, acceden a su panel de control:
   - *Gestión de Catálogo:* CRUD (Crear, Leer, Actualizar, Borrar) de productos. Pueden especificar detalles finos como Fecha del Camal, Peso, Tipo de Corte (Premium, Especial), y precio. Todo se sincroniza con el Storage (imágenes).
   - *Configuración Financiera:* Subida de sus códigos QR bancarios (Banco Pichincha, Guayaquil) y registro de cuentas de cobranza.
   - *Validación Legal (Compliance):* Un apartado crítico donde el proveedor debe subir en PDF sus Certificados de Agrocalidad (CSOM, MABIO, Guías de Movilización) y Notas Sanitarias (ARCSA). Estos datos garantizan la trazabilidad expuesta al cliente.

3. **Perfil Público del Proveedor (`PerfilProveedorView.vue`):**
   - Escaparate virtual generado dinámicamente con la información cargada en su Dashboard.
   - Presenta un diseño moderno tipo "Tabs" que incluye: vista general de cortes disponibles, historia de la compañía, integración incrustada de Google Maps para sus instalaciones y formularios de contacto directo.

---

## 5. Escalabilidad y Próximos Pasos

La plataforma se encuentra lista para escalar:
- **Seguridad:** El manejo robusto de sesiones y el aislamiento de datos (Row Level Security en Supabase) aseguran que un proveedor solo manipule sus propios items.
- La división de lógica de "Stores" e integraciones asíncronas con Supabase aseguran que se puedan añadir módulos futuros (como un módulo logístico de rastreo o facturación electrónica) sin alterar el núcleo de la aplicación de compra actual.
