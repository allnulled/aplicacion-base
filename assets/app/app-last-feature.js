const files = [
  NwtPaths.global.relative("assets/framework/browser/components/nwt-feature/test/validation-api.structure.test.js"),
  NwtPaths.global.relative("assets/framework/browser/components/nwt-feature/test/validation-api.list.test.js"),
  NwtPaths.global.relative("assets/framework/browser/components/nwt-feature/test/validation-api.option.test.js"),
  NwtPaths.global.relative("assets/framework/browser/components/nwt-feature/test/validation-api.validator.test.js"),
];
for(let index=0; index<files.length; index++) {
  const file = files[index];
  await NwtImporter.asyncSource(file);
}