const checkers = [
  // @DEMO: From Resource Trait to Resource Method:
  [() => NwtResource.for("test/control/for/settingsSpecExample").hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.hello» should return Hello with resource identifier (1)"],
  [() => NwtResource.for("test/control/for/settingsSpecExample").hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.hello» should return Hello with resource identifier (2)"],
  [() => NwtResource.for("test/control/for/settingsSpecExample").hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.hello» should return Hello with resource identifier (3)"],
  [() => NwtResource.for("test/control/for/settingsSpecExample").hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.hello» should return Hello with resource identifier (4)"],
  [() => NwtResource.for("test/control/for/settingsSpecExample").hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.hello» should return Hello with resource identifier (5)"],
  [() => NwtResource.for("test/control/for/settingsSpecExample").hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.hello» should return Hello with resource identifier (6)"],
  // @DEMO: From Resource API Function to Resource API Method:
  [() => NwtResource.for("test/control/for/settingsSpecExample").api.test.hello() === "Hello, test/control/for/settingsSpecExample!", "Method «NwtResource.prototype.api.test.hello» should return Hello with resource identifier (7)"],
];

tester.progressBar.total = checkers.length;

checkers.forEach(c => {
  assertion(NwtUtils.trify(() => c[0]()), c[1]);
  tester.progressBar.advance(1);
});

