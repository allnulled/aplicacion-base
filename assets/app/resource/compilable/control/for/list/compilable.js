module.exports = {
  id: "control/for/list",
  compile: true,
  compileView: true,
  apis: [
    "control",
    "view",
    "validation",
  ],
  inherits: [
    "control/trait/for/valueBySelector",
    "control/trait/for/settings",
  ],
  settingsSpec: {
    schema: {
      type: [LowCode.type.Object],
      default: LowCode.type.Null
    },
  },
  view: {
    name: "NwtControlForList",
    template: $template,
    data: function() {
      return {
        currentPage: 0,
        maximumItems: 10,
      };
    },
    computed: {
      totalItems: function() {
        return this.$local?.list?.length || 0;
      }
    },
    mounted: function() {
      trace("NwtControlForList.mounted");
      NwtVue2.Toolkit.installToolkit(this);
      this.digestSearch();
    },
    methods: {
      digestSearch: function() {
        
      }
    }
  },
  control: {
    
  },
};