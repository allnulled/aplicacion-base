/**
 * 
 * # NwtFormElementToHandler
 * 
 * API de los elementos que usan la directiva `v-forms.handler`.
 * 
 * Hereda de `NwtFormElementToAny`.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFormElementToHandler
 * NwtFramework.FormElementToHandler
 * Vue.prototype.$nwt.FormElementToHandler
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Métodos sobreescritos de padre:
 * NwtFormElementToForm.prototype.initialize()
 * NwtFormElementToForm.prototype.setErrors(errors)
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormElementToHandler'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormElementToHandler'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormElementToHandler = class extends NwtFormElementToAny {

    initialize() {
      trace("NwtFormElementToHandler.prototype.initialize");
      NwtVue2.cross.expose.by.element(this.element, this, "vformsHandler");
      assertion(typeof this.value === "object", "Parameter «handler» must be object on «NwtFormElementToHandler.prototype.initialize»");
      assertion(typeof this.value.component === "object", "Parameter «handler.component» must be object on «NwtFormElementToHandler.prototype.initialize»");
      assertion(this.value.component instanceof Vue, "Parameter «handler.component» must be instance of Vue on «NwtFormElementToHandler.prototype.initialize»");
      assertion(typeof this.value.component.isControl === "string", "Parameter «handler.component» must be a «NwtFormControlFor~» instance (error:1) on «NwtFormElementToHandler.prototype.initialize»");
      assertion(typeof this.value.component.validationErrors === "object", "Parameter «handler.component» must be a «NwtFormControlFor~» instance (error:2) on «NwtFormElementToHandler.prototype.initialize»");
      this.component = this.value.component;
      return this;
    }

    setErrors(errors) {
      trace("NwtFormElementToHandler.prototype.setErrors");
      this.value.component.validationErrors = errors;
    }

    getValue() {
      trace("NwtFormElementToHandler.prototype.getValue");
      throw new Error(`Method «getValue» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToHandler.prototype.getValue»`);
    }

    validate() {
      trace("NwtFormElementToHandler.prototype.validate");
      throw new Error(`Method «validate» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToHandler»`);
    }

    propagateSuccess() {
      trace("NwtFormElementToHandler.prototype.propagateSuccess");
      throw new Error(`Method «propagateSuccess» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToHandler»`);
    }

    propagateErrors(error) {
      trace("NwtFormElementToHandler.prototype.propagateErrors");
      throw new Error(`Method «propagateErrors» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToHandler»`);
    }

    submit() {
      trace("NwtFormElementToHandler.prototype.submit");
      throw new Error(`Method «submit» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToHandler»`);
    }

  };

  return NwtFormElementToHandler;

});