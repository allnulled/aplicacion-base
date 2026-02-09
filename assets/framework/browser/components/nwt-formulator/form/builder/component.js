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

  };

  Vue.component("NwtFormBuilder", {
    name: "NwtFormBuilder",
    template: $template,
    props: {},
    data() {
      return {};
    },
    methods: {},
  });

  return NwtFormBuilder;

});