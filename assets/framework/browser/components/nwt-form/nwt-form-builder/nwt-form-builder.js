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

    static build(formDefinition) {
      trace("NwtFormBuilder.build");
      return NwtDialogs.open({
        title: "Formulario",
        template: `<nwt-lazy-form :definition="Object.assign(formDefinition, { dialog: this })" />`,
        factory: {
          data: {
            formDefinition,
          }
        }
      });
    }

  };

  return NwtFormBuilder;

});