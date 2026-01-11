# Nwt Tester API

API para ejecutar tests asíncronos encadenados.

## Exposición

Se expone a través de:

```js
// Clase:
NwtTester
NwtFramework.Tester
Vue.prototype.$nwt.tester

// Instancia global:
NwtTester.global // instancia
Vue.prototype.$tester // instancia
Vue.prototype.$tester === NwtTester.global // instancia
```

## Ventajas

La API permite:

- encadenar un test dentro de otro con `test.define` y `test.run`
- definir un test para ejecutar luego con `test.define`
- ejecutar un test con `test.run`
- hacer una aserción con `assertion`
- enlazarlo con un widget gráfico automático con `<nwt-tester-viewer :tester="tester" />`

## API

Puedes instanciar un nuevo tester con:

```js
const tester1 = new NwtTester();
const tester2 = NwtTester.create();
```

La API se acaba exponiendo por:

```js
tester.define("Test ID", (subtest, assertion) => {
  subtest.define("Test ID", (subtest, assertion) => {
    assertion(true, "Assertion message");
    assertion(true, "Assertion message");
    assertion(true, "Assertion message");
  });
});
await tester.run("Test ID", (subtest, assertion) => {
  subtest.define("Test ID", (subtest, assertion) => {
    assertion(false, "Assertion message"); // No lanza un error
    assertion(true, "Assertion message");
    assertion(true, "Assertion message");
  });
});
```

Así que son:

- `tester.define(name:String, callback:AsyncFunction)`
   - para definir tests tardíos
   - útil para dejar la traza de lo que se va a hacer desde el principio
   - donde el callback recibe:
      - `subtest:NwtTester`: subtest del que pueden colgar sus propios hijos
      - `assertion:Function`: método para añadir aserciones al test
- `tester.run(name:String, callback:AsyncFunction)`
   - para correr tests inmediatos
   - útil en instancias ya iniciadas, tests dinámicos y predecir mejor el comportamiento
   - donde el callback recibe lo mismo que `tester.define`
- `assertion(condition:Boolean, message:String)`


## Test de ejemplo

El test de ejemplo es este:

```js
NwtTester.global.define("1 - Test", async test => {
  await NwtTimer.timeout(1000);
  await test.run("1.0 - Test inicial", async (test, assertion) => {
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    assertion(true, "Test suite is working");
    await NwtTimer.timeout(1000);
    await test.run("1.0.1 - Test inicial 1", async (test, assertion) => {
      assertion(true, "Test suite is working 0/5");
      assertion(true, "Test suite is working 1/5");
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 3/5");
      assertion(true, "Test suite is working 4/5");
      assertion(true, "Test suite is working 5/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.2 - Test inicial 2", async (test, assertion) => {
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 2/5");
      assertion(true, "Test suite is working 2/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.3 - Test inicial 3", async (test, assertion) => {
      assertion(true, "Test suite is working 3/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.4 - Test inicial 4", async (test, assertion) => {
      assertion(true, "Test suite is working 4/5");
    });
    await NwtTimer.timeout(1000);
    await test.run("1.0.5 - Test inicial 5", async (test, assertion) => {
      assertion(true, "Test suite is working 5/5");
    });
  });
  test.define("1.1 - Test de globales", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.1.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.1.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.1.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
  test.define("1.2 - Test de globales 2", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.2.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.2.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.2.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
  test.define("1.3 - Test de globales 3", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.3.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.3.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.3.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
  test.define("1.4 - Test de globales 4", async (test, assertion) => {
    await NwtTimer.timeout(1000);
    test.define("1.4.1 - Global NwtFramework", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtFramework !== "undefined", "NwtFramework must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.4.2 - Global NwtAsserter", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtAsserter !== "undefined", "NwtAsserter must exist");
    });
    await NwtTimer.timeout(1000);
    test.define("1.4.3 - Global NwtTester", async () => {
      await NwtTimer.timeout(1000);
      assertion(typeof NwtTester !== "undefined", "NwtTester must exist");
    });
  });
});
```

