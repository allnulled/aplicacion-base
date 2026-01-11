/**
 * 
 * # App Payload API
 * 
 * Sirve para inyectar un evento en la aplicación recién cargada.
 * 
 * Funcionalmente, solo llama a `AppPayload.inject()`.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['AppPayload'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['AppPayload'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const AppPayload = class {

    static inject() {
      window.addEventListener("app-mounted", function (event) {
        trace("AppPayload.inject@app-mounted");
        setTimeout(async () => {
          // event.detail.component.startConfiguraciones();
          // event.detail.component.startGestorDePrompts();
          // event.detail.component.startExploradorDeFicheros();
          // event.detail.component.startGestorDeFicherosDeChatgpt();
          event.detail.component.startProcedimientos();
        }, 400);
      });
    }

  };

  AppPayload.inject();

  return AppPayload;

});