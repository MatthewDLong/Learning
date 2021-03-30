const binarySearchRecursive = require("../src/binarySearch");

describe("binary search recursive", () => {
  it("should return true if the key is present in the given array", () => {
    const result = binarySearchRecursive([-1, 0, 3, 5, 9, 12], 9);

    expect(result).toEqual(true);
  });
});
