const { fchmod } = require("fs");
const factorial = require("../src/factorial");

describe("factorial", () => {
  it("should return the factorial", () => {
    expect(factorial(3)).toEqual(6);
    expect(factorial(4)).toEqual(24);
    expect(factorial(20)).toEqual(2432902008176640000);
  });

  it("should return factorial of 1 if n is 0", () => {
    expect(factorial(0)).toEqual(1);
  });

  it("should retuen -1 if n is less than 0", () => {
    expect(factorial(-2)).toEqual(-1);
  });
});
