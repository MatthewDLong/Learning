const Parser = require("../src/Parser");

describe("Parser", () => {
  it("should have the schema that is supplied", () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    expect(p.schema).toEqual("-l -p number -d string");
  });

  it('should accept -l "logging" boolean flag', () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse("-l");

    expect(p.values.l).toEqual(true);
  });

  it('should default -l "logging" boolean flag to false', () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse();

    expect(p.values.l).toEqual(false);
  });

  it("should accept a number value for -p flag", () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse("-p 3000");

    expect(p.values.p).toEqual(3000);
  });

  it("should honour the 'number' data type specified in schema for -p flag", () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    expect(() => {
      p.parse("-p foo");
    }).toThrow("Must supply number value for -p flag. Value received: foo");
  });

  it('should default -p "port" flag to 8080', () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse("");

    expect(p.values.p).toEqual(8080);
  });

  it("should accept a string value for -d flag", () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse("-d /foo");

    expect(p.values.d).toEqual("/foo");
  });

  it('should honour the "string" data type specified in the schema for the -d flag', () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    expect(() => {
      p.parse("-d 3000")
    }).toThrow("Must supply string value for -d flag. Value received: 3000");

  });

  it('should default -d "directory" flag to /', () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse();

    expect(p.values.d).toEqual("/");
  });

  it("should accept both the -p and -d flag at the same time", () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse("-d /foo -p 3000");

    expect(p.values.p).toEqual(3000);
    expect(p.values.d).toEqual("/foo");
  });

  it("should allow flags to be passed in any order", () => {
    const schema = "-l -p number -d string";
    const p = new Parser(schema);

    p.parse("-p 3000 -l -d /foo");

    expect(p.values.p).toEqual(3000);
    expect(p.values.l).toEqual(true);
    expect(p.values.d).toEqual("/foo");
  });
});
