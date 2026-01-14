



# Nwt Common Injections API

API para inyecciones globales. Se inyecta 1 componente global, `<common-injections />`.

## Exposición

Esta API no se expone, solo se inyecta en el DOM.

Pero se hace a través del componente vue2 `CommonInjections`.

## Ventajas

- Función 1 / `injectTouchability`
   - Hace que los eventos de touch (móvil) funcionen también como eventos click (PC) sin tener que cambiar el código.
- Función 2 / `injectKeyEventForProcessManager`
   - Hace que CTRL+SUPR abra un diálogo con un gestor de procesos
- Función 3 / `injectKeyEventForSettings`
   - Hace que ALT+S abra un diálogo de configuraciones globales

