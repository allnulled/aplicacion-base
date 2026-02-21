const option1 = [{
  type: "control/for/structure",
  schema: {
    one: {
      type: "control/for/text"
    }
  }
}, {
  type: "control/for/structure",
  schema: {
    two: {
      type: "control/for/text"
    }
  }
}];
window.schemas = {
  first: {
    schema: {
      name: {
        type: "control/for/text"
      }
    }
  },
  second: {
    schema: {
      name: {
        type: "bad/type"
      }
    }
  },
  third: {
    schema: {
      name: {
        type: "control/for/text"
      },
      was: {
        type: "control/for/structure",
        schema: {
          started: {
            type: "control/for/text"
          },
          ended: {
            type: "control/for/text"
          },
          firstly: {
            type: "control/for/structure",
            schema: {
              started: {
                type: "control/for/text"
              },
              ended: {
                type: "control/for/text"
              },
            }
          }
        }
      }
    }
  },
  fourth: {
    schema: {
      type: "control/for/text",
    }
  },
  fifth: {
    schema: {
      type: "control/for/structure",
      schema: {
        name: {
          type: "control/for/text",
        }
      }
    }
  },
  sixth: {
    schema: option1
  },
  seventh: {
    schema: {
      decision: {
        type: "control/for/option",
        schema: option1
      }
    }
  }
};
const checkers = [
  [() => true, "✅⬛️ Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/text» should..."],
  [() => typeof NwtResource.for("control/for/text").api.control.validation.validateValue("texto") === "object", "Should return object (1)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue("texto").success === true, "Should return success=true (2)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue(500).error === true, "Should throw error when passing number (3)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue({}).error === true, "Should throw error when passing object (4)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue(() => { }).error === true, "Should throw error when passing function (5)"],
  [() => NwtResource.for("control/for/text").api.control.validation.validateValue(true).error === true, "Should throw error when passing boolean (6)"],
  [() => true, "✅⬛️ Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» should..."],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue("texto", schemas.first).error === true, "Should throw error when passing string (7)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({}, schemas.first).error === true, "Should throw when passing object with missing (and not nullable) properties (8.1)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: "text" }, schemas.first).success === true, "Should return success=true when passing object without missin (and not nullable) properties (8.2)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: {} }, schemas.first).error === true, "Should throw when passing property name without type (9)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: { with: "bad/type" } }, schemas.first).error === true, "Should throw when passing value's property name with bad type (10)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: 500 }, schemas.first).error === true, "Should throw when passing value's property name with bad type (11)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: "500" }, schemas.first).success === true, "Should return success=true when passing value's property name with good type (12)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: "500" }, schemas.second).error === true, "Should return success=true when passing bad schema (13)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: "text", was: { started: "text", ended: "text", firstly: { started: 100, ended: "text" } } }, schemas.third).error === true, "Should throw when passing nested structures with validation errors inside (14)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: "text", was: { started: "text", ended: "text", firstly: { started: "text", ended: "text" } } }, schemas.third).success === true, "Should return success=true when passing nested structures without validation errors inside (15)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ name: "text", was: { started: "text", ended: "text", firstly: { started: "text", ended: "text" } } }, schemas.third).success === true, "Should return success=true when passing nested structures without validation errors inside (16)"],
  [() => true, "✅⬛️ Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/list» should..."],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue([], schemas.fourth).success === true, "Should return success=true when passing empty list (17)"],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue(["text", "text", "text"], schemas.fourth).success === true, "Should return success=true when passing well-formed list (18)"],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue(["text", "text", 500], schemas.fourth).error === true, "Should throw when passing list with corrupted items (19)"],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue([{ name: "text" }], schemas.fifth).success === true, "Should return success=true when passing well-formed list with nested structures (20)"],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue([{ name: "text" }, { name: "text" }], schemas.fifth).success === true, "Should return success=true when passing well-formed list with nested structures (21)"],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue([{ name: "text" }, { name: 500 }], schemas.fifth).error === true, "Should throw when passing corrupted items (22)"],
  [() => NwtResource.for("control/for/list").api.control.validation.validateValue([{ name: "text" }, {}], schemas.fifth).error === true, "Should throw when passing corrupted items by missing properties (23)"],
  [() => true, "✅⬛️ Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/option» should..."],
  [() => NwtResource.for("control/for/option").api.control.validation.validateValue({ one: "text" }, schemas.sixth).success === true, "Should return success=true when passing data that matches the first option (24)"],
  [() => NwtResource.for("control/for/option").api.control.validation.validateValue({ two: "text" }, schemas.sixth).success === true, "Should return success=true when passing data that matches the second option (25)"],
  [() => NwtResource.for("control/for/option").api.control.validation.validateValue({ zero: "text" }, schemas.sixth).error === true, "Should throw when passing data that does not match any option (26)"],
  [() => NwtResource.for("control/for/option").api.control.validation.validateValue({ one: "text" }, schemas.sixth).data === 1, "Should return data=1 when passing data that matches the first option (27)"],
  [() => NwtResource.for("control/for/option").api.control.validation.validateValue({ two: "text" }, schemas.sixth).data === 2, "Should return data=2 when passing data that matches the second option (28)"],
  [() => true, "✅⬛️ Method «NwtResource.prototype.api.control.validation.validateValue» from «control/for/structure» and «control/for/list» with immediate «control/for/option»s should..."],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ decision: { one: "text" } }, schemas.seventh).data.decision === 1, "Should return data.property=1 when passing data that matches the first option on a property (29)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ decision: { two: "text" } }, schemas.seventh).data.decision === 2, "Should return data.property=2 when passing data that matches the second option on a property (30)"],
  [() => NwtResource.for("control/for/structure").api.control.validation.validateValue({ decision: { zero: "text" } }, schemas.seventh).error === true, "Should throw when passing data that does not match any option on a property (32)"],
];

tester.progressBar.total = checkers.length;

checkers.forEach(c => {
  const result = NwtUtils.trify(() => c[0]());
  assertion(result, c[1]);
  tester.progressBar.advance(1);
});

