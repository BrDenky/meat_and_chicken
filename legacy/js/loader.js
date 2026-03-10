// loader.js - Carga componentes HTML dinámicamente

// Función para cargar un componente HTML
async function loadComponent(componentPath, targetId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${componentPath}: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(targetId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error cargando componente:', error);
    }
}

// Cargar todos los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function() {
    // Cargar header (incluye sidebar y overlay)
    await loadComponent('./header.html', 'header-placeholder');
    
    // Cargar footer
    await loadComponent('./footer.html', 'footer-placeholder');
    
    // Inicializar funciones después de cargar los componentes
    initializeApp();
});

// Función para inicializar la aplicación después de cargar componentes
function initializeApp() {
    // Aquí puedes agregar inicializaciones adicionales si es necesario
    console.log('Componentes cargados correctamente');
}