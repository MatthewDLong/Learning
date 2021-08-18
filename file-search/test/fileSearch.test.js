const {
  makeTestDirectory,
  deleteTestDirectory,
  writeContentToFile,
} = require("./fileSystemTestSetup");

const fileSearch = require("../fileSearch");

afterEach(() => {
  deleteTestDirectory();
});

it("should return `found` when it finds the search term in any file in a subdirectory", () => {
  makeTestDirectory("testDir");
  makeTestDirectory("testDir/bar");
  writeContentToFile("testDir/bar", "bar.json", '{"baz": "qux"}');
  process.cwd = jest.fn().mockReturnValue("testDir");

  expect(fileSearch(".", "qux")).toBe("found");
});
