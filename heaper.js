const fs = require("fs");
const v8 = require("v8");
const stream = require("stream/promises");

const NwtStreamer = class {
  static pipe(reader, ...writers) {
    
  }
}

const main = async function () {
  await NwtStreamer.pipe(v8.getHeapSnapshot(), fs.createWriteStream("heap.json"));
  const json = await fs.promises.readFile("heap.json");
  const data = JSON.parse(json);
  delete data.nodes;
  delete data.edges;
  delete data.locations;
  await fs.promises.writeFile("heap.json", JSON.stringify(data, null, 2), "utf8");
};
main();