# Instrucciones

## Requisitos

Necesitas tener accesibles desde línea de comandos:

- [`npm` y `node`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [`nw`](https://nwjs.io/)

## Instalar

Actualmente, la única forma de instalación es desde línea de comandos:

```sh
git clone https://github.com/allnulled/aplicacion-base.git .
npm run install:all
```

## Iniciar

Teniendo `nw` disponible desde línea de comandos:

```sh
npm run ui
```

## Documentación

Está el framework y la aplicación (sobre él):

- [README-NWT.md](https://github.com/allnulled/aplicacion-base/tree/main/README-NWT.md) contiene la documentación del `NwtFramework`.
- [README-APP.md](https://github.com/allnulled/aplicacion-base/tree/main/README-APP.md) contiene la documentación de la aplicación.
- [README-API.md](https://github.com/allnulled/aplicacion-base/tree/main/README-API.md) contiene la documentación de la API en cuanto a dependencias mutuas.
- [README-DEV-FLOWS.md](https://github.com/allnulled/aplicacion-base/tree/main/README-DEV-FLOWS.md) contiene la documentación de los flujos de desarrollo más comunes.

## Pendientes

- Hay que normalizar todavía la API de forms:
   - Incorporar controles de formulario suficientes
   - v-forms.control
   - v-forms.form
- Simular los procesos de un sistema operativo para que no se quede funcionando un procedimiento.
- Cachear los resultados de cada parte del procedimiento para que no repita pasos que ya se hicieron.
- Completar los comandos iniciales
