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
      component: undefined,
      componentPointer: undefined,
      errors: undefined,
    };

    constructor(base = {}) {
      trace("NwtValidationContext.constructor");
      NwtPrototyper.initializePropertiesOf(this, [this.constructor.defaultBase, base], {
        value: [NwtPrototyper.type.AnyExcept(null, undefined)],
        valuePointer: [[NwtValidationContextPointer], NwtValidationContextPointer.create()],
        component: [[Vue, Object], {}],
        componentPointer: [[NwtValidationContextPointer], NwtValidationContextPointer.create()],
        errors: [[NwtConstrainer.MultipleConstraintErrors], NwtConstrainer.MultipleConstraintErrors.create()],
      });
    }

    getPointedValue() {
      trace("NwtValidationContext.prototype.getPointedValue");
      let output = this.value;
      for(let indexPointer=0; indexPointer<this.valuePointer.length; indexPointer++) {
        const pointerItem = this.valuePointer[indexPointer];
        output = output[pointerItem];
      }
      return output;
    }

    getPointedValueIndex(joiner = "/") {
      return this.valuePointer.indexes.join(joiner);
    }

    getPointedComponent() {
      trace("NwtValidationContext.prototype.getPointedComponent");
      let output = this.component;
      for(let indexPointer=0; indexPointer<this.componentPointer.length; indexPointer++) {
        const pointerItem = this.componentPointer[indexPointer];
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
        componentPointer: this.componentPointer.clone(),
      };
      const cloned = Object.assign({}, this, overridings);
      return this.constructor.create(cloned);
    }

    appendItemToValuePointer(pointerId) {
      trace("NwtValidationContext.prototype.appendItemToValuePointer");
      this.valuePointer.add(pointerId);
      return this;
    }

    appendToValuePointer(...pointerIds) {
      trace("NwtValidationContext.prototype.appendItemToValuePointer");
      for(let index=0; index<pointerIds.length; index++) {
        const pointerId = pointerIds[index];
        this.valuePointer.add(pointerId);
      }
      return this;
    }

    appendItemToComponentPointer(pointerId) {
      trace("NwtValidationContext.prototype.appendItemToComponentPointer");
      this.componentPointer.add(pointerId);
      return this;
    }

    appendToComponentPointer(...pointerIds) {
      trace("NwtValidationContext.prototype.appendItemToComponentPointer");
      for(let index=0; index<pointerIds.length; index++) {
        const pointerId = pointerIds[index];
        this.componentPointer.add(pointerId);
      }
      return this;
    }

  };

  return NwtValidationContext;

});