return await NwtFeatureMixer.component({
  name: "NwtControlForBoolean",
  statics: {
    id: "@control/for/boolean",
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
      "@control/for/boolean": {
        onValidate(value, schema, component, assertion) {
          trace("NwtControlForBoolean.statics.traits['@control/for/boolean'].onValidate");
          assertion(typeof value === "boolean", `Parameter «value» must be boolean but «${typeof value}» was found instead on «NwtControlForBoolean.statics.traits['@control/for/boolean'].onValidate»`);
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