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

    Object.assign(NwtFramework, {
      Abort: NwtAbort,
      Accessor: NwtAccessor,
      Argumenter: NwtArgumenter,
      ArrayUtils: NwtArrayUtils,
      Asserter: NwtAsserter,
      AstTreeClass: NwtAstTreeClass,
      AstTreeTemplateSource: NwtAstTreeTemplateSource,
      BrowserPolyfill: NwtBrowserPolyfill,
      CacheDirectory: NwtCacheDirectory,
      Chatgpt: NwtChatgpt,
      Clipboard: NwtClipboard,
      CodeComposer: NwtCodeComposer,
      CollectionUtils: NwtCollectionUtils,
      Command: NwtCommand,
      CommandContextInterface: NwtCommandContextInterface,
      CommandFormInterface: NwtCommandFormInterface,
      CommandsManager: NwtCommandsManager,
      CommandSynchronizer: NwtCommandSynchronizer,
      CommandViewInterface: NwtCommandViewInterface,
      Constrainer: NwtConstrainer,
      Csv: NwtCsv,
      Debug: NwtDebug,
      DialogDefinition: NwtDialogDefinition,
      // Dialogs: NwtDialogs,
      DirectoryPersister: NwtDirectoryPersister,
      Dom: NwtDom,
      DomAutomator: NwtDomAutomator,
      Environment: NwtEnvironment,
      Errors: NwtErrors,
      ErrorsManager: NwtErrorsManager,
      ErrorUtils: NwtErrorUtils,
      Events: NwtEvents,
      EventsManager: NwtEventsManager,
      Exporter: NwtExporter,
      FileChooser: NwtFileChooser,
      FilePersister: NwtFilePersister,
      Filesystem: NwtFilesystem,
      Filetree: NwtFiletree,
      FiletreeDirectory: NwtFiletreeDirectory,
      FiletreeFile: NwtFiletreeFile,
      FiletreeGlob: NwtFiletreeGlob,
      FiletreeJson: NwtFiletreeJson,
      FiletreeNode: NwtFiletreeNode,
      FiletreeProperty: NwtFiletreeProperty,
      FiletreeSelector: NwtFiletreeSelector,
      FiletreeSelectorInterpreter: NwtFiletreeSelectorInterpreter,
      FiletreeSelectorParser: NwtFiletreeSelectorParser,
      Globalizer: NwtGlobalizer,
      Importer: NwtImporter,
      Interruptible: NwtInterruptible,
      Interruption: NwtInterruption,
      InterruptionHandler: NwtInterruptionHandler,
      IterableClass: NwtIterableClass,
      IterableCommandClass: NwtIterableCommandClass,
      IterableFunction: NwtIterableFunction,
      JsController: NwtJsController,
      JsonlPersister: NwtJsonlPersister,
      JsonPersister: NwtJsonPersister,
      JsonStorer: NwtJsonStorer,
      JsReturnController: NwtJsReturnController,
      JsThrowController: NwtJsThrowController,
      LazyLoader: NwtLazyLoader,
      LiveInjector: NwtLiveInjector,
      ModuleManager: NwtModuleManager,
      ObjectUtils: NwtObjectUtils,
      Paths: NwtPaths,
      Persister: NwtPersister,
      ProcedureDefinition: NwtProcedureDefinition,
      ProcedureInjections: NwtProcedureInjections,
      ProcedureSeed: NwtProcedureSeed,
      ProceduresManager: NwtProceduresManager,
      Process: NwtProcess,
      ProcessManager: NwtProcessManager,
      ProgressBar: NwtProgressBar,
      PromptsManager: NwtPromptsManager,
      Prototyper: NwtPrototyper,
      ProxyChain: NwtProxyChain,
      Randomizer: NwtRandomizer,
      Resource: NwtResource,
      ResourceApi: NwtResourceApi,
      ResourceApiNexer: NwtResourceApiNexer,
      Settings: NwtSettings,
      Shell: NwtShell,
      Strings: NwtStrings,
      StringShortener: NwtStringShortener,
      Templates: NwtTemplates,
      Tester: NwtTester,
      Timer: NwtTimer,
      // Toasts: NwtToasts,
      Tracer: NwtTracer,
      Utils: NwtUtils,
      ValidableSchema: NwtValidableSchema,
      ValidationContext: NwtValidationContext,
      ValidationContextPointer: NwtValidationContextPointer,
      Validator: NwtValidator,
      Vue2: NwtVue2,
    });

  });

  return "NwtFramework global variable will be packed at window.app-mounted";

})();