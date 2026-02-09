# NwtProxyChain

API para encadenar llamadas a métodos personalizados pasándole strings construídos con acceso a propiedades.

API experimental, no se usa en el framework.

## Exposición

La API se expone a través de:

```js
NwtProxyChain
NwtFramework.ProxyChain
Vue.prototype.$nwt.ProxyChain
```

## Ventajas

```js
proxyChain = NwtProxyChain.fromFactory(text => customActionWith(text));
proxyChain.com.utils.Array.whatever.$; // Aquí, está haciendo: customActionWith("com.utils.Array.whatever");
proxyChain.find("com.utils.Array.whatever") // Lo mismo pero con llamada explícita
```

