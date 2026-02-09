# Convertir de CSV a CSV paginado por node.js

Procedimiento para dividir 1 fichero CSV en varios con x filas cada uno por node.js.

## Identificador

El identificador es:

> `Convertir de CSV a CSV paginado por node.js`

## Uso vía API

Un ejemplo de uso es este:

```js
NwtProceduresManager.global.findById("Convertir de CSV a CSV paginado por node.js").startViewer({
  "file": "trash5/salida.csv",
  "output": "trash6",
  "rows": "5"
});
```

## Parámetros

A continuación se explican los parámetros disponibles en el procedimiento.

### Parámetro `file`

- Función: fichero CSV a dividir
- Tipo: `String`
- Requerido: sí
- Requisitos:
   - debe ser un fichero terminado con `.csv` obligatoriamente

### Parámetro `output`

- Función: directorio de salida
- Tipo: `String`
- Requerido: sí

### Parámetro `rows`

- Función: especifica el número de filas por cada fichero.
- Tipo: `Number` o `String` numerable
- Requerido: no
- Valor por defecto: 10