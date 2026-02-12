/**
 * 
 * # Nwt Tester API
 * 
 * API para ejecutar tests asíncronos encadenados.
 * 
 * ## Exposición
 * 
 * Se expone a través de:
 * 
 * ```js
 * // Clase:
 * NwtTester
 * NwtFramework.Tester
 * Vue.prototype.$nwt.tester
 * 
 * // Instancia global:
 * NwtTester.global // instancia
 * Vue.prototype.$tester // instancia
 * Vue.prototype.$tester === NwtTester.global // instancia
 * ```
 * 
 * ## Ventajas
 * 
 * La API permite:
 * 
 * - encadenar un test dentro de otro con `test.define` y `test.run`
 * - definir un test para ejecutar luego con `test.define`
 * - ejecutar un test con `test.run`
 * - hacer una aserción con `assertion`
 * - enlazarlo con un widget gráfico automático con `<nwt-tester-viewer :tester="tester" />`
 * 
 * ## API
 * 
 * Puedes instanciar un nuevo tester con:
 * 
 * ```js
 * const tester1 = new NwtTester();
 * const tester2 = NwtTester.create();
 * ```
 * 
 * La API se acaba exponiendo por:
 * 
 * ```js
 * tester.define("Test ID", (subtest, assertion) => {
 *   subtest.define("Test ID", (subtest, assertion) => {
 *     assertion(true, "Assertion message");
 *     assertion(true, "Assertion message");
 *     assertion(true, "Assertion message");
 *   });
 * });
 * await tester.run("Test ID", (subtest, assertion) => {
 *   subtest.define("Test ID", (subtest, assertion) => {
 *     assertion(false, "Assertion message"); // No lanza un error
 *     assertion(true, "Assertion message");
 *     assertion(true, "Assertion message");
 *   });
 * });
 * ```
 * 
 * Así que son:
 * 
 * - `tester.define(name:String, callback:AsyncFunction)`
 *    - para definir tests tardíos
 *    - útil para dejar la traza de lo que se va a hacer desde el principio
 *    - donde el callback recibe:
 *       - `subtest:NwtTester`: subtest del que pueden colgar sus propios hijos
 *       - `assertion:Function`: método para añadir aserciones al test
 * - `tester.run(name:String, callback:AsyncFunction)`
 *    - para correr tests inmediatos
 *    - útil en instancias ya iniciadas, tests dinámicos y predecir mejor el comportamiento
 *    - donde el callback recibe lo mismo que `tester.define`
 * - `assertion(condition:Boolean, message:String)`
 * 
 * 
 * ## Test de ejemplo
 * 
 * El test de ejemplo es este:
 * 
 * ```js
 * NwtTester.global.define("1 - Test", async test => {
 *   await NwtTimer.timeout(1000);
 *   await test.run("1.0 - Test inicial", async (test, assertion) => {
 *     assertion(true, "Test suite is working");
 *     assertion(true, "Test suite is working");
 *     assertion(true, "Test suite is working");
 *     assertion(true, "Test suite is working");
 *     assertion(true, "Test suite is working");
 *     assertion(true, "Test suite is working");
 *     await NwtTimer.timeout(1000);
 *     await test.run("1.0.1 - Test inicial 1", async (test, assertion) => {
 *       assertion(true, "Test suite is working 0/5");
 *       assertion(true, "Test suite is working 1/5");
 *       assertion(true, "Test suite is working 2/5");
 *       assertion(true, "Test suite is working 3/5");
 *       assertion(true, "Test suite is working 4/5");
 *       assertion(true, "Test suite is working 5/5");
 *     });
 *     await NwtTimer.timeout(1000);
 *     await test.run("1.0.2 - Test inicial 2", async (test, assertion) => {
 *       assertion(true, "Test suite is working 2/5");
 *       assertion(true, "Test suite is working 2/5");
 *       assertion(true, "Test suite is working 2/5");
 *       assertion(true, "Test suite is working 2/5");
 *     });
 *     await NwtTimer.timeout(1000);
 *     await test.run("1.0.3 - Test inicial 3", async (test, assertion) => {
 *       assertion(true, "Test suite is working 3/5");
 *     });
 *     await NwtTimer.timeout(1000);
 *     await test.run("1.0.4 - Test inicial 4", async (test, assertion) => {
 *       assertion(true, "Test suite is working 4/5");
 *     });
 *     await NwtTimer.timeout(1000);
 *     await test.run("1.0.5 - Test inicial 5", async (test, assertion) => {
 *       assertion(true, "Test suite is working 5/5");
 *     });
 *   });
 *   test.define("1.1 - Test de globales", async (test, assertion) => {
 *     await NwtTimer.timeout(1000);
 *     test.define("1.1.1 - Global NwtFramework", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.1.2 - Global NwtAsserter", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.1.3 - Global NwtTester", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
 *     });
 *   });
 *   test.define("1.2 - Test de globales 2", async (test, assertion) => {
 *     await NwtTimer.timeout(1000);
 *     test.define("1.2.1 - Global NwtFramework", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.2.2 - Global NwtAsserter", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.2.3 - Global NwtTester", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
 *     });
 *   });
 *   test.define("1.3 - Test de globales 3", async (test, assertion) => {
 *     await NwtTimer.timeout(1000);
 *     test.define("1.3.1 - Global NwtFramework", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.3.2 - Global NwtAsserter", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.3.3 - Global NwtTester", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
 *     });
 *   });
 *   test.define("1.4 - Test de globales 4", async (test, assertion) => {
 *     await NwtTimer.timeout(1000);
 *     test.define("1.4.1 - Global NwtFramework", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.4.2 - Global NwtAsserter", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
 *     });
 *     await NwtTimer.timeout(1000);
 *     test.define("1.4.3 - Global NwtTester", async () => {
 *       await NwtTimer.timeout(1000);
 *       assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
 *     });
 *   });
 * });
 * ```
 * 
 */
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtTester'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtTester'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtTesterAssertion = class {

    static create(...args) {
      return new this(...args);
    }

    constructor(message, condition, level, tester) {
      if (typeof name !== "string") {
        throw new NwtAsserter.AssertionError("Parameter «name» must be a string on «NwtTesterAssertion.constructor»");
      }
      this.name = message;
      this.status = condition ? "ok" : "failed";
      this.level = level;
      if(this.status === "failed") {
        this.errorMoment = NwtTimer.secondsDiff(new Date(), (tester.root || tester).startedAt);
      } else if(this.status === "ok") {
        this.successMoment = NwtTimer.secondsDiff(new Date(), (tester.root || tester).startedAt);
      }
      this.totalTime = NwtTimer.secondsDiff(new Date(), tester.startedAt);
      this.parent = tester;
    }

  };
  
  const NwtTester = class {

    static Assertion = NwtTesterAssertion;

    static default = this;

    static create(...args) {
      return new this(...args);
    }

    static defaultHooks = {
      onTestSuccess(tester) {
        // @OK
      },
      onTestDefined(tester, subtester) {
        // @OK
      },
      onTestFailure(tester, error) {
        NwtToasts.showError(error);
      }
    }

    constructor(name, callback, hooks = {}, parent = null, root = null, level = 0) {
      trace("NwtTester.constructor");
      if (typeof name !== "string") {
        throw new NwtAsserter.AssertionError("Parameter «name» must be a string on «NwtTester.constructor»");
      }
      if (typeof callback !== "function") {
        throw new NwtAsserter.AssertionError("Parameter «callback» must be a function on «NwtTester.constructor»");
      }
      if (typeof hooks !== "object") {
        throw new NwtAsserter.AssertionError("Parameter «hooks» must be an object on «NwtTester.constructor»");
      }
      this.name = name;
      this.callback = callback;
      this.hooks = Object.assign({}, this.constructor.defaultHooks, hooks);
      this.children = [];
      this.parent = parent;
      this.level = level;
      this.root = root;
      this.accumulatedErrors = [];
      this.status = "pending";
      this.startedAt = null;
      this.progressBar = this.parent ? this.parent.progressBar.subprogress({ total: 1, current: 0, weight: 1 }) : NwtProgressBar.create({ total: 1, current: 0, weight: 1 });
    }

    define(name, callback) {
      trace("NwtTester.prototype.define");
      const test = new NwtTester(name, callback, this.hooks, this, this.root || this, this.level+1);
      this.children.push(test);
      this.progressBar.total = this.children.length;
      this.hooks.onTestDefined(this, test);
      return test;
    }

    async run(name, callback) {
      trace("NwtTester.prototype.run");
      const test = this.define(name, callback);
      await test.start();
      return test;
    }

    failBranch(subtest, error) {
      trace("NwtTester.prototype.failBranch");
      subtest.accumulatedErrors.push(error);
      let parent = subtest.parent;
      while(parent !== null) {
        subtest.status = "failed";
        subtest.accumulatedErrors.push(error);
        parent = subtest.parent || null;
      }
    }

    async start() {
      trace("NwtTester.prototype.start");
      try {
        this.startedAt = new Date();
        const tester = this;
        const assertion = NwtAsserter.createAssertionFunction(
          message => {
            const assertionItem = NwtTesterAssertion.create(message, true, tester.level + 1, tester);
            tester.children.push(assertionItem);
          },
          error => {
            const assertionItem = NwtTesterAssertion.create(error.name + ":" + error.message, false, tester.level + 1, tester);
            console.error("Error asserting on test: " + tester.name);
            console.error(error);
            tester.children.push(assertionItem);
            tester.failBranch(tester);
            this.hooks.onTestFailure(this, error);
            return true;
          }
        );
        if (this.status === "pending") {
          try {
            this.status = "running";
            await this.callback(this, assertion, this.progressBar);
          } catch (error) {
            this.status = "failed";
            this.failBranch(this, error);
            return this.hooks.onTestFailure(this, error);
          }
        }
        for (const subtest of this.children) {
          try {
            if(subtest.start) {
              await subtest.start();
            }
          } catch (error) {
            this.status = "failed";
            this.failBranch(subtest, error);
            return this.hooks.onTestFailure(this, error);
          }
        }
        if(this.accumulatedErrors.length) {
          throw new Error(`Test «${this.name}» failed with ${this.accumulatedErrors.length} errors`);
        }
        this.status = "ok";
        this.successMoment = NwtTimer.secondsDiff(new Date(), (this.root || this).startedAt);
        this.totalTime = NwtTimer.secondsDiff(new Date(), this.startedAt);
        this.hooks.onTestSuccess(this);
      } catch (err) {
        this.status = "failed";
        this.hooks.onTestFailure(this, err);
      }
    }

  };

  NwtTester.global = new NwtTester("Global tester instance", async function () {});

  return NwtTester;

});