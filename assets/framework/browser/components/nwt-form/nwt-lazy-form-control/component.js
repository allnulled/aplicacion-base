Vue.component("NwtLazyFormControl", {
  name: "NwtLazyFormControl",
  template: $template,
  props: {
    definition: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      wasLoaded: false,
      loaded: false,
    };
  },
  methods: {
    
  },
  computed: {
    isStructure() {
      return this.definition.type === "@control/for/structure";
    },
    isList() {
      return this.definition.type === "@control/for/list";
    }
  },
  created() {
    trace("NwtLazyFormControl.created");
    assertion(typeof this.definition === "object", "Property «definition» must be object on «NwtLazyFormControl.created»");
    assertion(typeof this.definition.type === "string", "Property «definition.type» must be string on «NwtLazyFormControl.created»");
    
  },
  async mounted() {
    trace("NwtLazyFormControl.mounted");
    this.loaded = await NwtLazyControl.create(this.definition.type.replace(/^\@/g,"")).load();
    this.wasLoaded = true;
  },
});