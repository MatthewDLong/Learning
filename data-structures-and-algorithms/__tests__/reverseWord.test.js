const reverseWord = require("../src/reverseWord");

describe("reverse word algorithm", () => {
  it("should reverse all words in a given string", () => {
    const reversed = reverseWord("foo bar");

    expect(reversed).toEqual("bar foo");
  });

  it("should remove multiple leading and trailing spaces from a word", () => {
    const reversed = reverseWord("  hello   world  ");

    expect(reversed).toEqual("world hello");
  });
});
