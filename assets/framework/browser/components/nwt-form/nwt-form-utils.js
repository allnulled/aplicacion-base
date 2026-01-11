(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormUtils'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormUtils'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFormUtils = class {

    static fromControlTypeToFullpath(controlType) {
      trace("NwtVue2.fromControlTypeToFullpath");
      return NwtPaths.global.relative("assets/framework/nwt-form/control-for", controlType, "control");
    }

    static validateControlButtons(component) {
      trace("NwtFormUtils.validateControlButtons");
      assertion(component instanceof Vue, "Parameter «component» must be instance of Vue on «NwtFormUtils.validateControlButtons»");
      assertion(Array.isArray(component.buttons), "Parameter «buttons» must be array on «NwtFormUtils.validateControlButtons»");
      for(let index=0; index<component.buttons.length; index++) {
        const button = component.buttons[index];
        assertion(typeof button.text === "string", `Parameter «component.buttons[${index}].text» must be string on «NwtFormUtils.validateControlButtons»`);
        assertion(typeof button.click === "function", `Parameter «component.buttons[${index}].click» must be function on «NwtFormUtils.validateControlButtons»`);
      }
    }
    static validateControlPlaceholder(component) {
      trace("NwtFormUtils.validateControlPlaceholder");
      assertion(component instanceof Vue, "Parameter «component» must be instance of Vue on «NwtFormUtils.validateControlPlaceholder»");
      assertion(typeof component.placeholder === "string", "Parameter «component.placeholder» must be string on «NwtFormUtils.validateControlPlaceholder»");
    }
    static validateControlExtraClasses(component) {
      trace("NwtFormUtils.validateControlExtraClasses");
      assertion(component instanceof Vue, "Parameter «component» must be instance of Vue on «NwtFormUtils.validateControlExtraClasses»");
      assertion(typeof component.extraClasses === "string", "Parameter «component.extraClasses» must be string on «NwtFormUtils.validateControlExtraClasses");
    }
    static validateControlValue(component) {
      trace("NwtFormUtils.validateControlValue");
      assertion(component instanceof Vue, "Parameter «component» must be instance of Vue on «NwtFormUtils.validateControlValue»");
      assertion(typeof component.value === "string", "Parameter «component.value» must be string on «NwtFormUtils.validateControlValue»");
    }
    static validateIsControl(component) {
      trace("NwtFormUtils.validateIsControl");
      assertion(component instanceof Vue, "Parameter «component» must be instance of Vue on «NwtFormUtils.validateIsControl»");
      assertion(typeof component.isControl === "string", "Parameter «component.isControl» must be string on «NwtFormUtils.validateIsControl»");
    }

    static validate = {
      control: {
        isControl: (...args) => this.validateIsControl(...args),
        buttons: (...args) => this.validateControlButtons(...args),
        placeholder: (...args) => this.validateControlPlaceholder(...args),
        extraClasses: (...args) => this.validateControlExtraClasses(...args),
        value: (...args) => this.validateControlValue(...args),
      }
    };

    static from = {
      element: {
        to: {
          form: (...args) => NwtFormElementToForm.create(...args).initialize(),
          control: (...args) => NwtFormElementToControl.create(...args).initialize(),
          handler: (...args) => NwtFormElementToHandler.create(...args).initialize(),
        }
      }
    };

  };

  return NwtFormUtils;

});