const fs = require("fs");
require(__dirname + "/nwt-cron-parser.js");
global.debugg = function(...args) {
  console.log(JSON.stringify(args[0], null, 2), ...args.splice(1));
}

const inputDir = __dirname + "/examples/input";
const expecDir = __dirname + "/examples/expectation";
const files = fs.readdirSync(inputDir);

Iterating_examples:
for (let file of files) {
  if (!file.endsWith(".cronn")) continue Iterating_examples;
  const fullpath = `${inputDir}/${file}`;
  const contents = fs.readFileSync(fullpath).toString();
  console.log(`[+] Starting test «${file}»`);
  const ast = NwtCronParser.parse(contents);
  console.log(JSON.stringify(ast, null, 2));
  const expecFile = `${expecDir}/${file.replace(/\.cronn$/g, ".js")}`;
  let callback = () => { };
  if (fs.existsSync(expecFile)) {
    callback = require(expecFile);
    callback(ast);
  }
}

// NwtCronParser.parse("2026/01/01-2026/12/30");