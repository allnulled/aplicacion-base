const result = await NwtFormulator.feature.mixer.mix([
  "feature/for/control/trait/abstraction",
  "feature/for/control/trait/getValue",
  "feature/for/control/trait/hasDescription",
  "feature/for/control/trait/hasPlaceholder",
  "feature/for/control/trait/hasStatement",
  "feature/for/control/trait/isExpanded",
  "feature/for/control/trait/settings",
  "feature/for/control/trait/validate",
]);

console.log(result);