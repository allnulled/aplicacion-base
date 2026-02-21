const checkers = [
  [() => typeof NwtResource.for("control/for/text").api.control.validation.validateValue("texto") === "object", "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should return object (1)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue("texto").success === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should return property success=true (2)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue(500).error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should throw error when passing number (3)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue({}).error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should throw error when passing object (4)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue(() => {}).error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should throw error when passing function (5)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue(true).error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should throw error when passing boolean (6)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue("texto").error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» should throw error when passing string (7)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({}).success === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» should return property success=true when passing object (8)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({name: {}}).error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» should throw when passing property name without type (9)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({name: {type:"bad/type"}}).error === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» should throw when passing property name with unknown type (10)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({name: {type:"control/for/text"}}).success === true, "Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» should return property success=true when passing property name with known type (11)"],
];

tester.progressBar.total = checkers.length;

checkers.forEach(c => {
  const result = NwtUtils.trify(() => c[0]());
  assertion(result, c[1]);
  tester.progressBar.advance(1);
});

