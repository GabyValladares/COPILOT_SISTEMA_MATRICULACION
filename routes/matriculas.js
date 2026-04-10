const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matriculaController');

// Listar todas las matriculaciones
router.get('/', matriculaController.getAll);

// Ver detalles de una matriculación
router.get('/:id/detalle', matriculaController.getDetail);

// Formulario para nueva matriculación
router.get('/nuevo', matriculaController.getForm);

// Crear nueva matriculación
router.post('/crear', matriculaController.crear);

// Formulario para editar matriculación
router.get('/:id/editar', matriculaController.getEditForm);

// Actualizar matriculación
router.post('/:id/actualizar', matriculaController.actualizar);

// Eliminar matriculación
router.delete('/:id', matriculaController.eliminar);

// API: Obtener estadísticas
router.get('/api/estadisticas', matriculaController.getEstadisticas);

module.exports = router;
