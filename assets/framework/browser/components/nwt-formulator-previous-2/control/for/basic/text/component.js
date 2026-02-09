const component = await NwtFormulatorFeatureMixer.mix([
  "feature/for/control/trait/abstraction",
  "feature/for/control/trait/getValue",
  "feature/for/control/trait/hasDescription",
  "feature/for/control/trait/hasPlaceholder",
  "feature/for/control/trait/hasStatement",
  "feature/for/control/trait/isExpanded",
  "feature/for/control/trait/settings",
  "feature/for/control/trait/validate",
  // La última interfaz es la de nuestro componente:
  {
    abstraction: {
      name: "control/for/basic/text",
      settings: {},
    },
    view: {
      template: $template,
    },
  }
]);

Vue.component("nwt-formulator-control-for-basic-text", component);