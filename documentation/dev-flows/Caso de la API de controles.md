# Caso de la API de controles

Los controles tienen la ventaja de que puedes:

- asociarlos con un tipo abstracto
- asociarlos con una validación
- adjuntarlos en una estructura de formulario
- adjuntarlos en una estructura de tipo

Pero si te fijas, fuera de formularios, no aporta gran cosa featurizar (no hay una API concreta, está diluida ahora mismo) una Resource como control. Y la compatibilidad con formularios nos rompe flexbilidad.

Esta guía es para evitar eso precisamente: tener un control, pero no dejar de tener un componente Vue2 reutilizable en cualquier parte del código.

Para conseguirlo, hay que partir la abstracción por unos puntos concretos, para poder reutilizarlo, a nivel de control, por un lado, y a nivel de componente vue2 normal, por otro.

## Paso 1. Crear el Resource

El primer paso es crear el Resource para el nuevo control. Especificar el subtypeOf, el control.schema si escaece, etc.

Esta capa guarda la compatibilidad con la API de controles.

## Paso 2. Plantilla del Resource con Statement y Error-handler

La plantilla del Resource de tipo control requiere aportar la lógica de statement y del error-handler, porque es la lógica propia de los formularios.

La lógica propia del control tiene que abarcar la compatibilidad de la API de árboles de formulario y todo.

## Paso 3. Crear la View independiente

Para poder reutilizar el control fuera de formularios, crea una Resource pero guárdala en otra carpeta, como `view/for/{componente}`.

En esta Resource puedes arrastrar toda la lógica que quieras del control.

Lo normal es pasarle `settings` e intentar ponerlo todo ahí.

Es decir, es una `view` independiente pero va a utilizar igual `settings` porque es una API guai que centraliza todos los parámetros y evitamos cargar el marcado HTML y lo movemos a JS donde podemos usar más cosas, como `{...proto1, ...proto2}`, por ejemplo.

## Criterio y fundamientos

El criterio de crear un componente aparte, y sincronizarlo con la capa de control, es permitir que un componente vue2 cualquiera pueda a la vez actuar como un control.

De hecho, puede verse al revés.

Puedes hacer, primero, el componente independiente, y luego con añadir la capa de control, tienes un control usable en formularios.

## Ejemplos

Lo más efectivo es ver cómo se han hecho los primeros controles:

- El day-picker:
   - El control: `assets/app/resource/compilable/control/for/type/day-picker/compilable.html`
   - La vista: `assets/app/resource/compilable/view/for/type/day-picker/compilable.html`
- El hour-picker:
   - El control: `assets/app/resource/compilable/control/for/type/hour-picker/compilable.html`
   - La vista: `assets/app/resource/compilable/view/for/type/hour-picker/compilable.html`
- El moment-picker:
   - El control: `assets/app/resource/compilable/control/for/type/moment-picker/compilable.html`
   - La vista: `assets/app/resource/compilable/view/for/type/moment-picker/compilable.html`

Si se ve, el control siempre es lo mismo:

- es una plantilla muy breve, y
- dentro tiene siempre la vista final, y
- le pasa el settings, y
- le proxifica los `onChange` (del settings, óptimamente) para poder sincronizarse

## Conclusión

Esta es la forma correcta de crear nuevos controles y mantener máxima compatibilidad con todo.

Es una tontería, es meter un componente dentro de otro, de una forma concreta, partiendo la abstracción en una línea concreta.

Pero si no lo sabes, puedes liarla. Y por eso he perdido tiempo escribiendo esta pequeña guía, así me acuerde que es *el método* para proceder bien.