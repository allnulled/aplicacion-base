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

  let NwtCronMachine = undefined;

  if (typeof assertion !== "function") {
    assertion = (condition, message) => {
      if (!condition) throw new Error(message);
    };
  }

  if (typeof trace !== "function") {
    trace = (...args) => {
      if (NwtCronMachine.isTracing) {
        console.log("[trace]", ...args);
      }
    };
  }

  NwtCronMachine = class {

    static isTracing = true;

    static activateTracing() {
      this.isTracing = true;
    }

    static deactivateTracing() {
      this.isTracing = true;
    }

    static parse(code) {
      trace("NwtCronMachine.parse");
      return NwtCronParser.parse(code);
    }

    static compile(code) {
      trace("NwtCronMachine.compile");
      const ast = this.parse(code);
      this.normalizeNode(ast, null);
      const astGrouped = {};
      this.collect(ast, [], astGrouped);
      const astFormatted = this.formatCollection(astGrouped);
      return astFormatted;
    }

    static units = ["year", "month", "day", "hour", "minute", "second"];

    static unitIndex(u) {
      trace("NwtCronMachine.unitIndex");
      return this.units.indexOf(u);
    }

    static getMinUnitOrdinal(selector) {
      trace("NwtCronMachine.getMinUnit");
      const isRange = selector.type === "range";
      let min = Infinity;
      for (let k in selector) {
        if (this.units.includes(k)) {
          min = Math.min(min, this.unitIndex(k));
        }
      }
      return min === Infinity ? null : min;
    }

    static getMinUnit(selector) {
      trace("NwtCronMachine.getMinUnit");
      const isRange = selector.type === "range";
      let min = Infinity;
      for (let k in selector) {
        if (this.units.includes(k)) {
          min = Math.min(min, this.unitIndex(k));
        }
      }
      return min === Infinity ? null : this.units[min];
    }

    static getMaxUnit(selector) {
      trace("NwtCronMachine.getMaxUnit");
      const isRange = selector.type === "range";
      let max = -Infinity;
      for (let k in selector) {
        if (this.units.includes(k)) {
          max = Math.max(max, this.unitIndex(k));
        }
      }
      return max === -Infinity ? null : this.units[max];
    }

    static resolveAmbiguous(selector, parentMinUnit) {
      trace("NwtCronMachine.resolveAmbiguous", selector, parentMinUnit);
      const isRange = selector.type === "range";
      if (isRange) {
        const disambiguation = this.units[parentMinUnit?parentMinUnit+1:1];
        if(selector.from.ambiguous) {
          selector.from[disambiguation] = selector.from.ambiguous;
        }
        if(selector.to.ambiguous) {
          selector.to[disambiguation] = selector.to.ambiguous;
        }
      } else if (!isRange) {
        if (!("ambiguous" in selector)) return selector;
        const value = selector.ambiguous;
        delete selector.ambiguous;
        let unit;
        if (parentMinUnit === null) {
          unit = "month";
        } else {
          const idx = this.unitIndex(parentMinUnit) + 1;
          unit = this.units[idx];
        }
        selector[unit] = value;
        return selector;
      } else {
        throw new Error("This can never happen (7)");
      }
    }

    static validateSelector(selector, parentMinUnit, indexes) {
      trace("NwtCronMachine.validateSelector");
      const max = this.getMaxUnit(selector);
      if ((max !== null) && (parentMinUnit !== null)) {
        if (this.unitIndex(max) <= this.unitIndex(parentMinUnit)) {
          throw Error(`Invalid scope inheritance on index «${indexes.join(".")}» because parent min is «${parentMinUnit}» and current max is «${max}» on «NwtCronMachine.validateSelector»`);
        }
      }
      return max;
    }

    static normalizeNode(node, parentMinUnit, indexes = []) {
      trace("NwtCronMachine.normalizeNode");
      if (Array.isArray(node)) {
        for (let index = 0; index < node.length; index++) {
          const subnode = node[index];
          this.normalizeNode(subnode, parentMinUnit, indexes.concat([index]));
        }
        return;
      }
      for (const selId in node.selector) {
        const sel = node.selector[selId];
        this.resolveAmbiguous(sel, parentMinUnit);
        const min = this.validateSelector(sel, parentMinUnit, indexes.concat([selId]));
        sel.$min = min;
      }
      const newMin = node.selector.map(s => s.$min).reduce((a, b) => this.unitIndex(a) < this.unitIndex(b) ? a : b);
      if (node.subselector) {
        for (const childId in node.subselector) {
          const child = node.subselector[childId];
          this.normalizeNode(child, newMin, indexes.concat(["subselector", childId]));
        }
      }
    }

    static labels = {
      level: "@level=",
      selector: "@selector=",
      match: "@match=",
    }

    static formatSelectorList(list, prefixs) {
      const output = {};
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        output[`${this.labels.level}${index}`] = {}; // this.formatSelectorList(item, "S");
        for (let subindex = 0; subindex < item.length; subindex++) {
          const subitem = item[subindex];
          // delete subitem.$min;
          output[`${this.labels.level}${index}`][`${this.labels.selector}${subindex}`] = subitem;
        }
      }
      return output;
    }

    static collect(node, path, out) {
      trace("NwtCronMachine.collect");
      if (Array.isArray(node)) {
        for (let index = 0; index < node.length; index++) {
          const item = node[index];
          this.collect(item, path, out);
        }
        return;
      }
      const newPath = [...path, node.selector];
      if (node.action) {
        if (!out[node.action]) {
          out[node.action] = [];
        }
        const finalItem = this.formatSelectorList(newPath);
        out[node.action].push(finalItem);
      }
      if (node.subselector) {
        for (const child of node.subselector) {
          this.collect(child, newPath, out);
        }
      }
    }

    static formatCollection(astGrouped) {
      const output = {};
      for (let actionId in astGrouped) {
        const matches = astGrouped[actionId];
        const actionMatches = {};
        for (let index = 0; index < matches.length; index++) {
          const match = matches[index];
          actionMatches[`${this.labels.match}${index}`] = match;
        }
        output[actionId] = actionMatches;
      }
      return output;
    }

  };

  return NwtCronMachine;

});