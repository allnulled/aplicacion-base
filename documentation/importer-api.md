# Nwt Importer API

API para importar scripts y estilos.

## Exposición

Se expone a través de:

```js
NwtImporter
NwtFramework.Importer
Vue.prototype.$nwt.Importer
```

## Ventajas

Puede usarse así:

```js
await NwtImporter.scriptSrc("https://domain.com/script.js");
await NwtImporter.linkStylesheet("https://domain.com/styles.css");
```

