(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFormElementToAny'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFormElementToAny'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFormElementToAny = class {

    static create(element, value, virtualNode) {
      trace("NwtFormElementToAny.create");
      return new this(element, value, virtualNode);
    }

    static vformType = "any";

    constructor(element, value, virtualNode) {
      trace("NwtFormElementToAny.constructor");
      assertion(element instanceof HTMLElement, "Parameter «element» must be HTMLElement on «NwtFormElementToAny.constructor»");
      assertion(typeof value === "object", "Parameter «value» must be object on «NwtFormElementToAny.constructor»");
      assertion(typeof virtualNode === "object", "Parameter «virtualNode» must be object on «NwtFormElementToAny.constructor»");
      this.element = element;
      this.value = value;
      this.virtualNode = virtualNode;
      this.component = undefined;
    }

    initialize() {
      trace("NwtFormElementToAny.prototype.initialize");
      NwtVue2.cross.expose.by.element(this.element, this, "vformsPrototype");
      return this;
    }

    getValue() {
      trace("NwtFormElementToAny.prototype.getValue");
      throw new Error(`Method «getValue» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToAny.prototype.getValue»`);
    }

    validate() {
      trace("NwtFormElementToAny.prototype.validate");
      throw new Error(`Method «validate» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToAny»`);
    }

    propagateSuccess() {
      trace("NwtFormElementToAny.prototype.propagateSuccess");
      throw new Error(`Method «propagateSuccess» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToAny»`);
    }

    propagateErrors(error) {
      trace("NwtFormElementToAny.prototype.propagateErrors");
      throw new Error(`Method «propagateErrors» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToAny»`);
    }

    submit() {
      trace("NwtFormElementToAny.prototype.submit");
      throw new Error(`Method «submit» must be implemented on type «${this.constructor.vformType}» on «NwtFormElementToAny»`);
    }

  };

  return NwtFormElementToAny;

});