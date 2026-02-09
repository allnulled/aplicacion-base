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
  Object.assign(NwtFramework, {
    // BOOT
    Asserter: NwtAsserter,
    Globalizer: NwtGlobalizer,
    Importer: NwtImporter,
    LazyLoader: NwtLazyLoader,
    ProcessManager: NwtProcessManager,
    Process: NwtProcess,
    JsonStorer: NwtJsonStorer,
    ProgressBar: NwtProgressBar,
    Randomizer: NwtRandomizer,
    Settings: NwtSettings,
    Tester: NwtTester,
    Timer: NwtTimer,
    Utils: NwtUtils,
    Tracer: NwtTracer,
    // Last APIs:
    ProcedureDefinition: NwtProcedureDefinition,
    ProcedureInjections: NwtProcedureInjections,
    ProcedureSeed: NwtProcedureSeed,
    ProceduresManager: NwtProceduresManager,
    PromptsManager: NwtPromptsManager,
    Csv: NwtCsv,
    Chatgpt: NwtChatgpt,
    DialogDefinition: NwtDialogDefinition,
    Shell: NwtShell,
    Filesystem: NwtFilesystem,
    Strings: NwtStrings,
    FileChooser: NwtFileChooser,
    Environment: NwtEnvironment,
    Paths: NwtPaths,
    JsUtils: NwtCodeComposer,
    // Injected later:
    Errors: null,
    Dialogs: null,
    Toasts: null,
    // PACK
  });

})();