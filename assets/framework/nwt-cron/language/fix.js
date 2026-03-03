const fs = require("fs");
const target = __dirname + "/nwt-cron-parser.js";
const contents0 = fs.readFileSync(target).toString();
const contents1 = contents0.replace(/\}\)\(this\);[\n ]*/g, "})(globalThis);\n");
fs.writeFileSync(target, contents1, "utf8");
