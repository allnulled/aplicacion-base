tester.progressBar.total = 2;
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
Test_per_se: {
  const Nexer = NwtResourceApi.Nexer;
  NwtResourceApi.unregister("miApi");
  NwtResourceApi.register({
    namespace: "miApi",
    getId() {
      return this.id;
    },
    path: Nexer.create({
      to: Nexer.create({
        method: function() {
          return this.id;
        }
      })
    })
  });
  NwtResource.remove("okkk");
  const r1 = NwtResource.define({ id: "okkk", apis: ["miApi"] }).api.miApi.getId();
  NwtResource.remove("okkk");
  const r2 = NwtResource.define({ id: "okkk", apis: ["miApi"] }).api.miApi.path.to.method();
  NwtResource.remove("okkk");
  NwtResourceApi.unregister("miApi");
  assertion(r1 === 'okkk', "El r1 debería ser 'okkk'");
  assertion('okkk' === r2, "El r2 debería ser 'okkk'");
  assertion(r1 === r2, "El r1 y el r2 deberían ser iguales");
}
await NwtTimer.timeout(1000);
tester.progressBar.advance(1);
