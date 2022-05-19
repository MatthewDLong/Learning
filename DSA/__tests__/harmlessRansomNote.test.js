const harmlessRansomNote = require("../src/harmlessRansomNote");

describe("harmless ranson note", () => {
  it("should create ransom not when all letters from note are present in magazine", () => {
    const note = "f";
    const magazine = "f";

    expect(harmlessRansomNote(note, magazine)).toEqual(true);
  });

  it("should create ransom not when all letters from note are present in magazine", () => {
    const note = "fobar";
    const magazine = "fobar";

    expect(harmlessRansomNote(note, magazine)).toEqual(true);
  });

  it("should consider spaces and non alpha numeric charactera", () => {
    const note = "@£$%^& ";
    const magazine = "@£$%^& erfref3et54tg";

    expect(harmlessRansomNote(note, magazine)).toEqual(true);
  });
});
