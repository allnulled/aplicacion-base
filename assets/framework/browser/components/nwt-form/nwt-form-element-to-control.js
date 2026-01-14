/**
 * 
 * # NwtFormElementToControl
 * 
 * API de los elementos que usan la directiva `v-forms.control`.
 * 
 * Hereda de `NwtFormElementToAny`.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFormElementToControl
 * NwtFramework.FormElementToControl
 * Vue.prototype.$nwt.FormElementToControl
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Métodos sobreescritos de padre:
 * NwtFormElementToControl.prototype.initialize()
 * NwtFormElementToControl.prototype.getValue()
 * NwtFormElementToControl.prototype.validate(notify = false, mustThrow = true)
 * NwtFormElementToControl.prototype.propagateSuccess()
 * NwtFormElementToControl.prototype.propagateErrors(errors)
 * // Métodos propios:
 * NwtFormElementToControl.prototype.getName()
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormElementToControl'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormElementToControl'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormElementToControl = class extends NwtFormElementToAny {

    constructor(...args) {
      super(...args);
      trace("NwtFormElementToControl.prototype.constructor");
      const [element, value, virtualNode] = args;
      assertion(typeof value.name === "string", "Parameter «value.name» must be string on «NwtFormElementToControl.constructor»");
    }

    initialize() {
      trace("NwtFormElementToControl.prototype.initialize");
      assertion(typeof this.element.__vue__ === "object", "Parameter «element» must match a vue component element on «NwtFormElementToHandler.prototype.initialize»");
      assertion(typeof this.element.__vue__.isControl === "string", "Parameter «element» must match a vue component element that is a «NwtFormControlFor~» instance on «NwtFormElementToHandler.prototype.initialize»");
      this.component = this.element.__vue__;
      NwtVue2.cross.expose.by.element(this.element, this, "vformsControl");
      return this;
    }

    getName() {
      trace("NwtFormElementToControl.prototype.getName");
      return this.value.name;
    }

    getValue() {
      trace("NwtFormElementToControl.prototype.getValue");
      const componentId = this.element.__vue__.$options._componentTag;
      const tagId = NwtVue2.fromIdToTagNotation(this.element.__vue__.$options._componentTag);
      assertion("__vue__" in this.element, `Property «element» must match HTMLElement containing vue2 component on «NwtFormElementToControl.prototype.getValue»`);
      assertion("getValue" in this.element.__vue__, `Property «element.__vue__» instance of «<${tagId}>» must implement «getValue» on «NwtFormElementToControl.prototype.getValue»`);
      assertion(typeof this.element.__vue__.getValue === "function", `Property «element.__vue__» instance of «<${tagId}>» must implement function «getValue» on «NwtFormElementToControl.prototype.getValue»`);
      return this.element.__vue__.getValue();
    }

    validate(notify = false, mustThrow = true) {
      trace("NwtFormElementToControl.prototype.validate");
      let value = this.getValue();
      const validationErrors = [];
      const scopedAssertion = NwtAsserter.createAssertionFunction(() => {}, error => {
        console.error(error);
        throw error
      });
      On_valite_by_component: {
        // BINDING CON NWT-FORM-CONTROL-PROTOTYPE:
        if(this.component.onValidate) {
          try {
            this.component.onValidate(value, scopedAssertion);
          } catch (error) {
            validationErrors.push(error);
          }
        }
      }
      On_validate_by_directive: {
        if(this.value.onValidate) {
          try {
            this.value.onValidate(value, scopedAssertion);
          } catch (error) {
            validationErrors.push(error);
          }
        }
      }
      if(validationErrors.length) {
        if(notify) {
          validationErrors.forEach(error => NwtToasts.showError(error));
        }
        this.propagateErrors(validationErrors);
        if(mustThrow) {
          throw new Error(NwtErrorUtils.unifyMessages(validationErrors));
        }
      } else {
        if(notify) {
          const controlName = this.getName();
          NwtToasts.show({
            title: `Control «${controlName}» validado`,
            text: `El control para «${controlName}» fue validado correctamente`,
          });
        }
        this.propagateSuccess();
      }
      return value;
    }

    propagateSuccess() {
      trace("NwtFormElementToControl.prototype.propagateSuccess");
      Clean_control_errors: {
        this.component.validationErrors = [];
      }
      Clean_handler_errors: {
        const subhandler = this.element.querySelector("[data-vforms-handler]");
        if(subhandler) {
          subhandler.vformsHandler.setErrors([]);
        }
      }
    }

    propagateErrors(errors) {
      trace("NwtFormElementToControl.prototype.propagateErrors");
      Update_control_errors: {
        this.component.validationErrors = errors;
      }
      Update_handler_errors: {
        const subhandler = this.element.querySelector("[data-vforms-handler]");
        if(subhandler) {
          subhandler.vformsHandler.setErrors(errors);
        }
      }
    }

  };

  return NwtFormElementToControl;

});