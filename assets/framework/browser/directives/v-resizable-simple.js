/**
 * 
 * # Nwt V-Resizable Directive - Vue directive
 * 
 * Directiva para `vue2` con la que convertir a un elemento en auto-redimensionable.
 * 
 * ## Exposición
 * 
 * Se expone vía la directiva:
 * 
 * ```html
 * <div v-resizable />
 * ```
 * 
 * 
 * 
 * 
 */
Vue.directive("resizable", {
  inserted(el) {
    el.style.resize = "both";
    // el.style.overflow = "auto";
  }
})
