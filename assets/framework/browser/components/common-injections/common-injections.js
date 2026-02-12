/**
 * 
 * # Nwt Common Injections API
 * 
 * API para inyecciones globales. Se inyecta 1 componente global, `<common-injections />`.
 * 
 * ## Exposición
 * 
 * Esta API no se expone, solo se inyecta en el DOM.
 * 
 * Pero se hace a través del componente vue2 `CommonInjections`.
 * 
 * ## Ventajas
 * 
 * - Función 1 / `injectTouchability`
 *    - Hace que los eventos de touch (móvil) funcionen también como eventos click (PC) sin tener que cambiar el código.
 * - Función 2 / `injectKeyEventForProcessManager`
 *    - Hace que CTRL+SUPR abra un diálogo con un gestor de procesos
 * - Función 3 / `injectKeyEventForSettings`
 *    - Hace que ALT+S abra un diálogo de configuraciones globales
 * 
 * 
 */
Vue.component("CommonInjections", {
  template: $template,
  props: {},
  data() {
    return {};
  },
  methods: {

    injectTouchability() {
      const toMouse = function (e, type) {
        return new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          composed: true,
          clientX: e.touches[0] ? e.touches[0].clientX : e.changedTouches[0].clientX,
          clientY: e.touches[0] ? e.touches[0].clientY : e.changedTouches[0].clientY,
          screenX: e.touches[0] ? e.touches[0].screenX : e.changedTouches[0].screenX,
          screenY: e.touches[0] ? e.touches[0].screenY : e.changedTouches[0].screenY,
          pageX: e.touches[0] ? e.touches[0].pageX : e.changedTouches[0].pageX,
          pageY: e.touches[0] ? e.touches[0].pageY : e.changedTouches[0].pageY,
          button: 0
        });
      };
      const fire = function (type, e) {
        const evt = toMouse(e, type);
        e.target.dispatchEvent(evt);
      };
      document.addEventListener("touchstart", e => fire("mousedown", e));
      document.addEventListener("touchmove", e => fire("mousemove", e));
      document.addEventListener("touchend", e => fire("mouseup", e));
    },

    injectKeyEventForProcessManager() {
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "Delete") {
          e.preventDefault();
          this.$dialogs.open({
            title: "Procesos activos",
            template: `<nwt-process-manager-viewer />`,
            deepness: 1000,
          });
        }
      });
    },

    injectKeyEventForSettings() {
      document.addEventListener("keydown", (e) => {
        if (e.altKey && e.key === "l") {
          this.$dialogs.open({
            title: "Configuraciones globales",
            template: `<nwt-settings-viewer :settings="$nwt.Settings.global" :dialog="this" />`,
            deepness: 1000,
          });
        }
      });
    },

  },
  watch: {},
  async mounted() {
    this.injectTouchability();
    this.injectKeyEventForProcessManager();
    this.injectKeyEventForSettings();
  }
});