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
// Básicos:
await NwtImporter.scriptSrc("https://domain.com/script.js");
await NwtImporter.linkStylesheet("https://domain.com/styles.css");
// Es un require pero eliminando caché:
await NwtImporter.requireNewly(subpath);
// Lee el fichero, crea una AsyncFunction y la llama:
await NwtImporter.asyncSource(subpath, parameters = {}, scope = window)
// Importa un componente Vue (.html + .js + .css) a partir de la ruta común (en runtime):
await NwtImporter.vueComponentByFilesystem(subpath)
// Inyecta estilos CSS (usando un ID para singletonear):
await NwtImporter.styleTag(cssString, id = null)
// Como asyncSource pero no usa un fichero, sino el código directamente:
await NwtImporter.asyncFunction(code, parameters = {}, scope = window)
// Como asyncFunction y asyncSource, pero solo crea la función, no la llama:
await NwtImporter.asyncFactory(code, parameters = [])
```

