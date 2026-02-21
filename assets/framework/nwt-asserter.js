/**
 * 
 * # Nwt Asserter API
 * 
 * API para aserciones y comprobaciones de test a nivel más elemental.
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * NwtAsserter
 * NwtAsserter.global // instancia
 * assertion // instancia
 * NwtAsserter.global === assertion
 * ```
 * 
 * ## Ventajas
 * 
 * Se usa así:
 * 
 * ```js
 * assertion(1 === 2, "1 must equal 1");
 * ```
 * 
 * Para personalizar el gestor de errores y aciertos:
 * 
 * ```js
 * assertion.setErrorCallback(error => {
 *   // Do something with the AssertionError
 * });
 * assertion.setSuccessCallback(errorMessage => {
 *   // Do something with the success and the non-thrown error message
 * });
 * ```
 * 
 * Puedes crear un nuevo assertion así:
 * 
 * ```js
 * const otherAssertion = NwtAsserter.createAssertionFunction((message) => {
 *   console.log("[*] Assertion succeded: " + message);
 * }, error => {
 *   console.log("[!] Assertion failed: " + error.message);
 * });
 * otherAssertion(true, "Assertion 1");
 * otherAssertion(true, "Assertion 2");
 * otherAssertion(false, "Assertion 3");
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtAsserter'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtAsserter'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtAsserter = class {

    static AssertionError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "AssertionError";
      }
    }

    static noop() {}

    static createAssertionFunction(onSuccess = this.noop, onError = this.noop) {
      trace("NwtAsserter.createAssertionFunction");
      const asserter = function(condition, errorMessage) {
        if(condition) {
          return asserter.onSuccess(errorMessage);
        }
        const assertionError = new NwtAsserter.AssertionError(errorMessage);
        const avoidThrowing = asserter.onError(assertionError);
        if(typeof avoidThrowing !== "undefined") {
          return avoidThrowing;
        }
        throw assertionError;
      };
      asserter.onSuccess = onSuccess;
      asserter.onError = onError;
      asserter.setSuccessCallback = function(onSuccessCallback) {
        asserter.onSuccess = onSuccessCallback;
      }
      asserter.setErrorCallback = function(onErrorCallback) {
        asserter.onError = onErrorCallback;
      };
      return asserter;
    }

    static globalizeAssertion(assertion) {
      trace("NwtAsserter.globalizeAssertion");
      if(typeof window !== "undefined") {
        window.assertion = assertion;
      }
      if(typeof global !== "undefined") {
        global.assertion = assertion;
      }
    }

  }

  NwtAsserter.global = NwtAsserter.createAssertionFunction();

  NwtAsserter.silently = NwtAsserter.createAssertionFunction(() => {
    return true;
  }, error => {
    throw error;
  });

  NwtAsserter.globalizeAssertion(NwtAsserter.global);

  return NwtAsserter;

});