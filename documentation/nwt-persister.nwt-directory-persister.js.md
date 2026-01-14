# NwtDirectoryPersister

API para persistencia de directorios.

## Exposición

```js
NwtDirectoryPersister
NwtFramework.DirectoryPersister
Vue.prototype.$nwt.DirectoryPersister
```

## Ventajas

```js
// Métodos principales:
await NwtDirectoryPersister.has(directory:String); // returns Boolean
await NwtDirectoryPersister.init(directory:String); // mkdir si no existe ya
await NwtDirectoryPersister.get(directory:String); // devuelve los nombres de los nodos (fichero o directorio) de dentro
await NwtDirectoryPersister.set(directory:String); // mkdir
await NwtDirectoryPersister.delete(directory:String); // rmdir (no recursivo)
// Métodos drásticos:
await NwtDirectoryPersister.ensure(directory:String); // ensureDirectory, crea todos los nodos necesarios y el directorio final
await NwtDirectoryPersister.destroy(directory:String); // rmdir (recursivamente)
```

Como mucho, esta API creará o destruirá un directorio, por lo cual no hay más argumentos que la ruta al directorio.

