const bubbleSort = require("../src/bubbleSort");

describe("bubbleSort", () => {
  it("should sort a given array in ascending order", () => {
    expect(bubbleSort([5, 3, 8, 2, 1, 4])).toEqual([1, 2, 3, 4, 5, 8]);
  });
});
