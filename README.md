# aplicacion-generica-v1

Punto de partida para el desarrollo de aplicaciones web basadas opcionalmente en nw.js.

# Índice

- [aplicacion-generica-v1](#aplicacion-generica-v1)
- [Índice](#índice)
- [Dependencias](#dependencias)
- [Instalación](#instalación)
- [Arranque](#arranque)
  - [Personalizar la ruta de nw](#personalizar-la-ruta-de-nw)
  - [Arranque por click en windows](#arranque-por-click-en-windows)
- [Framework](#framework)
- [Aplicación](#aplicación)

# Dependencias

Se necesita tener accesible desde línea de comandos:

- `git`: [https://git-scm.com/install/](https://git-scm.com/install/)
- `npm` y `node`: [https://nodejs.org/en/download](https://nodejs.org/en/download)
- `nw`: [https://nwjs.io/](https://nwjs.io/)

# Instalación

Primero, clonar el proyecto:

```sh
git clone https://github.com/allnulled/aplicacion-generica-v1.git .
```

Segundo, instalar dependencias de `node_modules`:

```sh
npm run install:all
```

# Arranque

Tercero, arrancar la aplicación. La aplicación está pensada para PC, así que es una aplicación desktop basada en [`nw.js`](https://nwjs.io/).

Para arrancarla:

```sh
npm run ui
```

Pero esto por debajo hace:

```sh
nw .
```

Y puede que quieras personalizar la ruta del binario `nw`.

## Personalizar la ruta de nw

Si necesitas personalizar la ruta del binario de `nw` puedes sobreescribir el comando:

```sh
npm run ui:own
```

El comando está en el `package.json#scripts`. Ahora su valor es:

```json
"ui:own": "~/.node-webkit/nw/nwjs-sdk-v0.82.0-linux-x64/nw ."
```

Modifica la ruta para que apunte al binario `nw.exe` que necesites.

## Arranque por click en windows

Para automatizar el arranque, en `windows` puedes crear un batch que haga:

```bat
cd C:\ruta\al\proyecto\clonado
nw .
```

Le pones de nombre `arranque.bat` (habiendo habilitado las extensiones de fichero) y cuando hagas doble click ya arrancaría. Le puedes cambiar el `nw` por la ruta la binario personalizado (`nw.exe`) también aquí.

# Framework

La documentación del framework está en:

- 🔧 [README-NWT.md](https://github.com/allnulled/aplicacion-generica-v1/blob/main/README-NWT.md)

# Aplicación

La documentación de la aplicación está en:

- 🚙 [README-APP.md](https://github.com/allnulled/aplicacion-generica-v1/blob/main/README-APP.md)