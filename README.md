# Generador de resúmenes con inteligencia artificial

Aplicación web que permite registrar documentos de texto, generar automáticamente un resumen mediante inteligencia artificial y consultar el historial de documentos procesados.

El proyecto fue desarrollado como prueba técnica utilizando Node.js, Express, React, Sequelize, PostgreSQL, Supabase, LangChain y Groq.

## Aplicación desplegada

- Frontend: `https://dannacampo-documento.onrender.com/`
- Backend: https://dannacampo-documento-backend.onrender.com

> El backend utiliza el plan gratuito de Render. Si permanece inactivo, la primera solicitud puede tardar unos segundos mientras el servicio inicia.

## Funcionalidades

- Registrar un documento mediante título y texto.
- Cargar archivos de texto `.txt`.
- Validar los datos ingresados.
- Generar resúmenes utilizando un modelo de lenguaje.
- Guardar el texto original y el resumen generado.
- Controlar el estado del procesamiento:
  - `procesando`
  - `completado`
  - `error`
- Mostrar mensajes comprensibles cuando ocurre un error.
- Consultar el historial de documentos.
- Consultar el detalle de un documento.
- Interfaz adaptable a diferentes tamaños de pantalla.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Supabase
- LangChain
- Groq
- Dotenv
- CORS

### Frontend

- React
- Vite
- React Router
- Axios
- React Bootstrap

### Despliegue

- Render Web Service para el backend.
- Render Static Site para el frontend.
- Supabase para la base de datos PostgreSQL.

## Arquitectura

El backend utiliza una arquitectura organizada por responsabilidades:

```text
Router → Controller → Service → Model → Base de datos
                              ↓
                         Servicio de IA
```

- **Routers:** definen las rutas HTTP.
- **Controllers:** reciben las solicitudes y construyen las respuestas.
- **Services:** contienen la lógica de negocio.
- **Models:** representan las tablas mediante Sequelize.
- **Migrations:** permiten crear y actualizar la estructura de la base de datos.
- **Servicio de IA:** se comunica con Groq mediante LangChain.

## Estructura del proyecto

```text
dannacampo_documento/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── migrations/
│   ├── models/
│   ├── routers/
│   ├── seeders/
│   ├── services/
│   ├── app.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Flujo de procesamiento

1. El usuario escribe un título y un texto o carga un archivo `.txt`.
2. El frontend envía la información al backend.
3. El backend crea el documento con estado `procesando`.
4. El servicio de IA envía el texto a Groq mediante LangChain.
5. La respuesta del modelo se guarda como resumen.
6. El documento cambia al estado `completado`.
7. Si ocurre un problema, cambia al estado `error` y se almacena el mensaje correspondiente.

## Modelo de datos

La tabla principal es `documentos`.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Integer | Identificador del documento |
| `titulo` | String | Título del documento |
| `texto_original` | Text | Contenido original |
| `resumen` | Text | Resumen generado por la IA |
| `estado` | String | Estado del procesamiento |
| `mensaje_error` | Text | Descripción del error, si ocurre |
| `createdAt` | Date | Fecha de creación |
| `updatedAt` | Date | Fecha de actualización |

Los campos `resumen` y `mensaje_error` permiten valores nulos porque el documento se guarda antes de solicitar el resumen a la IA.

## Endpoints principales

La ruta base del módulo es:

```text
/apidocumentos
```

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/registrardocumento` | Registra un documento y genera su resumen |
| GET | `/listardocumentos` | Lista los documentos registrados |
| GET | `/consultardocumento/:id` | Consulta un documento por su ID |

### Ejemplo para registrar un documento

```bash
curl -X POST http://localhost:3000/apidocumentos/registrardocumento \
-H "Content-Type: application/json" \
-d '{
  "titulo": "Documento de prueba",
  "texto_original": "Este es un texto suficientemente largo para comprobar la generación automática de su resumen."
}'
```

