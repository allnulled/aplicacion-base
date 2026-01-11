Vue.directive("forms", {
  bind(el, binding, vnode) {
    const value = binding.value || {};
    const modifiers = binding.modifiers;
    if (modifiers.form) {
      NwtFormUtils.from.element.to.form(el, value, vnode);
    } else if (modifiers.control) {
      NwtFormUtils.from.element.to.control(el, value, vnode);
    } else if (modifiers.handler) {
      NwtFormUtils.from.element.to.handler(el, value, vnode);
    } else {
      throw new Error("Directive «v-forms» must be attached to one modifier at least «form», «control» or «handler» on «vForms.bind»");
    }
  }
});
