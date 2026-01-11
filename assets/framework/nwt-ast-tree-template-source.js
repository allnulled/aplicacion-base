(function (factory) {
      const mod = factory();
      if (typeof window !== 'undefined') {
        window['NwtAstTreeTemplateSource'] = mod;
      }
      if (typeof global !== 'undefined') {
        global['NwtAstTreeTemplateSource'] = mod;
      }
      if (typeof module !== 'undefined') {
        module.exports = mod;
      }
    })(function () {
      return "{\n  const /**<?=localMemoryName?>**/localMemory = {};\n  /**<?#onFunctionStart?>**/\n  /**<?#onInitializeCollection?>**/\n  /**<?#onInitializeDimensions?>**/\n  try {\n    /**<?#onNextIteration?>**/\n    /**<?=localMemoryName?>**/localMemory.conditionalCallback = async () => {\n      /**<?#onCondition?>**/\n    };\n    /**<?=localMemoryName?>**/localMemory.output = undefined;\n    /**<?=localMemoryName?>**/localMemory.conditionalFlag = await /**<?=localMemoryName?>**/localMemory.conditionalCallback();\n    /**<?=onIdentifier + \":\"?>**/\n    while (/**<?=localMemoryName?>**/localMemory.conditionalFlag) {\n      /**<?#onIterationStart?>**/\n      try {\n        /**<?#onIteration?>**/\n        /**<?#onIterationSuccess?>**/\n      } catch (error) {\n        /**<?#onIterationError?>**/\n      } finally {\n        /**<?#onIterationFinally?>**/\n      }\n      /**<?#onIterationEnd?>**/\n      /**<?=localMemoryName?>**/localMemory.conditionalFlag = await /**<?=localMemoryName?>**/localMemory.conditionalCallback();\n      if (!/**<?=localMemoryName?>**/localMemory.conditionalFlag) {\n        break /**<?=onIdentifier?>**/;\n      }\n      /**<?#onInterlapse?>**/\n      /**<?#onNextIteration?>**/\n      /**<?#onProgression?>**/\n    }\n    /**<?#onFunctionSuccess?>**/\n  } catch (error) {\n    /**<?#onFunctionError?>**/\n  } finally {\n    /**<?#onFunctionFinally?>**/\n  }\n  /**<?#onFunctionEnd?>**/\n  return /**<?=localMemoryName?>**/localMemory.output;\n}"
    });