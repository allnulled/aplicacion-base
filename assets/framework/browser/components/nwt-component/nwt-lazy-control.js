(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLazyControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLazyControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLazyControl = class extends NwtLazyComponent {

    async confirmLazyComponent(loaded = this.loaded) {
      trace("NwtLazyControl.prototype.confirmLazyComponent");
      super.confirmLazyComponent(loaded);
      assertion(typeof loaded === "object", "Required parameter «loaded» to be object on «NwtLazyControl.confirmLazyComponent»");
      assertion(typeof loaded.name === "string", "Required parameter «loaded.name» to be string on «NwtLazyControl.confirmLazyComponent»");
      assertion(typeof loaded.template === "string", "Required parameter «loaded.template» to be string on «NwtLazyControl.confirmLazyComponent»");
      assertion(typeof loaded.statics === "object", "Required parameter «loaded.statics» to be object on «NwtLazyControl.confirmLazyComponent»");
      if(loaded.statics.inherits) {
        assertion(typeof loaded.statics.inherits === "object", "Required parameter «loaded.statics.inherits» to be object on «NwtLazyControl.confirmLazyComponent»");
        assertion(Array.isArray(loaded.statics.inherits), "Required parameter «loaded.statics.inherits» to be array on «NwtLazyControl.confirmLazyComponent»");
      }
    }

  };

  return NwtLazyControl;

});