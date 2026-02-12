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
      if (loaded.statics.inherits) {
        assertion(typeof loaded.statics.inherits === "object", "Required parameter «loaded.statics.inherits» to be object on «NwtLazyControl.confirmLazyComponent»");
        assertion(Array.isArray(loaded.statics.inherits), "Required parameter «loaded.statics.inherits» to be array on «NwtLazyControl.confirmLazyComponent»");
      }
    }

    static async loadBasicControls() {
      trace("NwtLazyControl.loadBasicControls");
      const basicControls = [
        ["NwtControlForStructure", "@control/for/structure"],
        ["NwtControlForList", "@control/for/list"],
        ["NwtControlForOption", "@control/for/option"],
        ["NwtControlForText", "@control/for/text"],
      ];
      Iterating_basic_controls:
      for (let index = 0; index < basicControls.length; index++) {
        const basicControl = basicControls[index];
        const [vueId, resourceId] = basicControl;
        const hasComponent = vueId in Vue.options.components;
        if (hasComponent) continue Iterating_basic_controls;
        await NwtResource.load(resourceId);
        const hasComponent2 = vueId in Vue.options.components;
        assertion(hasComponent2, `Basic control «${vueId}» could not be installed through resource «${resourceId}» on «NwtLazyFormControl.methods.ensureBasicControls»`);
      }
    }

  };

  return NwtLazyControl;

});