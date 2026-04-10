const Estudiante = require('../models/estudiante');
const db = require('../database/init');

exports.getAll = (req, res) => {
  Estudiante.getAll((err, estudiantes) => {
    if (err) {
      return res.status(500).render('error', { 
        message: 'Error al obtener estudiantes',
        error: err 
      });
    }
    res.render('estudiantes', { 
      title: 'Listado de Estudiantes',
      estudiantes: estudiantes || []
    });
  });
};

exports.getForm = (req, res) => {
  res.render('formulario-estudiante', { 
    title: 'Nuevo Estudiante',
    estudiante: null,
    modo: 'crear'
  });
};

exports.getEditForm = (req, res) => {
  const { id } = req.params;
  
  Estudiante.getById(id, (err, estudiante) => {
    if (err || !estudiante) {
      return res.status(404).render('error', { 
        message: 'Estudiante no encontrado'
      });
    }
    res.render('formulario-estudiante', { 
      title: 'Editar Estudiante',
      estudiante: estudiante,
      modo: 'editar'
    });
  });
};

exports.crear = (req, res) => {
  const { cedula, nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia } = req.body;

  // Validaciones básicas
  if (!cedula || !nombre || !apellido || !email) {
    return res.status(400).render('error', { 
      message: 'Los campos cedula, nombre, apellido y email son obligatorios'
    });
  }

  Estudiante.create({ cedula, nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia }, (err, result) => {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).render('error', { 
          message: 'La cédula ya existe en el sistema'
        });
      }
      return res.status(500).render('error', { 
        message: 'Error al crear estudiante',
        error: err
      });
    }
    res.redirect('/estudiantes?success=Estudiante creado exitosamente');
  });
};

exports.actualizar = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia, estado } = req.body;

  if (!nombre || !apellido || !email) {
    return res.status(400).render('error', { 
      message: 'Los campos nombre, apellido y email son obligatorios'
    });
  }

  Estudiante.update(id, { nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia, estado }, (err) => {
    if (err) {
      return res.status(500).render('error', { 
        message: 'Error al actualizar estudiante',
        error: err
      });
    }
    res.redirect('/estudiantes?success=Estudiante actualizado exitosamente');
  });
};

exports.eliminar = (req, res) => {
  const { id } = req.params;

  // Verificar si el estudiante tiene matriculas activas
  db.get(`SELECT COUNT(*) as count FROM matriculas WHERE estudiante_id = ? AND estado = 'activa'`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error en la consulta' });
    }

    if (row.count > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No se puede eliminar un estudiante con matriculas activas'
      });
    }

    Estudiante.delete(id, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error al eliminar' });
      }
      res.json({ success: true, message: 'Estudiante eliminado exitosamente' });
    });
  });
};

exports.getDetail = (req, res) => {
  const { id } = req.params;

  Estudiante.getById(id, (err, estudiante) => {
    if (err || !estudiante) {
      return res.status(404).render('error', { 
        message: 'Estudiante no encontrado'
      });
    }

    // Obtener matriculas del estudiante
    db.all(`
      SELECT m.*, c.nombre as carrera, mod.nombre as modalidad
      FROM matriculas m
      JOIN carreras c ON m.carrera_id = c.id
      JOIN modalidades mod ON m.modalidad_id = mod.id
      WHERE m.estudiante_id = ?
      ORDER BY m.fecha_matricula DESC
    `, [id], (err, matriculas) => {
      res.render('detalle-estudiante', { 
        title: `Perfil de ${estudiante.nombre} ${estudiante.apellido}`,
        estudiante: estudiante,
        matriculas: matriculas || []
      });
    });
  });
};
