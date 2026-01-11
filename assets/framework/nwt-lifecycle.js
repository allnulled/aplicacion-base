(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtLifecycle'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtLifecycle'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtLifecycleController = class {
    constructor(composition) {
      this.composition = composition;
    }
  };

  const NwtLifecycle = class {

    static Controller = NwtLifecycleController;

    static create(...args) {
      return new this(...args);
    }

    static defaultOptions = {
      onLifecycleStarted: async function () {
        trace("NwtLifecycle.instance.onLifecycleStarted");
      },
      onLifecycleReturn: async function () {
        trace("NwtLifecycle.instance.onLifecycleReturn");
      },
      onLifecycleCatch: async function () {
        trace("NwtLifecycle.instance.onLifecycleCatch");
      },
      onLifecycleFinally: async function () {
        trace("NwtLifecycle.instance.onLifecycleFinally");
      },
      onEachStepBefore: async function () { },
      onEachStepAfter: function () { },
      onIterate: async function () {
        trace("NwtLifecycle.instance.onIterate");
        try {
          await this.onLifecycleStarted.call(this);
          for (let indexComponent = 0; indexComponent < this.composition.length; indexComponent++) {
            const component = this.composition[indexComponent];
            this.onEachStepBefore.call(this, component);
            if (typeof component === "function") {
              component.call(this);
            } else if (Array.isArray(component)) {
              throw new Error("Not supported yet");
            } else if (component instanceof this.controllers.Serie) {
              this.defaults.serie(component.composition, component, this);
            } else if (component instanceof this.controllers.Parallel) {
              this.defaults.parallel(component.composition, component, this);
            } else if (component instanceof this.controllers.Cycle) {
              this.defaults.cycle(component.composition, component, this);
            } else if (component instanceof this.controllers.Break) {
              this.defaults.break(component.composition, component, this);
            } else if (component instanceof this.controllers.Continue) {
              this.defaults.continue(component.composition, component, this);
            } else if (component instanceof this.controllers.Return) {
              this.defaults.return(component.composition, component, this);
            } else if (component instanceof this.controllers.If) {
              this.defaults.if(component.composition, component, this);
            } else if (component instanceof this.controllers.ElseIf) {
              this.defaults.elseif(component.composition, component, this);
            } else if (component instanceof this.controllers.Else) {
              this.defaults.else(component.composition, component, this);
            } else if (component instanceof this.controllers.For) {
              this.defaults.for(component.composition, component, this);
            } else if (component instanceof this.controllers.From) {
              this.defaults.from(component.composition, component, this);
            } else if (component instanceof this.controllers.While) {
              this.defaults.while(component.composition, component, this);
            } else if (component instanceof this.controllers.Until) {
              this.defaults.until(component.composition, component, this);
            } else if (component instanceof this.controllers.Try) {
              this.defaults.try(component.composition, component, this);
            } else if (component instanceof this.controllers.Catch) {
              this.defaults.catch(component.composition, component, this);
            } else if (component instanceof this.controllers.Finally) {
              this.defaults.finally(component.composition, component, this);
            }
            this.onEachStepAfter.call(this, component);
          }
          await this.onLifecycleReturn.call(this);
        } catch (error) {
          await this.onLifecycleCatch.call(this, error);
        } finally {
          const interception = await this.onLifecycleFinally.call(this);
          if (typeof interception !== "undefined") {
            return interception;
          }
        }
      },
    };

    constructor(...args) {
      super(...args);
      const [options = {}, userComposition = []] = args;
      this.options = Object.assign({}, this.constructor.defaultOptions, options);
      this.composition = [];
      this.compose(userComposition);
      this.controllers = {
        Serie: class extends this.constructor.Controller { },
        Parallel: class extends this.constructor.Controller { },
        Return: class extends this.constructor.Controller { },
        For: class extends this.constructor.Controller { },
        From: class extends this.constructor.Controller { },
        While: class extends this.constructor.Controller { },
        Until: class extends this.constructor.Controller { },
        Throw: class extends this.constructor.Controller { },
        /*
        Try: class extends this.constructor.Controller { },
        Catch: class extends this.constructor.Controller { },
        Finally: class extends this.constructor.Controller { },
        //*/
      };
    }

    compose(userComposition) {
      trace("NwtLifecycle.prototype.compose");
      this.validateComposition(composition);
      const composition = typeof userComposition === "function" ? userComposition(this) : userComposition;
      this.composition = composition;
      return this;
    }

    validateComposition(composition) {
      trace("NwtLifecycle.prototype.validateComposition");
      assertion((typeof composition === "function") || Array.isArray(composition), "Parameter «composition» must be an array on «NwtLifecycle.prototype.validateComposition»");
    }

    async start() {
      trace("NwtLifecycle.prototype.start");

    }

  };

  Test_de_ejemplo: {

    NwtLifecycle.create((cycle, { Serie, Parallel, Return, Block, TimeoutLog }) => {
      return {
        prescript: (context) => {
          const { state, step, metadata, api } = context;
        },
        postscript: () => {

        },
        injections: () => {
          return {
            name: "Whatever",
            result: 500 + 5,
            external: {}
          };
        },
        steps: [
          Serie([
            TimeoutLog(1000, "Serie 1.1"),
            TimeoutLog(1000, "Serie 1.2"),
            TimeoutLog(1000, "Serie 1.3"),
          ]),
          Parallel([
            TimeoutLog(1000, "Parallel step 1.A"),
            TimeoutLog(1000, "Parallel step 1.B"),
            TimeoutLog(1000, "Parallel step 1.C"),
          ]),
          Return({
            cycle: cycle,
            returner: () => "Lifecycle ended with status 200/1"
          }),
          Iteration({
            prescript: () => { const specificProperty = this.specific.property; },
            data: () => [{
              name: "Row name",
              value: "Row value"
            }, {
              name: "Row name",
              value: "Row value"
            }, {
              name: "Row name",
              value: "Row value"
            }],
            checker: () => { return typeof specificProperty !== "number"; },
            initializer: () => { return specificProperty = 0; },
            breaker: () => { return specificProperty !== 10; },
            progresser: () => { return specificProperty++; },
            arguments: ["item", "index"],
            iterator: () => {
              console.log(index, item);
            }
          })
        ]
      }
    })

  }

});