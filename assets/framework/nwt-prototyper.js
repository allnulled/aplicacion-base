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

    static fromTypeToString(t) {
      if(t === undefined) {
        return "Undefined";
      }
      if(t === null) {
        return "Null";
      }
      if(t.name) {
        return t.name;
      }
    }

    static initializePropertiesOf(target, moreArgs, extraErrorMessage = false, onlySpecifiedProps = true) {
      const [schema] = Array.isArray(moreArgs) ? moreArgs : [moreArgs];
      assertion(typeof target === "object", "Parameter «target» must be object on «NwtPrototyper.initializePropertiesOf»");
      assertion(typeof schema === "object", "Parameter «schema» must be object on «NwtPrototyper.initializePropertiesOf»");
      const schemaKeys = Object.keys(schema);
      const targetKeys = Object.keys(target);
      if(onlySpecifiedProps) {
        for(let index=0; index<targetKeys.length; index++) {
          const key = targetKeys[index];
          assertion(schemaKeys.includes(key), `Parameter «schema» does not specify a key named «${key}» but target does on «NwtPrototyper.initializePropertiesOf»`);
        }
      }
      Iterating_schema:
      for (const key in schema) {
        const ruleBrute = schema[key];
        const rule = (() => {
          // Para permitir sintaxis como en vue2:
          if(Array.isArray(ruleBrute)) return ruleBrute;
          const possibleTypes = ruleBrute.type;
          const defaultValue = ruleBrute.default;
          const validator = ruleBrute.validator;
          return [possibleTypes, defaultValue, validator || false];
        })();
        const allowedTypes = Array.isArray(rule[0]) ? rule[0] : [rule[0]];
        const allowedIds = allowedTypes.map(t => this.fromTypeToString(t));
        const defaultValue = rule[1];
        const validator = rule[2] || NwtUtils.noop;
        const isMissingProperty = (!(key in target)) || typeof target[key] === "undefined";
        const hasNotDefaultValue = rule.length === 1;
        if (isMissingProperty) {
          if(hasNotDefaultValue) {
            throw new TypeError(`Invalid empty value for property «${key}» required ${allowedIds.join("|")}` + (extraErrorMessage ? (" " + extraErrorMessage) : ""));
          }
          target[key] = defaultValue;
        }
        const value = target[key];
        validator(target[key], target, key, rule);
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
          throw new TypeError(`Invalid type for property «${key}» expected «${allowedIds.join("|")}» but «${typeof value}» was found instead` + (extraErrorMessage ? (" "+extraErrorMessage) : ""));
        }
      }
      return target;
    }

  };

  return NwtPrototyper;

});