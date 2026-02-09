# Nwt Environment API

API para poder discriminar entre diferentes entornos del JavaScript.

## Exposición

Se expone a través de:

```js
NwtEnvironment
NwtFramework.Environment
Vue.prototype.$nwt.Environment
```

## Ventajas

Puedes hacer cosas como:

```js
NwtEnvironment.summary() // Object con todas las propiedades
NwtEnvironment.isDesktop // Boolean
NwtEnvironment.isBrowser // Boolean
NwtEnvironment.isMobile // Boolean
NwtEnvironment.isLinux // Boolean
NwtEnvironment.isWindows // Boolean
NwtEnvironment.isMac // Boolean
NwtEnvironment.isAndroid // Boolean
NwtEnvironment.isIOS // Boolean
NwtEnvironment.isElectron // Boolean
NwtEnvironment.isNode // Boolean
NwtEnvironment.isCordova // Boolean
NwtEnvironment.isCapacitor // Boolean
NwtEnvironment.isNWJS // Boolean
NwtEnvironment.isTouchDevice // Boolean
NwtEnvironment.isHeadless // Boolean
NwtEnvironment.canUseLocalStorage // Boolean
NwtEnvironment.canUseFilesystem // Boolean
NwtEnvironment.hasWindow // Boolean
NwtEnvironment.hasDOM // Boolean
NwtEnvironment.hasGlobal // Boolean
NwtEnvironment.hasRequire // Boolean
```

