# Nwt Dialog Definition API

API de uso interno.

Permite crear definiciones abstractas de diálogos.

Sirve para vincular:

 - `$original`: Definición de usuario de diálogo
 - `$factory`: Definición validada de diálogo
 - `$process`: Proceso representativo del diaĺogo


## Exposición

Se expone a través de:

```js
NwtDialogDefinition
NwtFramework.DialogDefinition
Vue.prototype.$nwt.DialogDefinition
```

## Ventajas

Permite crear definiciones de diálogo validadas:

```js
const dialogDefinition = NwtDialogDefinition.create({
  title: "Título del diálogo",
  template: `
    <div>
      <div>En el body del diálogo</div>
    </div>
  `,
  factory: {
    data: {},
    methods: {},
    watch: {},
    created: {},
    mounted: {},
    ...
  }
});
```

Esto nos permite luego acceder a:

```js
dialogDefinition.$original; // Parámetros originales
dialogDefinition.$factory; // Parámetros finales
dialogDefinition.$process; // Proceso vinculado al diálogo
await CommonDialogs.open(dialogDefinition.$factory);
```

