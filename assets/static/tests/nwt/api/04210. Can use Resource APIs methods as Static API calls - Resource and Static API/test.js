const o = {
  id: "Little O",
  apis: {
    getId: function () { return this.id },
    getOne: () => "one",
    getTwo: () => "two",
    getThree: () => "three",
    nested: NwtProxyChain.Nexer.create({
      getId: function () { return this.id }
    })
  },
  api: {},
};

o.api = NwtProxyChain.from(o, { input: o.apis });

const checkers = [
  [() => typeof o.api.getId === "function", "Parameter «o.api.getId» should be function"],
  [() => typeof o.api.nested.getId === "function", "Parameter «o.api.nested.getId» should be function"],
];

tester.progressBar.total = checkers.length;

checkers.forEach(c => {
  assertion(NwtUtils.trify(() => c[0]()), c[1]);
  tester.progressBar.advance(1);
});

