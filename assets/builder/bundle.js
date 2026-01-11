const path = require("path");

const projectRoot = path.resolve(__dirname, "..", "..");

require(`${projectRoot}/assets/builder/bundlelist-common.js`).forEach(filepath => require(filepath));
  

require(`${__dirname}/vuebundler.js`).bundle({
  list: `${__dirname}/bundlelist.js`,
  output: `${__dirname}/../dist.js`,
  ignore: [],
  id: "Proyecto_base_001",
  module: false,
});