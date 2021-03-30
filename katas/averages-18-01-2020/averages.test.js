const assert = require("assert");
const { mean, mode, median } = require("./averages");

describe("averages", () => {
  it("Returns the mean average", () => {
    assert.strictEqual(3, mean([1, 2, 3, 4, 5]));
  });

  it("Returns the mode average", () => {
    assert.deepEqual([2], mode([1, 2, 2, 3, 4]));
  });

  it("Returns multiple mode averages values if needed", () => {
    assert.deepEqual([1, 2], mode([1, 1, 2, 2, 3]));
  });

  it("Returns the median average", () => {
    assert.equal(3, median([1, 2, 3, 4, 5]));
  });

  it("Returns the median average", () => {
    assert.equal(3, median([5, 2, 1, 3, 4]));
  });
});
