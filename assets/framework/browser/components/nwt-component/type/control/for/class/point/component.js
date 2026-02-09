return await NwtFeatureMixer.component({
  name: "NwtControlForPoint",
  statics: {
    id: "@control/for/class/point",
    subtypeOf: "@control/for/structure",
    inherits: [
      "@control/for/structure",
    ],
    controls: {
      x: {
        type: "@control/for/number"
      },
      y: {
        type: "@control/for/number"
      }
    },
    traits: {
      "@control/for/class/point": {
        onValidate: async function(value, schema, component = {}, assertion) {
          trace("NwtControlForPoint.statics.traits['@control/for/class/point'].onValidate");
          console.log("OKKKK:", this);
        }
      }
    },
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