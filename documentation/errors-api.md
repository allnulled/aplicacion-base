



# Nwt Errors API

## Exposición

Está expuesta en las globales:

```js
CommonErrors
NwtErrors
NwtFramework.Errors
Vue.prototype.$nwt.Errors
Vue.prototype.$errors
```

## Mostrar un error

```js
CommonErrors.showError(new Error("Cualquier cosa"));
```

## Captura automática de aserciones globales

El componente hace:

```js
assertion.setErrorCallback(error => this.showError(error))
```

Esto implica que las aserciones globales mostrarán su error en este widget.

