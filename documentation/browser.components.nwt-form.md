# NwtFormControlPrototype

Componente base (sin plantilla) para controles de formulario compatibles con `NwtFormBuilder`.

De este componente, heredan todos los controles de formulario.

Por lo tanto, esta lógica es común a todos los controles.

## Exposición

```js
Vue.options.components.NwtFormControlPrototype
```

## Ventajas

Este componente no está pensado para usarse por sí mismo, sino para extenderse vía la API de vue2.

Pero su API es común a todos los controles, así que es especialmente interesante documentarla.

## Propiedades HTML de un control

Las propiedades comunes a todos los controles de formulario son:

```html
<nwt-form-control-prototype
  :initial-value="anything" # valor inicial del control, en su tipo hidratado, no en String solamente
  statement="Enunciado de este control"
  extra-info="Información extra del enunciado de este control"
  is-required="false"     # si es requerido en el formulario, u opcional (false, por defecto)
  :on-change="() => {}"   # evento lanzado al cambiar el valor del control
  :on-format="() => {}"   # evento para hidratar el valor, usado cuando llamas a thi.getValue()
  :on-validate="() => {}" # creo que este no se usa, la validación corre a cuenta de la API de v-forms en su lugar
/>
```

## Propiedades JS de un control

Otras propiedades internas, desde el JS y no del HTML, son estas:

```js
this.isControl === "prototype"; // Esta propiedad debe ser sobreescrita por cada control con el nombre del {tipo/subtipo} propios
this.isShowingExtraInfo; // variable de estado
this.value === ?; // El valor, sin formatear. Suele ser un string que se puede visualizar con text-boxes.
this.validationErrors === []; // errores de validación acumulados
```

## Métodos internos de un control

```js
this.getValue(); // devuelve el valor del control, pero formateado. Este valor ya no siempre será un String, puede ser número, booleano, objeto, lo que sea.
this.toggleExtraInfo(); // muestra u oculta la información extra del control
```

Esta sería la API inicial de cualquier control.

Pero hay que saber algunas cosas más para crear tu propio control.

Dado que este componente no tiene plantilla, y aunque la tuviera no serviría de nada porque cada control la sobreescribiría a su manera, conviene consultar el primer control que se ha creado como referencia para saber cómo crear la plantilla de un control.

El primer control que se ha crea en la API es:

 - `NwtFormControlForTextOneline`: que se corresponde con un input[type=text].

Consultar ese control si vas a crear uno propio, porque para hacerlo compatible del todo, por ejemplo, hay que:

 - Ponerle un class="nwt_form_control"
 - Ponerle un `<nwt-form-control-statement :control="this" />` arriba
 - Ponerle un `<nwt-form-control-handler :control="this" />` abajo
 - Poner el control en un flex-row y a la izquierda
 - Poner en la derecha del flex-row un `<nwt-form-control-buttons :control="this" />`
 - Poner un `v-model="value"` al input, de haberlo
 - Poner un `v-on:input="e => onChange(e, this)"` o llamar al `onChange` desde `watch.value`

Y esta API todavía no está completa en el momento de esta documentación, así que puede que haya alguna cosa más.

## Convivencia con la API de v-forms

Es importante entender por qué la API de `v-forms` no va incrustada en esta hard-way.

Es decir: son controles, ¿por qué no tienen ya el `v-forms.control` incrustado a nivel de componente?

La respuesta es: porque no siempre están participando activamente como controles en un formulario.

Separar estas 2 APIs permite que puedas reutilizar todos los controles en cualquier contexto, sin necesariamente vincularlos a un formulario.

Pero, por debajo, hay compatibilidades ya pensadas para integrarse con el formulario.

Además, la vinculación con un formulario permite algunos parámetros extra que no van necesariamente con el componente de control, sino con el formulario concreto.

Por ejemplo, si quieres añadir una validación de un texto en el contexto de un formulario concreto:

- Pides un tipo `text/oneline`: eso es lógica del control
- Pero además quieres que ese `text/oneline` cumpla con un formato concreto a la hora de validarlo: eso es lógica del formulario

Por eso, hay que separar estas 2 APIs. Porque un control no siempre es control activo en un formulario.

# NwtFormElementToAny

API común de los elementos que usan la directiva `v-forms.{form,control,handler}`.

De esta clase heredan las clases:

 - NwtFormElementToForm
 - NwtFormElementToControl
 - NwtFormElementToHandler

Pero es una clase abstracta: no se debe instanciar desde ella misma, sino desde una de estas descendientes.

## Exposición

```js
NwtFormElementToAny
NwtFramework.FormElementToAny
Vue.prototype.$nwt.FormElementToAny
```

