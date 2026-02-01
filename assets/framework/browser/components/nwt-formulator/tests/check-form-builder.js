const result = await NwtFeatureMixer.mix([
  "feature/for/trait/statics",
  "feature/for/trait/getValue",
  "feature/for/trait/hasDescription",
  "feature/for/trait/hasPlaceholder",
  "feature/for/trait/hasStatement",
  "feature/for/trait/isExpanded",
  "feature/for/trait/settings",
  "feature/for/trait/validate",
]);

console.log(result);