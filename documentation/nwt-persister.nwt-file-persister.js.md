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

