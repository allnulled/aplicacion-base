/*
await NwtImporter.asyncSource(NwtPaths.global.relative("assets/framework/browser/components/nwt-formulator/feature/test.js"))
//*/
const val = await NwtFormulatorFeatureManager.global.for("control/text").load();
console.log(val);