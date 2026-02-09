(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtInterruptible'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtInterruptible'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtInterruptible = class {

    static Parallel = class extends Array { };

    static Serial = class extends Array { };

    static buildParallel(reductible) {
      return async ctx => {
        const callbacks = [];
        for (let index = 0; index < reductible.length; index++) {
          const item = reductible[index];
          const callback = this.make(item);
          callbacks.push(callback(ctx));
        }
        return Promise.all(callbacks);
      };
    }

    static buildSerial(reductible) {
      return async ctx => {
        const output = [];
        for (let index = 0; index < reductible.length; index++) {
          const item = reductible[index];
          const callback = this.make(item);
          const result = await callback(ctx, index, item);
          output.push(result);
        }
        return output;
      };
    }

    static buildTryBlock(reductible) {
      const {
        id: id = false,
        start: startBlock = false,
        try: tryBlock = false,
        catch: catchBlock = false,
        if: ifBlock = false,
        consequence: consequenceBlock = false,
        while: whileBlock = false,
        iteration: iterationBlock = false,
        success: successBlock = false,
        finally: finallyBlock = false,
        end: endBlock = false,
      } = reductible;
      const tryCallback = this.make(tryBlock);
      const catchCallback = this.make(catchBlock);
      const ifCallback = this.make(ifBlock);
      const consequenceCallback = this.make(consequenceBlock);
      const whileCallback = this.make(whileBlock);
      const iterationCallback = this.make(iterationBlock);
      const successCallback = this.make(successBlock);
      const finallyCallback = this.make(finallyBlock);
      const startCallback = this.make(startBlock);
      const endCallback = this.make(endBlock);
      assertion(tryBlock !== false, "Parameter «reductible.try» must be set on «NwtInterruptible.buildTryBlock»");
      return async ctx => {
        await startCallback(ctx);
        try {
          await tryCallback(ctx);
          if (await ifCallback(ctx)) {
            await consequenceCallback(ctx);
          }
          while (await whileCallback(ctx)) {
            await iterationCallback(ctx);
          }
          await successCallback(ctx);
        } catch (error) {
          if (NwtInterruptionHandler.isHandlableOrThrow(id, error, ctx)) {
            await catchCallback(error, ctx);
          }
        } finally {
          await finallyCallback(ctx);
        }
        await endCallback(ctx);
      };
    }

    static make(reductible) {
      if (reductible === false) {
        return () => { };
      } else if (typeof reductible === "function") {
        return reductible;
      } else if (reductible instanceof NwtInterruptible.Parallel) {
        return this.buildParallel(reductible);
      } else if (reductible instanceof NwtInterruptible.Serial) {
        return this.buildSerial(reductible);
      } else if (Array.isArray(reductible)) {
        return this.buildSerial(reductible);
      } else if (typeof reductible === "object") {
        return this.buildTryBlock(reductible);
      } else {
        throw new Error("Not supported reductible: " + typeof reductible);
      }
    }

  };

  return NwtInterruptible;

});