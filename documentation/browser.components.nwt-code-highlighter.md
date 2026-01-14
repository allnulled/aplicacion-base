



# Nwt Code Highlighter API / Componente Vue2

La Nwt Code Highlighter API permite visualizar un fragmento de código con la iluminación de sintaxis.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtCodeHighlighter
```

## Ventajas

La API permite cosas como:

```html
<nwt-code-highlighter syntax="html" :code="<div>Aquí debe ir el código en el lenguaje especificado</div>" />
```

Donde `syntax` tiene que ser el lenguaje de programación.

Donde `code` tiene que ser el código fuente en este lenguaje,

