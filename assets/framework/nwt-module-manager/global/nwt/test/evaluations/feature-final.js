let result = undefined;

console.log("Test de feature-final iniciado!");

const result1 = await NwtModuleManager.global.import("nwt/test/evaluations/feature-a.js", { a:5, b:10 });
const result2 = await NwtModuleManager.global.import("nwt/test/evaluations/feature-b.js", { a:result1, b:5 });
const result3 = await NwtModuleManager.global.import("nwt/test/evaluations/feature-c.js", { a:result2, b:2 });

assertion(result1 === 15, "El result1 debería ser 15 por tanto está mal");
assertion(result2 === 10, "El result2 debería ser 10 por tanto está mal");
assertion(result3 === 20, "El result3 debería ser 20 por tanto está mal");

const result4 = await NwtModuleManager.global.import([
  ["nwt/test/evaluations/feature-a.js", {a:10,b:20}],
  ["nwt/test/evaluations/feature-b.js", {a:30,b:5}],
  ["nwt/test/evaluations/feature-c.js", {a:25,b:4}],
]);

assertion(result4.length === 3, "El result4 debería tener 3 elementos");
assertion(result4[0] === 30, "El result4[0] debería ser x");
assertion(result4[1] === 25, "El result4[1] debería ser x");
assertion(result4[2] === 100, "El result4[2] debería ser x");

const result5 = await NwtModuleManager.global.import("feature-final", {}, [
  ["nwt/test/evaluations/feature-a.js", {a:10,b:2}],
  ["nwt/test/evaluations/feature-b.js", {a:10,b:2}],
  ["nwt/test/evaluations/feature-c.js", {a:10,b:2}],
], async function(context, [r1,r2,r3]) {
  assertion(r1 === 12, "Aquí r1 debería ser 12");
  assertion(r2 === 8, "Aquí r2 debería ser 8");
  assertion(r3 === 20, "Aquí r3 debería ser 20");
  return r1 + r2 + r3;
});

assertion(result5 === 40, "Aquí result5 debería ser 40");

console.log("Test de feature-final completado!");