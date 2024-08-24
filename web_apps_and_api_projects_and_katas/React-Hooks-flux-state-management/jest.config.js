module.exports = {
  automock: false,
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/pages/"
  ],
  moduleNameMapper: { "\\.(css|less)$": "identity-obj-proxy" },
  moduleFileExtensions: ["js", "jsx", "css"]
};
