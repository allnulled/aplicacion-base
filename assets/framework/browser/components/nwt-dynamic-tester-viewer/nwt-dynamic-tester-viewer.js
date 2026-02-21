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
      }).filter(t => ("/"+t.id).indexOf("/--") === -1).sort((t1,t2) => {
        return t1.id > t2.id ? 1 : -1;
      });
    },
    runAllTests() {
      trace("NwtDynamicTesterViewer.methods.runAllTests");
      const allTests = this.testsFound;
      return this.runTest({id: "Todos los tests dinámicos"}, async function(tester, assertion, dialog) {
        trace("NwtDynamicTesterViewer.methods.runAllTests#TestCallback");
        for(let index=0; index<allTests.length; index++) {
          const test = allTests[index];
          await tester.define(`Test de: ${test.id}`, async (subtest,assertion) => {
            await NwtImporter.asyncSource(test.js, { tester: subtest, assertion });
          });
        }
      });
    },
    async runTestCallback(tester, assertion, dialog, test) {
      await NwtImporter.asyncSource(test.js, { tester, assertion });
    },
    runTest(test, coreCallback = this.runTestCallback) {
      trace("NwtDynamicTesterViewer.methods.runTest");
      const testerViewer = this;
      const testUniqueId = `Test de: ${test.id}`;
      return NwtDialogs.open({
        title: testUniqueId,
        template: `
          <div class="pad_1">
            <div class="flex_row centered pad_bottom_1">
              <div class="flex_100"></div>
              <div class="flex_1">
                <button class="mini nowrap" v-on:click="rerunTest">♻️ Repetir</button>
              </div>
            </div>
            <nwt-tester-viewer :tester="tester" />
          </div>
        `,
        factory: {
          data: function() {
            return {
              hasFailed: false,
              tester: NwtTester.create(testUniqueId, async (tester, assertion) => {
                tester.dialog = this;
                await coreCallback.call(testerViewer, tester, assertion, this, test);
              }, {
                onTestSuccess: async () => {
                  await NwtTimer.timeout(1000 * 0.5);
                  if(this.hasFailed) return;
                  this.cancel();
                },
                onTestFailure: async () => {
                  this.hasFailed = true;
                }
              }),
            };
          },
          methods: {
            rerunTest() {
              trace("NwtDynamicTesterViewer.methods.runTest/dialog.methods.rerunTest");
              this.cancel();
              testerViewer.runTest(test);
            }
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
