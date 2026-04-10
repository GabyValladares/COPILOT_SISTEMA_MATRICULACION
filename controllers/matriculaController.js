const Matricula = require('../models/matricula');
const Estudiante = require('../models/estudiante');
const db = require('../database/init');

exports.getAll = (req, res) => {
  Matricula.getAll((err, matriculas) => {
    if (err) {
      return res.status(500).render('error', { 
        message: 'Error al obtener matriculas',
        error: err 
      });
    }

    // Obtener estadísticas
    Matricula.getEstadisticas((err, estadisticas) => {
      res.render('matriculas', { 
        title: 'Listado de Matriculaciones',
        matriculas: matriculas || [],
        estadisticas: estadisticas || [],
        periodo: 'PAO-I-2026'
      });
    });
  });
};

exports.getForm = (req, res) => {
  // Obtener carreras y modalidades
  db.all('SELECT id, nombre, codigo FROM carreras', (err, carreras) => {
    db.all('SELECT id, nombre, codigo FROM modalidades', (err, modalidades) => {
      db.all(`SELECT id, cedula, nombre, apellido FROM estudiantes WHERE estado = 'activo' ORDER BY apellido`, (err, estudiantes) => {
        res.render('formulario-matricula', { 
          title: 'Nueva Matriculación',
          modo: 'crear',
          carreras: carreras || [],
          modalidades: modalidades || [],
          estudiantes: estudiantes || []
        });
      });
    });
  });
};

exports.getEditForm = (req, res) => {
  const { id } = req.params;

  db.all('SELECT id, nombre, codigo FROM carreras', (err, carreras) => {
    db.all('SELECT id, nombre, codigo FROM modalidades', (err, modalidades) => {
      db.all(`SELECT id, cedula, nombre, apellido FROM estudiantes WHERE estado = 'activo' ORDER BY apellido`, (err, estudiantes) => {
        Matricula.getById(id, (err, matricula) => {
          if (err || !matricula) {
            return res.status(404).render('error', { 
              message: 'Matriculación no encontrada'
            });
          }
          res.render('formulario-matricula', { 
            title: 'Editar Matriculación',
            modo: 'editar',
            matricula: matricula,
            carreras: carreras || [],
            modalidades: modalidades || [],
            estudiantes: estudiantes || []
          });
        });
      });
    });
  });
};

exports.crear = (req, res) => {
  const { estudiante_id, carrera_id, modalidad_id } = req.body;

  if (!estudiante_id || !carrera_id || !modalidad_id) {
    return res.status(400).render('error', { 
      message: 'Todos los campos son obligatorios'
    });
  }

  // Verificar si ya existe una matricula en el periodo
  Matricula.getByEstudianteYPeriodo(estudiante_id, 'PAO-I-2026', (err, existing) => {
    if (existing) {
      return res.status(400).render('error', { 
        message: 'El estudiante ya tiene una matriculación en este período'
      });
    }

    Matricula.create({ estudiante_id, carrera_id, modalidad_id }, (err, result) => {
      if (err) {
        return res.status(500).render('error', { 
          message: 'Error al crear matriculación',
          error: err
        });
      }
      res.redirect('/matriculas?success=Matriculación creada exitosamente');
    });
  });
};

exports.actualizar = (req, res) => {
  const { id } = req.params;
  const { carrera_id, modalidad_id, estado } = req.body;

  if (!carrera_id || !modalidad_id) {
    return res.status(400).render('error', { 
      message: 'Carrera y modalidad son obligatorias'
    });
  }

  Matricula.update(id, { carrera_id, modalidad_id, estado }, (err) => {
    if (err) {
      return res.status(500).render('error', { 
        message: 'Error al actualizar matriculación',
        error: err
      });
    }
    res.redirect('/matriculas?success=Matriculación actualizada exitosamente');
  });
};

exports.eliminar = (req, res) => {
  const { id } = req.params;

  Matricula.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al eliminar' });
    }
    res.json({ success: true, message: 'Matriculación eliminada exitosamente' });
  });
};

exports.getEstadisticas = (req, res) => {
  Matricula.getEstadisticas((err, estadisticas) => {
    if (err) {
      return res.status(500).json({ success: false, error: err });
    }
    res.json({ success: true, data: estadisticas });
  });
};

exports.getDetail = (req, res) => {
  const { id } = req.params;

  Matricula.getById(id, (err, matricula) => {
    if (err || !matricula) {
      return res.status(404).render('error', { 
        message: 'Matriculación no encontrada'
      });
    }
    res.render('detalle-matricula', { 
      title: `Matriculación de ${matricula.nombre} ${matricula.apellido}`,
      matricula: matricula
    });
  });
};
