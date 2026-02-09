return await NwtValidator.validate({
  // @THROWS unless name:String
  name: "500",
}, {
  type: "@control/for/option",
  controls: [{
    type: "@control/for/text"
  }, {
    type: "@control/for/structure",
    controls: {
      name: {
        type: "@control/for/text"
      }
    }
  }]
});