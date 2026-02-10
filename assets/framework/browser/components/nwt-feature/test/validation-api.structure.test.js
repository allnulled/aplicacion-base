const oneFeature = NwtFeatureStatics.create();
Un_control_simple: {
  let isPassing = false;
  let validation = false;
  try {
    validation = await oneFeature.api.validate(500, { type: "@control/for/text" });
  } catch (error) {
    isPassing = true;
  }
  if(!isPassing) throw new Error("Should have thrown on 1");
  assertion(validation === false, "err 2");
  assertion(isPassing === true, "err 3");
  validation = await oneFeature.api.validate("500", { type: "@control/for/text" });
  assertion(validation === true, "err 4");
}

Un_control_structure: {
  const validation = await oneFeature.api.validate({
    // @TODO:
    // Debería estar saltando error ahora mismo
    // Porque no es un OPTION + UNDEFINED para permitirlos en blanco
    name: "ok",
    message: "ok",
    moment: "ok",
    birth: {
      street: "ok",
      city: "ok",
      day: "500",
      events: [{
        date: "ok",
        name: "500"
      }]
    }
  }, {
    // Esto es el overrider del settings.controls para que se sepa que es un parámetro importante:
    type: "@control/for/structure",
    controls: {
      name: {
        type: "@control/for/text"
      },
      message: {
        type: "@control/for/text"
      },
      moment: {
        type: "@control/for/text"
      },
      birth: {
        type: "@control/for/structure",
        controls: {
          street: {
            type: "@control/for/text"
          },
          city: {
            type: "@control/for/text"
          },
          day: {
            type: "@control/for/text"
          },
          events: {
            type: "@control/for/list",
            controls: {
              type: "@control/for/structure",
              controls: {
                date: {
                  type: "@control/for/text"
                },
                name: {
                  type: "@control/for/text"
                }
              }
            }
          }
        }
      }
    }
  });
  break Un_control_structure;
}