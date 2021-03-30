class Parser {
  schema;
  values = { l: false, p: 8080, d: "/" };
  constructor(schema) {
    this.schema = schema;
  }

  parse(args) {
    if (args) {
      const argsArray = args.split(" ");

      for (let i = 0; i < argsArray.length; i++) {
        if (argsArray[i] === "-l") {
          this.values.l = true;
        }

        if (argsArray[i] === "-p") {
          const schemaArray = this.schema.split(" ");
          const portFlagIndex = schemaArray.indexOf("-p");
          const portDataTypeIndex = portFlagIndex + 1;
          const portDataType = schemaArray[portDataTypeIndex];
          const portValue = argsArray[i + 1];
          const portValueNumber = parseInt(portValue);
          if (isNaN(portValue)) {
            throw new TypeError(
              `Must supply number value for -p flag. Value received: ${portValue}`
            );
          }
          if (typeof portValueNumber === portDataType) {
            this.values.p = portValueNumber;
          }
        }

        if (argsArray[i] === "-d") {
          const directoryValue = argsArray[i + 1];
          if (typeof directoryValue !== "string" || !isNaN(directoryValue)) {
            throw new TypeError(
              `Must supply string value for -d flag. Value received: ${directoryValue}`
            );
          } else {
            this.values.d = directoryValue;
          }
        }
      }
    }
  }
}

module.exports = Parser;
