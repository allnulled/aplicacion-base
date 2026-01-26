

# NwtStringShortener

API para gestionar strings acortados.

## Exposición

Se expone a través de:

```js
NwtStringShortener
NwtFramework.StringShortener
Vue.prototype.$nwt.StringShortener
// Instancia:
NwtStringShortener.global // instancia creada en: "assets/framework/nwt-string-shortener/global.json"
```

## Ventajas

La API permite cosas como:

```js
// Estáticos:
NwtStringShortener.create(jsonFilepath:String);
NwtStringShortener.createUid(len=10); // returns String con un nuevo ID (PERO NO LO PERSISTE)
// De instancia:
await NwtStringShortener.global.init(id, initialValue = undefined); // Inicializa un ID si no existe ya + retorna su shorteneado
await NwtStringShortener.global.get(id, defaultValue = undefined); // Devuelve el ID shorteneado de un ID, o en su defecto `defaultValue`
await NwtStringShortener.global.deleteById(id); // Elimina el ID no shorteneado proporcionado
await NwtStringShortener.global.deleteAllExceptValues(values=[]); // Elimina todos los IDs **shorteneados** que NO aparezcan en el `values=[...]`. Se usa para eliminar directorios-caché obsoletos.
await NwtStringShortener.global.add(id, value = false, silently = false); // añade el ID como nuevo shortener + si value no es false lo usa como ID shorteneado + si silently no es false no lanza error de existir ya + retorna el ID shorteneado correspondiente
```

