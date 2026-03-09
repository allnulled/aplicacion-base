(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['NwtCronExpression'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['NwtCronExpression'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  // @FROM: https://github.com/Hexagon/croner
  //
  // ┌──────────────── (optional) second (0 - 59)
  // | ┌────────────── minute (0 - 59)
  // | | ┌──────────── hour (0 - 23)
  // | | | ┌────────── day of month (1 - 31)
  // | | | | ┌──────── month (1 - 12, JAN-DEC)
  // | | | | | ┌────── day of week (0 - 6, SUN-Mon) 
  // | | | | | |       (0 to 6 are Sunday to Saturday; 7 is Sunday, the same as 0)
  // | | | | | | ┌──── (optional) year (1 - 9999)
  // | | | | | | |
  // * * * * * * *

  const NwtCronExpression = class {

    static create(...args) {
      return new this(...args);
    }

    static defaultScope = {
      title: false,
      year: "*",
      month: "*",
      day: "*",
      weekday: "*",
      hour: "0",
      minute: "0",
      second: "0",
    };

    static fromString(code) {
      const [second, minute, hour, day, month, weekday, year = "*"] = code.split(" ");
      return new this({ second, minute, hour, day, month, weekday, year });
    }

    constructor(scope = {}) {
      Object.assign(this, this.constructor.defaultScope, scope);
    }

    override(units = {}) {
      Object.assign(this, units);
      return this;
    }

    toString() {
      return `${this.second} ${this.minute} ${this.hour} ${this.day} ${this.month} ${this.weekday} ${this.year}`;
    }

    toObject() {
      return NwtObjectUtils.exceptKeys(this, [
        "override",
        "toString",
        "toObject",
        "toSchedulable",
        "toPersistibleJob",
      ]);
    }

    toSchedulable(options = {}) {
      return new Cron(this.toString(), options);
    }

    toPersistibleJob(callback, options = {}) {
      assertion(typeof callback === "function", `Parameter «callback» must be function on «NwtCronExpression.toPersistibleJob»`);
      assertion(typeof options === "object", `Parameter «options» must be object on «NwtCronExpression.toPersistibleJob»`);
      return NwtCronManager.global.addJob({
        title: this.title,
        pattern: this.toString(),
        options: options,
        callback: callback,
      });
    }

  };

  return NwtCronExpression;

});