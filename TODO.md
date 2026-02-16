16/02/2026


- [ ] API de Settings Prop:
   - [ ] settingsProp admite definiciones tipo vue2 pero aplicadas a settings

- [x] Mejoras en resource-compiler:
   - [x] $inheritedBy deja la huella de todos los traits aplicados por orden
      - [x] Permite recursividad linial
   - [x] Traits recursive inheritance automática en compilation-time
      - [x] Gracias a recursividad linial
   - [x] Libertad para importaciones en vivo en compilation-time
      - [x] con __dirname
      - [x] con __filename
      - [x] con module.exports
- [x] APIs automáticamente acopladas
   - [x] Sin consumir scopes
   - [x] ...etc etc





































12/02/2026

- [ ] Que se imprima bien el control de option
   - [ ] ...
- [ ] Que pase el valor a su descendiente
- [ ] Que admita también la validación desde tipos intermedios
   - [ ] structure
   - [ ] list
   - [ ] option
- [ ] Que admita también la validación desde el formulario
   - [ ] en principio, como structure


09/02/2026

- [x] Que soporte subtypeOf en validación
   - [x] como una capa anterior que si la tiene, la usa como validator anterior

10/02/2026

- [x] Que la validación se pueda pasar un índice del value
   - [x] y de un mejor reporte de los errores
- [x] Eliminar completamente subtypeOf para validación y para todo
   - [x] en su lugar, si statics.controls tiene algo, se valida
- [x] Que control se herede estáticamente vía traits
   - [x] que el trait de controls pueda ser objeto directo o función que retorna objeto
   - [x] que desde el trait de controls funcional se pueda acceder al statics con el this
   - [x] así para heredar controls solo:
      - [x] `...this.traits['@control/for/supertype'].controls`
- [ ] Constructor de formularios lazy
   - [ ] como componente vue2
   - [ ] que le pasas lo que le pasarías al validator
   - [ ] pero te construye un formulario con resources lazy
- [ ] Hacer compatible la validación con los formularios lazy
   - [ ] que los controles acumulen sus propios errores
   - [ ] que los handlers de errores muestren los errores de control
- [ ] Hacer compatible la validación con los questions.js
   - [ ] soporte para files
   - [ ] ...


08/02/2026

- [ ] Conseguir que el validation funcione:
   - [ ] Usando por debajo la validación del trait del id statics del último componente sobreescritor.
   - [ ] Usando para llamar la API de validación estática paralela.
      - [ ] Que llame al onValidate del trait estático correspondiente
      - [ ] Que llame al onValidate del componente después si es que lo hay
      - [ ] Que continúe llamando a todos los onValidate necesarios
      - [ ] Que devuelva los errores acumulados
- [ ] Hacer un test de la validación para que se vea que ya funciona
- [ ] Hacer los componentes:
   - [ ] @control/for/text
   - [ ] @control/for/list
   - [ ] @control/for/structure
   - [ ] @control/for/option
   - [ ] Que tengan validación
      - [ ] Tanto estática
      - [ ] Como dinámica
         - [ ] La dinámica propaga los errores a los handlers

02/02/2026

- [x] Tener una API abstracta heredable a nivel Feature en:
   - [x] Esto afecta al mixer, que tiene que añadir un `Object.assign` a:
   - [x] `statics.traits[featureId].property`

AHORA:

- [ ] Que command.js inyecte solamente 1 parámetro:
   - [ ] context
- [ ] Que la API de Command Synchronizer funcione pasándole este `{context}`
- [ ] Que el método `NwtCommandSynchronizer.run(context, events)` funcione
   - [ ] con el caché
      - [ ] y su string-shortener
   - [ ] con la interrupcibilidad
   - [ ] con la sincronización con el diálogo
   - [ ] con el tester
   - [ ] con la progressBar del tester
   - [ ] con los events
      - [ ] y su onIteration opcional a
      - [ ] la collection
   - [ ] con el context solamente inyectado en command.js
      - [ ] y todas las variables dentro
   - [ ] con los parámetros que
      - [ ] en form se preparan pero
      - [ ] en view se pasarían vacíos
      - [ ] incluido files que sería interesante para
         - [ ] pipeo de comandos


- [ ] Que Formulator API
   - [ ] se pueda empalmar con controles/formularios desde:
      - [ ] `command/questions.js`
      - [ ] `NwtCommand.create("wherever/anever").start.form({what:"ever"});`
   - [ ] se pueda empalmar con controles/formularios desde:
      - [ ] `database/schema.json`
      - [ ] `Fooldb.schema.tables[table]` que es implícitamente
         - [ ] `=== {type:"group/structure"}`
      - [ ] `Fooldb.schema.tables[table].controls[column]` que es validatoriamente
         - [ ] `=== {"Property name":{type:"whatever"}}`
   - [ ] se pueda empalmar con controles/formularios desde:
      - [ ] `component/for/«subpath/for/submodule»/component/component.{html,css,js}`


26-01-2026

- [ ] Comandos API:
   - [ ] Command Synchronizer API
      - [x] Que haga la caché automática
      - [x] Que haga la iteración sobre collection opcionalmente
      - [x] Que haga la avanzar progressBar automáticamente
      - [x] Que permita interrupciones
         - [x] Vía diálogo.process.$closedAt
         - [x] Vía abortController
      - [ ] Que unifique todos los parámetros del script en 1 variable
         - [ ] No inyecciones rándom en el namespace
         - [ ] Usaríamos NwtCommandContext o algo.
      - [ ] ...
   - [ ] Command Form API
      - [ ] Compliant con la Forms API
      - [ ] Compliant con la V-Forms API
      - [ ] Compliant con la Database Schema API
         - [ ] Esto va a ser difícil
   - [ ] Y finalmente:
      - [ ] COMANDOS DEL SCRIPT
         - [ ] Concatenar txt
         - [ ] Concatenar csv
         - [ ] Pedir salida a ChatGPT
         - [ ] Por yomitoku
         - [ ] Por imagemagick
         - [ ] ...
         - [ ] ...y todos


Y estamos y seguimos desde aquí.














- [x] Paneles top-bottom fijos en dialogs, los cuales se tienen que aplicar a:
   - [ ] Explorador de ficheros y controles relacionados
      - [ ] Explorador normal
      - [ ] File picker
      - [ ] Directory picker
      - [ ] New file picker

----

16-01-2026

- [ ] Controles para los file-chooser en la API de Forms:
      - [ ] File picker
      - [ ] Directory picker
      - [ ] New file picker
      - [ ] Usando el top-bottom fijo anterior

- Y seguimos con el roadmap:

- [ ] Caché directory
   - [ ] Integrar en la commands api
   - [ ] Opcionalmente: no todos los comandos aplican caché por `programa+fichero`
   - [ ] Usando la interfaz NwtPersister directamente
- [ ] Abort en commands api === Cierre de proceso
   - [ ] Hacer el binding oficial
- [ ] Parámetro input === Retorno output
   - [ ] Y así poder encadenar comandos sobreentendiendo que la salida de uno es la entrada del otro
      - [ ] Esto se hace mediante un método intermedio, un `piper` pivote:
         - [ ] nada de implicidades, es un proceso explícito, que:
         - [ ] con un método intermedio se puede dar como implítico

- Y seguimos con los comandos iniciales


