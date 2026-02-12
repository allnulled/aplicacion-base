/**
 * 
 * # Nwt Dynamic Tester Viewer API / Componente Vue2
 * 
 * La Nwt Dynamic Tester Viewer API permite listar y correr los tests dinámicos.
 * 
 * Los tests dinámicos son bloques independientes de tests que se dejan en el código fuente
 * pero no se compilan en el `dist.js`, por tanto pueden ejecutarse vía AJAX cuando se precise.
 * 
 * La Nwt Dynamic Tester Viewer API ofrece el componente Vue2 para visualizar y ejecutar estos tests.
 * 
 */
Vue.component("NwtDynamicTesterViewer", {
  template: $template,
  props: {
    
  },
  data() {
    trace("NwtDynamicTesterViewer.data");
    return {
      testsFound: false,
    };
  },
  methods: {
    async loadTests() {
      trace("NwtDynamicTesterViewer.methods.loadTests");
      const found = await NwtFilesystem.selectByGlob(`${NwtPaths.global.projectRoot}/assets/static/tests/**/TEST.md`);
      this.testsFound = found.map(file => {
        return {
          fullpath: file,
          id: file.replace(NwtPaths.global.projectRoot + "/assets/static/tests/", "").replace(/\/TEST\.md$/g, ""),
          js: file.replace(/TEST\.md$/g, "test.js"),
        };
      });
    },
    async runTest(test) {
      trace("NwtDynamicTesterViewer.methods.runTest");
      const testUniqueId = `Test de: ${test.id}`;
      NwtDialogs.open({
        title: testUniqueId,
        template: `
          <div class="pad_1">
            <nwt-tester-viewer :tester="tester" />
          </div>
        `,
        factory: {
          data: function() {
            return {
              hasFailed: false,
              tester: NwtTester.create(testUniqueId, async (tester, assertion) => {
                tester.dialog = this;
                await NwtImporter.asyncSource(test.js, { tester, assertion });
              }, {
                onTestSuccess: async () => {
                  await NwtTimer.timeout(1000 * 2);
                  if(this.hasFailed) return;
                  this.tester.dialog.cancel();
                },
                onTestFailure: async () => {
                  this.hasFailed = true;
                }
              }),
            };
          },
          mounted() {
            this.tester.start();
          }
        }
      });
    }
  },
  async mounted() {
    trace("NwtDynamicTesterViewer.mounted");
    await this.loadTests();
  }
});
