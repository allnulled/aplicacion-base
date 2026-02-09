/**
 * 
 * # Nwt Toasts API
 * 
 * Está expuesta en las globales:
 * 
 * ```js
 * CommonToasts
 * NwtToasts
 * NwtFramework.Toasts
 * Vue.prototype.$nwt.Toasts
 * Vue.prototype.$toasts
 * ```
 * 
 * ## Mostrar un mensaje emergente:
 * 
 * ```js
 * CommonToasts.show({
 *   title: "Titulo",
 *   template: "<div>Aquí va HTML</div>",
 *   footer: "Pie de templateo opcional",
 *   timeout: 5000,
 * });
 * ```
 * 
 */
Vue.component("CommonToasts", {
  template: $template,
  props: {},
  data() {
    trace("CommonToasts.data");
    return {
      activeToasts: [],
    };
  },
  methods: {
    expandToastDefinition(userToastDefinition) {
      trace("CommonToasts.methods.expandToastsDefinition");
      const toastDefinition = {};
      toastDefinition.title = userToastDefinition.title;
      toastDefinition.text = userToastDefinition.text || false;
      toastDefinition.code = userToastDefinition.code || false;
      toastDefinition.footer = userToastDefinition.footer || "";
      toastDefinition.timeout = userToastDefinition.timeout || 3000;
      return toastDefinition;
    },
    validateToast(userToastDefinition) {
      trace("CommonToasts.methods.validateToast");
      const toastDefinition = this.expandToastDefinition(userToastDefinition);
      assertion(typeof toastDefinition === "object", `Parameter «toastDefinition» must be an object on «CommonToasts.prototype.validateToast»`);
      assertion(typeof toastDefinition.title === "string", `Parameter «toastDefinition.title» must be a string on «CommonToasts.prototype.validateToast»`);
      assertion((typeof toastDefinition.text === "string") || (typeof toastDefinition.code === "string"), `Parameter «toastDefinition.text» or «toastDefinition.code» must be a string on «CommonToasts.prototype.validateToast»`);
      assertion(typeof toastDefinition.footer === "string", `Parameter «toastDefinition.footer» must be a string on «CommonToasts.prototype.validateToast»`);
      assertion(typeof toastDefinition.timeout === "number", `Parameter «toastDefinition.timeout» must be a number on «CommonToasts.prototype.validateToast»`);
      setTimeout(() => {
        this.closeToast(toastDefinition);
      }, toastDefinition.timeout);
    },
    show(toastDefinition) {
      trace("CommonToasts.methods.show");
      try {
        this.validateToast(toastDefinition);
        this.activeToasts.unshift(toastDefinition);
      } catch (error) {
        this.$errors.showError(error);
      }
    },
    showError(error) {
      trace("CommonToasts.methods.showError");
      return CommonErrors.showError(error);
    },
    closeToast(toast) {
      trace("CommonToasts.methods.closeToast");
      const pos = this.activeToasts.indexOf(toast);
      this.activeToasts.splice(pos, 1);
    }
  },
  mounted() {
    trace("CommonToasts.mounted");
    NwtGlobalizer.exportTo("CommonToasts", this);
    NwtGlobalizer.exportTo("NwtToasts", this);
    Vue.prototype.$toasts = this;
  }
})