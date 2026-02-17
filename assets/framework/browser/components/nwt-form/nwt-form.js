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
  };

  return NwtForm;

});