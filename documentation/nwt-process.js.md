# Nwt Process API

Permite representar procesos.

Un proceso puede:

 - Guardar hijos con `$children`
 - Vincularse con un padre con `$parent`
 - Vincularse con un `ProcessManager` con `$manager`
 - Recordar cuándo se creó con `$createdAt`
 - Recordar cuándo se cerró con `$closedAt`
 - Ocultarse con `hide()`
 - Mostrarse con `show()`
 - Crear un subproceso con `createSubprocess(...)`
 - Cerrarse con `close()`

## Exposición

Se expone a través de:

```js
NwtProcess
NwtFramework.Process
Vue.prototype.$nwt.Process
```

## Permite cosas como

```js
const pr = NwtProcess.create({
  manager: NwtProcessManager.dialogs,
  parent: NwtProcessManager.dialogs.$list[0],
});
const pr2 = pr.createSubprocess({
  extraParams: {},
});
pr.hide();
pr.show();
pr.close();
```

