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

    static utils = NwtFormulatorUtils.create(this);

    static database = NwtFormulatorDatabaseManager.create(this);

    static dialog = NwtFormulatorDialogManager.create(this);

    static control = NwtFormulatorControlManager.create(this);

    static feature = NwtFormulatorFeatureManager.create();

  };

  return NwtFormulator;

});