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