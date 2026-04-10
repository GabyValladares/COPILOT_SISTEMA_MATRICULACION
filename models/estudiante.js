const db = require('../database/init');

class Estudiante {
  static getAll(callback) {
    db.all(`SELECT * FROM estudiantes ORDER BY apellido, nombre`, callback);
  }

  static getById(id, callback) {
    db.get(`SELECT * FROM estudiantes WHERE id = ?`, [id], callback);
  }

  static getByCedula(cedula, callback) {
    db.get(`SELECT * FROM estudiantes WHERE cedula = ?`, [cedula], callback);
  }

  static create(datos, callback) {
    const { cedula, nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia } = datos;
    
    db.run(
      `INSERT INTO estudiantes (cedula, nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [cedula, nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia],
      function(err) {
        callback(err, { id: this.lastID });
      }
    );
  }

  static update(id, datos, callback) {
    const { nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia, estado } = datos;
    
    db.run(
      `UPDATE estudiantes 
       SET nombre = ?, apellido = ?, email = ?, telefono = ?, fecha_nacimiento = ?, genero = ?, 
           direccion = ?, ciudad = ?, provincia = ?, estado = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia, estado, id],
      callback
    );
  }

  static delete(id, callback) {
    db.run(`DELETE FROM estudiantes WHERE id = ?`, [id], callback);
  }

  static countByCarreraAndModalidad(carrera_id, modalidad_id, callback) {
    db.get(
      `SELECT COUNT(*) as count FROM matriculas 
       WHERE carrera_id = ? AND modalidad_id = ? AND estado = 'activa'`,
      [carrera_id, modalidad_id],
      callback
    );
  }
}

module.exports = Estudiante;
