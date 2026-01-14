# NwtIterableFunction

API para crear funciones iterables. Templated-code approach.

Esta API usa por debajo:

```js
await NwtTemplates.global.compile.tjs.file.to.async(
  "nwt/nwt-iterable-function/template.js", // Que está aquí: assets/framework/nwt-templates/templates/nwt/nwt-iterable-function/template.js
  { ...this.iterable.onCompiledArguments, iterable: this.iterable },
  Object.keys({ ...this.iterable.onCompiledArguments, iterable: this.iterable }),
);
```

## Exposición

```js
NwtIterableFunction
NwtFramework.IterableFunction
Vue.prototype.$nwt.IterableFunction
```

## Ventajas

```js
NwtIterableFunction.utils.fromFunctionToBodyString(callback:Function):String; // usa por debajo NwtCodeComposer.getBlankFunctionBody(...)
NwtIterableFunction.utils.fromCollectionToArray(collection:Array|Object):Array; // homogeneiza arrays y objetos
await NwtIterableFunction.run({
  onWasStarted: ...,
  onIndex: ...,
  onItem: ...,
  onKey: ...,
  onValue: ...,
  onIdentifier: ...,
  onCollection: ...,
  onCompiledArguments: ...,
  onNextIteration: ...,
  onInterlapse: ...,
  onCompileCollection: ...,
  onCompileCode: ...,
  onCondition: ...,
  onProgression: ...,
  onIteration: ...,
  onRun: ...,
  onFunctionStart: ...,
  onFunctionSuccess: ...,
  onFunctionError: ...,
  onFunctionFinally: ...,
  onFunctionEnd: ...,
  onIterationStart: ...,
  onIterationSuccess: ...,
  onIterationError: ...,
  onIterationFinally: ...,
  onIterationEnd: ...,
  onAbortion: ...,
});
```

