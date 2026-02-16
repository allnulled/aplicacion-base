tester.progressBar.total = 2;
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
Test_per_se: {
  // Create:
  const r1 = NwtResource.define({ id: "okkk1", apis: [] });
  const r2 = NwtResource.define({ id: "okkk2", apis: [] });
  assertion(NwtResource.definitions.okkk1, "Resource okkk1 debería existir aquí");
  assertion(NwtResource.definitions.okkk2, "Resource okkk2 debería existir aquí");
  // Find:
  const r1_2 = NwtResource.for("okkk1");
  const r2_2 = NwtResource.for("okkk2");
  // Delete:
  NwtResource.remove("okkk1");
  NwtResource.remove("okkk2");
  assertion(r1 === r1_2, "Instancias r1 y r1_2 deberían ser la misma");
  assertion(r2 === r2_2, "Instancias r2 y r2_2 deberían ser la misma");
  assertion(!NwtResource.definitions.okkk1, "Resource okkk1 no debería existir ya");
  assertion(!NwtResource.definitions.okkk2, "Resource okkk2 no debería existir ya");
  
}
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
