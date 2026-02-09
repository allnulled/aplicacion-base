# NwtStrings

API de utilidades relacionadas con **obtener** algunos strings específicos.

Se distingue de la API de `NwtStringUtils` (puede que todavía no exista) en que esta segunda serían métodos y utilidades relacionadas con cualquier string. `NwtStringUtils` sería para métodos de extensión de `String.prototype`.

## Exposición

```js
NwtStrings
NwtFramework.Strings
Vue.prototype.$nwt.Strings
```

## Ventajas

```js
NwtStrings.EOL; // fin de línea en el sistema operativo actual (usa node.js)
await NwtStrings.fromAssets(filename); // returns el contenido de `assets/app/strings/${filename}`
await NwtStrings.getDistJsSource(); // returns el contenido de `assets/dist.js` (que se cachea y luego puede obtenerse en sync)
await NwtStrings.getSurroundingLinesFromDistJs({line:Integer,column:Integer}, linesBefore=5, linesAfter=5); // returns as String el contenido especificado dentro de `assets/dist.js`
```

