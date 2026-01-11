# Nwt Progress Bar Viewer API / Componente Vue2

La Nwt Progress Bar Viewer API permite sincronizar un widget gráfico con una instancia de `NwtProgressBar`.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtProgressBarViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-progress-bar-viewer :progress-bar="progressBar" />
```

Donde `progressBar` tiene que ser una instancia de `NwtProgressBar`.

