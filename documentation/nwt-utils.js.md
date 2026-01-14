# Nwt Utils API

API global de utilidades residuales.

## Exposición

La API se expone a través de:

```js
NwtUtils
NwtFramework.Utils
Vue.prototype.$nwt.Utils
```

## Ventajas

Permite hacer algunas cosas como:

```js
NwtUtils.noop(); // >> undefined
NwtUtils.jsonify({circular JSON is accepted too}); // >> "{...}"
NwtUtils.copify({circular JSON is accepted too}); // >> {...}
NwtUtils.trify(callback, valueOnFail);
NwtUtils.sortObjectByKeys({b:0,a:1}); // >> {a:1,b:0}
NwtUtils.filterObjectProperties({a:0,b:1,c:2}, (key, value) => ["a","b"].indexOf(key) !== -1); // >> {a:0,b:1}
NwtUtils.extractPathsFromFiles([{path:"whatever"}]); // >> ["whatever"]
NwtUtils.copyToClipboard(text);
NwtUtils.getSurroundingLines(content:String, line:Number, column:Number, linesBefore = 3, linesAfter = 3);
```

