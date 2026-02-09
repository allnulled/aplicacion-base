/**
 * 
 * # NwtFormControlForGroupList
 * 
 * Componente de control de formulario para listas de controles.
 * 
 * Con este control, puedes agrupar listas de controles en 1 mismo control.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFormControlForGroupList
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-form-control-for-list
 *   statement="Enunciado para lista de controles"
 *   :controls="[{
 *     type: 'text/oneline',
 *     props: {
 *       initialValue: 'No sabe/No contesta',
 *     },
 *     listeners: {}
 *   },{
 *     type: 'text/oneline',
 *     props: {
 *       initialValue: 'No sabe/No contesta',
 *     },
 *     listeners: {}
 *   }]"
 *   v-forms.control="{}" # Esto solo si lo estás usando en un formulario que tiene v-forms.form
 * />
 * ```
 * 
 */
Vue.component("NwtFormControlForGroupList", {
  name: "NwtFormControlForGroupList",
  extends: Vue.options.components.NwtFormControlPrototype.options,
  template: $template,
  props: {
    controls: {
      type: Array,
      required: true,
    },
  },
  mixins: [],
  data() {
    trace("NwtFormControlForGroupList.data");
    return {
      isControl: "list",
      itemsOfList: false,
    };
  },
  methods: {
    getValue() {
      trace("NwtFormControlForGroupList.methods.getValue");
      if(!this.$refs.subcontrols) return [];
      const subcontrols = this.$refs.subcontrols;
      return subcontrols.map(control => control.getValue());
    },
    addComponentIdToControls() {
      trace("NwtFormControlForGroupList.methods.addComponentIdToControls");
      for(let index=0; index<this.controls.length; index++) {
        const controlObject = this.controls[index];
        controlObject.componentId = NwtFormUtils.getComponentNameForControlType(controlObject.type);
      }
    }
  },
  created() {
    trace("NwtFormControlForGroupList.created");
    NwtFormUtils.validate.control.isControl(this);
    NwtFormUtils.validate.control.value(this);
  },
  mounted() {
    trace("NwtFormControlForGroupList.mounted");
    this.addComponentIdToControls();
    this.itemsOfList = [];
  },
});