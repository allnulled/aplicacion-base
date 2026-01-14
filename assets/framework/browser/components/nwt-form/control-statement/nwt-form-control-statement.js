/**
 * 
 * # NwtFormControlStatement
 * 
 * Componente para mostrar anunciados de control homogéneos.
 * 
 * Uso interno de las plantillas de los Form Controls.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFormControlStatement
 * NwtFramework.FormControlStatement
 * Vue.prototype.$nwt.FormControlStatement
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-form-control-statement
 *   :control="controlComponent"
 * />
 * ```
 * 
 * Donde `controlComponent` tiene que ser el componente de tipo Form Control.
 * 
 * Mientras el control cumpla con los estándares, no habrá problema. Solo se accede a:
 * 
 * - `control.statement`
 * - `control.extraInfo`
 * 
 * 
 */
Vue.component("NwtFormControlStatement", {
  name: "NwtFormControlStatement",
  template: $template,
  props: {
    control: {
      type: Vue,
      required: true,
    }
  },
  mixins: [],
  data() {
    trace("NWtFormControlStatement.data");
    return {};
  },
  methods: {
    validateControl() {
      trace("NwtFormControlStatement.methods.validateControl");
      if(this.control.vformsControl) {
        return this.control.vformsControl.validate(false, false);
      } else {
        return this.control.validate();
      }
    }
  },
  created() {},
  mounted() {},
});