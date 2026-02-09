await NwtModuleManager.global.import("module-a.js", {
  // injected locals on import-defining
}, [
  "nwt/test/modules/featurex/submod-a-1.js",
  "nwt/test/modules/featurex/submod-a-2.js",
  "nwt/test/modules/featurex/submod-a-3.js",
], async function(context, dependencies) {
  console.log("Module a started!");
  assertion(context.message === "Hello", "Variable context.message must be 'Hello'");
  const [a1, a2, a3] = dependencies;
  assertion(a1 === 1, "Submodule a1 must be 1");
  assertion(a2 === 2, "Submodule a2 must be 2");
  assertion(a3 === 3, "Submodule a3 must be 3");
  const result1 = await NwtModuleManager.global.import("nwt/test/modules/featurex/submod-a-3.js", { output: "Whatever" });
  assertion(result1 === "Whatever", "Variable result1 must be 'Whatever'");
  console.log("Module a passed!");
}, {
  message: "Hello",
});