/**
 * 
 * # Nwt Injection API
 * 
 * La `Nwt Injection API` consiste en la inyección al DOM.
 * 
 * En este paso:
 * 
 * - Se espera al evento `load` de la `window`
 * - Se inyectan las APIs en `Vue.prototype`
 *    - `Vue.prototype.$window`
 *    - `Vue.prototype.$nwt`
 *    - `Vue.prototype.$tracer`
 *    - `Vue.prototype.$trace`
 * - Se inicia la aplicación basándose en el componente:
 *    - `Vue.options.components.MainWindow`
 * 
 * Pero no se expone una API como tal en este punto.
 * 
 */
if (typeof window !== "undefined") {
    window.addEventListener("load", function () {
        trace("Nwt injection on Vue.prototype.$*");
        Vue.prototype.$window = window;
        Vue.prototype.$nwt = NwtFramework;
        Vue.prototype.$tracer = NwtTracer.global;
        Vue.prototype.$trace = NwtTracer.global.createTrace();
        new Vue({
            render: h => h(Vue.options.components.MainWindow),
        }).$mount("#app");
    });
}