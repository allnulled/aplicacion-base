(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtVolatileStringShortener'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtVolatileStringShortener'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtVolatileStringShortener = class extends NwtStringShortener {

    

  };
  
  NwtVolatileStringShortener.global = NwtVolatileStringShortener.create();

  return NwtVolatileStringShortener;

});