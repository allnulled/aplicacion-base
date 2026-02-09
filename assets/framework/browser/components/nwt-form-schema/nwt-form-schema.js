(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormSchema'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormSchema'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  

  
});