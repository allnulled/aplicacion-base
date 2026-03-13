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
      trace("NwtCronExpression.create");
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
      trace("NwtCronExpression.fromString");
      const [second, minute, hour, day, month, weekday, year = "*"] = code.split(" ");
      return new this({ second, minute, hour, day, month, weekday, year });
    }

    constructor(scope = {}) {
      trace("NwtCronExpression.constructor");
      Object.assign(this, this.constructor.defaultScope, scope);
    }

    override(units = {}) {
      trace("NwtCronExpression.prototype.override");
      Object.assign(this, units);
      return this;
    }

    isOnlyNumberOrWord(val) {
      return (val + "").match(/^([0-9]|[A-Za-z])+$/g);
    }

    isUniqueMoment() {
      trace("NwtCronExpression.prototype.isUniqueMoment");
      const {year, month, day, hour, minute, second, weekday} = this;
      const list = [year, month, day, hour, minute, second, weekday];
      for(let index=0; index<list.length; index++) {
        const item = list[index];
        const isUnique = this.isOnlyNumberOrWord(item);
        if(!isUnique) {
          return false;
        }
      }
      return true;
    }

    isSameMonthByDate(date) {
      trace("NwtCronExpression.prototype.isSameMonthByDate");
      assertion(date instanceof Date, "Parameter «date» must be instance of Date on «NwtCronExpression.prototype.isSameMonthByDate»");
      const { year, month } = this;
      const isSameYear = date.getFullYear() === parseInt(year);
      const isSameMonth = date.getMonth() === (parseInt(month)-1);
      return isSameYear && isSameMonth;
    }

    isSameDayByDate(date) {
      trace("NwtCronExpression.prototype.isSameDayByDate");
      assertion(date instanceof Date, "Parameter «date» must be instance of Date on «NwtCronExpression.prototype.isSameDayByDate»");
      const { year, month, day } = this;
      // console.log("same day by date", year, month, day, date.getFullYear(), date.getMonth(), date.getDate());
      const isSameYear = date.getFullYear() === parseInt(year);
      const isSameMonth = date.getMonth() === (parseInt(month)-1);
      const isSameDay = date.getDate() === parseInt(day);
      // console.log("same day by date", isSameYear, isSameMonth, isSameDay);
      return isSameYear && isSameMonth && isSameDay;
    }

    toString() {
      trace("NwtCronExpression.prototype.toString");
      return `${this.second} ${this.minute} ${this.hour} ${this.day} ${this.month} ${this.weekday} ${this.year}`;
    }

    toObject() {
      trace("NwtCronExpression.prototype.toObject");
      return NwtObjectUtils.exceptKeys(this, [
        "override",
        "toString",
        "toObject",
        "toSchedulable",
        "toPersistibleJob",
      ]);
    }

    toSchedulable(options = {}) {
      trace("NwtCronExpression.prototype.toSchedulable");
      return new Cron(this.toString(), options);
    }

    toPersistibleJob(callback, options = {}) {
      trace("NwtCronExpression.prototype.toPersistibleJob");
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