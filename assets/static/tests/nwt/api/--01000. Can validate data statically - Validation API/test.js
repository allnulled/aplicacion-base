const files = [
  NwtPaths.global.relative("assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.structure.test.js"),
  NwtPaths.global.relative("assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.list.test.js"),
  NwtPaths.global.relative("assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.option.test.js"),
  NwtPaths.global.relative("assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.validator.test.js"),
  NwtPaths.global.relative("assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.feature-inheritance.test.js"),
  NwtPaths.global.relative("assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.subtypes.test.js"),
];

tester.progressBar.total = files.length;

const abreviar = function(file) {
  return file
    .replace(`${NwtPaths.global.projectRoot}/assets/static/tests/nwt/api/01000. Can validate data statically - Validation API/validation/validation-api.`, "@validation: ")
  ;
}

for(let index=0; index<files.length; index++) {
  const file = files[index];
  assertion(true, `Ejecutando «${abreviar(file)}»`);
  await NwtImporter.asyncSource(file);
  tester.progressBar.advance(1);
}