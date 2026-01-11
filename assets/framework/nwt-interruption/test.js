const test = async function () {

  Example_by_labels: {

    let footprints = [];
    try {
      try {
        console.log("Step 1");
        console.log("Step 2");
        console.log("Step 3");
        throw NwtInterruption.id("loop 1");
      } catch (error) {
        if (NwtInterruptionHandler.isHandlableOrThrow("loop 2", error)) {
          footprints.push("handled by loop 2");
          if (typeof error.return !== "undefined") return error.return;
        }
      }
    } catch (error) {
      if (NwtInterruptionHandler.isHandlableOrThrow("loop 1", error)) {
        footprints.push("handled by loop 1");
        if (typeof error.return !== "undefined") return error.return;
      }
    }
    assertion(footprints.length === 1, "Solo debería haber pasado por el loop 1");
    assertion(footprints[0] === "handled by loop 1", "Solo debería haber saltado por el catch del loop 1");

  }

  Example_by_levels: {

    let footprints = [];
    const callback = () => {
      try {
        try {
          try {
            console.log("Step 1");
            console.log("Step 2");
            console.log("Step 3");
            throw NwtInterruption.levels(1, { msg: "ok" }, () => {
              console.log("Handled by any loop");
            });
          } catch (error) {
            if (NwtInterruptionHandler.isHandlableOrThrow("loop 3", error)) {
              footprints.push("handled by loop 3");
              if (typeof error.return !== "undefined") return error.return;
            }
          }
          console.log("If loop 3 did not return anything, it continues here");
        } catch (error) {
          if (NwtInterruptionHandler.isHandlableOrThrow("loop 2", error)) {
            footprints.push("handled by loop 2");
            if (typeof error.return !== "undefined") return error.return;
          }
        }
        console.log("If loop 2 did not return anything, it continues here");
      } catch (error) {
        console.error(error);
        footprints.push("handled by loop 1");
      }
      console.log("If loop 1 did not return anything, it continues here");

    };
    const output = callback();
    assertion(typeof output === "object", "Debería retornar un objeto (1)");
    assertion(typeof output.msg === "string", "Debería retornar un string (2)");
    assertion(output.msg === "ok", "Debería retornar un string con 'ok' (3)");
    assertion(footprints.length === 1, "Solo debería haber pasado por loop 2");
    assertion(footprints[0] === "handled by loop 2", "Solo debería haber saltado por el catch del loop 2");

  }

  Example_by_levels: {

    let footprints = [];
    const callback = () => {
      try {
        try {
          try {
            console.log("Step 1");
            console.log("Step 2");
            console.log("Step 3");
            throw NwtInterruption.levels(2, undefined, () => {
              console.log("Handled by any loop");
            });
          } catch (error) {
            if (NwtInterruptionHandler.isHandlableOrThrow("loop 3", error)) {
              footprints.push("handled by loop 3");
              if (typeof error.return !== "undefined") return error.return;
            }
          }
          console.log("If loop 3 did not return anything, it continues here");
          return 300;
        } catch (error) {
          if (NwtInterruptionHandler.isHandlableOrThrow("loop 2", error)) {
            footprints.push("handled by loop 2");
            if (typeof error.return !== "undefined") return error.return;
          }
        }
        console.log("If loop 2 did not return anything, it continues here");
        return 200;
      } catch (error) {
        if (NwtInterruptionHandler.isHandlableOrThrow("loop 1", error)) {
          footprints.push("handled by loop 1");
          if (typeof error.return !== "undefined") return error.return;
        }
      }
      console.log("If loop 1 did not return anything, it continues here");
      return 100;
    };
    const output = callback();
    assertion(typeof output === "number", "Debería retornar un number (2.1)");
    assertion(output === 100, "Debería retornar un 100 (2.1)");
    assertion(footprints.length === 1, "Solo debería haber pasado por loop 1");
    assertion(footprints[0] === "handled by loop 1", "Solo debería haber saltado por el catch del loop 1");

  }

  Example_looper_make: {

    const footprints = [];

    const cycle = NwtInterruptible.make([
      {
        id: "Loop 1",
        catch: error => { footprints.push("Catched by Loop 1") },
        try: () => { throw NwtInterruption.id("Loop 1") },
      },
      {
        id: "Loop 2",
        catch: error => { footprints.push("Catched by Loop 2") },
        try: {
          id: "Loop 2.1",
          catch: error => { footprints.push("Catched by Loop 2.1") },
          try: () => { throw NwtInterruption.id("Loop 2") }
        },
      },
      {
        id: "Loop 3",
        catch: error => { footprints.push("Catched by Loop 3") },
        try: {
          id: "Loop 3.1",
          catch: error => { footprints.push("Catched by Loop 3.1") },
          try: {
            id: "Loop 3.1.1",
            catch: error => { footprints.push("Catched by Loop 3.1") },
            try: () => { throw NwtInterruption.id("Loop 3") }
          }
        },
      },
      {
        id: "Loop 4",
        catch: error => { footprints.push("Catched by Loop 4") },
        try: [{
          id: "Loop 4.1",
          catch: error => { footprints.push("Catched by Loop 4.1") },
          try: new NwtInterruptible.Parallel({
            id: "Loop 4.1.1",
            catch: error => { footprints.push("Catched by Loop 4.1.1") },
            try: () => { }
          }, {
            id: "Loop 4.1.2",
            catch: error => { footprints.push("Catched by Loop 4.1.2") },
            try: () => { }
          }, {
            id: "Loop 4.1.2",
            catch: error => { footprints.push("Catched by Loop 4.1.2") },
            try: () => { }
          }, {
            id: "Loop 4.1.3",
            catch: error => { footprints.push("Catched by Loop 4.1.3") },
            try: () => { }
          }, {
            id: "Loop 4.1.4",
            catch: error => { footprints.push("Catched by Loop 4.1.4") },
            try: () => { }
          }, {
            id: "Loop 4.1.5",
            catch: error => { footprints.push("Catched by Loop 4.1.5") },
            try: () => { throw NwtInterruption.id("Loop 4.1") }
          })
        }, {
          try: () => console.log("Llegó al final")
        }],
      }
    ]);
    await cycle();
    console.log(footprints);
    assertion(footprints.length === 4, "Debería haber 4 porque se ha interrumpido 4 veces");
    assertion(footprints[0] === "Catched by Loop 1", "Debería ir por orden (5)");
    assertion(footprints[1] === "Catched by Loop 2", "Debería ir por orden (6)");
    assertion(footprints[2] === "Catched by Loop 3", "Debería ir por orden (7)");
    assertion(footprints[3] === "Catched by Loop 4.1", "Debería ir por orden (8)");

  }

};

test().then(() => {
  console.log("ok, finit");
});




