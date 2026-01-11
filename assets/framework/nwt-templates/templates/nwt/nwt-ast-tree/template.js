{
  const /**<?=localMemoryName?>**/localMemory = {};
  /**<?#onFunctionStart?>**/
  /**<?#onInitializeCollection?>**/
  /**<?#onInitializeDimensions?>**/
  try {
    /**<?#onNextIteration?>**/
    /**<?=localMemoryName?>**/localMemory.conditionalCallback = async () => {
      /**<?#onCondition?>**/
    };
    /**<?=localMemoryName?>**/localMemory.output = undefined;
    /**<?=localMemoryName?>**/localMemory.conditionalFlag = await /**<?=localMemoryName?>**/localMemory.conditionalCallback();
    /**<?=onIdentifier + ":"?>**/
    while (/**<?=localMemoryName?>**/localMemory.conditionalFlag) {
      /**<?#onIterationStart?>**/
      try {
        /**<?#onIteration?>**/
        /**<?#onIterationSuccess?>**/
      } catch (error) {
        /**<?#onIterationError?>**/
      } finally {
        /**<?#onIterationFinally?>**/
      }
      /**<?#onIterationEnd?>**/
      /**<?=localMemoryName?>**/localMemory.conditionalFlag = await /**<?=localMemoryName?>**/localMemory.conditionalCallback();
      if (!/**<?=localMemoryName?>**/localMemory.conditionalFlag) {
        break /**<?=onIdentifier?>**/;
      }
      /**<?#onInterlapse?>**/
      /**<?#onNextIteration?>**/
      /**<?#onProgression?>**/
    }
    /**<?#onFunctionSuccess?>**/
  } catch (error) {
    /**<?#onFunctionError?>**/
  } finally {
    /**<?#onFunctionFinally?>**/
  }
  /**<?#onFunctionEnd?>**/
  return /**<?=localMemoryName?>**/localMemory.output;
}