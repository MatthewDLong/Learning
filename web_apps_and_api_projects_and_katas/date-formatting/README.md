# Date Formatting

## Objective

Implement the `format` method in the file dateFormatter.js

`const format = (dateToFormatTimeMillis, systemDateTimeMillis) => {}`

The `format` method takes a `datetime to format` and the `current system datetime` in milliseconds as inputs.

The `format` method implementation should return a formatted string as follows:

- When the date is the current system date return the string `'TODAY'`
- When the date is not current system date return a formatted date string in the format `'DD/MM/YYYY'`
- When the date to format, is the day before the system date, return `'YESTERDAY'`

Tests pass on Node v14.17.1
