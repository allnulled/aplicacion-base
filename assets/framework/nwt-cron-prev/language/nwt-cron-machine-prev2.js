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
      return NwtCronMachineUtils.Compilation.from(compilation).getNextDates();
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
      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.SelectorTerm.prototype.getNextDate");
        if (this.$data.type === "range") {
          return NwtCronMachineUtils.RangeSelector.from(this.$data).getNextDate(basedate, indexes, validDate, originalData);
        } else {
          return NwtCronMachineUtils.BasicSelector.from(this.$data).getNextDate(basedate, indexes, validDate, originalData);
        }
      }
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
      getNextDate(basedate) {
        trace("NwtCronMachineUtils.RangeSelector.prototype.getNextDate");
        const rangeFrom = this.$data.from;
        const rangeTo = this.$data.to;
        const candidate = new Date(basedate.getTime() + 1000);
        while (true) {
          let mismatchUnit = null;
          for (let unit in rangeFrom) {
            const min = rangeFrom[unit];
            const max = rangeTo[unit];
            const value = NwtCronMachineUtils.getDateValue(candidate, unit);
            if (value < min || value > max) {
              mismatchUnit = unit;
              break;
            }
          }
          if (!mismatchUnit) {
            return candidate;
          }
          const min = rangeFrom[mismatchUnit];
          const value = NwtCronMachineUtils.getDateValue(candidate, mismatchUnit);
          if (value < min) {
            NwtCronMachineUtils.setDateValue(candidate, mismatchUnit, min);
          } else {
            NwtCronMachineUtils.addUnit(candidate, mismatchUnit, 1);
            NwtCronMachineUtils.setDateValue(candidate, mismatchUnit, min);
          }
          NwtCronMachineUtils.resetLowerUnits(candidate, mismatchUnit);
        }
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
      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.BasicSelector.prototype.getNextDate");
        const candidate = new Date(basedate.getTime() + 1000);
        while (true) {
          let mismatchUnit = null;
          console.log("step 1");
          for (let unit in this.$data) {
            console.log("step 2");
            const expected = this.$data[unit];
            const current = NwtCronMachineUtils.getDateValue(candidate, unit);
            if (current !== expected) {
              console.log("step 3");
              console.log("UNIT", unit);
              console.log("EXPECTED", expected);
              console.log("CURRENT", current);
              console.log("DATE", candidate.toISOString());
              console.log("SELECTOR", this.$data);
              mismatchUnit = unit;
              break;
            }
            console.log("step 4");
          }
          console.log("step 5");
          if (!mismatchUnit) {
            console.log("step 6");
            return candidate;
          }
          console.log("step 7");
          const expected = this.$data[mismatchUnit];
          const current = NwtCronMachineUtils.getDateValue(candidate, mismatchUnit);
          if (current <= expected) {
            console.log("step 8");
            NwtCronMachineUtils.setDateValue(candidate, mismatchUnit, expected);
          } else {
            console.log("step 9");
            NwtCronMachineUtils.addUnit(candidate, mismatchUnit, 1);
            // NwtCronMachineUtils.setDateValue(candidate, mismatchUnit, expected);
          }
          console.log("step 10");
          NwtCronMachineUtils.resetLowerUnits(candidate, mismatchUnit);
          console.log("step 11");
          process.exit(0)
        }
        console.log("step 12");
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

    static ValidDate = class {
      static create(...args) {
        return new this(...args);
      }
      static defaultValue = {
        year: undefined,
        month: undefined,
        date: undefined,
        day: undefined,
        hour: undefined,
        minute: undefined,
        second: undefined,
      }
      constructor(heritage = {}) {
        Object.assign(this, this.constructor.defaultValue, heritage);
      }
      specify() {
        // Por defecto, si no se especifica, siempre es: todos los años, meses, días y horas, a los 0 minutos y 0 segundos.
        // Las especificaciones siempre son sobre este selector base, es decir, si no especifica las propiedades, tendrán cada una estos valores:
        return {
          year: this.year || "*",
          month: this.month || "*",
          date: this.date || "*",
          day: this.day || "*",
          hour: this.hour || "*",
          minute: this.minute || 0,
          second: this.second || 0,
        }
      }
    }

    static SelectorGroup = class extends this.CommonInterface {
      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.SelectorGroup.prototype.getNextDate");
        let output = undefined;
        for (let index = 0; index < this.$data.length; index++) {
          const term = this.$data[index];
          const next = NwtCronMachineUtils.SelectorTerm.from(term).getNextDate(basedate, indexes.concat([index]), validDate, originalData);
          if (NwtCronMachineUtils.pointsBefore(next, output)) {
            output = next;
          }
        }
        return output;
      }
    }

    static LevelGroup = class extends this.CommonInterface {
      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.LevelGroup.prototype.getNextDate");
        // @INFO: aquí se devuelve solo 1 Date, el más pequeño de todos después de basedate
        let output = undefined;
        for (let index = 0; index < this.$data.length; index++) {
          const selector = this.$data[index];
          const next = NwtCronMachineUtils.SelectorGroup.from(selector).getNextDate(basedate, indexes.concat([index]), validDate, originalData);
          if (NwtCronMachineUtils.pointsBefore(next, output)) {
            output = next;
          }
        }
        return output;
      }
    }

    static MatchGroup = class extends this.CommonInterface {
      getNextDate(basedate, indexes, originalData) {
        trace("NwtCronMachineUtils.MatchGroup.prototype.getNextDate");
        // @INFO: aquí se devuelve solo el más pequeño de todos los date. No, ahora no se está haciendo.
        let output = undefined;
        for (let index = 0; index < this.$data.length; index++) {
          const level = this.$data[index];
          const validDate = NwtCronMachineUtils.ValidDate.create();
          const next = NwtCronMachineUtils.LevelGroup.from(level).getNextDate(basedate, indexes.concat([index]), validDate, originalData);
          if (NwtCronMachineUtils.pointsBefore(next, output)) {
            output = next;
          }
        }
        return output;
      }
    }

    static Compilation = class extends this.CommonInterface {
      getNextDates() {
        trace("NwtCronMachineUtils.Compilation.getNextDates");
        // @INFO: aquí se devuelven todos los de cada acción
        const basedate = new Date();
        const output = {};
        for (let actionId in this.$data) {
          const action = this.$data[actionId];
          const next = NwtCronMachineUtils.MatchGroup.from(action).getNextDate(basedate, [actionId], this.$data);
          output[actionId] = next;
        }
        return output;
      }
    }

    static getDateValue(date, unit) {
      if (unit === "year") return date.getFullYear();
      if (unit === "month") return date.getMonth();
      if (unit === "day") return date.getDate();
      if (unit === "hour") return date.getHours();
      if (unit === "minute") return date.getMinutes();
      if (unit === "second") return date.getSeconds();
    }

    static setDateValue(date, unit, value) {
      if (unit === "year") date.setFullYear(value);
      if (unit === "month") date.setMonth(value);
      if (unit === "day") date.setDate(value);
      if (unit === "hour") date.setHours(value);
      if (unit === "minute") date.setMinutes(value);
      if (unit === "second") date.setSeconds(value);
    }

    static resetLowerUnits(date, unit) {
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

    static addUnit(date, unit, amount = 1) {
      if (unit === "year") date.setFullYear(date.getFullYear() + amount);
      if (unit === "month") date.setMonth(date.getMonth() + amount);
      if (unit === "day") date.setDate(date.getDate() + amount);
      if (unit === "hour") date.setHours(date.getHours() + amount);
      if (unit === "minute") date.setMinutes(date.getMinutes() + amount);
      if (unit === "second") date.setSeconds(date.getSeconds() + amount);
    }

    // Esta fue tu propuesta anterior, pero vi que no estaba recogiendo los range, y todo esto.
    // Pero puedes inspirarte otra vez en él, porque seguro que estaba bien si arreglaba lo suficiente.
    // Simplemente opté mejor por esta forma de descomponer selectores recursivamente, basada en OOP.
    // Porque resulta mucho más fácil, puedo separar concerns bien, aislar cada paso en su función y reusar el código al máximo.
    // Pero si ves algo más, adelante, dímelo.

    /*
    static buildConstraints(levels) {
      const map = {
        year: [],
        month: [],
        day: [],
        hour: [],
        minute: [],
        second: []
      };
      for (const level of levels) {
        for (const selector of level) {
          const units = Object.keys(selector.from);
          for (const unit of units) {
            map[unit].push(selector);
          }
          for (const unit of Object.keys(selector.to)) {
            if (!map[unit].includes(selector)) {
              map[unit].push(selector);
            }
          }
        }
      }
      return map;
    }

    static matchValue(value, selectors, unit) {
      if (!selectors || selectors.length === 0) return true;
      for (const sel of selectors) {
        const from = sel.from[unit] ?? -Infinity;
        const to = sel.to[unit] ?? Infinity;
        if (value >= from && value <= to) {
          return true;
        }
      }
      return false;
    }

    static nextDateForMatch(now, levels) {
      const constraints = this.buildConstraints(levels);
      const d = new Date(now.getTime() + 1000);
      while (true) {
        if (!this.matchValue(d.getFullYear(), constraints.year, "year")) {
          d.setFullYear(d.getFullYear() + 1, 0, 1);
          d.setHours(0, 0, 0, 0);
          continue;
        }
        if (!this.matchValue(d.getMonth(), constraints.month, "month")) {
          d.setMonth(d.getMonth() + 1, 1);
          d.setHours(0, 0, 0, 0);
          continue;
        }
        if (!this.matchValue(d.getDate(), constraints.day, "day")) {
          d.setDate(d.getDate() + 1);
          d.setHours(0, 0, 0, 0);
          continue;
        }
        if (!this.matchValue(d.getHours(), constraints.hour, "hour")) {
          d.setHours(d.getHours() + 1, 0, 0, 0);
          continue;
        }
        if (!this.matchValue(d.getMinutes(), constraints.minute, "minute")) {
          d.setMinutes(d.getMinutes() + 1, 0, 0);
          continue;
        }
        if (!this.matchValue(d.getSeconds(), constraints.second, "second")) {
          d.setSeconds(d.getSeconds() + 1, 0);
          continue;
        }
        return d;
      }
    }

    static nextDate(ast, now = new Date()) {
      let best = null;
      let bestAction = null;
      for (const action in ast) {
        for (const match of ast[action]) {
          const d = this.nextDateForMatch(now, match);
          if (!best || d < best) {
            best = d;
            bestAction = action;
          }
        }
      }
      return {
        action: bestAction,
        date: best
      };
    }
    //*/

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