return await NwtFeatureMixer.component({
  name: "NwtControlForNumber",
  statics: {
    id: "@control/for/number",
    inherits: [
      "@feature/for/control/trait/statics",
      "@feature/for/control/trait/settings",
      "@feature/for/control/trait/getValue",
      "@feature/for/control/trait/isExpanded",
      "@feature/for/control/trait/hasDescription",
      "@feature/for/control/trait/hasPlaceholder",
      "@feature/for/control/trait/hasStatement",
      "@feature/for/control/trait/validate",
    ],
    traits: {
      "@control/for/number": {
        onValidate(value, schema, component, assertion, indexes) {
          trace("NwtControlForNumber.statics.traits['@control/for/number'].onValidate");
          assertion(typeof value === "number", `Parameter «value» must be number but «${typeof value}» was found instead @index «${indexes.join(".")}» on «NwtControlForNumber.statics.traits['@control/for/number'].onValidate»`);
        }
      }
    },
  },
  template: $template,
  props: {},
  mixins: [],
  methods: {},
  created() {},
  mounted() {},
});