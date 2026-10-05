# Propuesta de arquitectura del backend

## Objetivo

Aunque el backend contempla dos modelos, se propone separar responsabilidades para que cada parte tenga un propósito claro y el proyecto pueda mantenerse ordenado.

Esta estructura es una propuesta. Actualmente, `src` contiene únicamente `index.js`; las carpetas descritas abajo todavía no están implementadas.

## Estructura propuesta

```text
server/
└── src/
    ├── index.js
    ├── routes/
    ├── controllers/
    ├── services/
    ├── models/
    ├── middlewares/
    ├── db/
    └── validations/  # Posible carpeta; pendiente de decisión
```

Los dos modelos considerados son los descritos en [MODELOS_BACKEND.md](MODELOS_BACKEND.md): cliente y usuario de autorización. Esta propuesta no agrega campos ni determina sus esquemas definitivos.

## Responsabilidades

- **Routes:** declarar los endpoints y asociarlos con el middleware y controlador correspondientes. No implementar lógica de negocio.
- **Controllers:** recibir la solicitud HTTP, extraer los datos necesarios, invocar el servicio y construir la respuesta HTTP.
- **Services:** concentrar la lógica de negocio y coordinar las operaciones requeridas. No gestionar directamente el ciclo HTTP.
- **Models:** representar los modelos del dominio y sus esquemas de datos. Si se usa Mongoose, aquí se definen los esquemas y las operaciones asociadas a cada modelo.
- **Middlewares:** ejecutar lógica compartida durante el ciclo de solicitud, cuando sea necesaria, por ejemplo validacion de campos enviados desde el frontend.
- **DB:** centralizar la configuración y apertura de la conexión con la base de datos. Esta carpeta se limita a la conexión; no contiene rutas ni lógica de negocio.
- **Validations (pendiente):** podría alojar reglas reutilizables para validar datos de entrada antes de ejecutar la lógica del controlador o servicio. La creación de esta carpeta y su alcance todavía no están decididos.

## Flujo general propuesto

```text
Solicitud HTTP
  -> routes
  -> middlewares aplicables
  -> controller
  -> service
  -> model
  -> base de datos (conexión configurada en db)
  -> respuesta HTTP
```

Las validaciones, si se implementan, se ubicarían antes de que los datos lleguen a la lógica de negocio. El punto exacto de integración dependerá de la decisión del grupo.

## Decisiones aún abiertas

- Definir los esquemas finales de los dos modelos por separado de esta propuesta de carpetas.
- Decidir si se crea `validations/` y qué herramienta o patrón se utilizará.
- Definir los endpoints y las reglas de negocio; este documento no los presupone.