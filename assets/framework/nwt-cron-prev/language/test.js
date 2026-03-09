const fs = require("fs");
require(__dirname + "/nwt-cron-index.js");
require(__dirname + "/nwt-cron-scope.js");
require(__dirname + "/nwt-cron-parser.js");
require(__dirname + "/nwt-cron-report.js");
require(__dirname + "/nwt-cron-machine.js");
global.debugg = function (...args) {
  console.log(JSON.stringify(args[0], null, 2), ...args.splice(1));
}
global.nodebugg = function (...args) {
  // console.log(JSON.stringify(args[0], null, 2), ...args.splice(1));
}

const inputDir = __dirname + "/examples/input";
const expecDir = __dirname + "/examples/expectation";
const scriptsDir = __dirname + "/examples/scripts";
const outputDir = __dirname + "/examples/output";
const files = fs.readdirSync(inputDir);
const scripts = fs.readdirSync(scriptsDir);

const main = async function () {

  Iterating_examples:
  for (let file of files) {
    // Descomentar:
    break;
    if (!file.endsWith(".cronn")) continue Iterating_examples;
    const fullpath = `${inputDir}/${file}`;
    const contents = fs.readFileSync(fullpath).toString();
    console.log(`[+] Starting test «${file}»`);
    const ast = NwtCronMachine.parse(contents);
    const interpretation = NwtCronMachine.compile(contents);
    fs.writeFileSync(`${outputDir}/${file}.ast.json`, JSON.stringify(ast, null, 2), "utf8");
    fs.writeFileSync(`${outputDir}/${file}.interpretation.json`, JSON.stringify(interpretation, null, 2), "utf8");
    const expecFile = `${expecDir}/${file.replace(/\.cronn$/g, ".js")}`;
    let callback = () => { };
    if (fs.existsSync(expecFile)) {
      callback = require(expecFile);
      callback(ast, interpretation);
    }
  }

  Iterating_scripts:
  for (let file of scripts) {
    if (!file.endsWith(".js")) continue Iterating_scripts;
    const fullpath = `${scriptsDir}/${file}`;
    console.log(`[+] Starting script test «${fullpath}»`);
    await require(fullpath);
  }

};

main();