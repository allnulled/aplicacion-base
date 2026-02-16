tester.progressBar.total = 2;
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
Test_per_se: {
  const { applyOnGetValue } = NwtResource.for("control/for/structure").traits["control/trait/for/getValue"];
  assertion(typeof applyOnGetValue === "function", "Este resource debería tener el rasgo applyOnGetValue de control/trait/for/getValue");
}
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
