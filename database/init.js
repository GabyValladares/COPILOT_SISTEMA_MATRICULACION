const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'matriculacion.db');

// Crear carpeta si no existe
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    process.exit(1);
  }
  console.log('✅ Conectado a la base de datos SQLite');
});

// Crear tablas
db.serialize(() => {
  // Tabla de carreras
  db.run(`
    CREATE TABLE IF NOT EXISTS carreras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      codigo TEXT NOT NULL UNIQUE,
      descripcion TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creando tabla carreras:', err.message);
    else console.log('✅ Tabla carreras lista');
  });

  // Tabla de modalidades
  db.run(`
    CREATE TABLE IF NOT EXISTS modalidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      codigo TEXT NOT NULL UNIQUE,
      descripcion TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creando tabla modalidades:', err.message);
    else console.log('✅ Tabla modalidades lista');
  });

  // Tabla de estudiantes
  db.run(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cedula TEXT NOT NULL UNIQUE,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT,
      fecha_nacimiento DATE,
      genero TEXT,
      direccion TEXT,
      ciudad TEXT,
      provincia TEXT,
      estado TEXT DEFAULT 'activo',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creando tabla estudiantes:', err.message);
    else console.log('✅ Tabla estudiantes lista');
  });

  // Tabla de matriculas
  db.run(`
    CREATE TABLE IF NOT EXISTS matriculas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estudiante_id INTEGER NOT NULL,
      carrera_id INTEGER NOT NULL,
      modalidad_id INTEGER NOT NULL,
      periodo TEXT NOT NULL DEFAULT 'PAO-I-2026',
      fecha_matricula DATETIME DEFAULT CURRENT_TIMESTAMP,
      estado TEXT DEFAULT 'activa',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
      FOREIGN KEY (carrera_id) REFERENCES carreras(id),
      FOREIGN KEY (modalidad_id) REFERENCES modalidades(id),
      UNIQUE(estudiante_id, periodo)
    )
  `, (err) => {
    if (err) console.error('Error creando tabla matriculas:', err.message);
    else console.log('✅ Tabla matriculas lista');
  });

  // Insertar datos iniciales de carreras
  db.run(`
    INSERT OR IGNORE INTO carreras (nombre, codigo, descripcion)
    VALUES 
      ('Desarrollo de Software', 'DS-2026', 'Carrera especializada en desarrollo de aplicaciones y software'),
      ('Electrónica', 'EC-2026', 'Carrera especializada en electrónica y sistemas embebidos')
  `, (err) => {
    if (err) console.error('Error insertando carreras:', err.message);
    else console.log('✅ Carreras inicializadas');
  });

  // Insertar datos iniciales de modalidades
  db.run(`
    INSERT OR IGNORE INTO modalidades (nombre, codigo, descripcion)
    VALUES 
      ('Presencial', 'PRES-2026', 'Modalidad presencial - Clases en campus'),
      ('Virtual', 'VIRT-2026', 'Modalidad virtual - Clases en línea')
  `, (err) => {
    if (err) console.error('Error insertando modalidades:', err.message);
    else console.log('✅ Modalidades inicializadas');
  });

  // Insertar datos de ejemplo
  db.run(`
    INSERT OR IGNORE INTO estudiantes 
    (cedula, nombre, apellido, email, telefono, fecha_nacimiento, genero, direccion, ciudad, provincia)
    VALUES 
      ('1234567890', 'Juan', 'Pérez', 'juan.perez@example.com', '0987654321', '2000-05-15', 'M', 'Calle Principal 123', 'Quito', 'Pichincha'),
      ('1234567891', 'María', 'García', 'maria.garcia@example.com', '0987654322', '2001-08-20', 'F', 'Avenida Central 456', 'Guayaquil', 'Guayas'),
      ('1234567892', 'Carlos', 'López', 'carlos.lopez@example.com', '0987654323', '1999-03-10', 'M', 'Calle Secundaria 789', 'Cuenca', 'Azuay')
  `, (err) => {
    if (err) console.error('Error insertando estudiantes de ejemplo:', err.message);
    else console.log('✅ Estudiantes de ejemplo inicializados');
  });
});

module.exports = db;
