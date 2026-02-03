(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtControlForBasicTextOneline'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtControlForBasicTextOneline'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtControlForBasicTextOneline = class {

    static createInstance(...args) {
      return new this(...args);
    }

    constructor(component) {
      assertion(typeof component === "object", "Parameter «component» must be object on «NwtControlForBasicTextOneline.constructor»");
      assertion(component instanceof Vue, "Parameter «component» must be Vue instance on «NwtControlForBasicTextOneline.constructor»");
      this.component = component;
    }

    static template = $template;

    static definition = {
      id: "basic/text/oneline",
      name: "NwtControlForBasicTextOneline",
    };

    static createSettings(_settings = {}) {
      trace("NwtControlForBasicTextOneline.createSettings");
      assertion(typeof _settings === "object", "Parameter «settings» must be object on «NwtControlForBasicTextOneline.createSettings»");
      const settings = NwtPrototyper.initializePropertiesOf(_settings, {
        initialValue: [String, ""],
        statement: [String, ""],
        placeholder: [String, ""],
        description: [String, ""],
        buttonsLeft: [Array, []],
        buttonsRight: [Array, []],
        isShowing: [Boolean, true],
        isShowingDescription: [Boolean, false],
        isValidated: [Boolean, undefined],
        onEnter: [Function, NwtUtils.noop],
        onChange: [Function, NwtUtils.noop],
        onValidate: [Function, NwtUtils.noop],
      });
      for(let index=0; index<settings.buttonsLeft.length; index++) {
        const item = settings.buttonsLeft[index];
        assertion(typeof item === "object", `Parameter «settings.buttonsLeft[${index}]» must be object, not «${typeof item}» on «NwtControlForBasicTextOneline.createSettings»`);
        assertion(typeof item.text === "string", `Parameter «settings.buttonsLeft[${index}].text» must be string, not «${typeof item}» on «NwtControlForBasicTextOneline.createSettings»`);
        assertion(typeof item.click === "function", `Parameter «settings.buttonsLeft[${index}].click» must be function, not «${typeof item}» on «NwtControlForBasicTextOneline.createSettings»`);
      }
      for(let index=0; index<settings.buttonsRight.length; index++) {
        const item = settings.buttonsRight[index];
        assertion(typeof item === "object", `Parameter «settings.buttonsRight[${index}]» must be object, not «${typeof item}» on «NwtControlForBasicTextOneline.createSettings»`);
        assertion(typeof item.text === "string", `Parameter «settings.buttonsRight[${index}].text» must be string, not «${typeof item}» on «NwtControlForBasicTextOneline.createSettings»`);
        assertion(typeof item.click === "function", `Parameter «settings.buttonsRight[${index}].click» must be function, not «${typeof item}» on «NwtControlForBasicTextOneline.createSettings»`);
      }
      return settings;
    }

    createSettings() {
      trace("NwtControlForBasicTextOneline.prototype.createSettings");
      return this.constructor.createSettings(this.component.settings);
    }

    static get view() {
      trace("NwtControlForBasicTextOneline.prototype.view");
      const ControlClass = this;
      return {
        name: ControlClass.definition.name,
        template: ControlClass.template,
        props: {
          settings: {
            type: Object,
            required: true,
          }
        },
        data: function () {
          trace("NwtControlForBasicTextOneline.data");
          const ControlInstance = ControlClass.createInstance(this);
          const settings = ControlInstance.createSettings();
          return {
            ...settings,
            self: this,
            value: settings.initialValue,
            control: {
              validators: [],
              class: ControlClass,
              instance: ControlInstance,
            },
          };
        },
        methods: {
          validate() {
            trace("NwtControlForBasicTextOneline.methods.validate");
            try {
              this.onValidate(this.value, this);
              this.onValidationSuccess(this.value, this);
            } catch (error) {
              this.onValidationError(error, this.value, this);
            }
          },
          onValidationSuccess() {
            trace("NwtControlForBasicTextOneline.methods.onValidationSuccess");
            for(let index=0; index<this.control.validators.length; index++) {
              const validator = this.control.validators[index];
              validator.clearErrors();
            }
          },
          onValidationError(error) {
            trace("NwtControlForBasicTextOneline.methods.onValidationError");
            for(let index=0; index<this.control.validators.length; index++) {
              const validator = this.control.validators[index];
              validator.addErrors(error);
            }
          },
          toggleDescription() {
            trace("NwtControlForBasicTextOneline.methods.toggleDescription");
            this.isShowingDescription = !this.isShowingDescription;
          },
          toggleSelf() {
            trace("NwtControlForBasicTextOneline.methods.toggleSelf");
            this.isShowing = !this.isShowing;
          }
        },
        watch: {
          value(newValue, oldValue) {
            trace("NwtControlForBasicTextOneline.watch.value");
            this.onChange(newValue, oldValue, this);
          }
        },
      };
    }

  };

  Vue.component(NwtControlForBasicTextOneline.definition.name, NwtControlForBasicTextOneline.view);

  return NwtControlForBasicTextOneline;

});