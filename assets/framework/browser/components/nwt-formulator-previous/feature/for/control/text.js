return {
  class: {
    name: "control/text",
  },
  inherits: [
    "control/trait/settings",
    "control/trait/getValue",
    "control/trait/hasPlaceholder",
    "control/trait/hasStatement",
    "control/trait/isExpanded",
  ],
  template: $template,
};