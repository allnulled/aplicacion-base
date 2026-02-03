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
      pointer: undefined,
      componentId: undefined,
      componentInstance: undefined,
    };

    constructor(base = {}) {
      trace("NwtValidationContext.constructor");
      NwtPrototyper.initializePropertiesOf(this, [this.constructor.defaultBase, base], {
        value: [NwtPrototyper.type.AnyExcept(null, undefined)],
        pointer: [[NwtValidationContextPointer], NwtValidationContextPointer.create()],
        componentId: [[String]],
        componentInstance: [[Vue, null, undefined]],
      });
    }

    getPointedValue() {
      trace("NwtValidationContext.prototype.getPointerValue");
      let output = value;
      for(let indexPointer=0; indexPointer<this.pointer.length; indexPointer++) {
        const pointerItem = this.pointer[indexPointer];
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
        // only new pointer with same values:
        pointer: this.pointer.clone()
      };
      const cloned = Object.assign({}, this, overridings);
      return this.constructor.create(cloned);
    }

    appendPointer(pointerId) {
      trace("NwtValidationContext.prototype.appendPointer");
      this.pointer.add(pointerId);
      return this;
    }

  };

  return NwtValidationContext;

});