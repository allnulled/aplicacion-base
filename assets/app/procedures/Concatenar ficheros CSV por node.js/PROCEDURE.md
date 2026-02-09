# Concatenar ficheros CSV por node.js

Procedimiento para concatenar contenido de múltiples ficheros CSV por node.js.

## Identificador

El identificador es:

> `Concatenar ficheros CSV por node.js`

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Concatenar ficheros CSV por node.js").startViewer({
  "files": [
    "file-1.csv",
    "file-2.csv",
    "file-3.csv",
    "file-4.csv",
    "file-5.csv"
  ],
  "output": "output.csv"
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `files`

- Función: lista de ficheros CSV a concatenar
- Tipo: `Array<String>`
- Requerido: sí
- Requisitos:
   - deben ser ficheros terminados con `.csv` obligatoriamente

### Parámetro `output`

- Función: fichero de salida
- Tipo: `String`
- Requerido: sí