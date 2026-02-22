tester.progressBar.total = 2;
tester.progressBar.advance(1);
Test_per_se: {
  const { customTrait } = NwtResource.for("test/control/for/settingsSpecExample").traits["test/control/trait/for/settingsSpecTraitExample"];
  assertion(typeof customTrait === "number", "Este resource debería tener el rasgo customTrait tipo number de test/control/trait/for/settingsSpecTraitExample");
}
tester.progressBar.advance(1);
