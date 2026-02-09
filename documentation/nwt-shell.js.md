# Nwt Shell API

API para instanciar una consola contextualizada.

## Exposición

La API está expuesta a través de:

```js
NwtShell
NwtFramework.Shell
Vue.prototype.$nwt.Shell
```

## Ventajas

La API permite cosas como:

```js
const shell = NwtShell.create("/path/to/directory");
await shell.exec("explorer ."); // Ejecutar comandos asíncronamente
await shell.ls();               // Listar directorios
shell.cd("..");                 // Cambiar de directorio
shell.subprocess("comando", argumentos=["--flag"], opciones={cwd:...}); // returns una Promise (por si se quiere usar con await directamente) de la que cuelga una propiedad extra: «subprocess»
shell.terminate(); // envía signal de terminado a todos los procesos hijo (de this._children)
```

