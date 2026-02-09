return await NwtFeatureMixer.component({
  name: "NwtControlForArray",
  statics: {
    id: "@control/for/array",
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
      "@control/for/array": {
        onValidate(value, schema, component, assertion) {
          trace("NwtControlForArray.statics.traits['@control/for/array'].onValidate");
          assertion(typeof value === "object", `Parameter «value» must be object but «${typeof value}» was found instead on «NwtControlForArray.statics.traits['@control/for/array'].onValidate»`);
          assertion(Array.isArray(value), `Parameter «value» must be array but «${typeof value}» was found instead on «NwtControlForArray.statics.traits['@control/for/array'].onValidate»`);
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