tester.progressBar.total = 4;

const database1 = {
  name: "Persona 1",
  age: 30,
  city: "LA",
  country: "USA",
  organizations: [{
    name: "Organization 1",
    country: "China"
  }, {
    name: "Organization 2",
    country: "China"
  }, {
    name: "Organization 3",
    country: "Russia"
  }]
};

// @Title: NwtAccessor.has
tester.progressBar.advance(1);
assertion(true === NwtAccessor.has(database1, ["name"]), "Should work has (1)");
assertion(false === NwtAccessor.has(database1, ["name","x"]), "Should work has (2)");
assertion(false === NwtAccessor.has(database1, ["noprop"]), "Should work has (3)");
assertion(true === NwtAccessor.has(database1, ["organizations",0,"name"]), "Should work has (4)");

// @Title: NwtAccessor.get
tester.progressBar.advance(1);
assertion("Persona 1" === NwtAccessor.get(database1, ["name"]), "Should work get (1)");
assertion(NwtUtils.shouldThrow(() => NwtAccessor.get(database1, ["name","x"])), "Should work get (2)");
assertion(NwtUtils.shouldThrow(() => NwtAccessor.get(database1, ["noprop"])), "Should work get (3)");
assertion("Organization 1" === NwtAccessor.get(database1, ["organizations",0,"name"]), "Should work get (4)");

// @Title: NwtAccessor.set
tester.progressBar.advance(1);
assertion("Persona 1" === NwtAccessor.get(database1, ["name"]), "Should work set (1.1)");
NwtAccessor.set(database1, ["name"], "Persona 2");
assertion("Persona 2" === NwtAccessor.get(database1, ["name"]), "Should work set (1.1)");
assertion("Organization 1" === NwtAccessor.get(database1, ["organizations",0,"name"]), "Should work set (2.1)");
NwtAccessor.set(database1, ["organizations",0,"name"], "Organization 1.1");
assertion("Organization 1.1" === NwtAccessor.get(database1, ["organizations",0,"name"]), "Should work set (2.2)");

// @Title: NwtAccessor.set
tester.progressBar.advance(1);
assertion("Persona 2" === NwtAccessor.get(database1, ["name"]), "Should work modify (1.1)");
NwtAccessor.modify(database1, ["name"], (k,v) => { v[k] = v[k] + ".1" });
assertion("Persona 2.1" === NwtAccessor.get(database1, ["name"]), "Should work modify (1.1)");
assertion("Organization 1.1" === NwtAccessor.get(database1, ["organizations",0,"name"]), "Should work modify (2.1)");
NwtAccessor.modify(database1, ["organizations",0,"name"], (k,v) => { v[k] = v[k] + ".1" });
assertion("Organization 1.1.1" === NwtAccessor.get(database1, ["organizations",0,"name"]), "Should work modify (2.2)");
