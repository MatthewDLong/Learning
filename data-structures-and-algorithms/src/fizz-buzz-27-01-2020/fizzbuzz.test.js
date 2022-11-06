const fizzbuzz = require("./fizzbuzz");

describe("FizzBuzz", () => {
  it("Returns [1] when given [1]", () => {
    expect(fizzbuzz([1])).toEqual([1]);
  });

  it("Returns [1,2] when given [1,2]", () => {
    expect(fizzbuzz([1, 2])).toEqual([1, 2]);
  });

  it("Returns [1,2,'Fizz'] when given [1,2,3]", () => {
    expect(fizzbuzz([1, 2, 3])).toEqual([1, 2, "Fizz"]);
  });

  it("Returns [1,2,'Fizz',4,'Buzz'] when given [1,2,3,4,5]", () => {
    expect(fizzbuzz([1, 2, 3, 4, 5])).toEqual([1, 2, "Fizz", 4, "Buzz"]);
  });
});
