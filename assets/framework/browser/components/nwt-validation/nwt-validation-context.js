(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtValidationContext'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtValidationContext'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtValidationContext = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultBase = {
      value: undefined,
      valuePointer: undefined,
      schemaPointer: undefined,
      componentId: undefined,
      component: undefined,
      errors: undefined,
    };

    constructor(base = {}) {
      trace("NwtValidationContext.constructor");
      NwtPrototyper.initializePropertiesOf(this, [this.constructor.defaultBase, base], {
        value: [NwtPrototyper.type.AnyExcept(null, undefined)],
        valuePointer: [[NwtValidationContextPointer], NwtValidationContextPointer.create()],
        schema: [[NwtValidableSchema], null],
        schemaPointer: [[NwtValidationContextPointer], NwtValidationContextPointer.create()],
        componentId: [[String]],
        component: [[Vue, null, undefined]],
        errors: [[NwtConstrainer.MultipleConstraintErrors], NwtConstrainer.MultipleConstraintErrors.create()],
      });
    }

    getPointedValue() {
      trace("NwtValidationContext.prototype.getPointerValue");
      let output = this.value;
      for(let indexPointer=0; indexPointer<this.valuePointer.length; indexPointer++) {
        const pointerItem = this.valuePointer[indexPointer];
        output = output[pointerItem];
      }
      return output;
    }

    getComponentDefinition() {
      trace("NwtValidationContext.prototype.getComponentDefinition");
      return NwtLazyComponent.create(this.componentId).load();
    }

    clone() {
      trace("NwtValidationContext.prototype.clone");
      const overridings = {
        // only new pointers with same values:
        valuePointer: this.valuePointer.clone(),
        schemaPointer: this.schemaPointer.clone(),
      };
      const cloned = Object.assign({}, this, overridings);
      return this.constructor.create(cloned);
    }

    appendToValuePointer(pointerId) {
      trace("NwtValidationContext.prototype.appendToValuePointer");
      this.valuePointer.add(pointerId);
      return this;
    }

  };

  return NwtValidationContext;

});