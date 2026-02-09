await NwtValidator.validate("100", {
  type: "@control/for/text"
});

await NwtValidator.validate(100, {
  type: "@control/for/number"
});

await NwtValidator.validate({}, {
  type: "@control/for/object"
});

await NwtValidator.validate([], {
  type: "@control/for/array"
});

await NwtValidator.validate(false, {
  type: "@control/for/boolean"
});