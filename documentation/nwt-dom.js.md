# NwtDom

API para utilidades relacionadas con el DOM.

## Exposición

```js
NwtDom
NwtFramework.Dom
Vue.prototype.$nwt.Dom
```

## Ventajas

```js
// Métodos de selección:
// (donde String permite css selector, y Function permite js filter)
NwtDom.findFirstChildWhere(element [, String], Function);
NwtDom.findFirstChildrenWhere(element [, String], Function);
NwtDom.findClosestParentWhere(element [, String], Function);
NwtDom.removeTextContentSpaces(text);
```

