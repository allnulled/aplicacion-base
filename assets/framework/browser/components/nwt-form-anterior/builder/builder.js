/**
 * 
 * # NwtFormBuilder
 * 
 * Componente vue2 que construye formularios.
 * 
 * ## Exposición
 * 
 * ```js
 * Vue.options.components.NwtFormBuilder
 * ```
 * 
 * ## Ventajas
 * 
 * ```html
 * <nwt-form-builder
 *   :from="{
 *     title: "Título del formulario",
 *     footer: "Pie del formulario",
 *     controls: [{
 *       type: "text/oneline", # El {tipo/subtipo} de control que están en assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}
 *       props: {},            # Propiedades que se le pasan como parámetros. Son parámetros específicos del control en sí.
 *       listeners: {},        # Eventos que se le pasan como parámetros. Son parámetros específicos del control en sí también.
 *     },{
 *       ...
 *     }]
 *     events: {
 *       onSubmit: (data) => {},
 *       onSuccess: (data) => {},
 *       onError: (data) => {},
 *     }
 *   }"
 * />
 * ```
 * 
 * Esta API se cruza con varias APIs:
 * 
 * - `assets/framework/browser/components/nwt-form/control-prototype.js`:
 *    - este es el componente base de todos los controles de formulario (heredan de él)
 * - `assets/framework/browser/directives/v-forms.js`:
 *    - utiliza las directivas de v-forms para componer un formulario paralelo que respeta la jerarquía del DOM
 *    - ese formulario paralelo permite composición de campos, validación y envío automáticamente
 * 
 * Y luego están todos los controles que hay bajo:
 * 
 * - `assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}/control.{html,css,js}`
 *    - file-chooser/directory
 *    - file-chooser/file
 *    - file-chooser/new-file
 *    - text/oneline
 *    - text/multiline
 * 
 * En el momento de documentar esto, estos son los controles disponibles. Para estar actualizado, revisar el directorio.
 * 
 */
Vue.component("NwtFormBuilder", {
  name: "NwtFormBuilder",
  template: $template,
  props: {
    from: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    trace("NwtFormBuilder.data");
    assertion(["undefined","string"].indexOf(typeof this.from.title) !== -1, "Parameter «from.title» must be undefined or string on «NwtFormBuilder.data»");
    assertion(["undefined","string"].indexOf(typeof this.from.footer) !== -1, "Parameter «from.footer» must be undefined or string on «NwtFormBuilder.data»");
    assertion(["object"].indexOf(typeof this.from.controls) !== -1, "Parameter «from.controls» must be object on «NwtFormBuilder.data»");
    assertion(["object"].indexOf(typeof this.from.events) !== -1, "Parameter «from.events» must be object on «NwtFormBuilder.data»");
    return {
      formattedControls: [],
      title: this.from.title || undefined,
      footer: this.from.footer || undefined,
      controls: this.from.controls || [],
      events: this.from.events || {},
    };
  },
  methods: {
    loadControls() {
      this.formattedControls = this.controls.map(control => {
        control.componentId = this.getComponentNameForControl(control.type, 'nwt-form-control-for-text-oneline');
        if(!control.props) control.props = {};
        if(!control.listeners) control.listeners = {};
        if(typeof control.isOpened === "undefined") control.isOpened = false;
        return control;
      });
    },
    getComponentNameForControl(controlSubpath = undefined, ifMissing = undefined) {
      trace("NwtFormBuilder.methods.getComponentNameForControl");
      return NwtFormUtils.getComponentNameForControlType(controlSubpath, ifMissing);
    },
    toggleControlInForm(control) {
      trace("NwtFormBuilder.methods.toggleControlInForm");
      control.isOpened = !control.isOpened;
      this.$forceUpdate(true);
    },
    showControlInForm(control) {
      trace("NwtFormBuilder.methods.showControlInForm");
      control.isOpened = true;
      this.$forceUpdate(true);
    },
    toggleAllControls() {
      trace("NwtFormBuilder.methods.toggleAllControls");
      let hasOpened = false;
      Iterating_controls_1:
      for(let index=0; index<this.formattedControls.length; index++) {
        const formattedControl = this.formattedControls[index];
        if(formattedControl.isOpened) {
          hasOpened = true;
          break Iterating_controls_1;
        }
      }
      Iterating_controls_2: 
      for(let index=0; index<this.formattedControls.length; index++) {
        const formattedControl = this.formattedControls[index];
        formattedControl.isOpened = hasOpened ? false : true;
      }
      this.$forceUpdate(true);
    },
    async validateForm() {
      trace("NwtFormBuilder.methods.validateForm");
      return await this.$el.vformsForm.validate(false);
    },
    async submitForm() {
      trace("NwtFormBuilder.methods.submitForm");
      return await this.$el.vformsForm.submit(false);
    },
    async validateControl(controlIndex, control) {
      trace("NwtFormBuilder.methods.validateControl");
      assertion(typeof this.$refs.subcontrols === "object", "No controls to validate were found on «NwtFormBuilder.methods.validateControl»");
      assertion(controlIndex in this.$refs.subcontrols, `No control by index ${controlIndex} was found on «NwtFormBuilder.methods.validateControl»`);
      assertion(this.$refs.subcontrols[controlIndex] instanceof Vue, `No vue component on control by index ${controlIndex} was found on «NwtFormBuilder.methods.validateControl»`);
      assertion(this.$refs.subcontrols[controlIndex].$el instanceof HTMLElement, `No element corresponding to vue component on control by index ${controlIndex} was found on «NwtFormBuilder.methods.validateControl»`);
      if(control) {
        this.showControlInForm(control);
      }
      return await this.$refs.subcontrols[controlIndex].$el.vformsControl.validate(false, false);
    }
  },
  created() {},
  mounted() {
    this.loadControls();
  },
});