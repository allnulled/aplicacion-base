tester.progressBar.total = 2;

const answer1 = await NwtFormMaker.dialog.fromSchema({
  type: "control/for/list",
  initialValue: [{
    name: "doctor jones",
    age: 40,
    city: "indiana",
    country: "usa",
    sex: "male",
  }],
  // hasHeader: "<div class='title'>Lista de personas!!</div>",
  hasStatement: "Lista de personas",
  hasDescription: "Aquí se construye una lista de objetos",
  schema: {
    type: "control/for/structure",
    hasStatement: "Datos de persona",
    hasDescription: "Aquí van todos los datos de 1 persona",
    schema: {
      name: {
        type: "control/for/text",
        // hasHeader: "<div class='title'>Nombre de la persona</div>",
        hasStatement: "Nombre:",
        hasDescription: "Aquí va el nombre",
        onValidate: function (value, settings, component, indexes, assertion) {
          assertion(value.startsWith("C"), `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must start with «C» on «NwtResource.for('control/for/text').control.onValidate»`);
        }
      },
      age: {
        type: "control/for/text",
        hasStatement: "Edad:",
        hasDescription: "Aquí va la edad",
      },
      city: {
        type: "control/for/text",
        hasStatement: "Ciudad:",
        hasDescription: "Aquí va la ciudad",
      },
      country: {
        type: "control/for/text",
        initialValue: "x",
        hasStatement: "País:",
        hasDescription: "Aquí va el país",
      },
      sex: {
        hasStatement: "Sexo:",
        hasDescription: "Aquí va el sexo",
        onValidate: function (value, settings, component, indexes, assertion) {
          assertion(value.startsWith("male"), `Parameter «sexo»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must start be «male» on «NwtResource.for('control/for/text').control.onValidate»`);
        },
        type: "control/for/option",
        schema: [{
          type: "control/for/text",
          hasFixedValue: "female",
        }, {
          type: "control/for/text",
          hasFixedValue: "male",
        }]
      }
    },
  },
});

assertion(typeof answer1 === "object", "Parameter «answer1» should be object");
assertion(Array.isArray(answer1), "Parameter «answer1» should be array not only object");
assertion(answer1.length === 1, "Parameter «answer1.length» should be 1");
assertion(typeof answer1[0].name === "string", "Parameter «answer1[0].name» should be string");
assertion(typeof answer1[0].age === "number", "Parameter «answer1[0].age» should be number");
assertion(typeof answer1[0].city === "string", "Parameter «answer1[0].city» should be string");
assertion(typeof answer1[0].country === "string", "Parameter «answer1[0].country» should be string");
assertion(typeof answer1[0].sex === "string", "Parameter «answer1[0].sex» should be string");

tester.progressBar.advance(1);

const answer2 = await NwtFormMaker.dialog.fromSchema({
  type: "control/for/structure",
  initialValue: {
    name: "doctor jones",
    age: 40,
    city: "indiana",
    country: "usa",
    sex: "male",
  },
  hasStatement: "Datos de persona",
  hasDescription: "Aquí van todos los datos de 1 persona",
  schema: {
    name: {
      type: "control/for/text",
      // hasHeader: "<div class='title'>Nombre de la persona</div>",
      hasStatement: "Nombre:",
      hasDescription: "Aquí va el nombre",
      onValidate: function (value, settings, component, indexes, assertion) {
        assertion(value.startsWith("C"), `Parameter «value»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must start with «C» on «NwtResource.for('control/for/text').control.onValidate»`);
      }
    },
    age: {
      type: "control/for/text",
      hasStatement: "Edad:",
      hasDescription: "Aquí va la edad",
    },
    city: {
      type: "control/for/text",
      hasStatement: "Ciudad:",
      hasDescription: "Aquí va la ciudad",
    },
    country: {
      type: "control/for/text",
      initialValue: "x",
      hasStatement: "País:",
      hasDescription: "Aquí va el país",
    },
    sex: {
      hasStatement: "Sexo:",
      hasDescription: "Aquí va el sexo",
      onValidate: function (value, settings, component, indexes, assertion) {
        assertion(value.startsWith("male"), `Parameter «sexo»${NwtStatic.api.control.validation.interface.utils.getIndexesErrorMessage(indexes)} must start be «male» on «NwtResource.for('control/for/text').control.onValidate»`);
      },
      type: "control/for/option",
      schema: [{
        type: "control/for/text",
        hasFixedValue: "female",
      }, {
        type: "control/for/text",
        hasFixedValue: "male",
      }]
    }
  },
});

assertion(typeof answer2 === "object", "Parameter «answer2» should be object");
assertion(typeof answer2.name === "string", "Parameter «answer2.name» should be string");
assertion(typeof answer2.age === "number", "Parameter «answer2.age» should be number");
assertion(typeof answer2.city === "string", "Parameter «answer2.city» should be string");
assertion(typeof answer2.country === "string", "Parameter «answer2.country» should be string");
assertion(typeof answer2.sex === "string", "Parameter «answer2.sex» should be string");

tester.progressBar.advance(1);
