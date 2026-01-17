# Nwt Dialog Definition API

Permite crear definiciones abstractas de diálogos.

Es una API de uso interno, pero muy importante porque se instancia en la creación de diálogos.

Sirve para vincular:

 - `$original`: Definición de usuario de diálogo
 - `$factory`: Definición validada de diálogo
 - `$process`: Proceso representativo del diálogo, instancia de `NwtProcess`
 - `$state`: El `Promise.withResolvers()` del diálogo


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
  // Parámetros principales:
  title: "Título del diálogo",
  template: `
    <div>
      <div>En el body del diálogo</div>
      <div class="flex_row">
        <div class="flex_100"></div>
        <div class="flex_1"><button v-on:click="accept">Aceptar</button></div>
        <div class="flex_1"><button v-on:click="cancel">Cancelar</button></div>
      </div>
    </div>
  `,
  factory: {
    data: {
      // El `data` también puede ser una función que devuelva un objeto, como normalmente sería.
      // Se inyectan automáticamente algunas propiedades en el data:
      //
      // value:        "", // Por defecto, value es un String vacío
      // deepness:     101, // Este valor se usa como z-index y sirve para poder tener varios diálogos simultáneos, con profundidad
      // state:        ..., // El `Promise.withResolvers()` del diálogo/proceso, su `promise` es lo que se devuelve cuando haces `await NwtDialogs.open(...)`
      // process:      ..., // El `NwtProcess` correspondiente al diálogo, el cual tendrá en `nwtProcess.dialog` el componente de diálogo (no la instancia de `NwtDialogDefinition`, cuidado ahí)
      // definition:   ..., // El `NwtDialogDefinition`, que contiene `$original`, `$factory`, `$process` y `$state`
      // isMinimized:  false, // Flag que indica si el diálogo está minimizado o no. La minimización solo aplica un `v-show`, nunca `v-if`
      //
    },
    methods: {
      // Se inyectan automáticamente algunos métodos:
      //
      // accept: function(valor) {...}, // Cierra el diálogo y devuelve el valor especificado, o `this.value` en su defecto. Si valor es `instanceof Event`, devolverá el `this.value` igual (así se puede hacer `v-on:click="accept", más cómodo)
      // cancel: function() {...}, // Cierra el diálogo y devuelve `undefined`
      // minimize: function() {...}, // Minimiza el diálogo
      // maximize: function() {...}, // Maximiza el diálogo
      // subdialog: function() {...}, // Crea un subdiálogo (pasándole el `parent: this.process` automáticamente) usando el método `NwtDialogs.open`
      // subdialogByTemplateId: function() {...}, // igual, pero usando el método `NwtDialogs.openByTemplateId` en su lugar
      //
    },
    watch: {},
    created: {},
    mounted: {},
    ...
  },
  // Parámetros avanzados (opcionales):
  parent: nwtProcessInstance, // Proceso (**no diálogo, cuidado**) padre, para que al cerrarse, cierre a este (**proceso, no diálogo**) hijo también.
  windowClasses: "no_scroll", // Clases que se quieren inyectar en `.window`
});
```

Esto nos permite luego acceder a:

```js
dialogDefinition.$original; // Parámetros originales
dialogDefinition.$factory; // Parámetros finales
dialogDefinition.$process; // Proceso vinculado al diálogo
dialogDefinition.$state; // Es un `Promise.withResolvers()`: `resolve`, `reject` y `promise` están dentro.
await CommonDialogs.open(dialogDefinition.$factory); // aunque esto no está pensado para usarse así, sino que directamente le proporcionarías el objeto de definición. Pero internamente, hará esto.
```

Es una interfaz interna, pero su construcción se utiliza en el proceso de `NwtDialogs.open` y `NwtDialogs.openByTemplateId`, por lo cual aunque no se interactúe directamente con ella, es una interfaz importante dentro del framework, y hay que entenderla para poder explotar los diálogos al máximo.

Los parámetros estrictamente necesarios para la instanciación solo son:

 - `template:String`

