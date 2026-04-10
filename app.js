const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto',
  resave: false,
  saveUninitialized: true
}));

// Rutas
const estudiantesRoutes = require('./routes/estudiantes');
const matriculasRoutes = require('./routes/matriculas');

app.use('/estudiantes', estudiantesRoutes);
app.use('/matriculas', matriculasRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Sistema de Matriculación - PAO-I-2026',
    periodo: 'PAO-I-2026'
  });
});

// Página de bienvenida / dashboard
app.get('/dashboard', (req, res) => {
  res.render('dashboard', { 
    title: 'Dashboard - Sistema de Matriculación'
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Página no encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
  console.log(`📱 Accede a: http://localhost:${PORT}`);
  console.log(`📅 Período: PAO-I-2026`);
  console.log(`========================================\n`);
});

module.exports = app;
