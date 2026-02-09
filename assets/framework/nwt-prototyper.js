(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtPrototyper'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtPrototyper'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtPrototyper = class {

    static type = {
      Boolean: Boolean,
      Number: Number,
      String: String,
      Array: Array,
      Object: Object,
      Function: Function,
      Undefined: undefined,
      Null: null,
      Date: Date,
      Any: [Boolean, Number, String, Array, Object, Function, undefined, null],
      AnyExcept: (...omitted) => {
        const result = this.type.Any.concat([]);
        for(let index=0; index<omitted.length; index++) {
          const item = omitted[index];
          const pos = result.indexOf(item);
          if(pos !== -1) {
            result.splice(pos, 1);
          }
        }
        return result;
      }
    };

    static initializePropertiesOf(target, ...moreArgs) {
      const [extensions, schema] = Array.isArray(moreArgs[0]) ? moreArgs : [false, moreArgs[0]];
      assertion(typeof target === "object", "Parameter «target» must be object on «NwtPrototyper.initializePropertiesOf»");
      assertion(typeof schema === "object", "Parameter «schema» must be object on «NwtPrototyper.initializePropertiesOf»");
      if(extensions) {
        Object.assign(target, ...extensions);
      }
      Iterating_schema:
      for (const key in schema) {
        const rule = schema[key];
        const allowedTypes = Array.isArray(rule[0]) ? rule[0] : [rule[0]];
        const defaultValue = rule[1];
        const isMissingProperty = (!(key in target)) || typeof target[key] === "undefined";
        const hasNotDefaultValue = rule.length === 1;
        if (isMissingProperty) {
          if(hasNotDefaultValue) {
            throw new TypeError(`Invalid empty value for property «${key}». Required ${allowedTypes.map(t => (t?.name) || ((t === null) ? "Null" : t === undefined ? "Undefined" : typeof t)).join(" | ")}`);
          }
          target[key] = defaultValue;
        }
        const value = target[key];
        let valid = false;
        for (const Type of allowedTypes) {
          if ((Type === null) && (value === null)) valid = true;
          else if (Type === undefined && typeof value === "undefined") valid = true;
          else if (Type === String && typeof value === "string") valid = true;
          else if (Type === Number && typeof value === "number") valid = true;
          else if (Type === Boolean && typeof value === "boolean") valid = true;
          else if (Type === Function && typeof value === "function") valid = true;
          else if (Type === Object && typeof value === "object" && (value !== null)) valid = true;
          else if (Type === Array && Array.isArray(value)) valid = true;
          else if (typeof Type === "function" && value instanceof Type) valid = true;
          if (valid) break;
        }
        if (!valid) {
          throw new TypeError(
            `Invalid type for property «${key}». Expected «${allowedTypes.map(t => (t?.name) || ((t === null) ? "Null" : t === undefined ? "Undefined" : typeof t)).join(" | ")}» but «${typeof value}» was found instead`
          );
        }
      }
      return target;
    }

  };

  return NwtPrototyper;

});