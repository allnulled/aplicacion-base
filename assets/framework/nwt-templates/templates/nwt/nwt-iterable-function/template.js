{
  /**<? const onIdentifier = scope.onIdentifier || NwtRandomizer.fromAlphabet(10); ?>**/
  /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionStart || "")?>**/
  try {
    /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onNextIteration || "")?>**/
    this.NWT_ITERABLE_FUNCTION_CONDITION_CALLBACK = async () => {
      /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onCondition || "")?>**/
    };
    this.NWT_ITERABLE_FUNCTION_OUTPUT = undefined;
    this.NWT_ITERABLE_FUNCTION_CONDITION_FLAG = await this.NWT_ITERABLE_FUNCTION_CONDITION_CALLBACK();
    /**<?=onIdentifier + ":"?>**/
    while (this.NWT_ITERABLE_FUNCTION_CONDITION_FLAG) {
      /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationStart || "")?>**/
      try {
        /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onIteration || "")?>**/
        /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationSuccess || "")?>**/
      } catch (error) {
        /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationError || "")?>**/
      } finally {
        /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationFinally || "")?>**/
      }
      /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationEnd || "")?>**/
      this.NWT_ITERABLE_FUNCTION_CONDITION_FLAG = await this.NWT_ITERABLE_FUNCTION_CONDITION_CALLBACK();
      if (!this.NWT_ITERABLE_FUNCTION_CONDITION_FLAG) {
        break /**<?=onIdentifier?>**/;
      }
      /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onInterlapse || "")?>**/
      /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onNextIteration || "")?>**/
      /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onProgression || "")?>**/
    }
    /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionSuccess || "")?>**/
  } catch (error) {
    /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionError || "")?>**/
  } finally {
    /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionFinally || "")?>**/
  }
  /**<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionEnd || "")?>**/
  return this.NWT_ITERABLE_FUNCTION_OUTPUT;
}