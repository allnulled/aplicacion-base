# Nwt Lazy Loader API

API para carga cacheable de recursos JS y CSS.

## Exposición

La API se expone a través de:

```js
NwtLazyLoader
NwtFramework.LazyLoader
Vue.prototype.$nwt.LazyLoader
```

## Ventajas

La API permite algunas cosas como:

```js
await NwtLazyLoader.lazyLoad({
  id: "jquery",
  type: "scriptSrc",
  url: "https://cdn.js/jquery.js",
  checker: typeof jQuery !== "undefined",
});
await NwtLazyLoader.lazyLoad({
  id: "styles",
  type: "linkStylesheet",
  url: "https://cdn.js/styles.css",
});
await NwtLazyLoader.loadHighlightJs(); // carga highlight.js
await NwtLazyLoader.loadJsBeautify(); // carga js-beautify
```

