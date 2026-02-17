(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtForm'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtForm'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtForm = {
    builder: NwtFormBuilder,
    control: NwtFormControl,
    components: {
      Builder: Vue.options.components.NwtFormBuilderViewer.options.name,
      Control: Vue.options.components.NwtFormControlViewer.options.name,
      ControlErrors: Vue.options.components.NwtFormControlErrorsViewer.options.name,
      ControlStatement: Vue.options.components.NwtFormControlStatementViewer.options.name,
    },
  };

  return NwtForm;

});