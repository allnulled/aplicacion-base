/**
 * 
 * # Nwt V-Focus Directive - Vue directive
 * 
 * Directiva para `vue2` con la que establecer el foco en un elemento al ser insertado en el DOM.
 * 
 * ## Exposición
 * 
 * Se expone vía la directiva:
 * 
 * ```html
 * <input v-focus type="text" />
 * ```
 * 
 * 
 * 
 * 
 */
Vue.directive("focus", {
  inserted(el) {
    el.focus();
  }
});