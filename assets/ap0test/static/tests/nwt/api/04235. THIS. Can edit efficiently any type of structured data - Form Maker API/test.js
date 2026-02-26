tester.progressBar.total = 2;

const schema1 = {
  type: "control/for/structure",
  schema: {
    name: {
      type: "control/for/text",
      hasStatement: "Nombre de la persona:",
      hasDescription: "Aquí va el nombre de la persona"
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
      schema: {
        type: "control/for/structure",
        schema: {
          name: {
            type: "control/for/text"
          },
          year: {
            type: "control/for/text"
          },
          director: {
            type: "control/for/text"
          }
        }
      }
    },
  }
};

tester.progressBar.advance(1);

//*
const answer1 = await NwtFormMaker.dialog.fromSchema(schema1, {
  name: "Doctor Jones",
  city: "Indiana",
  country: "USA",
  gender: "male",
  films: NwtArrayUtils.fromLoop([0,30],()=>NwtRandomizer.fromStructure({title:String,year:String,stars:Number,inEnglish:Boolean}))
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
