return {
  collection: NwtArrayUtils.repeatBy(100 / 10, 0),
  onStart: async function () {
    trace("NwtCommandViewForNwtOsMysqlService.onStart");
    component.tester.progressBar.total = this.collection.length;
  },
  onIteration: async function (val, key, i) {
    trace("NwtCommandViewForNwtOsMysqlService.onIteration");
    await NwtTimer.timeout(1000);
    console.log(val, key, i);
    console.log(component.command);
  },
  onProgression: async function () {
    trace("NwtCommandViewForNwtOsMysqlService.onProgression");
    component.tester.progressBar.advance(1);
  },
  onEnd: async function () {
    trace("NwtCommandViewForNwtOsMysqlService.onEnd");
  }
};