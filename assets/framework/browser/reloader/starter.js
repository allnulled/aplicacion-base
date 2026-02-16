const reloader = require(__dirname + "/reloader.js");

reloader({
  // This path is for the LSW project:
  dir: __dirname + "/../../../..",
  port: 3000,
  filter: function(filepath) {
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    console.log(filepath);
    if(filepath.includes("assets/framework/browser/components/nwt-compilable-components/compiled")) return false;
    return true;
  }
});