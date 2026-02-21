# Caso de la API de Validation

La Validation API está vinculada a la `Resource API` en tanto que un objeto validable siempre debe ser una `Resource`, que se define como entidad abstracta global.

Quiere decir que:

- Validation necesita Types obligatoriamente
- Types es Resources, básicamente:
   - Un *tipo abstracto* es la definición exacta de `Resource`.

Por esto, `Validation API` es una:

- API estática global, una `Static API`
- API estática de `Resource`, una `Resource Helper API`

## Requisitos para inyectar la API

Esta API, para implicarse en `Resource`, requiere:

- Obligatoriamente:
   - 1 `inherits` con `"control/trait/for/validation"`
   - 1 `apis` con `"validation"` (esto debería heredarse, pero ahora no se hace)
- Opcionalmente:
   - 1 `control.onValidate:Function` con la función de validación
   - Otros parámetros intermedios propios de la implementación

## ¿Por qué es un buen caso?

Porque es uno de los principales casos que motivó toda esta ingeniería de API.

## Detalles del proceso

Cronológicamente, puede ser irrelevante si se comprende la función de cada pieza.

El desarrollo básico requiere de las APIs de:

- `NwtResource`, carpetas `compilable` y `compiled`, registrando los **controles básicos**
   - `assets/app/resource/compilable/control/trait/for/validate/compilable.js` como `trait` para que todo pueda reusarse con `inherits`
      - la aportación 
   - `assets/app/resource/compilable/control/for/text/compilable.js` para el control de texto
   - `assets/app/resource/compilable/control/for/structure/compilable.js` para el control de estructura
   - `assets/app/resource/compilable/control/for/list/compilable.js` para el control de lista
   - `assets/app/resource/compilable/control/for/option/compilable.js` para el control de opción
- `NwtResourceApi`, carpeta `helpers`, registrando las **APIs satelitales globales**
   - `assets/app/resource/api/helpers/control/validation.js` como único punto de entrada global para toda la API satelital de validation
      - la aportación en este fichero solamente es la de *funciones adapter* de `Resource Helper API` a `Static API`
- `NwtStatic`, carpeta `helpers`, registrando las **funciones estáticas reales** para toda la API
   - `assets/app/static/api/helpers/control/validation/interface.js` como interfaz global común

