const reloader = require(__dirname + "/reloader.js");

reloader({
  // This path is for the LSW project:
  dir: __dirname + "/../../../../..",
  port: 3000,
  filter: function(filepath) {
    if(filepath.startsWith("dev")) {
      return true;
    } else if(filepath.startsWith("src")) {
      return true;
    }
  }
});