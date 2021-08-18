const { readdir, readFile, stat } = require("fs");
const { join } = require("path");

const fileSearchRecursive = (path, state, searchTerm, cb) => {
  state.ops++;

  readdir(path, (err, files) => {
    state.ops--;
    if (err) {
      cb(err);
    }

    for (const file of files) {
      const newPath = join(path, file);

      state.ops++;
      stat(newPath, (err, stats) => {
        state.ops--;

        if (err) {
          cb(err);
        }

        if (stats.isDirectory()) {
          return fileSearchRecursive(newPath, state, searchTerm, cb);
        }

        if (stats.isFile()) {
          state.ops++;
          readFile(newPath, "utf8", (err, fileContent) => {
            state.ops--;

            if (err) {
              cb(err);
            }

            if (fileContent.toString().includes(searchTerm)) {
              state.filesContainingSearchTerm.push(newPath);
            }

            if (state.ops === 0) {
              return cb(null, state.filesContainingSearchTerm);
            }
          });
        }
      });
    }
  });
};

const fileSearch = (path, searchTerm, cb) => {
  fileSearchRecursive(
    path,
    { ops: 0, filesContainingSearchTerm: [] },
    searchTerm,
    cb
  );
};

module.exports = fileSearch;
