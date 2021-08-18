const {
  makeTestDirectory,
  deleteTestDirectory,
  writeContentToFile,
} = require("./fileSystemTestSetup");

const fileSearch = require("../fileSearch");

const assert = require("assert");

// Begin test
// it should returns a array of file paths that contain the given search term
// Arrange
makeTestDirectory("testDir");
makeTestDirectory("testDir/bar");
makeTestDirectory("testDir/bar/baz");
writeContentToFile("testDir/bar/baz", "qux.json", '{"message": "qux"}');

// Act
const searchTerm = "qux";
fileSearch("testDir", searchTerm, (err, filesContainingSearchTerm) => {
  // Assert
  assert.strict.deepEqual(filesContainingSearchTerm, [
    "testDir/bar/baz/qux.json",
  ]);

  // Cleanup
  deleteTestDirectory();
});

// End test
