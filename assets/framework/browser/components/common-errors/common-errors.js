/**
 * 
 * # Common Errors
 * 
 * Esta API no se está usando.
 * 
 * La razón es que los errores NO SE PUEDEN mostrar a través de un componente Vue, porque causa recursividad y la aplicación se bloquea.
 * 
 * La API de `NwtErrorsManager` es la encargada de gestionar los errores.
 * 
 * No se elimina todavía por si se está usando, pero debería poder eliminarse sin más problemas.
 * 
 */
Vue.component("CommonErrors", {
  name: "CommonErrors",
  template: $template,
  props: {},
  data() {
    trace("CommonErrors.data");
    return {
      manager: false,
    };
  },
  methods: {
    showError(...args) {
      trace("CommonErrors.methods.showError");
      return this.manager.showError(...args);
    },
    reload(...args) {
      trace("CommonErrors.methods.reload");
      return this.manager.reload(...args);
    },
    clearErrors(...args) {
      trace("CommonErrors.methods.clearErrors");
      return this.manager.clearErrors(...args);
    },
    clearError(...args) {
      trace("CommonErrors.methods.clearError");
      return this.manager.clearError(...args);
    }
  },
  created() {},
  async mounted() {
    trace("CommonErrors.mounted");
  },
});