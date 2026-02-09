/**
 * 
 * # NwtFormControlForGroupStructure
 * 
 * Componente de control de formulario para estructuras de controles.
 * 
 * Con este control, puedes agrupar controles con etiqueta en 1 mismo control.
 * 
 * Es como listas, pero no es incrementable, es solo un grupo, donde a cada control le corresponde una etiqueta diferente.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFormControlForGroupStructure
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-form-control-for-structure
 *   statement="Enunciado para estructure de controles"
 *   :controls="{
 *     'campo 1': {
 *       type: 'text/oneline',
 *       props: {
 *         initialValue: 'No sabe/No contesta',
 *       },
 *       listeners: {}
 *     },
 *     'campo 2': {
 *       type: 'text/oneline',
 *       props: {
 *         initialValue: 'No sabe/No contesta',
 *       },
 *       listeners: {}
 *     }
 *   }"
 *   v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
 * />
 * ```
 * 
 */
Vue.component("NwtFormControlForGroupStructure", {
  name: "NwtFormControlForGroupStructure",
  extends: Vue.options.components.NwtFormControlPrototype.options,
  template: $template,
  props: {
    controls: {
      type: Object,
      required: true,
    },
  },
  mixins: [],
  data() {
    trace("NwtFormControlForGroupStructure.data");
    return {
      isControl: "structure",
      isLoaded: false,
    };
  },
  methods: {
    getValue() {
      trace("NwtFormControlForGroupStructure.methods.getValue");
      const value = {};
      const controlIds = Object.keys(this.controls);
      for(let index=0; index<controlIds.length; index++) {
        const controlId = controlIds[index];
        const subcontrolList = this.$refs["subcontrol_" + controlId];
        const subcontrol = subcontrolList[0];
        value[controlId] = subcontrol.getValue();
      }
      return value;
    },
    addComponentIdToControls() {
      trace("NwtFormControlForGroupStructure.methods.addComponentIdToControls");
      const controlIds = Object.keys(this.controls);
      for(let index=0; index<controlIds.length; index++) {
        const controlId = controlIds[index];
        const controlObject = this.controls[controlId];
        controlObject.componentId = NwtFormUtils.getComponentNameForControlType(controlObject.type);
      }
    }
  },
  created() {
    trace("NwtFormControlForGroupStructure.created");
    NwtFormUtils.validate.control.isControl(this);
    NwtFormUtils.validate.control.value(this);
  },
  mounted() {
    trace("NwtFormControlForGroupStructure.mounted");
    this.addComponentIdToControls();
    this.isLoaded = true;
  },
});