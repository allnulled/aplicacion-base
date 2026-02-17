tester.progressBar.total = 1;

const validSchemas = [{
  type: "list",
  schema:{
    type: "structure",
    schema: {
      name: {type: "text"},
      age: {type: "text"},
      city: {type: "text"},
      country: {type: "text"},
    },
  },
}, {
  type: "list",
  schema: []
}, {
  type: "list",
  schema: {type:"text"},
}];
const notValidSchemas = [{
  schema: null,
}, {
  type: "list",
  schema: 100,
}, {
  type: "list",
  schema: "100",
}, {
  type: "list",
  schema: {},
}, {
  type: "list",
  schema: {type:"unknown"},
}];

for(let index=0; index<validSchemas.length; index++) {
  const validSchema = validSchemas[index];
  // assertion(true, `Preparing valid schema ${index}...`);
  assertion(NwtForm.builder.validateSchema(validSchema) === true, `Schema - from valids - on index ${index} must be valid`);
}

for(let index=0; index<notValidSchemas.length; index++) {
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