# Concatenar ficheros por node.js

Procedimiento para concatenar contenido de múltiples ficheros por node.js.

## Identificador

El identificador es:

> `Concatenar ficheros por node.js`

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Concatenar ficheros por node.js").startViewer({
  "files": [
    "file-1.txt",
    "file-2.txt",
    "file-3.txt",
    "file-4.txt",
    "file-5.txt"
  ],
  "output": "output.txt"
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros a concatenar
- Tipo: `Array<String>`
- Requerido: sí

### Parámetro `output`

- Función: fichero de salida
- Tipo: `String`
- Requerido: sí