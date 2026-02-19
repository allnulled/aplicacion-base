# Flujos de desarrollo

Un flujo de desarrollo es un proceso dentro del proceso de desarrollo.

## Flujos de desarrollo entorno a `Resource`

La API de `Resource` sirve para representar definiciones y adjuntarles una forma de acceso a APIs que escale bien y sea cómoda.

### Los 3 flujos de `Resource`

La API de Resource contempla 3 flujos de desarrollo principales, que se resumen a continuación:

- crear una `Resource API`: **`assets/app/resource/compilable`**
   - solo definición abstracta
   - aquí no debería haber métodos en código
      - a no ser que sean exclusivos de este tipo de `Resource`
      - en el sentido de que no son susceptibles de usarse como herencia, hacia arriba o abajo de la jerarquía
      - y en el fondo, todos serían susceptibles de ello.
- crear una `Resource Helper API`: **`assets/app/resource/api/helpers`**
   - solo APIs compartidas por varios `Resource`
   - aquí van todos las APIs y métodos de `Resource`
      - porque el `this:NwtResource` puede conservarse hasta la función escondida entre muchas propiedades (con `NwtResourceApi.Nexer`)
      - se distribuyen por grupos de API que se deben registrar con `NwtResourceApi.register`
      - pero los grupos pueden luego subdividirse en más grupos y el `this:NwtResource` mantenerse hasta cualquier función.
- crear una `Static Helper API`: **`assets/app/static/api/helpers`**
   - toda la lógica posible.
   - idealmente, la `Resource API` y la `Resource Helper API` no codifican funciones, sino que pasan punteros o factorizan llamadas a métodos de la `Static Helper API`
      - se evita fabricación innecesaria de funciones e instancias adaptadoras o intermedias
      - se centraliza y organiza lo máximo posible la lógica

La idea es hacer un buen uso de los recursos que JavaScript nos brinda. No es C++ (bueno sí, pero por debajo solamente), pero JavaScript es muy poderoso igualmente. Y bonito.