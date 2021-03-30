# 4.2 List files recursively

Write listNestedFiles(), a callback-style function that takes, as the input, the path to a directory in the local filesystem and that asynchronously iterates over all the subdirectories to eventually return a list of all the files discovered.

Here is what the signature of the function should look like:

```javascript
function listNestedFiles(dir, cb) {
  /* ... */
}
```

e.g. `node listNestedFilesCli.js .`

Prints:

```text
Listing files contained inside .:
README.md
foo/bar/bar.txt
foo/foo.txt
listNestedFiles.js
listNestedFilesCli.js
package.json
```
