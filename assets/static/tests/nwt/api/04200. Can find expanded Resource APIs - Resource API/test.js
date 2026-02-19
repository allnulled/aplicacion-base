tester.progressBar.total = 1;

const checkers = [
  // Testing superfluous tree:
  [NwtUtils.trify(() => typeof NwtResourceApi.apis.test.utils.basicToolkit.getId === "function"), "Method «NwtResourceApi.apis.test.utils.basicToolkit.getId» should be a function"],
  [NwtUtils.trify(() => typeof NwtResourceApi.apis.test.utils.basicToolkit.getModernId === "function"), "Method «NwtResourceApi.apis.test.utils.basicToolkit.getModernId» should be a function"],
  [NwtUtils.trify(() => typeof NwtResourceApi.apis.test.utils.basicToolkit.getVersion === "function"), "Method «NwtResourceApi.apis.test.utils.basicToolkit.getVersion» should be a function"],
  // Testing scope:
  [NwtUtils.trify(() => NwtResource.for("test/control/for/settingsSpecExample").api.test.utils.basicToolkit.getVersion() === "test/control/for/settingsSpecExample"), `Method «NwtResource.for("test/control/for/settingsSpecExample").api.test.utils.basicToolkit.getVersion()» should return 'test/control/for/settingsSpecExample'`],
  [NwtUtils.trify(() => NwtResource.for("test/control/for/settingsSpecExample").api.test.utils.basicToolkit.getId() === "test/control/for/settingsSpecExample"), `Method «NwtResource.for("test/control/for/settingsSpecExample").api.test.utils.basicToolkit.getId()» should return 'test/control/for/settingsSpecExample'`],
  [NwtUtils.trify(() => NwtResource.for("test/control/for/settingsSpecExample").api.test.utils.basicToolkit.getModernId() === "test/control/for/settingsSpecExample"), `Method «NwtResource.for("test/control/for/settingsSpecExample").api.test.utils.basicToolkit.getModernId()» should return 'test/control/for/settingsSpecExample'`],
];

for(let index=0; index<checkers.length; index++) {
  const checker = checkers[index];
  assertion(checker[0], checker[1]);
}

tester.progressBar.advance(1);

await NwtTimer.timeout(1000);