/**
 * 
 * # Nwt Process Manager Viewer API / Componente Vue2
 * 
 * La Nwt Process Manager Viewer API permite sincronizar un widget gráfico con una instancia de `NwtProcessManager`.
 * 
 * ## Exposición
 * 
 * La API se expone a través del componente Vue2:
 * 
 * ```js
 * Vue.options.components.NwtProcessManagerViewer
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite cosas como:
 * 
 * ```html
 * <nwt-process-manager-viewer :process-manager="processManager" />
 * ```
 * 
 * Donde `processManager` tiene que ser una instancia de `NwtProcessManager`.
 * 
 * Hay 2 gestores de procesos principales:
 * 
 * ```js
 * NwtProcessManager.dialogs instanceof NwtProcessManager
 * NwtProcessManager.boxes instanceof NwtProcessManager
 * ```
 * 
 * 
 */
Vue.component("NwtProcessManagerViewer", {
  template: $template,
  props: {
    processManager: {
      type: Object,
      default: () => {
        return NwtProcessManager.dialogs;
      }
    }
  },

  data() {
    trace("NwtProcessManagerViewer.data");
    return {
      isLoaded: false,
      progressBar: NwtProgressBar.create({ total: 10 }),
    };
  },

  methods: {
    reload() {
      trace("NwtProcessManagerViewer.methods.reload");
      this.isLoaded = false;
      this.$forceUpdate(true);
      setTimeout(() => {
        this.isLoaded = true;
      }, 0);
    },
    toggleProcess(currentProcess) {
      trace("NwtProcessManagerViewer.methods.toggleProcess");
      if(currentProcess.$isHidden) {
        currentProcess.show();
      } else {
        currentProcess.hide();
      }
    }
  },

  mounted() {
    trace("NwtProcessManagerViewer.mounted");
    this.isLoaded = true;
  }

});
