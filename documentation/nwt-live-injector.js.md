# NwtLiveInjector

API para inyectar código en runtime. API para debugging.

## Exposición

```js
NwtLiveInjector
NwtFramework.LiveInjector
Vue.prototype.$nwt.LiveInjector
```

## Ventajas

```js
NwtLiveInjector.start();
// El fichero que está en el root del proyecto: `injector.js`
// se queda a la escucha de cambios
// y cuando guardas, inyecta el código que en él haya
```

