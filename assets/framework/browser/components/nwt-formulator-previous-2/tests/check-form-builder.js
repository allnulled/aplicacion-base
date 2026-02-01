const result = await NwtFormulator.feature.mixer.mix([
  "feature/for/trait/abstraction",
  "feature/for/trait/getValue",
  "feature/for/trait/hasDescription",
  "feature/for/trait/hasPlaceholder",
  "feature/for/trait/hasStatement",
  "feature/for/trait/isExpanded",
  "feature/for/trait/settings",
  "feature/for/trait/validate",
]);

console.log(result);