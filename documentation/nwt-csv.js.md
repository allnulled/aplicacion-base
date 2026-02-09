# NwtCsv

API para utilidades relacionadas con el formato de ficheros CSV.

## Exposición

```js
NwtCsv
NwtFramework.Csv
Vue.prototype.$nwt.Csv
```

## Ventajas

Principalmente, se usa para intercambiar de CSV a JSON y viceversa:

```js
await NwtCsv.fromCsvFileToJson(file);
NwtCsv.fromJsonToCsv(data, options = this.defaultParseOptions);
NwtCsv.fromCsvToJson(text, options = this.defaultUnparseOptions, asObjects = true);
NwtCsv.csvCellsToObjects(rows);
```

