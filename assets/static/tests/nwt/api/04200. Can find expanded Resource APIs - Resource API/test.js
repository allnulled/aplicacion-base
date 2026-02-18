tester.progressBar.total = 1;

const checkers = [
  [NwtUtils.trify(() => typeof NwtResourceApi.apis.validation.utils.basicToolkit.getId === "function"), "Method «NwtResourceApi.apis.validation.utils.basicToolkit.getId» should be a function"],
  [NwtUtils.trify(() => typeof NwtResourceApi.apis.validation.utils.basicToolkit.getModernId === "function"), "Method «NwtResourceApi.apis.validation.utils.basicToolkit.getModernId» should be a function"],
  [NwtUtils.trify(() => typeof NwtResourceApi.apis.validation.utils.basicToolkit.getVersion === "function"), "Method «NwtResourceApi.apis.validation.utils.basicToolkit.getVersion» should be a function"],
];

for(let index=0; index<checkers.length; index++) {
  const checker = checkers[index];
  assertion(checker[0], checker[1]);
}

tester.progressBar.advance(1);