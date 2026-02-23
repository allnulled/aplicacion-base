const checkers = [
  ["✅⬛️ Validating settings schemas statically with «NwtStatic.api.control.validation.interface.statically.validateControlSchema»", () => {
    return true;
  }],
  ["Should accept basic valid structure (1)", () => {
    return NwtUtils.shouldNotThrow(() => {
      // COPY FROM HERE:
      NwtStatic.api.control.validation.interface.statically.validateControlSchema({
        type: "control/for/structure",
        schema: {
          name: {
            type: "control/for/text"
          }
        }
      }, [], NwtAsserter.silently);
      // COPY UNTIL HERE!
    });
  }],
  ["Should accept basic valid structure (2)", () => {
    return NwtUtils.shouldNotThrow(() => {
      // COPY FROM HERE:
      NwtStatic.api.control.validation.interface.statically.validateControlSchema({
        type: "control/for/structure",
        schema: {
          name: {
            type: "control/for/text"
          },
          optionA: {
            type: "control/for/option",
            schema: [{
              type: "control/for/text"
            }, {
              type: "control/for/text"
            }, {
              type: "control/for/text"
            }]
          },
          listA: {
            type: "control/for/list",
            schema: {
              type: "control/for/text"
            }
          }
        }
      }, [], NwtAsserter.silently);
      // COPY UNTIL HERE!
    });
  }],
  ["Should fail with invalid types (3)", () => {
    return NwtUtils.shouldThrow(() => {
      // COPY FROM HERE:
      NwtStatic.api.control.validation.interface.statically.validateControlSchema({
        type: "control/for/number",
      }, [], NwtAsserter.silently);
      // COPY UNTIL HERE!
    });
  }],
  ["Should fail with invalid types (4)", () => {
    return NwtUtils.shouldThrow(() => {
      // COPY FROM HERE:
      NwtStatic.api.control.validation.interface.statically.validateControlSchema({
        type: "control/for/badtype",
      }, [], NwtAsserter.silently);
      // COPY UNTIL HERE!
    });
  }],
  ["Should fail with invalid types even if they are nested (5)", () => {
    return NwtUtils.shouldThrow(() => {
      // COPY FROM HERE:
      NwtStatic.api.control.validation.interface.statically.validateControlSchema({
        type: "control/for/structure",
        schema: {
          propertyA: {
            type: "control/for/number",
          }
        }
      }, [], NwtAsserter.silently);
      // COPY UNTIL HERE!
    });
  }],
];

tester.progressBar.total = checkers.length;
for (let index = 0; index < checkers.length; index++) {
  const [message, conditionCallback] = checkers[index];
  const condition = conditionCallback();
  assertion(condition, message);
  tester.progressBar.advance(1);
}
