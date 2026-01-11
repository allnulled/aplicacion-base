# Nwt Project Commands

Los comandos de proyecto son:

# Índice

- [Nwt Project Commands](#nwt-project-commands)
- [Índice](#índice)
  - [Comando para iniciar servidor](#comando-para-iniciar-servidor)
  - [Comando para iniciar interfaz gráfica](#comando-para-iniciar-interfaz-gráfica)
  - [Comando para compilar los fuentes](#comando-para-compilar-los-fuentes)
  - [Comando para modo desarrollo](#comando-para-modo-desarrollo)
  - [Comando para compilar la documentación](#comando-para-compilar-la-documentación)

## Comando para iniciar servidor

Si no tienes `nw.js` puedes utilizar un servidor con:

```sh
npm run ui:server
```

Este comando utiliza por debajo:

- [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) que viene instalado con `npm`
- [`npx http-server`](https://www.npmjs.com/package/http-server)

Así que deberían estar accesibles directamente desde línea de comandos.

## Comando para iniciar interfaz gráfica

Con este otro comando, arrancas la aplicación con `nw.js`:

```sh
npm run ui:desktop
```

Este comando utiliza por debajo:

- [`nw.js`](https://nwjs.io/)

Así que debería estar accesible desde línea de comandos como (`nw`).

Opcionalmente, si quieres personalizar la ruta de `nw`, puedes cambiar el valor de este comando en el `package.json`:

```sh
npm run ui:own
```

## Comando para compilar los fuentes

Con este otro comando, compilas el código fuente:

```sh
npm run build
```

Esto produce los 2 ficheros que te interesan porque recogen todo el framework:

- `assets/dist.css`
- `assets/dist.js`

Estos son los ficheros que tienes que incluir en cualquier proyecto para importar:

- `win7.css` - para estilos
- `vue2.js` - para plantillas
- `socket-io.client.js` - para refrescar automático
- `reloader` - para refrescar, proyecto embedido
- `nwt` - todas las APIs

Concretamente, puedes saberlo mejor en:

- `assets/builder/bundlelist.js` - lista de ficheros del framework, por orden

Esto se compila con:

- `assets/builder/bundle.js` que utiliza a
- `assets/builder/vuebundler.js`

## Comando para modo desarrollo

Para el modo desarrollo necesitas 3 consolas abiertas.

La primera consola para compilar automáticamente al detectar cambios:

```sh
npm run dev
```

La segunda consola para refrescar automáticamente:

```sh
npm run refresh
```

La tercera consola sería para arrancar la interfaz gráfica:

```sh
npm start
```

## Comando para compilar la documentación

Para volver a construir la documentación:

```sh
npm run build:docs
```

Esto utiliza:

- `assets/builder/build-docs.js` que por debajo usará
- [`@allnulled/javadoc-brute`](https://github.com/allnulled/javadoc-brute)