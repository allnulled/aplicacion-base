# NwtExporter

API para exportar APIs exportables.

Se trata de concentrar y reducir los nombres de las funciones que están esparcidas por toda la API.

Aunque principalmente se centra en la API de NwtFilesystem.

## Exposición

```js
NwtExporter
NwtFramework.Exporter
Vue.prototype.$nwt.Exporter
```

## Ventajas

```js
// Uso pensado es:
const $ = NwtExporter.export.api();
await $.read.file(...);
await $.read.directory(...);
await $.read.tree(...);
await $.read.json(...);
await $.read.property(...);
await $.write.file(...);
await $.write.directory(...);
await $.write.tree(...);
await $.write.json(...);
await $.write.property(...);
await $.ensure.file(...);
await $.ensure.directory(...);
await $.ensure.tree(...);
await $.ensure.json(...);
await $.ensure.property(...);
```

De momento, es preferible la API de Persister.

