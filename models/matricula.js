const db = require('../database/init');

class Matricula {
  static getAll(callback) {
    db.all(`
      SELECT m.*, e.nombre, e.apellido, e.cedula, c.nombre as carrera, mod.nombre as modalidad
      FROM matriculas m
      JOIN estudiantes e ON m.estudiante_id = e.id
      JOIN carreras c ON m.carrera_id = c.id
      JOIN modalidades mod ON m.modalidad_id = mod.id
      ORDER BY m.fecha_matricula DESC
    `, callback);
  }

  static getById(id, callback) {
    db.get(`
      SELECT m.*, e.nombre, e.apellido, e.cedula, c.nombre as carrera, mod.nombre as modalidad
      FROM matriculas m
      JOIN estudiantes e ON m.estudiante_id = e.id
      JOIN carreras c ON m.carrera_id = c.id
      JOIN modalidades mod ON m.modalidad_id = mod.id
      WHERE m.id = ?
    `, [id], callback);
  }

  static getByEstudianteYPeriodo(estudiante_id, periodo, callback) {
    db.get(`
      SELECT * FROM matriculas
      WHERE estudiante_id = ? AND periodo = ?
    `, [estudiante_id, periodo], callback);
  }

  static create(datos, callback) {
    const { estudiante_id, carrera_id, modalidad_id, periodo = 'PAO-I-2026' } = datos;
    
    db.run(
      `INSERT INTO matriculas (estudiante_id, carrera_id, modalidad_id, periodo)
       VALUES (?, ?, ?, ?)`,
      [estudiante_id, carrera_id, modalidad_id, periodo],
      function(err) {
        callback(err, { id: this.lastID });
      }
    );
  }

  static update(id, datos, callback) {
    const { carrera_id, modalidad_id, estado } = datos;
    
    db.run(
      `UPDATE matriculas 
       SET carrera_id = ?, modalidad_id = ?, estado = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [carrera_id, modalidad_id, estado, id],
      callback
    );
  }

  static delete(id, callback) {
    db.run(`DELETE FROM matriculas WHERE id = ?`, [id], callback);
  }

  static getByCarreraAndModalidad(carrera_id, modalidad_id, periodo = 'PAO-I-2026', callback) {
    db.all(
      `SELECT COUNT(*) as total FROM matriculas 
       WHERE carrera_id = ? AND modalidad_id = ? AND periodo = ? AND estado = 'activa'`,
      [carrera_id, modalidad_id, periodo],
      callback
    );
  }

  static getEstadisticas(callback) {
    db.all(`
      SELECT c.nombre as carrera, mod.nombre as modalidad, COUNT(*) as total
      FROM matriculas m
      JOIN carreras c ON m.carrera_id = c.id
      JOIN modalidades mod ON m.modalidad_id = mod.id
      WHERE m.estado = 'activa' AND m.periodo = 'PAO-I-2026'
      GROUP BY m.carrera_id, m.modalidad_id
    `, callback);
  }
}

module.exports = Matricula;
