const isValidParenthesis = require("../src/validParenthesis");

describe("valid parenthesis", () => {
  it("() should be valid", () => {
    expect(isValidParenthesis("()")).toEqual(true);
  });
});
