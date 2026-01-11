/**
 * 
 * # App Root API
 * 
 * Sirve para localizar el componente raíz de la aplicación.
 * 
 * Funcionalmente:
 * 
 * - Deja acceso a `AppRoot.component`
 *    - Que se establece en el `mounted` del componente `Vue.options.components.MainWindow`.
 *    - Que se establece al llamar a `AppRoot.initialize(mainWindowComponent)`
 *    - Y se encarga de despachar el evento `window.addEventListener("app-mounted", ...)`
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['AppRoot'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['AppRoot'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const AppRoot = class {

    static component = null;

    static initialize(component) {
      this.component = component;
      window.dispatchEvent(new CustomEvent("app-mounted", {
        detail: {
          datetime: new Date(),
          component: component,
        }
      }));
    }

  };

  return AppRoot;

});