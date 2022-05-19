const fizzBuzz = require("../src/fizzBuzz");

describe("fizz buzz", () => {
  it("should return a given number if it is not a multiple of 3", () => {
    expect(fizzBuzz([1])).toEqual([1]);
  });

  it("should return fizz for a multiple of 3", () => {
    expect(fizzBuzz([1, 2, 3])).toEqual([1, 2, "fizz"]);
  });

  it("should return buzz for a multiple of 5", () => {
    expect(fizzBuzz([1, 2, 3, 4, 5])).toEqual([1, 2, "fizz", 4, "buzz"]);
  });

  it("should return fizzbuzz for a multiple of both 3 and 5", () => {
    expect(
      fizzBuzz([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    ).toEqual([
      1,
      2,
      "fizz",
      4,
      "buzz",
      "fizz",
      7,
      8,
      "fizz",
      "buzz",
      11,
      "fizz",
      13,
      14,
      "fizzbuzz",
    ]);
  });
});
