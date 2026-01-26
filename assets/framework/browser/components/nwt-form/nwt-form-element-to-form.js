/**
 * 
 * # NwtFormElementToForm
 * 
 * API de los elementos que usan la directiva `v-forms.form`.
 * 
 * Hereda de `NwtFormElementToAny`.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFormElementToForm
 * NwtFramework.FormElementToForm
 * Vue.prototype.$nwt.FormElementToForm
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Métodos sobreescritos de padre:
 * NwtFormElementToForm.prototype.initialize()
 * NwtFormElementToForm.prototype.getValue()
 * NwtFormElementToForm.prototype.validate(notify = false, mustThrow = true)
 * NwtFormElementToForm.prototype.submit()
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormElementToForm'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormElementToForm'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtFormElementToForm = class extends NwtFormElementToAny {

    constructor(...args) {
      super(...args);
      trace("NwtFormElementToForm.prototype.constructor");
      const [element, value, virtualNode] = args;
      assertion(typeof value.onSubmit === "function", "Parameter «onSubmit» must be function on «NwtFormElementToForm.constructor»");
      // @OK. Es lo más básico para un form: que tenga `onSubmit:Function`.
    }

    initialize() {
      trace("NwtFormElementToForm.prototype.initialize");
      NwtVue2.cross.expose.by.element(this.element, this, "vformsForm");
      return this;
    }

    getValue() {
      trace("NwtFormElementToForm.prototype.getValue");
      const controls = NwtDom.find.first.children.where(this.element, "[data-vforms-control]");
      const formValue = {};
      for (let index = 0; index < controls.length; index++) {
        const control = controls[index];
        formValue[control.vformsControl.getName()] = control.vformsControl.getValue();
      }
      return formValue;
    }

    async validate(notify = false) {
      trace("NwtFormElementToForm.prototype.validate");
      const controls = NwtDom.find.first.children.where(this.element, "[data-vforms-control]");
      const formValue = {};
      const validationErrors = [];
      for (let index = 0; index < controls.length; index++) {
        const control = controls[index];
        try {
          const value = await control.vformsControl.validate();
          formValue[control.vformsControl.getName()] = value;
        } catch (error) {
          validationErrors.push(error);
        }
      }
      if (validationErrors.length) {
        if (notify) {
          NwtToasts.showError(new Error(NwtErrorUtils.unifyMessages(validationErrors)));
        }
        return {
          isValid: false,
          errors: validationErrors,
        };
      } else {
        if (notify) {
          NwtToasts.show({
            title: "Formulario validado",
            text: "El formulario está cumplimentado válidamente",
          });
        }
        return {
          isValid: true,
          output: formValue,
        };
      }
    }

    async submit(notify = false) {
      trace("NwtFormElementToForm.prototype.submit");
      const validation = await this.validate();
      if (validation.isValid) {
        await this.value.onSubmit(validation.output);
        if (notify) {
          NwtToasts.show({
            title: "Formulario gestionado correctamente",
            text: "El formulario fue gestionado correctamente",
          });
        }
        if (typeof this.value.onSuccess === "function") {
          await this.value.onSuccess(validation.output);
        }
      } else {
        if (notify) {
          NwtToasts.showError(new Error(NwtErrorUtils.unifyMessages(validation.errors)));
        }
        if (typeof this.value.onError === "function") {
          await this.value.onError(validation.errors);
        }
      }
    }

  };

  return NwtFormElementToForm;

});