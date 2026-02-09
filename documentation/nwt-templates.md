# NwtTemplates

API para la gestión de plantillas.



<?=",
        peg$c2 = peg$literalExpectation("/**<?=", false),
        peg$c3 = function(e) {
          return { type: "evaluation", value: e };
        },
        peg$c4 = "/**<?#",
        peg$c5 = peg$literalExpectation("/**<?#", false),
        peg$c6 = function(e) {
          return { type: "fragment", value: e };
        },
        peg$c7 = "/**<?",
        peg$c8 = peg$literalExpectation("/**<?", false),
        peg$c9 = "=",
        peg$c10 = peg$literalExpectation("=", false),
        peg$c11 = "#",
        peg$c12 = peg$literalExpectation("#", false),
        peg$c13 = function(c) {
          return { type: "code", value: c };
        },
        peg$c14 = "?>*

<?=" _ e:Evaluable_content Code_block_end  {
  return { type: "evaluation", value: e };
}

Fragment_block = "/**<?#" _ e:Evaluable_content Code_block_end  {
  return { type: "fragment", value: e };
}

Code_block = "/**<?" !("=" / "#") _ c:Code_content Code_block_end {
  return { type: "code", value: c };
}

Evaluable_content = (!"?>*



<?=value?>*



<?=user?>*

<?=localMemoryName?>*

<?#onFunctionStart?>*

<?#onInitializeCollection?>*

<?#onInitializeDimensions?>*

<?#onNextIteration?>*

<?=localMemoryName?>*

<?#onCondition?>*

<?=localMemoryName?>*

<?=localMemoryName?>*

<?=localMemoryName?>*

<?=onIdentifier + ":"?>*

<?=localMemoryName?>*

<?#onIterationStart?>*

<?#onIteration?>*

<?#onIterationSuccess?>*

<?#onIterationError?>*

<?#onIterationFinally?>*

<?#onIterationEnd?>*

<?=localMemoryName?>*

<?=localMemoryName?>*

<?=localMemoryName?>*

<?=onIdentifier?>*

<?#onInterlapse?>*

<?#onNextIteration?>*

<?#onProgression?>*

<?#onFunctionSuccess?>*

<?#onFunctionError?>*

<?#onFunctionFinally?>*

<?#onFunctionEnd?>*

<?=localMemoryName?>*

<?=name?>*

<? const onIdentifier = scope.onIdentifier || NwtRandomizer.fromAlphabet(10); ?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionStart || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onNextIteration || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onCondition || "")?>*

<?=onIdentifier + ":"?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationStart || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onIteration || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationSuccess || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationError || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationFinally || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onIterationEnd || "")?>*

<?=onIdentifier?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onInterlapse || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onNextIteration || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onProgression || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionSuccess || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionError || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionFinally || "")?>*

<?=NwtCodeComposer.getBlankFunctionBody(scope.onFunctionEnd || "")?>*







