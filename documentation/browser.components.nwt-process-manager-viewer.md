



# Nwt Process Manager Viewer API / Componente Vue2

La Nwt Process Manager Viewer API permite sincronizar un widget gráfico con una instancia de `NwtProcessManager`.

## Exposición

La API se expone a través del componente Vue2:

```js
Vue.options.components.NwtProcessManagerViewer
```

## Ventajas

La API permite cosas como:

```html
<nwt-process-manager-viewer :process-manager="processManager" />
```

Donde `processManager` tiene que ser una instancia de `NwtProcessManager`.

Hay 2 gestores de procesos principales:

```js
NwtProcessManager.dialogs instanceof NwtProcessManager
NwtProcessManager.boxes instanceof NwtProcessManager
```

