const Parser = require("../src/Parser.js");

describe("Parser", () => {
  const schema = {
    flags: {
      l: {
        default: false,
        match: null,
      },
      p: {
        default: 8080,
        match: /^\d+$/g,
      },
    },
  };

  it("Throws an error if no schema supplied", () => {
    expect(() => {
      const parser = new Parser();
    }).toThrow("No schema supplied");
  });

  it("Sets logging to true when -l flag passed", () => {
    const parser = new Parser(schema);

    parser.parse("-l");

    expect(parser.logging).toEqual(true);
  });

  it("Sets logging to false when -l flag not passed", () => {
    const parser = new Parser(schema);

    parser.parse();

    expect(parser.logging).toEqual(false);
  });

  it("Sets port to 3000 when -p flag passed with value of 3000", () => {
    const parser = new Parser(schema);

    parser.parse("-p 3000");

    expect(parser.port).toEqual(3000);
  });

  it("Sets port to default value of 8080", () => {
    const parser = new Parser(schema);

    parser.parse();

    expect(parser.port).toEqual(8080);
  });

  it("Throws when supplied with non valid flag", () => {
    const parser = new Parser(schema);

    expect(() => {
      parser.parse("-z");
    }).toThrow("Unexpected flag supplied: -z");
  });

  it("Throws when supplied with zero as a flag", () => {
    const parser = new Parser(schema);

    expect(() => {
      parser.parse('-0');
    }).toThrow("Unexpected flag supplied: -0");
  })
});
