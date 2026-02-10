//*
await NwtValidator.validate({
  x: 10,
  y: 10,
}, {
  type: "@control/for/class/point",
});

Demo_that_fails_too: {
  let hasFailed = false;
  try {
    await NwtValidator.validate({
      x: 10,
      y: "10",
    }, {
      type: "@control/for/class/point",
    });
  } catch (error) {
    hasFailed = true;
  }
  assertion(hasFailed, "Should have failed (err 1 from subtypes)");
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
  let hasFailed = false;
  try {
    await NwtValidator.validate({
      // x: 10,
      y: 10,
      z: 10
    }, {
      type: "@control/for/class/point3d",
    });
  } catch (error) {
    hasFailed = true;
  }
  assertion(hasFailed, "Should have failed (err 2 from subtypes)");
}
//*/