(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtGlobEngine'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtGlobEngine'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtGlobEngine = class {

    static compileGlob(glob) {
      trace("NwtGlobEngine.compileGlob");
      let regexSource = "";
      let index = 0;
      const escapeRegex = text => {
        return text.replace(/[\|\{\}\(\)\[\]\^\$\+\?\.]/g, "\$&");
      };
      Iterating_glob_expression_characters:
      while (index < glob.length) {
        const ch = glob[index];
        // **  (recursive)
        if (ch === "*" && glob[index + 1] === "*") {
          regexSource += ".*";
          index += 2;
          continue Iterating_glob_expression_characters;
        }
        // *
        if (ch === "*") {
          regexSource += "[^/]*";
          index++;
          continue Iterating_glob_expression_characters;
        }
        // ?
        if (ch === "?") {
          regexSource += ".";
          index++;
          continue Iterating_glob_expression_characters;
        }
        // {a,b,c}
        if (ch === "{") {
          let subindex = index + 1;
          let depth = 1;
          while (subindex < glob.length && depth) {
            if (glob[subindex] === "{") depth++;
            else if (glob[subindex] === "}") depth--;
            subindex++;
          }
          const content = glob.slice(index + 1, subindex - 1);
          const parts = content.split(",").map(part => escapeRegex(part));
          regexSource += "(?:" + parts.join("|") + ")";
          index = subindex;
          continue Iterating_glob_expression_characters;
        }
        // [class]  (+ allowed)
        if (ch === "[") {
          let subindex = index + 1;
          while (subindex < glob.length && glob[subindex] !== "]") subindex++;
          const cls = glob.slice(index, subindex + 1);
          regexSource += cls;
          index = subindex + 1;
          // custom extension: +
          if (glob[index] === "+") {
            regexSource += "+";
            index++;
          }
          continue Iterating_glob_expression_characters;
        }
        // literal
        regexSource += escapeRegex(ch);
        index++;
      }
      regexSource += "";
      return new RegExp(regexSource);
    }

    static testByString(globOrRegex, text) {
      trace("NwtGlobEngine.testByString");
      const regex = globOrRegex instanceof RegExp ? globOrRegex : this.compileGlob(globOrRegex);
      return regex.test(text);
    }

    static testByStringArray(globOrRegex, texts) {
      trace("NwtGlobEngine.testByStringArray");
      assertion(Array.isArray(texts), "Parameter «texts» must be array on «NwtGlobEngine.testByStringArray»");
      for(let index=0; index<texts.length; index++) {
        const text = texts[index];
        const result = this.testByString(globOrRegex, text);
        if(result) return true;
      }
      return false;
    }

    static test(globExpression, textInput) {
      trace("NwtGlobEngine.test");
      const globList = typeof globExpression === "string" ? [globExpression] : globExpression;
      const textList = typeof textInput === "string" ? [textInput] : textInput;
      assertion(Array.isArray(globList), "Parameter «globExpression» must be string or array on «NwtGlobEngine.testByAny»");
      assertion(Array.isArray(textList), "Parameter «text» must be string or array on «NwtGlobEngine.testByAny»");
      const globCompilation = globList.map(globExpression => this.compileGlob(globExpression));
      Iterating_texts:
      for (let index = 0; index < textList.length; index++) {
        const textItem = textList[index];
        Iterating_glob_expressions:
        for (let indexExpr = 0; indexExpr < globCompilation.length; indexExpr++) {
          const globRegexp = globCompilation[indexExpr];
          const match = this.testByString(globRegexp, textItem);
          if (match) {
            return textItem;
          }
        }
      }
      return false;
    }

    static match(globExpression, textInput) {
      trace("NwtGlobEngine.matchByAny");
      const globList = typeof globExpression === "string" ? [globExpression] : globExpression;
      const textList = typeof textInput === "string" ? [textInput] : textInput;
      assertion(Array.isArray(globList), "Parameter «globExpression» must be string or array on «NwtGlobEngine.matchByAny»");
      assertion(Array.isArray(textList), "Parameter «text» must be string or array on «NwtGlobEngine.matchByAny»");
      const globCompilation = globList.map(globExpression => this.compileGlob(globExpression));
      const matches = [];
      Iterating_texts:
      for (let index = 0; index < textList.length; index++) {
        const textItem = textList[index];
        Iterating_glob_expressions:
        for (let indexExpr = 0; indexExpr < globCompilation.length; indexExpr++) {
          const globRegexp = globCompilation[indexExpr];
          const match = this.testByString(globRegexp, textItem);
          if (match) {
            matches.push(textItem);
          }
        }
      }
      return matches;
    }

  };

  return NwtGlobEngine;

});