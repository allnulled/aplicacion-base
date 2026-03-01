tester.progressBar.total = 2;

const schema1 = {
  type: "control/for/structure",
  schema: {
    name: {
      type: "control/for/text",
      hasStatement: "Nombre de la persona:",
      hasDescription: "Aquí va el nombre de la persona",
      onValidate: function(assertion, subvalue) {
        assertion(subvalue.startsWith("C"), "Value must start with C");
      }
    },
    city: {
      type: "control/for/text",
      hasStatement: "Ciudad de residencia:"
    },
    country: {
      type: "control/for/text",
      hasStatement: "País de origen:"
    },
    gender: {
      type: "control/for/option",
      hasStatement: "Género de la persona:",
      schema: [{
        type: "control/for/text",
        hasFixedValue: "female",
      }, {
        type: "control/for/text",
        hasFixedValue: "male",
      }]
    },
    films: {
      type: "control/for/list",
      hasStatement: "Películas donde ha participado:",
      hasStatementForItemByProperty: "title",
      schema: {
        type: "control/for/structure",
        schema: {
          title: {
            type: "control/for/text",
            hasStatement: "Título de la película"
          },
          year: {
            type: "control/for/text",
            hasStatement: "Año de la película"
          },
          stars: {
            type: "control/for/text",
            hasStatement: "Valoración en estrellas"
          },
          inEnglish: {
            type: "control/for/text",
            hasStatement: "¿La película está en inglés?"
          }
        }
      }
    },
    tipo1: {
      type: "control/for/option",
      schema: [{
        type: "control/for/structure",
        schema: {
          subtipo1: {
            type: "control/for/text",
          }
        }
      }, {
        type: "control/for/structure",
        schema: {
          subtipo2: {
            type: "control/for/text",
          }
        }
      }, {
        type: "control/for/structure",
        schema: {
          subtipo3: {
            type: "control/for/text",
          }
        }
      }]
    },
    tipo2: {
      type: "control/for/option",
      schema: [{
        type: "control/for/list",
        schema: {
          type: "control/for/structure",
          schema: {
            subtipo1: {
              type: "control/for/text",
            }
          }
        }
      }, {
        type: "control/for/structure",
        schema: {
          subtipo2: {
            type: "control/for/text",
          }
        }
      }, {
        type: "control/for/text",
      }]
    }
  }
};

tester.progressBar.total = 50;
//*
const films = [];
for (let index = 0; index < tester.progressBar.total; index++) {
  await NwtTimer.timeout(0);
  tester.progressBar.advance(1);
  films.push(NwtRandomizer.fromStructure({ title: String, year: String, stars: Number, inEnglish: Boolean }));
}

const answer1 = await NwtFormMaker.dialog.fromSchema(schema1, {
  name: "Doctor Jones",
  city: "Indiana",
  country: "USA",
  gender: "male",
  films: films,
});

/*
assertion(typeof answer1 === "object", "Parameter «answer1» should be object");
assertion(typeof answer1.name === "string", "Parameter «answer1.name» should be string");
assertion(typeof answer1.age === "number", "Parameter «answer1.age» should be number");
assertion(typeof answer1.city === "string", "Parameter «answer1.city» should be string");
assertion(typeof answer1.country === "string", "Parameter «answer1.country» should be string");
assertion(typeof answer1.gender === "string", "Parameter «answer1.gender» should be string");
//*/

tester.progressBar.advance(1);
