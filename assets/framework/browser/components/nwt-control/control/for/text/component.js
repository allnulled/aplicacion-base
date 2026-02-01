return await NwtFeatureMixer.component({
  name: "NwtControlForText",
  statics: {
    id: "control/for/text",
    inherits: [
      "feature/for/trait/statics",
      "feature/for/trait/settings",
      "feature/for/trait/getValue",
      "feature/for/trait/isExpanded",
      "feature/for/trait/hasDescription",
      "feature/for/trait/hasPlaceholder",
      "feature/for/trait/hasStatement",
      "feature/for/trait/validate",
    ],
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