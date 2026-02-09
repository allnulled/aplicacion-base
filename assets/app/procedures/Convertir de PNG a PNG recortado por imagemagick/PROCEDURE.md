# Convertir de PNG a PNG recortado por imagemagick

Procedimiento para convertir un fichero PNG a PNG recortado por imagemagick.

## Identificador

El identificador es:

> `Convertir de PNG a PNG recortado por imagemagick`

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Convertir de PNG a PNG recortado por imagemagick").startViewer({
  "files": [
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash2/僕とロボコ #02-0.png",
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash2/僕とロボコ #02-1.png",
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash2/僕とロボコ #02-2.png"
  ],
  "output": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash3"
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros PNG a recortar
- Tipo: `Array<String>`
- Requerido: sí

### Parámetro `output`

- Función: directorio de salida
- Tipo: `String`
- Requerido: sí