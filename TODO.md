31-12-2025

- [x] Estamos con v-forms.{form,control,handler}
- [x] Necesitamos:
   - [x] NwtFormControlForList
      - [x] que acepte :controls=[]
   - [x] NwtFormControlForStructure
      - [x] que acepte :controls=[]

----

15-01-2026

- [x] Paneles top-bottom fijos en dialogs, los cuales se tienen que aplicar a:
   - [x] Ficheros ChatGPT
   - [x] Configuraciones
   - [x] Prompts
   - [x] Procesos
   - [x] Procedimientos
   - [ ] Explorador de ficheros
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


