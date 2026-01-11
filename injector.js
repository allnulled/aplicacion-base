const inspector = require("inspector");
const fs = require("fs");

const session = new inspector.Session();
session.connect();

session.post("HeapProfiler.takeHeapSnapshot", null, (err, r) => {
  if (err) console.error(err);
  else console.log("Snapshot tomado");
});