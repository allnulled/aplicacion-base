tester.progressBar.total = 2;
await NwtTimer.timeout(500);
tester.progressBar.advance(1);
await NwtTimer.timeout(1000);
await NwtFormBuilder.build({
  type: "@control/for/structure",
  controls: {
    subtype: {
      type: "@control/for/option",
      controls: [{
        type: "@control/for/text"
      }, {
        type: "@control/for/list",
        controls: {
          type: "@control/for/text"
        }
      }]
    },
  }
});
await NwtTimer.timeout(500);
tester.progressBar.advance(1);
await NwtTimer.timeout(1000);