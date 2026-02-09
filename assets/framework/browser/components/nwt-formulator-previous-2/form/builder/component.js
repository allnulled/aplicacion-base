(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormulatorFormBuilder'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormulatorFormBuilder'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormulatorFormBuilder = class {

    static make(component, controls, value) {
      trace("NwtFormulatorFormBuilder.make");

    }

  };

  Vue.component("NwtFormulatorFormBuilder", {
    name: "NwtFormulatorFormBuilder",
    template: $template,
    props: {
      settings: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        
      };
    },
    methods: {},
    created() {
      trace("NwtFormulatorFormBuilder.created");
      NwtPrototyper.initializePropertiesOf(this.settings, {
        type: [String],
        controls: [Array, []],
      });
    },
    mounted() {},
  });
  
  return NwtFormulatorFormBuilder;

});