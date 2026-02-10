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
  assertion(hasPassed, "Must have passed (err 1)");
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
Demo_that_fails_too: {
  let hasPassed = false;
  try {
    await NwtValidator.validate({
      x: 10,
      y: 10,
      // z: "10"
    }, {
      type: "@control/for/class/point3d",
    });
  } catch (error) {
    hasPassed = true;
  }
  assertion(hasPassed, "Must have passed (err 2)");
}
//*/