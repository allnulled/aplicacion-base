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
      const dates = NwtCronMachineUtils.Compilation.from(compilation).getNextDates();
      return { compilation, dates };
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

      /*
      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.RangeSelector.prototype.getNextDate");
        const fromUnits = this.$data.from;
        const toUnits = this.$data.to;
        const fromUnitIds = NwtCronMachineUtils.getSelectorUnitsByOrder(fromUnits);
        const toUnitIds = NwtCronMachineUtils.getSelectorUnitsByOrder(toUnits);
        // @TODO: me lío. Porque me faltan dates a las que acogerme. Me faltan catches también, porque esto va a fallar,
        // y tendrá que volver a selectores anteriores. O devolver null o undefined o false o algo para que la función
        // que la llama sepa que no hay un nextDate válido.
        // Es decir, aquí pueden pasar 2 cosas, no sé si alguna más:
        //   - que el rango no sea válido, porque en cualquier caso es anterior.
        //   - que el rango sí sea válido
      }
      //*/

      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.RangeSelector.prototype.getNextDate");
        const fromSelector = NwtCronMachineUtils.BasicSelector.from(this.$data.from);
        const toSelector = NwtCronMachineUtils.BasicSelector.from(this.$data.to);
        const nextFrom = fromSelector.getNextDate(basedate, indexes, validDate, originalData);
        const nextTo = toSelector.getNextDate(basedate, indexes, validDate, originalData);
        if (!nextFrom || !nextTo) return undefined;
        // Si el rango ya pasó, hay que saltar a la próxima iteración
        if (nextTo < basedate) {
          // Incrementamos la unidad superior del from
          const upperUnit = NwtCronMachineUtils.getUnitNameByIndex(fromSelector.getMinimumUnit(null) - 1);
          if (!upperUnit) return undefined; // no hay unidad superior, no hay siguiente
          const candidate = new NwtCronMachineUtils.ValidDate(basedate.getTime());
          candidate.addUnit(upperUnit, 1);
          candidate.resetLowerUnits(upperUnit);
          return this.getNextDate(candidate, indexes, validDate, originalData);
        }
        // Si la fecha actual está antes del inicio del rango, saltamos al inicio
        if (nextFrom > basedate) {
          return nextFrom;
        }
        // Si estamos dentro del rango, devolvemos la fecha actual
        return basedate >= nextFrom && basedate <= nextTo ? basedate : nextFrom;
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

      /*
      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.BasicSelector.prototype.getNextDate");
        const unitIds = NwtCronMachineUtils.getSelectorUnitsByOrder(this.$data);
        Iterating_units:
        for (let index = 0; index < unitIds.length; index++) {
          const unitId = unitIds[index];
          const unitValue = this.$data[unitId];
          const currentValue = NwtCronMachineUtils.getDateValue(unitId, basedate);
          const selectedValue = unitValue - (unitId === "month" ? 1 : 0);
          if (currentValue < selectedValue) {

          }
        }
        return "xxx";
      }
      //*/



      getNextDate(basedate, indexes, validDate, originalData) {
        trace("NwtCronMachineUtils.BasicSelector.prototype.getNextDate");
        // hacemos una copia de basedate para no mutar el original
        const candidate = new NwtCronMachineUtils.ValidDate(basedate.getTime());
        // cogemos las units del objeto y las ordenamos
        const unitOrder = Object.keys(this.$data)
          .filter(u => u in NwtCronMachineUtils.unitsByName)
          .sort((a, b) => NwtCronMachineUtils.unitsByName[b] - NwtCronMachineUtils.unitsByName[a]);
        // iteramos las units ordenadas
        for (let i = 0; i < unitOrder.length; i++) {
          // separamos la unit
          const unit = unitOrder[i];
          // separamos el valor
          let value = this.$data[unit];
          // si es month, lo ajustamos
          if (unit === "month") value -= 1; // ajustar month a 0-11
          // separamos el valor de la fecha candidata
          const current = candidate.getDateValue(unit);
          // si el valor (de la unidad concreta) de la fecha candidata es menor que el de la especificación ($data)
          if (current < value) {
            // cambiamos del candidato la unidad para que sea igual que el de la especificación ($data)
            candidate.setDateValue(unit, value);
            // y reseteamos unidades más bajas
            candidate.resetLowerUnits(unit);
            // si el valor (de la unidad concreta) de la fecha candidata es mayor que el de la especificación ($data)
          } else if (current > value) {
            // necesitamos incrementar la unidad superior
            const prevUnit = NwtCronMachineUtils.getPreviousUnit(unit);
            // si no hay unidad superior, no hay siguiente: retornamos undefined
            if (!prevUnit) return undefined;
            // si sí hay unidad superior, añadimos 1 unidad
            candidate.addUnit(prevUnit, 1);
            // y reseteamos las unidades más bajas
            candidate.resetLowerUnits(prevUnit);
            // y reiniciamos el loop desde la unidad mayor
            i = -1;
          } else if (current === value) {
            // @OK: si es igual, seguimos al siguiente unit
          }
        }
        return candidate;
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

    static ValidDate = class extends Date {
      static create(...args) {
        return new this(...args);
      }
      getDateValue(unit) {
        if (unit === "year") return this.getFullYear();
        else if (unit === "month") return this.getMonth();
        else if (unit === "day") return this.getDate();
        else if (unit === "weekday") return this.getDay();
        else if (unit === "hour") return this.getHours();
        else if (unit === "minute") return this.getMinutes();
        else if (unit === "second") return this.getSeconds();
        else throw new Error(`Bad unit «${unit}» on «NwtCronMachineUtils.ValidDate.prototype.getDateValue»`);
      }
      setDateValue(unit, value) {
        if (unit === "year") this.setFullYear(value);
        else if (unit === "month") this.setMonth(value);
        else if (unit === "day") this.setDate(value);
        else if (unit === "weekday") this.setDay(value);
        else if (unit === "hour") this.setHours(value);
        else if (unit === "minute") this.setMinutes(value);
        else if (unit === "second") this.setSeconds(value);
        else throw new Error(`Bad unit «${unit}» on «NwtCronMachineUtils.ValidDate.prototype.setDateValue»`);
      }
      resetLowerUnits(unit) {
        if (unit === "year") {
          this.setMonth(0, 1);
          this.setHours(0, 0, 0, 0);
        } else if (unit === "month") {
          this.setDate(1);
          this.setHours(0, 0, 0, 0);
        } else if (unit === "day") {
          this.setHours(0, 0, 0, 0);
        } else if (unit === "hour") {
          this.setMinutes(0, 0, 0);
        } else if (unit === "minute") {
          this.setSeconds(0, 0);
        } else {
          throw new Error(`Bad unit «${unit}» on «NwtCronMachineUtils.ValidDate.prototype.resetLowerUnits»`);
        }
      }
      addUnit(unit, amount = 1) {
        if (unit === "year") this.setFullYear(this.getFullYear() + amount);
        else if (unit === "month") this.setMonth(this.getMonth() + amount);
        else if (unit === "day") this.setDate(this.getDate() + amount);
        else if (unit === "hour") this.setHours(this.getHours() + amount);
        else if (unit === "minute") this.setMinutes(this.getMinutes() + amount);
        else if (unit === "second") this.setSeconds(this.getSeconds() + amount);
        else throw new Error(`Bad unit «${unit}» on «NwtCronMachineUtils.ValidDate.prototype.setDateValue»`);
      }
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