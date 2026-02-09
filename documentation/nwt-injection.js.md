# Nwt Injection API

La `Nwt Injection API` consiste en la inyección al DOM.

En este paso:

- Se espera al evento `load` de la `window`
- Se inyectan las APIs en `Vue.prototype`
   - `Vue.prototype.$window`
   - `Vue.prototype.$nwt`
   - `Vue.prototype.$tracer`
   - `Vue.prototype.$trace`
- Se inicia la aplicación basándose en el componente:
   - `Vue.options.components.MainWindow`

Pero no se expone una API como tal en este punto.

