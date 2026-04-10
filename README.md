# Sistema de Matriculación de Estudiantes - PAO-I-2026

Sistema completo de matriculación de estudiantes para las carreras de Desarrollo de Software y Electrónica, con modalidades presencial y virtual.

## Características

- ✅ Gestión de estudiantes (registro, actualización, eliminación)
- ✅ Dos carreras: Desarrollo de Software y Electrónica
- ✅ Dos modalidades: Presencial y Virtual
- ✅ Período académico: PAO-I-2026
- ✅ Interfaz responsiva con Bootstrap 5
- ✅ Base de datos SQLite
- ✅ Sistema de autenticación básico

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. **Clonar o descargar el proyecto**

   ```bash
   cd sistema-matriculacion
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Iniciar la base de datos**

   ```bash
   node database/init.js
   ```

4. **Ejecutar la aplicación**

   ```bash
   npm start
   ```

   O en modo desarrollo con auto-reinicio:

   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**

   Abre tu navegador en `http://localhost:3000`

## Estructura del Proyecto

```
sistema-matriculacion/
├── app.js                 # Archivo principal de Express
├── package.json          # Dependencias del proyecto
├── .env                  # Variables de entorno
├── README.md             # Este archivo
├── public/               # Archivos estáticos (CSS, JS)
│   ├── css/
│   │   └── style.css     # Estilos personalizados
│   └── js/
│       └── main.js       # Scripts del cliente
├── views/                # Vistas EJS
│   ├── index.ejs
│   ├── matricula.ejs
│   ├── estudiantes.ejs
│   └── ...
├── routes/               # Rutas de la aplicación
│   ├── estudiantes.js
│   └── matriculas.js
├── controllers/          # Controladores
│   ├── estudianteController.js
│   └── matriculaController.js
├── models/               # Modelos de datos
│   ├── estudiante.js
│   └── matricula.js
└── database/
    ├── init.js           # Inicialización de BD
    └── matriculacion.db  # Base de datos SQLite
```

## Uso

### Registrar un Estudiante

1. Navega a la página de inicio
2. Haz clic en "Nuevo Estudiante"
3. Completa el formulario con los datos del estudiante
4. Selecciona la carrera y modalidad
5. Guarda los cambios

### Procesar Matriculación

1. Ve a "Matriculación"
2. Selecciona el estudiante
3. Elige la carrera y modalidad
4. Confirma la matriculación

### Ver Listado de Estudiantes

- Accede a "Estudiantes" para ver todos los registros
- Filtra por carrera o modalidad
- Edita o elimina estudiantes según sea necesario

## Carreras Disponibles

- **Desarrollo de Software**
- **Electrónica**

## Modalidades Disponibles

- **Presencial:** Clases en el campus
- **Virtual:** Clases en línea

## Período Académico

- PAO-I-2026 (Período Académico Ordinario I - 2026)

## Base de Datos

El sistema utiliza SQLite como base de datos. Las tablas principales son:

- **estudiantes:** Datos personales de estudiantes
- **matriculas:** Registros de matriculación
- **carreras:** Información de carreras
- **modalidades:** Información de modalidades

## Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5 + Bootstrap 5 + JavaScript
- **Base de Datos:** SQLite3
- **Motor de Vistas:** EJS

## Licencia

ISC

---

Para más información o soporte, contacta al equipo de desarrollo.
