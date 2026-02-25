/**
 * 
 * # Nwt Framework API
 * 
 * API de acceso global.
 * 
 * ## Exposición
 * 
 * Está expuesta en:
 * 
 * ```js
 * NwtFramework
 * Vue.prototype.$nwt
 * ```
 * ## Ventajas
 * 
 * Dejar accesible desde 1 objeto todas las APIs de Nwt.
 * 
 * Se conforma a partir de:
 * 
 * ```js
 * Object.assign(NwtFramework, {
 *   // BOOT
 *   Asserter: NwtAsserter,
 *   Globalizer: NwtGlobalizer,
 *   Importer: NwtImporter,
 *   LazyLoader: NwtLazyLoader,
 *   ProcessManager: NwtProcessManager,
 *   Process: NwtProcess,
 *   ProgressBar: NwtProgressBar,
 *   Randomizer: NwtRandomizer,
 *   Settings: NwtSettings,
 *   Tester: NwtTester,
 *   Timer: NwtTimer,
 *   Utils: NwtUtils,
 *   Tracer: NwtTracer,
 *   // Last APIs:
 *   ProcedureDefinition: NwtProcedureDefinition,
 *   ProcedureInjections: NwtProcedureInjections,
 *   ProcedureSeed: NwtProcedureSeed,
 *   Csv: NwtCsv,
 *   Shell: NwtShell,
 *   Filesystem: NwtFilesystem,
 *   // Injected later:
 *   Errors: null,
 *   Dialogs: null,
 *   Toasts: null,
 *   // PACK
 * });
 * ```
 * 
 * 
 */
(function () {

  trace("Packing NwtFramework");

  AppRoot.onMounted(() => {

    NwtFramework.recycle = function () {
      const scope = typeof window !== "undefined" ? window : global;
      const output = {recycle: NwtFramework.recycle};
      for (let prop in scope) {
        if (prop.startsWith("Nwt")) {
          output[prop.replace("Nwt", "")] = scope[prop];
        }
      }
      Object.assign(NwtFramework, output);
    };
    NwtFramework.recycle();

  });

  return "NwtFramework global variable will be packed at window.app-mounted";

})();