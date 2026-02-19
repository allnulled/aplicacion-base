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
    if(filepath.includes("assets/app/resources/compiled")) return false;
    return true;
  }
});