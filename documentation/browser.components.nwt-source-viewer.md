



# NwtSourceViewer

Componente vue2 para renderizar plantillas vue2 en runtime.

## Exposición

```js
Vue.options.components.NwtSourceViewer
```

## Ventajas

```html
<nwt-source-viewer
  :source="codigoHtmlVue"
  :component-context="{ mounted:?, data:?, methods:?, ... }" # opcional
/>
```

Donde `codigoHtmlVue` es un String con el código de plantilla vue2 que desees.

Por debajo, creará un componente `AnonymousSourceViewer{RANDOMIZED-STRING}`.

Utilizará `component-context` para darle contexto a este componente.

