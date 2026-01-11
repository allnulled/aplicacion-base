(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCsv'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCsv'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  const NwtCsv = class {

    static defaultParseOptions = {};

    static defaultUnparseOptions = {};

    static async fromCsvFileToJson(file) {
      trace("NwtCsv.fromCsvFileToJson");
      const fs = require("fs");
      const content = await fs.promises.readFile(file, "utf8");
      return this.fromCsvToJson(content);
    }

    static fromJsonToCsv(data, options = this.defaultParseOptions) {
      trace("NwtCsv.fromJsonToCsv");
      return Papa.unparse(data, options);
    }

    static fromCsvToJson(text, options = this.defaultUnparseOptions, asObjects = true) {
      trace("NwtCsv.fromCsvToJson");
      const result = Papa.parse(text, options);
      if (asObjects) {
        return this.csvCellsToObjects(result.data);
      }
      return result;
    }

    static csvCellsToObjects(rows) {
      trace("NwtCsv.csvCellsToObjects");
      if (!Array.isArray(rows) || rows.length === 0) return [];
      const [headers, ...dataRows] = rows;
      return {
        headers,
        data: dataRows.map(row => {
          const obj = {};
          headers.forEach((key, i) => {
            obj[key] = row[i];
          });
          return obj;
        })
      };
    }

  };

  return NwtCsv;

});