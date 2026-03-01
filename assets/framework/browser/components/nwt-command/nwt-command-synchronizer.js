(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCommandSynchronizer'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCommandSynchronizer'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCommandSynchronizer = class {

    static create(...args) {
      trace("NwtCommandSynchronizer.create");
      return new this(...args);
    }

    constructor(settings = {}, cycle = {}) {
      trace("NwtCommandSynchronizer.constructor");
      assertion(typeof settings === "object", `Required parameter «settings» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.cacheable === "boolean", `Required parameter «settings.cacheable» to be boolean on «NwtCommandSynchronizer.constructor»`);
      assertion(Array.isArray(settings.collection), `Required parameter «settings.collection» to be array on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.autoclose === "number", `Required parameter «settings.autoclose» to be number on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.output === "object", `Required parameter «settings.output» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.silent === "boolean", `Required parameter «settings.silent» to be boolean on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.command === "object", `Required parameter «settings.command» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.commandTester === "object", `Required parameter «settings.commandTester» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.commandComponent === "object", `Required parameter «settings.commandComponent» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.assertion === "function", `Required parameter «settings.assertion» to be function on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.dialog === "object", `Required parameter «settings.dialog» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.cacher === "object", `Required parameter «settings.cacher» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.progressBar === "object", `Required parameter «settings.progressBar» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof settings.tester === "object", `Required parameter «settings.tester» to be object on «NwtCommandSynchronizer.constructor»`);
      assertion(typeof cycle === "object", `Required parameter «cycle» to be object on «NwtCommandSynchronizer.constructor»`);
      this.settings = Object.assign(settings, {
        abortController: new AbortController(),
      });
      Object.assign(this, cycle);
    }

    async step(id, output, ...parameters) {
      trace("NwtCommandSynchronizer.prototype.step");
      const cycleFunction = this[id] || undefined;
      let result = undefined;
      if (!cycleFunction) {
        result = undefined;
      } else {
        result = await cycleFunction.call(this, ...parameters, output);
      }
      if ((typeof result === "object") && (result instanceof NwtAbort)) {
        this.settings.abortController.abort(result.value);
      } else {
        // @pordefecto si no es abort, no hacer nada
      }
      return this.settings.abortController.signal.aborted;
    }

    async flush(output = undefined) {
      trace("NwtCommandSynchronizer.prototype.flush");
      Exit_command_by_abort:
      if (this.settings.abortController.signal.aborted) {
        this.settings.dialog.cancel();
        return this.settings.abortController.signal.reason;
      }
      Exit_command_by_process:
      if (this.settings.dialog.process.$closedAt) {
        return new Error(`Command interrupted by process cancelation on «NwtCommandSynchronizer.prototype.onIterationProgress»`);
      }
      Exit_command_by_finished:
      if (typeof output !== "undefined") {
        if (this.settings.autoclose) {
          return NwtTimer.timeout(this.settings.autoclose).then(() => {
            this.settings.dialog.cancel();
          });
        }
      }
    }

    async onStart(collection, output) {
      trace("NwtCommandSynchronizer.prototype.onStart");
      // @VACIO para el uso externo.
    }

    async onIterationStart(item, index, collection, output) {
      trace("NwtCommandSynchronizer.prototype.onIterationStart");
      // @VACIO para el uso externo.
    }

    async onIterationEnd(item, index, collection, output) {
      trace("NwtCommandSynchronizer.prototype.onIterationEnd");
      // @VACIO para el uso externo.
    }

    async onEnd() {
      trace("NwtCommandSynchronizer.prototype.onEnd");
      // @VACIO para el uso externo.
    }

    async onSuccess(collection, output) {
      trace("NwtCommandSynchronizer.prototype.onSuccess");
      // @VACIO para el uso externo.
    }

    async onError(error, collection, output) {
      trace("NwtCommandSynchronizer.prototype.onError");
      console.error(`Error in command synchronizer: ${this.settings.command.getCommandName()}`);
      console.error(error);
      throw error;
    }

    async onFinally(collection, output) {
      trace("NwtCommandSynchronizer.prototype.onFinally");
      // @VACIO para el uso externo.
    }

    async onIterationPreparation(collection, output) {
      trace("NwtCommandSynchronizer.prototype.onIterationPreparation");
      Set_total_in_progress_bar:
      if (collection.length) {
        this.settings.progressBar.total = collection.length;
      }
    }

    async onIterationProgress(item, index, collection, output) {
      trace("NwtCommandSynchronizer.prototype.onIterationProgress");
      Exit_command_by_process:
      if (this.settings.dialog.process.$closedAt) {
        return NwtAbort.create(new Error(`Command interrupted by process cancelation on «NwtCommandSynchronizer.prototype.onIterationProgress»`));
      }
      Exit_command_by_abort:
      if (this.settings.abortController.signal.aborted) {
        this.settings.dialog.cancel();
        return true;
      }
      this.settings.progressBar.advance(1);
    }

    async onIterationIsStepCached(item, index, collection, output) {
      trace("NwtCommandSynchronizer.prototype.onIterationIsStepCached");
      if (this.settings.cacheable) {
        const cached = await this.settings.cacher.loadStep([item]);
        if ((typeof cached === "object") && (cached.done === true)) {
          return cached;
        }
      }
    }

    async onNotify() {
      trace("NwtCommandSynchronizer.prototype.onNotify");
      if (this.settings.silent === false) {
        NwtToasts.show({
          title: `Comando ${this.settings.command.getCommandName()} completado`,
          text: `El comando ${this.settings.command.getCommandName()} fue completado con éxito!`,
        });
      }
      if (this.settings.autoclose === true) {
        this.settings.dialog.cancel();
      }
    }

    async start() {
      trace("NwtCommandSynchronizer.prototype.start");
      let output = [];
      try {
        if (await this.step("onStart", output, this.settings.collection)) return await this.flush();
        if (await this.step("onIterationPreparation", output, this.settings.collection)) return await this.flush();
        for (let index = 0; index < this.settings.collection.length; index++) {
          const item = this.settings.collection[index];
          if (await this.step("onIterationStart", output, item, index, this.settings.collection)) return await this.flush();
          const cachedIteration = await this.step("onIterationIsStepCached", item, index);
          if (cachedIteration) {
            output.push(cachedIteration);
          } else {
            const iterationResult = await this.step("onIterate", output, item, index, this.settings.collection);
            if (typeof iterationResult === "undefined") {
              // @NOTHING
            } else if (iterationResult instanceof NwtAbort) {
              return iterationResult.value;
            } else if ((typeof iterationResult === "object") && (iterationResult.done === true) && (this.settings.cacheable === true)) {
              await this.settings.cacher.saveStep([item], iterationResult);
              output.push(iterationResult);
            } else {
              output.push(iterationResult);
            }
          }
          if (await this.step("onIterationEnd", output, item, index, this.settings.collection)) return await this.flush();
          if (await this.step("onIterationProgress", output, item, index, this.settings.collection)) return await this.flush();
        }
        if (await this.step("onNotify", output, this.settings.collection)) return await this.flush();
        if (await this.step("onEnd", output, this.settings.collection)) return await this.flush();
        if (await this.step("onSuccess", output, this.settings.collection)) return await this.flush();
        return await this.flush(output);
      } catch (error) {
        if (await this.step("onError", output, error, this.settings.collection)) return await this.flush();
      } finally {
        if (await this.step("onFinally", output, this.settings.collection)) return await this.flush();
      }
    }

  };

  return NwtCommandSynchronizer;

});