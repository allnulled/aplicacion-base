



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

# NwtFilePersister

API para persistencia de ficheros.

## Exposición

```js
NwtFilePersister
NwtFramework.FilePersister
Vue.prototype.$nwt.FilePersister
```

## Ventajas

```js
await NwtFilePersister.has(file:String)
await NwtFilePersister.init(file:String, content:String);
await NwtFilePersister.get(file:String);
await NwtFilePersister.set(file:String, content:String);
await NwtFilePersister.delete(file:String);
```

Esta API solo atacará a ficheros, no a directorios, ni a JSONs. Por eso, `content` debe ser un String siempre.

# NwtJsonPersister

API para la persistencia de ficheros JSON.

## Exposición

```js
await NwtJsonPersister.has(base:String|Object|Function, propertyPath:Array);
await NwtJsonPersister.init(base:String|Object|Function, propertyPath:Array, value:any);
await NwtJsonPersister.get(base:String|Object|Function, propertyPath:Array);
await NwtJsonPersister.set(base:String|Object|Function, propertyPath:Array, value:any);
await NwtJsonPersister.delete(base:String|Object|Function, propertyPath:Array)
```

En cuanto a `base`:

- Cuando `base` es un String, se considera como ruta del fichero.
- Cuando `base` es Object o Function, se considera ese como los datos de base.

En cuanto a `propertyPath`:

- Se espera un `Array<String>` con el índice de los nombres de las propiedades del JSON.
   - Si das `["items", "0", "subitems"]` apuntas a `jsonData.items["0"].subitems`
- Si omites `propertyPath`, estás apuntando al fichero entero.

En cuanto a `value`, se espera el valor a establecer en los casos de `set` e `init`.

# NwtJsonlPersister

API para la persistencia de ficheros JSONL.

## Exposición

```js
await NwtJsonlPersister.select(file:String, filter:Function);
await NwtJsonlPersister.insert(file:String, value:Object);
await NwtJsonlPersister.update(file:String, filter:Function, value:Object);
await NwtJsonlPersister.delete(file:String, filter:Function);
```

Dado que los ficheros JSONL son prácticamente una tabla (en términos SQL), los métodos son los de una tabla también.

# NwtPersister

API de persistencia en el sistema de ficheros.

## Exposición

```js
NwtPersister
NwtFramework.Persister
Vue.prototype.$nwt.Persister
```

## Ventajas

```js
NwtPersister.json === NwtJsonPersister
NwtPersister.jsonl === NwtJsonlPersister
NwtPersister.file === NwtFilePersister
NwtPersister.directory === NwtDirectoryPersister
```

Es una API conectora. Para más información, consultar las APIs contenidas.