## Ventajas

```js
NwtFormElementToAny.create(element:HTMLElement, value:Object, virtualNode);
// Propiedades y métodos que deben sobreescribirse:
NwtFormElementToAny.vformType === "any";
NwtFormElementToAny.prototype.initialize(); // NwtVue2.cross.expose.by.element(this.element, this, "vformsPrototype"); Pero vformsPrototype no debería aparecer nunca
NwtFormElementToAny.prototype.getValue(); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.validate(); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.propagateSuccess(); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.propagateErrors(error); // lanza un error porque es una clase abstracta
NwtFormElementToAny.prototype.submit(); // lanza un error porque es una clase abstracta
```

# NwtFormElementToControl

API de los elementos que usan la directiva `v-forms.control`.

Hereda de `NwtFormElementToAny`.

## Exposición

```js
NwtFormElementToControl
NwtFramework.FormElementToControl
Vue.prototype.$nwt.FormElementToControl
```

## Ventajas

```js
// Métodos sobreescritos de padre:
NwtFormElementToControl.prototype.initialize()
NwtFormElementToControl.prototype.getValue()
NwtFormElementToControl.prototype.validate(notify = false, mustThrow = true)
NwtFormElementToControl.prototype.propagateSuccess()
NwtFormElementToControl.prototype.propagateErrors(errors)
// Métodos propios:
NwtFormElementToControl.prototype.getName()
```

# NwtFormElementToForm

API de los elementos que usan la directiva `v-forms.form`.

Hereda de `NwtFormElementToAny`.

## Exposición

```js
NwtFormElementToForm
NwtFramework.FormElementToForm
Vue.prototype.$nwt.FormElementToForm
```

## Ventajas

```js
// Métodos sobreescritos de padre:
NwtFormElementToForm.prototype.initialize()
NwtFormElementToForm.prototype.getValue()
NwtFormElementToForm.prototype.validate(notify = false, mustThrow = true)
NwtFormElementToForm.prototype.submit()
```

# NwtFormElementToHandler

API de los elementos que usan la directiva `v-forms.handler`.

Hereda de `NwtFormElementToAny`.

## Exposición

```js
NwtFormElementToHandler
NwtFramework.FormElementToHandler
Vue.prototype.$nwt.FormElementToHandler
```

## Ventajas

```js
// Métodos sobreescritos de padre:
NwtFormElementToForm.prototype.initialize()
NwtFormElementToForm.prototype.setErrors(errors)
```

# NwtFormUtils

API de utilidades varias de un formulario.

Esta API se utiliza por:

 - La directiva de v-forms, para no poner toda la lógica dentro de la directiva, y tenerla reutilizable desde fuera
 - El control prototipo base, para algunas validaciones que deberían hacerse para cumplir los estándares de los Form Controls.

## Exposición

```js
NwtFormUtils
NwtFramework.FormUtils
Vue.prototype.$nwt.FormUtils
```

## Ventajas

```js
// Usados por la API de Form Controls:
NwtFormUtils.fromControlTypeToFullpath("text/oneline");          // returns "assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}/control"
NwtFormUtils.validateControlButtons(componenteControlVue2);      // lanzará error si el componente no cumple con la opción de buttons
NwtFormUtils.validateControlPlaceholder(componenteControlVue2);  // lanzará error si el componente no cumple con la opción de placeholder
NwtFormUtils.validateControlExtraClasses(componenteControlVue2); // lanzará error si el componente no cumple con la opción de extraClasses
NwtFormUtils.validateControlValue(componenteControlVue2);        // lanzará error si el componente no cumple con la opción de value
NwtFormUtils.validateIsControl(componenteControlVue2);           // lanzará error si el componente no cumple con la opción de isControl
// Usados por la API de v-forms:
NwtFormUtils.from.element.to.form(htmlElement);     // se aplica cuando v-forms.form y equivale a:    NwtFormElementToForm.create(...args).initialize()
NwtFormUtils.from.element.to.control(htmlElement);  // se aplica cuando v-forms.control y equivale a: NwtFormElementToControl.create(...args).initialize()
NwtFormUtils.from.element.to.handler(htmlElement);  // se aplica cuando v-forms.handler y equivale a: NwtFormElementToHandler.create(...args).initialize()
```











# NwtFormBuilder

Componente vue2 que construye formularios.

## Exposición

```js
Vue.options.components.NwtFormBuilder
```

## Ventajas

