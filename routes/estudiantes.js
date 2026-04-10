const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Listar todos los estudiantes
router.get('/', estudianteController.getAll);

// Ver detalles de un estudiante
router.get('/:id/detalle', estudianteController.getDetail);

// Formulario para crear nuevo estudiante
router.get('/nuevo', estudianteController.getForm);

// Crear nuevo estudiante
router.post('/crear', estudianteController.crear);

// Formulario para editar estudiante
router.get('/:id/editar', estudianteController.getEditForm);

// Actualizar estudiante
router.post('/:id/actualizar', estudianteController.actualizar);

// Eliminar estudiante
router.delete('/:id', estudianteController.eliminar);

module.exports = router;