## Instalación local

### Requisitos

- Node.js 22 o superior
- npm
- Una base de datos PostgreSQL
- Una API key válida de Groq

### 1. Clonar el repositorio

```bash
git clone https://github.com/dannacampo765-afk/dannacampo_documento.git
cd dannacampo_documento
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Crea un archivo `.env` tomando como referencia `.env.example`:

```env
PORT=3000
DATABASE_URL=postgresql://USUARIO:CONTRASENA@HOST:PUERTO/BASE_DE_DATOS
APIKEY=clave_de_groq
FRONTEND_URL=http://localhost:5173
```

Ejecuta las migraciones codigo:

```bash
npx sequelize-cli db:migrate
```

Inicia el backend:

```bash
npm run dev
```

El backend estará disponible en:

```text
http://localhost:3000
```

### 3. Configurar el frontend

Abre otra terminal:

```bash
cd frontend
npm install
```

Crea el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Inicia el frontend:

```bash
npm run dev
```

El frontend normalmente estará disponible en:

```text
http://localhost:5173
```

## Scripts

### Backend

```bash
npm run dev
npm start
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Inteligencia artificial

El proyecto utiliza LangChain para comunicarse con Groq.

Modelo utilizado:

```text
llama-3.1-8b-instant
```

Configuración principal:

- Temperatura: `0.3`
- Máximo de tokens: `300`
- Reintentos en caso de errores temporales
- API key almacenada únicamente en el backend

La clave de Groq no se guarda en el frontend porque las variables de Vite quedan visibles en el navegador.

## Decisiones técnicas

- Se utilizó Sequelize para organizar el modelo de datos y administrar migraciones.
- PostgreSQL fue seleccionado por ser una base de datos relacional estable.
- Supabase proporciona la base PostgreSQL alojada en la nube.
- La generación del resumen se realiza en el backend para proteger la API key.
- El documento se registra inicialmente como `procesando` para conservar el estado del proceso.
- La lectura de archivos `.txt` se realiza desde el navegador porque solamente se necesita extraer su contenido.
- Se separó el proyecto en frontend y backend para mantener responsabilidades claras.

## Manejo de errores

La aplicación contempla, entre otros, los siguientes casos:

- Campos obligatorios vacíos.
- Títulos demasiado cortos o demasiado largos.
- Textos menores o mayores al límite permitido.
- API key de Groq inválida o ausente.
- Errores de conexión con la base de datos.
- Fallos en la generación del resumen.
- Documento solicitado inexistente.

Cuando falla la generación del resumen, el documento se conserva con estado `error` y se registra el mensaje correspondiente.

## Limitaciones

- Solamente se admite la carga de archivos `.txt`.
- El tamaño del archivo se limita desde el frontend.
- La calidad del resumen depende del modelo utilizado.
- El plan gratuito de Render puede suspender temporalmente el backend por inactividad.
- Actualmente no se utiliza autenticación de usuarios.
- El procesamiento se realiza dentro de la misma solicitud HTTP y no mediante una cola de trabajos.

## Variables de entorno y seguridad

Los archivos `.env` no deben subirse al repositorio.

El archivo `.gitignore` debe incluir:

```gitignore
node_modules/
.env
backend/.env
frontend/.env
dist/
```

Los archivos `.env.example` solamente deben contener nombres de variables y valores de ejemplo, nunca claves reales.

## Uso de herramientas de IA durante el desarrollo

Durante el desarrollo se utilizaron herramientas de inteligencia artificial como apoyo para:

- Analizar errores.
- Proponer estructuras de código.
- Explicar configuraciones.
- Revisar el flujo de la aplicación.
- Documentar el proyecto.

Las decisiones técnicas, la integración, las pruebas y la validación del funcionamiento fueron realizadas y comprendidas por el equipo.

## Autores

- Danna isabella Campo

## Licencia

Proyecto desarrollado con fines académicos y de evaluación técnica.
