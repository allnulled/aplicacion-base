module.exports = {
  id: "control/for/list",
  subtypeOf: "list",
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
        totalPages: 0,
      };
    },
    computed: {
      
    },
    created: function() {
      trace("NwtControlForList.created");
      NwtVue2.Toolkit.installToolkit(this);
      NwtVue2.Toolkit.installLocal(this);
      this.$local.controls = {};
      this.$local.self = this;
      this.$local.paginatedList = [];
    },
    mounted: function() {
      trace("NwtControlForList.mounted");
      window.ll = this;
      this.digestSearch();
    },
    methods: {
      getValueByState: function() {
        trace("NwtControlForList.methods.getValueByState");
        // @TODO: tomar el valor de los controles interiores para devolver el propio
        trace("NwtControlForList.methods.getValueByState");
        const currentControls = this.$local.controls;
        const state = {};
        for(let prop in currentControls) {
          const control = currentControls[prop];
          const value = control.getValueByState();
          state[prop] = value;
        }
        return state;
      },
      goToFirst: function() {
        trace("NwtControlForList.methods.goToFirst");
        this.currentPage = 0;
        this.digestSearch();
      },
      goToPrevious: function() {
        trace("NwtControlForList.methods.goToPrevious");
        if(this.currentPage <= 0) return;
        this.currentPage--;
        this.digestSearch();
      },
      goToNext: function() {
        trace("NwtControlForList.methods.goToNext");
        this.updateTotalPages();
        if(this.currentPage >= this.totalPages) return;
        this.currentPage++;
        this.digestSearch();
      },
      goToLast: function() {
        trace("NwtControlForList.methods.goToLast");
        this.updateTotalPages();
        this.currentPage = (this.totalPages || 1) - 1;
        this.digestSearch();
      },
      updateTotalPages: function() {
        trace("NwtControlForList.methods.updateTotalPages");
        this.totalPages = Math.ceil(this.getValueByIndex().length / this.maximumItems);
      },
      generateDefaultItem: function() {
        trace("NwtControlForList.methods.generateDefaultItem");
        if(typeof this.settings.hasItemConstructor !== "undefined") {
          if(typeof this.settings.hasItemConstructor === "function") {
            return this.settings.hasItemConstructor.call(this, this);
          } else if(typeof this.settings.hasItemConstructor === "object") {
            return Object.assign({}, this.settings.hasItemConstructor);
          } else {
            return this.settings.hasItemConstructor;
          }
        }
        return {};
      },
      appendItem: function() {
        trace("NwtControlForList.methods.appendItem");
        const valueIndex = this.getIndexForValue();
        const insertedItem = this.generateDefaultItem();
        this.$toolkit.getRoot().$store.push(valueIndex, insertedItem);
        this.goToLast();
      },
      removeItem: function(positionInPage) {
        trace("NwtControlForList.methods.removeItem");
        const valueIndex = this.getIndexForValue();
        const positionOfFirstInPage = this.maximumItems * this.currentPage;
        this.$toolkit.getRoot().$store.splice(valueIndex, positionOfFirstInPage + positionInPage);
        this.digestSearch();
      },
      digestSearch: function() {
        trace("NwtControlForList.methods.digestSearch");
        const listBrute = this.getValueByIndex();
        const list = Array.isArray(listBrute) ? listBrute : [];
        this.totalPages = Math.ceil(list.length / this.maximumItems);
        const currentItem = this.maximumItems * this.currentPage;
        const paginatedList = [];
        for(let index=currentItem; index<(currentItem + this.maximumItems); index++) {
          const item = list[index];
          if(!item) continue;
          paginatedList.push({ index, item });
        }
        this.$local.paginatedList = paginatedList;
        this.$forceUpdate(true);
      }
    }
  },
  control: {
    
  },
};