# NwtErrorsManager

API para gestión GLOBAL de errores.

CUIDADO: Solo instanciar 1 vez en toda la aplicación. Actualmente se instancia por `<common-errors />`

## Exposición

```js
NwtErrorsManager
NwtFramework.ErrorsManager
Vue.prototype.$nwt.ErrorsManager
```

## Ventajas

Tiene varias utilidades internas. Pero la utilidad pública principal es:

```js
NwtErrorsManager.global.showError(new Error("Whatever"));
```

