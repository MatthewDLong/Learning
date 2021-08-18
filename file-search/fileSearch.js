const fs = require("fs");
const path = require("path");

const fileSearch = (dir, searchTerm) => {
  let filesContainingSearchTerm = new Map();

  const findSearchTerm = (searchDir) => {
    const files = fs.readdirSync(path.join(process.cwd(), searchDir), {
      withFileTypes: true,
    });

    files.forEach((file) => {
      if (!file.isDirectory()) {
        if (
          fs
            .readFileSync(path.join(process.cwd(), searchDir, file.name))
            .includes(searchTerm)
        ) {
          filesContainingSearchTerm.set(file.name, "found");
        }
      } else {
        findSearchTerm(file.name);
      }
    });
  };

  findSearchTerm(dir);

  return filesContainingSearchTerm.size > 0 ? "found" : "notfound";
};

module.exports = fileSearch;
