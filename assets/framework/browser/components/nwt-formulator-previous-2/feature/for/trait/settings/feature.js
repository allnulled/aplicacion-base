return {
  abstraction: {
    name: "feature/for/control/trait/settings",
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
      NwtPrototyper.initializePropertiesOf(this.settings, this.specification.settings || {});
    },
    methods: {

    },
    watch: {

    }
  }
};