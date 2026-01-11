return {
  collection: NwtArrayUtils.repeatBy(100 / 10, 0),
  onStart: async function () {
    trace("NwtCommandViewForNwtUtilTxtConcatenation.onStart");
    component.tester.progressBar.total = this.collection.length;
  },
  onIteration: async function (val, key, i) {
    trace("NwtCommandViewForNwtUtilTxtConcatenation.onIteration");
    await NwtTimer.timeout(1000);
    console.log(val, key, i);
    console.log(component.command);
  },
  onProgression: async function () {
    trace("NwtCommandViewForNwtUtilTxtConcatenation.onProgression");
    component.tester.progressBar.advance(1);
  },
  onEnd: async function () {
    trace("NwtCommandViewForNwtUtilTxtConcatenation.onEnd");
  }
};