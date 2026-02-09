/**
 * 
 * # NwtSourceViewer
 * 
 * Componente vue2 para renderizar plantillas vue2 en runtime.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtSourceViewer
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-source-viewer
 *   :source="codigoHtmlVue"
 *   :component-context="{ mounted:?, data:?, methods:?, ... }" # opcional
 * />
 * ```
 * 
 * Donde `codigoHtmlVue` es un String con el código de plantilla vue2 que desees.
 * 
 * Por debajo, creará un componente `AnonymousSourceViewer{RANDOMIZED-STRING}`.
 * 
 * Utilizará `component-context` para darle contexto a este componente.
 * 
 */
Vue.component("NwtSourceViewer", {
  template: $template,
  props: {
    source: {
      type: String,
      default: () => "",
    },
    componentContext: {
      type: Object,
      default: () => ({}),
    }
  },

  data() {
    trace("NwtSourceViewer.data");
    return {
      componentId: "AnonymousSourceViewer" + NwtRandomizer.fromAlphabet(10)
    };
  },

  methods: {
    registerComponent() {
      trace("NwtSourceViewer.methods.registerComponent");
      Vue.component(this.componentId, {
        name: this.componentId,
        template: `<div class="nwt_source_viewer">${ this.source }</div>`,
        ...this.componentContext,
      });
    },
    unregisterComponent() {
      trace("NwtSourceViewer.methods.unregisterComponent");
      delete Vue.options.components[this.componentId];
    }
  },

  created() {
    trace("NwtSourceViewer.created");
    this.registerComponent();
  },

  mounted() {
    trace("NwtSourceViewer.mounted");
  },

  unmounted() {
    trace("NwtSourceViewer.unmounted");
    this.unregisterComponent();
  }

});
