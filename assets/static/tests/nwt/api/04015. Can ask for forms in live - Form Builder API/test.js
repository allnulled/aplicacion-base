tester.progressBar.total = 1;

await NwtForm.builder.ask({
  type: "list",
  schema: {
    type: "structure",
    schema: {
      name: { type: "text" },
      age: { type: "text" },
      city: { type: "text" },
      country: { type: "text", defaultValue: "x" },
      // Siguiente paso:
      /*
      sex: {
        type: "option",
        schema: [{
          type: "text",
          hardcoded: "male"
        }, {
          type: "text",
          hardcoded: "female"
        }]
      }
      //*/
    },
  },
});

tester.progressBar.advance(1);