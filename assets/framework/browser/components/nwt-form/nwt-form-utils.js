/**
 * 
 * # NwtFormUtils
 * 
 * API de utilidades varias de un formulario.
 * 
 * Esta API se utiliza por:
 * 
 *  - La directiva de v-forms, para no poner toda la lógica dentro de la directiva, y tenerla reutilizable desde fuera
 *  - El control prototipo base, para algunas validaciones que deberían hacerse para cumplir los estándares de los Form Controls.
 * 
 * ## Exposición
 * 
 * ```js
 * NwtFormUtils
 * NwtFramework.FormUtils
 * Vue.prototype.$nwt.FormUtils
 * ```
 * 
 * ## Ventajas
 * 
 * ```js
 * // Usados por la API de Form Controls:
 * NwtFormUtils.fromControlTypeToFullpath("text/oneline");          // returns "assets/framework/browser/components/nwt-form/control-for/{tipo/subtipo}/control"
 * NwtFormUtils.validateControlButtons(componenteControlVue2);      // lanzará error si el componente no cumple con la opción de buttons
 * NwtFormUtils.validateControlPlaceholder(componenteControlVue2);  // lanzará error si el componente no cumple con la opción de placeholder
 * NwtFormUtils.validateControlExtraClasses(componenteControlVue2); // lanzará error si el componente no cumple con la opción de extraClasses
 * NwtFormUtils.validateControlValue(componenteControlVue2);        // lanzará error si el componente no cumple con la opción de value
 * NwtFormUtils.validateIsControl(componenteControlVue2);           // lanzará error si el componente no cumple con la opción de isControl
 * // Usados por la API de v-forms:
 * NwtFormUtils.from.element.to.form(htmlElement);     // se aplica cuando v-forms.form y equivale a:    NwtFormElementToForm.create(...args).initialize()
 * NwtFormUtils.from.element.to.control(htmlElement);  // se aplica cuando v-forms.control y equivale a: NwtFormElementToControl.create(...args).initialize()
 * NwtFormUtils.from.element.to.handler(htmlElement);  // se aplica cuando v-forms.handler y equivale a: NwtFormElementToHandler.create(...args).initialize()
 * ```
 * 
 */
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
      return NwtPaths.global.relative("assets/framework/browser/components/nwt-form/control-for", controlType, "control");
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

    static getComponentNameForControlType(controlSubpath, ifMissing = "nwt-form-control-for-text") {
      trace("NwtFormUtils.getComponentNameForControlType");
      if(typeof controlSubpath === "undefined") {
        return NwtVue2.fromTagToIdNotation(ifMissing);
      }
      assertion(typeof controlSubpath === "string", "Parameter «controlSubpath» must be a string on «NwtFormBuilder.methods.getComponentNameForControl»");
      return NwtVue2.fromTagToIdNotation(`nwt-form-control-for-${controlSubpath}`);
    }

  };

  return NwtFormUtils;

});