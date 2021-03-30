const reverseWords = require("../src/reverseChars");

describe("reverseWords", () => {
  it("should reverse every word in a given string", () => {
    const reversed = reverseWords("foo bar baz");

    expect(reversed).toEqual("oof rab zab");
  });

  it("should support one single word", () => {
    const reversed = reverseWords("baz");

    expect(reversed).toEqual("zab");
  });
});
