



# Nwt Box Viewer API / Componente Vue2

La Nwt Box Viewer API permite visualizar un componente pasándole directamente una plantilla Vue2 como parámetro.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtBoxViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-box-viewer :source="<div>Aquí debe ir HTML para Vue2</div>" />
```

Donde `source` tiene que ser un string válido como plantilla para un componente Vue2 anónimo.

Este componente se utiliza en los diálogos, y sirve para que cualquier componente renderizable dentro de un diálogo, pueda renderizarse fuera también.

