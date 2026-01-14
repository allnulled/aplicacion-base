/**
 * 
 * # NwtFormControlHandler
 * 
 * Componente para mostrar errores de validación de un Form Control.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFormControlHandler
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-form-control-handler :control="controlComponent" />
 * ```
 * 
 * Donde `controlComponent` tiene que ser el componente de tipo Form Control.
 * 
 * Mientras el control cumpla con los estándares, no habrá problema. Solo se accede a:
 * 
 * - `control.validationErrors`
 * 
 * Este componente **SÍ LLEVA INCRUSTADA** la directiva de v-forms.handler.
 * 
 * La razón teórica (no sé si está bien implementado todavía) es que:
 * 
 *   - Solo mostrará los errores de validación que se acumulen en el control proporcionado
 *   - Si el control proporcionado no usa v-forms.control, no acumula errores
 *   - Si el control proporcionado sí usa v-forms.control, sí acumula errores, entonces sí mostrará errores.
 * 
 */
Vue.component("NwtFormControlHandler", {
  name: "NwtFormControlHandler",
  template: $template,
  props: {
    control: {
      type: Vue,
      required: true,
    }
  },
  mixins: [],
  data() {
    trace("NwtFormControlHandler.data");
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
});