# Gestión de clientes — Grupo 04

Proyecto de Lenguajes y Entornos de Programación desarrollado con React, Express y MongoDB Atlas. Permite iniciar sesión, gestionar clientes y consultar un dashboard con datos reales de la base.

## Tecnologías

- Frontend: React, Vite, React Router, Axios y React Bootstrap.
- Backend: Node.js, Express, Mongoose y Zod.
- Autenticación: JWT y contraseñas protegidas con bcryptjs.
- Base de datos: MongoDB Atlas.

## Funcionalidades

- Inicio y cierre de sesión.
- Dashboard con total de clientes y cantidad de usuarios de Gerencia y Soporte.
- Creación, listado, búsqueda y consulta de fichas de clientes.
- Eliminación de clientes desde la interfaz para Gerencia.
- Actualización de clientes mediante la API para Gerencia.
- Administración de usuarios mediante la API, incluido el cambio de contraseña.

Los totales del dashboard se actualizan al abrirlo. Gerencia y Soporte muestran usuarios registrados, no sesiones activas.

## Permisos

| Operación sobre clientes | Soporte | Gerencia |
| --- | --- | --- |
| Consultar | Sí | Sí |
| Crear | Sí | Sí |
| Modificar | No | Sí |
| Eliminar | No | Sí |

Todas las operaciones requieren un token válido. Las rutas de administración de usuarios están autenticadas, pero aún no tienen restricciones por sector. No hay una pantalla de registro de usuarios.

## Estructura

```text
client/
  src/components/     Componentes de interfaz
  src/pages/          Pantallas
  src/context/        Estado de sesión
  src/services/       Solicitudes a la API
server/
  src/db/             Conexión a MongoDB
  src/models/         Cliente y Usuario
  src/routes/         Endpoints
  src/controllers/    Solicitudes y respuestas HTTP
  src/services/       Operaciones de datos
  src/middlewares/    Autenticación, permisos y validación
  src/validations/    Esquemas Zod
```

## Requisitos

- Node.js y npm. Durante el desarrollo local se utilizó Node.js 24.15.0.
- Git.
- Acceso a MongoDB Atlas y un usuario de base de datos.
- IP pública del backend autorizada en Atlas.
- Un usuario de la aplicación existente para iniciar sesión.

El usuario de base de datos de Atlas y el usuario de la aplicación son cuentas diferentes.

## Instalación

```powershell
git clone https://github.com/EnzoVilla/ProyetoLYEP2026pto4.git
cd ProyetoLYEP2026pto4
```

### Backend

Desde la raíz del repositorio:

```powershell
cd server
npm install
Copy-Item .env.example .env
```

Completar `server/.env`:

```env
PORT=3001
URL_FRONT=http://localhost:5173
MONGODB_URI="mongodb+srv://USUARIO:CONTRASEÑA@HOST_DEL_CLUSTER/lyep?appName=NOMBRE_DEL_CLUSTER"
JWT_SECRET=CLAVE_ALEATORIA
```

Copiar la URI desde Atlas, conservando su host y opciones. Indicar el nombre de la base utilizada por el grupo. Codificar los caracteres especiales de las credenciales al incluirlos en la URI.

Generar una clave JWT y guardar el resultado en `JWT_SECRET`:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Cada backend local puede usar su propia clave. Cambiarla invalida los tokens anteriores. No subir archivos `.env`, contraseñas, claves ni tokens al repositorio.

En Atlas, agregar la IP pública de la computadora que ejecutará el backend a la lista de acceso de red. Si cambia, actualizar la entrada.

Iniciar el backend:

```powershell
npm run dev
```

Debe mostrar la conexión a Atlas y el servidor escuchando en el puerto 3001. Este comando no reinicia automáticamente al guardar cambios: detener con Ctrl+C y volver a ejecutarlo.

### Frontend

En otra terminal, desde la raíz del repositorio:

```powershell
cd client
npm install
Copy-Item .env.example .env
```

