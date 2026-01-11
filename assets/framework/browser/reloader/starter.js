const reloader = require(__dirname + "/reloader.js");

reloader({
  // This path is for the LSW project:
  dir: __dirname + "/../../../..",
  port: 3000,
  filter: function(filepath) {
    return true;
  }
});