return await NwtFeatureMixer.component({
  name: "NwtControlForText",
  statics: {
    id: "@control/for/text",
    inherits: [
      "@feature/for/control/trait/statics",
      "@feature/for/control/trait/settings",
      "@feature/for/control/trait/getValue",
      "@feature/for/control/trait/isShown",
      "@feature/for/control/trait/isExpanded",
      "@feature/for/control/trait/isLongText",
      "@feature/for/control/trait/hasDescription",
      "@feature/for/control/trait/hasPlaceholder",
      "@feature/for/control/trait/hasStatement",
      "@feature/for/control/trait/validate",
    ],
    composedBy: [
      "@control/partial/for/statement"
    ],
    traits: {
      "@control/for/text": {
        onValidate(value, schema, component, assertion, indexes) {
          trace("NwtControlForText.statics.traits['@control/for/text'].onValidate");
          assertion(typeof value === "string", `Parameter «value» must be string but «${typeof value}» was found instead @index «${indexes.join(".")}» on «NwtControlForText.statics.traits['@control/for/text'].onValidate»`);
        }
      }
    },
  },
  template: $template,
  props: {},
  mixins: [],
  methods: {},
  created() {},
  mounted() {
    
  },
});