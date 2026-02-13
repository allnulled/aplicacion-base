(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtEvents'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtEvents'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtEvents = class {

    static manager = NwtEventsManager;

  };

  return NwtEvents;

});