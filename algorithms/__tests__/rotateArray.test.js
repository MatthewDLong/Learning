const rotateArray = require("../src/rotateArray");

describe("rotate array", () => {
  it("should rotate array nums array 3 times", () => {
    expect(rotateArray([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([
      5,
      6,
      7,
      1,
      2,
      3,
      4,
    ]);
  });

  it("should rotate array nums array 2 times", () => {
    expect(rotateArray([-1, -100, 3, 99], 2)).toEqual([3, 99, -1, -100]);
  });
});
