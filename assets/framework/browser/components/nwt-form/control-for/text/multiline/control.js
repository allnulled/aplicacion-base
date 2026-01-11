Vue.component("NwtFormControlForTextMultiline", {
  name: "NwtFormControlForTextMultiline",
  extends: Vue.options.components.NwtFormControlPrototype.options,
  template: $template,
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    extraClasses: {
      type: [String],
      default: () => "",
    },
    placeholder: {
      type: String,
      default: () => "",
    },
  },
  data() {
    trace("NwtFormControlForTextMultiline.data");
    return {
      isControl: "text/oneline",
    };
  },
  methods: {
    
  },
  created() {
    trace("NwtFormControlForTextMultiline.created");
    NwtFormUtils.validate.control.isControl(this);
    NwtFormUtils.validate.control.buttons(this);
    NwtFormUtils.validate.control.extraClasses(this);
    NwtFormUtils.validate.control.placeholder(this);
    NwtFormUtils.validate.control.value(this);
  },
  mounted() {},
});