Configurar `client/.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

Iniciar el frontend:

```powershell
npm run dev
```

Abrir la URL indicada por Vite. Si utiliza un puerto distinto a 5173, actualizar `URL_FRONT` y reiniciar el backend. Reiniciar Vite después de modificar su `.env`.

## Usuarios de prueba

Solicitar al equipo por un medio privado el email, contraseña y sector (`Soporte` o `Gerencia`) de una cuenta de prueba existente en la base compartida.

### Crear un usuario de Gerencia o Soporte

El script `server/src/scripts/crearUsuario.js` permite crear cuentas sin iniciar sesión previamente. Usa las validaciones del backend y genera el hash con bcrypt mediante el servicio de usuarios.

Agregar temporalmente a `server/.env`:

```env
CARGA_EMAIL=gerencia@example.com
CARGA_PASSWORD="REEMPLAZAR_POR_UNA_CLAVE_PRIVADA"
CARGA_NOMBRE="Usuario de Gerencia"
CARGA_SECTOR=Gerencia
```

Desde `server`, ejecutar:

```powershell
npm run crear-usuario
```

Para crear Soporte, cambiar email, contraseña y nombre, y usar `CARGA_SECTOR=Soporte`. Ejecutar nuevamente el mismo comando. El sector debe ser exactamente `Gerencia` o `Soporte`.

La cuenta se crea en la base indicada por `MONGODB_URI`. Si el email existe, el script falla sin modificar esa cuenta. No es necesario encender Express para ejecutarlo. Al terminar, quitar las variables `CARGA_*` del `.env`. No subir credenciales al repositorio.

Después del primer login, también se pueden crear usuarios mediante `POST /api/usuarios` con un token válido. No insertar contraseñas en texto plano ni hashes de otro algoritmo.

## API

Excepto el login, enviar el token en las solicitudes:

```text
Authorization: Bearer TOKEN
```

| Método | Ruta | Acceso |
| --- | --- | --- |
| POST | `/api/usuarios/login` | Público |
| GET / POST | `/api/usuarios` | Usuario autenticado |
| GET / PUT / DELETE | `/api/usuarios/:id` | Usuario autenticado |
| GET / POST | `/api/clientes` | Usuario autenticado |
| GET | `/api/clientes/:id` | Usuario autenticado |
| PUT / DELETE | `/api/clientes/:id` | Gerencia |

El login recibe `email`, `password` y `sector`, y devuelve `token` y `usuario`. Los tokens duran ocho horas.

Ejemplo de creación de cliente:

```json
{
  "email": "cliente@example.com",
  "name": { "firstname": "Ana", "lastname": "Pérez" },
  "address": { "city": "Buenos Aires" },
  "phone": "+54 11 1234 5678"
}
```

## Verificación

1. Iniciar backend y frontend e ingresar con un usuario existente.
2. Comprobar los totales del dashboard.
3. Crear un cliente, recargar y consultar su ficha.
4. Volver al dashboard y comprobar que aumentó el total de clientes.
5. Con Soporte, verificar que no aparezca Eliminar y que la API rechace modificación y eliminación con 403.
6. Con Gerencia, probar las operaciones permitidas sobre registros de prueba.
7. Consultar rutas protegidas sin token: deben responder 401.
8. Cambiar la contraseña de un usuario de prueba: debe funcionar la nueva y rechazarse la anterior.

El backend no tiene una suite automatizada configurada; `npm test` conserva el mensaje de prueba no definida.

Desde `client`, están disponibles:

```powershell
npm run build
npm run lint
```

## Problemas frecuentes

- **JWT_SECRET no está configurado:** completar la variable y reiniciar el backend.
- **Credenciales inválidas:** revisar email, contraseña, sector y base de datos utilizada.
- **Error de conexión o CORS:** comprobar que ambos procesos estén encendidos y que `VITE_API_URL` y `URL_FRONT` sean correctas.
- **401:** token ausente, inválido o vencido. Iniciar sesión nuevamente.
- **403:** el sector del usuario no permite la operación.
- **Error DNS al conectar a Atlas:** revisar la URI y la red. La conexión actual configura los DNS públicos `1.1.1.1` y `8.8.8.8` para las consultas del proceso de Node como solución al problema observado durante el desarrollo.

## Acceso para corrección

Si el evaluador ejecuta el backend localmente, necesita las variables de entorno, una cuenta de prueba y su IP pública autorizada en Atlas. Compartir las credenciales por privado.

Si frontend y backend están publicados, solo necesita acceder a la aplicación e iniciar sesión. Atlas debe autorizar la IP del backend. Publicar únicamente el frontend no alcanza si continúa apuntando a `localhost:3001`.

## Documentación adicional

### Contribuciones registradas en Git

El siguiente resumen se basa en los commits disponibles en el historial local. Se agrupan las variantes de nombre de un mismo autor. No representa una medida de esfuerzo ni incluye tareas realizadas fuera de Git o colaboraciones no indicadas en los commits.

| Integrante | Contribuciones registradas |
| --- | --- |
| Rodrigo Guanactolay | Conexión a MongoDB Atlas; modelos Cliente y Usuario; protección de rutas con JWT; envío del token desde el frontend; permisos de Gerencia para modificar y eliminar clientes; visibilidad del botón Eliminar; hash al actualizar contraseñas; ajuste de la validación del login; dashboard conectado a la API. |
| Enzo Villagrán (`enzov`, `Enzo Villagrán`) | Configuración inicial del backend y dependencias; documentos de propuesta de arquitectura y modelos; esquemas Zod para clientes, usuarios e identificadores; middleware de validación e integración en las rutas; conexión de las pantallas de clientes con la API propia. |
| Galeed Gutierrez | Servicios y controladores de clientes; conexión de rutas de clientes; autenticación con JWT y bcrypt en el backend; conexión del login y estado de sesión del frontend; documentación de autenticación. |
| Maximiliano Figueroa | Servicios y controladores para las operaciones de creación, consulta, actualización y eliminación de usuarios. |
| Franklin Vasquez | Rutas de clientes y usuarios y su registro en el servidor. |

La incorporación inicial del frontend figura en un commit de Enzo. Ese registro identifica quién lo incorporó al repositorio y no permite determinar la autoría individual de cada componente previo. Varias partes fueron modificadas posteriormente por otros integrantes.

- [Propuesta de arquitectura](server/PROPUESTA_ARQUITECTURA.md)
- [Modelos del backend](server/MODELOS_BACKEND.md)

Estos documentos corresponden a la propuesta inicial y pueden necesitar actualización conforme avance el proyecto.
