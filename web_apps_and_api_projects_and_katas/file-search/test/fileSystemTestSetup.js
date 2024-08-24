const fs = require("fs");
const path = require("path");

const makeTestDirectory = (testDirectoryName = "testDir") => {
  try {
    if (!fs.existsSync(testDirectoryName)) {
      fs.mkdirSync(testDirectoryName);
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteTestDirectory = (testDirectoryName = "testDir") => {
  try {
    if (fs.existsSync(testDirectoryName)) {
      fs.rmdirSync(testDirectoryName, { recursive: true, force: true });
    }
  } catch (err) {
    console.log(err);
  }
};

const writeContentToFile = (
  testDirectoryName = "testDir",
  filePath,
  fileContent
) => {
  try {
    if (fs.existsSync(path.join(process.cwd(), testDirectoryName))) {
      fs.writeFileSync(
        path.join(process.cwd(), testDirectoryName, filePath),
        fileContent
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { makeTestDirectory, deleteTestDirectory, writeContentToFile };
