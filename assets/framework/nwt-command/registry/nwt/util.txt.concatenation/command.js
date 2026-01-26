// @TODO:
// mejor explotarlo como función asíncrona y punto.
// luego hacemos otras cosas


/**
 * 
 * ## Script de ejemplo de comando
 * 
 * Este fichero es clave para entender la API de comandos.
 * 
 * Estás en una async function.
 * 
 * Y se te está inyectando:
 * 
 * ```js
 * component:NwtAnonymousCommandView:NwtCommandViewInterface:NwtCommandContextInterface:Vue
 * component.dialog:NwtDialog
 * component.tester:NwtTester
 * component.cacher:NwtCacheDirectory
 * component.progressBar:NwtProgressBar
 * component.subtester:NwtTester
 * ```
 * 
 */
let context = {
  $command: command,
  $assertion: assertion,
  dialog: component.dialog,
  globalTester: component.tester,
  cacher: component.cacher,
  progressBar: component.tester.progressBar,
  subtester: tester,
  $files: typeof files !== "undefined" ? files : [], // desde donde se inyectan estos files? Pues desde el `NwtCommand.prototype.start.function({ files: ["whatever"] })` si se quiere.
};

let {
  // estos ya existen:
  $command,
  $assertion,
  $files,
  // Los que no existen como globales son estos:
  dialog,
  globalTester,
  cacher,
  progressBar,
  subtester,
} = context;

if ($files.length === 0) {
  // Esto es un test solamente, pero ya demuestra que el comando funciona:
  $files = [
    "file1.txt",
    "file2.txt",
    "file3.txt",
  ];
}

const MAIN_COMMAND_ITERATION = async function (file) {
  // @OK: pues esto, condensarlo a una API, y que el contexto que tienes aquí, lo puedas tener automático inyectado desde una API ordenadamente.
  await NwtTimer.timeout(1000);
  return {
    data: `File ${file} was saved and cached`,
    moment: NwtTimer.fromDateToString(new Date()),
    // Este es el flag activo clave, lo demás no vale para guardarlo en caché y saltarse el paso:
    cached: true,
  };
};

// @NOTA: Uso típico: for file, indexFile in $files:
if (Array.isArray($files) && $files.length) {
  const output = {};
  Cargar_test_general: {
    tester.progressBar.total = $files.length;
  }
  IteratingFiles:
  for (let indexFile = 0; indexFile < $files.length; indexFile++) {
    const file = $files[indexFile];
    const cacheableId = [file];
    Avanzar_test: {
      tester.progressBar.advance(1);
      assertion(true, `Inicio de interacción con el comando/fichero: «${cacheableId}»`);
    }
    Eskipear_por_cache: {
      const cacheableData = await cacher.loadStep(cacheableId);
      if (cacheableData?.cached === true) {
        output[file] = cacheableData;
        continue IteratingFiles;
      }
    }
    let cacheableData = null;
    Aqui_la_interaccion_con_el_fichero: {
      // @INJECTION: AQUÍ
      // Por esto estaba complicada la API.
      // Se cruzan varias APIs automáticamente.
      cacheableData = await MAIN_COMMAND_ITERATION(file);
    }
    Avisar_test: {
      assertion(true, `Final de interacción con el comando/fichero: «${cacheableId}»`);
    }
    Guardar_cache: {
      // Si no devuelve nada, no se cachea:
      if (cacheableData) {
        await cacher.saveStep(cacheableId, cacheableData);
      }
    }
    Eskipear_por_proceso_interrumpido: {
      if (dialog.process.$closedAt) {
        throw new Error(`Comando interrumpido por proceso: «${cacheableId}»`);
      }
    }
  }
  Notificar_fin_de_comando: {
    NwtToasts.show({
      title: `Comando «${command.getCommandName()}» finalizado`,
      text: `El comando fue terminado con éxito!`
    });
  }
  Salir_de_dialogo: {
    await NwtTimer.timeout(1000);
    dialog.cancel();
  }
  return output;
}

return false;


// La idea sería una api así:
const ALL_FILES = files; // este parámetro tiene que venir inyectado por el comando o command-view, y no es el caso.

return await NwtIterableCommandClass.create({
  cacheable: true, // se cachea por defecto en cada vuelta de collection
  collection: ALL_FILES || [], // inicialización del iterable
  output: [], // inicialización de la salida
  silent: false, // no hace el toast.show del final
  context: {
    command: command,
    assertion: assertion,
    dialog: component.dialog,
    globalTester: component.tester,
    cacher: component.cacher,
    progressBar: component.tester.progressBar,
    subtester: tester,
    files: typeof files !== "undefined" ? files : [], // desde donde se inyectan estos files? Pues desde el `NwtCommand.prototype.start.function({ files: ["whatever"] })` si se quiere.
  }
}, {
  onStart: async function (collection) {
    // @TODO: si solo quieres hacer 1 cosa, aquí
  },
  onIterate: async function (item, index) {
    // @TODO: si quieres interaccionar con cada item de la collection, aquí:
    const result = false;
    // @CAUTION: si devuelve algo, la caché se guardará/cargará en función de el onIterate si no lo hace ya onStart
    this.output.push(result);
    return {
      done: true, // este es el flag mágico para que el comando se cachee,
    };
  },
  onEnd: async function (collection) {
    // @TODO: si quieres despedirte de la iteración, aquí:
  }
}).iterate();