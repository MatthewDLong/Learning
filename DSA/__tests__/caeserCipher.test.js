const caeserCipher = require("../src/caeserCipher");

describe("caeser cipher", () => {
  it("should shift each letter num spaces to the right", () => {
    const input = "foo";

    expect(caeserCipher(input, 2)).toEqual("hqq");
  });

  it("should preserve casing", () => {
    const input = "FoO";

    expect(caeserCipher(input, 2)).toEqual("HqQ");
  });

  it("should preserve white space", () => {
    const input = "f oo";

    expect(caeserCipher(input, 2)).toEqual("h qq");
  });

  it("should support shifts less than 0", () => {
    const input = "foo";

    expect(caeserCipher(input, -1)).toEqual("enn");
  });

  it("should support shifts greater than 25", () => {
    const input = "foo";

    expect(caeserCipher(input, 28)).toEqual("hqq");
  });
});
