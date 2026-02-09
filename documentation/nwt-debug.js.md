# NwtDebug

API para utilidades de debugging.

## Exposición

```js
NwtDebug
NwtFramework.Debug
Vue.prototype.$nwt.Debug
```

## Ventajas

```js
NwtDebug.d(...args); // solo console.log
NwtDebug.j(...args); // NwtUtils.stringify + console.log
NwtDebug.k(...args); // Object.keys + NwtUtils.stringify + console.log
```

