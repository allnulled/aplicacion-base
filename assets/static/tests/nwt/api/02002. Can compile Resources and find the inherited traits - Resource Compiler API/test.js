tester.progressBar.total = 2;
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
Test_per_se: {
  const { customTrait } = NwtResource.for("test/control/for/settingsSpecExample").traits["test/control/trait/for/settingsSpecTraitExample"];
  assertion(typeof customTrait === "number", "Este resource debería tener el rasgo customTrait tipo number de test/control/trait/for/settingsSpecTraitExample");
}
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