```html
<nwt-form-builder
  :from="{
    title: "Título del formulario",
    footer: "Pie del formulario",
    controls: [{
      type: "text/oneline", # El {tipo/subtipo} de control que están en assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}
      props: {},            # Propiedades que se le pasan como parámetros. Son parámetros específicos del control en sí.
      listeners: {},        # Eventos que se le pasan como parámetros. Son parámetros específicos del control en sí también.
    },{
      ...
    }]
    events: {
      onSubmit: (data) => {},
      onSuccess: (data) => {},
      onError: (data) => {},
    }
  }"
/>
```

Esta API se cruza con varias APIs:

- `assets/framework/browser/components/nwt-form/control-prototype.js`:
   - este es el componente base de todos los controles de formulario (heredan de él)
- `assets/framework/browser/directives/v-forms.js`:
   - utiliza las directivas de v-forms para componer un formulario paralelo que respeta la jerarquía del DOM
   - ese formulario paralelo permite composición de campos, validación y envío automáticamente

Y luego están todos los controles que hay bajo:

- `assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}/control.{html,css,js}`
   - file-chooser/directory
   - file-chooser/file
   - file-chooser/new-file
   - text/oneline
   - text/multiline

En el momento de documentar esto, estos son los controles disponibles. Para estar actualizado, revisar el directorio.





# NwtFormControlHandler

Componente para mostrar errores de validación de un Form Control.

## Exposición

```js
Vue.options.components.NwtFormControlHandler
```

## Ventajas

```html
<nwt-form-control-handler :control="controlComponent" />
```

Donde `controlComponent` tiene que ser el componente de tipo Form Control.

Mientras el control cumpla con los estándares, no habrá problema. Solo se accede a:

- `control.validationErrors`

Este componente **SÍ LLEVA INCRUSTADA** la directiva de v-forms.handler.

La razón teórica (no sé si está bien implementado todavía) es que:

  - Solo mostrará los errores de validación que se acumulen en el control proporcionado
  - Si el control proporcionado no usa v-forms.control, no acumula errores
  - Si el control proporcionado sí usa v-forms.control, sí acumula errores, entonces sí mostrará errores.





# NwtFormControlStatement

Componente para mostrar anunciados de control homogéneos.

Uso interno de las plantillas de los Form Controls.

## Exposición

```js
NwtFormControlStatement
NwtFramework.FormControlStatement
Vue.prototype.$nwt.FormControlStatement
```

## Ventajas

```html
<nwt-form-control-statement
  :control="controlComponent"
  :extra-buttons="[{text:'ok',click:()=>{}}]"
/>
```

Donde `controlComponent` tiene que ser el componente de tipo Form Control.

Mientras el control cumpla con los estándares, no habrá problema. Solo se accede a:

- `control.statement`
- `control.extraInfo`

Los `extra-buttons` permiten añadir botones, a nivel de componente de control: no a nivel de parámetros de control.

Estos botones extra deben ser proporcionados desde el código del control, no desde los parámetros.

Otra cosa es que el control, por diseño, permita traspasar un parámetro propio hacia aquí.























# NwtFormControlForGroupList

Componente de control de formulario para listas de controles.

Con este control, puedes agrupar listas de controles en 1 mismo control.

## Exposición

```js
Vue.options.components.NwtFormControlForGroupList
```

## Ventajas

```html
<nwt-form-control-for-list
  statement="Enunciado para lista de controles"
  :controls="[{
    type: 'text/oneline',
    props: {
      initialValue: 'No sabe/No contesta',
    },
    listeners: {}
  },{
    type: 'text/oneline',
    props: {
      initialValue: 'No sabe/No contesta',
    },
    listeners: {}
  }]"
  v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
/>
```





# NwtFormControlForGroupStructure

Componente de control de formulario para estructuras de controles.

Con este control, puedes agrupar controles con etiqueta en 1 mismo control.

Es como listas, pero no es incrementable, es solo un grupo, donde a cada control le corresponde una etiqueta diferente.

## Exposición

```js
Vue.options.components.NwtFormControlForGroupStructure
```

## Ventajas

```html
<nwt-form-control-for-structure
  statement="Enunciado para estructure de controles"
  :controls="{
    'campo 1': {
      type: 'text/oneline',
      props: {
        initialValue: 'No sabe/No contesta',
      },
      listeners: {}
    },
    'campo 2': {
      type: 'text/oneline',
      props: {
        initialValue: 'No sabe/No contesta',
      },
      listeners: {}
    }
  }"
  v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
/>
```

















# NwtFormControlForTextOneline

Componente de control de formulario para textos de una sola línea.

## Exposición

```js
Vue.options.components.NwtFormControlForTextOneline
```

## Ventajas

```html
<nwt-form-control-for-text-oneline
  :buttons="[{text:'texto de boton',click:() => {}}]"
  extraClases="clase1 clase2"
  placeholder="Texto de relleno"
  v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
/>
```







