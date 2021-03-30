const fibonacci = require("../src/fibonacci.js");

describe("fibonacci sequence", () => {
  it("should return the number at the given position", () => {
    expect(fibonacci(1)).toEqual(1);
  });

  it("should return the numbr at the given position", () => {
    expect(fibonacci(4)).toEqual(3);
  });

  it("should return the numbr at the given position", () => {
    expect(fibonacci(20)).toEqual(6765);
  });
});
