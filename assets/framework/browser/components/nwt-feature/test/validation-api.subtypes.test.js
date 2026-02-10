//*
await NwtValidator.validate({
  x: 10,
  y: 10,
}, {
  type: "@control/for/class/point",
});

Demo_that_fails_too: {
  let hasPassed = false;
  try {
    await NwtValidator.validate({
      x: 10,
      y: "10",
    }, {
      type: "@control/for/class/point",
    });
  } catch (error) {
    hasPassed = true;
  }
  assertion(hasPassed, "Should have passed (err 1)");
}
await NwtValidator.validate({
  x: 10,
  y: 10,
}, {
  type: "@control/for/class/point",
});
await NwtValidator.validate({
  x: 10,
  y: 10,
  z: 10
}, {
  type: "@control/for/class/point3d",
});
// Ejemplo de herencia de que point3d hereda la estructura de point:
Demo_that_fails_too: {
  let hasPassed = false;
  try {
    await NwtValidator.validate({
      // x: 10,
      y: 10,
      z: 10
    }, {
      type: "@control/for/class/point3d",
    });
  } catch (error) {
    hasPassed = true;
  }
  assertion(hasPassed, "Should have passed (err 2)");
}
//*/