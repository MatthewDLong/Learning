class Parser {
  schema = null;
  logging;
  port;

  constructor(schema) {
    if (schema === undefined) {
      throw new Error("No schema supplied");
    }
    this.schema = schema;
    this.logging = this.schema.flags.l.default;
    this.port = this.schema.flags.p.default;
  }

  parse(input) {
    if (input !== undefined) {
      input.split(" ").forEach((input, index, arr) => {
        if (input === "-l" && this.schema.flags.l !== undefined) {
          this.logging = true;
        }

        if (input === "-p") {
          const port = arr[index + 1];
          if (port) {
            this.port = parseInt(port.match(this.schema.flags.p.match)[0]);
          }
        }

        if(input.includes("-") && this.schema.flags[input.replace("-", "")] === undefined) {
          throw new Error(`Unexpected flag supplied: ${input}`);
        }
      });
    }
  }
}

module.exports = Parser;
