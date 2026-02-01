const component = await NwtFormulatorFeatureMixer.mix([
  "feature/for/trait/abstraction",
  "feature/for/trait/getValue",
  "feature/for/trait/hasDescription",
  "feature/for/trait/hasPlaceholder",
  "feature/for/trait/hasStatement",
  "feature/for/trait/isExpanded",
  "feature/for/trait/settings",
  "feature/for/trait/validate",
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