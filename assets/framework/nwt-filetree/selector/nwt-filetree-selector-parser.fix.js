const fs = require("fs");
const path = require("path");

const filepath = path.resolve(__dirname + "/nwt-filetree-selector-parser.js");
const source = fs.readFileSync(filepath).toString();
const output = source.replace(/\}\)\(this\);[\r\n]*$/g, "})(globalThis);\n");

fs.writeFileSync(filepath, output, "utf8");