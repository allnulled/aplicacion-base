tester.progressBar.total = 2;
tester.progressBar.advance(1);
await NwtTimer.timeout(500);
Test_in_situ: {
  const spec = {
    name: {
      type: [String],
      default: "",
      validator: it => {
        if (!it.substr(0, 1).match(/[A-ZÁÉÍÓÚ]/g)) {
          throw new Error("Propiedad name debe empezar por mayúsculas");
        }
      },
    }
  };
  const spec2 = {
    name: [String, "", it => {
      if (!it.substr(0, 1).match(/[A-ZÁÉÍÓÚ]/g)) {
        throw new Error("Propiedad name debe empezar por mayúsculas");
      }
    }]
  }
  NwtPrototyper.initializePropertiesOf({ name: "Carlos" }, spec);
  NwtPrototyper.initializePropertiesOf({ name: "Carlos" }, spec2);
  let hasPassed = false;
  try {
    NwtPrototyper.initializePropertiesOf({ name: "carlos" }, spec);
  } catch (error) {
    if (!error.message.startsWith("Propiedad name debe")) {
      throw error;
    }
    hasPassed = true;
  }
  assertion(hasPassed, "Debería haber fallado el try-catch antes con spec1 aqui");
  hasPassed = false;
  try {
    NwtPrototyper.initializePropertiesOf({ name: "carlos" }, spec);
  } catch (error) {
    if (!error.message.startsWith("Propiedad name debe")) {
      throw error;
    }
    hasPassed = true;
  }
  assertion(hasPassed, "Debería haber fallado el try-catch antes con spec2 aqui");
}
tester.progressBar.advance(1);
await NwtTimer.timeout(500);