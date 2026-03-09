(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronMachine'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronMachine'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  let NwtCronMachineUtils = undefined;

  if (typeof assertion !== "function") {
    assertion = (condition, message) => {
      if (!condition) throw new Error(message);
    };
  }

  if (typeof trace !== "function") {
    trace = (...args) => {
      if (NwtCronMachineUtils.isTracing) {
        console.log("[trace]", ...args);
      }
    };
  }


  const NwtCronBacktracker = class {
    static applySelector(state, selector) {
      const next = { ...state };
      for (const k in selector) {
        next[k] = selector[k];
      }
      return next;
    }

    static backtrack(levels, levelIndex = 0, state = {}) {
      if (levelIndex === levels.length) {
        return state;
      }
      const selectors = levels[levelIndex];
      for (const selector of selectors) {
        const nextState = this.applySelector(state, selector);
        const result = this.backtrack(levels, levelIndex + 1, nextState);
        if (result) return result;
      }
      return null;
    }

    static resolveMatch(match) {
      for (const levels of match) {
        const result = this.backtrack(levels);
        if (result) return result;
      }
      return null;
    }

    static resolveCompilation(compilation) {
      const output = {};
      for (const name in compilation) {
        output[name] = this.resolveMatch(compilation[name]);
      }
      return output;
    }
  };

  NwtCronMachineUtils = class {

    static interfaces = {};

    static isTracing = true;

    static unitsByName = {
      // ambiguous: null,
      year: 6,
      month: 5,
      day: 4,
      hour: 3,
      minute: 2,
      second: 1,
    }

    static unitsByIndex = {
      "6": "year",
      "5": "month",
      "4": "day",
      "3": "hour",
      "2": "minute",
      "1": "second"
    };

    static getUnitIndexByName(unitIndex) {
      trace("NwtCronMachineUtils.getUnitIndexByName");
      return this.unitsByName[unitIndex];
    }

    static getUnitNameByIndex(unitIndex) {
      trace("NwtCronMachineUtils.getUnitNameByIndex");
      return this.unitsByIndex[unitIndex];
    }

    static activateTracing() {
      this.isTracing = true;
    }

    static deactivateTracing() {
      this.isTracing = false;
    }

    static compile(ast) {
      trace("NwtCronMachineUtils.compile");
      const compilation = {};
      /*
      Ast
      AstSentence=SelectorRule*
      SelectorRule=SelectorProperty SubselectorProperty?
      SelectorProperty=(RangeSelector/ObjectSelector)+
      SubselectorProperty=Ast
      //*/
      this.Ast.from(ast).disambiguate(null);
      this.Ast.from(ast).collect(compilation, [], ast);
      const dates = {};
      for (let prop in compilation) {
        dates[prop] = NwtCronMachineUtils.getNextDatesFrom(compilation[prop]);
      }
      return { compilation, dates };
    }

    static getNextDatesFrom(rules, baseDate = new Date()) {

      const units = ["year", "month", "day", "hour", "minute", "second"];

      function get(date, unit) {
        if (unit === "year") return date.getFullYear();
        if (unit === "month") return date.getMonth() + 1;
        if (unit === "day") return date.getDate();
        if (unit === "hour") return date.getHours();
        if (unit === "minute") return date.getMinutes();
        if (unit === "second") return date.getSeconds();
      }

      function set(date, unit, value) {
        if (unit === "year") date.setFullYear(value);
        if (unit === "month") date.setMonth(value - 1);
        if (unit === "day") date.setDate(value);
        if (unit === "hour") date.setHours(value);
        if (unit === "minute") date.setMinutes(value);
        if (unit === "second") date.setSeconds(value);
      }

      function add(date, unit, amount = 1) {
        if (unit === "year") date.setFullYear(date.getFullYear() + amount);
        if (unit === "month") date.setMonth(date.getMonth() + amount);
        if (unit === "day") date.setDate(date.getDate() + amount);
        if (unit === "hour") date.setHours(date.getHours() + amount);
        if (unit === "minute") date.setMinutes(date.getMinutes() + amount);
        if (unit === "second") date.setSeconds(date.getSeconds() + amount);
      }

      function resetLower(date, unit) {
        if (unit === "year") {
          date.setMonth(0, 1);
          date.setHours(0, 0, 0, 0);
        }
        if (unit === "month") {
          date.setDate(1);
          date.setHours(0, 0, 0, 0);
        }
        if (unit === "day") {
          date.setHours(0, 0, 0, 0);
        }
        if (unit === "hour") {
          date.setMinutes(0, 0, 0);
        }
        if (unit === "minute") {
          date.setSeconds(0, 0);
        }
      }

      function previousUnit(unit) {
        const i = units.indexOf(unit);
        return units[i - 1] ?? null;
      }

      function basicNext(expected, value) {
        if (value <= expected) return expected;
        return null;
      }

      function rangeNext(from, to, value) {
        if (value < from) return from;
        if (value <= to) return value;
        return null;
      }

      function listNext(selectors, value) {

        let best = null;

        for (const sel of selectors) {

          let next = null;

          if (sel.type === "range") {

            const unit = Object.keys(sel.from)[0];
            next = rangeNext(sel.from[unit], sel.to[unit], value);

          } else {

            const unit = Object.keys(sel)[0];
            next = basicNext(sel[unit], value);

          }

          if (next !== null) {
            if (best === null || next < best) {
              best = next;
            }
          }

        }

        return best;

      }

      const d = new Date(baseDate.getTime() + 1000);

      restart:

      while (true) {

        for (const unit of units) {

          const selectors = rules[unit] ?? [];
          if (!selectors.length) continue;

          const current = get(d, unit);
          const next = listNext(selectors, current);

          if (next === null) {

            const parent = previousUnit(unit);
            if (!parent) return null;

            add(d, parent, 1);
            resetLower(d, parent);

            continue restart;

          }

          if (next !== current) {

            set(d, unit, next);
            resetLower(d, unit);

          }
        }

        return d;

      }

    }

    static CommonInterface = class {
      static from(...args) {
        trace(`NwtCronMachineUtils.${this.name}.from`);
        return new this(...args);
      }
      constructor(data) {
        trace(`NwtCronMachineUtils.${this.constructor.name}.constructor`);
        this.$data = data;
      }
    }

    static Ast = class extends this.CommonInterface {
      disambiguate(parentMin) {
        trace("NwtCronMachineUtils.Ast.prototype.disambiguate");
        for (let index = 0; index < this.$data.length; index++) {
          const $row = this.$data[index];
          NwtCronMachineUtils.AstSentence.from($row).disambiguate(parentMin);
        }
      }
      collect(output, indexes, original) {
        trace("NwtCronMachineUtils.Ast.prototype.collect");
        for (let index = 0; index < this.$data.length; index++) {
          const $row = this.$data[index];
          NwtCronMachineUtils.AstSentence.from($row).collect(output, indexes.concat([index]), original);
        }
      }
    }

    static AstSentence = class extends this.CommonInterface {
      disambiguate(parentMin) {
        trace("NwtCronMachineUtils.AstSentence.prototype.disambiguate");
        NwtCronMachineUtils.SelectorProperty.from(this.$data.selector).disambiguate(parentMin);
        const newParentMin = NwtCronMachineUtils.SelectorProperty.from(this.$data.selector).getMinimumUnit(parentMin);
        if (this.$data.subselector) {
          NwtCronMachineUtils.SubselectorProperty.from(this.$data.subselector).disambiguate(newParentMin);
        }
      }
      collect(output, indexes, original) {
        trace("NwtCronMachineUtils.AstSentence.prototype.collect");
        if (this.$data.action) {
          if (!(this.$data.action in output)) {
            output[this.$data.action] = [];
          }
          const selectorsScope = NwtCronMachineUtils.extractSelectorsScope(original, indexes);
          output[this.$data.action].push(selectorsScope);
        }
        if (this.$data.subselector) {
          NwtCronMachineUtils.SubselectorProperty.from(this.$data.subselector).collect(output, indexes.concat(["subselector"]), original);
        }
      }
    }

    static SelectorProperty = class extends this.CommonInterface {
      disambiguate(parentMin) {
        trace("NwtCronMachineUtils.SelectorProperty.prototype.disambiguate");
        for (let index = 0; index < this.$data.length; index++) {
          const $row = this.$data[index];
          NwtCronMachineUtils.SelectorTerm.from($row).disambiguate(parentMin);
        }
      }
      getMinimumUnit(parentMin) {
        trace("NwtCronMachineUtils.SelectorProperty.prototype.getMinimumUnit");
        const mins = [];
        for (let index = 0; index < this.$data.length; index++) {
          const $row = this.$data[index];
          const currentMin = NwtCronMachineUtils.SelectorTerm.from($row).getMinimumUnit(parentMin);
          mins.push(currentMin);
        }
        return Math.min(...mins);
      }
    }

    static SubselectorProperty = class extends this.Ast { };

    static SelectorTerm = class extends this.CommonInterface {
      disambiguate(parentMin) {
        trace("NwtCronMachineUtils.SelectorTerm.prototype.disambiguate");
        if (this.$data.type === "range") {
          NwtCronMachineUtils.RangeSelector.from(this.$data).disambiguate(parentMin);
        } else {
          NwtCronMachineUtils.BasicSelector.from(this.$data).disambiguate(parentMin);
        }
      }
      getMinimumUnit(parentMin) {
        trace("NwtCronMachineUtils.SelectorTerm.prototype.getMinimumUnit");
        if (this.$data.type === "range") {
          return NwtCronMachineUtils.RangeSelector.from(this.$data).getMinimumUnit(parentMin);
        } else {
          return NwtCronMachineUtils.BasicSelector.from(this.$data).getMinimumUnit(parentMin);
        }
      }
    }

    static getNextMaxUnitFrom(parentMin) {
      trace("NwtCronMachineUtils.getNextMaxUnitFrom");
      if (parentMin === null) return "month";
      if (parentMin === this.unitsByName.year) return "month";
      if (parentMin === this.unitsByName.month) return "day";
      if (parentMin === this.unitsByName.day) return "hour";
      if (parentMin === this.unitsByName.hour) return "minute";
      if (parentMin === this.unitsByName.minute) return "second";
      if (parentMin === this.unitsByName.second) return "second";
      throw new Error("Esto no debería ocurrir (9)");
    }

    static extractSelectorsScope(ast, indexes) {
      trace("NwtCronMachineUtils.extractSelectorsScope");
      let pivot = ast;
      const selectorsScope = [];
      for (let index = 0; index < indexes.length; index++) {
        const propId = indexes[index];
        pivot = pivot[propId];
        if ((typeof pivot === "object") && pivot.selector) {
          selectorsScope.push(pivot.selector);
        }
      }
      return selectorsScope;
    }

    static pointsBefore(nextDate, nextDate2) {
      trace("NwtCronMachineUtils.pointsBefore");
      if (typeof nextDate2 === "undefined") return true;
      if (typeof nextDate === "undefined") return false;
      return nextDate < nextDate2;
    }

    static RangeSelector = class extends this.CommonInterface {
      disambiguate(parentMin) {
        trace("NwtCronMachineUtils.RangeSelector.prototype.disambiguate");
        if ("ambiguous" in this.$data.from) {
          NwtCronMachineUtils.BasicSelector.from(this.$data.from).disambiguate(parentMin);
        }
        if ("ambiguous" in this.$data.to) {
          NwtCronMachineUtils.BasicSelector.from(this.$data.to).disambiguate(parentMin);
        }
      }
      getMinimumUnit(parentMin) {
        trace("NwtCronMachineUtils.RangeSelector.prototype.getMinimumUnit");
        const minFrom = NwtCronMachineUtils.BasicSelector.from(this.$data.from).getMinimumUnit(parentMin);
        const minTo = NwtCronMachineUtils.BasicSelector.from(this.$data.to).getMinimumUnit(parentMin);
        return Math.min(minFrom, minTo);
      }

    }

    static BasicSelector = class extends this.CommonInterface {
      disambiguate(parentMin) {
        trace("NwtCronMachineUtils.BasicSelector.prototype.disambiguate");
        if ("ambiguous" in this.$data) {
          const disambiguatedUnit = NwtCronMachineUtils.getNextMaxUnitFrom(parentMin);
          this.$data[disambiguatedUnit] = this.$data.ambiguous;
          delete this.$data.ambiguous;
        }
      }
      getMinimumUnit(parentMin) {
        trace("NwtCronMachineUtils.BasicSelector.prototype.getMinimumUnit");
        let min = Infinity;
        Iterating_props:
        for (let prop in this.$data) {
          if (!(prop in NwtCronMachineUtils.unitsByName)) continue Iterating_props;
          const unitOrder = NwtCronMachineUtils.unitsByName[prop];
          if (unitOrder < min) {
            min = unitOrder;
          }
        }
        const finalMin = min === Infinity ? 6 : min;
        // @INFO: no le ponemos este tag al final, no se necesitaría, pero puedes recuperarlo e inyectarlo así:
        // this.$data.$minimum = NwtCronMachineUtils.getUnitNameByIndex(finalMin);
        return finalMin;
      }

    }

    static getPreviousUnit(unit) {
      const order = NwtCronMachineUtils.unitsByName[unit];
      const prevOrder = order + 1;
      return NwtCronMachineUtils.unitsByIndex[prevOrder] || null;
    }

    static getSelectorUnitsByOrder(selector) {
      const allUnits = Object.keys(this.unitsByName);
      const usedUnits = [];
      for (let prop in selector) {
        if (allUnits.includes(prop)) {
          usedUnits.push(prop);
        }
      }
      return usedUnits;
    }

  };

  const NwtCronMachine = class {

    static utils = NwtCronMachineUtils;

    static parse(code) {
      trace("NwtCronMachine.parse");
      return NwtCronParser.parse(code);
    }

    static compile(code) {
      trace("NwtCronMachine.compile");
      const ast = this.parse(code);
      const compiled = this.utils.compile(ast);
      return compiled;
    }

  };

  return NwtCronMachine;

});