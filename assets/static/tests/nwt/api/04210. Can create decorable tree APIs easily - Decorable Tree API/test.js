tester.progressBar.total = 3;

tester.progressBar.advance(1);

const o = {
  prop1: {
    prop1_1: 1,
    prop1_2: 2,
    prop1_3: 3,
    prop1_4: [
      400,
      300,
      100,
    ],
    prop1_5: {
      prop1_5_1: 500
    },
  }
};

NwtDecorableTree.install(o);

tester.progressBar.advance(1);

Basic_test: {
  // Primero, que la sintaxis puede ser con 1 string y puntos o con 1 array de strings directamente:
  assertion(o.has("prop1.prop1_1") === o.has(["prop1", "prop1_1"]), "about selectors: this should be true (1)");

  assertion(o.has("prop1.prop1_1") === true, "about has: this should be true (1)");
  assertion(o.has("prop1.prop1_1") === true, "about has: this should be true (1)");
  assertion(o.has("prop1.prop1_2") === true, "about has: this should be true (2)");
  assertion(o.has("prop1.prop1_3") === true, "about has: this should be true (3)");
  assertion(o.has("prop1.prop1_4") === true, "about has: this should be true (4)");
  assertion(o.has("prop1.prop1_4.0") === true, "about has: this should be true (4.0)");
  assertion(o.has("prop1.prop1_4.1") === true, "about has: this should be true (4.1)");
  assertion(o.has("prop1.prop1_4.2") === true, "about has: this should be true (4.2)");
  assertion(o.has("prop1.prop1_5") === true, "about has: this should be true (5)");
  assertion(o.has("prop1.prop1_5.prop1_5_1") === true, "about has: this should be true (6)");

  assertion(o.get("prop1.prop1_1") === 1, "about get: this should be true (1)");
  assertion(o.get("prop1.prop1_2") === 2, "about get: this should be true (2)");
  assertion(o.get("prop1.prop1_3") === 3, "about get: this should be true (3)");
  assertion(typeof o.get("prop1.prop1_4") === "object", "about get: this should be true (4)");
  assertion(o.get("prop1.prop1_4.0") === 400, "about get: this should be true (4.0)");
  assertion(o.get("prop1.prop1_4.1") === 300, "about get: this should be true (4.1)");
  assertion(o.get("prop1.prop1_4.2") === 100, "about get: this should be true (4.2)");
  assertion(typeof o.get("prop1.prop1_5") === "object", "about get: this should be true (5)");
  assertion(o.get("prop1.prop1_5.prop1_5_1") === 500, "about get: this should be true (6)");

  o.set("prop1.prop1_1", 1000);
  assertion(o.get("prop1.prop1_1") === 1000, "about set: this should be true (1)");

  o.expand("prop1.prop1_5", {
    propX: "x"
  });
  assertion(o.get("prop1.prop1_5.propX") === "x", "about expand: this should be true (1)");
}

tester.progressBar.advance(1);

await NwtTimer.timeout(1000);