tester.progressBar.total = 1;

const checkers = [
  NwtUtils.trify(() => typeof NwtResourceApi.apis.validation.utils.basicToolkit.getId === "function"),
];

for(let index=0; index<checkers.length; index++) {
  const checker = checkers[index];
  assertion(checker, "Method «NwtResourceApi.apis.validation.utils.basicToolkit.getId» should exist");
}

tester.progressBar.advance(1);