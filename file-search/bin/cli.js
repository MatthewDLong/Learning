#!/usr/bin/env node
const fileSearch = require("../fileSearch");

const dir = process.argv[2];
const searchTerm = process.argv[3];

try {
  const result = fileSearch(dir, searchTerm);
  console.log(result);
} catch (err) {
  console.log(err);
}
