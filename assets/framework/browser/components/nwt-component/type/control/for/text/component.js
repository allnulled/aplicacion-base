return await NwtFeatureMixer.component({
  name: "NwtControlForText",
  statics: {
    id: "@control/for/text",
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
      "@control/for/text": {
        onValidate(context) {
          trace("NwtControlForText.statics.traits['@control/for/text'].onValidate");
          const { errors } = context;
          const value = context.getPointedValue();
          const pointerIndex = context.pointer.indexes.join("/");
          assertion(typeof value === "string", `The «value» must be a string on «${ pointerIndex ? pointerIndex : '*'}»`);
        }
      }
    },
    onValidate: function(context) {
      trace("NwtControlForText.statics.onValidate");
      return this.traits["@control/for/text"].onValidate(context);
    }
  },
  template: $template,
  props: {},
  mixins: [],
  methods: {},
  created() {},
  mounted() {},
});