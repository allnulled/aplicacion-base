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
    "control/trait/for/showable",
    "control/trait/for/remoteValue",
    "control/trait/for/remoteSchema",
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
    created: function() {
      trace("NwtControlForList.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
    },
    mounted: function() {
      this.digestSearch();
    },
    methods: {
      getValueByState: function() {
        trace("NwtControlForList.methods.getValueByState");
        return [false, "right now", "on assets/app/resource/compilable/control/for/structure/compilable.js"];
      },
      addItem: function() {
        
      },
      digestSearch: function() {
        const list = [];
        Extract_list_from_get_value_by_index_and_pagination: {

        }
        this.$local.list = list;
      }
    }
  },
  control: {
    
  },
};