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

