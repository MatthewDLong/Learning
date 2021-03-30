const twoStrings = require("../src/twoStrings");

describe("two strings", () => {
  it("should return true when a substring of one string is equal", () => {
    expect(twoStrings("foo", "far")).toEqual("YES");
  });
});
