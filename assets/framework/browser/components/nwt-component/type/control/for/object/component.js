return await NwtFeatureMixer.component({
  name: "NwtControlForObject",
  statics: {
    id: "@control/for/object",
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
      "@control/for/object": {
        onValidate(value, schema, component, assertion) {
          trace("NwtControlForObject.statics.traits['@control/for/object'].onValidate");
          assertion(typeof value === "object", `Parameter «value» must be object but «${typeof value}» was found instead on «NwtControlForObject.statics.traits['@control/for/object'].onValidate»`);
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