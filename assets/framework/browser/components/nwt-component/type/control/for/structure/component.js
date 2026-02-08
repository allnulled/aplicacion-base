return await NwtFeatureMixer.component({
  name: "NwtControlForStructure",
  statics: {
    id: "@control/for/structure",
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
      "@control/for/structure": {
        onValidate(context) {
          trace("NwtControlForText.statics.traits['@control/for/structure'].onValidate");
          const value = context.getPointedValue();
          const pointerIndex = context.pointer.indexes.join("/");
          assertion(typeof value === "object", `Property «${ pointerIndex ? pointerIndex : '*'}» must be a object on «NwtControlForText.statics.traits['@control/for/structure'].onValidate»`);
          for(let propertyId in value) {
            // @TODO. Aquí habría que seguir.
            // Conseguir que se validen los subdatos de la structure
            // @RECUERDA que ahora tienes también:
            //   - ValidableSchema en context.schema
            //   - ValidationContextPointer en context.schemaPointer
          }
        }
      }
    },
    onValidate(context) {
      trace("NwtControlForStructure.statics.onValidate");
      return this.traits["@control/for/text"].onValidate(context);
    }
  },
  template: $template,
  props: {},
  mixins: [],
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
});