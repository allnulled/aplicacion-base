(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormBuilder'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormBuilder'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormBuilder = class {

    static cachedValidSchemaTypes = false;

    static reloadValidSchemaTypes() {
      trace("NwtFormBuilder.reloadValidSchemaTypes");
      this.cachedValidSchemaTypes = Object.keys(NwtResource.definitions).filter(it => it.startsWith("control/for/")).map(it => it.replace("control/for/",""));
    }

    static get validSchemaTypes() {
      trace("NwtFormBuilder.validSchemaTypes");
      if(!this.cachedValidSchemaTypes) {
        this.reloadValidSchemaTypes();
      }
      return this.cachedValidSchemaTypes;
    }

    static localAssertion = NwtAsserter.createAssertionFunction(() => {
      trace("NwtFormBuilder.localAssertion");
      return true;
    }, error => {
      throw error;
    });

    static ask(settings) {
      trace("NwtFormBuilder.ask");
      return NwtDialogs.open({
        title: settings.title || "Formulario",
        template: `<nwt-form-builder-viewer :settings="settings" ref="form" />`,
        factory: {
          data() {
            trace("NwtFormBuilder.ask.dialog.factory.data");
            // @CAUTION: Habría que preservar si ya es una función el onSubmit, pero de momento:
            settings.onSubmit = (value) => this.accept(value);
            settings.getDialog = () => this;
            return {
              settings,
            };
          },
        }
      })
    }

  };

  return NwtFormBuilder;

});