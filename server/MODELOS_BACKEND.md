# Modelos del backend observables en el frontend

Este documento recoge únicamente los campos y comportamientos que aparecen en el código revisado. No define requisitos, restricciones ni campos que el frontend no especifique.

## Cliente

### Datos enviados al crear un cliente

El formulario construye y envía este objeto a `clientesService.crearCliente`:

```js
{
  email,
  username,
  name: {
    firstname,
    lastname: '',
  },
  address: {
    city,
  },
  phone,
}
```

- `email`: valor escrito en el campo de correo.
- `username`: se deriva del nombre convirtiéndolo a minúsculas y quitando espacios.
- `name.firstname`: nombre escrito en el formulario.
- `name.lastname`: se envía como cadena vacía; el formulario no solicita apellido.
- `address.city`: ciudad escrita en el formulario.
- `phone`: teléfono escrito en el formulario.

El servicio envía el objeto sin transformarlo mediante `POST` a `https://fakestoreapi.com/users`. El formulario toma `respuesta.id` y lo añade al cliente que entrega a la tabla.

### Datos leídos en el detalle

`DetalleCliente.jsx` obtiene el cliente directamente de `https://fakestoreapi.com/users/${id}` y accede a estos campos:

- `id`
- `name.firstname` y `name.lastname`
- `email`
- `phone`
- `username`
- `address.street`, `address.number`, `address.zipcode` y `address.city`

`address.street`, `address.number` y `address.zipcode` se leen en el detalle, pero no se envían desde el formulario de creación. El código revisado no permite determinar si esos campos existen siempre ni si son obligatorios en el backend.

La eliminación también se solicita directamente a FakeStore con `DELETE` a `https://fakestoreapi.com/users/${id}`; no pasa por el servicio local.

## Usuario de autorización

`autorizacionesServices.js` mantiene una lista fija en memoria. Cada objeto contiene:

```js
{
  email,
  password,
  nombre,
  sector,
}
```

Los sectores presentes en esa lista son `Soporte` y `Gerencia`. La función `login(email, password, sector)` busca coincidencia exacta en los tres campos recibidos y devuelve el objeto coincidente o `undefined`.

Esto describe el mock actual del frontend; el código revisado no define persistencia, identificador, permisos detallados, sesiones ni el tratamiento de contraseñas en el backend.

## Límites de lo documentado

- Los servicios actuales apuntan a FakeStore o usan datos locales; no definen endpoints del servidor de este proyecto.
- No se especifican tipos persistidos, campos obligatorios, validaciones, valores nulos ni relaciones.
- Los campos anteriores son observaciones del uso actual del frontend, no una especificación completa de base de datos.