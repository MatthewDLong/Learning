import { listNestedFiles } from "./listNestedFiles.js";

const dir = process.argv[2];

if (!Boolean(dir) || dir.length === 0) {
  console.log("You must specify a dir e.g. node listNestedFilesCli.js .");
  process.exit(0);
}

listNestedFiles(dir, (err, files) => {
  if (err) {
    console.error(err);
  }
  console.log("files", files);
});
