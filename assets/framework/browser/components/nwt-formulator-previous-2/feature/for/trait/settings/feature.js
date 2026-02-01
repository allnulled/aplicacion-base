return {
  abstraction: {
    name: "feature/for/trait/settings",
    settings: {
  
    },
  },
  view: {
    props: {
      settings: {
        type: Object,
        required: true,
      }
    },
    created() {
      NwtUtils.initializePropertiesOf(this.settings, this.specification.settings || {});
    },
    methods: {

    },
    watch: {

    }
  }
};