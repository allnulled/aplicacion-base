const oneFeature = NwtFeatureStatics.create();

Un_control_list: {
  const validation = await oneFeature.api.validate([{
    // @TODO:
    // Debería estar saltando error ahora mismo
    // Porque no es un OPTION + UNDEFINED para permitirlos en blanco
    name: "ok",
    message: "ok",
    moment: "ok",
    birth: {
      street: "ok",
      city: "ok",
      day: "500"
    }
  }, {
    // @TODO:
    // Debería estar saltando error ahora mismo
    // Porque no es un OPTION + UNDEFINED para permitirlos en blanco
    name: "ok",
    message: "ok",
    moment: "ok",
    birth: {
      street: "ok",
      city: "ok",
      day: "500"
    }
  }], {
    // Esto es el overrider del settings.controls para que se sepa que es un parámetro importante:
    type: "@control/for/list",
    controls: {
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
            }
          }
        }
      }
    }
  });
  console.log(validation);
  break Un_control_list;
}