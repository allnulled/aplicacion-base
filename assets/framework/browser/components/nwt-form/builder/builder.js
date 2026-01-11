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
      if(typeof controlSubpath === "undefined") {
        return NwtVue2.fromTagToIdNotation(ifMissing);
      }
      assertion(typeof controlSubpath === "string", "Parameter «controlSubpath» must be a string on «NwtFormBuilder.methods.getComponentNameForControl»");
      return NwtVue2.fromTagToIdNotation(`nwt-form-control-for-${controlSubpath}`);
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