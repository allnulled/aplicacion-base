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
      window.addEventListener("app-mounted", async function (event) {
        trace("AppPayload.inject@app-mounted");
        On_development: {
          await NwtCodeComposer.loadBeautifyJs();
        }
        On_development_payload: {
          await NwtTimer.timeout(400);
          // event.detail.component.startGestorDePrompts();
          // event.detail.component.startExploradorDeFicheros();
          // event.detail.component.startProcesos();
          // event.detail.component.startGestorDeFicherosDeChatgpt();
          // event.detail.component.startNewFeature();
          // event.detail.component.startProcedimientos();
        }
        window.dispatchEvent(new CustomEvent("app-started"));
      });
      window.addEventListener("app-started", async function (event) {
        trace("AppPayload.inject@app-started");
        await NwtLiveInjector.start();
        await NwtTimer.timeout(400);
        Final_payload: {
          const builderPath = NwtPaths.global.relative("assets/app/app-last-feature.js");
          await NwtImporter.asyncSource(builderPath, {});
        }
      });
    }

  };

  AppPayload.inject();

  return AppPayload;

});