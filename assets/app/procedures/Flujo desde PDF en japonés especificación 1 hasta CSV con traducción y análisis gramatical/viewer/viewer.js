Vue.component("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalViewer", {
  template: $template,
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data() {
    trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalViewer.data");
    return {
      tester: false
    };
  },
  methods: {
    debuggingForDemonstration(...args) {
      console.log(...args);
    }
  },
  created() {
    trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalViewer.created");
    try {
      assertion(typeof this.dialog.context.parameters?.files === "object", "Cannot run procedure without passing «files» parameter on «ProcedureConvertirDePdfAPngPorImagemagickViewer.created»");
      assertion(typeof this.dialog.context.parameters?.output === "string", "Cannot run procedure without passing «output» parameter on «ProcedureConvertirDePdfAPngPorImagemagickViewer.created»");
    } catch (error) {
      return this.dialog.cancel();
    }
    this.tester = NwtTester.create("Progreso de flujo desde PDF en japonés especificación 1 hasta CSV con traducción y análisis gramatical", async (tester, assertion) => {
      assertion(true, "Procedimiento iniciado");
      tester.progressBar.total = this.dialog.context.parameters.files.length * 8;
      const path = require("path");
      const files = this.dialog.context.parameters.files;
      assertion(true, `Limpiando directorios temporales de aplicación`);
      await NwtFilesystem.clearTemporaryDirectories();
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        assertion(true, `Iniciando procesamiento de fichero «${file}».`);
        assertion(true, `Creando directorios necesarios`);
        const basedir = await NwtFilesystem.createTemporaryDirectory();
        const dir1 = path.resolve(basedir, "step_1_pdf_to_png");
        const dir2 = path.resolve(basedir, "step_2_png_to_png_recortado");
        const dir3 = path.resolve(basedir, "step_3_png_to_txt");
        const dir4 = path.resolve(basedir, "step_4_txt_to_txt_unificado");
        const dir5 = path.resolve(basedir, "step_5_txt_to_csv");
        const dir6 = path.resolve(basedir, "step_6_csv_to_csv_paginado");
        const dir7 = path.resolve(basedir, "step_7_csv_to_csv_expandido");
        const dir8 = path.resolve(basedir, "step_8_csv_to_csv_unificado");
        Crear_directorios_necesarios: {
          const allDirs = [dir1, dir2, dir3, dir4, dir5, dir6, dir7, dir8];
          for (let indexDir = 0; indexDir < allDirs.length; indexDir++) {
            const currentDir = allDirs[indexDir];
            await NwtFilesystem.mkdir(currentDir);
          }
        }
        Paso_1_de_PDF_a_PNG: {
          assertion(true, "Iniciando paso 1: de PDF a PNG (por imagemagick)");
          await NwtProceduresManager.global.findById("Convertir de PDF a PNG por imagemagick").startViewer({
            fromDialog: this.dialog,
            files: files,
            output: dir1,
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_2_de_PNG_a_PNG_recortado: {
          assertion(true, "Iniciando paso 2: de PNG a PNG recortado (por imagemagick)");
          await NwtProceduresManager.global.findById("Convertir de PNG a PNG recortado por imagemagick").startViewer({
            fromDialog: this.dialog,
            files: await NwtFilesystem.selectByGlob(path.resolve(dir1, "*.png")),
            output: dir2,
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_3_de_PNG_a_TXT_en_japones: {
          assertion(true, "Iniciando paso 3: de PNG a TXT en japonés (por yomitoku)");
          await NwtProceduresManager.global.findById("Convertir de PNG a TXT en japonés por yomitoku").startViewer({
            fromDialog: this.dialog,
            files: await NwtFilesystem.selectByGlob(path.resolve(dir2, "*.png")),
            output: dir3,
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_4_concatenar_TXT: {
          assertion(true, "Iniciando paso 4: concatenar ficheros TXT (por node.js)");
          await NwtProceduresManager.global.findById("Concatenar ficheros por node.js").startViewer({
            fromDialog: this.dialog,
            files: await NwtFilesystem.selectByGlob(path.resolve(dir3), "*"),
            output: dir4,
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_5_de_TXT_en_japones_a_CSV: {
          assertion(true, "Iniciando paso 5: de TXT en japonés a CSV (por chatgpt)");
          await NwtTimer.timeout(500 + 40);
          return;
          await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
            fromDialog: this.dialog
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_6_de_CSV_a_CSV_paginado: {
          assertion(true, "Iniciando paso 6: de CSV a CSV paginado (por node.js)");
          await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
            fromDialog: this.dialog
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_7_de_CSV_a_CSV_expandido: {
          assertion(true, "Iniciando paso 7: de CSV a CSV expandido (por chatgpt)");
          await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
            fromDialog: this.dialog
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        Paso_8_concatenar_CSV: {
          assertion(true, "Iniciando paso 8: concatenar ficheros CSV (por node.js)");
          await NwtProceduresManager.global.findById("Prototipo para tester y progressBar").startViewer({
            fromDialog: this.dialog
          });
          tester.progressBar.advance(1);
          await NwtTimer.timeout(500 + 40);
          if (this.dialog.process.$closedAt) return;
        }
        assertion(true, `Terminado procesamiento de fichero «${file}».`);
      }
      assertion(true, "Procedimiento finalizado");
      await NwtTimer.timeout(500);
    });
  },
  async mounted() {
    trace("ProcedureFlujoDesdePdfEnJaponesEspecificacion1HastaCsvConTraduccionYAnalisisGramaticalViewer.mounted");
    (async () => {
      await this.tester.start();
      await this.$nwt.Timer.timeout(1000);
      this.dialog.cancel();
    })();
  }
});