tester.progressBar.total = 1;

const validSchemas = {
  one: {
    type: "list",
    schema: {
      type: "structure",
      schema: {
        name: { type: "text" },
        age: { type: "text" },
        city: { type: "text" },
        country: { type: "text" },
      },
    },
  },
  two: {
    type: "list",
    schema: { type: "text" },
  }
};

const notValidSchemas = {
  one: {
    schema: null,
  },
  two: {
    type: "list",
    schema: 100,
  },
  three: {
    type: "list",
    schema: "100",
  },
  four: {
    type: "list",
    schema: {},
  },
  five: {
    type: "list",
    schema: []
  },
  six: {
    type: "list",
    schema: { type: "unknown" },
  }
};

for (let index in validSchemas) {
  const validSchema = validSchemas[index];
  // assertion(true, `Preparing valid schema ${index}...`);
  assertion(NwtForm.builder.validateSchema(validSchema) === true, `Schema - from valids - on index ${index} must be valid`);
}

for (let index in notValidSchemas) {
  const notValidSchema = notValidSchemas[index];
  // assertion(true, `Preparing not-valid schema ${index}...`);
  let hasFailed = false;
  try {
    NwtForm.builder.validateSchema(notValidSchema);
  } catch (error) {
    hasFailed = true;
  }
  assertion(hasFailed === true, `Schema - from not valids - on index ${index} must NOT be valid`);
}

tester.progressBar.advance(1);