const checkers = [
  [() => typeof NwtResource.for("control/for/text").api.control.validation.interface.validateValue("texto") === "object", "Method «NwtResource.prototype.api.control.validation.interface.validateValue» should return object (1)"],
];

tester.progressBar.total = checkers.length;

checkers.forEach(c => {
  assertion(NwtUtils.trify(() => c[0]()), c[1]);
  tester.progressBar.advance(1);
});

