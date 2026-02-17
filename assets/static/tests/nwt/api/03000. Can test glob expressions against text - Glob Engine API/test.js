const expressions = [{
  glob: ["**/what.txt$"],
  text: [
    "this/is/it.txt",
    "this/is/what.txt",
    "this/is/what.txt/you/want",
    "what.txt",
  ],
  answer: [
    "this/is/what.txt",
  ],
  assertionMessage: "Acepta ** + $ al final",
}, {
  glob: ["^what.txt$"],
  text: [
    "this/is/it.txt",
    "this/is/what.txt",
    "this/is/what.txt/you/want",
    "what.txt",
  ],
  answer: [
    "what.txt",
  ],
  assertionMessage: "Acepta ^ al principio + $ al final",
}, {
  glob: ["this/{is,was}/"],
  text: [
    "this/is/it.txt",
    "this/is/what.txt",
    "this/is/what.txt/you/want",
    "this/was/a.txt",
    "this/was/b.txt",
    "this/is going to be/c.txt",
    "this/will be/c.txt",
    "what.txt",
  ],
  answer: [
    "this/is/it.txt",
    "this/is/what.txt",
    "this/is/what.txt/you/want",
    "this/was/a.txt",
    "this/was/b.txt",
  ],
  assertionMessage: "Acepta varias expresiones dentro de { y } separadas por coma",
}, {
  glob: ["this/!{is/,is$,was/,was$}"],
  text: [
    "this/is/it.txt",
    "this/is/what.txt",
    "this/is/what.txt/you/want",
    "this/was/a.txt",
    "this/was/b.txt",
    "this/is going to be/c.txt",
    "this/will be/c.txt",
    "this/isi/ok",
    "this/is/ok",
    "this/is",
    "what.txt",
  ],
  answer: [
    "this/is going to be/c.txt",
    "this/will be/c.txt",
    "this/isi/ok"
  ],
  assertionMessage: "Niega varias expresiones dentro de !{ y } separadas por coma, aceptando / como caracter y $ para final de string",
}, {
  glob: ["node_modules/*/package.json"],
  text: [
    "node_modules/x1/package.json",
    "node_modules/x1/main.js",
    "node_modules/x2/package.json",
    "node_modules/x2/main.js",
    "node_modules/x5/package.json",
    "node_modules/x5/main.js",
    "node_modules/x5/p1/package.json",
    "node_modules/x5/p1/main.js",
  ],
  answer: [
    "node_modules/x1/package.json",
    "node_modules/x2/package.json",
    "node_modules/x5/package.json",
  ],
  assertionMessage: "Encuentra por wildcard * para 1 nivel de directorios",
}, {
  glob: ["node_modules/**/package.json"],
  text: [
    "node_modules/x1/package.json",
    "node_modules/x1/main.js",
    "node_modules/x2/package.json",
    "node_modules/x2/main.js",
    "node_modules/x5/package.json",
    "node_modules/x5/main.js",
    "node_modules/x5/p1/package.json",
    "node_modules/x5/p1/main.js",
  ],
  answer: [
    "node_modules/x1/package.json",
    "node_modules/x2/package.json",
    "node_modules/x5/package.json",
    "node_modules/x5/p1/package.json",
  ],
  assertionMessage: "Encuentra por doble wildcard ** para N niveles de directorios",
}];
tester.progressBar.total = expressions.length + 1;
assertion(true, "Iniciando test de expresiones glob aceptadas por el motor de NwtGlobEngine");
for (let iExpr = 0; iExpr < expressions.length; iExpr++) {
  const expr = expressions[iExpr];
  const { glob: pattr, text, answer: expectedAnswer } = expr;
  tester.progressBar.advance(1);
  const realAnswer = NwtGlobEngine.getMatchablesBy(pattr, text);
  for (let iAnswer = 0; iAnswer < expectedAnswer.length; iAnswer++) {
    const expectedItem = expectedAnswer[iAnswer];
    const realItem = realAnswer[iAnswer];
    console.log(realItem, expectedItem);
    assertion(realItem === expectedItem, `[${iExpr+1}/${expressions.length}»${iAnswer+1}/${expectedAnswer.length}] ${expr.assertionMessage}`);
  }
}
assertion(true, "Todas las expresiones fueron evaluadas");
tester.progressBar.advance(1);