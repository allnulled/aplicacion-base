(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronScope'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronScope'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCronScope = class {
    static create(...args) {
      return new this(...args);
    }
    constructor(layers = []) {
      this.layers = layers;
    }
    add(layer) {
      this.layers.push(layer);
      return this;
    }
    clone() {
      return NwtCronScope.create(this.layers.concat([]));
    }
    extend(...args) {
      const copy = this.clone();
      copy.layers.push(...args);
      return copy;
    }
    static magnitudeLevels = {
      ambiguous: undefined,
      second: 1,
      minute: 2,
      hour: 3,
      day: 4,
      weekday: 4,
      month: 5,
      year: 6,
    };
    static get reversedMagnitudeLevels() {
      if (this.$reversedMagnitudeLevels) {
        return this.$reversedMagnitudeLevels;
      }
      const keys = Object.keys(this.magnitudeLevels);
      const out = {};
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const val = this.magnitudeLevels[key];
        out[val] = key;
      }
      this.$reversedMagnitudeLevels = out;
      return this.$reversedMagnitudeLevels;
    }
    getLevelDegree(magnitude) {
      return this.constructor.magnitudeLevels[magnitude];
    }
    throwOnInheritanceIncompatibility(output, scope, indexes) {
      const inheritedIsUndefined = typeof scope.parentMin === "undefined";
      const selfIsUndefined = typeof output.max === "undefined";
      if (inheritedIsUndefined && !selfIsUndefined) {
        
      } else if (inheritedIsUndefined && selfIsUndefined) {
        // Desambiguación:
        
      } else if (!inheritedIsUndefined && selfIsUndefined) {
        // Desambiguación:
        
      } else if (!inheritedIsUndefined && !selfIsUndefined) {
        // Desambiguación:
        console.log(output, scope, indexes);
        assertion(scope.parentMin > output.max, `Bad date selector error 1: parent date minimum magnitude «${scope.parentMin}» cannot be equal or lower than current date maximum magnitude «${output.max}» happening on index «${indexes.join(".")}» on «NwtCronScope.prototype.throwOnInheritanceIncompatibility»`);
      }
    }
    findMinMaxMagnitudes(selectorRule, scope, indexes = []) {
      assertion(typeof selectorRule === "object", `Expected to be only objects on selector rule in ast on index «${indexes.join(".")}» on «NwtCronScope.prototype.findMinMaxMagnitudes»`);
      let output = undefined;
      if (selectorRule.type === "range") {
        const limits0 = this.findMinMaxMagnitudes(selectorRule.from, scope, indexes.concat(["from"]));
        const limits1 = this.findMinMaxMagnitudes(selectorRule.to, scope, indexes.concat(["to"]));
        output = { min: Math.min(limits0.min, limits1.min), max: Math.max(limits0.max, limits1.max) };
      } else if (selectorRule.components === null) {
        output = { min: undefined, max: undefined };
      } else if (typeof selectorRule === "object" && typeof selectorRule.components === "object" && selectorRule.components !== null) {
        output = this.findMinMaxMagnitudes(selectorRule.components, scope, indexes.concat(["components"]));
      } else if (typeof selectorRule === "object") {
        const magnitudes = Object.keys(selectorRule);
        let min = undefined;
        let max = undefined;
        Iterating_props:
        for (let index = 0; index < magnitudes.length; index++) {
          const magnitude = magnitudes[index];
          const isMagnitude = magnitude in this.constructor.magnitudeLevels;
          if (!isMagnitude) continue Iterating_props;
          const levelDegree = this.getLevelDegree(magnitude);
          if ((typeof min === "undefined") || (min > levelDegree)) min = levelDegree;
          if ((typeof max === "undefined") || (max < levelDegree)) max = levelDegree;
        }
        output = { min, max };
      } else {
        assertion(typeof selectorRule === "object", `Expected ast to only have ranges or simple selectors in ast on index «${indexes.join(".")}» on «NwtCronScope.prototype.findMinMaxMagnitudes»`);
      }
      this.throwOnInheritanceIncompatibility(output, scope, indexes);
      return output;
    }
    translateMinMax(obj) {
      return {
        min: obj.min in this.constructor.reversedMagnitudeLevels ? this.constructor.reversedMagnitudeLevels[obj.min] : undefined,
        max: obj.max in this.constructor.reversedMagnitudeLevels ? this.constructor.reversedMagnitudeLevels[obj.max] : undefined,
      };
    }
    expandLevelProperties(selector) {
      const out = {};
      const keys0 = Object.keys(selector);
      let nextScope = {};
      for (let index0 = 0; index0 < keys0.length; index0++) {
        const key0 = keys0[index0];
        const level = selector[key0];
        out[`L${key0}`] = {};
        const keys1 = Object.keys(level);
        const indexes = [key0];
        const scope = {
          level: key0,
          min: undefined,
          max: undefined,
          parentMin: undefined,
        };
        for (let index1 = 0; index1 < keys1.length; index1++) {
          const key1 = keys1[index1];
          const selectorRule = level[key1];
          const selectorMinMax = this.findMinMaxMagnitudes(selectorRule, scope, indexes.concat([key1]));
          const parentMinIsDetermined = typeof scope.parentMin !== "undefined";
          const currentMaxIsAmbiguous = typeof selectorMinMax.max !== "undefined";
          if(parentMinIsDetermined && currentMaxIsAmbiguous) {
            // Si el mínimo anterior es indeterminado y el máximo actual es ambiguo, es que está poniendo 1 mes:
            selectorMinMax.max = 5;

          } else if(parentMinIsDetermined && currentMaxIsAmbiguous) {
            // Si el parent no lo tiene definido
            selectorMinMax.max = 5;
          }
          let formatted = undefined;
          formatted = Object.assign(selectorRule, this.translateMinMax(selectorMinMax));
          out[`L${key0}`][`S${key1}`] = formatted;
        }
      }
      return out;
    }
    dehydrate() {
      return this.expandLevelProperties(Object.assign({}, this.layers));
    }
  }

  return NwtCronScope;

});