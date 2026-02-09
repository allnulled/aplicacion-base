# NwtObjectUtils

API para utilidades con Object.

## Exposición

```js
NwtObjectUtils
NwtFramework.ObjectUtils
Vue.prototype.$nwt.ObjectUtils
```

## Ventajas

```
NwtObjectUtils.cleanMapByPairs(object, cleaner);
// El «cleaner» recibirá (key, value, index) por cada entrada de «object»
// Si el «cleaner» devuelve «undefined», esa entrada no se devolverá
// Si el «cleaner» devuelve Array<Clave,Valor>, esa entrada será substituida por lo especificado
// Si el «cleaner» devuelve otra cosa, lanzará error
```

