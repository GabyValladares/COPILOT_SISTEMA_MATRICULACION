// Script principal para el Sistema de Matriculación

document.addEventListener('DOMContentLoaded', function() {
    // Auto-cerrar alertas después de 5 segundos
    const alertas = document.querySelectorAll('.alert');
    alertas.forEach(alerta => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alerta);
            bsAlert.close();
        }, 5000);
    });

    // Validación de formularios Bootstrap
    validarFormularios();

    // Inicializar tooltips
    inicializarTooltips();

    // Event listeners
    configurarEventListeners();
});

/**
 * Valida todos los formularios de la página
 */
function validarFormularios() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(formulario => {
        formulario.addEventListener('submit', function(e) {
            if (!this.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });
}

/**
 * Inicializa tooltips de Bootstrap
 */
function inicializarTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Configura event listeners globales
 */
function configurarEventListeners() {
    // Búsqueda en tablas
    const barraBusqueda = document.getElementById('search-input');
    if (barraBusqueda) {
        barraBusqueda.addEventListener('keyup', filtrarTabla);
    }

    // Confirmación antes de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', confirmarEliminacion);
    });
}

/**
 * Filtra contenido de una tabla
 */
function filtrarTabla(e) {
    const termino = e.target.value.toLowerCase();
    const filas = document.querySelectorAll('table tbody tr');

    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        fila.style.display = texto.includes(termino) ? '' : 'none';
    });
}

/**
 * Solicita confirmación antes de eliminar
 */
function confirmarEliminacion(e) {
    const nombre = e.target.dataset.nombre || 'este elemento';
    if (!confirm(`¿Estás seguro de que deseas eliminar a ${nombre}?`)) {
        e.preventDefault();
    }
}

/**
 * Formatea una fecha al formato local
 */
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Formatea una fecha y hora
 */
function formatearFechaHora(fecha) {
    return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Muestra una notificación
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    const contenedor = document.createElement('div');
    contenedor.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
    contenedor.style.cssText = 'top: 20px; right: 20px; z-index: 999; max-width: 400px;';
    contenedor.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(contenedor);

    setTimeout(() => {
        const alert = new bootstrap.Alert(contenedor);
        alert.close();
        contenedor.remove();
    }, 4000);
}

/**
 * Valida un email
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida una cédula ecuatoriana (básico)
 */
function validarCedula(cedula) {
    if (cedula.length !== 10) return false;
    if (!/^\d+$/.test(cedula)) return false;
    return true;
}

/**
 * Formatea un teléfono
 */
function formatearTelefono(telefono) {
    if (!telefono) return '';
    telefono = telefono.replace(/\D/g, '');
    if (telefono.length === 10) {
        return `${telefono.substring(0, 3)}-${telefono.substring(3, 6)}-${telefono.substring(6)}`;
    }
    return telefono;
}

/**
 * Obtiene parámetros de la URL
 */
function obtenerParametroURL(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

/**
 * Carga datos mediante fetch (AJAX)
 */
async function cargarDatos(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarNotificacion('Error al cargar los datos', 'danger');
        return null;
    }
}

/**
 * Envía datos mediante POST
 */
async function enviarDatos(url, datos) {
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
        return await respuesta.json();
    } catch (error) {
        console.error('Error al enviar datos:', error);
        mostrarNotificacion('Error al enviar los datos', 'danger');
        return null;
    }
}

/**
 * Capitaliza la primera letra de una cadena
 */
function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Genera un ID único
 */
function generarID() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Exporta tabla a CSV
 */
function exportarTableaACSV(tablaId, nombreArchivo = 'datos.csv') {
    const tabla = document.getElementById(tablaId);
    if (!tabla) {
        mostrarNotificacion('Tabla no encontrada', 'warning');
        return;
    }

    let csv = [];
    const filas = tabla.querySelectorAll('tr');

    filas.forEach(fila => {
        const fila_data = [];
        const celdas = fila.querySelectorAll('td, th');
        
        celdas.forEach(celda => {
            fila_data.push('"' + celda.textContent.trim().replace(/"/g, '""') + '"');
        });
        csv.push(fila_data.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', nombreArchivo);
    link.click();

    mostrarNotificacion('Tabla exportada exitosamente', 'success');
}

/**
 * Imprime una tabla
 */
function imprimirTabla(tablaId) {
    const tabla = document.getElementById(tablaId);
    if (!tabla) {
        mostrarNotificacion('Tabla no encontrada', 'warning');
        return;
    }

    const ventana = window.open('', '', 'width=800,height=600');
    ventana.document.write('<html><head><title>Impresión</title>');
    ventana.document.write(`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body { padding: 20px; }
            table { margin-top: 20px; }
            th { background-color: #0d6efd; color: white; }
        </style>
    `);
    ventana.document.write('</head><body>');
    ventana.document.write('<h2>Reporte</h2>');
    ventana.document.write(tabla.outerHTML);
    ventana.document.write('<script>window.print();</script>');
    ventana.document.write('</body></html>');
    ventana.document.close();
}

// Exportar funciones para uso global
window.matriculacionApp = {
    formatearFecha,
    formatearFechaHora,
    mostrarNotificacion,
    validarEmail,
    validarCedula,
    formatearTelefono,
    obtenerParametroURL,
    cargarDatos,
    enviarDatos,
    capitalizar,
    generarID,
    exportarTableaACSV,
    imprimirTabla
};
