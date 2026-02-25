tester.progressBar.total = 3;

const passes = {
  name: false,
  age: false,
  city: false,
  all: false,
};

assertion(!passes.name, "Not yet passed for name");
assertion(!passes.age, "Not yet passed for age");
assertion(!passes.city, "Not yet passed for city");
assertion(!passes.all, "Not yet passed for all");

tester.progressBar.advance(1);

const s = NwtPropagableStore.create();

s.on("@SetValue", ["name"], () => passes.name = true);
s.on("@SetValue", ["age"], () => passes.age = true);
s.on("@SetValue", ["city"], () => passes.city = true);
s.on("@SetValue", [], () => passes.all = true);

s.set(["name"], "Carl");
s.set(["age"], "100");

tester.progressBar.advance(1);

assertion(passes.name, "Had to pass for name");
assertion(passes.age, "Had to pass for age");
assertion(!passes.city, "Not yet passed for city (2)");
assertion(!passes.all, "Not yet passed for all (2)");

s.set([], { name: "m", age: "q", city: "p" });

await NwtTimer.timeout(100);

assertion(passes.name, "Had to pass for name");
assertion(passes.age, "Had to pass for age");
assertion(passes.city, "Had to pass for city");
assertion(passes.all, "Had to pass for all");

tester.progressBar.advance(1);
