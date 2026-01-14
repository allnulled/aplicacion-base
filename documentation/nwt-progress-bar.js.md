# Nwt Progress Bar API

API para gestionar una barra de progreso.

## Exposición

La API se expone a través de:

```js
NwtProgressBar
NwtFramework.ProgressBar
Vue.prototype.$nwt.ProgressBar
```

## Ventajas

Permite algunas cosas como:

```js
const progressBar = ProgressBar.create();
const subprogressBar = progressBar.subprogress({
  total: 5,
  current: 0,
});
subprogressBar.advance(1);
subprogressBar.advance(1);
subprogressBar.advance(1);
subprogressBar.advance(1);
subprogressBar.advance(1);
progressBar.advance(1);
```

