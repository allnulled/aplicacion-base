20-12-2025

- [ ] PRIORIDAD:
- [ ] En el procedimiento "Flujo desde PDF en japonés especificación 1 hasta CSV con traducción y análisis gramatical"
   - [ ] Y EXPLICAR EN EL PROCEDURE.md QUE:
      - [ ] como buena práctica en flujos en general
      - [ ] esto es para que los procedimientos de tipo "flujo"
         - [ ] tengan memoria estática cross-execution
         - [ ] basada en el nombre del fichero
            - [ ] so, el nombre de fichero es muy importante
            - [ ] y puede ser fuente de "falsos bugs"
            - [ ] y habría que documentarlo en alguna parte
         - [ ] y se hace así para que los flujos puedan tener memoria
         - [ ] y re-aprovechar el estado de los ciclos anteriores
         - [ ] entonces no hacer clearTemporaryDirectories
  - [ ] pues en los flujos
     - [ ] usar "createTemporaryDirectory(filename)" pasándole el nombre del fichero
     - [ ] y retomar el proceso desde ahí

- [ ] Resolver los procedimientos de ChatGPT
   - [ ] Convertir de texto en japonés a CSV de especificación 1 por chatgpt
      - [ ] Que tome ficheros de entrada
      - [ ] Que tome directorio de salida
      - [ ] Que muestre el progreso
   - [ ] Convertir de CSV a CSV expandido de especificación 1 por chatgpt
      - [ ] Que tome ficheros de entrada
      - [ ] Que tome directorio de salida
      - [ ] Que muestre el progreso
- [ ] Resolver el workflow inicial
   - [ ] Y demostrar que funciona

- [ ] Adaptar todos los flujos para que tomen ficheros de entrada y directorio de salida


- [x] Convertir de CSV a CSV paginado
   - [x] Que funcione
- [x] Corregir los pickDirectory():Array a pickDirectory():String

18-12-2025 - POR LA MAÑANA:

- [ ] Preparar un "espacio"/"programa disponible" para prompts
   - [x] Un directorio que llamando a glob coja todos los PROMPT.md
   - [x] Y los liste
   - [x] Así se permite que una carpeta pueda tener muchas subcarpetas, pero funcione igual
   - [x] Con un botón para EDITAR prompt
      - [x] Que permita editar realmente el prompt
   - [x] Con un botón para ELIMINAR prompt
      - [x] Que permita eliminar la carpeta del prompt
   - [x] Con un botón para SELECCIONAR prompt
      - [x] si se le pasa un :chooser="true"
   - [x] adaptarlo para que lo coja de la carpeta de AppData
      - [x] NO rutas internas del proyecto
      - [x] SÍ ruta externa al proyecto
         - [x] Para mantenerlos a través de «git clones»

18-12-2025 - POR LA TARDE:

- [x] Adaptar los clearFileSeparatorOnExtremes
   - [x] Para que funcione en Windows y Linux
- [x] Hacer que los sub-procedimientos sean procesos hijo
   - [x] Demostrar cómo se programa un procedimiento con subprocedimientos
   - [x] Demostrar que si cierras el proceso padre, se para el progreso 
      - [x] Esto si lo has picado bien para que suceda así
   - [x] Dejar un procedimiento de muestra