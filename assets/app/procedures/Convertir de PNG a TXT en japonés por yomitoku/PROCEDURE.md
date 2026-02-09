# Convertir de PNG a TXT en japonés por yomitoku

Procedimiento para convertir un fichero PNG a TXT en japonés por yomitoku. Utiliza OCR para transcribir el texto de una imagen.

## Identificador

El identificador es:

> `Convertir de PNG a TXT en japonés por yomitoku`

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Convertir de PNG a TXT en japonés por yomitoku").startViewer({
  "files": [
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash3/僕とロボコ #02-0.png",
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash3/僕とロボコ #02-1.png",
    "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash3/僕とロボコ #02-2.png"
  ],
  "output": "/home/carlos/Escritorio/Alvaro/aplicacion-generica-v1/trash4"
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros PNG a transcribir
- Tipo: `Array<String>`
- Requerido: sí
- Requisito:
   - Los ficheros tienen que ser «*.png»

### Parámetro `output`

- Función: directorio de salida
- Tipo: `String`
- Requerido: sí