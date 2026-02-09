/**
 * 
 * # NwtPersister
 * 
 * API de persistencia en el sistema de ficheros.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtPersister
 * NwtFramework.Persister
 * Vue.prototype.$nwt.Persister
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * NwtPersister.json === NwtJsonPersister
 * NwtPersister.jsonl === NwtJsonlPersister
 * NwtPersister.file === NwtFilePersister
 * NwtPersister.directory === NwtDirectoryPersister
 * ```
 * 
 * Es una API conectora. Para más información, consultar las APIs contenidas.
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtPersister'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtPersister'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtPersister = class {
    
    static json = NwtJsonPersister;
    
    static jsonl = NwtJsonlPersister;

    static file = NwtFilePersister;

    static directory = NwtDirectoryPersister;

  };

  return NwtPersister;

});