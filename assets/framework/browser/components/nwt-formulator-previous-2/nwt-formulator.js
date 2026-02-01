(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulator'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulator'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulator = class {

    static feature = {
      loader: NwtFormulatorLazyFeature,
      mixer: NwtFormulatorFeatureMixer,
    };

    static control = {
      loader: NwtFormulatorLazyControl,
    };

    static form = {
      builder: NwtFormulatorFormBuilder
    };

  };

  return NwtFormulator;

});