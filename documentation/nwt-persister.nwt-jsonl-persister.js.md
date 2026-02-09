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

