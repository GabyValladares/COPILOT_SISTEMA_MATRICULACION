# Guía de Instalación y Uso

## 📋 Requisitos Previos

- **Node.js** v14 o superior
- **npm** (incluido con Node.js)
- **Navegador web moderno**

## 🚀 Instalación Rápida

### 1. Clonar o descargar el proyecto

```bash
cd sistema-matriculacion
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor

**En modo desarrollo (con reinicio automático):**

```bash
npm run dev
```

**En modo producción:**

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📱 Características del Sistema

### Gestión de Estudiantes
- ✅ Crear nuevos estudiantes
- ✅ Editar información de estudiantes
- ✅ Eliminar registros (si no tienen matriculaciones activas)
- ✅ Ver detalles de cada estudiante
- ✅ Filtrar estudiantes

### Gestión de Matriculaciones
- ✅ Crear nuevas matriculaciones
- ✅ Editar matriculaciones existentes
- ✅ Eliminar matriculaciones
- ✅ Ver detalles de matriculaciones
- ✅ Estados: Activa/Inactiva

### Carreras Disponibles
1. **Desarrollo de Software**: Especialización en desarrollo de aplicaciones
2. **Electrónica**: Especialización en sistemas electrónicos

### Modalidades
1. **Presencial**: Clases en el campus
2. **Virtual**: Clases en línea

## 🗄️ Base de Datos

El sistema utiliza **SQLite**. La base de datos se crea automáticamente en:

```
database/matriculacion.db
```

### Tablas Principales
- **estudiantes**: Información personal de estudiantes
- **matriculas**: Registros de matriculación
- **carreras**: Información de carreras
- **modalidades**: Información de modalidades

## 🎨 Personalización

### Cambiar Puerto
Edita `.env`:
```
PORT=3001
```

### Cambiar Datos de Conexión
Edita `.env` al inicio:
```
DB_PATH=./database/matriculacion.db
```

## 📊 Estructura de Carpetas

```
sistema-matriculacion/
├── app.js                    # Archivo principal
├── package.json              # Dependencias
├── .env                      # Variables de entorno
├── README.md                 # Documentación
│
├── public/                   # Archivos estáticos
│   ├── css/style.css        # Estilos personalizados
│   └── js/main.js           # Scripts del cliente
│
├── views/                    # Plantillas EJS
│   ├── index.ejs            # Página de inicio
│   ├── estudiantes.ejs      # Listado de estudiantes
│   ├── matriculas.ejs       # Listado de matriculaciones
│   ├── formulario-estudiante.ejs
│   ├── formulario-matricula.ejs
│   ├── dashboard.ejs        # Panel de control
│   ├── detalle-estudiante.ejs
│   ├── detalle-matricula.ejs
│   └── 404.ejs             # Página de error
│
├── routes/                   # Rutas de la aplicación
│   ├── estudiantes.js
│   └── matriculas.js
│
├── controllers/              # Controladores
│   ├── estudianteController.js
│   └── matriculaController.js
│
├── models/                   # Modelos de datos
│   ├── estudiante.js
│   └── matricula.js
│
└── database/
    ├── init.js              # Inicialización de BD
    └── matriculacion.db     # Base de datos
```

## 💾 Datos de Ejemplo

El sistema viene con datos de ejemplo precargados:

**Estudiantes de Ejemplo:**
- Juan Pérez (Cédula: 1234567890)
- María García (Cédula: 1234567891)
- Carlos López (Cédula: 1234567892)

## 🔧 Desarrollo

### Dependencias Principales
- **express**: Framework web
- **sqlite3**: Base de datos
- **ejs**: Motor de vistas
- **body-parser**: Parser de solicitudes
- **express-session**: Manejo de sesiones
- **bcryptjs**: Encriptación
- **dotenv**: Variables de entorno

### DevDependencies
- **nodemon**: Reinicio automático en desarrollo

### Instalar Nuevas Dependencias

```bash
npm install nombre-del-paquete
npm install --save-dev nombre-del-paquete  # Para dev
```

## 🌐 Uso de la Aplicación

### Página Principal
- Acceso a todas las funcionalidades
- Información sobre carreras y modalidades
- Navegación rápida

### Gestión de Estudiantes
1. Ir a "Estudiantes" en el menú
2. Haz clic en "Nuevo Estudiante"
3. Completa el formulario
4. Haz clic en "Registrar Estudiante"

### Crear una Matriculación
1. Ir a "Matriculaciones" en el menú
2. Haz clic en "Nueva Matriculación"
3. Selecciona un estudiante
4. Elige la carrera
5. Selecciona la modalidad
6. Confirma la matriculación

### Ver Estadísticas
- Dashboard: Muestra estadísticas por carrera y modalidad
- Información de estudiantes y matriculaciones activas

## 📝 Notas Importantes

- Un estudiante solo puede tener una matriculación por período académico
- Los estudiantes inactivos no pueden ser matriculados
- Las matriculaciones con estado activo no pueden ser eliminadas directamente
- Los datos se persisten en la base de datos SQLite

## 🐛 Solución de Problemas

### Puerto Ya en Uso
```bash
npm start -- --port 3001
```

### Limpiar Base de Datos
Elimina el archivo `database/matriculacion.db` y reinicia el servidor.

### Problemas de Dependencias
```bash
rm -rf node_modules
npm install
```

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al equipo de desarrollo.

---

**Última actualización**: 2026
**Versión**: 1.0.0
