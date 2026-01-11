(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtFiletreeSelectorInterpreter'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtFiletreeSelectorInterpreter'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  const NwtFiletreeSelectorInterpreter = class {

    static parse(fullpath) {
      trace("NwtFiletreeSelectorInterpreter.parse");
      return NwtFiletreeSelector.parse(fullpath);
    }

    static fromTokensToString(tokens) {
      trace("NwtFiletreeSelectorInterpreter.fromTokensToString");
      return tokens.map(element => element.to).join("");
    }

    static async interpret(fullpathOrAst, userParameters = false, shortener = true) {
      trace("NwtFiletreeSelectorInterpreter.interpret");
      const isObject = typeof fullpathOrAst === "object";
      if(isObject) {
        assertion(fullpathOrAst.$type === "nfs-object", "Parameter «fullpathOrAst» only accepts «nfs-object» types on «NwtFiletreeSelector.interpret»");
      }
      const ast = isObject ? fullpathOrAst : NwtFiletreeSelector.parse(fullpathOrAst);
      ast.hasInterpretedTokens = NwtUtils.copify(ast.hasTokens);
      const parameters = userParameters || {};
      Add_parametric_ids: {
        const parametricIds = Object.keys(ast.hasParametricIds);
        for(let index = 0; index < parametricIds.length; index++) {
          const pos = parametricIds[index];
          const id = ast.hasParametricIds[pos];
          if(id in parameters) {
            ast.hasInterpretedTokens[pos] = {
              type: "text",
              subtype: "parametric id",
              label: id,
              position: pos,
              to: parameters[id],
            };
          }
        }
      }
      Add_hardcoded_ids: {
        if(shortener === false) break Add_hardcoded_ids;
        assertion(shortener instanceof NwtStringShortener, "Parameter «shortener» must be an instance of NwtStringShortener or false on «NwtFiletreeSelectorInterpreter.interpret»");
        const hardcodedIds = Object.keys(ast.hasHardcodedIds);
        for(let index = 0; index < hardcodedIds.length; index++) {
          const pos = hardcodedIds[index];
          const id = ast.hasHardcodedIds[pos];
          const shortenedId = await (shortener ? shortener.init(id) : id);
          ast.hasInterpretedTokens[pos] = {
            type: "text",
            subtype: "hardcoded id",
            label: id,
            position: pos,
            to: shortenedId,
          };
        }
      }
      return {
        ...ast,
        hasParameters: parameters,
        hasEndpointByInterpretedTokens: this.fromTokensToString(ast.hasInterpretedTokens),
      };
    }

    static async glob(...args) {
      const parsed = await this.interpret(...args);
      const fastGlob = require("fast-glob");
      return await fastGlob(parsed.hasInterpretedEndpoint); 
    }

  };

  return NwtFiletreeSelectorInterpreter;

});