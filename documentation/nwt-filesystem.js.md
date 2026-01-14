# NwtFilesystem

API para ficheros.

## Exposición

```js
NwtFilesystem
NwtFramework.Filesystem
Vue.prototype.$nwt.Filesystem
```

## Ventajas

A continuación se exponen todos los métodos y propiedades:

```js
NwtFilesystem.fs = NwtEnvironment.isNode ? require("fs") : null;
NwtFilesystem.readFile(filepath, encoding = "utf8");
NwtFilesystem.writeFile(filepath, content, encoding = "utf8");
NwtFilesystem.appendFile(filepath, content, encoding = "utf8");
NwtFilesystem.lstat(filepath);
await NwtFilesystem.exists(filepath);
await NwtFilesystem.existsAsFile(filepath);
await NwtFilesystem.existsAsDirectory(dirpath);
await NwtFilesystem.ensureDirectory(dirpath);
await NwtFilesystem.readdir(dirpath, options = {});
await NwtFilesystem.readdirStats(dirpath, sortByType = false);
NwtFilesystem.rmdir(dirpath);
NwtFilesystem.mkdir(dirpath);
NwtFilesystem.unlink(filepath);
await NwtFilesystem.ensureFile(filepath, contents);
await NwtFilesystem.ensureJson(filepath, data);
await NwtFilesystem.existsProperty(filepath, propertypath, defaultValue = undefined);
await NwtFilesystem.ensureProperty(filepath, propertypath, value = undefined);
await NwtFilesystem.readProperty(filepath, propertypath, defaultValue = undefined);
await NwtFilesystem.writeProperty(filepath, propertypath, value = undefined);
NwtFilesystem.formatBytes(bytes);
NwtFilesystem.clearFileSeparatorOnExtremes(filepath);
await NwtFilesystem.createTemporaryDirectory(name = false);
await NwtFilesystem.clearTemporaryDirectories();
NwtFilesystem.selectByGlob(globPatterns, options = {});
await NwtFilesystem.initializeFile(filepath, content = "");
await NwtFilesystem.readJson(filepath);
await NwtFilesystem.writeJson(filepath, data, beautify = false);
await NwtFilesystem.readTree(dirPath, options = {});
NwtFilesystem.THROW_ERROR_FLAG = {};
NwtFilesystem.accessFrom(data, propertyPath = [], force = false, value = undefined, errorValue = this.THROW_ERROR_FLAG);
NwtFilesystem.setFrom(data, propertyPath = [], value = undefined, force = true);
```

