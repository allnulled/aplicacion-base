(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtInterruptionHandler'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtInterruptionHandler'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtInterruptionHandler = class {

    static isHandlable(id, error) {
      if (!(error instanceof NwtInterruption)) {
        return false;
      }
      let broker;
      if (error.id !== undefined) broker = error.id;
      else if (error.levels !== undefined) broker = error.levels;
      else broker = error.simple;
      if (typeof broker === "string") {
        return id === broker;
      } else if (typeof broker === "number") {
        error.levels--;
        return error.levels < 0;
      } else if (broker === true) {
        return true;
      }
      return false;
    }

    static isHandlableOrThrow(id, error, context = {}) {
      if (!this.isHandlable(id, error)) {
        throw error;
      }
      if (typeof error.payload === "function") {
        error.payload(context);
      }
      return true;
    }

  };

  return NwtInterruptionHandler;

});