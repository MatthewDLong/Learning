import { formatDateTime } from "../src/dateFormatter";

describe("Date Formatter", () => {
  it('When system date and date to format are same day - format as "TODAY"', () => {
    // Arrange
    const November = 10; //js Date object month is indexed from 0
    const systemDateTime = new Date(2022, November, 15, 10, 5).getTime();
    const dateTimeToFormat = new Date(2022, November, 15, 12, 50).getTime(); //Same day different time

    // Act
    const result = formatDateTime(dateTimeToFormat, systemDateTime);

    // Assert
    expect(result).toBe("TODAY");
  });

  it('When system date and date to format are NOT the same day, format as "DD/MM/YYYY"', () => {
    // Arrange
    const May = 4;
    const systemDateTime = new Date(2022, May, 9, 22, 35).getTime();
    const dateTimetoFormat = new Date(2022, May, 10, 23, 45).getTime();

    // Act
    const result = formatDateTime(dateTimetoFormat, systemDateTime);

    // Assert
    expect(result).toBe("10/05/2022");
  });

  it('When system date and date to format are NOT the same day and NOT the same Month, format as "DD/MM/YYYY"', () => {
    // Arrange
    const May = 4;
    const January = 0;
    const systemDateTime = new Date(2022, January, 9, 22, 35).getTime();
    const dateTimetoFormat = new Date(2022, May, 10, 23, 45).getTime();

    // Act
    const result = formatDateTime(dateTimetoFormat, systemDateTime);

    // Assert
    expect(result).toBe("10/05/2022");
  });

  it('When system date and the date to format are NOT the same day AND the system locale is Germany, format as "DD.MM.YY"', () => {
    // Arrange
    const June = 5;
    const systemDateTime = new Date(2022, June, 15, 11, 13).getTime();
    const dateTimetoFormat = new Date(2022, June, 12, 14, 36).getTime();

    // Act
    const result = formatDateTime(dateTimetoFormat, systemDateTime, "de-DE");

    // Assert
    expect(result).toBe("12.06.22");
  });

  it('When locale is Greek-Greece, and the date style is "full", format as "DAY, DD MONTH YEAR"', () => {
    // Arrange
    const November = 10;
    const systemDateTime = new Date(2022, November, 4, 1, 10).getTime();
    const dateTimetoFormat = new Date(2022, November, 6, 10, 12).getTime();

    // Act
    const result = formatDateTime(
      dateTimetoFormat,
      systemDateTime,
      "el-GR",
      "full"
    );

    // Assert
    expect(result).toBe("Κυριακή, 6 Νοεμβρίου 2022");
  });

  it('When locale is English - South-Africa, and the date style is "short", format as "YYYY/MM/DD"', () => {
    // Arrange
    const November = 10;
    const systemDateTime = new Date(2022, November, 4, 1, 10).getTime();
    const dateTimetoFormat = new Date(2022, November, 6, 10, 12).getTime();

    // Act
    const result = formatDateTime(
      dateTimetoFormat,
      systemDateTime,
      "en-ZA",
      "short"
    );

    // Assert
    expect(result).toBe("2022/11/06");
  });

  it("when no dates are passed, return empty string", () => {
    // Arrange
    const input = "";

    // Act
    const result = formatDateTime(input);

    // Assert
    expect(result).toBe("");
  });

  it("when no time format is passed, formats with no time", () => {
    // Arrange
    const March = 2;
    const systemDateTime = new Date(2022, March, 21).getTime();
    const dateTimeToFormat = new Date(2022, March, 18).getTime();

    // Act
    const result = formatDateTime(systemDateTime, dateTimeToFormat);

    // Assert
    expect(result).toBe("21/03/2022");
  });

  it('when a "medium" time format is passed, formats with medium time', () => {
    // Arrange
    const February = 1;
    const systemDateTime = new Date(2022, February, 10).getTime();
    const dateTimeToFormat = new Date(2022, February, 14).getTime();
    const locale = "el-GR";
    const dateStyle = "medium";
    const timeStyle = "medium";

    // Act
    const result = formatDateTime(
      systemDateTime,
      dateTimeToFormat,
      locale,
      dateStyle,
      timeStyle
    );

    // Assert
    expect(result).toBe("10 Φεβ 2022, 12:00:00 π.μ.");
  });

  it('when a "full" time format is passed, formats with full time', () => {
    // Arrange
    const February = 1;
    const systemDateTime = new Date(2022, February, 8).getTime();
    const dateTimeToFormat = new Date(2022, February, 12).getTime();
    const locale = "de-DE";
    const dateStyle = "full";
    const timeStyle = "full";

    // Act
    const result = formatDateTime(
      systemDateTime,
      dateTimeToFormat,
      locale,
      dateStyle,
      timeStyle
    );

    // Assert
    expect(result).toBe(
      "Dienstag, 8. Februar 2022 um 00:00:00 Mittlere Greenwich-Zeit"
    );
  });

  it("When the date to format is the day before the system date, return YESTERDAY", () => {
    // Arrange
    const March = 2;
    const systemDateTimeMillis = new Date(2022, March, 10).getTime();
    const dateTimeToFormatMillis = new Date(2022, March, 9).getTime();

    // Act
    const result = formatDateTime(dateTimeToFormatMillis, systemDateTimeMillis);

    // Assert
    expect(result).toBe("YESTERDAY");
  });

  it('When the system date is the first day of the month, and the date to format is the day before', () => {
    // Arrange
    const August = 7;
    const July = 6;
    const systemDateTimeMillis = new Date(2022, August, 1).getTime();
    const dateTimeToFormatMillis = new Date(2022, July, 31).getTime();

    // Act
    const result = formatDateTime(dateTimeToFormatMillis, systemDateTimeMillis);

    // Assert
    expect(result).toBe("YESTERDAY");
  });
});
