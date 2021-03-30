import { readdir, stat } from "fs";
import { join } from "path";

function listNestedFilesRecursive(path, state, cb) {
  state.ops++;

  readdir(path, (err, files) => {
    state.ops--;
    if (err) {
      return cb(err);
    }

    for (const file of files) {
      const newPath = join(path, file);

      state.ops++;
      stat(newPath, (err, stats) => {
        state.ops--;

        if (err) {
          return cb(err);
        }

        if (stats.isDirectory()) {
          return listNestedFilesRecursive(newPath, state, cb);
        } else if (stats.isFile()) {
          state.files.push(newPath);
        }

        if (state.ops === 0) {
          return cb(null, state.files);
        }
      });
    }
  });
}

export function listNestedFiles(dir, cb) {
  listNestedFilesRecursive(dir, { ops: 0, files: [] }, cb);
}
