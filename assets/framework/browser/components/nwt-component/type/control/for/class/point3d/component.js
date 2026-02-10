return await NwtFeatureMixer.component({
  name: "NwtControlForPoint3d",
  statics: {
    id: "@control/for/class/point3d",
    inherits: [
      "@control/for/class/point",
    ],
    controls: {
      type: "@control/for/structure",
      controls: {
        // @INHERITANCE NOT ALLOWED YET:
        x: {
          type: "@control/for/number"
        },
        y: {
          type: "@control/for/number"
        },
        z: {
          type: "@control/for/number"
        }
      }
    },
    traits: {
      "@control/for/class/point3d": {
        onValidate: async function (value, schema, component = {}, assertion) {
          trace("NwtControlForPoint3d.statics.traits['@control/for/class/point3d'].onValidate");
          // @TOSEE: extra checks, if any
          console.log("OKKKK3d:", this, schema);
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
  created() { },
  mounted() { },
});