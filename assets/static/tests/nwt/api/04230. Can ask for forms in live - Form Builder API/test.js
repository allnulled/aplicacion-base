tester.progressBar.total = 1;

const answer1 = await NwtForm.builder.ask({
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
        onValidate: function(value, settings, component, indexes, assertion) {
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
        defaultValue: "x",
        hasStatement: "País:",
        hasDescription: "Aquí va el país",
      },
      sex: {
        hasStatement: "Sexo:",
        hasDescription: "Aquí va el sexo",
        type: "control/for/option",
        schema: [{
          type: "control/for/text",
          hasFixedValue: "male"
        }, {
          type: "control/for/text",
          hasFixedValue: "female"
        }]
      }
    },
  },
});

assertion(typeof answer1 === "object", "Parameter «answer1» should be object");
assertion(typeof answer1.name === "string", "Parameter «answer1.name» should be string");
assertion(typeof answer1.age === "string", "Parameter «answer1.age» should be string");
assertion(typeof answer1.city === "string", "Parameter «answer1.city» should be string");
assertion(typeof answer1.country === "string", "Parameter «answer1.country» should be string");
assertion(typeof answer1.sex === "string", "Parameter «answer1.sex» should be string");

tester.progressBar.advance(1);