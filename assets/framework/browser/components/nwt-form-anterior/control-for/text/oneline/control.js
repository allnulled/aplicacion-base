/**
 * 
 * # NwtFormControlForTextOneline
 * 
 * Componente de control de formulario para textos de una sola línea.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFormControlForTextOneline
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-form-control-for-text-oneline
 *   :buttons="[{text:'texto de boton',click:() => {}}]"
 *   extraClases="clase1 clase2"
 *   placeholder="Texto de relleno"
 *   v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
 * />
 * ```
 * 
 */
Vue.component("NwtFormControlForTextOneline", {
  name: "NwtFormControlForTextOneline",
  extends: Vue.options.components.NwtFormControlPrototype.options,
  template: $template,
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    extraClasses: {
      type: [String],
      default: () => "",
    },
    placeholder: {
      type: String,
      default: () => "",
    },
  },
  data() {
    trace("NwtFormControlForTextOneline.data");
    return {
      isControl: "text/oneline",
    };
  },
  methods: {
    
  },
  created() {
    trace("NwtFormControlForTextOneline.created");
    NwtFormUtils.validate.control.isControl(this);
    NwtFormUtils.validate.control.buttons(this);
    NwtFormUtils.validate.control.extraClasses(this);
    NwtFormUtils.validate.control.placeholder(this);
    NwtFormUtils.validate.control.value(this);
  },
  mounted() {},
});