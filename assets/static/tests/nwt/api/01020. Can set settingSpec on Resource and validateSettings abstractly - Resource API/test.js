tester.progressBar.total = 2;
tester.progressBar.advance(1);
await NwtTimer.timeout(500);
Test_in_situ: {
  NwtResource.for("test/control/for/settingsSpecExample").api.settings.validateSettings({
    name: "Carlos",
  });
  let hasPassed = false;
  try {
    NwtResource.for("test/control/for/settingsSpecExample").api.settings.validateSettings({
      name: "carlos",
    });
  } catch (error) {
    assertion(error.message.startsWith("Propiedad name debe empezar por may"), "El error deberia ser exactamente el indicado: que en propiedad name debe empezar por mayuscula");
    hasPassed = true;
  }
  assertion(hasPassed, "El checkeo anterior debería haber hecho saltar un error y no, no está validando bien settingsSpec");
}
tester.progressBar.advance(1);
await NwtTimer.timeout(500);