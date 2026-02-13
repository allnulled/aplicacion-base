/**
 * 
 * # NwtTesterNode
 * 
 * Componente vue2 interno. No debe usarse, lo usa `NwtTesterViewer` por debajo.
 * 
 */
Vue.component("NwtTesterNode", {
  template: $template,
  props: {
    node: {
      type: Object,
      required: true,
    },
    viewer: {
      type: Object,
      required: true,
    },
    hasParent: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    trace("NwtTesterNode.data");
    return {};
  },
  mounted() {
    trace("NwtTesterNode.mounted");
    if(this.$refs.childrenBox) {
      this.$refs.childrenBox.scrollTop = this.$refs.childrenBox.scrollHeight - this.$refs.childrenBox.clientHeight;
    }
  }
});
