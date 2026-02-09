const main = async function () {
  require(__dirname + "/api.js");
  // Operaciones con JSON:
  await NwtPersister.file.init("test/file.json", "{}"); // Para inicializar el fichero
  await NwtPersister.json.init("test/file.json", ["version"], 0); // returns 0 (or the value it had, which would remain untouched)
  await NwtPersister.json.has("test/file.json", ["version"]); // return true (if exists, false if not)
  await NwtPersister.json.get("test/file.json", ["version"]); // returns 0 (or the value it has)
  await NwtPersister.json.set("test/file.json", ["version"], 2); // returns true (if it was successfully set)
  await NwtPersister.json.delete("test/file.json", ["version"]); // returns true (if existed, false if not)
  // Operaciones con ficheros:
  await NwtPersister.file.init("test/file.txt", "Texto"); // returns "Texto" (or the content it had, which would remain untouched)
  await NwtPersister.file.has("test/file.txt"); // returns true (if exists as file, false if not)
  await NwtPersister.file.get("test/file.txt"); // returns "Texto" (or the content it has)
  await NwtPersister.file.set("test/file.txt", "Otro texto"); // returns true (if it was successfully set)
  await NwtPersister.file.delete("test/file.txt"); // returns true (if existed, false if it did not exist)
  // Operaciones con directorios:
  await NwtPersister.directory.init("test/dir1"); // returns true (if not exists)
  await NwtPersister.directory.has("test/dir1"); // returns true (if exists as directory, false if not)
  await NwtPersister.directory.set("test/dir2"); // returns true (if it was successfully set)
  await NwtPersister.directory.get("test/dir2"); // returns the array of filenames from readdir
  await NwtPersister.directory.delete("test/dir1"); // returns true (if existed, false if not)
  // Operaciones con JSONL:
  await NwtPersister.file.init("test/file-2.jsonl", ""); // Para inicializar el fichero
  await NwtPersister.jsonl.insert("test/file-2.jsonl", { name: "Carl" }); // returns the uid for this row
  await NwtPersister.jsonl.insert("test/file-2.jsonl", { name: "Kodos" }); // returns the uid for this row
  await NwtPersister.jsonl.select("test/file-2.jsonl", row => row.name === "Carl"); // returns an array of rows
  await NwtPersister.jsonl.update("test/file-2.jsonl", row => row.name === "Carl", { name: "Carlsberg" }); // returns an array of uids
  await NwtPersister.jsonl.delete("test/file-2.jsonl", row => row.name === "Carl"); // returns an array of uids
};

main();