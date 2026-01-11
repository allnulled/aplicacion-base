const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname + "/tjs-parser.js");
const source = fs.readFileSync(filepath).toString();
const output = source.replace(/\}\)\(this\);[\r\n]*$/g, "})(globalThis);\n");

fs.writeFileSync(filepath, output, "utf8");