# Convertir de PDF a PNG por imagemagick

Procedimiento para convertir un fichero PDF a PNG por imagemagick.

## Identificador

El identificador es:

> `Convertir de PDF a PNG por imagemagick`

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Convertir de PDF a PNG por imagemagick").startViewer({
  "files": [
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash1/僕とロボコ #02.pdf",
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash1/僕とロボコ #13.pdf"
  ],
  "output": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash2"
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros PDF a convertir
- Tipo: `Array<String>`
- Requerido: sí

### Parámetro `output`

- Función: directorio de salida
- Tipo: `String`
- Requerido: sí