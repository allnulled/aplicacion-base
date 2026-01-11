/**
 * 
 * # Nwt Tester Viewer API / Componente Vue2
 * 
 * La Nwt Tester Viewer API permite sincronizar un widget gráfico con una instancia de `NwtTester`.
 * 
 * ## Exposición
 * 
 * La API se expone a través del componente Vue2:
 * 
 * ```js
 * Vue.options.components.NwtTesterViewer
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```html
 * <nwt-tester-viewer :tester="tester" title="Título de esta suite de tests" />
 * ```
 * 
 * Donde `tester` tiene que ser algo como:
 * 
 * ```js
 * const tester = NwtTester.global;
 * // o por ejemplo:
 * const tester = new NwtTester("Nombre del tester", async (subtest, assertion) => {
 *   assertion(true, "Aserción 1");
 *   assertion(true, "Aserción 2");
 *   assertion(true, "Aserción 3");
 *   subtest.run("Subtest 1.1", async (subtest, assertion) => {
 *     assertion(true, "Aserción 1");
 *     assertion(true, "Aserción 2");
 *     assertion(true, "Aserción 3");
 *   });
 * });
 * ```
 * 
 * 
 */
Vue.component("NwtTesterViewer", {
  template: $template,
  props: {
    title: {
      type: String,
      default: () => "",
    },
    tester: {
      type: Object,
      required: true
    }
  },

  data() {
    trace("NwtTesterViewer.data");
    return {
      
    };
  },

  methods: {
    
  },

  mounted() {
    trace("NwtTesterViewer.mounted");
    
  }

});
